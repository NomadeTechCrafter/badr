import React, {Component} from 'react';
import {View} from 'react-native';
import {ComContainerComp} from '../../../../commons/component/index';

import {Button, HelperText, TextInput} from 'react-native-paper';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import * as Constants from '../state/ecorExpConfirmationEntreeConstants';
import * as RechecheDumAction from '../state/actions/ecorExpConfirmationEntreeRechercheAction';
import {MODULE_ECOREXP} from '../../../../commons/Config';
import ComUtils from '../../../../commons/utils/ComUtils';

class EcorExpRechercheParRefComp extends Component {
  defaultState = {
    bureau: '',
    regime: this.props.isBureauDisabled ? '001' : '',
    annee: '',
    serie: '',
    cle: '',
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
      type: Constants.INITCONFIRMATIONENTREE_INIT,
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
      this.props.commande === 'initConfirmerEntree'
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
        this.props.commande === 'initConfirmerEntree'
          ? Constants.INITCONFIRMATIONENTREE_REQUEST
          : Constants.INITCONFIRMATIONENTREE_ETATCHARGEMENT_REQUEST,
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
    console.log('confirmer EcorExpRechercheParRefComp 123');
    this.setState({showErrorMsg: true});
    if (this.state.regime && this.state.serie && this.state.annee) {
      let cleValide =
        this.props.commande === 'initConfirmerEntree'
          ? this.cleDUM(this.state.regime, this.state.serie)
          : ComUtils.cleDS(
              this.state.regime + this.state.serie + this.state.annee,
            );
      this.setState({cleValide: cleValide}, () => {
        if (this.state.cle === this.state.cleValide) {
          let referenceDed =
            this.state.bureau +
            this.state.regime +
            this.state.annee +
            this.state.serie;
          let dataAction = this.initActionData(referenceDed);
          let action =
            this.props.commande === 'initConfirmerEntree'
              ? RechecheDumAction.request(dataAction, this.props.navigation, 'Resultat')
              : RechecheDumAction.requestFindDumByEtatChargement(
                  dataAction,
                  this.props.navigation,
                );

          this.props.dispatch(action);
          console.log('dispatch fired !!');
        }
      });
      this.state.cleValide = cleValide;
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
                value={this.state.regime}
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
              {!this.props.isBureauDisabled && (
                <TextInput
                  keyboardType={'number-pad'}
                  value={this.state.numeroVoyage}
                  maxLength={1}
                  label={translate('transverse.nVoyage')}
                  onChangeText={(val) =>
                    this.onChangeInput({numeroVoyage: val})
                  }
                />
              )}
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
  ...state.ecorExpConfirmationEntreeReducer,
});

export default connect(mapStateToProps, null)(EcorExpRechercheParRefComp);
