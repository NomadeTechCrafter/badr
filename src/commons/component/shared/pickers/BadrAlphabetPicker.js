import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {translate} from '../../../i18n/I18nHelper';

export default class BadrAlphabetPicker extends React.Component {
  state = {
    letter: '',
  };
  render() {
    return (
      <View style={styles.container}>
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
const styles = StyleSheet.create({
  container: {
    width: '25%',
  },
});
