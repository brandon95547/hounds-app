import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// the platform component detects device info, is this Android, etc...
import {Platform, StyleSheet, Text, View} from 'react-native';

// screens
import HomeScreen from './components/screens/HomeScreen';
import StartScreen from './components/screens/StartScreen';
import StartPickupScreen from './components/screens/StartPickupScreen';
import LoginScreen from './components/screens/LoginScreen';

// stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app.css';

export default class App extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="Start" component={StartScreen} options={{ title: 'Start Order' }} />
          <Stack.Screen name="StartPickup" component={StartPickupScreen} options={{ title: 'Start Pickup Order' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  }
  
}

const Stack = createStackNavigator();
