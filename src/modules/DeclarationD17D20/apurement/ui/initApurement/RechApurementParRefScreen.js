/** RN Components **/
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
/** REDUX **/
import { connect } from 'react-redux';
import _ from 'lodash';

import { Button, HelperText, TextInput } from 'react-native-paper';

import {
  ComBadrButtonIconComp,
  ComBadrErrorMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component/index';

import {
  CustomStyleSheet,
  accentColor,
} from '../../../../../commons/styles/ComThemeStyle';

/** Storage **/
import { load } from '../../../../../commons/services/async-storage/ComStorageService';

/**i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import * as Constants from '../../state/ApurementConstants';
import * as RechApurmentAction from '../../state/actions/RechApurmentAction';

class RechApurementParRefScreen extends Component {
  defaultState = {
    bureau: '',
    regime: '',
    annee: '',
    serie: '',
    cle: '',
    cleValide: '',
    login: '',
    showErrorMsg: false,
    errorMessage : '',
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.props.actions.dispatch({
      type: Constants.INIT_D17_DUM_SCREEN,
      value: {},
    });
   
  }

  componentDidMount() {
    this.state = this.defaultState;
    this.props.actions.dispatch({
      type: Constants.INIT_D17_DUM_SCREEN,
      value: {},
    });
  }
  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    if (serie?.length > 6) {
      let firstSerie = serie?.substring(0, 1);
      if (firstSerie === '0') {
        serie = serie?.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
  };
  onChangeInput = (input) => {
    let keyImput = _.keys(input)[0];
    this.setState({ [keyImput]: input[keyImput].replace(/[^0-9]/g, '') });
  };
  onChangeInputCle = (cle) => {
    this.setState({ cle: cle.replace(/[^A-Za-z]/g, '') });
  };
  addZeros = (input) => {
    let keyImput = _.keys(input)[0];
    if (input[keyImput] !== '') {
      this.setState({
        [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
      });
    }
  };

  isCleValide = () => {
    return this.state.showErrorMsg && this.state.cle !== this.state.cleValide;
  };

  hasErrors = (field) => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };
 
  retablir = () => {
    this.setState({ ...this.defaultState });
  };

  confirmer = () => {
    this.setState({ showErrorMsg: true });
    if (this.state.regime && this.state.serie) {
      this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

      if (this.state.cle === this.state.cleValide) {
        var referenceDed =
          this.state.bureau +
          this.state.regime +
          this.state.annee +
          this.state.serie;

        var data = {
          referenceVO: {
            bureau: this.state.bureau,
            regime: this.state.regime,
            annee: this.state.annee,
            serie: this.state.serie,
          },
          enregistree: true,
        };
        // successRedirection = "VuEmbListeDeclaration"
        // module = "DED_LIB"
        // commande = "ded.vuEmbRechercheDeclarationTrypByRef"
        // typeService = "UC"
        var action = RechApurmentAction.request(
          {
            type: Constants.RECHERCHE_D17_DUM_REQUEST,
            value: {
              login: this.state.login,
              commande: 'tryptique.initApurementTryptique',
              module: 'DED_LIB',
              typeService: 'UC',
              data: data,
              referenceDed: referenceDed,
              cle: this.state.cle,
            },
          },
          this.props.navigation,
          this.props.successRedirection,
        );
        this.props.actions.dispatch(action);
      }
    }
  };

 

  render() {
    console.log(this.state.errorMessage);
    return (
      <ScrollView>
      <View style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={'Apurer une déclaration'}
          subtitle={'Apurer une déclaration'}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        {/* {this.props.showProgress && <ComBadrCircleProgressBarComp size={30} />} */}
        {/* {this.state.erreur != null && ( */}
        <View style={styles.messages}>
          <ComBadrErrorMessageComp
            style={styles.centerErrorMsg}
            message={this.props.errorMessage}
          />
        </View>
        <View style={styles.containerInputsWithBorder}>
        <View style={styles.containerInputs}>
          <View>
            <TextInput
              error={this.hasErrors('bureau')}
              maxLength={3}
              keyboardType={'number-pad'}
              value={this.state.bureau}
              label={translate('transverse.bureau')}
                  onChangeText={(val) => this.onChangeInput({ bureau: val })}
              onEndEditing={(event) =>
                this.addZeros({
                  bureau: event.nativeEvent.text,
                  maxLength: 3,
                })
              }
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
             visible={this.hasErrors('bureau')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.bureau'),
              })}
            </HelperText>
          </View>

          <View>
            <TextInput
                  error={this.hasErrors('regime')}
              maxLength={3}
              keyboardType={'number-pad'}
              value={this.state.regime}
              label={translate('transverse.regime')}
                  onChangeText={(val) => this.onChangeInput({ regime: val })}
              onEndEditing={(event) =>
                this.addZeros({
                  regime: event.nativeEvent.text,
                  maxLength: 3,
                })
              }
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
                  visible={this.hasErrors('regime')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.regime'),
              })}
            </HelperText>
          </View>

          <View>
            <TextInput
                  error={this.hasErrors('annee')}
              maxLength={4}
              keyboardType={'number-pad'}
              value={this.state.annee}
              label={translate('transverse.annee')}
                  onChangeText={(val) => this.onChangeInput({ annee: val })}
              onEndEditing={(event) =>
                this.addZeros({
                  annee: event.nativeEvent.text,
                  maxLength: 4,
                })
              }
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
                  visible={this.hasErrors('annee')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.annee'),
              })}
            </HelperText>
          </View>

          <View>
            <TextInput
                  error={this.hasErrors('serie')}
              maxLength={7}
              keyboardType={'number-pad'}
              value={this.state.serie}
              label={translate('transverse.serie')}
                  onChangeText={(val) => this.onChangeInput({ serie: val })}
              onEndEditing={(event) =>
                this.addZeros({
                  serie: event.nativeEvent.text,
                  maxLength: 7,
                })
              }
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
                  visible={this.hasErrors('serie')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.serie'),
              })}
            </HelperText>
          </View>
          <View >
            <TextInput
                  error={this.isCleValide('cle')}
              maxLength={1}
              autoCapitalize={'characters'}
              value={this.state.cle}
              label={translate('transverse.cle')}
                  onChangeText={(val) => this.onChangeInputCle(val)}
              style={CustomStyleSheet.mediumInput}
            />
            <HelperText
              type="error"
              padding="none"
              style={styles.cleHelperMsg}
                  visible={this.isCleValide('cle')}>
              {translate('errors.cleNotValid', {
                cle: this.state.cleValide,
              })}
            </HelperText>
            </View>
            <View style={styles.containerBtn}>
              <ComBadrButtonIconComp
                onPress={this.confirmer}
                icon="check"
                compact={false}
                style={styles.btnConfirmer}
                loading={this.props.showProgress}
                text={translate('transverse.confirmer')}
              />

              <Button
                onPress={this.retablir}
                icon="autorenew"
                mode="contained"
                style={styles.btnRetablir}>
                {translate('transverse.retablir')}
              </Button>
            </View>
        </View>




          </View>
          </View>
      </ScrollView>
    );
  }
}

const styles = {
  messages: {},
  container: {
    paddingTop: 0,
    width: '100%',
    height: '100%'
  },
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
  },
  cleHelperMsg: { width: 150 },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  btnConfirmer: {
    color: accentColor,
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: accentColor,
    padding: 5,
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  decisionContainerRB: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#009ab2',
    padding: 0,
    margin: 0,
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignStart: {
    alignItems: 'flex-start',
    flex: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
    flex: 1,
  },
  BtnWidth: { width: 100 },
};

const mapStateToProps = (state) => ({ ...state.apurementInitReducer });
function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RechApurementParRefScreen);
