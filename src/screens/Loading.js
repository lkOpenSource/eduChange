import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Spinner color='white' />
        <StatusBar style="light" />
      </View>
    )
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
