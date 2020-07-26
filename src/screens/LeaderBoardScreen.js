import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import firebase from 'firebase';

export default class LeaderBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    fetchLeaderBoard = (grade) => {
        firebase.database().ref(`leaderboard/${grade}`)
            .on("value", (dataSnapShot) => {

            })
    }

    componentDidMount() {
        this.fetchLeaderBoard(grade);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>LeaderBoard</Text>
                <FlatList
                    data={}
                    value={()=>{

                    }}
                    keyExtractor={}
                />
                <StatusBar style="light" />
            </View>
        );
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
