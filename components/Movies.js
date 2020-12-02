import React, { useState, useEffect } from 'react';
import { Text, TextInput, SafeAreaView, ScrollView, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { removeItemByProp } from '../utils/utils';
import Swipeout from 'react-native-swipeout';
import Movie from './Movie';

export default function Movies({ list, removeItemFromList }) {
    const [query, setQuery] = useState('');
    const [listOnQuery, setListOnQuery] = useState([]);
    const [responseStatus, setResponseStatus] = useState('');
    
    useEffect(() => {
        const formattedQuery = query.trim().toLowerCase();
        
        if (formattedQuery.length >= 3) {
            const url = `http://www.omdbapi.com/?apikey=7e9fe69e&s=${formattedQuery}&page=1`;
            
            (async () => {
                const fetchResult = await fetch(url);
                const loadedData = await fetchResult.json();
                setListOnQuery(loadedData['Search']);
                setResponseStatus(loadedData['Response']);
            })();
        };
    }, [query]);
    
    const handleQuery = (query) => {
        setQuery(query);
    };
    
    const removeMovieFromList = (imdbID) => {
        removeItemFromList(imdbID);
        setListOnQuery(prev => removeItemByProp(prev, 'imdbID', imdbID));
    };
    
    const renderMovie = (movie) => {
        const swipeButtons = [
            {
                text: 'Remove',
                backgroundColor: '#dc143c',
                underlayColor: 'transparent',
                sensitivity: 80,
                onPress: () => {
                    removeMovieFromList(movie.item['imdbID']);
                }
            }
        ];
        
        return (
            <Swipeout autoClose={true} backgroundColor="transparent" right={swipeButtons}>
                <TouchableHighlight>
                    <Movie
                        title={movie.item['Title']}
                        year={movie.item['Year']}
                        type={movie.item['Type']}
                        poster={movie.item['Poster']}
                        imdbID={movie.item['imdbID']}
                    />
                </TouchableHighlight>
            </Swipeout>
        );
    };
    
    const listOnRender = (
        <FlatList
            data={listOnQuery}
            renderItem={renderMovie}
            keyExtractor={(movie) => movie['imdbID']}
        />
    );
    
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <TextInput
                    style={styles.search}
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    placeholder="Search for a movie"
                    value={query}
                    onChangeText={queryText => handleQuery(queryText)}
                />
                {listOnQuery?.length !== 0 && responseStatus !== 'False' ? listOnRender : <Text style={styles.noItems}>No items found</Text>}
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#f5f5f5"
    },
    search: {
        marginHorizontal: 20,
        paddingVertical: 6.5,
        paddingHorizontal: 12.5,
        borderRadius: 7.5,
        backgroundColor: "#fff",
        color: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 5
    },
    noItems: {
        alignSelf: "center",
        height: "100%",
        lineHeight: 75,
        fontStyle: "italic"
    }
});
