import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import { Button } from 'native-base';
import Loading from '/home/jsathu/ReactNative/eduChange/src/components/Loading.js';
import * as firebase from 'firebase';

export default class SubjectLearnScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contents: {},
            grade: null,
            subject: ""
        }
    }

    getContents = (grade, subject) => {
        firebase.database().ref(`subjects/grade${grade}/${subject}`)
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
                    <Text>Grade-{this.state.grade}</Text>
                    <Text>Subject-{this.state.subject}</Text>

                    <Button onPress={() => {
                        this.props.navigation.navigate("PlayVideo", { url: "https://www.youtube.com/watch?v=Iv4vhOS89hc", title: "Fun Video" })
                    }}>
                        <Text>Play Video</Text>
                    </Button>
                    
                    <Button onPress={() => {
                        this.props.navigation.navigate("Quiz", { grade: this.state.grade, subject: this.state.subject })
                    }}>
                        <Text>Enter Quiz</Text>
                    </Button>
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
