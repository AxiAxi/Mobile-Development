import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import Loader from './Loader';
import Image from 'react-native-image-progress';

export default function FullMovie({ route }) {
    const { imdbID } = route.params;
    const [fullMovie, setFullMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const url = `http://www.omdbapi.com/?apikey=7e9fe69e&i=${imdbID}`;
        
        (async () => {
            setIsLoading(true);
            const fetchResult = await fetch(url);
            const loadedData = await fetchResult.json();
            setFullMovie(loadedData);
            setIsLoading(false);
        })();
    }, []);

    const fullMovieView = (
        <ScrollView style={styles.container}>
            <Image style={styles.poster} source={{ uri: fullMovie['Poster'] }} indicator={Loader} threshold={150} />
            <Text><Text style={styles.title}>Title: </Text>"{fullMovie['Title'] || '?'}"</Text>
            <Text><Text style={styles.title}>Year: </Text>{fullMovie['Year'] || '?'}</Text>
            <Text><Text style={styles.title} style={styles.title}>Genre: </Text>{fullMovie['Genre'] || '?'}</Text>
            <Divider style={styles.divider}/>
            <Text><Text style={styles.title}>Director: </Text>{fullMovie['Director'] || '?'}</Text>
            <Text><Text style={styles.title}>Actors: </Text>{fullMovie['Actors'] || '?'}</Text>
            <Divider style={styles.divider}/>
            <Text><Text style={styles.title}>Country: </Text>{fullMovie['Country'] || '?'}</Text>
            <Text><Text style={styles.title}>Language: </Text>{fullMovie['Language'] || '?'}</Text>
            <Text><Text style={styles.title}>Rated: </Text>{fullMovie['Rated'] || '?'}</Text>
            <Text><Text style={styles.title}>Production: </Text>{fullMovie['Production'] || '?'}</Text>
            <Text><Text style={styles.title}>Released: </Text>{fullMovie['Released'] || '?'}</Text>
            <Text><Text style={styles.title}>Runtime: </Text>{fullMovie['Runtime'] || '?'}</Text>
            <Divider style={styles.divider}/>
            <Text><Text style={styles.title}>Awards: </Text>{fullMovie['Awards'] || '?'}</Text>
            <Text><Text style={styles.title}>Rating: </Text>{fullMovie['imdbRating'] || '?'}/10</Text>
            <Text><Text style={styles.title}>Votes: </Text>{fullMovie['imdbVotes'] || '?'}</Text>
            <Divider style={styles.divider}/>
            <Text style={styles.footer}><Text style={styles.title}>Plot: </Text>{fullMovie['Plot'] || '?'}</Text>
        </ScrollView>
    );
    
    return isLoading ? <Loader /> : fullMovieView;
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        paddingTop: 35,
        paddingHorizontal: 17.5,
        backgroundColor: "#fff"
    },
    poster: {
        alignSelf: "center",
        width: 250,
        height: 400,
        marginBottom: 25
    },
    title: {
        fontSize: 15,
        fontWeight: "bold"
    },
    divider: {
        marginVertical: 15,
        backgroundColor: "#000"
    },
    footer: {
        paddingBottom: 75
    }
});
