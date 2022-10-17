import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';

import {
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComBadrListComp,
  ComBadrLibelleComp,
  ComBadrNumericTextInputComp,
  ComBadrPopupComp,
  ComBasicDataTableComp,
  ComBadrDatePickerComp,
  ComBadrAutoCompleteComp,
  ComBadrButtonIconComp,
  ComBadrAlphabetPickerComp,
} from '../../../../commons/component';
import {
  Checkbox,
  TextInput,
  Text,
  RadioButton,
  Paragraph,
  TouchableRipple,
  Button,
  IconButton,
} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';

import {load} from '../../../services/storage-service';
import {connect} from 'react-redux';
import RechercheEcorImport from '../rechercheEcorImport';
import rechercheRefDumReducer from '../../../../commons/state/reducers/rechercheDum';
import style from '../../../../modules/referentiel/plaquesImmatriculation/style/refPlaquesImmStyle';
import {alphabetAr} from '../../../../modules/referentiel/plaquesImmatriculation/state/refPlaquesImmConstants';
const screenHeight = Dimensions.get('window').height;

class AddEnlevements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClose = () => {
    console.log('test---');
    this.props.onCloseAddEnlevements;
  };

  render() {
 
    return (
      this.props.visible && (
        <View style={CustomStyleSheet.fullContainer}>
          <ComContainerComp
            ContainerRef={(ref) => {
              this.scrollViewRef = ref;
            }}>
            {this.props.showProgress && <ComBadrProgressBarComp />}

            {this.props.errorMessage != null && (
              <ComBadrErrorMessageComp message={this.props.errorMessage} />
            )}
            {this.props.successMessage != null && (
              <ComBadrInfoMessageComp message={this.props.successMessage} />
            )}

            {/* Accordion Déclaration Sommaire */}
            <ComBadrCardBoxComp style={styles.cardBox}>
              <ComAccordionComp
                title={translate('ecorimport.declarationSommaire.title')}>
                <Grid>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                          'ecorimport.declarationSommaire.typeDeclaration',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {/*itemEcor.referenceDS.refTypeDS.descriptionTypeDS*/}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrButtonIconComp
                        onPress={() => {}}
                        icon="file-eye"
                        loading={this.props.showProgress}
                        text={translate(
                          'ecorimport.declarationSommaire.choisirLotDedouanement',
                        )}
                      />
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                          'ecorimport.declarationSommaire.referenceDeclaration',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.bureau')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.regime')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.annee')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.serie')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.cle')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={2} />
                    <Col size={2}>
                      <ComBadrLibelleComp>{''}</ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp>{''}</ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp>{''}</ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp>{''}</ComBadrLibelleComp>
                    </Col>
                    <Col size={1}>
                      <ComBadrLibelleComp>{''}</ComBadrLibelleComp>
                    </Col>
                  </Row>
                </Grid>
              </ComAccordionComp>
            </ComBadrCardBoxComp>

            {/* Accordion Lot de dédouanement */}
            <ComBadrCardBoxComp style={styles.cardBox}>
              <ComAccordionComp
                title={translate('ecorimport.lotDedouanement.title')}>
                <Grid>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.lieuChargement')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {/*itemEcor.referenceDS.refTypeDS.descriptionTypeDS*/}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.referenceLot')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {/*itemEcor.referenceDS.refTypeDS.descriptionTypeDS*/}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('transverse.nature')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {/*itemEcor.referenceDS.refTypeDS.descriptionTypeDS*/}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('ecorimport.lotDedouanement.marque')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {/*itemEcor.referenceDS.refTypeDS.descriptionTypeDS*/}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                </Grid>
              </ComAccordionComp>
            </ComBadrCardBoxComp>

            {/* Accordion Marchandises Enlevées */}
            <ComBadrCardBoxComp style={styles.cardBox}>
              <ComAccordionComp
                title={translate('ecorimport.marchandisesEnlevees.title')}
                extraFieldKey={translate('ecorimport.agentEcoreur')}
                extraFieldValue={translate('ecorimport.agentEcoreur')}>
                <Grid>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                          'ecorimport.marchandisesEnlevees.lieuStockage',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      <ComBadrAlphabetPickerComp
                        selectedValue={this.state.vehiculeNumImmat2}
                        items={alphabetAr}
                        onValueChanged={(v, i) =>
                          this.onAlphabetPickerChanged(v, i)
                        }
                      />
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('ecorimport.enleverMarchandise.nombreColis')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      <TextInput
                        mode="outlined"
                        style={style.columnThree}
                        label=""
                        value={this.state.vehiculeNumImmat3}
                        onChangeText={(text) =>
                          this.setState({vehiculeNumImmat3: text})
                        }
                      />
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                          'ecorimport.enleverMarchandise.numBonSortie',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <TextInput
                        mode="outlined"
                        style={style.columnThree}
                        label=""
                        value={this.state.vehiculeNumImmat3}
                        onChangeText={(text) =>
                          this.setState({vehiculeNumImmat3: text})
                        }
                      />
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                          'ecorimport.marchandisesEnlevees.delivrePar',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                          'ecorimport.marchandisesEnlevees.immatriculationsVehicules',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      <TextInput
                        mode="outlined"
                        style={style.columnThree}
                        label=""
                        value={this.state.vehiculeNumImmat3}
                        onChangeText={(text) =>
                          this.setState({vehiculeNumImmat3: text})
                        }
                        numberOfLines={6}
                      />
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                          'ecorimport.marchandisesEnlevees.dateHeureEffectiveEnlevement',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      <ComBadrDatePickerComp
                        dateFormat="DD/MM/YYYY"
                        onDateChanged={this.onDateApurementChanged}
                        onTimeChange={this.onTimeChanged}
                        inputStyle={styles.textInputsStyle}
                      />
                    </Col>
                  </Row>
                </Grid>
              </ComAccordionComp>
            </ComBadrCardBoxComp>

            {/* Actions */}
            <ComBadrButtonIconComp
              onPress={this.props.onCloseAddEnlevements}
              icon="close-circle-outline"
              loading={this.props.showProgress}
              text={translate('transverse.quitter')}
            />
          </ComContainerComp>
        </View>
      )
    );
  }
}

const libelle = {
  fontSize: 14,
  color: '#006acd',
};

const styles = {
  cardBoxInfoDum: {
    flexDirection: 'column',
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  containerActionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  libelleS: {
    ...libelle,
    flex: 1,
  },
  libelleM: {
    ...libelle,
    flex: 2,
  },
  libelleL: {
    ...libelle,
    flex: 3,
  },
  decisionContainerRB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: primaryColor,
    padding: 8,
    width: 300,
  },
  checkboxCol: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  textRadio: {
    color: '#FFF',
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: 200,
  },
  rowListNumScelle: {
    height: 170,
  },
  borderCol: {
    borderLeftColor: '#f1f1f1',
    borderLeftWidth: 2,
  },
};

export default AddEnlevements;
