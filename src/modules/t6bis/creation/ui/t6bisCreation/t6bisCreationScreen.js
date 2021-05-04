import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../../commons/styles/ComThemeStyle';
import {MODE_CREATION} from '../../../utils/t6bisConstants';
import * as t6bisCreationSearchAction from '../../state/actions/t6bisCreationSearchAction';
import t6bisInitForCreateAction from '../../state/actions/t6bisInitForCreateAction';
import * as Constantes from '../../state/t6bisCreationConstants';
import styles from '../../style/t6bisCreationStyle';

class T6bisCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTypeCode: null,
      selectedType: null,
      mode: null,
    };
  }

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('T6bisCreation focus start');
      this.setState({
        selectedTypeCode: null,
        selectedType: null,
        mode: null
      });
    });
    this.loadTypes();
  }
  loadTypes = async () => {
    let action = await t6bisCreationSearchAction.request({
      type: Constantes.CREATION_T6BIS_ALL_TYPE_REQUEST,
      value: null,
    });
    this.props.actions.dispatch(action);
  };

  componentWillUnmount() {
    this.props.errorMessage = '';
    this.props.errorInfo = '';
    console.log('T6bisCreation         componentWillUnmount');
    this._unsubscribe();
  }

  reset = () => {
    console.log('reset');
    this.setState({ selectedTypeCode: null });
  };

  valider = async () => {
    console.log('valider');
    console.log(this.state.selectedTypeCode);
    console.log('this.state.listeType', this.state.listeType);
    var selectedTypeCodevar = this.state.selectedTypeCode;
    this.state.selectedType = this.state.listeType.filter(function (type) {
      return type.code == selectedTypeCodevar;
    })[0];
    console.log('this.state.selectedType', this.state.selectedType);
    let action = await t6bisInitForCreateAction.request(
      {
        type: Constantes.T6BIS_INIT_FOR_CREATION_REQUEST,
        value: {
          codeType: this.state.selectedTypeCode,
          selectedType: this.state.selectedType,
          mode: MODE_CREATION,
          title: translate('t6bisGestion.title'),
        },
      },
      this.props.navigation, this.reset
    );
    this.props.actions.dispatch(action);
  };

  abandonner = () => {
    console.log('abandonner');
    this.props.navigation.navigate('Bienvenue', {});
  };

  static getDerivedStateFromProps(props, state) {
    if (props.types) {
      return {
        types: props.types, // update the value of specific key
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  render() {
    let rows = [];
    let types = [];
    if (this.props.types) {
      rows = this.props.types;
      console.log('rows', rows);
      if (rows && Array.isArray(rows)) {
        rows.forEach((item) => {
          console.log('item', item);
          const _item = generateType(item);
          if (_item) {
            types.push(_item);
          }
        });
        this.state.listeType = types;
      }
    }
    return (
      <ScrollView style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('t6bisCreation.t6bisCreation.title')}
        />
        {this.props.errorMessage != null && (
          <View style={styles.messages}>
            <ComBadrErrorMessageComp
              style={styles.centerErrorMsg}
              message={this.props.errorMessage}
            />
          </View>
        )}
        {this.props.messageInfo != null && (
          <View style={styles.messages}>
            <ComBadrInfoMessageComp
              style={styles.centerInfoMsg}
              message={this.props.messageInfo}
            />
          </View>
        )}
        <Text style={CustomStyleSheet.centeredText}>
          {translate('t6bisCreation.t6bisCreation.choixtype.title')}
        </Text>

        <View style={styles.flexColumn} pointerEvents="auto">
          <RadioButton.Group
            onValueChange={(value) => this.setState({selectedTypeCode: value})}
            value={this.state.selectedTypeCode}>
            {this.state.listeType ? (
              this.state.listeType.map((item) => (
                <RadioButton.Item
                  label={item.libelle}
                  value={item.code}
                  key={item.code}
                />
              ))
            ) : (
              <Text style={styles.textRadio}>
                {translate('t6bisCreation.t6bisCreation.liste.vide')}
              </Text>
            )}
          </RadioButton.Group>
        </View>
        {this.state.selectedTypeCode && (
          <View style={styles.ComContainerCompBtn}>
            <ComBadrButtonComp
              style={styles.actionBtn}
              onPress={() => {
                this.valider();
              }}
              text={translate('t6bisCreation.t6bisCreation.buttons.valider')}
            />
            <ComBadrButtonComp
              style={styles.actionBtn}
              onPress={() => {
                this.abandonner();
              }}
              text={translate('t6bisCreation.t6bisCreation.buttons.abandonner')}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.t6bisCreationReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

function getStateByMode(state) {
  let mode;
  return mode === 'update' ? state + '_update' : state;
}

function generateType(item) {
  var _item;
  if ('01' === item.code || '02' === item.code) {
    _item = {
      code: item.code,
      libelle: item.libelle,
      // checked: item.code === '01' ? true : false,
      tabs: [
        {state: getStateByMode('app2.ctrl_t6bis_entete'), libelle: 'Entete'},
        {
          state: getStateByMode('app2.ctrl_t6bis_articles'),
          libelle: 'Articles',
        },
        {
          state: getStateByMode('app2.ctrl_t6bis_taxation_manuelle'),
          libelle: 'Taxation manuelle',
        },
        {
          state: getStateByMode('app2.ctrl_t6bis_taxation_globale'),
          libelle: 'Taxation globale',
        },
        {
          state: getStateByMode('app2.ctrl_t6bis_informations'),
          libelle: 'Informations',
        },
        {
          state: getStateByMode('app2.ctrl_t6bis_historique'),
          libelle: 'Historique',
        },
        {state: 'app2.ctrl_t6bis_type_chooser', libelle: 'Quitter'},
      ],
    };
  } else if (
    '03' === item.code ||
    '04' === item.code ||
    '06' === item.code ||
    '07' === item.code
  ) {
    _item = {
      code: item.code,
      libelle: item.libelle,
      tabs: [
        {state: getStateByMode('app2.ctrl_t6bis_entete'), libelle: 'Entete'},
        {
          state: getStateByMode('app2.ctrl_t6bis_taxation_globale'),
          libelle: 'Taxation globale',
        },
        {
          state: getStateByMode('app2.ctrl_t6bis_informations'),
          libelle: 'Informations',
        },
        {
          state: getStateByMode('app2.ctrl_t6bis_historique'),
          libelle: 'Historique',
        },
        {state: 'app2.ctrl_t6bis_type_chooser', libelle: 'Quitter'},
      ],
    };
  }
  console.log(_item);
  return _item;
}

export default connect(mapStateToProps, mapDispatchToProps)(T6bisCreation);
