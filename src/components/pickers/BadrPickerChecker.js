import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import PickerCheckBox from 'react-native-picker-checkbox';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

/** REDUX **/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../common/constants/badrPicker';
import * as badrPickerAction from '../../redux/actions/components/badrPicker';

import {BadrInfoMessage} from '../../components/messages/Info';

class BadrPickerChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picker: null,
      selectedItems: [],
    };
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
    this.fetchData(this.props.params);
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };

  onConfirm = () => {
    console.log(this.state.selectedItems);
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

  render() {
    return (
      <View style={this.props.style}>
        <Text style={this.props.titleStyle}>{this.props.title}</Text>
        {this.props.group && this.props.loaded ? (
          <View>
            <SectionedMultiSelect
              styles={{
                button: {backgroundColor: '#009ab2'},
                subItem: {
                  fontSize: 22,
                },
                item: {
                  fontSize: 22,
                },
                container: {
                  height: 400,
                },
                modalWrapper: {
                  height: 400,
                },
              }}
              items={this.props.group}
              uniqueKey={this.props.cle}
              subKey="children"
              iconRenderer={this.icon}
              displayKey={this.props.libelle}
              selectText="Séléctionnez une valeur"
              selectedText="Séléctionnés"
              removeAllText="Supprimer tous"
              searchPlaceholderText="Rechercher"
              confirmText="Valider"
              showDropDowns={false}
              selectChildren={true}
              highlightChildren={true}
              loading={!this.props.loaded}
              showRemoveAll={true}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              onConfirm={this.onConfirm}
            />
          </View>
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
  console.log(state.badrPickerCheckerReducer.picker[ownProps.command]);
  if (
    state.badrPickerCheckerReducer &&
    state.badrPickerCheckerReducer.picker &&
    state.badrPickerCheckerReducer.picker[ownProps.command]
  ) {
    return {...state.badrPickerCheckerReducer.picker[ownProps.command]};
  } else {
    return {...state.badrPickerCheckerReducer};
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
)(BadrPickerChecker);
