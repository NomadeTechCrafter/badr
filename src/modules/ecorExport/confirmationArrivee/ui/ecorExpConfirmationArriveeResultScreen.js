import React from 'react';
import { ScrollView, View } from 'react-native';
/**Custom Components */
import {
  ComBadrCardBoxComp,
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrLibelleComp,
  ComBadrPickerComp,
  ComBasicDataTableComp,
} from '../../../../commons/component';
import EcorExpInformationEcorComp from './../component/ecorExpInformationEcorComp';
import * as Constants from '../state/ecorExpConfirmationArriveeConstants';
/** REDUX **/
import { connect } from 'react-redux';
import translate from '../../../../commons/i18n/ComI18nHelper';
import styles from '../style/ecorExpConfirmationArriveeStyle';
import _ from 'lodash';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { CustomStyleSheet, primaryColor } from '../../../../commons/styles/ComThemeStyle';
import { Button, HelperText, RadioButton, Text } from 'react-native-paper';
import moment from 'moment';
import ecorExpConfirmationArriveeCRUDAction from '../state/actions/ecorExpConfirmationArriveeCRUDAction';


const initialState = {
  dateDebut: '',
  heureDebut: '',
  avecReserves: false,
  errorMessage: '',
  showErrorMessage: false,
  localReducer: {},
  refReserveConfirmationArrivee: {}
};

class ConfirmationArriveeResultScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.cols = [
      {
        code: 'referenceEnregistrement',
        libelle: translate('confirmationArrivee.ref'),
        width: 250,
      },
      {
        code: 'typeDeD',
        libelle: translate('confirmationArrivee.typeDed'),
        width: 100,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('confirmationArrivee.dateEnreg'),
        width: 150,
      },
      {
        code: 'operateurDeclarant',
        libelle: translate('confirmationArrivee.operateurDeclarant'),
        width: 150,
      },
      {
        code: 'valeurDeclaree',
        libelle: translate('confirmationArrivee.valeurDeclarant'),
        width: 150,
      },
      {
        code: 'poidsBruts',
        libelle: translate('confirmationArrivee.poidsBruts'),
        width: 150,
      },
      {
        code: 'poidsNet',
        libelle: translate('confirmationArrivee.poidsNet'),
        width: 150,
      },
      {
        code: 'nombreContenants',
        libelle: translate('confirmationArrivee.nombreContenants'),
        width: 150,
      },
    ];
  }
  componentDidMount() {
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('this.props?.ecorExpConfirmationArriveeReducer : ' + JSON.stringify(this.props?.ecorExpConfirmationArriveeReducer));
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
    this.setState({
      localReducer: this.props?.ecorExpConfirmationArriveeReducer
    });}

  displayErrorMessage = () => {
    this.setState({
      ...this.state,
      showErrorMessage: true,
    });
  };

  confirmerArrivee = () => {
    this.displayErrorMessage();
    if (this.state.dateDebut && this.state.heureDebut) {
      let formattedListeScelles = {};
      let listeDumVo = [];
      this.state.listeNombreDeScelles.forEach((value) => {
        formattedListeScelles[value] = value;
      });

      if (
        this.state?.localReducer?.data &&
        this.state?.localReducer?.data?.listDeclaration &&
        this.state?.localReducer?.data?.listDeclaration?.length > 0
      ) {
        for (let j = 0; j < this.state?.localReducer?.data?.listDeclaration?.length; j++) {
          let DumVO = {
            documentEntreeEnceinte: '',
            numeroPince: '',
            nombreScelle: '',
            nombreScelleConfirmationEntree: '',
            numeroPinceConfirmationEntree: '',
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
            refReserveConfirmationArrivee: {},
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
            scelles: {},
            scellesConfirmationEntree: {},
          };

          DumVO.referenceEnregistrement = this.state?.localReducer?.data?.listDeclaration[
            j
          ].referenceEnregistrement;
          DumVO.documentEntreeEnceinte = this.state.documentEntreeEnceinte;
          DumVO.refReserveConfirmationArrivee = this.state.refReserveConfirmationArrivee;

          console.log('   we will save => ');
          console.log(DumVO);
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

        let action = ecorExpConfirmationArriveeCRUDAction.request(
          {
            type: Constants.CONFIRMERNTREE_REQUEST,
            value: {
              commande: 'confirmerArrivee',
              module: MODULE_ECOREXP,
              typeService: TYPE_SERVICE_UC,
              data: EtatChargmentDUMVO,
            },
          },
          this.state?.localReducer?.navigation,
        );
        this.state?.localReducer?.dispatch(action);
      } else {
        console.log('Veuillez choisir une déclaration en détail.');
      }
    }
  };

  onItemSelected = (row) => { };
  convertListeScelles = (listeScelles) => {
    return listeScelles
      ? Object.values(this.state?.localReducer?.data?.initConfirmerArriveeVO.scelles)
      : [];
  };

  componentDidUpdate() {
    /*if (this.props.route.params.first) {
      this.refs._badrTable.reset();
    }*/
  }
  setError = (msg) => {
    console.log('setError msg', msg);
    this.setState({
      errorMessage: msg,
    });
  };

  hasErrors = (field) => {
    return this.state.showErrorMessage && _.isEmpty(this.state[field]);
  };

  handleRubriqueAvecReserves = (itemValue, itemIndex, selectedItem) => {
    console.log('handleRubriqueAvecReserves itemValue', itemValue);
    console.log('handleRubriqueAvecReserves selectedItem', selectedItem);
    this.setState({
      refReserveConfirmationArrivee: selectedItem
    });

  };

  render() {
    return (
      <View>
        <ScrollView
          horizontal={false}
          ref={(ref) => {
            this.scrollViewRef = ref;
          }}
          onLayout={(event) => {
            this.layout = event.nativeEvent.layout;
          }}>
          {this.state.errorMessage !== null && (
            <ComBadrErrorMessageComp
              style={styles.centerErrorMsg}
              message={this.state.errorMessage}
            />
          )}
          {!_.isEmpty(this.state?.localReducer?.errorMessage) && (
            <ComBadrErrorMessageComp
              style={styles.centerErrorMsg}
              message={this.state?.localReducer?.errorMessage}
            />
          )}
          {!_.isEmpty(this.state?.localReducer?.infoMessage) && (
            <ComBadrInfoMessageComp
              style={styles.centerErrorMsg}
              message={this.state?.localReducer?.infoMessage}
            />
          )}
          {!_.isEmpty(this.state?.localReducer?.data) &&
            !_.isEmpty(this.state?.localReducer?.data?.listDeclaration) && (
              <ComBasicDataTableComp
                ref="_badrTable"
                id="listConfirmationArrivee"
                rows={this.state?.localReducer?.data?.listDeclaration}
                cols={this.cols}
                onItemSelected={this.onItemSelected}
                totalElements={this.state?.localReducer?.data?.listDeclaration?.length}
                maxResultsPerPage={10}
                paginate={true}
                showProgress={this.state?.localReducer?.showProgress}
              />
            )}
          <Grid>
            <View>
              <Row>
                <Col>
                  <ComBadrCardBoxComp noPadding={true}>
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
                            value={this.state.dateDebut ? moment(this.state.dateDebut, 'DD/MM/yyyy', true) : ''}
                            timeValue={this.state.heureDebut ? moment(this.state.heureDebut, 'HH:mm', true) : ''}
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
                            inputStyle={styles.dateInputStyle}
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
                        {/* <Col>
                            <ComBadrLibelleComp style={styles.valueL}>
                              {initConfirmerArriveeVO.refAgentConfirmationArrive?.nom}{' '}
                              {initConfirmerArriveeVO.refAgentConfirmationArrive?.prenom}
                            </ComBadrLibelleComp>
                          </Col> */}
                      </Row>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col>
                          <ComBadrLibelleComp withColor={true}>
                            {translate('confirmationArrivee.avecReserves')}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col>
                          <View
                            style={styles.flexRow}>
                            <RadioButton.Group
                              onValueChange={newValue => {
                                this.setState({ avecReserves: newValue });
                                console.log('newValue : ' + newValue);
                              }}
                              value={this.state.avecReserves}>
                              <View style={styles.flexRowRadioButton}>
                                <Text >
                                  {translate('confirmationArrivee.oui')}
                                </Text>
                                <RadioButton value="true" color={primaryColor} />
                              </View>
                              <View style={styles.flexRowRadioButton}>
                                <Text >
                                  {translate('confirmationArrivee.non')}
                                </Text>
                                <RadioButton value="false" color={primaryColor} />
                              </View>
                            </RadioButton.Group>
                          </View>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                      </Row>
                      {this.state.avecReserves === 'true' && (
                        <Row style={CustomStyleSheet.whiteRow}>
                          <Col size={2}>
                            <ComBadrLibelleComp withColor={true} isRequired={true}>
                              Avec réserves
                            </ComBadrLibelleComp>
                          </Col>
                          <Col size={4}>
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
                          </Col>
                          <Col size={2} />
                        </Row>
                      )}
                    </Grid>
                  </ComBadrCardBoxComp>
                </Col>
              </Row>
            </View>
            <Row>
              <Col />
              <Col>
                <Button
                  onPress={() => this.confirmerArrivee()}
                  icon="check"
                  compact="true"
                  mode="contained"
                  disabled={this.state?.localReducer?.ecorIsSaved}
                  loading={this.state?.localReducer?.showProgress}>
                  {translate('confirmationArrivee.subTitle')}
                </Button>
              </Col>
              <Col />
            </Row>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

// function mapDispatchToProps(dispatch) {
//   let actions = { dispatch };
//   return {
//     actions,
//   };
// }

export default connect(
  mapStateToProps,
  null,
)(ConfirmationArriveeResultScreen);
