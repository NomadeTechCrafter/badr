import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';

/** REDUX **/
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../common/constants/badrPicker';
import * as badrPickerAction from '../../redux/actions/components/badrPicker';

export class BadrPicker extends React.Component {
  state = {
    selectedService: {},
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    badrPickerAction.request({type: Constants.BADRPICKER_REQUEST, value: {}});
  }

  render() {
    let items = this.props.items.map((value, index) => {
      return <Picker.Item key={index} value={value} label={value} />;
    });

    return (
      <View>
        <Text>{this.props.title}</Text>
        <Picker
          selectedValue={this.state.selectedValue}
          onValueChange={value => this.setState({selectedService: value})}>
          {items}
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  console.log(state);
  return {
    state: state.value,
  };
};

connect(mapStateToProps)(BadrPicker);
