import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LearnScreen from '../screens/LearnScreen.js';
import SubjectLearnScreen from './Learning/SubjectLearnScreen.js';
import PlayVideo from './Learning/PlayVideo.js';
import Quiz from './Learning/Quiz.js';

const Stack = createStackNavigator();

export default class HomeScreen extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="learn" component={LearnScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SubjectLearn" component={SubjectLearnScreen} options={{ title:"Learn" }}/>
                <Stack.Screen name="PlayVideo" component={PlayVideo} options={{ title:"Video Player" }}/>
                <Stack.Screen name="Quiz" component={Quiz} options={{ title:"Quiz" }}/>
            </Stack.Navigator>
        )
    }
}

// headerRight: () => (
//     <TouchableOpacity onPress={() => { this.props.navigation.navigate("learn") }} >
//         <Icon name="back" type="FontAwesome" style={{}} />
//     </TouchableOpacity>
// )