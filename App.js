import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './firebase/firebaseConfig'; 
import { Text } from 'react-native';  
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


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    firebase.auth().signOut();

    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setProfileCompleted(userData.profileCompleted || false);
          } else {
            setProfileCompleted(false);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setProfileCompleted(false);
        }
      }
      setUser(user);  
      setIsLoading(false);
    });

    return unsubscribe; 
  }, []);

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

  const MainTabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Workout') {
            iconName = 'dumbbell';
          } else if (route.name === 'Progress') {
            iconName = 'chart-line';
          } else if (route.name === 'Schedule') {
            iconName = 'calendar-alt';
          } else if (route.name === 'Equipment') {
            iconName = 'weight';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#007FFF',
        inactiveTintColor: '#555',
        style: {
          backgroundColor: '#1e1e1e', // Set background color of the tab bar
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Workout" component={WorkoutScreen} />
    <Tab.Screen name="Progress" component={ProgressScreen} />
    <Tab.Screen name="Schedule" component={ScheduleScreen} />
    <Tab.Screen name="Equipment" component={EquipmentScreen} />
    <Tab.Screen name="Profile" component={ProfilePage} />
  
  </Tab.Navigator>
  );

  if (isLoading) {
    return (
      <NavigationContainer>
        <Text>Loading...</Text>
      </NavigationContainer>
    );
  }

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }

  if (!profileCompleted) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
