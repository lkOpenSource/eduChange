import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, View, SafeAreaView, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import Loading from '../Loading.js';
import * as firebase from 'firebase';
import { Icon, Button } from 'native-base';

var locations = {
    "Science": "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/science.png?alt=media&token=a9a48819-cf62-47cd-bbff-d4f9e5a7ee37",
    "ICT": "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/ict.png?alt=media&token=0bded11d-3a76-4bbf-ac65-3ac8301025e1",
    "Civics": "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/civics.png?alt=media&token=47952a06-6157-473e-85ae-4f84d472ca97",
    "Geography": "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/geography.png?alt=media&token=47b2c21b-9210-4a73-9f9a-9b8b501842b1",
    "Maths": "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/maths.png?alt=media&token=0a2f14e2-80d2-4238-a87c-ffb46aa9a78b",
    "English": "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/english.png?alt=media&token=a23e37b3-cac1-4188-b6c2-a6afb1717719",
    "Health": "https://firebasestorage.googleapis.com/v0/b/edu--change.appspot.com/o/health.png?alt=media&token=e2d1382c-6084-4a4b-9b9f-9a6070067b3a"
};

var imageId = locations.Science;

export default class SubjectLearnScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            youtubeVideos: [],
            websites: [],
            pdfFiles: [],
            grade: null,
            subject: "",
            isFontLoaded: false
        }
    }

    loadFont = async () => {
        await Font.loadAsync({
            openSansBold: require("../../fonts/opensans-bold.ttf"),
            ralewayMedium: require("../../fonts/raleway-medium.ttf"),
            nunitoRegular: require("../../fonts/nunito-regular.ttf")
        })
        this.setState({ isFontLoaded: true })
    }

    getContents = (grade, subject) => {
        firebase.database().ref(`subjects/grade${grade}/${subject}`)
            .once("value", (dataSnapShot) => {
                if (dataSnapShot.val()) {
                    let youtubeVideos = dataSnapShot.val().youtubeVideos;
                    let pdfFiles = dataSnapShot.val().pdfFiles;
                    let websites = dataSnapShot.val().websites;
                    this.setState({ youtubeVideos, pdfFiles, websites })
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
        this.setState({ grade, subject })
        imageId = locations[`${subject}`];
        this.getContents(grade, subject);
        this.loadFont();
    }

    render() {
        if (this.state.grade !== null && this.state.subject !== "" && this.state.isFontLoaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <Image style={styles.image} source={{ uri: `${imageId}` }} />

                        <View style={styles.mainView}>
                            <Text style={styles.mainText}>Resources</Text>
                            <FlatList
                                data={this.state.youtubeVideos}
                                renderItem={({ item }) => {
                                    return (
                                        <Card containerStyle={styles.card}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.cardTextOne}>{this.state.youtubeVideos.indexOf(item) + 1}</Text>
                                                <Text style={styles.cardTextTwo}>{item.title}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    this.props.navigation.navigate("PlayVideo", { url: `${item.content}` })
                                                }}>
                                                    <Icon type="FontAwesome" name="youtube" style={[styles.cardTextThree,{color:"#FF3031"}]} />
                                                </TouchableOpacity>
                                            </View>
                                        </Card>
                                    )
                                }}
                                keyExtractor={(item) => item.title} />

                            <FlatList
                                data={this.state.websites}
                                renderItem={({ item }) => {
                                    return (
                                        <Card containerStyle={styles.card}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.cardTextOne}>{this.state.websites.indexOf(item) + this.state.youtubeVideos.length + 1}</Text>
                                                <Text style={styles.cardTextTwo}>{item.title}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    this.props.navigation.navigate("WebViewForSubject", { url: `${item.content}` })
                                                }}>
                                                    <Icon type="FontAwesome" name="chrome" style={[styles.cardTextThree,{color:"#43BE31"}]} />
                                                </TouchableOpacity>
                                            </View>
                                        </Card>
                                    )
                                }}
                                keyExtractor={(item) => item.title} />

                            <FlatList
                                data={this.state.pdfFiles}
                                renderItem={({ item }) => {
                                    return (
                                        <Card containerStyle={styles.card}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.cardTextOne}>{this.state.pdfFiles.indexOf(item) + this.state.youtubeVideos.length + 1 + this.state.websites.length}</Text>
                                                <Text style={styles.cardTextTwo}>{item.title}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    this.props.navigation.navigate("PdfView", { url: `${item.content}` })
                                                }}>
                                                    <Icon type="FontAwesome" name="file" style={[styles.cardTextThree,{color:"#487EB0"}]} />
                                                </TouchableOpacity>
                                            </View>
                                        </Card>
                                    )
                                }}
                                keyExtractor={(item) => item.title} />
                        </View>

                        <View style={styles.buttonView}>
                            <Text style={styles.buttonTextOne}>Lets Start Quiz</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Button block style={styles.button}
                                    onPress={() => {
                                        this.props.navigation.navigate("Quiz", { grade: this.state.grade, subject: this.state.subject })
                                    }} >
                                    <Text style={styles.buttonText}>Enter Quiz</Text>
                                </Button>
                                <Image style={styles.buttonImage} source={require(`../../images/quiz.png`)} />
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
        backgroundColor: '#DAE0E2'
    },
    image: {
        width: wp("100%"),
        height: hp("30%"),
        resizeMode:"cover"
    },
    mainView: {
        borderRadius: hp("3%"),
        backgroundColor: "#DAE0E2",
        marginTop: hp("-5%")
    },
    mainText: {
        fontFamily: "openSansBold",
        fontSize: hp("4%"),
        color: "#000000",
        margin: hp("2%")
    },
    card: {
        height: hp("10%"),
        borderRadius: hp("1.5%"),
        alignContent: "center"
    },
    cardTextOne: {
        fontFamily: "ralewayMedium",
        fontSize: hp("5%"),
        color: "#4834DF",
        position: "absolute"
    },
    cardTextTwo: {
        marginLeft: wp("10%"),
        fontSize: hp("2.5%"),
        fontFamily: "nunitoRegular",
        marginTop: hp("1%"),
        position: "absolute"
    },
    cardTextThree: {
        fontSize: hp("5%"),
        marginLeft: wp("70%"),
    },
    buttonView: {
        borderRadius: hp("3%"),
        backgroundColor: "#01CBC6",
        marginTop: hp("3%"),
        height: hp("18%"),
        margin: wp("8%")
    },
    button: {
        borderRadius: hp("1.5%"),
        width: wp("30%"),
        height: hp("5%"),
        backgroundColor: "#7CEC9F",
        margin: hp("2%")
    },
    buttonText: {
        fontFamily: "nunitoRegular",
        fontSize: hp("2%"),
        color: "#000000",
    //    margin: hp("1%")
    },
    buttonTextOne: {
        fontFamily: "openSansBold",
        fontSize: hp("2.5%"),
        color: "#000000",
        margin: hp("2%")
    },
    buttonImage: {
        width: wp("27%"),
        height: hp("14%"),
        marginTop: hp("-5%"),
        marginLeft: wp("6%"),
        resizeMode: "cover"
    }
});