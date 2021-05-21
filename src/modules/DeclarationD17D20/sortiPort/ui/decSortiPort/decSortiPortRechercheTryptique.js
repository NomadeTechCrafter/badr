/** RN Components **/
import React, { Component } from 'react';
import { View } from 'react-native';
/** REDUX **/
import { connect } from 'react-redux';
import _ from 'lodash';

import { Button, HelperText, TextInput } from 'react-native-paper';

import {
  ComBadrButtonIconComp,
  ComBadrErrorMessageComp,
  ComContainerComp,
} from '../../../../../commons/component/index';

import {
  CustomStyleSheet,
  accentColor,
} from '../../../../../commons/styles/ComThemeStyle';

/** Storage **/
import { load } from '../../../../../commons/services/async-storage/ComStorageService';

/**i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import * as Constants from '../../state/decSortiPortConstants';
import * as SortiPortInitAction from '../../state/actions/decSortiPortInitAction';

class SortiPortRechercheTryptique extends Component {
  defaultState = {
    bureau: '',
    regime: '',
    annee: '',
    serie: '',
    cle: '',
    cleValide: '',
    login: '',
    showErrorMsg: false,
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidMount() {
    var action = SortiPortInitAction.init();
    this.props.actions.dispatch(action);
    // var action1 = SortiPortScanAction.init();
    // this.props.actions.dispatch(action1);

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

        var action = SortiPortInitAction.request(
          {
            type: Constants.RECHERCHE_D17_DUM_REQUEST,
            value: {
              login: this.state.login,
              commande: this.props.commande,
              module: this.props.module,
              typeService: this.props.typeService,
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  containerInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  cleHelperMsg: { width: 150 },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
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
};

const mapStateToProps = (state) => ({ ...state.sortiPortInitReducer });
function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SortiPortRechercheTryptique);
