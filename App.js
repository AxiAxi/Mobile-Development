import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { saveFileAsync, loadFileAsync } from './utils/fs';
import Home from './components/Home';
import Movies from './components/Movies';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  // useEffect(() => {
  //   saveFileAsync(`{"Search":[{"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","imdbID":"tt0076759","Type":"movie","Poster":"Poster_01.jpg"},{"Title":"Star Wars: Episode V - The Empire Strikes Back","Year":"1980","imdbID":"tt0080684","Type":"movie","Poster":"Poster_02.jpg"},{"Title":"Star Wars: Episode VI - Return of the Jedi","Year":"1983","imdbID":"tt0086190","Type":"movie","Poster":"Poster_03.jpg"},{"Title":"Star Wars: Episode VII - The Force Awakens","Year":"","imdbID":"tt2488496","Type":"movie","Poster":""},{"Title":"Star Wars: Episode I - The Phantom Menace","Year":"1999","imdbID":"tt0120915","Type":"movie","Poster":"Poster_05.jpg"},{"Title":"Star Wars: Episode III - Revenge of the Sith","Year":"2005","imdbID":"tt0121766","Type":"movie","Poster":"Poster_06.jpg"},{"Title":"Star Wars: Episode II - Attack of the Clones","Year":"2002","imdbID":"tt0121765","Type":"movie","Poster":"Poster_07.jpg"},{"Title":"Star Trek","Year":"2009","imdbID":"tt0796366","Type":"movie","Poster":"Poster_08.jpg"},{"Title":"Star Wars: Episode VIII - The Last Jedi","Year":"2017","imdbID":"tt2527336","Type":"","Poster":""},{"Title":"Rogue One: A Star Wars Story","Year":"2016","imdbID":"tt3748528","Type":"movie","Poster":"Poster_10.jpg"}]}`,
  //   'MoviesList.txt', 'Download');
  // }, []);

  const [moviesList, setMoviesList] = useState([]);
  
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
      } else if (route.name === 'Movies list') {
        return <MaterialCommunityIcons name="library-movie" size={activeSize} color={color} />;
      };
    }
  });
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={routing}
        tabBarOptions={{
          inactiveTintColor: 'black',
          activeTintColor: 'blue'
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Movies list" children={() => (<Movies list={moviesList} />)} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
