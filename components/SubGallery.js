import React from 'react';
import { View, StyleSheet } from 'react-native';
import Loader from './Loader';
import Image from 'react-native-image-progress';

export default function SubGallery({ gallery, w, h }) {
    const p = { width: w, height: h};
    const p2 = { width: w * 2, height: h * 2};

    const SGImage = (uri, cl = p) => (
        <Image style={cl} source={uri} indicator={Loader} threshold={150} />
    );
    
    return (
        <>
            <View style={styles.h}>
                {gallery[0] && SGImage(gallery[0], p2)}
                <View style={styles.v}>
                    {gallery[1] && SGImage(gallery[1])}
                    {gallery[2] && SGImage(gallery[2])}
                </View>
            </View>
            <View style={styles.h}>
                {gallery[3] && SGImage(gallery[3])}
                {gallery[4] && SGImage(gallery[4])}
                {gallery[5] && SGImage(gallery[5])}
            </View>
            <View style={styles.h}>
                <View style={styles.v}>
                    {gallery[6] && SGImage(gallery[6])}
                    {gallery[7] && SGImage(gallery[7])}
                </View>
                {gallery[8] && SGImage(gallery[8], p2)}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    h: {
        display: "flex",
        flexDirection: "row"
    },
    v: {
        display: "flex",
        flexDirection: "column"
    }
});
