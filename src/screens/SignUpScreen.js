import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import { Input, Button, Item, Label } from 'native-base';
import * as firebase from 'firebase';

export default class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            grade: "",
            school: "",
            uid: ""
        }
    }

    signUp = () => {
        if (this.state.email !== ""
            && this.state.grade !== ""
            && this.state.name !== ""
            && this.state.password !== ""
            && this.state.school !== "") {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((authenticate) => {
                    this.setState({ uid: authenticate.user.uid });
                    authenticate.user.updateProfile({ displayName: this.state.name })
                        .then(() => {
                            this.addUserToDatabase();
                        })
                })
                .catch((error) => alert(error))
        } else {
            alert("Please fill the form");
        }
    }

    addUserToDatabase = () => {
        firebase.database().ref(`users/${this.state.uid}`).set({
            name: this.state.name,
            email: this.state.email,
            grade: this.state.grade,
            school: this.state.school,
            uid: this.state.uid
        }).then(() => {
            this.saveUid();
        })
            .catch((error) => console.log(error));
    }

    saveUid = async () => {
        await AsyncStorage.setItem("uid", this.state.uid)
            .then(() => { this.props.navigation.navigate("Home") })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text>SignUp Screen</Text>
                <Item rounded>
                    <Label><Text>Email</Text></Label>
                    <Input value={this.state.email} onChangeText={(email) => { this.setState({ email }) }} />
                </Item>
                <Item rounded>
                    <Label><Text>Name</Text></Label>
                    <Input value={this.state.name} onChangeText={(name) => { this.setState({ name }) }} />
                </Item>

                <Item rounded>
                    <Label><Text>Grade</Text></Label>
                    <Input value={this.state.grade} onChangeText={(grade) => { this.setState({ grade }) }} />
                </Item>
                <Item rounded>
                    <Label><Text>School</Text></Label>
                    <Input value={this.state.school} onChangeText={(school) => { this.setState({ school }) }} />
                </Item>
                <Item rounded>
                    <Label><Text>Password</Text></Label>
                    <Input value={this.state.password} onChangeText={(password) => { this.setState({ password }) }} />
                </Item>

                <Button onPress={() => { this.signUp() }}><Text>SignUp</Text></Button>
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
