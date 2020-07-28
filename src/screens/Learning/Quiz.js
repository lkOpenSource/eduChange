import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Button } from 'native-base'
import Loading from '../Loading.js';
import * as Font from 'expo-font';
import ViewPager from '@react-native-community/viewpager';
import * as firebase from 'firebase';

var totalScore = 0;

export default class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionNum: 0,
            questions: [],
            choiseOne: [],
            choiseTwo: [],
            choiseThree: [],
            choiseFour: [],
            answers: [],
            end: false,
            isValid: true,
            uid: "",
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

    // subjects/grade${grade}/${subject}/quiz/
    getContents = (grade, subject) => {
        if (grade !== "" && subject !== "") {
            //     this.setState({ questionNum: 0 })
            // totalScore = 0;
            firebase.database().ref(`${subject}/quiz/`)
                .once("value", (dataSnapShot) => {
                    if (dataSnapShot.val()) {
                        let data = dataSnapShot.val();
                        //console.log(data)
                        this.setState({
                            questions: data.questions,
                            answers: data.answers,
                            choiseOne: data.choiseOne,
                            choiseTwo: data.choiseTwo,
                            choiseThree: data.choiseThree,
                            choiseFour: data.choiseFour
                        })
                    } else {
                        alert("Check your internet connection and restart the App");
                        this.props.navigation.navigate("learn");
                    }
                })
                .catch((error) => console.log(error))
        } else {
            alert("Error occured..")
            this.props.navigation.navigate("learn");
        }
    }

    answerClicked = (answer) => {
        if (this.state.questionNum + 1 === this.state.questions.length) {
            if (answer === this.state.answers[this.state.questionNum]) {
                totalScore += 1;
            }
            this.updateUserScore();
        } else {
            if (answer === this.state.answers[this.state.questionNum]) {
                totalScore += 1;
            }
            this.setState({ questionNum: this.state.questionNum + 1 })
        }
    }

    updateUserScore = () => {
        let prevScore = 0;
        firebase.database().ref(`users/${this.state.uid}/quiz/totalScore`)
            .once("value", (score) => {
                prevScore = score.val();
            })
       // console.log(prevScore);

        firebase.database().ref(`users/${this.state.uid}/quiz/${this.state.subject}/`)
            .update({ score: totalScore * 10, status: "false" })
            .then(() => {
                firebase.database().ref(`users/${this.state.uid}/quiz/`)
                    .update({ totalScore: (totalScore * 10) + prevScore })
                    .then(() => { this.setState({ end: true }) })
            })
            .catch((error) => console.log(error))
    }

    isUserCanTakeQuiz = async (subject) => {
        const uid = await AsyncStorage.getItem("uid")
        this.setState({ uid });
        firebase.database().ref(`users/${uid}/quiz/${subject}/status`)
            .once("value", (data) => {
                if (data.val()) {
                    if (data.val() === "true") {
                        this.setState({ isValid: true });
                    } else {
                        this.setState({ isValid: false });
                    }
                } else {
                    alert("Check your internet connection and restart the App");
                    this.props.navigation.navigate("learn");
                }
            })
            .catch((error) => console.log(error))
    }

    componentDidMount() {
        const { grade } = this.props.route.params;
        const { subject } = this.props.route.params;
        this.setState({ subject })
        this.getContents(grade, subject);
        this.isUserCanTakeQuiz(subject);
        this.loadFont();
    }

    render() {
        if (this.state.end !== true && this.state.isValid !== false && this.state.isFontLoaded) {
            return (
                <View style={styles.container}>
                    <ViewPager style={{ flex: 1 }} initialPage={0}>
                        <View key="1">
                            <Text>Quiz Screen</Text>
                            <Text>Subject-{this.state.subject}</Text>
                            <Text>Swipe right to start the quiz</Text>
                        </View>
                        <View key="2">
                            <Text>{this.state.questions[this.state.questionNum]}</Text>
                            <Button onPress={() => { this.answerClicked(this.state.choiseOne[this.state.questionNum]) }}><Text>{this.state.choiseOne[this.state.questionNum]}</Text></Button>
                            <Button onPress={() => { this.answerClicked(this.state.choiseTwo[this.state.questionNum]) }}><Text>{this.state.choiseTwo[this.state.questionNum]}</Text></Button>
                            <Button onPress={() => { this.answerClicked(this.state.choiseThree[this.state.questionNum]) }}><Text>{this.state.choiseThree[this.state.questionNum]}</Text></Button>
                            <Button onPress={() => { this.answerClicked(this.state.choiseFour[this.state.questionNum]) }}><Text>{this.state.choiseFour[this.state.questionNum]}</Text></Button>
                        </View>
                    </ViewPager>
                    <StatusBar style="light" />
                </View>
            )
        } else if (this.state.end === true && this.state.isFontLoaded) {
            return (
                <View>
                    <Text>The quiz has ended</Text>
                    <Text>Total number of questions answered {this.state.questions.length}</Text>
                    <Text>Correct questions - {totalScore}</Text>
                    <Button onPress={() => { this.props.navigation.navigate("learn") }}><Text>Back to home</Text></Button>
                    <StatusBar style="light" />
                </View>
            )
        } else if (this.state.isValid === false && this.state.isFontLoaded) {
            return (
                <View>
                    <Text>You already took the quiz . wait till next one</Text>
                    <Button onPress={() => { this.props.navigation.navigate("learn") }}><Text>Back to home</Text></Button>
                    <StatusBar style="light" />
                </View>
            )
        }
        else {
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
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

