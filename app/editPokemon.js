import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { usePokemon } from './context/pokemonContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditPokemon() {
  const { id } = useLocalSearchParams(); // Get the ID from route parameters
  const { pokemonList, setPokemonList } = usePokemon();
  const [pokemon, setPokemon] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (id && Array.isArray(pokemonList)) {
      const selectedPokemon = pokemonList.find(pokemon => pokemon.id === parseInt(id, 10));
      if (selectedPokemon) {
        setPokemon(selectedPokemon);
        setName(selectedPokemon.name.english);
        setDescription(selectedPokemon.description || ''); // Set description if exists
      } else {
        Alert.alert('Error', 'Pokémon not found');
      }
    }
  }, [id, pokemonList]);

  const handleSave = async () => {
    if (name && description) { // Updated to check description
      const updatedPokemon = { ...pokemon, name: { english: name }, description }; // Update description
      const updatedList = pokemonList.map(p => (p.id === parseInt(id, 10) ? updatedPokemon : p));
      setPokemonList(updatedList);

      // Save updated list to AsyncStorage
      try {
        await AsyncStorage.setItem('pokemonList', JSON.stringify(updatedList));
        router.back(); // Navigate back to the main page
      } catch (error) {
        console.error('Error saving Pokémon data:', error);
        Alert.alert('Error', 'Failed to save changes');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  if (!pokemon) return <View><Text>Loading...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
});
