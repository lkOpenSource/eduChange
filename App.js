import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

import Home from './src/screens/Home.js';
import LoadingScreen from './src/screens/LoadingScreen.js';
import SignUpScreen from './src/screens/SignUpScreen.js';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyCapRTwxPlhpAQwpthO9vjKALXttoBPPso",
  authDomain: "edu--change.firebaseapp.com",
  databaseURL: "https://edu--change.firebaseio.com",
  projectId: "edu--change",
  storageBucket: "edu--change.appspot.com",
  messagingSenderId: "346435713180",
  appId: "1:346435713180:web:50c1f8776ef8afdf2cd559",
  measurementId: "G-1R8CN7XHM0"
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

