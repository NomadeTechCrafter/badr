import React from 'react';

import {FlatList, SafeAreaView, View, TouchableOpacity} from 'react-native';
/** REDUX **/
import {connect} from 'react-redux';
import * as Constants from '../state/ecorExpConfirmationEntreeConstants';
import * as ConfirmationEntreeCRUDAction from '../state/actions/ecorExpConfirmationEntreeCRUDAction';
import {
  ComAccordionComp,
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComBadrListComp,
  ComBadrDatePickerComp,
  ComBadrNumericTextInputComp,
} from '../../../../commons/component';
import {
  Button,
  RadioButton,
  Text,
  TextInput,
  HelperText,
} from 'react-native-paper';
import {MODULE_ECOREXP, TYPE_SERVICE_UC} from '../../../../commons/Config';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';
import style from '../style/ecorExpConfirmationEntreeStyle';
import _ from 'lodash';
import moment from 'moment';
const initialState = {
  documentEntreeEnceinte: '',
  dateDebut: '',
  heureDebut: '',
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
      initConfirmerEntreeVO: this.props.initConfirmerEntreeVO,
      listeNombreDeScelles: this.props.listeNombreDeScelles,
    };
  };*/

  componentDidMount() {
    let dateHeureEntree = this.props.initConfirmerEntreeVO.dateHeureEntree
      ? moment(
          this.props.initConfirmerEntreeVO.dateHeureEntree,
          'DD/MM/yyyy HH:mm',
          true,
        )
      : '';

    this.setState({
      ...this.state,

      initConfirmerEntreeVO: this.props.initConfirmerEntreeVO,
      documentEntreeEnceinte: this.props.initConfirmerEntreeVO
        .documentEntreeEnceinte,
      dateDebut: dateHeureEntree,
      heureDebut: dateHeureEntree,
      listeNombreDeScelles: this.props.listeNombreDeScelles,
    });
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
    const {numeroScelle, listeNombreDeScelles} = this.state;
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
    const {selectedScelle, listeNombreDeScelles} = this.state;
    let selectedScelleIndex = _.indexOf(listeNombreDeScelles, selectedScelle);
    if (selectedScelle !== '' && selectedScelleIndex) {
      listeNombreDeScelles.splice(selectedScelleIndex, 1);
      this.setState({
        selectedScelle: {},
      });
    }
  };

  updateVo = () => {
    let initConfirmerEntreeVO = this.state.initConfirmerEntreeVO;
    let formattedListeScelles = {};
    this.state.listeNombreDeScelles.forEach((value) => {
      formattedListeScelles[value] = value;
    });
    initConfirmerEntreeVO.scelles = formattedListeScelles;
    let action = ConfirmationEntreeCRUDAction.updateVO({
      type: Constants.INITCONFIRMATIONENTREE_UPDATE_VO,
      value: initConfirmerEntreeVO,
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
  confirmerEntree = () => {
    this.displayErrorMessage();
    if (this.state.dateDebut && this.state.heureDebut) {
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
            nombreScelleConfirmationEntree: this.state.initConfirmerEntreeVO
              .nombreDeScelles
              ? this.state.initConfirmerEntreeVO.nombreDeScelles
              : '',
            numeroPinceConfirmationEntree: this.state.initConfirmerEntreeVO
              .numeroPince
              ? this.state.initConfirmerEntreeVO.numeroPince
              : '',
            numeroVoyage: '',
            dateHeureAutorisation: '',
            dateHeureEntree: '',
            dateHeureAcheminement: '',
            dateHeureVoyage: '',
            dateHeureEmbarquement: '',
            dateHeureArrive: '',
            commentaireEmbarquement: '',
            refAgentEmbarquement: {},
            refAgentEntree: {},
            refAgentAutorisationAcheminement: {},
            refAgentAnnulationEmbarquement: {},
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
            fonctionMessage: '',
            scelles: formattedListeScelles ? formattedListeScelles : {},
            scellesConfirmationEntree: formattedListeScelles
              ? formattedListeScelles
              : {},
          };

          DumVO.referenceEnregistrement = this.props.data.listDeclaration[
            j
          ].referenceEnregistrement;
          DumVO.documentEntreeEnceinte = this.state.documentEntreeEnceinte;

          console.log('   we will save => ');
          console.log(DumVO);
          console.log(
            '------- dateentree',
            this.state.dateDebut + ' ' + this.state.heureDebut,
          );

          //var dateHeureEntree = new Date(dateCon);
          //dateHeureEntree= $filter('date')(dateHeureEntree, 'dd/MM/yyyy');

          DumVO.dateHeureEntree =
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

        let action = ConfirmationEntreeCRUDAction.request(
          {
            type: Constants.CONFIRMERNTREE_REQUEST,
            value: {
              commande: 'confirmerEntree',
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

  renderBoxItem = ({item}) => {
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
          disabled={this.props.ecorIsSaved}
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

  render() {
    console.log('in render');
    const {ecorIsSaved} = this.props.data;
    const {
      initConfirmerEntreeVO,
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
        <Grid>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={2}>
              <TextInput
                mode={'outlined'}
                maxLength={8}
                value={documentEntreeEnceinte}
                label={translate('confirmationEntree.refDocument')}
                style={CustomStyleSheet.badrInputHeight}
                onChangeText={(text) =>
                  this.setState({
                    ...this.state,
                    documentEntreeEnceinte: text,
                  })
                }
                disabled={ecorIsSaved}
              />
            </Col>
            <Col size={1} />
            <Col size={1}>
              <ComBadrLibelleComp withColor={true}>
                {translate('confirmationEntree.dateHeure')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrDatePickerComp
                dateFormat="DD/MM/yyyy"
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
            </Col>
          </Row>
          <Row style={[CustomStyleSheet.whiteRow, style.rowErrorHelper]}>
            <Col size={4} />
            <Col size={2}>
              <HelperText
                type="error"
                padding="none"
                visible={this.hasErrors('dateDebut')}>
                {translate('errors.donneeObligatoire', {
                  champ: translate('confirmationEntree.dateArrivee'),
                })}
              </HelperText>
              <HelperText
                type="error"
                padding="none"
                visible={this.hasErrors('heureDebut')}>
                {translate('errors.donneeObligatoire', {
                  champ: translate('confirmationEntree.heureArrivee'),
                })}
              </HelperText>
            </Col>
          </Row>
          {!_.isEmpty(initConfirmerEntreeVO) && (
            <Row>
              <Col>
                <ComBadrCardBoxComp noPadding={true}>
                  {/* Informations ECOR */}
                  <ComAccordionComp
                    title={translate(
                      'confirmationEntree.informationsEcor.title',
                    )}
                    expanded={true}>
                    <Grid>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={1}>
                          <TextInput
                            mode={'outlined'}
                            maxLength={8}
                            value={
                              initConfirmerEntreeVO.numeroPinceConfirmationEntree
                            }
                            label={translate(
                              'confirmationEntree.informationsEcor.numeroPince',
                            )}
                            style={CustomStyleSheet.badrInputHeight}
                            onChangeText={(text) =>
                              this.setState({
                                initConfirmerEntreeVO: {
                                  ...this.state.initConfirmerEntreeVO,
                                  numeroPince: text,
                                },
                              })
                            }
                            disabled={this.props.ecorIsSaved}
                          />
                        </Col>
                        <Col size={1} />
                        <Col size={1}>
                          <ComBadrNumericTextInputComp
                            maxLength={8}
                            value={
                              initConfirmerEntreeVO.nombreScelleConfirmationEntree
                            }
                            label={translate(
                              'confirmationEntree.informationsEcor.nombreScelles',
                            )}
                            onChangeBadrInput={(text) =>
                              this.setState({
                                initConfirmerEntreeVO: {
                                  ...this.state.initConfirmerEntreeVO,
                                  nombreDeScelles: text,
                                },
                              })
                            }
                            disabled={this.props.ecorIsSaved}
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={5}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'confirmationEntree.informationsEcor.generateurScelle',
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
                            disabled={this.props.ecorIsSaved}
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
                            disabled={this.props.ecorIsSaved}
                          />
                        </Col>
                        <Col size={2} />
                        <Col size={1}>
                          <Button
                            mode="contained"
                            compact="true"
                            onPress={this.genererNumeroScelle}
                            disabled={this.props.ecorIsSaved}>
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
                              'confirmationEntree.informationsEcor.numeroScelle',
                            )}
                            onChangeBadrInput={(text) => {
                              this.setState({
                                numeroScelle: text,
                              });
                            }}
                            disabled={this.props.ecorIsSaved}
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
                            disabled={this.props.ecorIsSaved}
                          />
                          <Button
                            onPress={this.deleteNumeroScelle}
                            icon="delete"
                            mode="contained"
                            compact="true"
                            style={style.btnActionList}
                            disabled={this.props.ecorIsSaved}
                          />
                        </Col>
                        <Col size={2} />

                        <Col size={5} style={style.boxContainer}>
                          <SafeAreaView style={style.boxSafeArea}>
                            {_.isEmpty(listeNombreDeScelles) && (
                              <Text style={style.boxItemText}>
                                {translate(
                                  'confirmationEntree.informationsEcor.aucunElement',
                                )}
                              </Text>
                            )}

                            {!_.isEmpty(listeNombreDeScelles) && (
                              <FlatList
                                data={listeNombreDeScelles}
                                renderItem={(item) => this.renderBoxItem(item)}
                                keyExtractor={(item) => item}
                                nestedScrollEnabled={true}
                                disabled={this.props.ecorIsSaved}
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
          )}
          <Row>
            <Col />
            <Col>
              <Button
                onPress={() => this.confirmerEntree()}
                icon="check"
                compact="true"
                mode="contained"
                disabled={this.props.ecorIsSaved}
                loading={this.props.showProgress}>
                {translate('confirmationEntree.subTitle')}
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
  return {...state.ecorExpConfirmationEntreeReducer};
}
export default connect(mapStateToProps, null)(EcorExpInformationEcorComp);
