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
  vehicule: null,
  showDetail: false,
};

class AtVehicule extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = initialState;

    this.props.atVo.vehiculeVOs.forEach((row) => {
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
        code: 'paysMatricule.libelle',
        libelle: translate('at.pays'),
        width: 100,
      },
      {
        code: 'numChassis',
        libelle: translate('at.composants.numChassis'),
        width: 150,
      },
      {
        code: 'genre.libelle',
        libelle: translate('at.composants.genre'),
        width: 100,
      },
      {
        code: 'marque',
        libelle: translate('at.composants.marqueModele'),
        width: 150,
      },
      {
        code: 'datePmc',
        libelle: translate('at.composants.datePMC'),
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
        vehicule: row, showDetail: true
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
            {translate('at.composants.titleTabComposant')} : {this.props.atVo.vehiculeVOs.length}
          </Text>
          <ComBasicDataTableComp
            ref="_badrTable"
            id="matricule"
            rows={this.props.atVo.vehiculeVOs}
            cols={this.cols}
            onItemSelected={this.onItemSelected}
            totalElements={this.props.atVo.vehiculeVOs.length}
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
                      value={this.state.vehicule.matricule}
                      disabled="true"
                      label={translate('at.numMatricule')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.vehicule.paysMatricule.libelle}
                      disabled="true"
                      label={translate('at.pays')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={50}>
                    <ComBadrButtonRadioComp
                      disabled={true}
                      value={String(this.state.vehicule.procuration)}
                      title={translate('at.composants.procuration')}
                      radioButtonsData={this.radioButtonsDataProc}
                    />
                  </Col>
                </Row>

                <Row size={100}>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.vehicule.numChassis}
                      disabled="true"
                      label={translate('at.composants.numChassis')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.vehicule.genre.libelle}
                      disabled="true"
                      label={translate('at.composants.genre')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.vehicule.marque}
                      disabled="true"
                      label={translate('at.composants.marqueModele')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.vehicule.datePmc}
                      disabled="true"
                      label={translate('at.composants.datePMC')}
                    />
                  </Col>
                </Row>
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
)(AtVehicule);

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
