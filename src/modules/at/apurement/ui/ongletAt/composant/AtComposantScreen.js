import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { Col, Row } from 'react-native-easy-grid';

import InfoCommon from '../common/AtInfoCommonScreen';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import * as CreateApurementAction from '../../../state/actions/atApurementCreateAction';
import * as InitApurementAction from '../../../state/actions/atApurementInitAction';
import * as ConstantsAt from '../../../state/atConstants';

/** Utils */
import ComUtils from '../../../../../../commons/utils/ComUtils';
/** Inmemory session */
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';
import AtRemorqueScreen from './AtRemorqueScreen';
import AtJetSkiScreen from './AtJetSkiScreen';
import AtArmeScreen from './AtArmeScreen';
import AtEnginVolantScreen from './AtEnginVolantScreen';
import AtMarchandiseScreen from './AtMarchandiseScreen';
import AtBateauPlaisanceScreen from './AtBateauPlaisanceScreen';


import {
  ComBadrToolbarComp,
  ComContainerComp,
  ComBadrCardBoxComp,
  ComBadrPickerComp,
  ComAccordionComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBasicDataTableComp,
  ComBadrCardWithTileComp,
  ComBadrDatePickerComp,
  ComBadrActionButtonComp,
} from '../../../../../../commons/component';
import moment from 'moment';

class AtComposant extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      typeComposant: ConstantsAt.CODE_TYPE_COMP_REMORQUE,
    };
    this.cols = [
      {
        code: 'typeComposant',
        libelle: translate('at.typeCompo'),
        width: 300,
      },
      {
        code: 'nombre',
        libelle: translate('at.composants.nombre'),
        width: 100,
      },

    ];
  }

  handleTypeCompoChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      typeComposant: '',
    });
    if (selectedIndex !== 0) {
      this.setState({ typeComposant: selectedValue });
    }
  };

  componentDidMount = () => {
  };

  componentWillUnmount() {
  }

  render() {
    let atVo;
    if (!_.isEmpty(this.props.initApurement?.data)) {
      atVo = this.props.initApurement.data;
    } else {
      atVo = this.props.atConsulter.data;
    }
    this.rows = [
      {
        typeComposant: translate('at.composants.vehicule'),
        nombre: atVo.vehiculeVOs ? atVo.vehiculeVOs.length : 0,
      },
      {
        typeComposant: translate('at.composants.motoQuad'),
        nombre: atVo.motoQuadVOs ? atVo.motoQuadVOs.length : 0,
      },
      {
        typeComposant: translate('at.composants.remorque'),
        nombre: atVo.remorqueVOs ? atVo.remorqueVOs.length : 0,
      },
      {
        typeComposant: translate('at.composants.arme'),
        nombre: atVo.armeVOs ? atVo.armeVOs.length : 0,
      },
      {
        typeComposant: translate('at.composants.enginVolant'),
        nombre: atVo.droneVOs ? atVo.droneVOs.length : 0,
      },
      {
        typeComposant: translate('at.composants.jetsky'),
        nombre: atVo.jetSkiVOs ? atVo.jetSkiVOs.length : 0,
      },
      {
        typeComposant: translate('at.composants.bateauPlaisance'),
        nombre: atVo.bateauPlaisanceVOs ? atVo.bateauPlaisanceVOs.length : 0,
      },
      {
        typeComposant: translate('at.composants.marchandise'),
        nombre: atVo.marchandiseVOs ? atVo.marchandiseVOs.length : 0,
      },
    ];
    return (
      <View style={styles.fabContainer}>
        <ScrollView
          ref={(c) => {
            this.scroll = c;
          }}>


          {atVo != null && atVo.atEnteteVO != null && (
            <ComContainerComp>
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
                etatValidation={atVo.atEnteteVO.etatValidation}
              />

              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp
                  expanded={true}
                  title={translate('at.composants.titleTabRecComp')}>
                  <View style={styles.flexDirectionRow}>
                    <ComBasicDataTableComp
                      ref="_badrTable"
                      id="matricule"
                      rows={this.rows}
                      cols={this.cols}
                      onItemSelected={this.onItemSelected}
                      maxResultsPerPage={10}
                      paginate={true}
                      showProgress={this.props.showProgress}
                    />
                  </View>
                </ComAccordionComp>
              </ComBadrCardBoxComp>
              <ComBadrCardBoxComp style={styles.cardBox}>
                  <View style={styles.flexDirectionRow} style= {styles.viewComp}>
                    <Row size={100}>
                      <Col size={100}>
                        <ComBadrPickerComp
                          onRef={(ref) => (this.cmbTypeCompoComp = ref)}
                          key="cmbTypeCompoComp"
                          style={CustomStyleSheet.badrPicker}
                          titleStyle={CustomStyleSheet.badrPickerTitle}
                          title={translate('at.typeCompo')}
                          cle="code"
                          libelle="libelle"
                          module="AT"
                          command="getTypeComposantCompo"
                          selectedValue={ConstantsAt.CODE_TYPE_COMP_REMORQUE}
                          onValueChange={(selectedValue, selectedIndex, item) =>
                            this.handleTypeCompoChanged(
                              selectedValue,
                              selectedIndex,
                              item,
                            )
                          }
                          param={null}
                          typeService="SP"
                          storeWithKey="code"
                          storeLibelleWithKey="libelle"
                        />
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        {this.state.typeComposant === ConstantsAt.CODE_TYPE_COMP_REMORQUE &&
                          <AtRemorqueScreen atVo={atVo} />
                        }
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        {this.state.typeComposant === ConstantsAt.CODE_TYPE_COMP_JET_SKI &&
                          <AtJetSkiScreen atVo={atVo} />
                        }
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        {this.state.typeComposant === ConstantsAt.CODE_TYPE_COMP_BATEAU_PLAISANCE &&
                          <AtBateauPlaisanceScreen atVo={atVo} />
                        }
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        {this.state.typeComposant === ConstantsAt.CODE_TYPE_COMP_ARME &&
                          <AtArmeScreen atVo={atVo} />
                        }
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        {this.state.typeComposant === ConstantsAt.CODE_TYPE_COMP_DRONE &&
                          <AtEnginVolantScreen atVo={atVo} />
                        }
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        {this.state.typeComposant === ConstantsAt.CODE_TYPE_COMP_MARCHANDISE &&
                          <AtMarchandiseScreen atVo={atVo} />
                        }
                      </Col>
                    </Row>

                  </View>
              </ComBadrCardBoxComp>
            </ComContainerComp>
          )}
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  const combinedState = {
    initApurement: { ...state.initApurementReducer },
    atConsulter: { ...state.atConsulterReducer },
  };
  return combinedState;
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
)(AtComposant);

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
  viewComp: {
    padding : 10,
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
  },
  flexDirectionRow: {
    // flexDirection: 'row',
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
