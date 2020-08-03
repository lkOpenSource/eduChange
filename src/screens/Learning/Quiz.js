import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, SafeAreaView, Image } from 'react-native';
import { Button } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../Loading.js';
import * as Font from 'expo-font';
import * as firebase from 'firebase';

var totalScore = 0;
var myTimer;

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
            imgUrl: ""
        }
    }

    loadFont = async () => {
        await Font.loadAsync({
            ralewayMedium: require("../../fonts/raleway-medium.ttf"),
            nunitoRegular: require("../../fonts/nunito-regular.ttf"),
            monto: require("../../fonts/montserrat-bold.ttf")
        })
        this.setState({ isFontLoaded: true })
    }

    getContents = (grade, subject) => {
        if (grade !== "" && subject !== "") {
            this.setState({ questionNum: 0 })
            totalScore = 0;
            clearTimeout(myTimer);
            firebase.database().ref(`subjects/grade${grade}/${subject}/quiz/`)
                .once("value", (dataSnapShot) => {
                    if (dataSnapShot.val()) {
                        let data = dataSnapShot.val();
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
                    imgUrl: "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/five.png?alt=media&token=05f33dc7-9090-49e0-9c58-da5cf806a71d"
                })
                break;
            case (resultPercentage >= 65):
                this.setState({
                    resultText: "Good !!",
                    imgUrl: "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/four.png?alt=media&token=2a03dcea-678a-4487-b9a3-00eee052f6d5"
                })
                break;
            case (resultPercentage >= 55):
                this.setState({
                    resultText: "Not Bad..",
                    imgUrl: "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/three.png?alt=media&token=42bace8a-4ea1-4201-a6f3-d6f95c2d2c67"
                })
                break;
            case (resultPercentage >= 35):
                this.setState({
                    resultText: "Need to focus",
                    imgUrl: "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/two.png?alt=media&token=63811bc5-25ad-4811-859a-a951aff68b37"
                })
                break;
            default:
                this.setState({
                    resultText: "Poor !! Work hard !!",
                    imgUrl: "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/one.png?alt=media&token=7487c465-0d05-4030-8ceb-43eaa15ac76e"
                })
                break;
        }
    }

    quizTimer = async () => {
        myTimer = setTimeout(() => {
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
                <SafeAreaView style={styles.container}>
                    <View style={styles.mainView}>
                        <Text style={styles.headingText}>Welcome to quiz</Text>
                        <Text style={styles.headingText}>ICT</Text>
                        <Image style={styles.image} source={require("../../images/quiz.png")} />
                        <Text style={styles.introPara}>This is a one time quiz you can only participate once.
                        Time linit - 15 minutes.
                        Double check before clicking the answer,Answer can be clicked only once</Text>
                        <Button style={styles.button} block onPress={() => {
                            this.setState({ isStarted: true });
                            this.quizTimer();
                        }}>
                            <Text style={styles.buttonText}>Start Quiz</Text>
                        </Button>
                    </View>
                    <StatusBar style="light" />
                </SafeAreaView>
            )
        } else if (!this.state.end && this.state.isStarted) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.mainViewQ}>
                        <Text style={styles.questionText}>{this.state.questions[this.state.questionNum]}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Button style={styles.answerButton} block onPress={() => {
                                this.answerClicked(this.state.choiseOne[this.state.questionNum])
                            }}>
                                <Text style={styles.answerText}>{this.state.choiseOne[this.state.questionNum]}</Text></Button>
                            <Button style={styles.answerButton} block onPress={() => {
                                this.answerClicked(this.state.choiseTwo[this.state.questionNum])
                            }}>
                                <Text style={styles.answerText}>{this.state.choiseTwo[this.state.questionNum]}</Text></Button>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Button style={styles.answerButton} block onPress={() => {
                                this.answerClicked(this.state.choiseThree[this.state.questionNum])
                            }}>
                                <Text style={styles.answerText}>{this.state.choiseThree[this.state.questionNum]}</Text></Button>
                            <Button style={styles.answerButton} block onPress={() => {
                                this.answerClicked(this.state.choiseFour[this.state.questionNum])
                            }}>
                                <Text style={styles.answerText}>{this.state.choiseFour[this.state.questionNum]}</Text></Button>
                        </View>
                    </View>
                    <StatusBar style="light" />
                </SafeAreaView>
            )
        }
        else if (this.state.end) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.mainView}>
                        <Text style={styles.headingText}>The quiz has ended</Text>
                        <View style={{ marginTop: hp("3%") }}>
                            <Text style={styles.introParaTwo}>Total number of questions  {this.state.questions.length}</Text>
                            <Text style={styles.introParaTwo}>Total number of questions attempted {this.state.questionNum + 1}</Text>
                            <Text style={styles.introParaTwo}>Correct questions - {totalScore}</Text>
                            <Text style={styles.introParaTwo}>Wrong questions - {this.state.questions.length - totalScore}</Text>
                            <Image style={styles.imageTwo} source={{ uri: `${this.state.imgUrl}` }} />
                            <Text style={styles.introParaTwo}>{this.state.resultText}</Text>
                            <Button block style={styles.button} onPress={() => { this.props.navigation.navigate("learn") }}><Text style={styles.buttonText}>Back to home</Text></Button>
                        </View>
                        <StatusBar style="light" />
                    </View>
                </SafeAreaView>
            )
        } else if (!this.state.isValid && this.state.isFontLoaded && !this.state.end) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.mainViewF}>
                        <Text style={styles.headingTextTwo}>You have already attempted the quiz</Text>
                        <Image style={styles.imageLast} source={require("../../images/sad.png")} />
                        <Text style={styles.introPara}>Wait till the next one !!</Text>
                        <Button block style={styles.button} onPress={() => { this.props.navigation.navigate("learn") }}><Text>Back to home</Text></Button>
                        <StatusBar style="light" />
                    </View>
                </SafeAreaView>
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
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center"
    },
    mainView: {
        alignContent: "center",
        backgroundColor: "#DAE0E2",
        borderRadius: hp("2%"),
        width: wp("85%"),
        height: hp("60%"),
    },
    headingText: {
        fontFamily: "monto",
        fontSize: hp("2.8%"),
        color: "#000000",
        marginTop: hp("1%"),
        alignSelf: "center"
    },
    introPara: {
        fontFamily: "nunitoRegular",
        fontSize: hp("2.5%"),
        color: "#000000",
        margin: hp("2%"),
        alignSelf: "center"
    },
    button: {
        borderRadius: hp("1.5%"),
        width: wp("35%"),
        height: hp("5%"),
        backgroundColor: "#74B9FF",
        alignSelf: "center"
    },
    buttonText: {
        fontFamily: "nunitoRegular",
        fontSize: hp("2%"),
        color: "#000000",
        //   margin: hp("2%")
    },
    image: {
        borderRadius: hp("2.5%"),
        width: wp("38%"),
        height: hp("22%"),
        alignSelf: "center",
        resizeMode: "cover"
    },
    imageTwo: {
      //  borderRadius: hp("2.5%"),
        width: wp("50%"),
        height: hp("10%"),
        alignSelf: "center",
       resizeMode: "cover"
    },
    imageLast: {
        borderRadius: hp("2.5%"),
        width: wp("40%"),
        height: hp("22%"),
        alignSelf: "center"
    },
    mainViewQ: {
        alignContent: "center",
        backgroundColor: "#DAE0E2",
        borderRadius: hp("2%"),
        width: wp("85%"),
        height: hp("50%"),
    },
    questionText: {
        fontFamily: "ralewayMedium",
        fontSize: hp("2.8%"),
        color: "#000000",
        margin: hp("2%")
    },
    answerText: {
        fontFamily: "nunitoRegular",
        fontSize: hp("2%"),
        color: "#000000",
        //  margin: hp("1%")
    },
    answerButton: {
        borderRadius: hp("1.5%"),
        width: wp("35%"),
        height: hp("8%"),
        backgroundColor: "#0ABDE3",
        margin: hp("2%")
    },
    introParaTwo: {
        fontFamily: "nunitoRegular",
        fontSize: hp("2.4%"),
        color: "#000000",
        margin: hp("0.5%"),
        alignSelf: "center"
    },
    headingTextTwo: {
        fontFamily: "monto",
        fontSize: hp("2%"),
        color: "#000000",
        marginTop: hp("1%"),
        alignSelf: "center"
    },
    mainViewF: {
        alignContent: "center",
        backgroundColor: "#DAE0E2",
        borderRadius: hp("2%"),
        width: wp("85%"),
        height: hp("40%"),
    },
});
