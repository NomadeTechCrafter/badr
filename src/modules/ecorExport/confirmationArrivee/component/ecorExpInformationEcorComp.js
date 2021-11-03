import React from 'react';

import { FlatList, SafeAreaView, View, TouchableOpacity } from 'react-native';
/** REDUX **/
import { connect } from 'react-redux';
import * as Constants from '../state/ecorExpConfirmationArriveeConstants';
import * as ConfirmationArriveeCRUDAction from '../state/actions/ecorExpConfirmationArriveeCRUDAction';
import {
  ComAccordionComp,
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComBadrDatePickerComp,
  ComBadrNumericTextInputComp,
  ComBadrInfoMessageComp,
  ComBadrPickerComp,
} from '../../../../commons/component';
import {
  Button,
  RadioButton,
  Text,
  TextInput,
  HelperText,
} from 'react-native-paper';
import { MODULE_ECOREXP, TYPE_SERVICE_UC } from '../../../../commons/Config';
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../commons/styles/ComThemeStyle';
import { Col, Grid, Row } from 'react-native-easy-grid';
import style from '../style/ecorExpConfirmationArriveeStyle';
import _ from 'lodash';
import moment from 'moment';
const initialState = {
  documentEntreeEnceinte: '',
  dateDebut: '',
  heureDebut: '',
  avecReserves: null,
  refReserveConfirmationArrivee: null,
  showErrorMessage: false,
  generateurNumScelleAu: '',
  generateurNumScelleDu: '',
  numeroScelle: '',
  messagesErreur: [],
  listeNombreDeScelles: [],
  messageVisibility: false,
  message: '',
  messageType: '',
  selectedItemListScelle: '',
  includeScelles: false,
  selectedScelle: {},
};
class EcorExpInformationEcorComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    //this.prepareState();
  }

  /*prepareState = () => {
    this.state = {
      ...this.state,
      initConfirmerArriveeVO: this.props.initConfirmerArriveeVO,
      listeNombreDeScelles: this.props.listeNombreDeScelles,
    };
  };*/

  componentDidMount() {
    let dateHeureArrive = this.props.initConfirmerArriveeVO.dateHeureArrive
      ? moment(
        this.props.initConfirmerArriveeVO.dateHeureArrive,
        'DD/MM/yyyy HH:mm',
        true,
      )
      : '';

    this.setState({
      ...this.state,

      initConfirmerArriveeVO: this.props.initConfirmerArriveeVO,
      documentEntreeEnceinte: this.props.initConfirmerArriveeVO
        .documentEntreeEnceinte,
      dateDebut: dateHeureArrive,
      heureDebut: dateHeureArrive,
      listeNombreDeScelles: this.props.listeNombreDeScelles,
    });
    // var action = ConfirmationArriveeCRUDAction.init({
    //   type: Constants.CONFIRMERNTREE_INIT,
    //   value: {},
    // });
    // this.props.dispatch(action);
  }


  genererNumeroScelle = () => {
    console.log('generateurNumScelleDu');
    let listeScelles = [];
    const {
      generateurNumScelleDu,
      generateurNumScelleAu,
      listeNombreDeScelles,
    } = this.state;
    if (generateurNumScelleDu && generateurNumScelleAu) {
      if (
        generateurNumScelleDu.length === 8 &&
        generateurNumScelleAu.length === 8
      ) {
        let du = Number(generateurNumScelleDu);
        let au = Number(generateurNumScelleAu);
        if (au > du) {
          if (au - du <= 100) {
            console.log('generateurNumScelleDu ok condition');
            let nbScelle = du;
            for (let i = du; i <= au; i++) {
              listeScelles.push(('00000000' + nbScelle).slice(-8));
              nbScelle += 1;
            }
            console.log('generateurNumScelleDu listeScelles', listeScelles);

            this.setState({
              ...this.state,
              listeNombreDeScelles: _.concat(
                listeNombreDeScelles,
                listeScelles,
              ),
              generateurNumScelleDu: '',
              generateurNumScelleAu: '',
            });
            console.log('after set state genrete list ');
            this.generateurNumScelleDu.clear();
            this.generateurNumScelleAu.clear();
            this.props.setError(null);
          } else {
            this.props.setError(translate('errors.maxNombreScelle'));
          }
        } else {
          this.props.setError(translate('errors.numScelleInferieur'));
        }
      } else {
        this.props.setError(translate('errors.numScelleLongueur'));
      }
    }
  };

  addNumeroScelle = () => {
    const { numeroScelle, listeNombreDeScelles } = this.state;
    if (numeroScelle && numeroScelle.length === 8) {
      if (listeNombreDeScelles.length < 100) {
        if (_.indexOf(listeNombreDeScelles, numeroScelle) === -1) {
          this.setState({
            ...this.state,
            listeNombreDeScelles: [...listeNombreDeScelles, numeroScelle],
            numeroScelle: '',
          });
          this.numeroScelleInput.clear();
        } else {
          this.props.setError(translate('errors.numScelleExisteDeja'));
        }
      } else {
        this.props.setError(translate('errors.maxNombreScelle'));
      }
    } else {
      this.props.setError(translate('errors.numScelleLongueur'));
    }
  };

  deleteNumeroScelle = () => {
    const { selectedScelle, listeNombreDeScelles } = this.state;
    let selectedScelleIndex = _.indexOf(listeNombreDeScelles, selectedScelle);
    if (selectedScelle !== '' && selectedScelleIndex) {
      listeNombreDeScelles.splice(selectedScelleIndex, 1);
      this.setState({
        selectedScelle: {},
      });
    }
  };

  updateVo = () => {
    let initConfirmerArriveeVO = this.state.initConfirmerArriveeVO;
    let formattedListeScelles = {};
    this.state.listeNombreDeScelles.forEach((value) => {
      formattedListeScelles[value] = value;
    });
    initConfirmerArriveeVO.scelles = formattedListeScelles;
    let action = ConfirmationArriveeCRUDAction.updateVO({
      type: Constants.INITCONFIRMATIONARRIVEE_UPDATE_VO,
      value: initConfirmerArriveeVO,
    });
    this.props.dispatch(action);
  };

  hasErrors = (field) => {
    return this.state.showErrorMessage && _.isEmpty(this.state[field]);
  };

  displayErrorMessage = () => {
    this.setState({
      ...this.state,
      showErrorMessage: true,
    });
  };

  confirmerArrivee = () => {
    this.displayErrorMessage();
    if (this.state.dateDebut && this.state.heureDebut && this.state.avecReserves) {
      let formattedListeScelles = {};
      let listeDumVo = [];
      this.state.listeNombreDeScelles.forEach((value) => {
        formattedListeScelles[value] = value;
      });

      if (
        this.props.data &&
        this.props.data.listDeclaration &&
        this.props.data.listDeclaration.length > 0
      ) {
        for (let j = 0; j < this.props.data.listDeclaration.length; j++) {
          let DumVO = {
            documentEntreeEnceinte: '',
            numeroPince: '',
            nombreScelle: '',
            nombreScelleConfirmationEntree: this.state.initConfirmerArriveeVO
              .nombreDeScelles
              ? this.state.initConfirmerArriveeVO.nombreDeScelles
              : '',
            numeroPinceConfirmationEntree: this.state.initConfirmerArriveeVO
              .numeroPince
              ? this.state.initConfirmerArriveeVO.numeroPince
              : '',
            numeroVoyage: '',
            dateHeureAutorisation: '',
            dateHeureArrive: '',
            dateHeureAcheminement: '',
            dateHeureVoyage: '',
            dateHeureEmbarquement: '',
            dateHeureArrive: '',
            commentaireEmbarquement: '',
            refAgentEmbarquement: {},
            refAgentEntree: {},
            refAgentAutorisationAcheminement: {},
            refAgentAnnulationEmbarquement: {},
            refReserveConfirmationArrivee: null,
            refAgentAutorisation: {},
            refAgentConfirmationArrive: {},
            refMoyenTransport: {},
            refDUM: {},
            refDedServices: {},
            refMainlevee: {},
            referenceEnregistrement: '',
            numeroVersion: '',
            numeroVersionCourante: '',
            numeroScelle: '',
            oneSelected: '',
            generateurScelleDu: '',
            generateurScelleAu: '',
            operateurDeclarant: '',
            dateEnregistrement: '',
            depuisDelivrerBonEntree: false,
            sousReserve: false,
            fonctionMessage: '',
            scelles: formattedListeScelles ? formattedListeScelles : null,
            scellesConfirmationEntree: formattedListeScelles
              ? formattedListeScelles
              : null,
          };

          DumVO.referenceEnregistrement = this.props.data.listDeclaration[
            j
          ].referenceEnregistrement;
          DumVO.documentEntreeEnceinte = this.state.documentEntreeEnceinte;
          DumVO.refReserveConfirmationArrivee = this.state.refReserveConfirmationArrivee ? this.state.refReserveConfirmationArrivee : null;
          DumVO.sousReserve = this.state.avecReserves === 'true' ? true : false;

          console.log(
            '------- dateentree',
            this.state.dateDebut + ' ' + this.state.heureDebut,
          );

          //var dateHeureArrive = new Date(dateCon);
          //dateHeureArrive= $filter('date')(dateHeureArrive, 'dd/MM/yyyy');

          DumVO.dateHeureArrive =
            this.state.dateDebut + ' ' + this.state.heureDebut;
          listeDumVo.push(DumVO);
        }
        let EtatChargmentDUMVO = {
          bureau: '',
          regime: '',
          annee: '',
          serie: '',
          cle: '',
          referenceEnregistrement: '',
          dateEffectiveEnregistrement: '',
          listeDumVo: listeDumVo,
        };
        console.log('   we will save arrivée => ');
        console.log(JSON.stringify(EtatChargmentDUMVO));

        let action = ConfirmationArriveeCRUDAction.request(
          {
            type: Constants.CONFIRMERNTREE_REQUEST,
            value: {
              commande: 'confirmerArrivee',
              module: MODULE_ECOREXP,
              typeService: TYPE_SERVICE_UC,
              data: EtatChargmentDUMVO,
            },
          },
          this.props.navigation,
        );
        this.props.dispatch(action);
      } else {
        console.log('Veuillez choisir une déclaration en détail.');
      }
    }
  };

  renderBoxItem = ({ item }) => {
    const itemStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItem
        : style.boxItem;
    const itemTextStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItemText
        : style.boxItemText;

    return (
      <View style={itemStyle}>
        <TouchableOpacity
          disabled={true}
          onPress={() =>
            this.setState({
              ...this.state,
              selectedScelle: item,
            })
          }>
          <Text style={itemTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  handleRubriqueAvecReserves = (itemValue, itemIndex, selectedItem) => {
    console.log('handleRubriqueAvecReserves itemValue', itemValue);
    console.log('handleRubriqueAvecReserves selectedItem', selectedItem);
    this.setState({
      refReserveConfirmationArrivee: selectedItem ? selectedItem : null
    });
  };

  render() {
    console.log('in render');
    const { ecorIsSaved } = this.props.data;
    const {
      initConfirmerArriveeVO,
      documentEntreeEnceinte,
      dateDebut,
      heureDebut,
    } = this.state;
    let {
      generateurNumScelleDu,
      generateurNumScelleAu,
      listeNombreDeScelles,
      numeroScelle,
    } = this.state;

    return (
      <View>
        {/* {this.props?.infoMessage != null && (
          <ComBadrInfoMessageComp message={this.props?.infoMessage} />
        )} */}

        <Grid>
          {this.props?.listEC === false && (
            <View>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('confirmationArrivee.dateHeure')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp style={style.valueL}>
                    {initConfirmerArriveeVO?.dateHeureEntree}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('confirmationArrivee.autorisationAcheminement.agentDouanier')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp style={style.valueL}>
                    {initConfirmerArriveeVO?.refAgentEntree?.nom}{' '}
                    {initConfirmerArriveeVO?.refAgentEntree?.prenom}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('confirmationArrivee.refDocument')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <TextInput
                    mode={'outlined'}
                    maxLength={8}
                    value={documentEntreeEnceinte}
                    label={translate('confirmationArrivee.refDocument')}
                    style={CustomStyleSheet.badrInputHeight}
                    onChangeText={(text) =>
                      this.setState({
                        ...this.state,
                        documentEntreeEnceinte: text,
                      })
                    }
                    disabled={true}
                  />
                </Col>
                <Col size={1}>
                </Col>
                <Col size={1}>
                </Col>
              </Row>
            </View>
          )}
          {!_.isEmpty(initConfirmerArriveeVO) && (
            <View>
              {this.props?.listEC === false && (
                <View>
                  <Row>
                    <Col>
                      <ComBadrCardBoxComp noPadding={true}>
                        {/* Informations ECOR */}
                        <ComAccordionComp
                          title={translate(
                            'confirmationArrivee.informationsEcor.title',
                          )} expanded={true}>
                          <Grid>
                            <Row style={CustomStyleSheet.whiteRow}>
                              <Col size={1}>
                                <TextInput
                                  mode={'outlined'}
                                  maxLength={8}
                                  value={
                                    initConfirmerArriveeVO.numeroPinceConfirmationEntree
                                  }
                                  label={translate(
                                    'confirmationArrivee.informationsEcor.numeroPince',
                                  )}
                                  style={CustomStyleSheet.badrInputHeight}
                                  onChangeText={(text) =>
                                    this.setState({
                                      initConfirmerArriveeVO: {
                                        ...this.state.initConfirmerArriveeVO,
                                        numeroPince: text,
                                      },
                                    })
                                  }
                                  disabled={true}
                                />
                              </Col>
                              <Col size={1} />
                              <Col size={1}>
                                <ComBadrNumericTextInputComp
                                  maxLength={8}
                                  value={
                                    initConfirmerArriveeVO.nombreScelleConfirmationEntree
                                  }
                                  label={translate(
                                    'confirmationArrivee.informationsEcor.nombreScelles',
                                  )}
                                  onChangeBadrInput={(text) =>
                                    this.setState({
                                      initConfirmerArriveeVO: {
                                        ...this.state.initConfirmerArriveeVO,
                                        nombreDeScelles: text,
                                      },
                                    })
                                  }
                                  disabled={true}
                                />
                              </Col>
                            </Row>
                            <Row style={CustomStyleSheet.lightBlueRow}>
                              <Col size={5}>
                                <ComBadrLibelleComp withColor={true}>
                                  {translate(
                                    'confirmationArrivee.informationsEcor.generateurScelle',
                                  )}
                                </ComBadrLibelleComp>
                              </Col>
                              <Col size={2}>
                                <ComBadrNumericTextInputComp
                                  onRef={(input) => {
                                    this.generateurNumScelleDu = input;
                                  }}
                                  maxLength={8}
                                  value={this.state.generateurNumScelleDu}
                                  label={translate('transverse.du')}
                                  onChangeBadrInput={(text) =>
                                    this.setState({
                                      generateurNumScelleDu: text,
                                    })
                                  }
                                  disabled={true}
                                />
                              </Col>
                              <Col size={1} />
                              <Col size={2}>
                                <ComBadrNumericTextInputComp
                                  onRef={(input) => {
                                    this.generateurNumScelleAu = input;
                                  }}
                                  maxLength={8}
                                  value={generateurNumScelleAu}
                                  label={translate('transverse.au')}
                                  onChangeBadrInput={(text) =>
                                    this.setState({
                                      generateurNumScelleAu: text,
                                    })
                                  }
                                  disabled={true}
                                />
                              </Col>
                              <Col size={2} />
                              <Col size={1}>
                                <Button
                                  mode="contained"
                                  compact="true"
                                  onPress={this.genererNumeroScelle}
                                  disabled={true}>
                                  {translate('transverse.Ok')}
                                </Button>
                              </Col>
                              <Col size={2} />
                            </Row>
                            <Row
                              style={[
                                CustomStyleSheet.whiteRow,
                                style.rowListNumScelle,
                              ]}>
                              <Col size={5}>
                                <ComBadrNumericTextInputComp
                                  onRef={(input) => {
                                    this.numeroScelleInput = input;
                                  }}
                                  maxLength={8}
                                  value={numeroScelle}
                                  label={translate(
                                    'confirmationArrivee.informationsEcor.numeroScelle',
                                  )}
                                  onChangeBadrInput={(text) => {
                                    this.setState({
                                      numeroScelle: text,
                                    });
                                  }}
                                  disabled={true}
                                />
                              </Col>
                              <Col size={2} />

                              <Col size={1}>
                                <Button
                                  onPress={this.addNumeroScelle}
                                  icon="plus-box"
                                  mode="contained"
                                  compact="true"
                                  style={style.btnActionList}
                                  disabled={true}
                                />
                                <Button
                                  onPress={this.deleteNumeroScelle}
                                  icon="delete"
                                  mode="contained"
                                  compact="true"
                                  style={style.btnActionList}
                                  disabled={true}
                                />
                              </Col>
                              <Col size={2} />

                              <Col size={5} style={style.boxContainer}>
                                <SafeAreaView style={style.boxSafeArea}>
                                  {_.isEmpty(listeNombreDeScelles) && (
                                    <Text style={style.boxItemText}>
                                      {translate(
                                        'confirmationArrivee.informationsEcor.aucunElement',
                                      )}
                                    </Text>
                                  )}

                                  {!_.isEmpty(listeNombreDeScelles) && (
                                    <FlatList
                                      data={listeNombreDeScelles}
                                      renderItem={(item) => this.renderBoxItem(item)}
                                      keyExtractor={(item) => item}
                                      nestedScrollEnabled={true}
                                      disabled={true}
                                    />
                                  )}
                                </SafeAreaView>
                              </Col>
                            </Row>
                          </Grid>
                        </ComAccordionComp>
                      </ComBadrCardBoxComp>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ComBadrCardBoxComp noPadding={true}>
                        <ComAccordionComp
                          title={translate(
                            'confirmationArrivee.autorisationAcheminement.title',
                          )} expanded={true}>
                          <Grid>
                            <Row style={CustomStyleSheet.whiteRow}>
                              <Col>
                                <ComBadrLibelleComp withColor={true}>
                                  {translate('confirmationArrivee.autorisationAcheminement.dateHeureAcheminement')}
                                </ComBadrLibelleComp>
                              </Col>
                              <Col>
                                <ComBadrLibelleComp style={style.valueL}>
                                  {initConfirmerArriveeVO.dateHeureAcheminement}
                                </ComBadrLibelleComp>
                              </Col>
                              <Col>
                                <ComBadrLibelleComp withColor={true}>
                                  {translate('confirmationArrivee.autorisationAcheminement.agentDouanier')}
                                </ComBadrLibelleComp>
                              </Col>
                              <Col>
                                <ComBadrLibelleComp style={style.valueL}>
                                  {initConfirmerArriveeVO.refAgentAutorisationAcheminement?.nom}{' '}
                                  {initConfirmerArriveeVO.refAgentAutorisationAcheminement?.prenom}
                                </ComBadrLibelleComp>
                              </Col>
                            </Row>
                            <Row style={CustomStyleSheet.whiteRow}>
                              <Col>
                                <ComBadrLibelleComp withColor={true}>
                                  {translate('confirmationArrivee.informationsEcor.nouveauxScelles')}
                                </ComBadrLibelleComp>
                              </Col>
                              <Col>
                                <View
                                  style={style.flexRow}>
                                  <RadioButton.Group
                                    value={this.state.decisionControle}>
                                    <View style={style.flexColumn}>
                                      <Text >
                                        {translate('confirmationArrivee.oui')}
                                      </Text>
                                      <RadioButton disabled
                                        value=""
                                      />
                                    </View>
                                    <View style={style.flexColumn}>
                                      <Text >
                                        {translate('confirmationArrivee.non')}
                                      </Text>
                                      <RadioButton disabled
                                        value=""
                                      />
                                    </View>
                                  </RadioButton.Group>
                                </View>
                              </Col>
                              <Col>
                              </Col>
                              <Col>
                              </Col>
                            </Row>
                          </Grid>
                        </ComAccordionComp>
                      </ComBadrCardBoxComp>
                    </Col>
                  </Row>
                </View>
              )}
              <Row>
                <Col>
                  <ComBadrCardBoxComp noPadding={true}>
                    <ComAccordionComp
                      title={translate(
                        'confirmationArrivee.confirmationArrivee.title',
                      )} expanded={true}>
                      <Grid>
                        <Row style={CustomStyleSheet.whiteRow}>
                          <Col size={1}>
                            <ComBadrLibelleComp withColor={true}>
                              {translate('confirmationArrivee.dateHeure')}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col size={4}>
                            <ComBadrDatePickerComp
                              dateFormat="DD/MM/YYYY"
                              heureFormat="HH:mm"
                              value={dateDebut ? moment(dateDebut, 'DD/MM/yyyy', true) : ''}
                              timeValue={heureDebut ? moment(heureDebut, 'HH:mm', true) : ''}
                              onDateChanged={(date) =>
                                this.setState({
                                  ...this.state,
                                  dateDebut: date,
                                })
                              }
                              onTimeChanged={(time) =>
                                this.setState({
                                  ...this.state,
                                  heureDebut: time,
                                })
                              }
                              inputStyle={style.dateInputStyle}
                              readonly={this.props.data.ecorIsSaved}
                            />
                            <HelperText
                              type="error"
                              padding="none"
                              visible={this.hasErrors('dateDebut')}>
                              {translate('errors.donneeObligatoire', {
                                champ: translate('confirmationArrivee.dateArrivee'),
                              })}
                            </HelperText>
                            <HelperText
                              type="error"
                              padding="none"
                              visible={this.hasErrors('heureDebut')}>
                              {translate('errors.donneeObligatoire', {
                                champ: translate('confirmationArrivee.heureArrivee'),
                              })}
                            </HelperText>
                          </Col>
                        </Row>

                        <Row style={CustomStyleSheet.whiteRow}>
                          <Col size={1}>
                            <ComBadrLibelleComp withColor={true}>
                              {translate('confirmationArrivee.avecReserves')}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col size={1}>
                            <View
                              style={style.flexRow}>
                              <RadioButton.Group
                                onValueChange={newValue => {
                                  this.setState({ avecReserves: newValue });
                                  console.log('newValue : ' + newValue);
                                }}
                                value={this.state.avecReserves}>
                                <View style={style.flexRowRadioButton}>
                                  <Text >
                                    {translate('confirmationArrivee.oui')}
                                  </Text>
                                  <RadioButton value="true" color={primaryColor} />
                                </View>
                                <View style={style.flexRowRadioButton}>
                                  <Text >
                                    {translate('confirmationArrivee.non')}
                                  </Text>
                                  <RadioButton value="false" color={primaryColor} />
                                </View>
                              </RadioButton.Group>
                              <HelperText
                                type="error"
                                padding="none"
                                visible={this.hasErrors('avecReserves')}>
                                {translate('errors.donneeObligatoire', {
                                  champ: translate('confirmationArrivee.avecReserves'),
                                })}
                              </HelperText>
                            </View>
                          </Col>
                          {this.state.avecReserves === 'true' && (
                            <Col size={2}>
                              <ComBadrPickerComp
                                onRef={(ref) => (this.comboRrubriqueTaxation = ref)}
                                // style={CustomStyleSheet.badrPicker}
                                cle="code"
                                libelle="libelle"
                                module="REF_LIB"
                                selectedValue={this.state.message}
                                command="getAllReserveConfirmationArrivee"
                                onValueChange={(itemValue, itemIndex, selectedItem) =>
                                  this.handleRubriqueAvecReserves(itemValue, itemIndex, selectedItem)
                                }
                                param=""
                                typeService="SP"
                              />
                              <HelperText
                                type="error"
                                padding="none"
                                visible={this.hasErrors('refReserveConfirmationArrivee')}>
                                {translate('errors.donneeObligatoire', {
                                  champ: translate('confirmationArrivee.avecReserves'),
                                })}
                              </HelperText>
                            </Col>
                          )}
                        </Row>
                      </Grid>
                    </ComAccordionComp>
                  </ComBadrCardBoxComp>
                </Col>
              </Row>

              {this.props?.listEC === false && (
                <Row>
                  <Col>
                    <ComBadrCardBoxComp noPadding={true}>
                      <ComAccordionComp
                        title={translate(
                          'confirmationArrivee.controleApresScanner.title',
                        )} expanded={true}>
                        <Grid>
                          <Row style={CustomStyleSheet.whiteRow}>
                            <Col>
                              <ComBadrLibelleComp withColor={true}>
                                {translate('confirmationArrivee.autorisationAcheminement.dateHeureAcheminement')}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col>
                              <ComBadrLibelleComp style={style.valueL}>
                                {initConfirmerArriveeVO.nombreScelleCrtlApresScanner}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col>
                              <ComBadrLibelleComp withColor={true}>
                                {translate('confirmationArrivee.autorisationAcheminement.agentDouanier')}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col>
                              <ComBadrLibelleComp style={style.valueL}>
                                {initConfirmerArriveeVO.refAgentCrtlApresScanner?.nom}{' '}
                                {initConfirmerArriveeVO.refAgentCrtlApresScanner?.prenom}
                              </ComBadrLibelleComp>
                            </Col>
                          </Row>
                          <Row style={CustomStyleSheet.whiteRow}>
                            <Col>
                              <ComBadrLibelleComp withColor={true}>
                                {translate('confirmationArrivee.informationsEcor.nouveauxScelles')}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col>
                              <View
                                style={style.flexRow}>
                                <RadioButton.Group
                                  value={this.state.decisionControle}>
                                  <View style={style.flexColumn}>
                                    <Text >
                                      {translate('confirmationArrivee.oui')}
                                    </Text>
                                    <RadioButton disabled
                                      value=""
                                    />
                                  </View>
                                  <View style={style.flexColumn}>
                                    <Text >
                                      {translate('confirmationArrivee.non')}
                                    </Text>
                                    <RadioButton disabled
                                      value=""
                                    />
                                  </View>
                                </RadioButton.Group>
                              </View>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                          </Row>
                        </Grid>
                      </ComAccordionComp>
                    </ComBadrCardBoxComp>
                  </Col>
                </Row>
              )}
            </View>
          )}
          <Row>
            <Col />
            <Col>
              <Button
                onPress={() => this.confirmerArrivee()}
                icon="check"
                compact="true"
                mode="contained"
                disabled={this.props.ecorIsSaved}
                loading={this.props.showProgress}>
                {translate('confirmationArrivee.subTitle')}
              </Button>
            </Col>
            <Col />
          </Row>
        </Grid>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.ecorExpConfirmationArriveeReducer };
}
export default connect(mapStateToProps, null)(EcorExpInformationEcorComp);
