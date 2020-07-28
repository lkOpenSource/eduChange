import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import Loading from './Loading.js';
import * as Font from 'expo-font';
import * as firebase from 'firebase';

var dataOfLeaders = []

export default class LeaderBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isReady: false,
            isFontLoaded: false,
            searchText: ""
        }
    }


    loadFont = async () => {
        await Font.loadAsync({
            robotoBold: require("../fonts/roboto-bold.ttf"),
            ralewayMedium: require("../fonts/raleway-medium.ttf"),
            nunitoRegular: require("../fonts/nunito-regular.ttf")
        })
        this.setState({ isFontLoaded: true })
    }

    fetchLeaderBoard = () => {
        firebase.database().ref("users/").on("value", (dataSnapShot) => {
            let finalData = Object.values(dataSnapShot.val());
            //  console.log(finalData)
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
            this.setState({ data: result, isReady: true })
            //   console.log(result)
        })
    }

    sortData = (a, b) => {
        return b.totalScore - a.totalScore;
    }

    searchFilter = (text) => {
        if (text.length === 0) {
            this.setState({ data: dataOfLeaders, searchText: "" })
        } else {
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
            this.setState({ data: result, searchText: text })
        }
    }

    componentDidMount() {
        this.loadFont();
        this.fetchLeaderBoard();
    }

    render() {
        if (this.state.isReady !== false && this.state.isFontLoaded) {
            return (
                <View style={styles.container}>
                    <Text>LeaderBoard</Text>
                    <TextInput
                        onChangeText={(searchText) => { this.searchFilter(searchText) }}
                        value={this.state.searchText}
                        placeholder="Search using name"
                    />
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) =>
                            (
                                <View>
                                    <Text>Name-{item.name},Grade-{item.grade}</Text>
                                    <Text>School-{item.school},Score-{item.totalScore}</Text>
                                </View>
                            )
                        }
                        keyExtractor={(value) => value.uid}
                    />
                    <StatusBar style="light" />
                </View>
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
});

