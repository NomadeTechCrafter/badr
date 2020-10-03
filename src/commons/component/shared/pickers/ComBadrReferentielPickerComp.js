import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import * as ReferentielAction from '../../../state/actions/ReferentielAction';
import {
  GENERIC_REF_INIT,
  GENERIC_REF_REQUEST,
} from '../../../constants/generic/GenericConstants';
import referentielReducer from '../../../state/reducers/ReferentielReducer';

class ComBadrReferentielPickerComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item: {}, disabled: false, dependent: props.dependent};
  }

  refresh = (params, caller) => {
    this.caller = caller;
    if (this.caller) {
      this.caller.disable();
    }
    this.fetchData(params);
  };

  disable = () => {
    if (this.caller) {
      this.caller.setState({disabled: true});
    }
  };
  disableCallerIfPending = (pickerData) => {
    if (this.caller && this.caller.setState) {
      if (pickerData && pickerData.length > 0) {
        this.caller.setState({disabled: false});
      } else {
        this.caller.setState({disabled: true});
      }
    }
  };

  fetchData = (params) => {
    let action = ReferentielAction.request({
      type: GENERIC_REF_REQUEST,
      value: {
        command: this.props.command,
        jsonVO: params,
      },
    });
    this.props.dispatch(action);
  };

  clear = () => {
    let action = ReferentielAction.init({
      type: GENERIC_REF_INIT,
      value: {
        command: this.props.command,
      },
    });
    this.props.dispatch(action);
  };

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    if (!this.state.dependent) {
      this.fetchData(this.props.params);
    } else {
      this.clear();
    }
  }

  render() {
    let data = [];
    if (
      this.props &&
      this.props.picker &&
      this.props.picker[this.props.command]
    ) {
      data = this.props.picker[this.props.command].data;
    }
    this.disableCallerIfPending(data);

    return (
      <View style={this.props.style}>
        {data && data.length > 0 && (
          <Picker
            selectedValue={this.state.item}
            mode="dropdown"
            enabled={!this.state.disabled}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({item: itemValue});
              if (this.props.onValueChanged) {
                this.props.onValueChanged(itemValue, itemIndex);
              }
            }}>
            <Picker.Item
              label={this.props.label ? this.props.label : ''}
              value={'default_item'}
              key={'default_item'}
            />
            {data !== null &&
              data.map((item, index) => (
                <Picker.Item
                  key={item[this.props.code]}
                  label={item[this.props.libelle]}
                  value={item[this.props.code]}
                />
              ))}
          </Picker>
        )}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {...state.referentielReducer};
}

export default connect(mapStateToProps, null)(ComBadrReferentielPickerComp);
