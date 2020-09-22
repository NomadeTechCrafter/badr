import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../../constants/components/ComAutoCompleteConstants';
import * as AutoCompleteAction from '../../../state/actions/ComAutoCompleteAction';
import {
  TYPE_SERVICE_SP,
  MODULE_REF,
  AUTOCOMPLETE_MIN_CHARACTERS,
  AUTOCOMPLETE_LIST_NB_ELEMENTS,
} from '../../../Config';
import {Autocomplete} from 'react-native-dropdown-autocomplete';

class ComBadrAutoCompleteComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimumCharacters: props.minimumCharacters
        ? props.minimumCharacters
        : AUTOCOMPLETE_MIN_CHARACTERS,
      listNbElements: props.listNbElements
        ? props.listNbElements
        : AUTOCOMPLETE_LIST_NB_ELEMENTS,
    };
  }
  handleChangeInput = (params) => {
    if (params.length > this.state.minimumCharacters) {
      let action = AutoCompleteAction.request({
        type: Constants.AUTOCOMPLETE_REQUEST,
        value: {
          module: MODULE_REF,
          command: this.props.command,
          typeService: TYPE_SERVICE_SP,
          param: params,
          nbElements: this.state.listNbElements,
        },
      });
      this.props.dispatch(action);
    }
  };
  handleSelectItem = (item, id) => {
    console.log('item', item, 'id', id);
  };

  render() {
    return (
      <View style={styles.autocompletesContainer}>
        <Text> {this.props.libelle} </Text>
        <Autocomplete
          ref={this.props.onRef}
          key={this.props.key}
          handleSelectItem={(item, id) => this.props.handleSelectItem(item, id)}
          style={styles.input}
          spinnerStyle={styles.spinnerStyle}
          inputContainerStyle={styles.inputContainer}
          pickerStyle={styles.pickerStyle}
          minimumCharactersCount={this.state.minimumCharacters}
          highlightText
          valueExtractor={(item) => item.libelle}
          rightContent
          rightTextExtractor={(item) => item.code}
          fetchData={async () => {
            return (await this.props.data) ? this.props.data : [];
          }}
          onChangeText={(text) => this.handleChangeInput(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    flexDirection: 'column',
    marginHorizontal: 30,
  },
  spinnerStyle: {
    position: 'absolute',
    top: 20,
  },
  input: {maxHeight: 40, borderColor: '#c7c6c1'},
  inputContainer: {
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 13,
    width: '100%',
  },
  pickerStyle: {
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  plus: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
});

const mapStateToProps = (state) => ({...state.autoCompleteReducer});

export default connect(mapStateToProps, null)(ComBadrAutoCompleteComp);
