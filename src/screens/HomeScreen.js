import 'react-native-gesture-handler';
import React from 'react';
import { Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ICT from '../screens/subjects/ICT.js';
import learnScreen from './learnScreen.js';

const Stack = createStackNavigator();

export default class HomeScreen extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="ICT" component={ICT} options={{
                    headerRight: () => (<Button title="press" onPress={() => { this.props.navigation.navigate("learn") }} />)
                }} />
                <Stack.Screen name="learn" component={learnScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }
}

