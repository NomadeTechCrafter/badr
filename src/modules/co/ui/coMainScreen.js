import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
/**Custom Components */
import {
  ComAccordionComp,
  ComBadrButtonIconComp,
  ComBadrCardBoxComp,
  ComBadrCardWithTileComp,
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp,
  ComBadrItemsPickerComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
  ComContainerComp,
  RechercheRefDum,
} from '../../../commons/component';
import translate from '../../../commons/i18n/ComI18nHelper';
import style from '../style/coStyle';
import {CO_CONSULTATION_REQUEST, criteresRecherche} from '../state/coConstants';
import {ComSessionService} from '../../../commons/services/session/ComSessionService';
import {HelperText, TextInput} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import moment from 'moment/moment';
import * as ConsulterDumAction from '../../../commons/state/actions/ConsulterDumAction';
import {GENERIC_REQUEST} from '../../../commons/constants/generic/ComGenericConstants';
import * as COAction from '../state/actions/coAction';
import _ from 'lodash';
import {CustomStyleSheet} from '../../../commons/styles/ComThemeStyle';

const initialState = {
  login: ComSessionService.getInstance().getLogin(),
  dateDebut: '15/01/2021',
  dateFin: '30/01/2021',
  numeroSerie: '',
  anneeRef: '2022',
  reference: '0000019',
  idDED: '',
  referenceDUM: '',
  bureau: '',
  regime: '',
  annee: '',
  serie: '',
  cle: '',
  cleValide: '',
  traite: false,
  errorMessage: '',
  critereRecherche: '',
  blocNumeroSerie: false,
  blocReference: false,
  blocReferenceDUM: false,
  blocDates: false,
  pays: 'MA',
};

class COMainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleClear();
    this.state = initialState;
    this.coCols = [
      {
        code: 'numeroSerieConfinement',
        libelle: translate('co.numeroSerieConfinement'),
        component: 'basic-button',
        attrCondition: 'numeroSerieConfinement',
        action: (row, index) => this.redirectToConsultationCO(row, index),
        width: 340,
      },
      {
        code: 'reference',
        libelle: translate('co.reference'),
        component: 'basic-button',
        attrCondition: 'reference',
        action: (row, index) => this.redirectToConsultationCO(row, index),
        width: 250,
      },
      {
        code: 'referenceDUM',
        libelle: translate('co.referenceDUM'),
        attrCondition: 'referenceDUM',
        component: 'basic-button',
        action: (row, index) => this.redirectToConsultationDUM(row, index),
        width: 250,
      },
      {
        code: 'versionDUM',
        libelle: translate('co.versionDUM'),
        width: 150,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('co.dateEnregistrement'),
        width: 250,
      },
      {
        code: 'reference',
        libelle: translate('co.action'),
        component: 'basic-button',
        attrCondition: 'reference',
        text: 'Traiter',
        action: (row, index) => this.redirectToTraiter(row, index),
        width: 150,
      },
    ];
    this.coColsAnnuler = [
      {
        code: 'numeroSerieConfinement',
        libelle: translate('co.numeroSerieConfinement'),
        component: 'basic-button',
        attrCondition: 'numeroSerieConfinement',
        action: (row, index) => this.redirectToConsultationCO(row, index),
        width: 340,
      },
      {
        code: 'reference',
        libelle: translate('co.reference'),
        component: 'basic-button',
        attrCondition: 'reference',
        action: (row, index) => this.redirectToConsultationCO(row, index),
        width: 250,
      },
      {
        code: 'referenceDUM',
        libelle: translate('co.referenceDUM'),
        attrCondition: 'referenceDUM',
        component: 'basic-button',
        action: (row, index) => this.redirectToConsultationDUM(row, index),
        width: 250,
      },
      {
        code: 'versionDUM',
        libelle: translate('co.versionDUM'),
        width: 150,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('co.dateEnregistrement'),
        width: 250,
      },
      {
        code: 'reference',
        libelle: translate('co.action'),
        component: 'basic-button',
        attrCondition: 'reference',
        text: 'Annuler',
        action: (row, index) => this.redirectToAnnuler(row, index),
        width: 150,
      },
    ];

    this.coColsWithoutAction = [
      {
        code: 'numeroSerieConfinement',
        libelle: translate('co.numeroSerieConfinement'),
        component: 'basic-button',
        attrCondition: 'numeroSerieConfinement',
        action: (row, index) => this.redirectToConsultationCO(row, index),
        width: 340,
      },
      {
        code: 'reference',
        libelle: translate('co.reference'),
        component: 'basic-button',
        attrCondition: 'reference',
        action: (row, index) => this.redirectToConsultationCO(row, index),
        width: 250,
      },
      {
        code: 'referenceDUM',
        libelle: translate('co.referenceDUM'),
        attrCondition: 'referenceDUM',
        component: 'basic-button',
        action: (row, index) => this.redirectToConsultationDUM(row, index),
        width: 250,
      },
      {
        code: 'versionDUM',
        libelle: translate('co.versionDUM'),
        width: 150,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('co.dateEnregistrement'),
        width: 250,
      },
    ];
  }

  componentDidUpdate() {
    if (this.state.selectedMenu !== this.props?.route?.params?.ecran) {
      this.handleClear();
      this.setState({
        selectedMenu: this.props?.route?.params?.ecran,
      });
    }
  }

  checkRequiredFields = () => {
    let msg = [];
    let required = false;
    let validation = false;
    switch (this.state.critereRecherche) {
      case 'numeroSerie':
        msg = [];
        if (_.isEmpty(this.state.numeroSerie)) {
          required = true;
          msg.push(translate('co.filtreRecherche.numeroSerie'));
        }
        break;
      case 'reference':
        msg = [];
        if (_.isEmpty(this.state.reference)) {
          required = true;
          msg.push(translate('co.filtreRecherche.reference'));
        }
        break;
      case 'referenceDUM':
        msg = [];
        if (_.isEmpty(this.state.bureau)) {
          required = true;
          msg.push(translate('co.filtreRecherche.bureau'));
        }
        if (_.isEmpty(this.state.regime)) {
          required = true;
          msg.push(translate('co.filtreRecherche.regime'));
        }
        if (_.isEmpty(this.state.annee)) {
          required = true;
          msg.push(translate('co.filtreRecherche.annee'));
        }
        if (_.isEmpty(this.state.serie)) {
          required = true;
          msg.push(translate('co.filtreRecherche.serie'));
        }
        if (_.isEmpty(this.state.cle)) {
          required = true;
          msg.push(translate('co.filtreRecherche.cle'));

          this.state.cleValide = this.cleDUM(
            this.state.regime,
            this.state.serie,
          );
        } else {
          this.state.cleValide = this.cleDUM(
            this.state.regime,
            this.state.serie,
          );
          if (this.state.cle !== this.state.cleValide) {
            required = true;
            msg.push(
              translate('co.filtreRecherche.cleValide') +
                '(' +
                this.state.cleValide +
                ')',
            );
          }
        }
        break;
      case 'dates':
        msg = [];
        if (_.isEmpty(this.state.dateDebut)) {
          required = true;
          msg.push(translate('co.filtreRecherche.dateDebut'));
        }
        if (_.isEmpty(this.state.dateFin)) {
          required = true;
          msg.push(translate('co.filtreRecherche.dateFin'));
        }

        let start = new Date(moment(this.state.dateDebut, 'DD/MM/YYYY', true));
        let end = new Date(moment(this.state.dateFin, 'DD/MM/YYYY', true));
        const diffTime = Math.abs(end - start);
        const absolutDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (absolutDiff < 0) {
          required = true;
          validation = true;
          msg.push(translate('co.filtreRecherche.periodeInvalide'));
        }
        if (diffDays > 15) {
          required = true;
          validation = true;
          msg.push(translate('co.filtreRecherche.periode'));
        }
        break;

      default:
        break;
    }

    if (required) {
      let message =
        translate('actifsCreation.avionsPrivees.champsObligatoires') + msg;
      if (validation) {
        message = msg;
      }
      this.setState({
        errorMessage: message,
      });
    } else {
      this.setState({
        errorMessage: null,
      });
    }
    return required;
  };

  confirmer = () => {
    let myVO = {};
    if (this.state.critereRecherche) {
      this.setState({
        errorMessage: '',
      });
      const validation = this.checkRequiredFields();

      switch (this.state.critereRecherche) {
        case 'numeroSerie':
          myVO.numeroSerie = this.state.numeroSerie;
          break;
        case 'reference':
          myVO.reference =
            this.state.anneeRef + this.state.pays + this.state.reference;
          break;
        case 'referenceDUM':
          myVO.idDED = this.state.idDED;
          break;
        case 'dates':
          myVO.dateDebut = this.state.dateDebut;
          myVO.dateFin = this.state.dateFin;
          break;

        default:
          break;
      }

      switch (this.props?.route?.params?.ecran) {
        case 'TRAITER':
          myVO.traiter = true;
          break;
        case 'CONSULTER':
          break;
        case 'ANNULER':
          break;
        case 'Traiter Duplicata':
          break;

        default:
          break;
      }
      if (validation === false) {
        let action = COAction.request(
          {
            type: CO_CONSULTATION_REQUEST,
            value: myVO,
            command: 'findListCoMultiRecherche',
          },
          this.props.navigation,
          null,
        );
        this.props.actions.dispatch(action);
      }
    } else {
      this.setState({
        errorMessage:
          'Erreur : E00596 Critère de recherche : Valeur obligatoire.',
      });
    }
  };

  handleClear = () => {
    this.setState(initialState);
    let action = COAction.init(
      {
        type: CO_CONSULTATION_REQUEST,
        value: {},
        command: 'findListCoMultiRecherche',
      },
      null,
      null,
    );
    this.props.actions.dispatch(action);
  };

  onCritereRecherchePickerChanged = (v, i) => {
    this.setState({
      critereRecherche: v?.code,
      errorMessage: '',
    });
    switch (v?.code) {
      case 'numeroSerie':
        this.setState({
          blocNumeroSerie: true,
          blocReference: false,
          blocReferenceDUM: false,
          blocDates: false,
        });
        break;
      case 'reference':
        this.setState({
          blocNumeroSerie: false,
          blocReference: true,
          blocReferenceDUM: false,
          blocDates: false,
        });
        break;
      case 'referenceDUM':
        this.setState({
          blocNumeroSerie: false,
          blocReference: false,
          blocReferenceDUM: true,
          blocDates: false,
        });
        break;
      case 'dates':
        this.setState({
          blocNumeroSerie: false,
          blocReference: false,
          blocReferenceDUM: false,
          blocDates: true,
        });
        break;

      default:
        break;
    }
  };

  redirectToConsultationCO(row, index) {
    let action = COAction.request(
      {
        type: CO_CONSULTATION_REQUEST,
        value: {
          reference: row?.reference,
          coFromWhichScreen: this.props?.route?.params?.ecran,
        },
        command: 'recupererCertificatOrigineByRef',
      },
      this.props.navigation,
      'COConsultationDetail',
    );
    this.props.actions.dispatch(action);
  }

  redirectToTraiter = (row, index) => {
    let action = COAction.request(
      {
        type: CO_CONSULTATION_REQUEST,
        value: {
          reference: row?.reference,
          identifiant: row?.identifiant,
          coFromWhichScreen: this.props?.route?.params?.ecran,
        },
        command: 'recupererCertificatOrigineByRef',
      },
      this.props.navigation,
      'COConsultationDetail',
    );
    this.props.actions.dispatch(action);
  };

  redirectToAnnuler = (row, index) => {
    this.redirectToTraiter(row, index);
  };

  redirectToConsultationDUM(row, index) {
    let action = ConsulterDumAction.request(
      {
        type: GENERIC_REQUEST,
        value: {
          jsonVO: {
            reference: row?.referenceDum,
            enregistre: true,
            identifiantOperateur: ComSessionService.getInstance().getOperateur(),
          },
        },
        command: 'ded.ConsulterDum',
        fromCO: true,
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  }

  onChangeInputCle = (cle) => {
    this.setState({cle: cle.replace(/[^A-Za-z]/g, '')});
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

  addZeros = (input) => {
    let keyImput = _.keys(input)[0];
    if (input[keyImput] !== '') {
      this.setState({
        [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
      });
    }
  };

  render() {
    const titre = "Nombre d'éléments: " + this.props?.data?.length;
    return (
      <View style={style.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={
            this.props?.route?.params?.ecran + translate('co.titleConsultation')
          }
          subtitle={translate('co.subTitleTraiter')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
        <View>
          {this.state?.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.state?.errorMessage} />
          )}
        </View>
        <ComBadrCardBoxComp style={style.cardBox}>
          <ComBadrCardWithTileComp
            title={translate('co.filtreRecherche.critereTitle')}>
            <ScrollView>
              <View>
                <ComBadrItemsPickerComp
                  label={translate('co.filtreRecherche.selectionnerCritere')}
                  selectedValue={this.state.critereRecherche}
                  items={criteresRecherche}
                  onValueChanged={(v, i) =>
                    this.onCritereRecherchePickerChanged(v, i)
                  }
                  style={style.picker}
                />
                <Grid>
                  <Row style={style.row} />
                  {this.state.blocNumeroSerie && (
                    <Row>
                      <Col size={1} />
                      <Col size={8}>
                        <TextInput
                          mode="outlined"
                          label={translate('co.filtreRecherche.numeroSerie')}
                          value={this.state.numeroSerie}
                          onChangeText={(text) =>
                            this.setState({numeroSerie: text})
                          }
                        />
                      </Col>
                      <Col size={1} />
                    </Row>
                  )}

                  {this.state.blocReference && (
                    <Row>
                      <Col size={8}>
                        <TextInput
                          mode="outlined"
                          keyboardType="numeric"
                          label={translate('co.filtreRecherche.annee')}
                          value={this.state.anneeRef}
                          onChangeText={(text) =>
                            this.setState({anneeRef: text})
                          }
                        />
                      </Col>
                      <Col size={1} />
                      <Col size={3}>
                        <TextInput
                          disabled
                          mode="outlined"
                          value={this.state.pays}
                        />
                      </Col>
                      <Col size={1} />
                      <Col size={16}>
                        <TextInput
                          mode="outlined"
                          keyboardType="numeric"
                          label={translate('co.filtreRecherche.reference')}
                          value={this.state.reference}
                          onChangeText={(text) =>
                            this.setState({reference: text})
                          }
                          onEndEditing={(event) =>
                            this.addZeros({
                              reference: event.nativeEvent.text,
                              maxLength: 7,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  )}
                  {this.state.blocReferenceDUM && (
                    <Row>
                      <ComContainerComp style={style.container}>
                        <View style={style.containerInputs}>
                          <View>
                            <TextInput
                              maxLength={3}
                              keyboardType={'number-pad'}
                              value={this.state.bureau}
                              label={translate('transverse.bureau')}
                              onChangeText={(val) =>
                                this.onChangeInput({bureau: val})
                              }
                              onEndEditing={(event) =>
                                this.addZeros({
                                  bureau: event.nativeEvent.text,
                                  maxLength: 3,
                                })
                              }
                              style={CustomStyleSheet.largeInput}
                            />
                          </View>

                          <View>
                            <TextInput
                              maxLength={3}
                              keyboardType={'number-pad'}
                              value={this.state.regime}
                              label={translate('transverse.regime')}
                              onChangeText={(val) =>
                                this.onChangeInput({regime: val})
                              }
                              onEndEditing={(event) =>
                                this.addZeros({
                                  regime: event.nativeEvent.text,
                                  maxLength: 3,
                                })
                              }
                              style={CustomStyleSheet.largeInput}
                            />
                          </View>

                          <View>
                            <TextInput
                              maxLength={4}
                              keyboardType={'number-pad'}
                              value={this.state.annee}
                              label={translate('transverse.annee')}
                              onChangeText={(val) =>
                                this.onChangeInput({annee: val})
                              }
                              onEndEditing={(event) =>
                                this.addZeros({
                                  annee: event.nativeEvent.text,
                                  maxLength: 4,
                                })
                              }
                              style={CustomStyleSheet.largeInput}
                            />
                          </View>

                          <View>
                            <TextInput
                              maxLength={7}
                              keyboardType={'number-pad'}
                              value={this.state.serie}
                              label={translate('transverse.serie')}
                              onChangeText={(val) =>
                                this.onChangeInput({serie: val})
                              }
                              onEndEditing={(event) =>
                                this.addZeros({
                                  serie: event.nativeEvent.text,
                                  maxLength: 7,
                                })
                              }
                              style={CustomStyleSheet.largeInput}
                            />
                          </View>
                          <View>
                            <TextInput
                              maxLength={1}
                              autoCapitalize={'characters'}
                              value={this.state.cle}
                              label={translate('transverse.cle')}
                              onChangeText={(val) => this.onChangeInputCle(val)}
                              style={CustomStyleSheet.largeInput}
                            />
                          </View>
                        </View>
                      </ComContainerComp>
                    </Row>
                  )}
                  {this.state.blocDates && (
                    <Row>
                      <Col size={4}>
                        <ComBadrDatePickerComp
                          dateFormat="DD/MM/YYYY"
                          value={
                            this.state.dateDebut
                              ? moment(this.state.dateDebut, 'DD/MM/yyyy', true)
                              : ''
                          }
                          labelDate={translate('consultationBLS.startDate')}
                          inputStyle={style.textInputsStyle}
                          onDateChanged={(date) =>
                            this.setState({
                              ...this.state,
                              dateDebut: date,
                            })
                          }
                        />
                      </Col>
                      <Col size={1} />
                      <Col size={4}>
                        <ComBadrDatePickerComp
                          dateFormat="DD/MM/YYYY"
                          value={
                            this.state.dateFin
                              ? moment(this.state.dateFin, 'DD/MM/yyyy', true)
                              : ''
                          }
                          labelDate={translate('consultationBLS.endDate')}
                          inputStyle={style.textInputsStyle}
                          onDateChanged={(date) =>
                            this.setState({
                              ...this.state,
                              dateFin: date,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col size={20} />
                    <Col size={30}>
                      <ComBadrButtonIconComp
                        onPress={() => this.confirmer()}
                        icon="check"
                        style={style.buttonIcon}
                        loading={this.props.showProgress}
                        text={translate('transverse.confirmer')}
                      />
                    </Col>
                    <Col size={30}>
                      <ComBadrButtonIconComp
                        onPress={() => this.handleClear()}
                        icon="autorenew"
                        style={style.buttonIcon}
                        text={translate('transverse.retablir')}
                      />
                    </Col>
                    <Col size={20} />
                    {/* <Col size={20}>
                      <ComBadrLibelleComp>
                        <Button
                          mode="contained"
                          icon="check"
                          compact="true"
                          onPress={this.redirectToConsultationDUM.bind(
                            this,
                            this.state.rows[5].referenceDUM,
                            this.props.navigation,
                          )}>
                          {this.state.rows[5].referenceDUM}
                        </Button>
                      </ComBadrLibelleComp>
                    </Col> */}
                  </Row>
                </Grid>
              </View>
            </ScrollView>
          </ComBadrCardWithTileComp>
        </ComBadrCardBoxComp>
        {this.props?.data?.length > 0 && (
          <ScrollView style={style.innerContainer}>
            <View>
              <ComAccordionComp badr title={titre} expanded={true}>
                <ComBasicDataTableComp
                  id="coLots"
                  rows={this.props?.data}
                  cols={
                    this.props?.route?.params?.ecran === 'TRAITER'
                      ? this.coCols
                      : this.props?.route?.params?.ecran === 'ANNULER'
                      ? this.coColsAnnuler
                      : this.coColsWithoutAction
                  }
                  totalElements={this.props?.data?.length}
                  maxResultsPerPage={10}
                  paginate={true}
                  showProgress={this.props.showProgress}
                />
              </ComAccordionComp>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.coReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(COMainScreen);
