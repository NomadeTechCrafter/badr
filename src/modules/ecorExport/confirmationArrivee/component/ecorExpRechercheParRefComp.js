import React, {Component} from 'react';
import {View} from 'react-native';
import {
  ComContainerComp,
  ComBadrErrorMessageComp,
  ComBadrButtonIconComp,
  ComBadrLibelleComp,
} from '../../../../commons/component/index';

import {
  TextInput,
  Button,
  HelperText,
  Checkbox,
  TouchableRipple,
  Paragraph,
} from 'react-native-paper';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {
  accentColor,
  CustomStyleSheet,
  primaryColor,
} from '../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {load} from '../../../../commons/services/async-storage/ComStorageService';
import {connect} from 'react-redux';
import * as Constants from '../state/ecorExpConfirmationArriveeConstants';
import * as RechecheDumAction from '../state/actions/ecorExpConfirmationArriveeRechercheAction';
import {MODULE_ECOREXP, TYPE_SERVICE_UC} from '../../../../commons/Config';
class EcorExpRechercheParRefComp extends Component {
  defaultState = {
    bureau: '309',
    regime: '060',
    annee: '2021',
    serie: '0000010',
    cle: 'C',
    cleValide: '',
    login: '',
    numeroVoyage: '',
    showErrorMsg: false,
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidMount() {
    var action = RechecheDumAction.init({
      type: Constants.INITCONFIRMATIONARRIVEE_INIT,
      value: {},
    });
    this.props.dispatch(action);
    /*load('user').then((user) => {
      this.setState({login: JSON.parse(user).login});
    });*/
  }

  //accept just Number
  onChangeInput = (input) => {
    let keyImput = _.keys(input)[0];
    this.setState({[keyImput]: input[keyImput].replace(/[^0-9]/g, '')});
  };
  onChangeInputCle = (cle) => {
    this.setState({cle: cle.replace(/[^A-Za-z]/g, '')});
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
    console.log('retablir');
    this.setState({...this.defaultState});
  };
  initActionData = (referenceDed) => {
    let wsData =
      this.props.commande === 'initConfirmerArrivee'
        ? {
            bureau: this.state.bureau,
            regime: this.state.regime,
            annee: this.state.annee,
            serie: this.state.serie,
            cle: this.state.cle,
            referenceEnregistrement: '',
            dateEffectiveEnregistrement: '',
            numeroOrdreVoyage: this.state.numeroVoyage,
          }
        : {
            codeBureau: null,
            numero: '',
            referenceDum: referenceDed,
            typeSelecte: null,
            moyenTransport: '',
            modeTransport: null,
            idDed: null,
          };

    return {
      type:
        this.props.commande === 'initConfirmerArrivee'
          ? Constants.INITCONFIRMATIONARRIVEE_REQUEST
          : Constants.INITCONFIRMATIONARRIVEE_ETATCHARGEMENT_REQUEST,
      value: {
        login: this.state.login,
        commande: this.props.commande,
        module: MODULE_ECOREXP,
        typeService: this.props.typeService,
        data: wsData,
        referenceDed: referenceDed,
        cle: this.state.cle,
      },
    };
  };

  confirmer = () => {
    console.log('confirmer EcorExpRechercheParRefComp');
    this.setState({showErrorMsg: true});
    if (this.state.regime && this.state.serie) {
      this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

      if (this.state.cle === this.state.cleValide) {
        let regime =
          this.props.commande === 'findDumByEtatChargement'
            ? '001'
            : this.state.regime;
        let referenceDed =
          this.state.bureau + regime + this.state.annee + this.state.serie;
        let dataAction = this.initActionData(referenceDed);
        console.log('confirmer data Action ', dataAction);
        let action =
          this.props.commande === 'initConfirmerArrivee'
            ? RechecheDumAction.request(dataAction, this.props.navigation)
            : RechecheDumAction.requestFindDumByEtatChargement(
                dataAction,
                this.props.navigation,
              );

        this.props.dispatch(action);
        console.log('dispatch fired !!');
      }
    }
  };
  _hasErrors = (field) => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };
  isCleValide = () => {
    return this.state.showErrorMsg && this.state.cle !== this.state.cleValide;
  };

  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    if (serie.length > 6) {
      let firstSerie = serie.substring(0, 1);
      if (firstSerie == '0') {
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
      <ComContainerComp>
        <Grid>
          <Row>
            <Col>
              <TextInput
                error={this._hasErrors('bureau')}
                maxLength={3}
                keyboardType={'number-pad'}
                value={this.state.bureau}
                label={translate('transverse.bureau')}
                onChangeText={(val) => this.onChangeInput({bureau: val})}
                onEndEditing={(event) =>
                  this.addZeros({
                    bureau: event.nativeEvent.text,
                    maxLength: 3,
                  })
                }
              />
              <HelperText
                type="error"
                padding="none"
                visible={this._hasErrors('bureau')}>
                {translate('errors.donneeObligatoire', {
                  champ: translate('transverse.bureau'),
                })}
              </HelperText>
            </Col>
            <Col>
              <TextInput
                error={this._hasErrors('regime')}
                disabled={this.props.isBureauDisabled}
                maxLength={3}
                keyboardType={'number-pad'}
                value={this.props.isBureauDisabled ? '001' : this.state.regime}
                label={translate('transverse.regime')}
                onChangeText={(val) => this.onChangeInput({regime: val})}
                onEndEditing={(event) =>
                  this.addZeros({
                    regime: event.nativeEvent.text,
                    maxLength: 3,
                  })
                }
              />
              <HelperText
                type="error"
                padding="none"
                visible={this._hasErrors('regime')}>
                {translate('errors.donneeObligatoire', {
                  champ: translate('transverse.regime'),
                })}
              </HelperText>
            </Col>
            <Col>
              <TextInput
                error={this._hasErrors('annee')}
                maxLength={4}
                keyboardType={'number-pad'}
                value={this.state.annee}
                label={translate('transverse.annee')}
                onChangeText={(val) => this.onChangeInput({annee: val})}
                onEndEditing={(event) =>
                  this.addZeros({
                    annee: event.nativeEvent.text,
                    maxLength: 4,
                  })
                }
              />
              <HelperText
                type="error"
                padding="none"
                visible={this._hasErrors('annee')}>
                {translate('errors.donneeObligatoire', {
                  champ: translate('transverse.annee'),
                })}
              </HelperText>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                error={this._hasErrors('serie')}
                maxLength={7}
                keyboardType={'number-pad'}
                value={this.state.serie}
                label={translate('transverse.serie')}
                onChangeText={(val) => this.onChangeInput({serie: val})}
                onEndEditing={(event) =>
                  this.addZeros({
                    serie: event.nativeEvent.text,
                    maxLength: 7,
                  })
                }
              />
              <HelperText
                type="error"
                padding="none"
                visible={this._hasErrors('serie')}>
                {translate('errors.donneeObligatoire', {
                  champ: translate('transverse.serie'),
                })}
              </HelperText>
            </Col>
            <Col>
              <TextInput
                error={this.isCleValide('cle')}
                maxLength={1}
                autoCapitalize={'characters'}
                value={this.state.cle}
                label={translate('transverse.cle')}
                onChangeText={(val) => this.onChangeInputCle(val)}
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
            </Col>
            <Col>
              <TextInput
                keyboardType={'number-pad'}
                value={this.state.numeroVoyage}
                maxLength={1}
                label={translate('transverse.nVoyage')}
                onChangeText={(val) => this.onChangeInput({numeroVoyage: val})}
              />
            </Col>
          </Row>
        </Grid>

        <View style={styles.ComContainerCompBtn}>
          <Button
            onPress={this.confirmer}
            icon="check"
            compact="true"
            mode="contained"
            style={styles.btnConfirmer}
            loading={this.props.showProgress}>
            {translate('transverse.confirmer')}
          </Button>
          <Button
            onPress={this.retablir}
            icon="autorenew"
            mode="contained"
            style={styles.btnRetablir}>
            {translate('transverse.retablir')}
          </Button>
        </View>
      </ComContainerComp>
    );
  }
}

const styles = {
  ComContainerComp: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  ComContainerCompInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  cleHelperMsg: {width: 150},
  ComContainerCompBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnConfirmer: {
    color: '#FFF',
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: '#FFF',
    padding: 5,
  },
  ComContainerCompCheckbox: {
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
  BtnWidth: {width: 100},
  maxRedevanceInput: {height: 45},
};

const mapStateToProps = (state) => ({
  ...state.ecorExpConfirmationArriveeReducer,
});

export default connect(mapStateToProps, null)(EcorExpRechercheParRefComp);
