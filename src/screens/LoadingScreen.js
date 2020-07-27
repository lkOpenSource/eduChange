import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

export default class LoadingScreen extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    checkWhetherUserSignedInOrNot = () => {
        firebase.auth().onAuthStateChanged(async (authenticate) => {
            if (authenticate) {
                await AsyncStorage.setItem("uid", authenticate.uid)
                    .then(() => {
                        this.props.navigation.replace("Home");
                    })
                    .catch((error) => console.log(error))
            } else {
                this.props.navigation.replace("Welcome");
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
