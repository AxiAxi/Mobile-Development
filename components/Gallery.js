import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import SubGallery from './SubGallery';

const arraySubSplitter = (arr = [], subArrSize = 9) => {
  const result = [];
  
  for (let i = 0; i < Math.ceil(arr.length / subArrSize); i++) {
    result[i] = arr.slice(i * subArrSize, (i * subArrSize) + subArrSize);
  };
  
  return result;
};

export default function Gallery({ badgeHandler }) {
  const [gallery, setGallery] = useState([]);
  const [particleSize, setParticleSize] = useState({
    width: Dimensions.get('screen').width / 3,
    height: Dimensions.get('screen').height / 5
  });
  
  useEffect(() => {
    const url = `https://pixabay.com/api/?key=19193969-87191e5db266905fe8936d565&q=yellow+flowers&image_type=photo&per_page=27`;
    
    (async () => {
      const fetchResult = await fetch(url);
      const loadedData = await fetchResult.json();
      const loadedDataURIs = loadedData['hits'].map((lD) => ({ uri: lD['largeImageURL'] }));
      setGallery(loadedDataURIs);
    })();
  }, []);
  
  useEffect(() => badgeHandler(gallery.length));
  
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      };
    })();
  }, []);
  
  const pickImage = async () => {
    const pickedItem = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1
    });

    if (!pickedItem.cancelled) {
      setGallery(prevState => [...prevState, { uri: pickedItem.uri }]);
      badgeHandler(gallery.length + 1);
    };
  };
  
  const isPortrait = () => {
    const dimension = Dimensions.get('window');
    return dimension.height >= dimension.width;
  };
  
  Dimensions.addEventListener('change', () => {
    const currentDimension = Dimensions.get('screen');
    setParticleSize({
      width: currentDimension.width / (isPortrait() ? 3 : 1.425),
      height: currentDimension.height / (isPortrait() ? 5 : 2.5)
    });
  });
  
  const galleryComponent = arraySubSplitter(gallery).map(
    subGallery => (
      <SubGallery
        key={subGallery[0].uri}
        gallery={subGallery}
        w={particleSize.width}
        h={particleSize.height}
      />
    )
  );
  
  return (
    <View style={styles.header}>
      {gallery.length !== 0 && (
        <ScrollView style={styles.gallery}>
          {galleryComponent}
        </ScrollView>
      )}
      {gallery.length === 0 && <View style={styles.noShow}><Text style={{ fontStyle: "italic" }}>Nothing to show yet</Text></View>}
      <View style={styles.picker}><Button title="PICK AN IMAGE FROM GALLERY" onPress={pickImage} /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  gallery: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  picker: {
    alignSelf: "center",
    width: "100%"
  },
  noShow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
});
