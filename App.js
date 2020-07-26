import React from 'react';
import { Icon } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as firebase from 'firebase';

import Home from './src/screens/Home.js';
import LeaderBoard from './src/screens/LeaderBoard.js'

const Tab = createBottomTabNavigator();
// app edited my mini
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
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "home";
              }
              else if (route.name === "LeaderBoard") {
                iconName = "list";
              }
              else {
                iconName = "list";
              }
              return <Icon name={iconName} type="FontAwesome" style={{color:"white"}}/>
            }
          })}
          tabBarOptions={{
            activeTintColor: "#74B9FF",
            style:{
              backgroundColor:"#000000",
              borderTopColor:"black"
            }
          }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="LeaderBoard" component={LeaderBoard}/>
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

