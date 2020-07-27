//import questions from contents
//get user id and eventually get user details
//after finishing add the user to the leaderboard including their score
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import Loading from '/home/jsathu/ReactNative/eduChange/src/components/Loading.js';
import * as firebase from 'firebase';

export default class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contents: {},
            grade: null,
            subject: ""
        }
    }

    getContents = (grade, subject) => {
        firebase.database().ref(`subjects/grade${grade}/${subject}/quiz/`)
            .once("value", (dataSnapShot) => {
                if (dataSnapShot.val()) {
                    this.setState({ contents: dataSnapShot.val() })
                } else {
                    alert("Check your internet connection and restart the App");
                }
            })
            .catch((error) => console.log(error))
    }


    componentDidMount() {
        const { grade } = this.props.route.params;
        const { subject } = this.props.route.params;
        this.setState({ grade, subject })
        this.getContents(grade, subject);
    }

    render() {
        if (this.state.grade !== null && this.state.subject !== "") {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text>Quiz Screen</Text>
                    <Text>Grade-{this.state.grade}</Text>
                    <Text>Subject-{this.state.subject}</Text>
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
