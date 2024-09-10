import {View, Text, Button, StyleSheet, Switch} from 'react-native';
import {ThemeContext, themes} from './context/themes.js';
import React, {useContext} from 'react'
// import { useRouter } from 'expo-router';

import { CommonActions, useNavigation } from '@react-navigation/native';

export default function SettingsScreen(){
  
  const { theme, setTheme } = useContext(ThemeContext);  
  const themeStyles = themes[theme];
  // const router = useRouter();
  const navigation = useNavigation();

  const toggleTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,  // Focus on the first route in the new state
        routes: [{ name: 'index' }], // Navigate to the root screen
      })
    );
  };
    return(
        <View style={[styles.container, themeStyles.background]}>
            <Text style={themeStyles.text}>Are you sure you want to logout?</Text>
            <Button title="Logout"  onPress={handleLogout}/>
            
            
            
        </View>
    );
}

const styles =StyleSheet.create({
container:{
  height: '100%',
  padding:16
}
})