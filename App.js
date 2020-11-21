import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { loadFileAsync } from './utils/fs';
import { removeItemByProp } from './utils/utils';
import Home from './components/Home';
import Movies from './components/Movies';
import NewRecord from './components/NewRecord';
import FullMovie from './components/FullMovie';
import Gallery from './components/Gallery';
import Drawing from './components/Drawing';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const MoviesStack = createStackNavigator();

export default function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [galleryBadge, setGalleryBadge] = useState(0);
  
  useEffect(() => {
    (async () => {
      const loadedData = await loadFileAsync('MoviesList.txt');
      setMoviesList(loadedData['Search']);
    })();
  }, []);

  
  const routing = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const activeSize = focused ? size * 1.05 : size * .85;

      if (route.name === 'Home') {
        return <FontAwesome5 name="home" size={activeSize} color={color} />
      } else if (route.name === 'Movies') {
        return <MaterialCommunityIcons name="library-movie" size={activeSize} color={color} />;
      } else if (route.name === 'Add movie') {
        return <MaterialIcons name="library-add" size={activeSize} color={color} />
      } else if (route.name === 'Gallery') {
        return <Ionicons name="ios-images" size={activeSize} color={color} />
      } else if (route.name === 'Drawing') {
        return <MaterialCommunityIcons name="draw" size={activeSize} color={color} />
      };
    }
  });
  
  const removeMovieFromList = (imdbID) => {
    setMoviesList(prev => removeItemByProp(prev, 'imdbID', imdbID));
  };
  
  const addMovieToList = (movie) => {
    setMoviesList(prev => [...prev, movie]);
  };
  
  const badgeHandler = (badgeValue, setBadge) => {
    setBadge(badgeValue);
  };
  
  const MoviesStackScreen = () => (
    <MoviesStack.Navigator>
      <MoviesStack.Screen name="Movies" children={() => (
        <Movies
          list={moviesList}
          removeItemFromList={removeMovieFromList}
        />
      )} />
      <MoviesStack.Screen name="Full movie" component={FullMovie} />
    </MoviesStack.Navigator>
  );
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={routing}
        tabBarOptions={{
          inactiveTintColor: "#000",
          activeTintColor: "#2288dc"
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Gallery" children={() => (
          <Gallery
            badgeHandler={(badgeValue) => badgeHandler(badgeValue, setGalleryBadge)} />)}
            options={{ tabBarBadge: galleryBadge, tabBarBadgeStyle: { backgroundColor: "#2288dc", color: "#fff" } }} />
        <Tab.Screen name="Movies" component={MoviesStackScreen} options={{ tabBarBadge: moviesList.length + 1, tabBarBadgeStyle: { backgroundColor: "#2288dc", color: "#fff" } }} />
        <Tab.Screen name="Add movie" children={() => (<NewRecord addItemToList={addMovieToList} />)} />
        <Tab.Screen name="Drawing" component={Drawing} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
