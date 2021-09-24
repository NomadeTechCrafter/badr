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
  remorque: null,
  showDetail: false,
};

class AtRemorque extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = initialState;

    this.props.atVo.remorqueVOs.forEach((row) => {
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
        code: 'type.libelle',
        libelle: translate('at.apurement.type'),
        width: 100,
      },
      {
        code: 'marque',
        libelle: translate('at.composants.marque'),
        width: 150,
      },
      {
        code: 'poids',
        libelle: translate('at.composants.poids'),
        width: 100,
      },
      {
        code: 'dimension',
        libelle: translate('at.composants.description'),
        width: 200,
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
        remorque: row, showDetail: true
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
            {translate('at.composants.titleTabComposant')} : {this.props.atVo.remorqueVOs.length}
          </Text>
          <ComBasicDataTableComp
            ref="_badrTable"
            id="matricule"
            rows={this.props.atVo.remorqueVOs}
            cols={this.cols}
            onItemSelected={this.onItemSelected}
            totalElements={this.props.atVo.remorqueVOs.length}
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
                      value={this.state.remorque.matricule}
                      disabled="true"
                      label={translate('at.numMatricule')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.remorque.paysMatricule ?
                        this.state.remorque.paysMatricule.libelle : ''}
                      disabled="true"
                      label={translate('at.pays')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.remorque.type.libelle}
                      disabled="true"
                      label={translate('at.apurement.type')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.remorque.marque}
                      disabled="true"
                      label={translate('at.composants.marque')}
                    />
                  </Col>
                </Row>

                <Row size={100}>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.remorque.poids}
                      disabled="true"
                      label={translate('at.composants.poids')}
                    />
                  </Col>
                  <Col size={50}>
                    <ComBadrButtonRadioComp
                      disabled={true}
                      value={String(this.state.remorque.procuration)}
                      title={translate('at.composants.procuration')}
                      radioButtonsData={this.radioButtonsDataProc}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={100}>
                    <TextInput
                      style={styles.textInputsStyle}
                      multiline={true}
                      numberOfLines={4}
                      mode="outlined"
                      value={this.state.remorque.dimension}
                      disabled="true"
                      label={translate('at.composants.description')}
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
)(AtRemorque);

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
