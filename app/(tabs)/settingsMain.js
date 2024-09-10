import {View, Text, Button, StyleSheet, Switch} from 'react-native';
import {ThemeContext, themes} from '../context/themes.js';
import React, {useContext} from 'react'
// import { useRouter } from 'expo-router';
import { router } from "expo-router";

import { CommonActions, useNavigation } from '@react-navigation/native';

export default function SettingMain(){
  
  const { theme, setTheme } = useContext(ThemeContext);  
  const themeStyles = themes[theme];
  // const router = useRouter();
  const navigation = useNavigation();

  const toggleTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  
    return(
        <View style={[styles.container, themeStyles.background]}>
            <Text style={themeStyles.text}>Settings Screen</Text>
            <Button title='Logout' onPress={()=>router.push('../settings')}/>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            
            
        </View>
    );
}

const styles =StyleSheet.create({
container:{
  height: '100%',
  padding:16
}
})
// import { View, Button, Switch} from "react-native";
// import { router } from "expo-router";
// import {ThemeContext, themes} from '../context/themes.js';
// import React,{useContext} from 'react'

// export default function SettingMain(){
//   const { theme, setTheme } = useContext(ThemeContext);  
//   const themeStyles = themes[theme];

//   const toggleTheme = (value) => {
//     setTheme(value ? 'dark' : 'light');
//   };

//   return(
    
// <View>
//   <Button title='Logout' onPress={()=>router.push('../settings')}/>
//   <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
// </View>
//   )
// }