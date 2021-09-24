import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Checkbox, RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { Col, Row } from 'react-native-easy-grid';

import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import * as ConstantsAt from '../../../state/atConstants';

/** Utils */
import ComUtils from '../../../../../../commons/utils/ComUtils';
/** Inmemory session */
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';

import {
  ComBadrToolbarComp,
  ComContainerComp,
  ComBadrCardBoxComp,
  ComBadrButtonRadioComp,
  ComBadrPickerComp,
  ComBadrItemsPickerComp,
  ComAccordionComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBasicDataTableComp,
  ComBadrCardWithTileComp,
  ComBadrDatePickerComp,
  ComBadrActionButtonComp,
} from '../../../../../../commons/component';
import moment from 'moment';

const initialState = {
  errorMessage: null,
  bateau: null,
  showDetail: false,
};


import AtEquipBatScreen from './AtEquipBatScreen';

class AtBateauPlaisance extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = initialState;

    this.props.atVo.bateauPlaisanceVOs.forEach((row) => {
      if (row.apure) {
        row.apureLib = 'Oui';
      } else {
        row.apureLib = 'Non';
      }
    });

    this.radioButtonsDataProc = [{
      id: '2',
      label: translate('at.composants.non'),
      value: 'false'
    },
    {
      id: '1',
      label: translate('at.composants.oui'),
      value: 'true'
    }]

    this.cols = [
      {
        code: 'matricule',
        libelle: translate('at.numMatricule'),
        width: 100,
      },
      {
        code: 'pavillion.libelle',
        libelle: translate('at.composants.pavillon'),
        width: 100,
      },
      {
        code: 'marque',
        libelle: translate('at.composants.marque'),
        width: 100,
      },
      {
        code: 'type',
        libelle: translate('at.apurement.type'),
        width: 100,
      },
      {
        code: 'portAttache.libelle',
        libelle: translate('at.composants.portAttache'),
        width: 125,
      },
      {
        code: 'dateHeureArrive',
        libelle: translate('at.composants.dateDeureArrivee'),
        width: 125,
      },
      {
        code: 'bureauEntree.libelle',
        libelle: translate('at.composants.bureauEntree'),
        width: 150,
      },
      {
        code: 'arrondEntree.libelle',
        libelle: translate('at.composants.arrondEntree'),
        width: 150,
      },
      {
        code: 'marine.libelle',
        libelle: translate('at.composants.marina'),
        width: 100,
      },
      {
        code: 'apureLib',
        libelle: translate('at.composants.apure'),
        width: 100,
      },
    ];
  }

  onItemSelected = (row) => {
    this.setState({
      ...initialState
    }, function () { // called by React after the state is updated
      this.setState({
        bateau: row, showDetail: true
      });
    });
  };

  abandonner = () => {
    this.setState({ showDetail: false });
  };

  componentDidMount = () => {
  };

  componentWillUnmount() {
  }

  render() {
    return (
      <View style={styles.fabContainer}>
        <ComBadrCardBoxComp style={styles.cardBox}>
          <Text style={styles.titleTab}>
            {translate('at.composants.titleTabComposant')} : {this.props.atVo.bateauPlaisanceVOs.length}
          </Text>
          <ComBasicDataTableComp
            ref="_badrTable"
            id="matricule"
            rows={this.props.atVo.bateauPlaisanceVOs}
            cols={this.cols}
            onItemSelected={this.onItemSelected}
            totalElements={this.props.atVo.bateauPlaisanceVOs.length}
            maxResultsPerPage={10}
            paginate={true}
            showProgress={this.props.showProgress}
          />
        </ComBadrCardBoxComp>
        {this.state.showDetail &&
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComBadrCardWithTileComp
              title={translate('at.composants.detail')}>
              <View>
                <Row size={100}>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.matricule}
                      disabled="true"
                      label={translate('at.numMatricule')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.bateau.pavillion.libelle}
                      disabled="true"
                      label={translate('at.composants.pavillon')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.bateau.serie}
                      disabled="true"
                      label={translate('at.composants.numSerie')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.bateau.marine.libelle}
                      disabled="true"
                      label={translate('at.composants.marina')}
                    />
                  </Col>
                </Row>

                <Row size={100}>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.bureauEntree.libelle}
                      disabled="true"
                      label={translate('at.composants.bureauEntree')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.arrondEntree.libelle}
                      disabled="true"
                      label={translate('at.composants.arrondEntree')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.numMoto1}
                      disabled="true"
                      label={translate('at.composants.numMoteur1')}
                    />
                  </Col>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.numMoto2}
                      disabled="true"
                      label={translate('at.composants.numMoteur2')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.numMoto3}
                      disabled="true"
                      label={translate('at.composants.numMoteur3')}
                    />
                  </Col>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.numMoto4}
                      disabled="true"
                      label={translate('at.composants.numMoteur4')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.marque}
                      disabled="true"
                      label={translate('at.composants.marque')}
                    />
                  </Col>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.type}
                      disabled="true"
                      label={translate('at.apurement.type')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.portAttache.libelle}
                      disabled="true"
                      label={translate('at.composants.portAttache')}
                    />
                  </Col>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.acteNationale}
                      disabled="true"
                      label={translate('at.composants.acteNationale')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.nomBapteme}
                      disabled="true"
                      label={translate('at.composants.nomBapteme')}
                    />
                  </Col>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.jaugeBrute}
                      disabled="true"
                      label={translate('at.composants.jaugeBrute')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.propDeclare}
                      disabled="true"
                      label={translate('at.composants.propDeclare')}
                    />
                  </Col>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.provenance.libelle}
                      disabled="true"
                      label={translate('at.composants.provenance')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      multiline={true}
                      numberOfLines={4}
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.adresse}
                      disabled="true"
                      label={translate('at.composants.adresse')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.dateHeureArrive}
                      disabled="true"
                      label={translate('at.composants.dateDeureArrivee')}
                    />
                  </Col>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.dateHeureDepart}
                      disabled="true"
                      label={translate('at.composants.dateHeureDepart')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.destination}
                      disabled="true"
                      label={translate('at.composants.destination')}
                    />
                  </Col>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.couleur}
                      disabled="true"
                      label={translate('at.composants.couleur')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.tonnage}
                      disabled="true"
                      label={translate('at.composants.tonnage')}
                    />
                  </Col>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.longeur}
                      disabled="true"
                      label={translate('at.composants.longueur')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.bateau.profondeur}
                      disabled="true"
                      label={translate('at.composants.profondeur')}
                    />
                  </Col>
                  <Col size={100}>
                    <ComBadrButtonRadioComp
                      disabled={true}
                      value={String(this.state.bateau.procuration)}
                      title={translate('at.composants.procuration')}
                      radioButtonsData={this.radioButtonsDataProc}
                    />
                  </Col>
                </Row>
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComBadrCardWithTileComp
                    title={translate('at.composants.titleTabEquip')}>
                    <AtEquipBatScreen bateau={this.state.bateau} />
                  </ComBadrCardWithTileComp>
                </ComBadrCardBoxComp>
                <Row>
                  <Col />
                  <Col>
                    <Button
                      onPress={() => this.abandonner()}
                      mode="contained"
                      style={styles.btnActions}>
                      {translate('transverse.abandonner')}
                    </Button>
                  </Col>
                  <Col />
                </Row>
              </View>
            </ComBadrCardWithTileComp>
          </ComBadrCardBoxComp>
        }
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.atConsulterReducer };
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
)(AtBateauPlaisance);

const styles = StyleSheet.create({
  fabContainer: {
    height: '100%',
  },
  textInputsStyle: {
    padding: 5,
  },
  titleTab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    ...CustomStyleSheet.badrPickerTitle,
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
  },
  btnActions: { margin: 2 },
});
