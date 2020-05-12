import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {translate} from '../../common/translations/i18n';

export default class BadrItemsPicker extends React.Component {
  state = {
    item: '',
  };
  render() {
    return (
      <View style={{width: '100%'}}>
        <Picker
          mode="dropdown"
          selectedValue={this.props.selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({item: itemValue});
            this.props.onValueChanged(itemValue, itemIndex);
          }}>
          <Picker.Item
            label={translate('components.pickerchecker.default_value')}
            value={'default_item'}
            key={'default_item'}
          />
          {this.props.items.map((item, index) => (
            <Picker.Item
              key={item.code}
              label={item.libelle}
              value={item.code}
            />
          ))}
        </Picker>
      </View>
    );
  }
}
