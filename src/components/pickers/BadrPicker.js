import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {BadrCircleProgressBar} from '../../components/progressbars/BadrCircleProgressBar';

/** REDUX **/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../common/constants/badrPicker';
import * as badrPickerAction from '../../redux/actions/components/badrPicker';

import {BadrInfoMessage} from '../../components/messages/Info';

import {translate} from '../../common/translations/i18n';

/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';

class BadrPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picker: null,
      selectedValue: this.props.selectedValue,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  refresh = params => {
    this.fetchData(params);
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

  render() {
    return (
      <View style={this.props.style}>
        <Text style={this.props.titleStyle}>{this.props.title}</Text>
        {this.props.items && this.props.loaded ? (
          <Picker
            enabled={this.props.loaded}
            mode="dropdown"
            textStyle={{fontSize: 8}}
            selectedValue={this.state.selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({selectedValue: itemValue});
              this.props.onValueChange(itemValue, itemIndex);
            }}>
            <Picker.Item
              label={translate('components.pickerchecker.default_value')}
              value={'default_item_' + this.props.command}
              key={'default_item_' + this.props.command}
            />
            {this.props.items.map(item => {
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
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});

function mapStateToProps(state, ownProps) {
  if (
    state.badrPickerReducer &&
    state.badrPickerReducer.picker &&
    state.badrPickerReducer.picker[ownProps.command]
  ) {
    return {...state.badrPickerReducer.picker[ownProps.command]};
  } else {
    return {...state.badrPickerReducer};
  }
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
