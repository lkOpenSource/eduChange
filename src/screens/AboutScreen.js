import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import Loading from './Loading.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Font from 'expo-font';

export default class AboutScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFontLoaded: false
        }
    }

    loadFont = async () => {
        await Font.loadAsync({
            openSansBold: require("../fonts/opensans-bold.ttf"),
            nunitoRegular: require("../fonts/nunito-regular.ttf"),
            typeWriter: require("../fonts/type-writer.ttf")
        })
        this.setState({ isFontLoaded: true })
    }

    componentDidMount() {
        this.loadFont();
    }

    render() {
        if (this.state.isFontLoaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={styles.top}>
                            <Image source={require("../images/top.png")} style={{resizeMode:"cover"}}/>
                        </View>
                        <View style={styles.company}>
                            <Text style={{ fontSize: hp("2.3%") }}>
                                Powered by
		                </Text>
                            <Text style={{ fontSize: hp("4%"), fontFamily: "openSansBold" }}>
                                lk.OpenSource
		                </Text>
                        </View>
                        <View style={styles.quote}>
                            <Text style={styles.quoteText}>'Dreams Don't Work Unless You Do'</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={{ fontSize: hp("2.5%"), fontFamily: "nunitoRegular", color: "#4C4B4B" }}>
                                eduChange is introduced to ease the studying experience and making
                                learning more fun.
                                Students can learn any subject area using our App
                                Moreover,Students can ensure their knowledge by participating in monthly quizes
                                This app is developed by lk.OpenSource Company. 
                                Lead Developers - Sibishan and Sathurshan
        		        </Text>
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
        backgroundColor: "#ffffff"
    },
    top: {
        alignItems: "center"
    },
    company: {
        marginTop: hp("2%"),
        alignItems: "center"
    },
    quote: {
        margin: hp("2%"),
        alignSelf: "center"
    },
    quoteText: {
        fontSize: hp("2.5%"),
        fontFamily: "typeWriter",
        color: "#1287A5"
    },
    content: {
        margin: hp("2%")
    }
});
