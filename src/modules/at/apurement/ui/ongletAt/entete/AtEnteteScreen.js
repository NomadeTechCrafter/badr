import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
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
import * as Constants from '../../../../../../commons/constants/components/ComBadrPickerConstants';
import * as badrPickerAction from '../../../../../../commons/state/actions/ComBadrPickerAction';
import * as ConstantsAt from '../../../state/atConstants';

/** Utils */
import ComUtils from '../../../../../../commons/utils/ComUtils';
/** Inmemory session */
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';

import {
  ComBadrToolbarComp,
  ComContainerComp,
  ComBadrCardBoxComp,
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
import AtVehiculeScreen from './AtVehiculeScreen';
import AtMotoQuadScreen from './AtMotoQuadScreen';

class AtEntete extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      typeComposant: ConstantsAt.CODE_TYPE_COMP_VEHICULE,
    };
    
  }



  componentDidMount = () => {
  };

  componentWillUnmount() {
  }

  handleTypeCompoChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      typeComposant: '',
    });
    if (selectedIndex !== 0) {
      this.setState({ typeComposant: selectedValue });
    }
  };

  render() {
    const atVo: any = this.props.data;
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
              {/* Admission Temporaire */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp
                  expanded={true}
                  title={translate('at.title')}>
                  <View style={styles.flexDirectionRow}>
                    <Row size={100}>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.modeAcquisition}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.modeAquisition')}
                        />
                      </Col>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.typeD16 == ConstantsAt.KEY_D16BIS ? ConstantsAt.D16BIS : ConstantsAt.D716}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.typeAT')}
                        />
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        <View >
                          <Checkbox.Item
                            status={atVo.atEnteteVO.frontalier ? 'checked' : 'unchecked'}
                            disabled={true}
                            label={translate('at.entete.frontalier')}
                            color={primaryColor}
                          />
                        </View>
                      </Col>
                      <Col size={100}></Col>
                    </Row>
                  </View>
                </ComAccordionComp>
              </ComBadrCardBoxComp>
              {/* Voyageur */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp
                  expanded={true}
                  title={translate('at.entete.voyageur')}>
                  <View style={styles.flexDirectionRow}>
                    <Row size={100}>
                      <Col size={100}>
                        <ComBadrPickerComp
                          notFetchDataDidMount={true}
                          disabled={true}
                          key="code"
                          style={CustomStyleSheet.badrPicker}
                          selectedValue={atVo.atEnteteVO.atVoyageurVO.typeIdentifiant}
                          titleStyle={CustomStyleSheet.badrPickerTitle}
                          title={translate('at.typeIdent')}
                          cle="code"
                          libelle="libelle"
                          module="AT"
                          command="getCmbTypeIdentVoy"
                          param={null}
                          typeService="SP"
                          storeWithKey="code"
                          storeLibelleWithKey="libelle"
                        />
                      </Col>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.atVoyageurVO.identifiant}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.identifiant')}
                        />
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.atVoyageurVO.paysPasseport}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.pays')}
                        />
                      </Col>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.atVoyageurVO.dateExpirationPass}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.dateExpiration')}
                        />
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.atVoyageurVO.nom}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.nom')}
                        />
                      </Col>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.atVoyageurVO.prenom}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.prenom')}
                        />
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.atVoyageurVO.numCin}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.numCIN')}
                        />
                      </Col>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.atVoyageurVO.numPasseport}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.numID')}
                        />
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.atVoyageurVO.dateNaissance}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.dateNaissance')}
                        />
                      </Col>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.atVoyageurVO.numeroTelephone}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.numTel')}
                        />
                      </Col>
                    </Row>
                  </View>
                </ComAccordionComp>
              </ComBadrCardBoxComp>
              {/* Vehicule / Moto */}
              {(!_.isEmpty(atVo.vehiculeVOs) || !_.isEmpty(atVo.motoQuadVOs)) &&
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComAccordionComp
                    expanded={true}
                    title={translate('at.composants.titleVehMoto')}>
                    <View style={styles.flexDirectionRow}>
                      <Row size={100}>
                        <Col size={100}>
                          <ComBadrPickerComp
                            notFetchDataDidMount={true}
                            key="code"
                            style={CustomStyleSheet.badrPicker}
                            titleStyle={CustomStyleSheet.badrPickerTitle}
                            title={translate('at.typeCompo')}
                            cle="code"
                            libelle="libelle"
                            module="AT"
                            command="getTypeComposantEntete"
                            selectedValue={ConstantsAt.CODE_TYPE_COMP_VEHICULE}
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
                          {this.state.typeComposant === ConstantsAt.CODE_TYPE_COMP_VEHICULE &&
                            <AtVehiculeScreen atVo={atVo} />
                          }
                        </Col>
                      </Row>
                      <Row size={100}>
                        <Col size={100}>
                          {this.state.typeComposant === ConstantsAt.CODE_TYPE_COMP_MOTO_QUAD &&
                            <AtMotoQuadScreen atVo={atVo} />
                          }
                        </Col>
                      </Row>
                    </View>
                  </ComAccordionComp>
                </ComBadrCardBoxComp>
              }
              {/* Delai AT */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp
                  expanded={true}
                  title={translate('at.entete.delaiAT')}>
                  <View style={styles.flexDirectionRow}>
                    <Row size={100}>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.dateDebutAT}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.dateDebutAt')}
                        />
                      </Col>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.dateFinCalculeAT}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.dateFinCalcule')}
                        />
                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        <TextInput
                          value={atVo.atEnteteVO.dateFinSaisieAT}
                          style={styles.margin3}
                          disabled="true"
                          underlineColor={primaryColor}
                          mode="outlined"
                          label={translate('at.entete.dateFinAutorise')}
                        />
                      </Col>
                      <Col size={100}>

                      </Col>
                    </Row>
                    <Row size={100}>
                      <Col size={100}>
                        {atVo.atEnteteVO.motifDateFin &&
                          <TextInput
                            value={atVo.atEnteteVO.motifDateFin}
                            style={styles.margin3}
                            disabled="true"
                            underlineColor={primaryColor}
                            mode="outlined"
                            label={translate('at.entete.motifDateFin')}
                          />
                        }
                      </Col>
                    </Row>
                  </View>
                </ComAccordionComp>
              </ComBadrCardBoxComp>
            </ComContainerComp>
          )}
        </ScrollView>
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
)(AtEntete);

const styles = StyleSheet.create({
  fabContainer: {
    height: '100%',
  },
  badrActionsStyle: { justifyContent: 'flex-end' },
  messages: { justifyContent: 'center', alignItems: 'center' },
  margin3: { margin: 3 },
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
