import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Input, Button, Item, Label, Form } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from './Loading.js';
import * as Font from 'expo-font';
import * as firebase from 'firebase';

export default class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            uid: "",
            isFontLoaded: false
        }
    }

    loadFont = async () => {
        await Font.loadAsync({
            openSansBold: require("../fonts/opensans-bold.ttf"),
            ralewayMedium: require("../fonts/raleway-medium.ttf"),
            nunitoRegular: require("../fonts/nunito-regular.ttf")
        })
        this.setState({ isFontLoaded: true })
    }

    signIn = () => {
        if (this.state.email !== ""
            && this.state.password !== "") {
            this.state.email.trim();
            this.state.password.trim();
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((authenticate) => {
                    this.setState({ uid: authenticate.user.uid });
                    this.saveUid();
                })
                .catch((error) => alert(error))
        } else {
            alert("Please fill the form");
        }
    }

    saveUid = async () => {
        await AsyncStorage.setItem("uid", this.state.uid)
            .then(() => { this.props.navigation.navigate("Home") })
            .catch((error) => console.log(error));
    }


    componentDidMount() {
        this.loadFont();
    }

    render() {
        if (this.state.isFontLoaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <Text style={styles.heading}>Welcome</Text>
                        <Text style={styles.headingTwo}>Sign In</Text>

                        <Form style={{ margin: hp("3%") }}>
                            <Item rounded inlineLabel style={styles.textBox}>
                                <Label><Text style={styles.label}>  Email</Text></Label>
                                <Input value={this.state.email} onChangeText={(email) => { this.setState({ email: email.trim() }) }} />
                            </Item>
                            <Item rounded inlineLabel style={styles.textBox}>
                                <Label><Text style={styles.label}>  Password</Text></Label>
                                <Input value={this.state.password} onChangeText={(password) => { this.setState({ password: password.trim() }) }} />
                            </Item>
                        </Form>

                        <Button block style={styles.button} onPress={() => { this.signIn() }}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </Button>

                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Text style={styles.textLast}>I'm already a member.</Text>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("SignUp") }}>
                                <Text style={[styles.textLast, { color: "#0000ff" }]}> Sign Up</Text>
                            </TouchableOpacity>
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
        fontSize: hp("3.2%"),
        color: "#000000",
        marginTop: hp("10%"),
        alignSelf: "center"
    },
    headingTwo: {
        fontFamily: "openSansBold",
        fontSize: hp("3%"),
        color: "#000000",
        marginTop: hp("10%"),
        marginLeft: hp("3.5%")
    },
    label: {
        fontFamily: "ralewayMedium",
        fontSize: hp("2.4%"),
        color: "#4C4B4B",
        margin: hp("2%")
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
    },
    textLast: {
        fontFamily: "nunitoRegular",
        fontSize: hp("2.5%"),
        color: "#000000",
        marginTop: hp("2%"),
        justifyContent: "center"
    },
});