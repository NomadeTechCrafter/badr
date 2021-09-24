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
  arme: null,
  showDetail: false,
};

class AtArme extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = initialState;

    this.props.atVo.armeVOs.forEach((row) => {
      if (row.apure) {
        row.apureLib = 'Oui';
      } else {
        row.apureLib = 'Non';
      }
    });

    this.cols = [
      {
        code: 'serie',
        libelle: translate('at.composants.numSerie'),
        width: 100,
      },
      {
        code: 'marque',
        libelle: translate('at.composants.marque'),
        width: 125,
      },
      {
        code: 'type',
        libelle: translate('at.apurement.type'),
        width: 125,
      },
      {
        code: 'calibre',
        libelle: translate('at.composants.calibre'),
        width: 100,
      },
      {
        code: 'numAuto',
        libelle: translate('at.composants.numAutDgsn'),
        width: 100,
      },
      {
        code: 'dateDebut',
        libelle: translate('at.composants.dateDebutAut'),
        width: 100,
      },
      {
        code: 'dateFin',
        libelle: translate('at.composants.dateFinAut'),
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
        arme: row, showDetail: true
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
            {translate('at.composants.titleTabComposant')} : {this.props.atVo.armeVOs.length}
          </Text>
          <ComBasicDataTableComp
            ref="_badrTable"
            id="serie"
            rows={this.props.atVo.armeVOs}
            cols={this.cols}
            onItemSelected={this.onItemSelected}
            totalElements={this.props.atVo.armeVOs.length}
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
                      value={this.state.arme.serie}
                      disabled="true"
                      label={translate('at.composants.numSerie')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      mode="outlined"
                      value={this.state.arme.marque}
                      disabled="true"
                      label={translate('at.composants.marque')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.arme.type}
                      disabled="true"
                      label={translate('at.apurement.type')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.arme.calibre}
                      disabled="true"
                      label={translate('at.composants.calibre')}
                    />
                  </Col>
                </Row>
                <Row size={100}>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.arme.numAuto}
                      disabled="true"
                      label={translate('at.composants.numAutDgsn')}
                    />
                  </Col>
                </Row>

                <Row size={100}>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.arme.dateDebut}
                      disabled="true"
                      label={translate('at.composants.dateDebutAut')}
                    />
                  </Col>
                  <Col size={50}>
                    <TextInput
                      style={styles.textInputsStyle}
                      underlineColor={primaryColor}
                      mode="outlined"
                      value={this.state.arme.dateFin}
                      disabled="true"
                      label={translate('at.composants.dateFinAut')}
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
)(AtArme);

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
