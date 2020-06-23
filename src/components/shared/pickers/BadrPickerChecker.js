import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {BadrCircleProgressBar} from '../../';
import _ from 'lodash';

/** REDUX **/
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../../common/constants/components/badrPicker';
import * as badrPickerAction from '../../../redux/actions/components/badrPicker';

import {translate} from '../../../common/translations/i18n';

class BadrPickerChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picker: null,
      expanded: true,
      selectedItems: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  fetchData = (params) => {
    let action = badrPickerAction.request({
      type: Constants.BADRPICKER_REQUEST,
      value: {
        module: this.props.module,
        command: this.props.command,
        typeService: this.props.typeService,
        param: params,
        cle: this.props.cle,
        libelle: this.props.libelle,
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

  onSelectedItemsChange = (selectedItems) => {
    this.setState({selectedItems: selectedItems});
  };

  icon = ({name, size = 18, style}) => {
    // flatten the styles
    const flat = StyleSheet.flatten(style);
    // remove out the keys that aren't accepted on View
    const {color, fontSize, ...styles} = flat;

    let iconComponent;
    // the colour in the url on this site has to be a hex w/o hash
    const iconColor = '#009ab2';

    const Search = <Icon size={15} color={iconColor} name="search" />;
    const Down = <Icon size={15} color={iconColor} name="caret-down" />;
    const Up = <Icon size={15} color={iconColor} name="caret-up" />;
    const Close = <Icon size={15} color={iconColor} name="close" />;

    const Check = <Icon size={15} color={iconColor} name="check" />;
    const Cancel = <Icon size={15} color={iconColor} name="search" />;

    switch (name) {
      case 'search':
        iconComponent = Search;
        break;
      case 'keyboard-arrow-up':
        iconComponent = Up;
        break;
      case 'keyboard-arrow-down':
        iconComponent = Down;
        break;
      case 'close':
        iconComponent = Close;
        break;
      case 'check':
        iconComponent = Check;
        break;
      case 'cancel':
        iconComponent = Cancel;
        break;
      default:
        iconComponent = null;
        break;
    }
    return <View style={styles}>{iconComponent}</View>;
  };

  toggleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  };

  render() {
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
          <View>
            {this.props.picker[this.props.command] &&
            this.props.picker[this.props.command].group &&
            this.props.picker[this.props.command].loaded ? (
              <ScrollView>
                <SectionedMultiSelect
                  styles={{
                    button: {backgroundColor: '#009ab2'},
                  }}
                  items={this.props.picker[this.props.command].group}
                  uniqueKey={this.props.cle}
                  subKey="children"
                  iconRenderer={this.icon}
                  displayKey={this.props.libelle}
                  selectText={translate(
                    'components.pickerchecker.default_value',
                  )}
                  selectedText={translate('components.pickerchecker.selected')}
                  searchPlaceholderText={translate(
                    'components.pickerchecker.search',
                  )}
                  confirmText={translate('components.pickerchecker.submit')}
                  showDropDowns={false}
                  selectChildren={true}
                  showChips={this.state.selectedItems.length < 100}
                  highlightChildren={true}
                  loading={!this.props.picker[this.props.command].loaded}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={this.state.selectedItems}
                  onConfirm={() => {
                    const results = this.state.selectedItems;
                    /* Exclude parent item */
                    _.remove(results, (item) => {
                      return '0' === item;
                    });
                    this.props.onConfirm(results);
                  }}
                  onSelectedItemObjectsChange={(newCollection) => {
                    let profils = [];
                    if (newCollection) {
                      newCollection.forEach((item) => {
                        profils.push(item.codeProfil);
                      });
                    }
                    this.props.onSelectedItemObjectsChange(profils);
                  }}
                />
              </ScrollView>
            ) : (
              <View style={{margin: 0, padding: 0}}>
                <BadrCircleProgressBar size={30} />
              </View>
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
  return {...state.badrPickerCheckerReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BadrPickerChecker);
