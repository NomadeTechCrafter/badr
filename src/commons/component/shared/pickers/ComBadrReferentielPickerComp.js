import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import * as ReferentielAction from '../../../state/actions/ReferentielAction';
import {
  GENERIC_REF_INIT,
  GENERIC_REF_REQUEST,
} from '../../../constants/generic/ComGenericConstants';
import referentielReducer from '../../../state/reducers/ReferentielReducer';
import {pre} from 'react-native-render-html/src/HTMLRenderers';
import {ComBadrProgressBarComp} from '../../index';

class ComBadrReferentielPickerComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: props.disabled,
      dependent: props.dependent,
      selected: {},
    };
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

  enableDisable = (disabled) => {
    this.setState({ disabled: disabled });
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
        module: this.props.module,
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

  buildEmptyDataBlock = (data) => {
    return data && data.length === 0 ? (
      <></>
    ) : (
      <ComBadrProgressBarComp circle={true} />
    );
  };

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

    let selectedValue = {};
    if (this.props.selected) {
      if (this.props.code === '.') {
        selectedValue = this.props.selected;
      } else {
        selectedValue = this.props.selected[this.props.code];
      }
    }

    return (
      <View style={this.props.style}>
        {data && data.length > 0 ? (
          <Picker
            selectedValue={selectedValue}
            mode="dropdown"
            enabled={!this.state.disabled}
            onValueChange={(itemValue, itemIndex) => {
              if (this.props.onValueChanged && data[itemIndex - 1]) {
                this.props.onValueChanged(data[itemIndex - 1], itemIndex);
                this.setState({selected: data[itemIndex - 1]});
              }
            }}>
            <Picker.Item
              label={this.props.label ? this.props.label : ''}
              value={'default_item'}
              key={'default_item'}
            />
            {data.map((item, index) => (
              <Picker.Item
                key={this.props.code === '.' ? item : item[this.props.code]}
                label={
                  this.props.libelle === '.' ? item : item[this.props.libelle]
                }
                value={this.props.code === '.' ? item : item[this.props.code]}
              />
            ))}
          </Picker>
        ) : (
          this.buildEmptyDataBlock(data)
        )}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {...state.referentielReducer};
}

export default connect(mapStateToProps, null)(ComBadrReferentielPickerComp);
