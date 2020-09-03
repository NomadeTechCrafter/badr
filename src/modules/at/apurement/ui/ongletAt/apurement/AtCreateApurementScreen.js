import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { Col, Row } from 'react-native-easy-grid';

import InfoCommon from '../common/AtInfoCommonScreen';
import { translate } from '../../../../../../commons/i18n/I18nHelper';
import _ from 'lodash';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles';
import * as CreateApurementAction from '../../../state/actions/atApurementCreateAction';
import * as InitApurementAction from '../../../state/actions/atApurementInitAction';
import * as ConstantsAt from '../../../state/atApurementConstants';

/** Utils */
import Utils from '../../../../../../commons/utils/Util';
import moment from 'moment';
/** Inmemory session */
import { Session } from '../../../../../../commons/services/session/Session';

import {
  Toolbar,
  Container,
  CardBox,
  Accordion,
  BadrErrorMessage,
  BadrInfoMessage,
  BadrTable,
  CardsWithTitle,
  BadrDatePicker,
  BadrActionButton,
} from '../../../../../../commons/component';

class Apurement extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      showNouveauApur: false,
      consulterApur: false,
      exportateur: '',
      dateApurement: moment(new Date()).format('DD/MM/YYYY'),
      showMotif: false,
      motif: '',
      errorMessage: null,
      selectedApurement: {},
      bureauApur: Session.getInstance().getNomBureauDouane(),
      arrondApur: Session.getInstance().getLibelleArrondissement(),
    };
    this.componentsAapurer = [];
    this.composantTablesCols = this.buildComposantsColumns(true);
    this.composantTablesColsConsult = this.buildComposantsColumns(false);
    this.apurementsCols = this.buildApurementsColumns();
  }

  /**
   * This function build the components datatable headers labels and actions.
   * the reference is considered as the current component instance
   */
  buildComposantsColumns = (actions) => {
    return actions
      ? [
        {
          code: '',
          libelle: translate('at.apurement.selectionner'),
          width: 100,
          component: 'checkbox',
          action: (row, index) => this.onComponentChecked(row, index),
        },
        {
          code: 'typeComposant',
          libelle: translate('at.apurement.typeComposant'),
          width: 160,
        },
        {
          code: 'informationAffichee',
          libelle: translate('at.apurement.informationAffichee'),
          width: 380,
        },
        {
          code: 'modeApurementComposant.libelle',
          libelle: translate('at.apurement.modeApurement'),
          width: 160,
        },
      ]
      : [
        {
          code: 'typeComposant',
          libelle: translate('at.apurement.typeComposant'),
          width: 140,
        },
        {
          code: 'informationAffichee',
          libelle: translate('at.apurement.informationAffichee'),
          width: 450,
        },
        {
          code: 'modeApur.libelle',
          libelle: translate('at.apurement.modeApurement'),
          width: 150,
        },
      ];
  };

  /**
   * This function build the apurement datatable headers labels and actions.
   *  the reference is considered as the current component instance
   */
  buildApurementsColumns = () => {
    return [
      {
        code: '',
        libelle: '',
        width: 50,
        component: 'button',
        icon: 'eye',
        action: (row, index) => {
          this.consulter(row);
        },
      },
      {
        code: '',
        libelle: '',
        width: 50,
        component: 'button',
        icon: 'delete-outline',
        attrCondition: 'idApurement',
        action: (row, index) => this.onApurementDeleted(row, index),
      },
      {
        code: 'bureauApur.libelle',
        libelle: translate('at.apurement.bureauApurement'),
        width: 150,
      },
      {
        code: 'arrondApur.libelle',
        libelle: translate('at.apurement.arrondApurement'),
        width: 180,
      },
      {
        code: 'typeComposApur',
        libelle: translate('at.apurement.typeComposantApure'),
        width: 240,
      },
      {
        code: 'dateApurement',
        libelle: translate('at.apurement.dateApurement'),
        width: 100,
      },
    ];
  };

  /**
   * Fired to view data of the selected AT item (form + Components)
   */
  consulter = (row) => {
    this.setState({
      selectedApurement: row,
      consulterApur: true,
      showNouveauApur: false,
    });
  };

  /**
   * Fired when each component is checked or unchecked,
   * the components states are handled by redux not locally.
   */
  onComponentChecked = (row, index) => {
    if (this.state.dateApurement) {
      let item = this.props.initApurement.data.composantsApures[index];
      item.id = index + 1;
      if (item && item.selected) {
        let result = _.filter(this.componentsAapurer, function (val) {
          return val.idComposant === item.idComposant;
        });
        if (result.length === 0) {
          this.componentsAapurer.push(item);
        }
      } else {
        _.remove(this.componentsAapurer, {
          idComposant: row.idComposant,
        });
      }
    } else {
      this.badrComposantsTable.clearSelection();
      this.scroll.scrollTo({ x: 0, y: 0, animated: true });
      this.setState({
        errorMessage: translate('at.apurement.mandatory.dateApurement'),
      });
    }
  };

  /**
   * Fired to prepare AT components before confirming the AT.
   * The list of AT items are handled by redux not by a local state.
   */
  prepareConfirmAT = () => {
    if (this.state.dateApurement) {
      this.setState({
        errorMessage: null,
      });
      if (this.state.showMotif && !this.state.motif) {
        this.setState({
          errorMessage: translate('at.apurement.mandatory.motif'),
        });
      } else {
        this.badrComposantsTable.clearSelection();
        if (this.componentsAapurer && this.componentsAapurer.length > 0) {
          let actionPrepare = InitApurementAction.confirm({
            type: ConstantsAt.PREPARE_APUR_CONFIRM,
            value: {
              listComposantAapurer: this.componentsAapurer,
              exportateur: this.state.exportateur,
              dateApurement: this.state.dateApurement,
              motif: this.state.motif,
            },
          });
          this.props.actions.dispatch(actionPrepare);
          this.componentsAapurer = [];
          this.setState({
            showNouveauApur: false,
            exportateur: '',
            dateApurement: moment(new Date()).format('DD/MM/YYYY'),
            motif: '',
          });
        } else {
          this.setState({
            errorMessage: translate('at.apurement.mandatory.selectedComponent'),
          });
        }
      }
    } else {
      this.setState({
        errorMessage: translate('at.apurement.mandatory.dateApurement'),
      });
    }
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  };

  /**
   * Fired when the apurement is deleted from the datatable with a given index.
   */
  onApurementDeleted = (row, index) => {
    let actionRemove = InitApurementAction.remove({
      type: ConstantsAt.PREPARE_APUR_REMOVE,
      value: {
        index: index,
      },
    });
    this.props.actions.dispatch(actionRemove);
    if (JSON.stringify(this.state.selectedApurement) === JSON.stringify(row)) {
      this.setState({ consulterApur: false, showNouveauApur: false });
    }
  };

  /**
   * Fired when the a new apurement is initialized for creation.
   */
  nouveauApurement = () => {
    this.setState({
      consulterApur: false,
      showNouveauApur: true,
      motif: null,
      showMotif: false,
    });
    let actionClearMsg = CreateApurementAction.clearMsgManuel({
      type: ConstantsAt.CREATE_APUR_CLEAR_MSG,
      value: {},
    });
    this.props.actions.dispatch(actionClearMsg);
  };

  /**
   * Fired when the cancel button is clicked. To show or hide the form block
   */
  abandonner = () => {
    this.setState({ showNouveauApur: false, consulterApur: false });
  };

  onComposantSelected = () => { };

  onDateApurementChanged = (date) => {
    if (!Utils.isSameThanNow(date, 'DD/MM/YYYY')) {
      this.setState({ showMotif: true });
    } else {
      this.setState({ showMotif: false });
    }
    this.setState({ dateApurement: date });
  };

  /**
   Fired when the confirm button is clicked.
   */
  handleConfirmATButton = () => {
    let apurerAction = CreateApurementAction.requestManuel({
      type: ConstantsAt.CREATE_APUR_REQUEST,
      value: {
        atVO: this.props.initApurement.data,
      },
    });
    this.props.actions.dispatch(apurerAction);
    this.setState({ showNouveauApur: false });
  };

  /**
   * Method fired each time the screen is visible to check the 'depassement de delai'
   * the componentDidMount lifecycle method do not handle this issue => Called only at the first time when component is created.
   * */
  onScreenReloaded = () => {
    if (
      this.props.initApurement &&
      this.props.initApurement.data &&
      this.props.initApurement.data.atEnteteVO
    ) {
      let verifierDelaiDepassementAction = InitApurementAction.verifierDepassementDelaiRequest(
        {
          type: ConstantsAt.VERIFIER_DELAI_DEPASSEMENT_REQUEST,
          value: {
            dateFinSaisieAT: this.props.initApurement.data.atEnteteVO
              .dateFinSaisieAT,
          },
        },
      );
      this.props.actions.dispatch(verifierDelaiDepassementAction);
    }
  };

  componentDidMount = () => {
    this.componentsAapurer = [];
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onScreenReloaded();
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  buildMotif = () => {
    return this.state.selectedApurement.motifDateApur ? (
      <TextInput
        disabled="true"
        multiline={true}
        numberOfLines={4}
        style={styles.textInputsStyle}
        underlineColor={primaryColor}
        mode="outlined"
        value={this.state.selectedApurement.motifDateApur}
        label={translate('at.apurement.motif')}
      />
    ) : (
        <View />
      );
  };

  render() {
    const atVo: any = this.props.initApurement.data;
    return (
      <View style={styles.fabContainer}>
        <ScrollView
          ref={(c) => {
            this.scroll = c;
          }}>
          <Toolbar
            back={true}
            navigation={this.props.navigation}
            title={translate('at.title')}
            subtitle={translate('at.apurement.title')}
            icon="menu"
          />

          {atVo != null && atVo.atEnteteVO != null && (
            <Container>
              {this.props.initApurement.errorMessage != null && (
                <View style={styles.messages}>
                  <BadrErrorMessage
                    message={this.props.initApurement.errorMessage}
                  />
                </View>
              )}
              {this.props.initApurement.successMessage != null && (
                <View>
                  <BadrInfoMessage
                    message={this.props.initApurement.successMessage}
                  />
                </View>
              )}

              {this.state.errorMessage != null && (
                <View style={styles.messages}>
                  <BadrErrorMessage
                    onClose={() => {
                      this.setState({ errorMessage: '' });
                    }}
                    message={this.state.errorMessage}
                  />
                </View>
              )}

              {/* Information commun */}
              <InfoCommon
                bureau={atVo.atEnteteVO.bureau}
                annee={atVo.atEnteteVO.annee}
                numeroOrdre={atVo.atEnteteVO.numeroOrdre}
                serie={atVo.atEnteteVO.serie}
                dateEnregistrement={atVo.atEnteteVO.dateEnregistrement}
                dateCreation={atVo.atEnteteVO.dateCreation}
                numVersion={atVo.atEnteteVO.numVersion}
                etat={atVo.atEnteteVO.etatAt.libelle}
              />

              {/* Apurements */}
              <CardBox style={styles.cardBox}>
                <Accordion
                  expanded={true}
                  title={translate('at.apurement.titleTableau')}>
                  {/* {this.state.declaration.annotation && ( */}
                  <View style={styles.flexDirectionRow}>
                    <BadrTable
                      id="idComposantApures"
                      rows={
                        this.props.initApurement.data.apurementVOs
                          ? this.props.initApurement.data.apurementVOs
                          : []
                      }
                      cols={this.apurementsCols}
                      totalElements={0}
                      maxResultsPerPage={5}
                      paginate={true}
                      hasId={false}
                    />
                  </View>
                </Accordion>
              </CardBox>
              {!this.state.showNouveauApur &&
                atVo.atEnteteVO &&
                atVo.atEnteteVO.etatAt &&
                atVo.atEnteteVO.etatAt.code !== '005' &&
                atVo.composantsApures &&
                atVo.composantsApures.length > 0 && (
                  <View style={styles.actionsContainer}>
                    <Button
                      onPress={() => this.nouveauApurement()}
                      icon="plus"
                      mode="contained"
                      style={styles.btnActions}>
                      {translate('transverse.nouveau')}
                    </Button>
                  </View>
                )}
              {this.state.showNouveauApur && (
                <CardBox style={styles.cardBox}>
                  <CardsWithTitle title={translate('at.apurement.title')}>
                    <View>
                      <Row size={100}>
                        <Col size={50}>
                          <TextInput
                            style={styles.textInputsStyle}
                            mode="outlined"
                            value={this.state.bureauApur}
                            disabled="true"
                            label={translate('at.apurement.bureauApurement')}
                          />
                        </Col>
                        <Col size={50}>
                          <TextInput
                            style={styles.textInputsStyle}
                            underlineColor={primaryColor}
                            mode="outlined"
                            value={this.state.arrondApur}
                            disabled="true"
                            label={translate('at.apurement.arrondApurement')}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col size={50}>
                          <BadrDatePicker
                            labelDate={translate('at.apurement.dateApurement')}
                            dateFormat="DD/MM/YYYY"
                            value={new Date()}
                            onDateChanged={this.onDateApurementChanged}
                            inputStyle={styles.textInputsStyle}
                          />
                        </Col>
                        <Col size={50} />
                      </Row>

                      <Row>
                        <Col size={100}>
                          {this.state.showMotif && (
                            <TextInput
                              multiline={true}
                              numberOfLines={4}
                              style={styles.textInputsStyle}
                              underlineColor={primaryColor}
                              mode="outlined"
                              value={this.state.motif}
                              onChangeText={(text) =>
                                this.setState({ motif: text })
                              }
                              label={translate('at.apurement.motif')}
                            />
                          )}
                        </Col>
                      </Row>

                      <Row size={100}>
                        <Col size={50}>
                          <TextInput
                            style={styles.textInputsStyle}
                            underlineColor={primaryColor}
                            mode="outlined"
                            value={translate('at.apurement.reexportation')}
                            disabled="true"
                            label={translate('at.apurement.mode')}
                          />
                        </Col>
                        <Col size={50}>
                          <TextInput
                            style={styles.textInputsStyle}
                            underlineColor={primaryColor}
                            mode="outlined"
                            onChangeText={(text) =>
                              this.setState({ exportateur: text })
                            }
                            value={this.state.exportateur}
                            label={translate('at.apurement.exportateur')}
                          />
                        </Col>
                      </Row>
                    </View>
                  </CardsWithTitle>
                  <CardsWithTitle
                    title={translate('at.apurement.titleTableauCompo')}>
                    <View style={styles.flexDirectionRow}>
                      <BadrTable
                        onRef={(ref) => (this.badrComposantsTable = ref)}
                        hasId={false}
                        id="idComposant"
                        rows={this.props.initApurement.data.composantsApures}
                        cols={this.composantTablesCols}
                        onItemSelected={this.onComposantSelected}
                        totalElements={
                          this.props.initApurement.data.composantsApures
                            ? this.props.initApurement.data.composantsApures
                              .length
                            : 0
                        }
                        maxResultsPerPage={5}
                        paginate={true}
                      />
                    </View>
                  </CardsWithTitle>
                  <View style={styles.actionsContainer}>
                    <Row size={4}>
                      <Col />
                      <Col>
                        <Button
                          onPress={() => this.prepareConfirmAT()}
                          icon="check"
                          mode="contained"
                          style={styles.btnActions}>
                          {translate('transverse.confirmer')}
                        </Button>
                      </Col>
                      <Col size={1}>
                        <Button
                          onPress={() => this.abandonner()}
                          icon="autorenew"
                          mode="contained"
                          style={styles.btnActions}>
                          {translate('transverse.abandonner')}
                        </Button>
                      </Col>
                      <Col />
                    </Row>
                  </View>
                </CardBox>
              )}

              {this.state.consulterApur && (
                <CardBox style={styles.cardBox}>
                  <CardsWithTitle title={translate('at.apurement.title')}>
                    <View>
                      <Row size={100}>
                        <Col size={50}>
                          <TextInput
                            style={styles.textInputsStyle}
                            mode="outlined"
                            value={
                              this.state.selectedApurement.bureauApur.libelle
                            }
                            disabled="true"
                            label={translate('at.apurement.bureauApurement')}
                          />
                        </Col>
                        <Col size={50}>
                          <TextInput
                            style={styles.textInputsStyle}
                            underlineColor={primaryColor}
                            mode="outlined"
                            value={
                              this.state.selectedApurement.arrondApur.libelle
                            }
                            disabled="true"
                            label={translate('at.apurement.arrondApurement')}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col size={50}>
                          <TextInput
                            style={styles.textInputsStyle}
                            underlineColor={primaryColor}
                            mode="outlined"
                            value={this.state.selectedApurement.dateApurement}
                            label={translate('at.apurement.dateApurement')}
                            disabled="true"
                          />
                        </Col>
                        <Col size={50} />
                      </Row>

                      <Row>
                        <Col size={100}>
                          <View>{this.buildMotif()}</View>
                        </Col>
                      </Row>

                      <Row size={100}>
                        <Col size={50}>
                          <TextInput
                            style={styles.textInputsStyle}
                            underlineColor={primaryColor}
                            mode="outlined"
                            value={translate('at.apurement.reexportation')}
                            disabled="true"
                            label={translate('at.apurement.mode')}
                          />
                        </Col>
                        <Col size={50}>
                          <TextInput
                            style={styles.textInputsStyle}
                            underlineColor={primaryColor}
                            mode="outlined"
                            disabled="true"
                            value={
                              this.state.selectedApurement
                                .apurementComposantVOs &&
                                this.state.selectedApurement.apurementComposantVOs
                                  .length > 0
                                ? this.state.selectedApurement
                                  .apurementComposantVOs[0].exportateur
                                : ''
                            }
                            label={translate('at.apurement.exportateur')}
                          />
                        </Col>
                      </Row>
                    </View>
                  </CardsWithTitle>
                  <CardsWithTitle
                    title={translate('at.apurement.titleTableauCompo')}>
                    <View style={styles.flexDirectionRow}>
                      <BadrTable
                        onRef={(ref) => (this.badrComposantsTable = ref)}
                        hasId={false}
                        id="idComposant"
                        rows={
                          this.state.selectedApurement.apurementComposantVOs
                        }
                        cols={this.composantTablesColsConsult}
                        onItemSelected={() => { }}
                        totalElements={
                          this.state.selectedApurement.apurementComposantVOs
                            ? this.state.selectedApurement.apurementComposantVOs
                              .length
                            : 0
                        }
                        maxResultsPerPage={5}
                        paginate={true}
                      />
                    </View>
                  </CardsWithTitle>
                  <View style={styles.actionsContainer}>
                    <Row size={3}>
                      <Col />
                      <Col size={1}>
                        <Button
                          onPress={() => this.abandonner()}
                          icon="autorenew"
                          mode="contained"
                          style={styles.btnActions}>
                          {translate('transverse.abandonner')}
                        </Button>
                      </Col>
                      <Col />
                    </Row>
                  </View>
                </CardBox>
              )}
            </Container>
          )}
        </ScrollView>
        <BadrActionButton
          style={styles.badrActionsStyle}
          visible={
            atVo.atEnteteVO &&
            atVo.atEnteteVO.etatAt &&
            atVo.atEnteteVO.etatAt.code !== '005' &&
            this.props.initApurement.data &&
            this.props.initApurement.data.apurementVOs &&
            this.props.initApurement.data.apurementVOs.length > 0
          }
          active={true}
          actions={[
            {
              title: translate('at.apurement.actions.apurer'),
              icon: 'check',
              onActionPressed: this.handleConfirmATButton,
            },
          ]}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const combinedState = {
    initApurement: { ...state.initApurementReducer },
  };
  return combinedState;
}

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Apurement);

const styles = StyleSheet.create({
  fabContainer: {
    height: '100%',
  },
  badrActionsStyle: { justifyContent: 'flex-end' },
  messages: { justifyContent: 'center', alignItems: 'center' },
  btnActions: { margin: 2 },
  actionsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 15,
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputApur: {
    ...CustomStyleSheet.largeInput,
    marginBottom: 10,
  },
  textInputsStyle: {
    padding: 10,
  },
});
