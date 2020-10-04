/* PART 2 */
const validate = (num, min, max) => (num >= min) && (num <= max) ? num : 0;

// [2] { 7206 => 06 % 2 = 0 }
// [3]
export class TimeMH {
    #currentDate;
    // [4]
    hours;
    minutes;
    seconds;
    
    // [5a]
    constructor(hh = 0, mm = 0, ss = 0) {
        // [5c]
        if ((arguments.length === 1) && (arguments[0] instanceof Date)) {
            const date = arguments[0];
            this.hours = date.getHours();
            this.minutes = date.getMinutes();
            this.seconds = date.getSeconds();
        } else {
            // [5b]
            this.hours = parseInt(validate(hh, 0, 23));
            this.minutes = parseInt(validate(mm, 0, 59));
            this.seconds = parseInt(validate(ss, 0, 59));
        };
        
        const currentDate = new Date();
        this.#currentDate = {
                                year: currentDate.getFullYear(),
                                month: currentDate.getMonth(),
                                day: currentDate.getDate()
                            };
        
        return this;
    };
    
    getDate() {
        const { year, month, day } = this.#currentDate;
        const { hours, minutes, seconds } = this;
        return new Date(year, month, day, hours, minutes, seconds);
    };
    
    // [6a]
    getTimeFormatted() {
        return this.getDate().toLocaleTimeString('en-US');
    };
    
    // [6bc] [7ab]
    compute(type, timeX, timeY = this) {
        const cD = timeY.getDate();
        const { hours, minutes, seconds } = timeX;
        
        switch (type) {
            case 'SUM': {
                cD.setHours(cD.getHours() + hours);
                cD.setMinutes(cD.getMinutes() + minutes);
                cD.setSeconds(cD.getSeconds() + seconds);
                break;
            }
            case 'DIFF': {
                cD.setHours(cD.getHours() - hours);
                cD.setMinutes(cD.getMinutes() - minutes);
                cD.setSeconds(cD.getSeconds() - seconds);
                break;
            }
            default: return this;
        };
        
        return new TimeMH(cD.getHours(), cD.getMinutes(), cD.getSeconds());
    };
};

// [8]
console.log('[5a]:', new TimeMH());
console.log('#####');

console.log('[5b]:', new TimeMH(2, 1231, 58));
console.log('[5b]:', new TimeMH(7, 18));
console.log('[5b]:', new TimeMH(16, 2, 12));
console.log('#####');

console.log('[5c]:', new TimeMH(new Date()));
console.log('#####');

// [9] [10]
const timeMH0 = new TimeMH(23, 17, 48);
console.log('[6a]:', timeMH0.getTimeFormatted());
timeMH0.hours = 7;
console.log('[6a]:', timeMH0.getTimeFormatted());
console.log('#####');

const timeMH1 = new TimeMH(18, 39, 25);
console.log('[6b]:', timeMH1.compute('SUM', timeMH0)); // 18:39:25 + 7:17:48
const timeMH2 = new TimeMH(3, 58, 44);
console.log('[7a]:', timeMH0.compute('SUM', timeMH1, timeMH2)); // 3:58:44 + 18:39:25
console.log('#####');

console.log('[6c]:', timeMH1.compute('DIFF', timeMH0)); // 18:39:25 - 7:17:48
console.log('[7b]:', timeMH0.compute('DIFF', timeMH1, timeMH2)); // 3:58:44 - 18:39:25
