import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import Loading from '/home/jsathu/ReactNative/eduChange/src/components/Loading.js';
import * as firebase from 'firebase';

export default class ICT extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contents: {}
        }
    }

    getContents = (grade) => {
        firebase.database().ref(`subjects/grade${grade}/ICT`)
            .once("value", (dataSnapShot) => {
                if (dataSnapShot.val()) {
                    this.setState({ contents: dataSnapShot.val() })
                } else {
                    alert("Check your internet connection and restart the App");
                }
            })
            .catch((error) => console.log(error))
    }


    componentDidMount() {
     //   const { grade } = this.props.route.params;
     //   this.getContents(grade);
    }

    render() {
        if (this.state.contents !== {}) {
            return (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text>ICT</Text>
                   
                    <StatusBar style="light" />
                </ScrollView>
            );
        } else {
            <Loading />
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
