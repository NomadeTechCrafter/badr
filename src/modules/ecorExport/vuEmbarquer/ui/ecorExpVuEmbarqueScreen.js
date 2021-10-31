import React from 'react';

import { View, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { translate } from '../../../../commons/i18n/ComI18nHelper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { accentColor, CustomStyleSheet, primaryColor } from '../../../../commons/styles/ComThemeStyle';
import * as Constants from '../state/ecorExpVuEmbarquerConstants';

import * as InitVuEmbtAction from '../state/actions/ecorExpVuEmbInitAction';

/** REDUX **/
import { connect } from 'react-redux';
import { load } from '../../../../commons/services/async-storage/ComStorageService';
import _ from 'lodash';
import { ComSessionService } from '../../../../commons/services/session/ComSessionService';

/**Custom Components */
import {
  ComBadrButtonIconComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComContainerComp,
} from '../../../../commons/component';
import { Button, HelperText, TextInput } from 'react-native-paper';

// const Tab = createMaterialTopTabNavigator();

// const MainStack = createStackNavigator();

const initialState = {
  reference: '',
  dialogVisibility: false,
  dialogMessage: '',
  apurAutoData: null,
  bureau: '',
  regime: '',
  annee: '',
  serie: '',
  cle: '',
  cleValide: '',
  login: '',
  showErrorMsg: false,
};

class VuEmbarqueScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }


  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    this.setState({ ...initialState });
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      let action = InitVuEmbtAction.init();
      this.props.actions.dispatch(action);
    });
    load('user').then((user) => {
      this.setState({ login: JSON.parse(user).login });
    });

    this.loadRefDumFormScanQrCode();
  }

  /*load Dum Reference from scan Qrcode*/
  loadRefDumFormScanQrCode = () => {
    if (this.props.routeParams && this.props.routeParams.refDeclaration) {
      const { refDeclaration } = this.props.routeParams;
      console.log('refDeclaration', refDeclaration);
      this.setState({
        bureau: refDeclaration.slice(0, 3),
        regime: refDeclaration.slice(3, 6),
        annee: refDeclaration.slice(6, 10),
        serie: refDeclaration.slice(10, 17),
      });
    }
  };

  //accept just Number
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


  retablir = () => {
    this.setState({
      bureau: '',
      regime: '',
      annee: '',
      serie: '',
      cle: '',
    });
  };

  confirmer = () => {
    this.setState({ showErrorMsg: true });
    if (this.state.regime && this.state.serie) {
      this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

      if (this.state.cle === this.state.cleValide) {
        var data = {
          bureau: this.state.bureau,
          regime: this.state.regime,
          annee: this.state.annee,
          serie: this.state.serie,
          cle: this.state.cle,
        };

        var action = InitVuEmbtAction.request(
          {
            type: Constants.RECHERCHE_D17_DUM_REQUEST,
            value: {
              login: ComSessionService.getInstance().getLogin(),
              commande: "initVuEmbarquer",
              module: "ECOREXP_LIB",
              typeService: "UC",
              data: data,
            },
          },
          this.props.navigation,
          'VuEmbListeDeclaration2',
        );
        this.props.actions.dispatch(action);
      }
    }
  };
  hasErrors = (field) => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };
  isCleValide = () => {
    return this.state.showErrorMsg && this.state.cle !== this.state.cleValide;
  };

  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    if (serie?.length > 6) {
      let firstSerie = serie.substring(0, 1);
      if (firstSerie === '0') {
        serie = serie.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
  };

  render() {
    return (
      <View style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('vuEmbarquee.title')}
          subtitle={translate('vuEmbarquee.subTitleAction')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}

        <ScrollView>
          {this.props?.errorMessage != null && this.props?.errorMessage !== '' && (
            <View style={styles.messages}>
              <ComBadrErrorMessageComp
                style={styles.centerErrorMsg}
                message={this.props?.errorMessage}
              />
            </View>
          )}
          {this.props?.messageInfo != null && (
            <View style={styles.messages}>
              <ComBadrInfoMessageComp
                style={styles.centerInfoMsg}
                message={this.props?.messageInfo}
              />
            </View>
          )}

          <ComContainerComp style={styles.container}>
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
              <View>
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
              <ComBadrButtonIconComp
                onPress={this.retablir}
                icon="autorenew"
                compact={false}
                style={styles.btnRetablir}
                loading={this.props.showProgress}
                text={translate('transverse.retablir')}
              />
              {/* <Button
                onPress={this.retablir}
                icon="autorenew"
                mode="contained"
                style={styles.btnRetablir}>
                {translate('transverse.retablir')}
              </Button> */}
            </View>
          </ComContainerComp>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: { width: '100%', height: '100%' },
  containerInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  flexRow: {
    flexDirection: 'row',
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnConfirmer: {
    color: accentColor,
    padding: 5,

    marginRight: 15
  },
  btnRetablir: {
    color: accentColor,
    padding: 5,
  },
};
const mapStateToProps = (state) => ({ ...state.ecorExportVuEmbInitReducer });

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(VuEmbarqueScreen);
