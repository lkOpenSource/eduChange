import React from 'react';
import Loading from '../Loading.js';
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
