import {Stack} from 'expo-router'
import { FavoriteProvider } from './context/favoriteContext'
import {ThemeContext, themes} from './context/themes.js';
import React, {useContext, useState} from 'react';
import { pokemonContext, pokemonList, PokemonProvider } from './context/pokemonContext.js';

export default function AppLayout(){
  
    const [theme, setTheme] = useState('light');  // Global theme state
    const themeStyles = themes[theme];

    
    return(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <PokemonProvider>
     <FavoriteProvider>
  
        <Stack>
            <Stack.Screen name='index'
                options={{
                    headerShown: false,
                }}/>
            
            <Stack.Screen name='(tabs)'
                options={{
                    headerShown: false,
                }}/>
                  <Stack.Screen name="details" 
                 options={{ title: 'Pokémon Details' }} />
            <Stack.Screen name="settings" 
                 options={{ headerShown: false, }} />
                 
                
        </Stack>
        
        </FavoriteProvider>
        </PokemonProvider>
   </ThemeContext.Provider>
       
    )
}