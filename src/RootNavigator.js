import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import WebviewScreen from './WebviewScreen';

const Stack = createStackNavigator();

const DashboardScreen = ({ navigation }) => {
    return (
      <Stack.Navigator
        initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Webview"
          component={WebviewScreen}
        />
      </Stack.Navigator>
    );
  }
const RootNavigator = () => {
    
    return (
        <NavigationContainer>
            <DashboardScreen/>
        </NavigationContainer>
    );
};
export default RootNavigator;