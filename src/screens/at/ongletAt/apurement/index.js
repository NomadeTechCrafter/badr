import React from 'react';
import {View, Dimensions} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {translate} from '../../../../common/translations/i18n';
import {primaryColor} from '../../../../styles/index';
import {CustomStyleSheet} from '../../../../styles';
import {InfoCommon} from '../common/';
import {connect} from 'react-redux';
import {Col, Row} from 'react-native-easy-grid';
import _ from 'lodash';
import * as InitApurementAction from '../../../../redux/actions/at/initApurement';
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
  BadrFloatingButton,
} from '../../../../components';

const screenHeight = Dimensions.get('window').height;

const buildComposantsColumns = (reference) => {
  return [
    {
      code: 'typeComposant',
      libelle: 'Type composant',
      width: 200,
    },
    {
      code: 'informationAffichee',
      libelle: 'Information affichée',
      width: 300,
    },
    {
      code: 'modeApur.libelle',
      libelle: 'Mode apurement',
      width: 250,
    },
    {
      code: '',
      libelle: 'Selectionner',
      width: 200,
      component: 'checkbox',
      action: (row, index) => reference.onComponentChecked(row, index),
    },
  ];
};

const buildApurementsColumns = (reference) => {
  return [
    {
      code: 'bureauApur.libelle',
      libelle: 'Bureau apurement',
      width: 150,
    },
    {
      code: 'arronfApur.libelle',
      libelle: 'Arrondissement apurement',
      width: 180,
    },
    {
      code: 'typeComposantApur',
      libelle: 'Type composants apurés',
      width: 250,
    },
    {
      code: 'dateApurement',
      libelle: 'Date apurement',
      width: 140,
    },

    {
      code: '',
      libelle: '',
      width: 100,
      component: 'button',
      icon: 'delete-outline',
      action: (row, index) => reference.onApurementDeleted(row, index),
    },
  ];
};

class Apurement extends React.Component {
  defaultState = {
    showNouveauApur: false,
    showErrorMsg: false,
    exportateur: '',
    dateApurement: '',
    showMotif: false,
    motif: '',
  };
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.componentsAapurer = [];
    this.composantTablesCols = buildComposantsColumns(this);
    this.apurementsCols = buildApurementsColumns(this);
  }

  onComponentChecked = (row, index) => {
    let item = this.props.data.composantsApures[index];
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
  };

  confirmer = () => {
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
  };

  onApurementDeleted = (row, index) => {
    let actionRemove = InitApurementAction.remove({
      type: ConstantsAt.PREPARE_APUR_REMOVE,
      value: {
        index: index,
      },
    });
    this.props.actions.dispatch(actionRemove);
  };

  nouveauApurement = () => {
    this.setState({showNouveauApur: true});
  };

  abandonner = () => {
    this.setState({showNouveauApur: false});
  };

  onComposantSelected = () => {};

  onDateApurementChanged = (date) => {
    if (Utils.isDateBiggerThanNow(date, 'DD/MM/YYYY')) {
      this.setState({showMotif: true});
    } else {
      this.setState({showMotif: false});
    }
    this.setState({dateApurement: date});
  };

  onApurementSelected = (apurement) => {};

  handleConfirmATButton = () => {
    console.log('Confirmation');
  };

  componentDidMount = () => {
    this.componentsAapurer = [];
  };

  render() {
    const atVo = this.props.data;
    return (
      <View style={styles.fabContainer}>
        <Toolbar
          navigation={this.props.navigation}
          title={translate('at.title')}
          subtitle={translate('at.apurement.title')}
          icon="menu"
        />
        {atVo != null && atVo.atEnteteVO != null && (
          <Container>
            {this.props.showProgress && (
              <BadrProgressBar width={screenHeight} />
            )}
            {this.props.errorMessage != null && (
              <BadrErrorMessage message={this.props.errorMessage} />
            )}
            {this.props.successMessage != null && (
              <BadrInfoMessage message={this.props.successMessage} />
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
                      this.props.data.apurementVOs
                        ? this.props.data.apurementVOs
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
            {!this.state.showNouveauApur && (
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
                            this.props.data.atEnteteVO.bureauEntree.libelle
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
                            this.props.data.atEnteteVO.arrondEntree.libelle
                          }
                          disabled="true"
                          label={translate('at.apurement.arrondApurement')}
                        />
                      </Col>
                    </Row>

                    <Row size={100}>
                      <Col size={50}>
                        <BadrDatePicker
                          dateFormat="DD/MM/YYYY"
                          onDateChanged={this.onDateApurementChanged}
                          inputStyle={styles.textInputsStyle}
                        />
                      </Col>
                      <Col size={50}>
                        {this.state.showMotif && (
                          <TextInput
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
                      rows={this.props.data.composantsApures}
                      cols={this.composantTablesCols}
                      onItemSelected={this.onComposantSelected}
                      totalElements={this.props.data.composantsApures.length}
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
                    <Col />
                  </Row>
                </View>
              </CardBox>
            )}
          </Container>
        )}
        <BadrFloatingButton
          visible={
            this.props.data &&
            this.props.data.apurementVOs &&
            this.props.data.apurementVOs.length > 0
          }
          onConfirm={this.handleConfirmATButton}
          icon="check"
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.initApurementReducer};
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
    flex: 1,
    justifyContent: 'flex-end',
  },
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
