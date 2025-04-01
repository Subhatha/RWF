import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './firebase/firebaseConfig';
import { Text, View, Switch, useWindowDimensions, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ProfileSetupScreen from './components/ProfileSetupScreen';
import HomeScreen from './components/HomeScreen';
import WorkoutScreen from './components/WorkoutScreen';
import ProgressScreen from './components/ProgressScreen';
import ScheduleScreen from './components/ScheduleScreen';
import EquipmentScreen from './components/EquipmentScreen';
import ProfilePage from './components/ProfilePage';
import WorkoutDataLogScreen from './components/WorkoutDataLogScreen';

import { lightTheme, darkTheme } from './components/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

const useTextScaling = () => {
  const { fontScale } = useWindowDimensions();
  return (size) => size * fontScale;
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    <Stack.Screen name="Profile" component={ProfilePage} />
    <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
    <Stack.Screen name="WorkoutDataLog" component={WorkoutDataLogScreen} />
  </Stack.Navigator>
);

const MainTabNavigator = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const scaleText = useTextScaling();
  const currentTheme = isDarkTheme ? darkTheme : lightTheme; 
  
  return (
    <>
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Text style={{ color: isDarkTheme ? '#fff' : '#000', fontSize: scaleText(16) }}>Dark Mode</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Workout') iconName = 'dumbbell';
            else if (route.name === 'Progress') iconName = 'chart-line';
            else if (route.name === 'Schedule') iconName = 'calendar-alt';
            else if (route.name === 'Equipment') iconName = 'weight';
            else if (route.name === 'Profile') iconName = 'user';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: isDarkTheme ? '#00f' : '#007FFF',
          tabBarInactiveTintColor: isDarkTheme ? '#888' : '#555',
          tabBarStyle: { backgroundColor: isDarkTheme ? '#222' : '#fff' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Workout" component={WorkoutScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
        <Tab.Screen name="Equipment" component={EquipmentScreen} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          setProfileCompleted(userDoc.exists && userDoc.data().profileCompleted);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

 
  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  if (isLoading) {
    return (
      <NavigationContainer theme={currentTheme}>
        <Text style={{ color: currentTheme.colors.text }}>Loading...</Text>
      </NavigationContainer>
    );
  }

  if (!user) {
    return (
      <NavigationContainer theme={currentTheme}>
        <AuthStack />
      </NavigationContainer>
    );
  }

  if (!profileCompleted) {
    return (
      <NavigationContainer theme={currentTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={currentTheme}>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
