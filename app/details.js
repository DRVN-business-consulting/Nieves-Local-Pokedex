import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {ThemeContext, themes} from './context/themes.js';

export default function DetailsScreen() {
  const {id} = useLocalSearchParams();
  const [pokemon, setPokemon] = useState();
  const { theme } = useContext(ThemeContext);
  const themeStyles = themes[theme];
  
  const typeColors = {
    Grass: 'green',
    Fire: 'red',
    Water: 'blue',
    Electric: 'goldenrod',
    Ice: 'lightblue',
    Fighting: 'orange',
    Poison: 'purple',
    Ground: 'brown',
    Flying: 'skyblue',
    Psychic: 'pink',
    Bug: 'lightgreen',
    Rock: 'gray',
    Ghost: 'indigo',
    Dragon: 'gold',
    Dark: 'black',
    Steel: 'silver',
    Fairy: 'lightpink',
    Normal: 'violet',
    Default: 'white', // Default color if type not found
  };
  const getBackgroundColorByType = (type) => {
    if (!type || !type[0]) {
      return typeColors.Default; // Return default color if type is undefined or empty
    }
    return typeColors[type[0]] || typeColors.Default;
  };
  useEffect(() => {
    const fetchPokemonById = async () => {
      try {
        const response = await fetch(`https://pokemon-api-nssw.onrender.com/pokemon/${id}`);
        const data = await response.json();

        const pokemonData = data.find(poke => poke.id === parseInt(id, 10));

      //  console.log('Filtered Pokémon data:', pokemonData); // Check filtered data
        setPokemon(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    if (id) {
      fetchPokemonById();
    }
  }, [id]);


  return (
    <View style={[styles.container,themeStyles.background]}>
      <Image
        source={{ uri: pokemon?.image?.hires }}
        style={styles.pokemonImage}
      />
      <Text style={[styles.pokemonName,themeStyles.text]}>{pokemon?.name?.english}</Text>

     <View style={[styles.txtcontainer,{backgroundColor:getBackgroundColorByType(pokemon?.type)} ]}>

      <Text style={themeStyles.text}>{pokemon?.name?.japanese}</Text>
      <Text style={themeStyles.text}>Type: {pokemon?.type?.join(', ')}</Text>
      <Text style={themeStyles.text}>Species: {pokemon?.species}</Text>
      <Text style={themeStyles.text}>{pokemon?.description}</Text>
      <Text style={themeStyles.text}>HP: {pokemon?.base?.HP}</Text>
      <Text style={themeStyles.text}> Attack: {pokemon?.base?.Attack}</Text>
      <Text style={themeStyles.text}>Defense: {pokemon?.base?.Defense}</Text>
      <Text style={themeStyles.text}>Speed: {pokemon?.base?.Speed}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  txtcontainer:{
    padding:30, 
    width:'90%',
    height:'70%',
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:20
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
