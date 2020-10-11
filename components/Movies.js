import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import Movie from './Movie';

export default function Movies({ list }) {
    const renderMovie = (movie) => (
        <Movie
            title={movie.item['Title']}
            year={movie.item['Year']}
            type={movie.item['Type']}
            poster={movie.item['Poster']}
        />
    );
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={list}
                renderItem={renderMovie}
                keyExtractor={(movie) => movie['imdbID']}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});
