import React from 'react';
import {View, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {Col, Row} from 'react-native-easy-grid';

import {InfoCommon} from '../common/AtInfoCommonScreen';
import {translate} from '../../../../../../commons/i18n/I18nHelper';
import _ from 'lodash';
import {CustomStyleSheet, primaryColor} from '../../../../../../commons/styles';
import * as CreateApurementAction from '../../../state/actions/atApurementCreateAction';
import * as InitApurementAction from '../../../state/actions/atApurementInitAction';
import * as ConstantsAt from '../../../state/atApurementConstants';

/** Utils */
import Utils from '../../../../../../commons/utils/Util';

import {
  Toolbar,
  Container,
  CardBox,
  Accordion,
  BadrProgressBar,
  BadrErrorMessage,
  BadrInfoMessage,
  BadrTable,
  CardsWithTitle,
  BadrDatePicker,
  BadrActionButton,
} from '../../../../../../commons/component';

const buildComposantsColumns = (reference, actions) => {
  return actions
    ? [
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
      {
        code: '',
        libelle: translate('at.apurement.selectionner'),
        width: 200,
        component: 'checkbox',
        action: (row, index) => reference.onComponentChecked(row, index),
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
        width: 550,
      },
      {
        code: 'modeApur.libelle',
        libelle: translate('at.apurement.modeApurement'),
        width: 150,
      },
    ];
};

const buildApurementsColumns = (reference) => {
  return [
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
      libelle: translate('at.apurement.typeComposant'),
      width: 240,
    },
    {
      code: 'dateApurement',
      libelle: translate('at.apurement.dateApurement'),
      width: 100,
    },
    {
      code: '',
      libelle: '',
      width: 50,
      component: 'button',
      icon: 'eye',
      action: (row, index) => {
        reference.consulter(row);
      },
    },
    {
      code: '',
      libelle: '',
      width: 50,
      component: 'button',
      icon: 'delete-outline',
      attrCondition: 'idApurement',
      action: (row, index) => reference.onApurementDeleted(row, index),
    },
  ];
};

class Apurement extends React.Component {
  defaultState = {
    showNouveauApur: false,
    consulterApur: false,
    exportateur: '',
    dateApurement: '',
    showMotif: false,
    motif: '',
    errorMessage: null,
    selectedApurement: {},
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.componentsAapurer = [];
    this.composantTablesCols = buildComposantsColumns(this, true);
    this.composantTablesColsConsult = buildComposantsColumns(this, false);
    this.apurementsCols = buildApurementsColumns(this);
  }

  consulter = (row) => {
    console.log(row);
    this.setState({
      selectedApurement: row,
      consulterApur: true,
      showNouveauApur: false,
    });
  };

  onComponentChecked = (row, index) => {
    if (this.state.dateApurement) {
      let item = this.props.initApurement.data.composantsApures[index];
      item.id = index + 1;
      if (item && item.selected) {
        let result = _.filter(this.componentsAapurer, function(val) {
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
      this.scroll.scrollTo({x: 0, y: 0, animated: true});
      this.setState({
        errorMessage: translate('at.apurement.mandatory.dateApurement'),
      });
    }
  };

  confirmer = () => {
    if (this.state.dateApurement) {
      this.setState({
        errorMessage: null,
      });
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
      }
      this.componentsAapurer = [];
      this.setState({
        showNouveauApur: false,
        exportateur: '',
        dateApurement: '',
        motif: '',
      });
    } else {
      this.scroll.scrollTo({x: 0, y: 0, animated: true});
      this.setState({
        errorMessage: translate('at.apurement.mandatory.dateApurement'),
      });
    }
  };

  onApurementDeleted = (row, index) => {
    let actionRemove = InitApurementAction.remove({
      type: ConstantsAt.PREPARE_APUR_REMOVE,
      value: {
        index: index,
      },
    });
    this.props.actions.dispatch(actionRemove);
    if (JSON.stringify(this.state.selectedApurement) === JSON.stringify(row)) {
      this.setState({consulterApur: false, showNouveauApur: false});
    }
  };

  nouveauApurement = () => {
    this.setState({
      consulterApur: false,
      showNouveauApur: true,
    });
    let actionClearMsg = CreateApurementAction.clearMsgManuel({
      type: ConstantsAt.CREATE_APUR_CLEAR_MSG,
      value: {},
    });
    this.props.actions.dispatch(actionClearMsg);
  };

  abandonner = () => {
    this.setState({showNouveauApur: false, consulterApur: false});
  };

  onComposantSelected = () => {
  };

  onDateApurementChanged = (date) => {
    console.log(Utils.isSameThanNow(date, 'DD/MM/YYYY'));
    if (!Utils.isSameThanNow(date, 'DD/MM/YYYY')) {
      this.setState({showMotif: true});
    } else {
      this.setState({showMotif: false});
    }
    this.setState({dateApurement: date});
  };

  onApurementSelected = (apurement) => {
  };

  handleConfirmATButton = () => {
    let apurerAction = CreateApurementAction.requestManuel({
      type: ConstantsAt.CREATE_APUR_REQUEST,
      value: {
        atVO: this.props.initApurement.data,
      },
    });
    this.props.actions.dispatch(apurerAction);
    this.setState({showNouveauApur: false});
  };

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
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onScreenReloaded();
    });
  };

  componentWillUnmount() {
    this._unsubscribe();
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
      <View/>
    );
  };

  render() {
    const atVo = this.props.initApurement.data;
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
                  <BadrErrorMessage message={this.state.errorMessage}/>
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
                      hasId={true}
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
                            value={
                              this.props.initApurement.data.atEnteteVO
                                .bureauEntree.libelle
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
                              this.props.initApurement.data.atEnteteVO
                                .arrondEntree.libelle
                            }
                            disabled="true"
                            label={translate('at.apurement.arrondApurement')}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col size={50}>
                          <BadrDatePicker
                            dateFormat="DD/MM/YYYY"
                            onDateChanged={this.onDateApurementChanged}
                            inputStyle={styles.textInputsStyle}
                          />
                        </Col>
                        <Col size={50}/>
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
                                this.setState({motif: text})
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
                              this.setState({exportateur: text})
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
                        hasId={true}
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
                      <Col/>
                      <Col>
                        <Button
                          onPress={() => this.confirmer()}
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
                      <Col/>
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
                        <Col size={50}/>
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
                        hasId={true}
                        id="idComposant"
                        rows={
                          this.state.selectedApurement.apurementComposantVOs
                        }
                        cols={this.composantTablesColsConsult}
                        onItemSelected={() => {
                        }}
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
    initApurement: {...state.initApurementReducer},
  };
  return combinedState;
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Apurement);

const styles = {
  fabContainer: {
    height: '100%',
    // flex: 1,
    // justifyContent: 'flex-end',
  },
  badrActionsStyle: {justifyContent: 'flex-end'},
  messages: {justifyContent: 'center', alignItems: 'center'},
  btnActions: {margin: 2},
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
};
