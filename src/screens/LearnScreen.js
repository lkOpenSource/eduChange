import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import { Button } from 'native-base'
import Loading from './Loading.js';
import * as Font from 'expo-font';
import * as firebase from 'firebase';

export default class LearnScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
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

    getUID = async () => {
        const userId = await AsyncStorage.getItem("uid");
        //  console.log(userId)
        firebase.database().ref(`users/${userId}`).once("value", (dataSnapShot) => {
            if (dataSnapShot.val()) {
                this.setState({ data: dataSnapShot.val() })

                // console.log(dataSnapShot.val())
            } else {
                alert("Check your internet connection and restart the app !!");
            }
        })
            .catch((error) => console.log(error))
    }

    componentDidMount() {
        this.loadFont();
        this.getUID();
    }

    render() {
        if (this.state.data !== {} && this.state.isFontLoaded) {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text>EduChange Welcome to Home Screen</Text>
                    <Text>{this.state.data.name}</Text>
                    <Text>{this.state.data.grade}</Text>
                    <Button onPress={() => {
                        this.props.navigation.navigate("SubjectLearn", { subject: "ICT", grade: this.state.data.grade })
                    }}>
                        <Text>ICT</Text>
                    </Button>
                    <Button onPress={() => {
                        this.props.navigation.navigate("SubjectLearn", { subject: "Science", grade: this.state.data.grade })
                    }}>
                        <Text>Science</Text>
                    </Button>
                    <StatusBar style="light" />
                </ScrollView>
            );
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
