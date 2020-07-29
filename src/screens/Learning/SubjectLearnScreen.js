import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage, FlatList, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Button, Card, CardItem } from 'native-base';
import * as Font from 'expo-font';
import Loading from '../Loading.js';
import * as firebase from 'firebase';

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
        this.getContents(grade, subject);
        this.loadFont();
    }

    render() {
        if (this.state.grade !== null && this.state.subject !== "" && this.state.isFontLoaded) {
            return (

                <SafeAreaView style={styles.container}>
                    <ScrollView >
                        <Text>Grade-{this.state.grade}</Text>
                        <Text>Subject-{this.state.subject}</Text>

                        <Text>Youtube Videos</Text>
                        <FlatList
                            data={this.state.youtubeVideos}
                            renderItem={({ item }) => {
                                return (
                                    <Card>
                                        <CardItem>
                                            <Text>{item.title}</Text>
                                            <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate("PlayVideo", { url: `${item.content}` })
                                            }}>
                                                <Text>PlayVideo</Text>
                                            </TouchableOpacity>
                                        </CardItem>
                                    </Card>
                                )
                            }}
                            keyExtractor={(item) => item.title} />

                        <Text>Websites</Text>
                        <FlatList
                            data={this.state.websites}
                            renderItem={({ item }) => {
                                return (
                                    <Card>
                                        <CardItem>
                                            <Text>{item.title}</Text>
                                            <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate("WebViewForSubject", { url: `${item.content}` })
                                            }}>
                                                <Text>View Website</Text>
                                            </TouchableOpacity>
                                        </CardItem>
                                    </Card>
                                )
                            }}
                            keyExtractor={(item) => item.title} />

                        <Text>PdfFiles</Text>
                        <FlatList
                            data={this.state.pdfFiles}
                            renderItem={({ item }) => {
                                return (
                                    <Card>
                                        <CardItem>
                                            <Text>{item.title}</Text>
                                            <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate("PdfView", { url: `${item.content}` })
                                            }}>
                                                <Text>View Pdf</Text>
                                            </TouchableOpacity>
                                        </CardItem>
                                    </Card>
                                )
                            }}
                            keyExtractor={(item) => item.title} />

                        <Button onPress={() => {
                            this.props.navigation.navigate("Quiz", { grade: this.state.grade, subject: this.state.subject })
                        }}>
                            <Text>Enter Quiz</Text>
                        </Button>

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
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
});





// <Button onPress={() => {
//     this.props.navigation.navigate("PlayVideo", { url: "https://www.youtube.com/watch?v=Iv4vhOS89hc" })
// }}>
//     <Text>Play Video</Text>
// </Button>

// <Button onPress={() => {
//     this.props.navigation.navigate("PdfView", { url: "http://www.africau.edu/images/default/sample.pdf" })
// }}>
//     <Text>View Pdf</Text>
// </Button>

// <Button style={{ marginTop: 0 }} onPress={() => {
//     this.props.navigation.navigate("WebViewForSubject", { url: "http://www.turnkey.lk" })
// }}>
//     <Text>View Website</Text>
// </Button>