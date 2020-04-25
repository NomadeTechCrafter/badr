import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';

/** REDUX **/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../common/constants/badrPicker';
import * as badrPickerAction from '../../redux/actions/components/badrPicker';

import {BadrInfoMessage} from '../../components/messages/Info';

class BadrPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picker: null,
      selectedValue: this.props.selectedValue,
    };
    console.log('LOGIN : ' + this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  refresh = params => {
    this.fetchData(params);
  };

  fetchData = params => {
    console.log('fetching ...');
    console.log(params);
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
    console.log('componentDidMount');
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    this.fetchData(this.props.params);
    console.log('componentDidMount');
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text style={this.props.titleStyle}>{this.props.title}</Text>
        {this.props.items && this.props.loaded ? (
          <Picker
            textStyle={{fontSize: 8}}
            selectedValue={this.state.selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({selectedValue: itemValue});
              this.props.onValueChange(itemValue, itemIndex);
            }}>
            <Picker.Item
              label="Séléctionnez une valeur"
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
          <View>
            {/* TODO : REFACTO */}
            <Text style={{padding: 20, textAlign: 'center', color: '#009ab2'}}>
              Chargement ...
            </Text>
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
  console.log('*************** mapStateToProps - BadrPicker ');
  console.log(state.badrPickerReducer.picker[ownProps.command]);
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
