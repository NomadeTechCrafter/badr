import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import translate from '../../../i18n/I18nHelper';

export default class ComBadrItemsPickerComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      disabled: this.props.disabled,
    };
  }

  render() {
    return (
      <View style={this.props.style}>
        <Picker
          mode="dropdown"
          enabled={!this.state.disabled}
          selectedValue={this.props.selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({item: itemValue});
            this.props.onValueChanged(
              this.props.items[itemIndex - 1],
              itemIndex,
            );
          }}>
          <Picker.Item
            label={
              this.props.label
                ? this.props.label
                : translate('components.pickerchecker.default_value')
            }
            value={'default_item'}
            key={'default_item'}
          />
          {this.props.items &&
            this.props.items.map((item, index) => (
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
