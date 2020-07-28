import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Loading from './Loading.js';
import * as Font from 'expo-font';
import * as firebase from 'firebase';

export default class LeaderBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isReady: false,
            isFontLoaded: false
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
            this.setState({ data: result, isReady: true })
            //   console.log(result)
        })
    }

    sortData = (a, b) => {
        return b.totalScore - a.totalScore;
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
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) =>
                            (
                                <View>
                                    <Text>Name-{item.name},Grade-{item.grade},School-{item.school},Score-{item.totalScore}</Text>
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
    },
});

