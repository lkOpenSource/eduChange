import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

import Home from './src/screens/Home.js';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyCcETA2j0jQwMy2pvGizaBm_m6o0VJvMnA",
  authDomain: "educhange-2630e.firebaseapp.com",
  databaseURL: "https://educhange-2630e.firebaseio.com",
  projectId: "educhange-2630e",
  storageBucket: "educhange-2630e.appspot.com",
  messagingSenderId: "660519400438",
  appId: "1:660519400438:web:b37b9d2e882e00d7984dd7",
  measurementId: "G-KD1QDSCDL3"
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

