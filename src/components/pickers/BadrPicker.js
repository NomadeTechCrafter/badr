import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';

/** REDUX **/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../common/constants/badrPicker';
import * as badrPickerAction from '../../redux/actions/components/badrPicker';

class BadrPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.selectedValue,
    };
  }

  componentDidMount() {
    console.log('--------------> initializing component : ');
    console.log(this.props.module);
    console.log(this.props.command);
    console.log(this.props.cle);
    console.log('--------------> initializing component : ');

    let action = badrPickerAction.request({
      type: Constants.BADRPICKER_REQUEST,
      value: {
        user: 'AD6203',
        module: this.props.module,
        command: this.props.command,
        typeService: this.props.typeService,
      },
    });
    this.props.actions.dispatch(action);
  }

  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
        {this.props.badrPickerReducer.picker &&
        this.props.badrPickerReducer.picker[this.props.command] ? (
          <Picker
            style={this.props.style}
            selectedValue={this.state.selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({selectedValue: itemValue});
              this.props.onValueChange(itemValue, itemIndex);
            }}>
            {this.props.badrPickerReducer.picker[this.props.command].items.map(
              item => {
                const key = item[this.props.cle] + '_' + this.props.command;
                return this.props.cle && item[this.props.cle] ? (
                  <Picker.Item
                    label={item[this.props.libelle]}
                    value={item[this.props.cle]}
                    key={key}
                  />
                ) : (
                  <Picker.Item label="???" />
                );
              },
            )}
          </Picker>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {...state};
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
