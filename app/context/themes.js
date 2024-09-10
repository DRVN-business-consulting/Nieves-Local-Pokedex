import React from 'react';

export const themes = {
  light: {
   background: {backgroundColor:'white'},
   text: {color: 'black'}
  },
  dark: {
    background: {backgroundColor:'black'},
    text: {color: 'white'}
  },
};

export const ThemeContext = React.createContext({
  theme: 'light', 
  setTheme: () => {},
});