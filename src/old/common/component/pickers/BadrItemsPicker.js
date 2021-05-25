import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-community/picker';

export default class BadrItemsPicker extends React.Component {
    state = {
        item: '',
    };

    render() {
        return (
            <View style={this.props.style}>
                <Picker
                    style={this.props.stylePickerposition}
                    mode="dropdown"
                    selectedValue={this.props.selectedValue}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({item: itemValue});
                        this.props.onValueChanged(itemValue, itemIndex);
                    }}>
                    <Picker.Item
                        label={this.props.label}
                        value={'default_item'}
                        key={'default_item'}
                    />
                    {this.props.items.map((item, index) => (
                        <Picker.Item
                            key={item.code ? item.code : item.symbole}
                            label={item.libelle ? item.libelle : item.symbole}
                            value={item.code ? item.code : item.symbole}
                        />
                    ))}
                </Picker>
            </View>
        );
    }
}
