import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Loading from '/home/jsathu/ReactNative/eduChange/src/components/Loading.js';

export default class PlayVideo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            url: ""
        }
    }

    componentDidMount() {
        const { title } = this.props.route.params;
        const { url } = this.props.route.params;
        this.setState({ title, url });
    }

    render() {
        if (this.state.title !== "" && this.state.url !== "") {
            return (
                <WebView
                    source={{ uri: this.state.url }}
                    startInLoadingState={true}
                    allowsFullscreenVideo
                    style={{ marginBottom: 0 }}
                    scrollEnabled={false}
                />
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
