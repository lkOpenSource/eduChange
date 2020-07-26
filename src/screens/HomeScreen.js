import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import Loading from '../components/Loading.js';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    getUID = async () => {
        const userId = await AsyncStorage.getItem("uid");
        console.log(userId)
        firebase.database().ref(`users/${userId}`).once("value",(dataSnapShot) => {
            if (dataSnapShot.val()) {
                this.setState({ data: dataSnapShot.val() })
                console.log(dataSnapShot.val())
            } else {
                alert("Check your internet connection and restart the app !!");
            }
        })
            .catch((error) => console.log(error))
    }

    componentDidMount() {
        this.getUID();
    }

    render() {
        if (this.state.data !== {}) {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text>EduChange Welcome to Home Screen</Text>
                    <Text>{this.state.data.name}</Text>
                    <Text>{this.state.data.grade}</Text>
                    <StatusBar style="light" />
                </ScrollView>
            );
        } else {
            <Loading />
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
