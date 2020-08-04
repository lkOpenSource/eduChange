import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage, Image, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input, Button, Item, Label, Form } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import Loading from './Loading.js';
import * as firebase from 'firebase';

export default class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            grade: "Select it",
            school: "",
            uid: "",
            isFontLoaded: false
        }
    }


    loadFont = async () => {
        await Font.loadAsync({
            ralewayMedium: require("../fonts/raleway-medium.ttf"),
            nunitoRegular: require("../fonts/nunito-regular.ttf"),
            openSansBold: require("../fonts/opensans-bold.ttf")
        })
        this.setState({ isFontLoaded: true })
    }

    componentDidMount() {
        this.loadFont();
    }

    signUp = () => {
        if (this.state.email !== ""
            && this.state.grade !== "Select it"
            && this.state.name !== ""
            && this.state.password !== ""
            && this.state.school !== "") {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((authenticate) => {
                    this.setState({ uid: authenticate.user.uid });
                    authenticate.user.updateProfile({ displayName: this.state.name })
                        .then(() => {
                            this.addUserToDatabase();
                        })
                })
                .catch((error) => alert(error))
        } else {
            alert("Please fill the form");
        }
    }

    addUserToDatabase = () => {
        firebase.database().ref(`users/${this.state.uid}`).set({
            name: this.state.name,
            email: this.state.email,
            grade: this.state.grade,
            school: this.state.school,
            uid: this.state.uid
        }).then(() => {
            firebase.database().ref(`users/${this.state.uid}/quiz`).set({
                ICT: { score: 0, status: "true" },
                Science: { score: 0, status: "true" },
                Maths: { score: 0, status: "true" },
                English: { score: 0, status: "true" },
                Health: { score: 0, status: "true" },
                Civics: { score: 0, status: "true" },
                Geography: { score: 0, status: "true" },
                totalScore: 0
            })
                .then(() => { this.saveUid() })
        })
            .catch((error) => console.log(error));
    }

    saveUid = async () => {
        await AsyncStorage.setItem("uid", this.state.uid)
            .then(() => { this.props.navigation.navigate("Home") })
            .catch((error) => console.log(error))
    }

    render() {
        if (this.state.isFontLoaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <Text style={styles.heading}>Create Account</Text>

                        <Form style={{ margin: hp("4%") }}>
                            <Item rounded inlineLabel style={styles.textBox}>
                                <Label><Text style={styles.label}>  Email</Text></Label>
                                <Input value={this.state.email} keyboardType="email-adcdress" onChangeText={(email) => { this.setState({ email: email.trim() }) }} />
                            </Item>
                            <Item rounded inlineLabel style={styles.textBox}>
                                <Label><Text style={styles.label}>  Password</Text></Label>
                                <Input value={this.state.password} onChangeText={(password) => { this.setState({ password: password.trim() }) }} />
                            </Item>
                            <Item rounded inlineLabel style={styles.textBox}>
                                <Label><Text style={styles.label}>  Name</Text></Label>
                                <Input value={this.state.name} onChangeText={(name) => { this.setState({ name }) }} />
                            </Item>
                            <Item rounded inlineLabel style={styles.textBox}>
                                <Label><Text style={styles.label}>  School</Text></Label>
                                <Input value={this.state.school} onChangeText={(school) => { this.setState({ school }) }} />
                            </Item>
                        </Form>

                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.labelTwo}>Grade - {this.state.grade}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => { this.setState({ grade: "6" }) }}>
                                    <Image style={styles.gradeImg} source={require("../images/grade-6-card.png")} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({ grade: "7" }) }}>
                                    <Image style={styles.gradeImg} source={require("../images/grade-7-card.png")} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => { this.setState({ grade: "8" }) }}>
                                    <Image style={styles.gradeImg} source={require("../images/grade-8-card.png")} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.setState({ grade: "9" }) }}>
                                    <Image style={styles.gradeImg} source={require("../images/grade-9-card.png")} />
                                </TouchableOpacity>
                            </View>

                            <Button block style={styles.button} onPress={() => { this.signUp() }}>
                                <Text style={styles.buttonText}>Register</Text>
                            </Button>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textLast}>I'm already a member.</Text>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("Welcome") }}>
                                    <Text style={[styles.textLast, { color: "#0000ff" }]}> Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <StatusBar style="light" />
                    </ScrollView>
                </SafeAreaView>
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
        backgroundColor: '#ffffff'
    },
    heading: {
        fontFamily: "openSansBold",
        fontSize: hp("3%"),
        color: "#000000",
        marginTop: hp("10%")
    },
    label: {
        fontFamily: "ralewayMedium",
        fontSize: hp("2.4%"),
        color: "#4C4B4B",
        margin: hp("2%")
    },
    labelTwo: {
        fontFamily: "ralewayMedium",
        fontSize: hp("2.4%"),
        color: "#000000",
        marginTop: hp("-3%")
    },
    textBox: {
        borderRadius: hp("0.5%"),
        width: wp("85%"),
        height: hp("6%"),
        backgroundColor: "#EAF0F1",
        margin: hp("2%"),
        alignSelf: "center"
    },
    button: {
        borderRadius: hp("1.5%"),
        width: wp("30%"),
        height: hp("5%"),
        backgroundColor: "#74B9FF",
        margin: hp("2%"),
        alignSelf: "center"
    },
    buttonText: {
        fontFamily: "openSansBold",
        fontSize: hp("2.2%"),
        color: "#000000",
        //  margin: hp("2%")
    },
    image: {
        borderRadius: hp("2.5%"),
        width: wp("30%"),
        height: hp("35%")
    },
    textLast: {
        fontFamily: "nunitoRegular",
        fontSize: hp("2.5%"),
        color: "#000000",
        marginBottom: hp("2%")
    },
    gradeImg: {
      //  borderRadius: hp("2%"),
        width: wp("30%"),
        height: hp("15%"),
        margin: hp("2%"),
        alignSelf: "center"
    }
});