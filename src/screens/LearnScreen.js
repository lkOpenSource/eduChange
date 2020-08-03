import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage, View, Image, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
            openSansBold: require("../fonts/opensans-bold.ttf"),
            ralewayMedium: require("../fonts/raleway-medium.ttf"),
            typeWriter: require("../fonts/type-writer.ttf"),
            monto: require("../fonts/montserrat-bold.ttf")
        })
        this.setState({ isFontLoaded: true })
    }

    getUID = async () => {
        const userId = await AsyncStorage.getItem("uid");
        firebase.database().ref(`users/${userId}`).once("value", (dataSnapShot) => {
            if (dataSnapShot.val()) {
                this.setState({ data: dataSnapShot.val() })
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
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <ImageBackground source={require("../images/homeBG.png")} style={{
                            flex: 1,
                            resizeMode: "cover"
                        }}>
                            <View style={{ marginTop: hp("1%") }}>
                                <Text style={styles.mainText}>Hello</Text>
                                <Text style={styles.mainTextTwo}>{this.state.data.name}</Text>
                            </View>
                            <Text style={styles.headingQuestion}>Are you ready to learn ?</Text>
                            <View style={styles.subjects}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("SubjectLearn", { subject: "Science", grade: this.state.data.grade }) }}>
                                    <Image source={require("../images/science.png")} style={styles.image} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("SubjectLearn", { subject: "ICT", grade: this.state.data.grade }) }}>
                                    <Image source={require("../images/ict.png")} style={styles.image} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("SubjectLearn", { subject: "Maths", grade: this.state.data.grade }) }}>
                                    <Image source={require("../images/maths.png")} style={styles.image} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("SubjectLearn", { subject: "English", grade: this.state.data.grade }) }}>
                                    <Image source={require("../images/english.png")} style={styles.image} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("SubjectLearn", { subject: "Health", grade: this.state.data.grade }) }}>
                                    <Image source={require("../images/health.png")} style={styles.image} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("SubjectLearn", { subject: "Civics", grade: this.state.data.grade }) }}>
                                    <Image source={require("../images/civics.png")} style={styles.image} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate("SubjectLearn", { subject: "Geography", grade: this.state.data.grade }) }}>
                                    <Image source={require("../images/geography.png")} style={styles.image} />
                                </TouchableOpacity>
                            </View>
                            <StatusBar style="light" />
                        </ImageBackground>
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
        backgroundColor: '#DAE0E2'
    },
    image: {
        borderRadius: hp("2.5%"),
        width: wp("90%"),
        height: hp("15%"),
        margin: hp("2%"),
        resizeMode:"cover"
    },
    subjects: {

    },
    mainText: {
        fontFamily: "ralewayMedium",
        fontSize: hp("4%"),
        color: "#000000",
        marginTop: hp("6%"),
        marginLeft: wp("4%")
    },
    mainTextTwo: {
        fontFamily: "monto",
        fontSize: hp("4%"),
        color: "#000000",
        marginLeft: wp("12%")
    },
    headingQuestion: {
        fontFamily: "typeWriter",
        fontSize: hp("2.8%"),
        color: "#487EB0",
        marginTop: hp("5%"),
        alignSelf: "center"
    }
});