import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {translate} from '../../../../common/translations/i18n';
import {primaryColor} from '../../../../styles/index';
import {CustomStyleSheet} from '../../../../styles';
import {InfoCommon} from '../common/';
import {connect} from 'react-redux';
import {Col, Row} from 'react-native-easy-grid';
import _ from 'lodash';
import * as InitApurementAction from '../../../../redux/actions/at/apurement';
import * as CreateApurementAction from '../../../../redux/actions/at/createApurement';
import * as ConstantsAt from '../../../../common/constants/at/at';

/** Utils */
import Utils from '../../../../common/util';

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
} from '../../../../components';

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
      this.scroll.scrollTo({x: 0, y: 0, animated: true});
      this.setState({
        errorMessage: translate('at.apurement.mandatory.dateApurement'),
      });
    }
  };

  confirmer = () => {
    if (this.state.dateApurement && this.componentsAapurer.length > 0) {
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
        errorMessage: translate('at.apurement.mandatory.fields'),
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

  onComposantSelected = () => {};

  onDateApurementChanged = (date) => {
    if (!Utils.isSameThanNow(date, 'DD/MM/YYYY')) {
      this.setState({showMotif: true});
    } else {
      this.setState({showMotif: false});
    }
    this.setState({dateApurement: date});
  };

  onApurementSelected = (apurement) => {};

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

  onExportateurChanged = (text) => {
    this.setState({exportateur: text});
  };
  onMotifTextChanged = (text) => {
    this.setState({motif: text});
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

  render() {
    console.log(this.props);
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

          {this.props.initApurement.showProgress && <BadrProgressBar />}
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
                  <BadrErrorMessage message={this.state.errorMessage} />
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
                  <AtForm
                    readonly={false}
                    onDateApurementChanged={this.onDateApurementChanged}
                    bureauApur={
                      this.props.initApurement.data.atEnteteVO.bureauEntree
                        .libelle
                    }
                    arrondApur={
                      this.props.initApurement.data.atEnteteVO.arrondEntree
                        .libelle
                    }
                    motifDateApur={this.state.motif}
                    onMotifTextChanged={this.onMotifTextChanged}
                    showMotif={this.state.showMotif}
                    exportateur={this.state.exportateur}
                    onExportateurChanged={this.onExportateurChanged}
                  />
                  <AtComposants
                    onRef={(ref) => (this.badrComposantsTable = ref)}
                    rows={this.props.initApurement.data.composantsApures}
                    cols={this.composantTablesCols}
                    onItemSelected={this.onComposantSelected}
                    totalElements={
                      this.props.initApurement.data.composantsApures
                        ? this.props.initApurement.data.composantsApures.length
                        : 0
                    }
                  />

                  <AtConfirmBlock
                    onConfirmer={this.confirmer}
                    onAbondonner={this.abandonner}
                  />
                </CardBox>
              )}

              {this.state.consulterApur && (
                <CardBox style={styles.cardBox}>
                  <AtForm
                    readonly={true}
                    bureauApur={this.state.selectedApurement.bureauApur.libelle}
                    arrondApur={this.state.selectedApurement.arrondApur.libelle}
                    dateApurement={this.state.selectedApurement.dateApurement}
                    motifDateApur={this.state.selectedApurement.motifDateApur}
                    showMotif={
                      this.state.selectedApurement.motifDateApur !== null
                    }
                    exportateur={
                      this.state.selectedApurement.apurementComposantVOs &&
                      this.state.selectedApurement.apurementComposantVOs
                        .length > 0
                        ? this.state.selectedApurement.apurementComposantVOs[0]
                            .exportateur
                        : ''
                    }
                  />
                  <AtComposants
                    onRef={(ref) => (this.badrComposantsTable = ref)}
                    rows={this.state.selectedApurement.apurementComposantVOs}
                    cols={this.composantTablesColsConsult}
                    onItemSelected={() => {}}
                    totalElements={
                      this.state.selectedApurement.apurementComposantVOs
                        ? this.state.selectedApurement.apurementComposantVOs
                            .length
                        : 0
                    }
                  />
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

const AtConfirmBlock = (props) => {
  return (
    <View style={styles.actionsContainer}>
      <Row size={4}>
        <Col />
        <Col>
          <Button
            onPress={() => props.onConfirmer()}
            icon="check"
            mode="contained"
            style={styles.btnActions}>
            {translate('transverse.confirmer')}
          </Button>
        </Col>
        <Col size={1}>
          <Button
            onPress={() => props.onAbandonner()}
            icon="autorenew"
            mode="contained"
            style={styles.btnActions}>
            {translate('transverse.abandonner')}
          </Button>
        </Col>
        <Col />
      </Row>
    </View>
  );
};

const AtComposants = (props) => {
  return (
    <CardsWithTitle title={translate('at.apurement.titleTableauCompo')}>
      <View style={styles.flexDirectionRow}>
        <BadrTable
          onRef={props.onRef}
          hasId={true}
          id="idComposant"
          rows={props.rows}
          cols={props.cols}
          onItemSelected={props.onComposantSelected}
          totalElements={props.totalElements}
          maxResultsPerPage={5}
          paginate={true}
        />
      </View>
    </CardsWithTitle>
  );
};

const AtForm = (props) => {
  return (
    <CardsWithTitle title={translate('at.apurement.title')}>
      <View>
        <Row size={100}>
          <Col size={50}>
            <TextInput
              style={styles.textInputsStyle}
              mode="outlined"
              value={props.bureauApur}
              disabled="true"
              label={translate('at.apurement.bureauApurement')}
            />
          </Col>
          <Col size={50}>
            <TextInput
              style={styles.textInputsStyle}
              underlineColor={primaryColor}
              mode="outlined"
              value={props.arrondApur}
              disabled="true"
              label={translate('at.apurement.arrondApurement')}
            />
          </Col>
        </Row>

        <Row>
          <Col size={50}>
            {props.readonly && (
              <TextInput
                style={styles.textInputsStyle}
                underlineColor={primaryColor}
                mode="outlined"
                value={props.dateApurement}
                label={translate('at.apurement.dateApurement')}
                disabled={props.readonly}
              />
            )}
            {!props.readonly && (
              <BadrDatePicker
                dateFormat="DD/MM/YYYY"
                onDateChanged={props.onDateApurementChanged}
                inputStyle={styles.textInputsStyle}
              />
            )}
          </Col>
          <Col size={50} />
        </Row>

        <Row>
          <Col size={100}>
            <View>
              {props.showMotif ? (
                buildMotif(
                  props.readonly,
                  props.motifDateApur,
                  props.onMotifTextChanged,
                )
              ) : (
                <></>
              )}
            </View>
          </Col>
        </Row>

        <Row size={100}>
          <Col size={50}>
            <TextInput
              style={styles.textInputsStyle}
              underlineColor={primaryColor}
              mode="outlined"
              value={translate('at.apurement.reexportation')}
              disabled={props.readonly}
              label={translate('at.apurement.mode')}
            />
          </Col>
          <Col size={50}>
            {props.readonly && (
              <TextInput
                style={styles.textInputsStyle}
                underlineColor={primaryColor}
                mode="outlined"
                disabled={props.readonly}
                value={props.exportateur}
                label={translate('at.apurement.exportateur')}
              />
            )}
            {!props.readonly && (
              <TextInput
                style={styles.textInputsStyle}
                underlineColor={primaryColor}
                mode="outlined"
                onChangeText={(text) => props.onExportateurChanged(text)}
                value={props.exportateur}
                label={translate('at.apurement.exportateur')}
              />
            )}
          </Col>
        </Row>
      </View>
    </CardsWithTitle>
  );
};

const buildMotif = (readonly, motifDateApur, onMotifTextChanged) => {
  let motifComponent = <></>;
  if (motifDateApur && readonly) {
    motifComponent = (
      <TextInput
        disabled={readonly}
        multiline={true}
        numberOfLines={4}
        style={styles.textInputsStyle}
        underlineColor={primaryColor}
        mode="outlined"
        value={motifDateApur}
        label={translate('at.apurement.motif')}
      />
    );
  } else if (!readonly) {
    motifComponent = (
      <TextInput
        disabled={readonly}
        multiline={true}
        numberOfLines={4}
        style={styles.textInputsStyle}
        underlineColor={primaryColor}
        mode="outlined"
        onChangeText={(text) => onMotifTextChanged(text)}
        value={motifDateApur}
        label={translate('at.apurement.motif')}
      />
    );
  }
  return motifComponent;
};

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
