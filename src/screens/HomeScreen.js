import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LearnScreen from './LearnScreen.js';
import SubjectLearnScreen from './Learning/SubjectLearnScreen.js';
import PlayVideo from './Learning/PlayVideo.js';
import Quiz from './Learning/Quiz.js';
import PdfView from './Learning/PdfView.js';
import WebViewForSubject from './Learning/WebViewForSubject.js';

const Stack = createStackNavigator();

export default class HomeScreen extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="learn" component={LearnScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SubjectLearn" component={SubjectLearnScreen} options={{ title: "Learn", headerShown: false }} />
                <Stack.Screen name="PlayVideo" component={PlayVideo} options={{ title: "Video Player" }} />
                <Stack.Screen name="Quiz" component={Quiz} options={{ title: "Quiz", headerShown: false }} />
                <Stack.Screen name="PdfView" component={PdfView} options={{ title: "View Document" }} />
                <Stack.Screen name="WebViewForSubject" component={WebViewForSubject} options={{ title: "View Website" }} />
            </Stack.Navigator>
        )
    }
}