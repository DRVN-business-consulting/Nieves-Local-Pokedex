import { useEffect, useState, useContex} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import { useRouter } from 'expo-router';
import { useFavorite } from '../context/favoriteContext.js';
import { ThemeContext,themes } from '../context/themes.js';
import { usePokemon} from '../context/pokemonContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


import React
 from 'react';
export default function allPokemons() {
  const {pokemonList, setPokemonList} = usePokemon();
  // const [pokemonList, setPokemonList] = useState([]);
  const router = useRouter(); 
  const { favorite, setFavorite } = useFavorite();
  const { theme } = React.useContext(ThemeContext);
  const themeStyles = themes[theme];

  // useEffect(() => {
  //   const fetchPokemon = async () => {
  //     try {
  //       const response = await fetch('https://pokemon-api-nssw.onrender.com/pokemon');
  //       const data = await response.json();
  //       setPokemonList(data); 
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchPokemon();
  // }, []);
  const limitedPokemonList = pokemonList.slice(0, 10);

  const handleFavorite = (pokemon) => {
    setFavorite((prevFavorites) => {
      if (prevFavorites[pokemon.id]) {
        const updatedFavorites = { ...prevFavorites };
        delete updatedFavorites[pokemon.id]; 
        return updatedFavorites;
      } else {
        return {
          ...prevFavorites,
          [pokemon.id]: pokemon, 
        };
      }
    });
  };
  
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

  const handleEdit = (pokemon) => {
    if (pokemon) {
      router.push({
        pathname: '/editPokemon',
        params: { id: pokemon.id },
      });
    } else {
      console.error('Pokemon is undefined or null');
    };}

    const handleDelete = async (id) => {
      if (id) {
        try {
          const updatedList = pokemonList.filter(p => p.id !== parseInt(id, 10));
          setPokemonList(updatedList);
          await AsyncStorage.setItem('pokemonList', JSON.stringify(updatedList));

        } catch (error) {
          console.error('Error deleting Pokémon data:', error);
          Alert.alert('Error', 'Failed to delete Pokémon');
        }
      } else {
        Alert.alert('Error', 'Pokémon ID is missing');
      }
    };
  return (
   
    <View style={[styles.container, themeStyles.background]}>
      <FlatList
        data={limitedPokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDetails(item.id)}>
          <View style={styles.pokemonItem} >
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image 
              source={{ uri: item.image.hires }} 
              style={styles.pokemonImage}
            />
            <Text style={[styles.pokemonName, themeStyles.text]}>{item.name.english}</Text>
            
             </View>
             <View style={{flexDirection:'row'}}>
             <TouchableOpacity style={{marginHorizontal:3}} onPress={() => handleFavorite(item)}>
              <Image
                source={favorite[item.id] 
                  ? require('../../assets/star-filled.png') // Filled star if favorite
                  : theme === 'dark'
                    ? require('../../assets/star-unfilled-white.png') // White unfilled star in dark mode
                    : require('../../assets/star-unfilled.png') // Black/regular unfilled star in light mode
                }
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:3}} onPress={() => handleEdit(item)}>
              <Image
                source={theme === 'dark'
                  ? require('../../assets/white-edit.png') // if clicked
                  :  require('../../assets/edit.png') // Black/regular in light mode
                }
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:3}} onPress={() => handleDelete(item.id)}>
              <Image
                source={theme === 'dark'
                  ? require('../../assets/delete-white.png') // if clicked
                  :  require('../../assets/delete.png') // Black/regular in light mode
                }
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
            </View>
          </View>
          </TouchableOpacity>
        )}>
        
        </FlatList>    
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
    fontSize: 20
  },
});