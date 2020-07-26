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
  apiKey: "AIzaSyAT6SlQF2EH3YQx6rsA4xfl6vqFQTpYXZM",
  authDomain: "hfm-hcc.firebaseapp.com",
  databaseURL: "https://hfm-hcc.firebaseio.com",
  projectId: "hfm-hcc",
  storageBucket: "hfm-hcc.appspot.com",
  messagingSenderId: "842435382557",
  appId: "1:842435382557:web:61a06c0eb51c766d87e5f4",
  measurementId: "G-BZBRVNEBNB"
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

