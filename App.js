import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/screens/HomeScreen';
import { AsyncStorage } from 'react-native';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My home' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}