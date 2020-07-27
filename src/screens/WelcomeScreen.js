import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import { Input, Button, Item, Label } from 'native-base';

export default class WelcomeScreen extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
          
    //     }
    // }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text>Welcome Screen</Text>
                <Button onPress={() => { this.props.navigation.navigate("SignUp") }}><Text>SignUp</Text></Button>
                <Button onPress={() => { this.props.navigation.navigate("SignIn") }}><Text>SignIn</Text></Button>
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
