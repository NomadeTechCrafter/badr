/** RN Components **/
import React, { Component } from 'react';
import { View } from 'react-native';
import {
  ComBadrButtonIconComp,
  ComBadrErrorMessageComp,
  ComBadrToolbarComp,
  ComContainerComp,
} from '../../../../commons/component/index';
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import { Button, Checkbox, HelperText, TextInput } from 'react-native-paper';
import {
  accentColor,
  CustomStyleSheet,
  primaryColor,
} from '../../../styles/ComThemeStyle';
import _ from 'lodash';
/**i18n */
import { translate } from '../../../i18n/ComI18nHelper';
/** REDUX **/
import { connect } from 'react-redux';
import {
  GENERIC_INIT,
  GENERIC_REQUEST,
} from '../../../../old/common/constants/generic';

import * as ConsulterDumAction from '../../../state/actions/ConsulterDumAction';

class ComRedressementRechercheRefComp extends Component {
  defaultState = {
    bureau: '',
    regime: '',
    annee: '',
    serie: '',
    cle: '',
    cleValide: '',
    login: '',
    numeroVoyage: '',
    showErrorMsg: false,
    sousReservePaiementMLV: false,
    enregistree: true,
    command: 'ded.ConsulterDum'
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {

      this.switchToChooseCommand();

      var action = ConsulterDumAction.init({
        type: GENERIC_INIT,
        value: {},
      });
      this.props.dispatch(action);
      this.loadRefDumFormScanQrCode();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  /*load Dum Reference from scan Qrcode*/
  loadRefDumFormScanQrCode = () => {
    if (this.props.routeParams && this.props.routeParams.refDeclaration) {
      const { refDeclaration } = this.props.routeParams;
      this.setState({
        bureau: refDeclaration.slice(0, 3),
        regime: refDeclaration.slice(3, 6),
        annee: refDeclaration.slice(6, 10),
        serie: refDeclaration.slice(10, 17),
      });
    }
  };

  switchToChooseCommand = () => {
    switch (this.props?.fromWhere) {
      case 'ENVOYER_VALEUR':
        return this.setState({
          command: 'ded.InitEnvoyerValeur',
          enregistree: true,
        });
      case 'TRAITER_VALEUR':
        return this.setState({
          command: 'ded.InitTraiterValeur',
          enregistree: true,
        });

      default:
        this.setState({
          command: 'ded.ConsulterDum',
          enregistree: false,
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
      ...this.defaultState
    });
    var action = ConsulterDumAction.init({
      type: GENERIC_INIT,
      value: {},
    });
    this.props.dispatch(action);
    this.switchToChooseCommand();
    console.log('========================================> ' + this.props?.fromWhere)
  };

  confirm = () => {
    this.setState({ showErrorMsg: true });
    if (this.state.regime && this.state.serie) {
      this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

      if (this.state.cle === this.state.cleValide) {
        let referenceDed =
          this.state.bureau +
          this.state.regime +
          this.state.annee +
          this.state.serie;
        let action = ConsulterDumAction.request(
          {
            type: GENERIC_REQUEST,
            value: {
              jsonVO: {
                reference: referenceDed,
                enregistre: this.state.enregistree,
                identifiantOperateur: ComSessionService.getInstance().getOperateur()
              },
              cle: this.state.cle,
            },
            command: this.state?.command
          },
          this.props.navigation,
        );
        this.props.dispatch(action);
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
    if (serie.length > 6) {
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
      <ComContainerComp style={styles.container}>
        {this.props.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.props.errorMessage} />
        )}
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
        </View>

        <View style={styles.flexRow}>
          <View style={styles.alignEnd}>
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
          <View style={styles.alignStart}>
            <TextInput
              keyboardType={'number-pad'}
              value={this.state.numeroVoyage}
              maxLength={1}
              label={translate('transverse.nVoyage')}
              onChangeText={(val) => this.onChangeInput({ numeroVoyage: val })}
              style={CustomStyleSheet.mediumInput}
            />
          </View>
        </View>

        <View style={styles.containerBtn}>
          <ComBadrButtonIconComp
            onPress={this.confirm}
            icon="check"
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

        <View style={styles.enregistreeStyle}>
          <Checkbox.Item
            status={this.state.enregistree ? 'checked' : 'unchecked'}
            // disabled={this.props.fromWhere1 === 'ENVOYER_VALEUR' || this.props.fromWhere1 === 'TRAITER_VALEUR'}
            label={translate('dedouanement.transverse.declarationEnreg')}
            color={primaryColor}
            onPress={() => {
              if (this.props.onEnregistree) {
                this.props.onEnregistree(!this.state.enregistree);
              }
              this.setState({ enregistree: !this.state.enregistree });
            }}
          />
        </View>
      </ComContainerComp>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInputs: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cleHelperMsg: { width: 150 },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  enregistreeStyle: { padding: 20 },
};

const mapStateToProps = (state) => ({ ...state.consulterDumReducer });

export default connect(mapStateToProps, null)(ComRedressementRechercheRefComp);
