import React from 'react';
import { ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loader() {
    return (
        <ScrollView contentContainerStyle={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#2288dc" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
});
