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
  ComBadrLibelleComp,
  ComBadrNumericTextInputComp,
  ComBadrPopupComp,
  ComBasicDataTableComp,
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
import RechercheEcorImport from '../rechercheEcorImport';
import rechercheRefDumReducer from '../../../../commons/state/reducers/rechercheDum';
const screenHeight = Dimensions.get('window').height;

class EnleverMarchandise extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('componentDidMount DelivrerMLV:');
    load('user').then((user) => {
      this.setState({login: JSON.parse(user).login});
    });
  }

  render() {
    {
      console.log('-------render-----', this.props.rechercheRefDumReducer);
    }
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('ecorimport.title')}
          subtitle={translate('ecorimport.enleverMarchandise.title')}
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
                    {translate('ecorimport.ouverture')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('ecorimport.cloture')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              {/*<Row style={CustomStyleSheet.lightBlueRow}>
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
                  <BadrLibelleNoir>
                    {enleverMarchandiseVO.dateHeureDebut}
                  </BadrLibelleNoir>
                </Col>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {enleverMarchandiseVO.dateHeureFin}
                  </BadrLibelleNoir>
                </Col>
              </Row>*/}
            </Grid>
          </ComBadrCardBoxComp>

          {/* Déclaration en Détail */}
          {/*  <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp
              title={translate('ecorimport.declarationDetail.title')}>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp>
                      {translate('ecorimport.declarationDetail.dateHeureEnreg')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.dateEnregistrement}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {translate('transverse.poidsBrut')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.poidsBruts}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp>
                      {translate('ecorimport.declarationDetail.typeDed')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.libelleTypeDED}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {translate('transverse.poidsNet')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.poidsNet}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp>
                      {translate(
                        'ecorimport.declarationDetail.operateurDeclarant',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.operateurDeclarant}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {translate('ecorimport.nbreContenant')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.nombreContenants}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={1}>
                    <ComBadrLibelleComp>
                      {translate('ecorimport.declarationDetail.valeurDeclaree')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.valeurDeclaree}
                    </BadrLibelleNoir>
                  </Col>
                  <Col size={2} />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>
*/}
          {/* Actions */}
          {/* <View
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
          </View>*/}
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

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps, null)(EnleverMarchandise);
