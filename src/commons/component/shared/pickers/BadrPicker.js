import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {BadrCircleProgressBar} from '../../index';
import Icon from 'react-native-vector-icons/FontAwesome';

/** REDUX **/
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../../constants/components/BadrPickerConstants';
import * as badrPickerAction from '../../../state/actions/BadrPickerAction';

import {primaryColor} from '../../../styles';

import {translate} from '../../../i18n/I18nHelper';
/** STORAGE **/
import {save} from '../../../services/async-storage/StorageService';

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

  fetchData = (params) => {
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

  disableCallerIfPending = (pickerData) => {
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
      save(this.props.storeWithKey, itemValue.toString());
      if (this.props.storeLibelleWithKey) {
        let selectedItem = this.props.picker[this.props.command].items[
          itemIndex - 1
        ];
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
      <View style={(styles.container, {...this.props.style})}>
        {this.props.toggle && (
          <TouchableOpacity
            style={styles.toggleStyle}
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
          <Text style={(styles.toggleTextStyle, {...this.props.titleStyle})}>
            {this.props.title}
          </Text>
        )}

        {this.state.expanded && (
          <View style={styles.expandedContainer}>
            {pickerData && pickerData.items && pickerData.loaded ? (
              <Picker
                enabled={!this.state.disabled}
                mode="dropdown"
                textStyle={styles.pickerTextStyle}
                selectedValue={this.state.selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  this.onValueChanged(itemValue, itemIndex)
                }>
                <Picker.Item
                  label={translate('components.pickerchecker.default_value')}
                  value={'default_item_' + this.props.command}
                  key={'default_item_' + this.props.command}
                />
                {pickerData.items.map((item) => {
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
  pickerTextStyle: {fontSize: 8},
  expandedContainer: {},
  toggleStyle: {
    backgroundColor: primaryColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    padding: 5,
  },
  toggleTextStyle: {
    margin: -10,
    padding: 10,
  },
  container: {},
});

function mapStateToProps(state, ownProps) {
  return {...state.badrPickerReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BadrPicker);
