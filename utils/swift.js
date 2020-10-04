/* PART 1 */
// [1]
const studentsStr = "Бортнік Василь - ІВ-72; Чередніченко Владислав - ІВ-73; Гуменюк Олександр - ІВ-71; Корнійчук Ольга - ІВ-71; Киба Олег - ІВ-72; Капінус Артем - ІВ-73; Овчарова Юстіна - ІВ-72; Науменко Павло - ІВ-73; Трудов Антон - ІВ-71; Музика Олександр - ІВ-71; Давиденко Костянтин - ІВ-73; Андрющенко Данило - ІВ-71; Тимко Андрій - ІВ-72; Феофанов Іван - ІВ-71; Гончар Юрій - ІВ-73";

// Task 1
const studentsGroups = {};

studentsStr.split('; ').forEach(str => {
    const [student, group] = str.split(' - ');
    !studentsGroups[group] && (studentsGroups[group] = []);
    studentsGroups[group].push(student);
});

// console.log('[TASK 1]:')
// console.log(studentsGroups);
// console.log();

// Task 2
const points = [5, 8, 15, 15, 13, 10, 10, 10, 15];

const randomValue = (maxValue) => {
    switch (Math.floor(Math.random() * 6)) {
        case 1: return parseInt(Math.ceil(maxValue * 0.7));
        case 2: return parseInt(Math.ceil(maxValue * 0.9));
        case 3:
        case 4:
        case 5: return maxValue;
        default: return 0;
    };
};

const studentPoints = {};

for (const group in studentsGroups) {
    studentPoints[group] = {};
    studentsGroups[group].forEach(student => studentPoints[group][student] = points.map(p => randomValue(p)));
};

// console.log('[TASK 2]:')
// console.log(studentPoints);
// console.log();

// Task 3
const sumPoints = {};

for (const group in studentsGroups) {
    sumPoints[group] = {};
    studentsGroups[group].forEach(student => sumPoints[group][student] = studentPoints[group][student].reduce((prev, cur) => prev + cur, 0));
};

// console.log('[TASK 3]:')
// console.log(sumPoints);
// console.log();

// Task 4
const groupAvg = {};

for (const group in studentsGroups) {
    groupAvg[group] = 0;
    studentsGroups[group].forEach(student => groupAvg[group] += sumPoints[group][student]);
    groupAvg[group] = parseFloat((groupAvg[group] / Object.keys(studentsGroups[group]).length).toFixed(5));
};

// console.log('[TASK 4]:')
// console.log(groupAvg);
// console.log();

// Task 5
const passedPerGroup = {};

for (const group in studentsGroups) {
    passedPerGroup[group] = studentsGroups[group].filter(student => sumPoints[group][student] >= 60);
};

// console.log('[TASK 5]:')
// console.log(passedPerGroup);
// console.log();
