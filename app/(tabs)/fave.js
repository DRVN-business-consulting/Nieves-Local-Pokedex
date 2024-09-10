import React, {useContext} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useFavorite } from '../context/favoriteContext.js'; // Adjust the path as necessary
import {ThemeContext, themes} from '../context/themes.js';

export default function Fave() {
    const { favorite, setFavorite } = useFavorite(); // Get the favorite Pokémon from the context
    const router = useRouter();
    const { theme } = useContext(ThemeContext);
    const themeStyles = themes[theme];

  const favoriteList = Object.values(favorite); // Convert the favorite object into an array

   
  const handleDetails = (id) => {
    if (id) {
        router.push({
          pathname: '/details',
          params: { id },
        });
      } else {
        console.error('ID is undefined or null');
      }
  };
  const handleFavorite = (pokemon) => {
    setFavorite((prevFavorites) => {
      if (prevFavorites[pokemon.id]) {
        // If the Pokémon is already a favorite, remove it from favorites
        const updatedFavorites = { ...prevFavorites };
        delete updatedFavorites[pokemon.id]; 
        return updatedFavorites;
      } else {
        // Otherwise, add it to favorites
        return {
          ...prevFavorites,
          [pokemon.id]: pokemon, 
        };
      }
    });
  };

  if (favoriteList.length === 0) {
    return (
      <View style={[styles.container, themeStyles.background]}>
        <Text style={themeStyles.text}>No favorites yet!</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, themeStyles.background]}>
      <FlatList
        data={favoriteList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDetails(item.id)}>
            <View style={styles.pokemonItem}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image
                source={{ uri: item.image?.hires || 'default-image-url' }}
                style={styles.pokemonImage}
              />
              <Text style={[styles.pokemonName,themeStyles.text]}>{item.name?.english || 'Unknown'}</Text>
            </View>
            <TouchableOpacity onPress={() => handleFavorite(item)}>
              <Image
                source={favorite[item.id] 
                  ? require('../../assets/star-filled.png') // Filled star if favorite
                  : theme === 'dark'
                    ? require('../../assets/star-unfilled-white.png') // White unfilled star in dark mode
                    : require('../../assets/star-unfilled.png') // Black/regular unfilled star in light mode
                }
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  pokemonItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  pokemonName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
