import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, Image, AsyncStorage } from 'react-native';
import { SearchBar, Card } from 'react-native-elements';
import Loading from './Loading.js';
import * as Font from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as firebase from 'firebase';

var dataOfLeaders = [];

export default class LeaderBoardScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isReady: false,
            isFontLoaded: false,
            searchText: "",
            position: "Not known"
        }
    }


    loadFont = async () => {
        await Font.loadAsync({
            ralewayMedium: require("../fonts/raleway-medium.ttf"),
            nunitoRegular: require("../fonts/nunito-regular.ttf"),
            typeWriter: require("../fonts/type-writer.ttf")
        })
        this.setState({ isFontLoaded: true })
    }

    fetchLeaderBoard = () => {
        firebase.database().ref("users/").on("value", (dataSnapShot) => {
            let finalData = Object.values(dataSnapShot.val());
            let result = [];
            finalData.forEach(data => {
                let temp = {
                    name: data.name,
                    grade: data.grade,
                    school: data.school,
                    totalScore: data.quiz.totalScore,
                    uid: data.uid
                }
                result.push(temp);
            });
            result.sort(this.sortData);
            dataOfLeaders = result;
            this.fetchMyInfo();
            this.setState({ data: result, isReady: true })
        })
    }

    fetchMyInfo = async () => {
        const uid = await AsyncStorage.getItem("uid");
        dataOfLeaders.forEach(data => {
            if (data.uid === uid) {
                let position = dataOfLeaders.indexOf(data) + 1;
                this.setState({ position });
            }
        })
    }

    sortData = (a, b) => {
        return b.totalScore - a.totalScore;
    }

    searchFilter = (text) => {
        if (text.length === 0) {
            this.setState({ data: dataOfLeaders }) //searchText: "" 
        } else {
            this.setState({ data: dataOfLeaders })
            let searchText = text.trim();
            const result = this.state.data.filter((dataObject) => {
                let newData = dataObject.name.toUpperCase();
                let newSearchData = searchText.toUpperCase();
                let index = newData.indexOf(newSearchData);
                if (index !== -1 && index < 1) {
                    return true;
                } else {
                    return false;
                }
            })
            this.setState({ data: result })
        }
    }

    componentDidMount() {
        this.loadFont();
        this.fetchLeaderBoard();
    }

    render() {
        if (this.state.isReady && this.state.isFontLoaded) {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={styles.titleContainer}>
                            <Image style={styles.image} source={require("../images/bg.png")} />
                            <Text style={styles.title}>Leader Board</Text>
                            <Text style={styles.titleTwo}>Your Position :- {this.state.position}</Text>
                        </View>
                        <View>
                            <SearchBar
                                placeholder="Search by Name"
                                onChangeText={(searchText) => {
                                    this.setState({ searchText })
                                    this.searchFilter(searchText)
                                }}
                                value={this.state.searchText}
                                containerStyle={{ backgroundColor: '#FFFFFF', marginTop: hp("2%") }}
                                inputContainerStyle={{ backgroundColor: '#75DA8B' }}
                                lightTheme={true}
                                round={true}
                                placeholderTextColor="#FFFFFF"
                            />
                        </View>
                        <View style={{ marginTop: hp("2%") }}>
                            <FlatList
                                data={this.state.data}
                                ListEmptyComponent={() => (
                                    <Text style={{
                                        fontFamily: "nunitoRegular",
                                        fontSize: hp("3%"),
                                        marginTop: hp("2%"),
                                        alignSelf: "center"
                                    }}>Not Found!!</Text>
                                )}
                                renderItem={({ item }) =>
                                    (
                                        <Card containerStyle={styles.card} >
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.cardTextOne}>{this.state.data.indexOf(item) + 1}</Text>
                                                <Text style={styles.cardTextTwo}>{item.name} Grade-{item.grade}</Text>
                                                <Text style={styles.cardTextThree}>{item.totalScore}</Text>
                                            </View>
                                        </Card>
                                    )
                                }
                                keyExtractor={(value) => value.uid}
                            />
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
    titleContainer: {
        alignItems: 'center'
    },
    title: {
        marginTop: hp("5%"),
        fontSize: hp("3%"),
        fontFamily: "ralewayMedium",
        position: "absolute"
    },
    titleTwo: {
        marginTop: hp("12%"),
        fontSize: hp("3.5%"),
        fontFamily: "typeWriter",
        position: "absolute"
    },
    image: {
        borderRadius: hp("2.5%"),
        width: wp("100%"),
        height: hp("22%"),
        resizeMode:"cover"
    },
    card: {
        flexDirection: "row",
        height: hp("8%"),
        backgroundColor: "#EAF0F1",
    },
    cardTextOne: {
        fontFamily: "nunitoRegular",
        fontSize: hp("2.5%"),
        position: "absolute"
    },
    cardTextTwo: {
        marginLeft: wp("10%"),
        fontSize: hp("2.5%"),
        fontFamily: "ralewayMedium",
        marginTop: hp("0.2%"),
        position: "absolute"
    },
    cardTextThree: {
        fontSize: hp("2.8%"),
        position: "absolute",
        marginLeft: wp("72%"),
        fontFamily: "typeWriter",
        marginTop: hp("0.2%")
    }
});


