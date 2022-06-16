import React, { Component } from 'react';
import { View } from 'react-native';
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
import { translate } from '../../../i18n/ComI18nHelper';
import {
  accentColor,
  CustomStyleSheet,
  primaryColor,
} from '../../../styles/ComThemeStyle';
import _ from 'lodash';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { load } from '../../../services/async-storage/ComStorageService';
import { connect } from 'react-redux';
import * as Constants from '../../../../modules/liquidation/state/liquidationRechercheRefDumConstants';
import * as RechecheDumAction from '../../../../modules/liquidation/state/actions/liquidationRechercheRefDumAction';
import { callRedux, extractCommandData } from '../../../../modules/liquidation/utils/LiqUtils';

class ComLiquidationRechercheRefComp extends Component {
  defaultState = {
    bureau: '309',
    regime: '010',
    annee: '2022',
    serie: '0000106',
    cle: 'F',
    cleValide: '',
    login: '',
    numeroVoyage: '',
    showErrorMsg: false,
    sousReservePaiementMLV: false,
    infoLiquidation: {
      redevanceAT: false,
      refBureauLiquidation: '',
      nombreMaxRedevance: '',
    },
    liquidationManuelle: {
      maxRAT: '',
      numeroRAT: '',
      liquidationAT: false,
      liquidationOffice: false
    },
    indicateurLiquidationArticlesEnFranchiseTotale: false
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidMount() {
    var action = RechecheDumAction.init({
      type: Constants.RECHERCHEREFDUM_INIT,
      value: {},
    });
    this.props.dispatch(action);
    load('user').then((user) => {
      this.setState({ login: JSON.parse(user).login });
    });

    this.loadRefDumFormScanQrCode();
  }

  //load Dum Reference from scan Qrcode
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
    console.log('retablir');
    this.setState({ ...this.defaultState });
  };

  initWSData = (referenceDed) => {
    return {
      referenceObjetLiquidation: referenceDed,
      refBureauLiquidation: this.state.bureau,
      // nombreMaxRedevancesAT: this.state.infoLiquidation.nombreMaxRedevance,
    };
  };

  callLiquidationRedux = (props, data, successRedirection) => {
    if (props.dispatch) {
      console.log('calling redux dispatch ...');
      var action = RechecheDumAction.request(
        {
          type: Constants.RECHERCHEREFDUM_REQUEST,
          value: data,
        },
        props.navigation,
        successRedirection,
      );

      this.props.dispatch(action);
      console.log('dispatch fired !!');
    }
  };

  initLiquidationData = async (commande, data) => {
    let type;

    if (this.state.infoLiquidation.redevanceAT) {
      type = "automatiqueRedevanceAT";
    } else if (this.state.liquidationManuelle.liquidationAT) {
      type = "manuelleRedevanceAT";
    } else if (this.state.liquidationManuelle.liquidationOffice) {
      type = "manuelleOffice";
    } else {
      type = this.props.type;
    }



    this.callLiquidationRedux(
      this.props,
      {
        commande: commande,
        module: this.props.module,
        typeService: this.props.typeService,
        data: data,
        liquidationType: type,
        indicateurLiquidationArticlesEnFranchiseTotale: this.state.indicateurLiquidationArticlesEnFranchiseTotale
      },
      this.props.successRedirection
    );
  }

  liquiderAutomatiquement = () => {
    if (!this.state.infoLiquidation.redevanceAT) {
      commande = "initLiquiderAutomatiquement";
    } else {
      commande = "initLiquiderAutomatiquementPremiereAT";
      data.nombreMaxRedevancesAT = this.state.infoLiquidation.nombreMaxRedevance;
    }
  };

  liquiderAutomatiquementMAC = () => {
    commande = "initLiquiderAutomatiquementDUMMAC";
  };

  confirmer = () => {
    console.log('confirmer', this.props.successRedirection);
    this.setState({ showErrorMsg: true });
    if (this.state.regime && this.state.serie) {
      this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

      if (this.state.cle === this.state.cleValide) {
        var referenceDed =
          this.state.bureau +
          this.state.regime +
          this.state.annee +
          this.state.serie;
        var data = this.initWSData(referenceDed);

        let commande;
        if (this.props.type == 'automatique') {
          let typeMac = "02";
          let isRegimeMac = true;

          if (isRegimeMac) {
            if (!_.isEmpty(typeMac) && typeMac === '02') {
              this.liquiderAutomatiquement()
            } else {
              this.liquiderAutomatiquementMAC()
            }
          } else {
            this.liquiderAutomatiquement()
          }
        } else if (this.props.type == 'manuelle') {
          data.typeDeclaration = "AutresLiquidationRED";
          if (this.state.liquidationManuelle.liquidationAT) {
            commande = "initLiquiderManuellementAT";
          } else if (this.state.liquidationManuelle.liquidationOffice) {
            commande = "initLiquiderManuellementOffice";
            data.typeDeclaration = "AutresLiquidationRED";
          } else if (this.state.indicateurLiquidationArticlesEnFranchiseTotale) {
            commande = "initLiquiderManuellementDUM";
            data.indicateurFranchise = this.state.indicateurLiquidationArticlesEnFranchiseTotale + ""
          } else {
            commande = "initLiquiderManuellementDUM";
          }
        }
        this.initLiquidationData(commande, data);
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
    /*while (serie.length < 6) {
        serie = '0' + serie;
      }*/
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
      <ComContainerComp style={styles.ComContainerComp}>
        {this.props.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.props.errorMessage} />
        )}
        <View style={styles.ComContainerCompInputs}>
          <View>
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
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
              visible={this._hasErrors('bureau')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.bureau'),
              })}
            </HelperText>
          </View>

          <View>
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
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
              visible={this._hasErrors('regime')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.regime'),
              })}
            </HelperText>
          </View>

          <View>
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
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
              visible={this._hasErrors('annee')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.annee'),
              })}
            </HelperText>
          </View>

          <View>
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
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
              visible={this._hasErrors('serie')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.serie'),
              })}
            </HelperText>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-end', flex: 1 }}>
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
          <View style={{ alignItems: 'flex-start', flex: 1 }}>
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
        {/* MainLevee */}
        {this.props.module === 'MLV_LIB' && (
          <View style={{ flexDirection: 'row' }}>
            <TouchableRipple
              onPress={() => {
                this.setState({
                  sousReservePaiementMLV: !this.state.sousReservePaiementMLV,
                });
              }}>
              <View style={styles.ComContainerCompCheckbox}>
                <View pointerEvents="none">
                  <Checkbox
                    color={primaryColor}
                    status={
                      this.state.sousReservePaiementMLV
                        ? 'checked'
                        : 'unchecked'
                    }
                  />
                </View>
                <Paragraph>
                  {translate('mainlevee.sousReservePaiement')}
                </Paragraph>
              </View>
            </TouchableRipple>
            <Button
              style={{ width: 100 }}
              icon="plus-box-outline"
              mode="text"
              compact={true}
              onPress={() =>
                this.props.navigation.navigate('ListDeclarationMLV')
              }>
              Option
            </Button>
          </View>
        )}

        {/* Liquidation */}
        {this.props.module === 'ALI_DEC' && (
          <Grid style={CustomStyleSheet.largeInput}>
            {this.props.type == 'automatique' ?
              <Row>
                <TouchableRipple
                  onPress={() => {
                    this.setState({
                      infoLiquidation: {
                        ...this.state.infoLiquidation,
                        redevanceAT: !this.state.infoLiquidation.redevanceAT,
                      }
                    });
                  }}>
                  <View style={styles.ComContainerCompCheckbox}>
                    <View pointerEvents="none">
                      <Checkbox
                        color={primaryColor}
                        status={
                          this.state.infoLiquidation.redevanceAT
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </View>
                    <Paragraph>
                      {translate(
                        'liq.rechercheLiquidation.liquidationRedevanceAT',
                      )}
                    </Paragraph>
                  </View>
                </TouchableRipple>
              </Row>
              :
              <Row >
                <TouchableRipple
                  onPress={() => {
                    this.setState({
                      indicateurLiquidationArticlesEnFranchiseTotale: !this.state.indicateurLiquidationArticlesEnFranchiseTotale,
                    });
                  }}>
                  <View style={styles.ComContainerCompCheckbox}>
                    <View pointerEvents="none">
                      <Checkbox
                        color={primaryColor}
                        status={
                          this.state.indicateurLiquidationArticlesEnFranchiseTotale
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    </View>
                    <Paragraph>
                      {translate(
                        'liq.articleFranchiseTotale',
                      )}
                    </Paragraph>
                  </View>
                </TouchableRipple>
              </Row>
            }
            {this.props.type == 'automatique' &&
              <Row>
                <Col size={1}>
                  <ComBadrLibelleComp >
                    {translate('liq.rechercheLiquidation.nombreMaxRedevance')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <TextInput
                    style={styles.maxRedevanceInput}
                    value={this.state.infoLiquidation.nombreMaxRedevance}
                    onChangeText={(text) =>
                      this.setState({
                        infoLiquidation: {
                          ...this.state.infoLiquidation,
                          nombreMaxRedevance: text,
                        }
                      })
                    }
                  />
                </Col>
              </Row>
            }
          </Grid>
        )}

        {/* Manuelle Liqudation*/}
        {this.props.type == 'manuelle' &&
          <Grid style={CustomStyleSheet.largeInput}>
            <Row >
              <TouchableRipple
                onPress={() => {
                  this.setState({
                    liquidationManuelle: {
                      ...this.state.liquidationManuelle,
                      liquidationOffice: !this.state.liquidationManuelle.liquidationOffice,
                    }
                  });
                }}>
                <View style={styles.ComContainerCompCheckbox}>
                  <View pointerEvents="none">
                    <Checkbox
                      color={primaryColor}
                      status={
                        this.state.liquidationManuelle.liquidationOffice
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </View>
                  <Paragraph>
                    {translate('liq.liquidationOffice')}
                  </Paragraph>
                </View>
              </TouchableRipple>
            </Row>
            <Row >
              <TouchableRipple
                onPress={() => {
                  this.setState({
                    liquidationManuelle: {
                      ...this.state.liquidationManuelle,
                      liquidationAT: !this.state.liquidationManuelle.liquidationAT,
                    }
                  });
                }}>
                <View style={styles.ComContainerCompCheckbox}>
                  <View pointerEvents="none">
                    <Checkbox
                      color={primaryColor}
                      status={
                        this.state.liquidationManuelle.liquidationAT
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                  </View>
                  <Paragraph>
                    {translate('liq.liquidationAT')}
                  </Paragraph>
                </View>
              </TouchableRipple>
            </Row>
            <Row >
              <Col size={1}>
                <Row>
                  <Col
                    size={1}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ComBadrLibelleComp withColor={true} >
                      {translate('liq.numeroRAT')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <TextInput
                      style={styles.maxRedevanceInput}
                      value={this.state.liquidationManuelle.numeroRAT}
                      editable={this.state.liquidationManuelle.liquidationAT}
                      onChangeText={(text) =>
                        this.setState({
                          liquidationManuelle: {
                            ...this.state.liquidationManuelle,
                            numeroRAT: text,
                          }
                        })
                      }
                    />
                  </Col>
                </Row>
              </Col>
              <Col size={1}>
                <Row>
                  <Col size={1}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ComBadrLibelleComp withColor={true} >
                      {translate('liq.maxRAT')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <TextInput
                      style={styles.maxRedevanceInput}
                      value={this.state.liquidationManuelle.maxRAT}
                      editable={this.state.liquidationManuelle.liquidationAT}
                      onChangeText={(text) =>
                        this.setState({
                          liquidationManuelle: {
                            ...this.state.liquidationManuelle,
                            maxRAT: text,
                          }
                        })
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        }
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
    paddingBottom: 100,
  },
  ComContainerCompInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
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
  BtnWidth: { width: 100 },
  maxRedevanceInput: { height: 45 },
};

const mapStateToProps = (state) => ({
  ...state.liquidationRechercheRefDumReducer,
});

export default connect(mapStateToProps, null)(ComLiquidationRechercheRefComp);
