import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {BadrCircleProgressBar} from '../../';
import Icon from 'react-native-vector-icons/FontAwesome';

/** REDUX **/
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../../common/constants/components/badrPicker';
import * as badrPickerAction from '../../../redux/actions/components/badrPicker';

import {translate} from '../../../common/translations/i18n';

/** STORAGE **/
import {save} from '../../../services/storage-service';
console.disableYellowBox = true;
class BadrPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picker: null,
      expanded: true,
      disabled: false,
      selectedValue: this.props.selectedValue,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  refresh = (params, caller) => {
    this.caller = caller;
    this.caller.disable();
    this.fetchData(params);
  };

  disable = () => {
    if (this.caller) {
      this.caller.setState({disabled: true});
    }
  };

  fetchData = params => {
    let action = badrPickerAction.request({
      type: Constants.BADRPICKER_REQUEST,
      value: {
        module: this.props.module,
        command: this.props.command,
        typeService: this.props.typeService,
        param: params,
      },
    });
    this.props.actions.dispatch(action);
  };

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    this.fetchData(this.props.param);
  }

  toggleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  };

  disableCallerIfPending = pickerData => {
    if (this.caller && this.caller.setState) {
      if (pickerData && pickerData.loaded) {
        this.caller.setState({disabled: false});
      } else {
        this.caller.setState({disabled: true});
      }
    }
  };

  onValueChanged = (itemValue, itemIndex) => {
    if (this.props.storeWithKey && itemIndex > 0) {
      console.log(
        '----------------- PICKER ASYNC STORAGE OPERATION ------------------',
      );
      save(this.props.storeWithKey, itemValue.toString());

      if (this.props.storeLibelleWithKey) {
        let selectedItem = this.props.picker[this.props.command].items[
          itemIndex - 1
        ];
        console.log('Saving : ');
        console.log(
          this.props.storeWithKey
            .concat('_')
            .concat(this.props.storeLibelleWithKey),
        );
        console.log('With value : ');
        console.log(selectedItem[this.props.storeLibelleWithKey]);
        if (selectedItem) {
          save(
            this.props.storeWithKey
              .concat('_')
              .concat(this.props.storeLibelleWithKey),
            selectedItem[this.props.storeLibelleWithKey],
          );
        }
        this.props.onValueChange(itemValue, itemIndex, selectedItem);
      }
    }
    this.setState({selectedValue: itemValue});
  };

  render() {
    let pickerData = this.props.picker[this.props.command];
    this.disableCallerIfPending(pickerData);
    return (
      <View style={{...this.props.style, borderWidth: 0}}>
        {this.props.toggle && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: -10,
              padding: 10,
              backgroundColor: '#ececec',
              ...this.props.titleStyle,
            }}
            onPress={() => this.toggleExpand()}>
            <Text style={this.props.titleStyle}>{this.props.title}</Text>
            <Icon
              style={this.props.titleStyle}
              name={this.state.expanded ? 'minus-square' : 'plus-square'}
              size={30}
              color={'#5E5E5E'}
            />
          </TouchableOpacity>
        )}

        {!this.props.toggle && (
          <Text
            style={{
              margin: -10,
              padding: 10,
              ...this.props.titleStyle,
            }}>
            {this.props.title}
          </Text>
        )}

        {this.state.expanded && (
          <View style={{margin: -10}}>
            {pickerData && pickerData.items && pickerData.loaded ? (
              <Picker
                enabled={!this.state.disabled}
                mode="dropdown"
                textStyle={{fontSize: 8}}
                selectedValue={this.state.selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  this.onValueChanged(itemValue, itemIndex)
                }>
                <Picker.Item
                  label={translate('components.pickerchecker.default_value')}
                  value={'default_item_' + this.props.command}
                  key={'default_item_' + this.props.command}
                />
                {pickerData.items.map(item => {
                  const key = item[this.props.cle] + '_' + this.props.command;
                  return (
                    <Picker.Item
                      label={item[this.props.libelle]}
                      value={item[this.props.cle]}
                      key={key}>
                      <Text>Check</Text>
                    </Picker.Item>
                  );
                })}
              </Picker>
            ) : (
              <BadrCircleProgressBar size={30} />
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});

function mapStateToProps(state, ownProps) {
  // if (
  //   state.badrPickerReducer &&
  //   state.badrPickerReducer.picker &&
  //   state.badrPickerReducer.picker[ownProps.command]
  // ) {
  //   return {...state.badrPickerReducer.picker[ownProps.command]};
  // } else {

  return {...state.badrPickerReducer};
  // }
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BadrPicker);
