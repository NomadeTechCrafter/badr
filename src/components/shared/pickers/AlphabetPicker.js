import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {translate} from '../../../common/translations/i18n';

export default class AlphabetPicker extends React.Component {
  state = {
    letter: '',
  };
  render() {
    return (
      <View style={{width: '25%'}}>
        <Picker
          mode="dropdown"
          selectedValue={this.props.selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({letter: itemValue});
            this.props.onValueChanged(itemValue, itemIndex);
          }}>
          <Picker.Item
            label={translate('components.pickerchecker.default_value')}
            value={'default_item'}
            key={'default_item'}
          />
          {this.props.items.map((item, index) => (
            <Picker.Item key={item.code} label={item.code} value={item.code} />
          ))}
        </Picker>
      </View>
    );
  }
}
