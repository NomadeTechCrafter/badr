import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';

import {
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComBadrListComp,
  BadrLibelleBleu,
  BadrLibelleNoir,
  ComBadrNumericTextInputComp,
  ComBadrPopupComp,
} from '../../../../commons/component';
import {
  Checkbox,
  TextInput,
  Text,
  RadioButton,
  Paragraph,
  TouchableRipple,
  Button,
} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';

import {load} from '../../../services/storage-service';
import {connect} from 'react-redux';
import * as Constants from '../../../common/constants/mainLevee/delivrerMLV';
import * as DelivrerMLVAction from '../../../redux/actions/mainLevee/delivrerMLV';

const screenHeight = Dimensions.get('window').height;

class EnleverMarchandiseParPesage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      checked: false,
      refDeclaration: props.route.params.refDeclaration,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      declaration: props.route.params.declarationRI,
      delivrerMainleveeVO: props.route.params.declarationRI,
      typeRegime: translate('controle.regimeInterne'),
      decisionControle: props.route.params.declarationRI.decisionControle,
      observation: props.route.params.declarationRI.observation,
      sousReservePaiementMLV: props.route.params.sousReservePaiementMLV,
      numeroVersionCourante: 0,
      isConsultation: false,
      compteRendu: '',
      generateurNumScelleAu: '',
      generateurNumScelleDu: '',
      messagesErreur: [],
      listeNombreDeScelles: [],
      messageVisibility: false,
      message: '',
      messageType: '',
      selectedItemListScelle: '',
    };
    this.numeroScelle = '';
  }

  componentDidMount() {
    console.log('componentDidMount DelivrerMLV:');
    load('user',false,true).then((user) => {
      this.setState({login: JSON.parse(user).login});
    });
  }

  validerMainLevee = () => {
    console.log('validerMainLevee');
    var data = this.state.delivrerMainleveeVO;
    console.log('data----', data);
    var action = DelivrerMLVAction.validerMLV(
      {
        type: Constants.DELIVRERMLV_VALIDERMLV_REQUEST,
        value: {
          data: data,
        },
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
    console.log('dispatch fired !!');
  };

  showMessages = (type, message) => {
    this.scrollViewRef.scrollTo({y: 0, animated: true});
    this.setState({
      messageVisibility: true,
      message: message,
      messageType: type,
    });
  };

  onCloseMessagesPressed = () => {
    this.setState({
      messageVisibility: false,
      message: '',
      messageType: '',
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.reponseData &&
      props.reponseData.historiqueCompte &&
      props.reponseData.historiqueCompte !== state.declaration.historiqueCompte
    ) {
      return {
        declaration: {
          // object that we want to update
          ...state.declaration, // keep all other key-value pairs
          historiqueCompte: props.reponseData.historiqueCompte, // update the value of specific key
        },
        isConsultation: true,
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  render() {
    const {
      delivrerMainleveeVO,
      generateurNumScelleAu,
      listeNombreDeScelles,
    } = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('mainlevee.title')}
          subtitle={translate('mainlevee.delivrerMainlevee.title')}
          icon="menu"
        />
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {this.props.showProgress && <ComBadrProgressBarComp />}
          <ComBadrPopupComp
            message={this.state.message}
            type={this.state.messageType}
            visible={this.state.messageVisibility}
            onClosePressed={this.onCloseMessagesPressed}
          />
          {this.props.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
          {this.props.successMessage != null && (
            <ComBadrInfoMessageComp message={this.props.successMessage} />
          )}
          {/* Référence déclaration */}
          <ComBadrCardBoxComp noPadding={true}>
            <Grid>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.bureau')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.annee')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.serie')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.cle')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.nVoyage')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('mainlevee.refDroitTaxGaran')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  {delivrerMainleveeVO.liquidation === 'non' ? (
                    <ComBadrLibelleComp withColor={true}>
                      {delivrerMainleveeVO.liquidation}
                    </ComBadrLibelleComp>
                  ) : (
                    <Button mode="text">
                      {delivrerMainleveeVO.liquidation}
                    </Button>
                  )}
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {this.state.refDeclaration.slice(0, 3)}
                  </BadrLibelleNoir>
                </Col>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {this.state.refDeclaration.slice(3, 6)}
                  </BadrLibelleNoir>
                </Col>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {this.state.refDeclaration.slice(6, 10)}
                  </BadrLibelleNoir>
                </Col>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {this.state.refDeclaration.slice(10, 17)}
                  </BadrLibelleNoir>
                </Col>
                <Col size={1}>
                  <BadrLibelleNoir>{this.state.cle}</BadrLibelleNoir>
                </Col>
                <Col size={1}>
                  <BadrLibelleNoir>{this.state.numeroVoyage}</BadrLibelleNoir>
                </Col>
                <Col size={4}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('mainlevee.refPaiementAmend')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {delivrerMainleveeVO.paiement}
                  </BadrLibelleNoir>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={10} />
                <Col size={4}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('mainlevee.mainleveeSousReservePaiement')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2} />
              </Row>
            </Grid>
          </ComBadrCardBoxComp>

          <View style={styles.flexDirectionRow}>
            <Text style={styles.libelleL}>
              {translate('mainlevee.delivrerMainlevee.secondTitle')}
            </Text>
          </View>

          {/* Annotations */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp
              title={translate(
                'mainlevee.delivrerMainlevee.annotations.title',
              )}>
              <Row style={CustomStyleSheet.whiteRow}>
                <BadrLibelleNoir>
                  {delivrerMainleveeVO.annotationsControle}
                </BadrLibelleNoir>
              </Row>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Actions */}
          <View
            style={styles.containerActionBtn}
            pointerEvents={this.state.isConsultation ? 'none' : 'auto'}>
            <ComBadrButtonComp
              style={styles.actionBtn}
              onPress={() => {
                this.sauvgarderValider('sauvegarderRI');
              }}
              text={translate('mainlevee.validerMainlevee')}
              disabled={this.state.decisionControle ? false : true}
            />
            <ComBadrButtonComp
              style={styles.actionBtn}
              onPress={() => {
                this.sauvgarderValider('validerRI');
              }}
              text={translate('mainlevee.delivrerMainlevee.title')}
              disabled={this.state.decisionControle ? false : true}
            />
          </View>
        </ComContainerComp>
      </View>
    );
  }
}

const libelle = {
  fontSize: 14,
  color: '#006acd',
};

const styles = {
  cardBoxInfoDum: {
    flexDirection: 'column',
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  containerActionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  libelleS: {
    ...libelle,
    flex: 1,
  },
  libelleM: {
    ...libelle,
    flex: 2,
  },
  libelleL: {
    ...libelle,
    flex: 3,
  },
  decisionContainerRB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: primaryColor,
    padding: 8,
    width: 300,
  },
  checkboxCol: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  textRadio: {
    color: '#FFF',
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: 200,
  },
  rowListNumScelle: {
    height: 170,
  },
};

export default EnleverMarchandiseParPesage;
