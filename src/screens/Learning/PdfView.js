import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from '/home/jsathu/ReactNative/eduChange/src/components/Loading.js';
import PDFReader from 'rn-pdf-reader-js';

export default class PdfView extends React.Component {

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
                <PDFReader
                    source={{
                        uri: "http://www.africau.edu/images/default/sample.pdf"
                    }}
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
        paddingTop: 0
    },
});

