import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from './Loading.js';
import * as Font from 'expo-font';

export default class AboutScreen extends React.Component {

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
                <View style={styles.container}>
                    <Text>About Screen</Text>
                    <StatusBar style="light" />
                </View>
            )
        } else {
            return(
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
