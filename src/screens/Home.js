import 'react-native-gesture-handler';
import React from 'react';
import { Icon } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen.js';
import LeaderBoardScreen from './LeaderBoardScreen.js';

const Tab = createBottomTabNavigator();

export default class Home extends React.Component {
    render() {
        return (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;
                            if (route.name === "Learn") {
                                iconName = "book";
                            }
                            else if (route.name === "LeaderBoard") {
                                iconName = "list-alt";
                            }
                            else {
                                iconName = "list";
                            }
                            return <Icon name={iconName} type="FontAwesome" style={{ color: "white" }} />
                        }
                    })}
                    tabBarOptions={{
                        activeTintColor: "#74B9FF",
                        style: {
                            backgroundColor: "#000000",
                            borderTopColor: "black"
                        }
                    }}>
                    <Tab.Screen name="Learn" component={HomeScreen} />
                    <Tab.Screen name="LeaderBoard" component={LeaderBoardScreen} />
                </Tab.Navigator>
        )
    }
}

