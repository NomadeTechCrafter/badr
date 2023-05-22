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
import * as Constants from '../../../constants/components/ComAutoCompleteConstants';
import * as AutoCompleteAction from '../../../state/actions/ComAutoCompleteAction';
import _ from 'lodash';
import {
  TYPE_SERVICE_SP,
  MODULE_REF,
  AUTOCOMPLETE_MIN_CHARACTERS,
  AUTOCOMPLETE_LIST_NB_ELEMENTS,
} from '../../../Config';

import {Chip, TextInput} from 'react-native-paper';
import {primaryColor} from '../../../styles/ComThemeStyle';
import {Icon} from 'react-native-elements';
import {ComBadrCircleProgressBarComp, ComBadrListDialogComp} from '../../index';

class ComBadrAutoCompleteChipsComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxItems: this.props.maxItems ? this.props.maxItems : 5,
      items: [],
      edited: false,
      firstTime: true,
      selected: props.selected ? props.selected : {},
      showItems: false,
      listNbElements: this.props.listNbElements
        ? this.props.listNbElements
        : AUTOCOMPLETE_LIST_NB_ELEMENTS,
    };
  }
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }
  handleChangeInput = (params) => {
    console.log('params',params);
    if (!this.props.onDemand) {
      this.setState({
        edited: true,
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
        edited: true,
        selected: {},
        keyword: params,
        firstTime: false,
      });
      let action = AutoCompleteAction.request({
        type: Constants.AUTOCOMPLETE_REQUEST,
        value: {
          module: this.props.module ? this.props.module:MODULE_REF,
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
    if (_.isEmpty(params)) {
        this.props.onValueChange(this.props.initialValue);
    }

  };
  clearInput = () => {
    this.setState({ selected: {libelle:''} });
  };

  prepareParams = (params) => {
    console.log('prepareParams param', params);
    if (this.props.paramName) {
      console.log('prepareParams paramName', params);
      let object = {};
      console.log('prepareParams this.props.params', this.props.params);
      console.log('prepareParams _.isNull(this.props.params)', _.isNull(this.props.params));
      console.log('prepareParams _.isNaN(this.props.params)', _.isNaN(this.props.params));
      if (!_.isNull(this.props.params) && !_.isNaN(this.props.params)) {
        console.log('prepareParams this.props.params', this.props.params);
        object = { ...this.props.params };
      }
      object[this.props.paramName] = params;
      return object;
    }
    return params;
  };

  valueinput = () => {
    if (!_.isEmpty(this.props.selected) && !this.state.edited) {
      console.log('1');
      // chargement avec une valeur dans le props
      return this.props.selected;
    } else if (
      // dans le cas du suppression du props
      _.isEmpty(this.props.selected) &&
      !_.isEmpty(this.state.selected[this.props.libelle])
    ) {
      console.log('2');
      return '';
    } else {
      console.log('3');
      return this.state.selected[
        this.props.libelle ? this.props.libelle : 'libelle'
      ];
    }
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
              value={
                this.props.selected && !this.state.edited
                  ? this.props.selected
                  : this.state.selected[
                      this.props.libelle ? this.props.libelle : 'libelle'
                    ]
              }
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
              disabled={this.props.disabled}
              mode="flat"
              label={
                this.props.placeholder
                  ? this.props.placeholder
                  : 'Rechercher...'
              }
              value={this.valueinput()}
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
                  console.log(item);
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

const mapStateToProps = (state) => ({...state.autoCompleteReducer});

export default connect(mapStateToProps, null)(ComBadrAutoCompleteChipsComp);
