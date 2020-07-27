import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import { Input, Button, Item, Label } from 'native-base';
import * as firebase from 'firebase';

export default class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            uid: ""
        }
    }

    signIn = () => {
        if (this.state.email !== ""
            && this.state.password !== "") {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((authenticate) => {
                    this.setState({ uid: authenticate.user.uid });
                    this.saveUid();
                })
                .catch((error) => alert(error))
        } else {
            alert("Please fill ");
        }
    }

    saveUid = async () => {
        await AsyncStorage.setItem("uid", this.state.uid)
            .then(() => { this.props.navigation.navigate("Home") })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text>SignIn Screen</Text>
                <Item rounded>
                    <Label><Text>Email</Text></Label>
                    <Input value={this.state.email} onChangeText={(email) => { this.setState({ email }) }} />
                </Item>
                <Item rounded>
                    <Label><Text>Password</Text></Label>
                    <Input value={this.state.password} onChangeText={(password) => { this.setState({ password }) }} />
                </Item>
                <Button onPress={() => { this.signIn() }}><Text>SignIn</Text></Button>
                <StatusBar style="light" />
            </ScrollView>
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