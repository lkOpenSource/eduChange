import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

export default class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    checkWhetherUserSignedInOrNot = () => {
        firebase.auth().onAuthStateChanged((authenticate) => {
          if (authenticate) {
            this.props.navigation.replace("Home");
          } else {
            this.props.navigation.replace("SignUp");
          }
        })
    }

    componentDidMount() {
        this.checkWhetherUserSignedInOrNot();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large" style={{ marginBottom: 20 }} />
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
