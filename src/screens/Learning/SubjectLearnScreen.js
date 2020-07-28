import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import { Button } from 'native-base';
import * as Font from 'expo-font';
import Loading from '../Loading.js';
import * as firebase from 'firebase';

export default class SubjectLearnScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contents: {},
            grade: null,
            subject: "",
            isFontLoaded: false
        }
    }

    loadFont = async () => {
        await Font.loadAsync({
            robotoBold: require("../../fonts/roboto-bold.ttf"),
            ralewayMedium: require("../../fonts/raleway-medium.ttf"),
            nunitoRegular: require("../../fonts/nunito-regular.ttf")
        })
        this.setState({ isFontLoaded: true })
    }

    getContents = (grade, subject) => {
        firebase.database().ref(`subjects/grade${grade}/${subject}`)
            .once("value", (dataSnapShot) => {
                if (dataSnapShot.val()) {
                    this.setState({ contents: dataSnapShot.val() })
                } else {
                    alert("Check your internet connection and restart the App");
                    // this.props.navigation.navigate("learn");
                }
            })
            .catch((error) => console.log(error))
    }

    componentDidMount() {
        const { grade } = this.props.route.params;
        const { subject } = this.props.route.params;
        this.setState({ grade, subject })
        this.getContents(grade, subject);
        this.loadFont();
    }

    render() {
        if (this.state.grade !== null && this.state.subject !== "" && this.state.isFontLoaded) {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text>Grade-{this.state.grade}</Text>
                    <Text>Subject-{this.state.subject}</Text>

                    <Button onPress={() => {
                        this.props.navigation.navigate("PlayVideo", { url: "https://www.youtube.com/watch?v=Iv4vhOS89hc" })
                    }}>
                        <Text>Play Video</Text>
                    </Button>

                    <Button onPress={() => {
                        this.props.navigation.navigate("Quiz", { grade: this.state.grade, subject: this.state.subject })
                    }}>
                        <Text>Enter Quiz</Text>
                    </Button>
                    <Button onPress={() => {
                        this.props.navigation.navigate("PdfView", { url: "http://www.africau.edu/images/default/sample.pdf" })
                    }}>
                        <Text>View Pdf</Text>
                    </Button>

                    <Button onPress={() => {
                        this.props.navigation.navigate("WebViewForSubject", { url: "http://www.turnkey.lk" })
                    }}>
                        <Text>View Website</Text>
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
