import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import { Input, Button, Item, Label } from 'native-base';
import Loading from './Loading.js';
import * as Font from 'expo-font';

export default class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFontLoaded: false
        }
    }

    loadFont = async () => {
        await Font.loadAsync({
            robotoBold: require("../fonts/roboto-bold.ttf"),
            ralewayMedium: require("../fonts/raleway-medium.ttf"),
            nunitoRegular: require("../fonts/nunito-regular.ttf")
        })
        this.setState({ isFontLoaded: true })
    }

    componentDidMount() {
        this.loadFont();
    }

    render() {
        if (this.state.isFontLoaded) {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text>Welcome Screen</Text>
                    <Button onPress={() => { this.props.navigation.navigate("SignUp") }}><Text>SignUp</Text></Button>
                    <Button onPress={() => { this.props.navigation.navigate("SignIn") }}><Text>SignIn</Text></Button>
                    <StatusBar style="light" />
                </ScrollView>
            )
        } else {
            return (
                <Loading />
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});