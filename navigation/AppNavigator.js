import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import QRHistoryScreen from '../screens/QRHistoryScreen';
import { auth } from '../firebase';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user));
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="History" component={QRHistoryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
