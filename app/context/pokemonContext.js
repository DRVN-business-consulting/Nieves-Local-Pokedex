import React,{createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';


const pokemonContext = React.createContext();

function PokemonProvider({children}){
    const [allPokemons, setAllPokemons] = React.useState([]);
    const [pokemonList, setPokemonList] = useState({});

    const resetAsyncStorage = async () => {
        try {
          // Clear AsyncStorage on reload
          await AsyncStorage.removeItem('pokemonList');
        } catch (error) {
          console.error('Error resetting AsyncStorage:', error);
        }
      };

    
        const fetchPokemon = async () => {
            try {
                const storedPokemons = await AsyncStorage.getItem('pokemonList');
                if (storedPokemons) {
                    const parsedStoredPokemons = JSON.parse(storedPokemons);
                    console.log('Stored Pokémon data from AsyncStorage'); //confirm pokemon stored in asyncstorage
                    setPokemonList(parsedStoredPokemons);
                  }  else {
                    const response = await fetch('https://pokemon-api-nssw.onrender.com/pokemon'); // Limiting fetch to 10 Pokémon
                    const data = await response.json();
                    setPokemonList(data);
                    console.log('Fetched data:', data); 
                    await AsyncStorage.setItem('pokemonList', JSON.stringify(data)); // Store Pokémon in AsyncStorage
                }
            } catch (error) {
                console.error('Error fetching Pokémon:', error);
            }
        };

       

    const updatePokemonList = async (updatedList) => {
        try {
          await AsyncStorage.setItem('pokemonList', JSON.stringify(updatedList));
          setPokemonList(updatedList);
        } catch (error) {
          console.error('Error updating Pokémon data:', error);
        }
      };

        const deletePokemon = async (id) => {
        try {
            const updatedList = pokemonList.filter(pokemon => pokemon.id !== id);
            await updatePokemonList(updatedList);
        } catch (error) {
            console.error('Error deleting Pokémon:', error);
        }
    };
    const refreshPokemonList = async () => {
        await fetchPokemon(); // Always fetch from API
      };
      useEffect(() => {
        resetAsyncStorage(); // Reset on reload
        fetchPokemon(); // Fetch new data from the API
      }, []);
return (
    <pokemonContext.Provider value={{ pokemonList, setPokemonList:updatePokemonList, refreshPokemonList }}>
        {children}
    </pokemonContext.Provider>
);

};

const usePokemon = () => React.useContext(pokemonContext);

export {PokemonProvider, usePokemon, pokemonContext}