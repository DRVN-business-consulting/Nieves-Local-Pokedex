import {Tabs} from 'expo-router';
import {ThemeContext, themes} from '../context/themes.js';
import React, {useState,useContext} from 'react';
import { View } from 'react-native';

export default function TabLayout(){
  const { theme } = useContext(ThemeContext);  // Consume the theme from context
  const themeStyles = themes[theme];   

    return(
        <View style={[{flex:1},themeStyles.background]}>
        <Tabs>
        
            <Tabs.Screen name='index'
            options={{
                title:'All Pokemon',
                headerShown:true}}/>
            <Tabs.Screen name='fave'
           
            options={{
                title:'Favorites',
                headerShown:true}}/>
            <Tabs.Screen name='settingsMain'
            
            options={{
                title:'Settings',
                headerShown:true}}/>

        
        </Tabs>
        </View>

    );
};