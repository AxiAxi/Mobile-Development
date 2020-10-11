import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const getPoster = (posterId) => {
    switch (posterId) {
        case 'Poster_01.jpg': return require('../assets/Posters/Poster_01.jpg');
        case 'Poster_02.jpg': return require('../assets/Posters/Poster_02.jpg');
        case 'Poster_03.jpg': return require('../assets/Posters/Poster_03.jpg');
        case 'Poster_05.jpg': return require('../assets/Posters/Poster_05.jpg');
        case 'Poster_06.jpg': return require('../assets/Posters/Poster_06.jpg');
        case 'Poster_07.jpg': return require('../assets/Posters/Poster_07.jpg');
        case 'Poster_08.jpg': return require('../assets/Posters/Poster_08.jpg');
        case 'Poster_10.jpg': return require('../assets/Posters/Poster_10.jpg');
        default: return null;
    };
};

export default function Movie({ title, year, type, poster }) {
    return (
        <View style={styles.wrapper}>
            <Image style={styles.poster} source={getPoster(poster)}></Image>
            <View style={styles.info}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text}>{year}</Text>
                <Text style={styles.text}>{type}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        margin: 1.5,
        padding: 20,
        borderBottomWidth: .2,
    },
    poster: {
        width: 85,
        height: 135
    },
    info: {
        flex: 1,
        marginLeft: 15,
    },
    text: {
        marginBottom: 5
    }
});
