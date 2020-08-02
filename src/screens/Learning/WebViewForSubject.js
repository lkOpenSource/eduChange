import React from 'react';
import Loading from '../Loading.js';
import { WebView } from 'react-native-webview';

export default class WebViewForSubject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: ""
        }
    }

    componentDidMount() {
        const { url } = this.props.route.params;
        this.setState({ url });
    }

    render() {
        if (this.state.url !== "") {
            return (
                <WebView
                    source={{ uri: this.state.url }}
                    startInLoadingState={true}
                />
            )
        } else {
            return (
                <Loading />
            )
        }
    }
}

