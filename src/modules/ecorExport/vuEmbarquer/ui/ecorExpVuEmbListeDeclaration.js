import React from 'react';

import { View, ScrollView, Text, SafeAreaView, FlatList } from 'react-native';
import moment from 'moment';

import { translate } from '../../../../commons/i18n/ComI18nHelper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import _ from 'lodash';

import { CustomStyleSheet } from '../../../../commons/styles/ComThemeStyle';

/**Custom Components */
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrButtonIconComp,
  ComBadrCardBoxComp,
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp,
  ComBadrLibelleComp,
  ComBadrNumericTextInputComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';

/** REDUX **/
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Button, TextInput } from 'react-native-paper';

const initialState = {
  dateVuEmbarquer: '',
  heureVuEmbarquer: '',
  moyenTransportCode: '',
  navire: '',
  dateVoyage: '',
  heureVoyage: '',
  numeroVoyage: '',
  commentaire: '',
  showErrorMsg: false,
  erreur: null,
};

class VuEmbListeDeclaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    this.setState({ ...initialState });
    console.log(JSON.stringify(this.props?.value?.jsonVO));
  }

  getFormattedScelles = (scelles) => {
    let listeNombreDeScelles = [];
    Object.entries(scelles).map(item => {
      console.log(item[0]);
      listeNombreDeScelles.push(item[0]);
    })
    return listeNombreDeScelles;
  }

  renderBoxItem = ({ item }) => {
    return (
      <View style={styles.boxItem}>
        <Text style={styles.boxItemText}>{item}</Text>
      </View>
    );
  };

  handleCmbMoyenTransport = (item, id) => {
    this.setState({ moyenTransportCode: item.code, navire: item.libelle });
  };

  confirmerVuEmbarquer = () => {
    console.log(JSON.stringify(this.state));
  };

  abandonnerVuEmbarquer = () => {
  };

  

  render() {
    return (
      <View style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('vuEmbarquee.title')}
          subtitle={translate('vuEmbarquee.subTitleAction')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        <View style={styles.messages}>
          <ComBadrErrorMessageComp
            style={styles.centerErrorMsg}
            message={this.state.erreur}
          />
        </View>
        <ScrollView>
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp title={translate('autoriserAcheminemenMainScreen.declarationDetail.title')} expanded={true}>
              {/* <Grid> */}
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.dateHeureEnreg')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.props?.value?.jsonVO?.refDedServices.dateEnregistrement}
                  </ComBadrLibelleComp>
                </Col>
                <Col />
                <Col />
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.typeDed')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.props?.value?.jsonVO?.refDedServices.libelleTypeDED}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.poidsBrut')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.props?.value?.jsonVO?.refDedServices.poidsBruts}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.operateurDeclarant')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.props?.value?.jsonVO?.refDedServices.operateurDeclarant}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.poidsNet')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.props?.value?.jsonVO?.refDedServices.poidsNet}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.valeurDeclaree')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {this.props?.value?.jsonVO?.refDedServices.valeurDeclaree}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.nbreContenant')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.props?.value?.jsonVO?.refDedServices.nombreContenants}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              {/* </Grid> */}
            </ComAccordionComp>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp title={translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.title')} expanded={true}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.dateHeure')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.props?.value?.jsonVO?.dateHeureEntree}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.agentDouanier')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.props?.value?.jsonVO?.refAgentEntree?.nom}{' '}
                      {this.props?.value?.jsonVO?.refAgentEntree?.prenom}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={2}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.refDocument')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp>
                      {this.props?.value?.jsonVO?.documentEntreeEnceinte}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col />
                  <Col />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp noPadding={true}>
            {/* Informations ECOR */}
            <ComAccordionComp
              title={translate(
                'autoriserAcheminemenMainScreen.informationsEcor.title',
              )} expanded={true}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.informationsEcor.numeroPince')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.props?.value?.jsonVO?.numeroPinceConfirmationEntree}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.informationsEcor.nombreScelles')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.props?.value?.jsonVO?.nombreScelleConfirmationEntree}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={2}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'confirmationEntree.informationsEcor.generateurScelle',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col >
                    <ComBadrNumericTextInputComp
                      // onRef={(input) => {
                      //   this.generateurNumScelleDu = input;
                      // }}
                      maxLength={8}
                      // value={this.state.generateurNumScelleDu}
                      label={translate('transverse.du')}
                      // onChangeBadrInput={(text) =>
                      //   this.setState({
                      //     generateurNumScelleDu: text,
                      //   })
                      // }
                      disabled={true}
                    />
                  </Col>
                  <Col />
                  <Col>
                    <ComBadrNumericTextInputComp
                      // onRef={(input) => {
                      //   this.generateurNumScelleAu = input;
                      // }}
                      maxLength={8}
                      // value={generateurNumScelleAu}
                      label={translate('transverse.au')}
                      // onChangeBadrInput={(text) =>
                      //   this.setState({
                      //     generateurNumScelleAu: text,
                      //   })
                      // }
                      disabled={true}
                    />
                  </Col>
                  <Col />
                  <Col>
                    <Button
                      mode="contained"
                      compact="true"
                      // onPress={this.genererNumeroScelle}
                      disabled={true}>
                      {translate('transverse.Ok')}
                    </Button>
                  </Col>
                  <Col />
                </Row>
              </Grid>
              <Row>
                <Col>
                  <ComBadrNumericTextInputComp
                    // onRef={(input) => {
                    //   this.numeroScelleInput = input;
                    // }}
                    maxLength={8}
                    // value={numeroScelle}
                    label={translate(
                      'confirmationEntree.informationsEcor.numeroScelle',
                    )}
                    // onChangeBadrInput={(text) => {
                    //   this.setState({
                    //     numeroScelle: text,
                    //   });
                    // }}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Button
                    onPress={this.addNumeroScelle}
                    icon="plus-box"
                    mode="contained"
                    compact="true"
                    style={styles.btnActionList}
                    disabled={true}
                  />
                  <Button
                    onPress={this.deleteNumeroScelle}
                    icon="minus-box"
                    mode="contained"
                    compact="true"
                    style={styles.btnActionList}
                    disabled={true}
                  />
                </Col>
                <Col style={styles.boxContainer}>
                  <SafeAreaView style={styles.boxSafeArea}>
                    {_.isEmpty(this.props?.value?.jsonVO?.scelles) && (
                      <Text style={styles.boxItemText}>
                        {translate(
                          'confirmationEntree.informationsEcor.aucunElement',
                        )}
                      </Text>
                    )}

                    {!_.isEmpty(this.props?.value?.jsonVO?.scelles) && (
                      <FlatList
                        data={this.props?.value?.jsonVO?.scelles}
                        renderItem={(item) => this.renderBoxItem(item)}
                        keyExtractor={(item) => item}
                        nestedScrollEnabled={true}
                        disabled={this.props.ecorIsSaved}
                      />
                    )}
                  </SafeAreaView>
                </Col>
                <Col style={styles.boxContainer}>
                  {_.isEmpty(this.props?.value?.jsonVO?.scelles) && (
                    <Text style={styles.boxItemText}>
                      {translate(
                        'autoriserAcheminemenMainScreen.informationsEcor.aucunElement',
                      )}
                    </Text>
                  )}

                  {!_.isEmpty(this.props?.value?.jsonVO?.scelles) && (
                    <SafeAreaView style={styles.boxSafeArea}>
                      <FlatList
                        data={this.getFormattedScelles(this.props?.value?.jsonVO?.scelles)}
                        renderItem={(item) => this.renderBoxItem(item)}
                        keyExtractor={(item) => item}
                        nestedScrollEnabled={true}
                        disabled={true}
                      />
                    </SafeAreaView>
                  )}
                </Col>
              </Row>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={40} style={styles.labelContainer}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.informationsEcor.transporteurExploitantMEAD')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={70}>
                    <TextInput
                      value={this.props?.value?.jsonVO?.transporteurExploitantMEAD?.libelle}
                      disabled={true}
                    />
                  </Col>
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/*Accordion Mainlevée*/}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
              title={translate('ecorimport.mainlevee.title')}
              expanded={true}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.mainlevee.dateValidationMainlevee')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.props?.value?.jsonVO?.refMainlevee.dateValidation}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.mainlevee.agentValidationMainlevee')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.props?.value?.jsonVO?.refMainlevee.refAgentValidation.nom}{' '}
                      {this.props?.value?.jsonVO?.refMainlevee.refAgentValidation.prenom}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.mainlevee.dateDelivranceMainlevee')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.props?.value?.jsonVO?.refMainlevee.dateImpression}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.mainlevee.agentDelivranceMainlevee')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.props?.value?.jsonVO?.refMainlevee.refAgentEdition.nom}{' '}
                      {this.props?.value?.jsonVO?.refMainlevee.refAgentEdition.prenom}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('vuEmbarquee.conteneursCibles')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    {_.isEmpty(this.props?.value?.jsonVO?.refMainlevee.conteneursCibles) && (
                      <Text>
                        {translate(
                          'autoriserAcheminemenMainScreen.informationsEcor.aucunElement',
                        )}
                      </Text>
                    )}

                    {!_.isEmpty(this.props?.value?.jsonVO?.refMainlevee.conteneursCibles) && (
                      <SafeAreaView style={styles.boxSafeArea}>
                        <FlatList
                          data={this.props?.value?.jsonVO?.refMainlevee.conteneursCibles}
                          renderItem={(item) => this.renderBoxItem(item)}
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                          disabled={true}
                        />
                      </SafeAreaView>
                    )}
                  </Col>
                  <Col />
                  <Col />
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow} >
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'autoriserAcheminemenMainScreen.mainlevee.scellesMainLevee',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    {_.isEmpty(this.props?.value?.jsonVO?.refMainlevee.listScelle) && (
                      <Text >
                        {translate(
                          'autoriserAcheminemenMainScreen.informationsEcor.aucunElement',
                        )}
                      </Text>
                    )}
                    {!_.isEmpty(this.props?.value?.jsonVO?.refMainlevee.listScelle) && (
                      <SafeAreaView>
                        <FlatList
                          data={this.getFormattedScelles(this.props?.value?.jsonVO?.refMainlevee.listScelle)}
                          renderItem={(item) => this.renderBoxItem(item)}
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                          disabled={true}
                        />
                      </SafeAreaView>
                    )}
                  </Col>
                  <Col />
                  <Col />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          <ComBadrCardBoxComp>
            <ComAccordionComp expanded={true}>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('vuEmbarquee.dateHeure')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrDatePickerComp
                    dateFormat="DD/MM/YYYY"
                    value={!_.isEmpty(this.state.dateVuEmbarquer) ? moment(this.state.dateVuEmbarquer, 'DD/MM/yyyy', true) : null}
                    timeValue={!_.isEmpty(this.state.heureVuEmbarquer) ? moment(this.state.heureVuEmbarquer, 'HH:mm', true) : null}
                    labelDate={translate('vuEmbarquee.dateHeure')}
                    // inputStyle={styles.textInputsStyle}
                    onDateChanged={(date) =>
                      this.setState({
                        ...this.state,
                        dateVuEmbarquer: date,
                      })
                    }
                    onTimeChanged={(time) =>
                      this.setState({
                        ...this.state,
                        heureVuEmbarquer: time,
                      })
                    }
                  />
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.autorisationAcheminement.agentDouanier')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.props?.value?.jsonVO?.refMainlevee.refAgentValidation.nom}{' '}
                    {this.props?.value?.jsonVO?.refMainlevee.refAgentValidation.prenom}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={50}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('etatChargementVE.navire')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={150}>
                  <ComBadrAutoCompleteChipsComp
                    code="code"
                    disabled={this.props.success}
                    placeholder={translate(
                      'etatChargement.navire',
                    )}
                    selected={this.state.navire}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbMoyenTransport"
                    paramName="libelleMoyenTransport"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handleCmbMoyenTransport}
                  />
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('etatChargementVE.dateHeureVoyage')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrDatePickerComp
                    dateFormat="DD/MM/YYYY"
                    value={!_.isEmpty(this.state.dateVoyage) ? moment(this.state.dateVoyage, 'DD/MM/yyyy', true) : null}
                    timeValue={!_.isEmpty(this.state.heureVoyage) ? moment(this.state.heureVoyage, 'HH:mm', true) : null}
                    labelDate={translate('etatChargementVE.dateHeureVoyage')}
                    // inputStyle={styles.textInputsStyle}
                    onDateChanged={(date) =>
                      this.setState({
                        ...this.state,
                        dateVoyage: date,
                      })
                    }
                    onTimeChanged={(time) =>
                      this.setState({
                        ...this.state,
                        heureVoyage: time,
                      })
                    }
                  />
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('vuEmbarquee.numeroVoyage')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <TextInput
                    disabled={this.props.success}
                    value={this.state.numeroVoyage}
                    onChangeText={(val) => this.setState({ numeroVoyage: val })}
                  />
                </Col>
              </Row>
              <Row size={200} style={CustomStyleSheet.whiteRow}>
                <Col size={40}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('etatChargementVE.commentaire')}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={160}>
                  {/* <ComBadrCardBoxComp style={[styles.cardBoxInfoDum, styles.container, styles.width90]}> */}
                  <TextInput
                    disabled={this.props.success}
                    value={this.state.commentaire}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(val) => this.setState({ commentaire: val })}
                  />
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrButtonIconComp
                    onPress={() => this.confirmerVuEmbarquer()}
                    style={styles.buttonIcon}
                    loading={this.props.showProgress}
                    text={translate('etatChargementVE.buttonConfirmerVuEmbarquer')}
                  />
                  <ComBadrButtonIconComp
                    onPress={() => this.abandonnerVuEmbarquer()}
                    style={styles.buttonIcon}
                    loading={this.props.showProgress}
                    text={translate('vuEmbarquee.ABANDONNER')}
                  />
                </Col>
              </Row>
            </ComAccordionComp>
          </ComBadrCardBoxComp>
        </ScrollView>
      </View >
    );
  }
}

const styles = {
  messages: {},
  container: { width: '100%', height: '100%' },
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxItem: {
    backgroundColor: '#ffffff',
    marginVertical: 2,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
  },
  boxItemText: {
    paddingLeft: '4%',
    color: '#000000',
  },
  cardBoxInfoDum: {
    flexDirection: 'column',
  },
  width90: { width: '90%', height: '70%' },
  buttonIcon: { margin: 10, marginTop: 40 },
  // boxSafeArea: {
  //   margin: '5%',
  //   height: 200,
  //   borderRadius: 4,
  // },
  // boxContainer: {
  //   backgroundColor: '#ebecf3',
  //   borderRadius: 4,
  // },
};

function mapStateToProps(state) {
  return { ...state.ecorExportVuEmbInitReducer };
}

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VuEmbListeDeclaration);
