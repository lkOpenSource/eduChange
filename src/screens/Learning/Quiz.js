import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Button } from 'native-base'
import Loading from '../Loading.js';
import * as Font from 'expo-font';
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
            isFontLoaded: false,
            isStarted: false,
            resultText: "",
            img: ""
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
        if (grade !== "" && subject !== "") {
            this.setState({ questionNum: 0 })
            totalScore = 0;
            firebase.database().ref(`subjects/grade${grade}/${subject}/quiz/`)
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
        if (!this.state.end) {
            let prevScore = 0;
            firebase.database().ref(`users/${this.state.uid}/quiz/totalScore`)
                .once("value", (score) => {
                    prevScore = score.val();
                })

            firebase.database().ref(`users/${this.state.uid}/quiz/${this.state.subject}/`)
                .update({ score: totalScore * 10, status: "false" })
                .then(() => {
                    firebase.database().ref(`users/${this.state.uid}/quiz/`)
                        .update({ totalScore: (totalScore * 10) + prevScore })
                        .then(() => {
                            this.result();
                            this.setState({ end: true })
                        })
                })
                .catch((error) => console.log(error))
        }
    }

    result = () => {
        let resultPercentage = (totalScore / this.state.questions.length) * 100;
        switch (true) {
            case (resultPercentage >= 75):
                this.setState({
                    resultText: "Amazing !!",
                    imgUrl: ""
                })
                break;
            case (resultPercentage >= 65):
                this.setState({
                    resultText: "Good !!",
                    imgUrl: ""
                })
                break;
            case (resultPercentage >= 55):
                this.setState({
                    resultText: "Not Bad..",
                    imgUrl: ""
                })
                break;
            case (resultPercentage >= 35):
                this.setState({
                    resultText: "Need to focus",
                    imgUrl: ""
                })
                break;
            default:
                this.setState({
                    resultText: "Poor !! Work hard !!",
                    imgUrl: ""
                })
                break;
        }
    }

    quizTimer = async () => {
        setTimeout(() => {
            this.updateUserScore();
        }, 300000)
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
        if (!this.state.end && this.state.isValid && this.state.isFontLoaded && !this.state.isStarted) {
            return (
                <View style={styles.container}>
                    <View >
                        <Text>Quiz Screen</Text>
                        <Text>Subject-{this.state.subject}</Text>
                        <Button onPress={() => {
                            this.setState({ isStarted: true });
                            this.quizTimer();
                        }}>
                            <Text>Start Quiz</Text>
                        </Button>
                    </View>
                    <StatusBar style="light" />
                </View>
            )
        } else if (!this.state.end && this.state.isStarted) {
            return (
                <View >
                    <Text>{this.state.questions[this.state.questionNum]}</Text>
                    <Button onPress={() => { this.answerClicked(this.state.choiseOne[this.state.questionNum]) }}><Text>{this.state.choiseOne[this.state.questionNum]}</Text></Button>
                    <Button onPress={() => { this.answerClicked(this.state.choiseTwo[this.state.questionNum]) }}><Text>{this.state.choiseTwo[this.state.questionNum]}</Text></Button>
                    <Button onPress={() => { this.answerClicked(this.state.choiseThree[this.state.questionNum]) }}><Text>{this.state.choiseThree[this.state.questionNum]}</Text></Button>
                    <Button onPress={() => { this.answerClicked(this.state.choiseFour[this.state.questionNum]) }}><Text>{this.state.choiseFour[this.state.questionNum]}</Text></Button>
                </View>
            )
        }
        else if (this.state.end) {
            return (
                <View>
                    <Text>The quiz has ended</Text>
                    <Text>Total number of questions  {this.state.questions.length}</Text>
                    <Text>Total number of questions attempted {this.state.questionNum + 1}</Text>
                    <Text>Correct questions - {totalScore}</Text>
                    <Text>Wrong questions - {this.state.questions.length - totalScore}</Text>
                    <Text>{this.state.resultText}</Text>
                    <Image source={require(`../../images/${this.state.img}`)} style={{ width: 100, height: 100 }} />
                    <Button onPress={() => { this.props.navigation.navigate("learn") }}><Text>Back to home</Text></Button>
                    <StatusBar style="light" />
                </View>
            )
        } else if (!this.state.isValid && this.state.isFontLoaded && !this.state.end) {
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

