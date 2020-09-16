import React from 'react';
import {TextInput} from 'react-native-paper';
import {CustomStyleSheet} from '../../../styles/theme';

export default class ComBadrNumericTextInputComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.value,
    };
  }
  handleInputChange = (text) => {
    if (/^\d+$/.test(text) || text === '') {
      this.setState({
        inputValue: text,
      });
      this.props.onChangeBadrInput(text);
    }
  };

  render() {
    const {value, style, ...inputProps} = this.props;
    return (
      <TextInput
        {...inputProps}
        ref={this.props.onRef}
        mode={'outlined'}
        keyboardType={'number-pad'}
        value={this.state.inputValue}
        onChangeText={(text) => this.handleInputChange(text)}
        style={[CustomStyleSheet.badrInputHeight, style]}
      />
    );
  }
}
