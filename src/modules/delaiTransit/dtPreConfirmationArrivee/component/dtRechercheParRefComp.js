import React, { Component } from 'react';
import { View } from 'react-native';
import {
  ComContainerComp
} from '../../../../commons/component/index';

import {
  TextInput,
  Button,
  HelperText,
} from 'react-native-paper';

/**i18n */
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import * as Constants from '../state/dtPreConfirmationArriveeConstants';
import * as InitPreConfirmationArriveeAction from '../state/actions/dtInitPreConfirmationArriveeAction';
import { MODULE_ECOREXP, TYPE_SERVICE_UC } from '../../../../commons/Config';

class DTRechercheParRefComp extends Component {
  defaultState = {
    bureau: '309',
    regime: '855',
    annee: '2022',
    serie: '0000001',
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
    var action = InitPreConfirmationArriveeAction.init({
      type: Constants.INIT_PRE_CONFIRMATION_ARRIVEE_INIT,
      value: {},
    });
    this.props.dispatch(action);
  }

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
    this.setState({ ...this.defaultState });
  };

  confirmer = () => {
    this.setState({ showErrorMsg: true });
    if (this.state.regime && this.state.serie) {
      this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

      if (this.state.cle === this.state.cleValide) {
        let reference = this.state.bureau + this.state.regime + this.state.annee + this.state.serie;
        let dataAction = {
          type: Constants.INIT_PRE_CONFIRMATION_ARRIVEE_REQUEST,
          value: {
            login: this.state.login,
            commande: this.props.commande,
            module: MODULE_ECOREXP,
            typeService: TYPE_SERVICE_UC,
            data: {
              "referenceDUM": reference
            },
          },
        };
        let action = InitPreConfirmationArriveeAction.request(dataAction);

        this.props.dispatch(action);
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
                onChangeText={(val) => this.onChangeInput({ bureau: val })}
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
                onChangeText={(val) => this.onChangeInput({ annee: val })}
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
                onChangeText={(val) => this.onChangeInput({ serie: val })}
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
          </Row>
        </Grid>

        {!this.props.initSucces && (
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
        )}
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
  cleHelperMsg: { width: 150 },
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
};

const mapStateToProps = (state) => ({
  ...state.preConfirmationArriveeReducer,
});


export default connect(mapStateToProps, null)(DTRechercheParRefComp);
