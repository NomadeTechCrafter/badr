import React from 'react';
import {TextInput} from 'react-native-paper';

export default class BadrNumericTextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }
    handleInputChange = (text) => {
        if (/^\d+$/.test(text)) {
            this.setState({
                inputValue: text
            });
        }
    }
    render() {
        return (
            <TextInput
                mode={'outlined'}
                error={this.props.error}
                maxLength={this.props.maxLength}
                keyboardType={'number-pad'}
                value={this.state.inputValue}
                label={this.props.label}
                onChangeText={this.handleInputChange}
                style={this.props.style}
            />
        );
    }
}