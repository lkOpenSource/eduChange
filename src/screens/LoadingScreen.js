import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Spinner } from 'native-base';
import * as firebase from 'firebase';

export default class LoadingScreen extends React.Component {

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
                <Spinner color='white' />
                <StatusBar style="light" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
