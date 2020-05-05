import * as React from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import HomeScreen from './components/screens/HomeScreen';
import StartScreen from './components/screens/StartScreen';
import StartPickupScreen from './components/screens/StartPickupScreen';
import LoginScreen from './components/screens/LoginScreen';
import NewAccountScreen from './components/screens/NewAccountScreen';
import CartScreen from './components/screens/CartScreen';

// stylesheets
// import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Stack.Screen name="NewAccount" component={NewAccountScreen} options={{ title: 'New Account' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  }
  
}

const Stack = createStackNavigator();