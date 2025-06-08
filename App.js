import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import { auth, db } from './firebase/firebaseConfig';

import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ProfileSetupScreen from './components/ProfileSetupScreen';
import HomeScreen from './components/HomeScreen';
import WorkoutScreen from './components/WorkoutScreen';
import ProgressScreen from './components/ProgressScreen';
// Changed import here:
import RecentScreen from './components/RecentScreen';
import EquipmentScreen from './components/EquipmentScreen';
import ProfilePage from './components/ProfilePage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Workout':
              iconName = 'dumbbell';
              break;
            case 'Progress':
              iconName = 'chart-line';
              break;
            // Changed tab name here:
            case 'Recent':
              iconName = 'calendar-alt';
              break;
            case 'Equipment':
              iconName = 'weight';
              break;
            case 'Profile':
              iconName = 'user';
              break;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007FFF',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: { backgroundColor: '#fff' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      {/* Changed name and component here: */}
      <Tab.Screen name="Recent" component={RecentScreen} />
      <Tab.Screen name="Equipment" component={EquipmentScreen} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const doc = await db.collection('users').doc(user.uid).get();
          setProfileCompleted(doc.exists && doc.data().profileCompleted);
        } catch (e) {
          console.error('Error fetching profile:', e);
          setProfileCompleted(false);
        }
      } else {
        setProfileCompleted(false);
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthStack />
      ) : !profileCompleted ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        </Stack.Navigator>
      ) : (
        <MainTabs />
      )}
    </NavigationContainer>
  );
}
