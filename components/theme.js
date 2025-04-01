import { DefaultTheme, DarkTheme } from '@react-navigation/native';


export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#000',
    primary: '#007FFF',
    card: '#f8f8f8',
    border: '#ddd',
    notification: '#f00',
  },
};


export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#222',
    text: '#fff',
    primary: '#00f',
    card: '#333',
    border: '#444',
    notification: '#f00',
  },
};
