import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../../constants/components/AutoCompleteConstants';
import * as AutoCompleteAction from '../../../state/actions/AutoCompleteAction';
import _ from 'lodash';
import {
  TYPE_SERVICE_SP,
  MODULE_REF,
  AUTOCOMPLETE_MIN_CHARACTERS,
  AUTOCOMPLETE_LIST_NB_ELEMENTS,
} from '../../../../commons/Config';

import {Chip, TextInput} from 'react-native-paper';
import {primaryColor} from '../../../styles/theme';
import {Icon} from 'react-native-elements';
import {ComBadrCircleProgressBarComp, ComBadrListDialogComp} from '../../index';

class ComBadrAutoCompleteChipsComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxItems: this.props.maxItems ? this.props.maxItems : 5,
      items: [],
      firstTime: true,
      selected: props.selected ? props.selected : {},
      showItems: false,
      listNbElements: this.props.listNbElements
        ? this.props.listNbElements
        : AUTOCOMPLETE_LIST_NB_ELEMENTS,
    };
  }
  handleChangeInput = (params) => {
    if (!this.props.onDemand) {
      this.setState({
        showItems: true,
        firstTime: false,
        selected: {},
        items: _.filter(this.props.items, (item) => {
          return (
            params.length > 1 &&
            item &&
            item.libelle &&
            item.libelle.toLowerCase().includes(params.toLowerCase())
          );
        }),
      });
    } else if (params) {
      this.setState({
        showItems: true,
        selected: {},
        keyword: params,
        firstTime: false,
      });
      let action = AutoCompleteAction.request({
        type: Constants.AUTOCOMPLETE_REQUEST,
        value: {
          module: MODULE_REF,
          command: this.props.command,
          typeService: TYPE_SERVICE_SP,
          param: this.prepareParams(params),
          nbElements: this.state.listNbElements,
        },
      });
      this.props.dispatch(action);
    } else {
      this.setState({
        showItems: false,
      });
    }
  };

  prepareParams = (params) => {
    if (this.props.paramName) {
      let object = {};
      object[this.props.paramName] = params;
      return object;
    }
    return params;
  };

  render() {
    return (
      <View style={{flex: 1, padding: 15}}>
        {!this.props.loaded &&
          !this.state.firstTime &&
          !this.state.selected && <ComBadrCircleProgressBarComp />}
        {this.props.searchZoneFirst && (
          <View style={{flex: 1}}>
            {this.props.label}
            <TextInput
              mode="flat"
              label={this.props.placeholder}
              value={this.state.selected.libelle}
              onChangeText={(text) => this.handleChangeInput(text)}
            />
          </View>
        )}

        {this.renderItems(
          !this.props.onDemand ? this.state.items : this.props.data,
        )}
        {!this.props.searchZoneFirst && (
          <View style={{flex: 1}}>
            {this.props.label}
            <TextInput
              mode="flat"
              label={this.props.placeholder}
              value={this.state.selected[this.props.libelle]}
              onChangeText={(text) => this.handleChangeInput(text)}
            />
          </View>
        )}
      </View>
    );
  }

  disable = () => {};

  renderItems = (items) => {
    let _items = _.sortBy(items, this.props.code ? this.props.code : 'code');
    return (
      _items &&
      _items.length > 0 &&
      this.state.showItems &&
      this.props.loaded && (
        <View
          style={{
            flex: 1,
            margin: 20,
            borderWidth: 3,
            borderRadius: 10,
            borderColor: primaryColor,
            borderStyle: 'dashed',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => {
              this.setState({showItems: false});
            }}>
            <Icon color={primaryColor} name="close" />
          </TouchableOpacity>
          {_.sortBy(
            _.take(_items, this.state.maxItems),
            this.props.code ? this.props.code : 'code',
          ).map((item) => {
            return (
              <Chip
                mode="outlined"
                style={{margin: 10, borderColor: primaryColor}}
                height={30}
                key={item[this.props.code ? this.props.code : 'code']}
                onPress={() => {
                  this.setState({selected: item, showItems: false});
                  if (this.props.onValueChange) {
                    this.props.onValueChange(item);
                  }
                }}>
                {item[this.props.libelle ? this.props.libelle : 'libelle']}
              </Chip>
            );
          })}

          {this.state.maxItems < _items.length && (
            <Chip
              onPress={() => {
                this.setState({
                  showAutoCompleteChips: true,
                  autoCompleteItems: _items,
                  autoCompleteTitle: this.props.title,
                });
              }}>
              Afficher plus...
            </Chip>
          )}

          {this.state.showAutoCompleteChips && (
            <ComBadrListDialogComp
              visible={this.state.showAutoCompleteChips}
              libelle={this.props.libelle}
              items={_items}
              onSelect={(item) => {
                this.setState({
                  selected: item,
                  showItems: false,
                  showAutoCompleteChips: false,
                });
                if (this.props.onValueChange) {
                  this.props.onValueChange(item);
                }
              }}
              onClose={() => {
                this.setState({showAutoCompleteChips: false});
              }}
            />
          )}
        </View>
      )
    );
  };
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({...state.autoCompleteReducer});

export default connect(mapStateToProps, null)(ComBadrAutoCompleteChipsComp);
