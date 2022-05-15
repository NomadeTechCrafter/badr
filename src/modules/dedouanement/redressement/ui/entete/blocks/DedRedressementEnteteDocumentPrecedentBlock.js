import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { IconButton, TextInput } from 'react-native-paper';
import {
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
  ComBadrLibelleComp
} from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import styles from '../../../style/DedRedressementStyle';
import DedRedressementRow from '../../common/DedRedressementRow';

class DedRedressementEnteteDocumentPrecedentBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dedDumVo: this.props.data,
      dedDumSectionEnteteVO: this.props.data?.dedDumSectionEnteteVO,
      showDateEtablissementTransit: false,
      dateEtablissementTransit: new Date()
    };

  }

  componentDidMount() { }


  onDateEtablissementTransitChange = (event, selectedDate) => {
    if (!_.isUndefined(event.nativeEvent.timestamp)) {
      let dedDum = {
        ...this.state.dedDumVo, dedDumSectionEnteteVO: {
          ...this.state.dedDumVo.dedDumSectionEnteteVO,
          dateEtablissementTransit:  moment(event.nativeEvent.timestamp).format('DD/MM/YYYY')
        }}
      
      this.setState({
        dedDumVo: dedDum, showDateEtablissementTransit: false, dateEtablissementTransit: event.nativeEvent.timestamp


        
      });
      this.props.update(dedDum);
    }
  }
  getTypesDocuments = () => {
    return [
      { code: 'false', libelle: translate('dedouanement.info.dum') },
      { code: 'true', libelle: translate('dedouanement.info.carnetTir') },

    ];
  };

  handleDocumentTypeChanged = (type, index) => {
    let dedDum = {
      ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumSectionEnteteVO, typeDocument: '', bureauTransit: '', regimeTransit: '', anneeTransit: '', serieTransit: '', cleTransit: '', numVoyageTransit: '', refTransit: '', numVoletTransit: '', numVoletTransit: '', dateEtablissementTransit: '' }
    };
    let dedDumSectionEntete= { ...this.state.dedDumSectionEnteteVO, typeDocument: '', bureauTransit: '', regimeTransit: '', anneeTransit: '', serieTransit: '', cleTransit: '', numVoyageTransit: '', refTransit: '', numVoletTransit: '', numVoletTransit: '', dateEtablissementTransit: ''
  }
    console.log('type : ', type);
    if (!_.isUndefined(type)) {
      this.setState({
        dedDumVo: {
          ...dedDum, dedDumSectionEnteteVO: { ...dedDumSectionEntete, typeDocument: type.code }
        },
        dedDumSectionEnteteVO: { ...dedDumSectionEntete, typeDocument: type.code }

      });


    } else {
     
      this.setState({
        dedDumVo: dedDum,
        dedDumSectionEnteteVO: dedDumSectionEntete

      });
      console.log('dedDumVo.dedDumSectionEnteteVO : ',dedDum.dedDumSectionEnteteVO);
      this.props.update(dedDum);

    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.data?.dedReferenceVO?.identifiant != state.dedDumVo.dedReferenceVO?.identifiant
    ) {
      return {
        dedDumVo: props.data,
        dedDumSectionEnteteVO: props.date?.dedDumSectionEnteteVO
      }
    }
    return null;
  }

  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    /*while (serie.length < 6) {
        serie = '0' + serie;
      }*/
    if (serie?.length > 6) {
      let firstSerie = serie?.substring(0, 1);
      if (firstSerie == '0') {
        serie = serie?.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
  };


  confirmerRefDum = () => {
    var bureau = this.state.dedDumSectionEnteteVO.bureauTransit;
    var regime = this.state.dedDumSectionEnteteVO.regimeTransit;
    var annee = this.state.dedDumSectionEnteteVO.anneeTransit;
    var serie = this.state.dedDumSectionEnteteVO.serieTransit;
    var cle = this.state.dedDumSectionEnteteVO.cleTransit;
    if (!bureau) {
      this.setState({
        errorMessage: translate('dedouanement.info.bureauObligatoire')
      });
      return;
    }
    if (!regime) {
      this.setState({
        errorMessage: translate('dedouanement.info.regimeObligatoire')
      });
      return;
    }
    if (!annee) {
      this.setState({
        errorMessage: translate('dedouanement.info.anneObligatoire')
      });
      return;

    }
    if (!serie) {
      this.setState({
        errorMessage: translate('dedouanement.info.serieObligatoire')
      });
      return;

    }

    var cledumvalide = this.cleDUM(regime, serie, annee);
    console.log('Cle Valide ', cledumvalide);
    if (cledumvalide == cle) {
      let dedDumSectionEnteteVOState = this.state.dedDumSectionEnteteVO;
      console.log('this.state.dedDumSectionEnteteVO 2 : ', this.state.dedDumSectionEnteteVO);
      let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, dedDumSectionEnteteVOState }};
      console.log('dedDumVo 3 : ', dedDumVo);
      this.setState({
        dedDumVo: dedDumVo
      });


      this.props.update(dedDumVo);


    } else {
      this.setState({
        errorMessage: translate('dedouanement.info.cleNonValide')
      });
    }
  }

  render() {
    console.log(this.state.dedDumVo.dedDumSectionEnteteVO?.dateEtablissementTransit);
    console.log(_.isUndefined(this.state.dedDumVo.dedDumSectionEnteteVO?.dateEtablissementTransit) );
    console.log(_.isNaN(this.state.dedDumVo.dedDumSectionEnteteVO?.dateEtablissementTransit));
    console.log((!_.isUndefined(this.state.dedDumVo.dedDumSectionEnteteVO?.dateEtablissementTransit) && !_.isEmpty(this.state.dedDumVo.dedDumSectionEnteteVO?.dateEtablissementTransit)));
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Document précédent" expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelleSize={1}
                libelle="Type document"
                children={
                  <ComBadrItemsPickerComp
                    disabled={this.props.readOnly}
                    selectedValue={this.state.dedDumVo.dedDumSectionEnteteVO?.typeDocument}
                    items={this.getTypesDocuments()}
                    label=""
                    onValueChanged={this.handleDocumentTypeChanged}
                  />
                }
              />
            </DedRedressementRow>

            {this.state.dedDumVo.dedDumSectionEnteteVO?.typeDocument === 'true' && (

              <View style={styles.container}>
                <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
                  <Col>

                    <Row style={{ width: '80%' }}>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.reference')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.numVolet')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.dateEtablissement')}
                        </ComBadrLibelleComp>
                      </Col>




                    </Row>
                    <Row style={{ width: '80%' }}>
                      <Col>
                        <TextInput
                          value={this.state.dedDumVo.dedDumSectionEnteteVO.refTransit}
                          keyboardType={'numeric'}
                          maxLength={9}
                          label={translate('dedouanement.info.reference')}
                          onChangeText={(val) => {

                            let dedDum = {
                              ...this.state.dedDumVo, dedDumSectionEnteteVO: {
                                ...this.state.dedDumVo.dedDumSectionEnteteVO,
                                refTransit: val,
                              }
                            }

                            this.setState({
                              dedDumVo: dedDum



                            });
                            this.props.update(dedDum);
                          }}
                          style={CustomStyleSheet.mediumInput}
                        />
                      </Col>
                      <Col>
                        <TextInput
                          value={this.state.dedDumVo.dedDumSectionEnteteVO.numVoletTransit}
                          keyboardType={'numeric'}
                          maxLength={9}
                          label={translate('dedouanement.info.numVolet')}
                          onChangeText={(val) => { 
                            
                            let dedDum = {
                              ...this.state.dedDumVo, dedDumSectionEnteteVO: {
                                ...this.state.dedDumVo.dedDumSectionEnteteVO,
                                numVoletTransit: val,
                              }
                            }

                            this.setState({
                              dedDumVo: dedDum



                            });
                            this.props.update(dedDum);
                          }}
                          style={CustomStyleSheet.mediumInput}
                        />
                      </Col>

                      <Col>
                        <Row style={{ width: '100%' }}>

                          <Col style={{ width: '100%' }}>
                            <TextInput
                              mode={'outlined'}
                              disabled={true}
                              
                              value={this.state.dedDumVo.dedDumSectionEnteteVO?.dateEtablissementTransit}
                              multiline={true}
                              numberOfLines={1}
                            />
                            {this.state.showDateEtablissementTransit && (
                              <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.dateEtablissementTransit}
                                mode="date"
                                display="default"
                                onChange={this.onDateEtablissementTransitChange}
                              />
                            )}
                          </Col>
                          <Col size={2} style={{ paddingTop: 5 }}>
                            {!this.props.readOnly && (<IconButton
                              icon="calendar"
                              onPress={() => {
                                this.setState({ showDateEtablissementTransit: true });

                              }}
                            />)}
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                  </Col>
                </Row>

              </View>



            )}

            {this.state.dedDumVo.dedDumSectionEnteteVO?.typeDocument === 'false' && (
              <View style={styles.container}>
                <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
                  <Col>
                    {this.state.errorMessage != null && (
                      <Row>
                        <Col size={12}>
                          <ComBadrErrorMessageComp message={this.state.errorMessage} />
                        </Col></Row>
                    )}

                    <Row style={{ width: '80%' }}>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.bureau')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.regime')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.annee')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={2}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.serie')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col >
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.cle')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.numVoyage')}
                        </ComBadrLibelleComp>
                      </Col>



                    </Row>
                    <Row style={{ width: '80%' }}>
                      <Col>
                        <TextInput
                          value={this.state.dedDumSectionEnteteVO.bureauTransit}
                          keyboardType={'numeric'}
                          maxLength={3}
                          label={translate('dedouanement.info.bureau')}
                          onChangeText={(val) => this.setState({ dedDumSectionEnteteVO: { ...this.state.dedDumSectionEnteteVO, bureauTransit: val } })}
                          style={CustomStyleSheet.mediumInput}
                        />
                      </Col>
                      <Col>
                        <TextInput
                          value={this.state.dedDumSectionEnteteVO.regimeTransit}
                          keyboardType={'numeric'}
                          maxLength={3}
                          label={translate('dedouanement.info.regime')}
                          onChangeText={(val) => this.setState({ dedDumSectionEnteteVO: { ...this.state.dedDumSectionEnteteVO, regimeTransit: val } })}
                          style={CustomStyleSheet.mediumInput}
                        />
                      </Col>

                      <Col>
                        <TextInput
                          value={this.state.dedDumSectionEnteteVO.anneeTransit}
                          keyboardType={'numeric'}
                          maxLength={4}
                          label={translate('dedouanement.info.annee')}
                          onChangeText={(val) => this.setState({ dedDumSectionEnteteVO: { ...this.state.dedDumSectionEnteteVO, anneeTransit: val } })}
                          style={CustomStyleSheet.mediumInput}
                        />
                      </Col>
                      <Col size={2}>
                        <TextInput
                          value={this.state.dedDumSectionEnteteVO.serieTransit}
                          keyboardType={'numeric'}
                          maxLength={7}
                          label={translate('dedouanement.info.serie')}
                          onChangeText={(val) => this.setState({ dedDumSectionEnteteVO: { ...this.state.dedDumSectionEnteteVO, serieTransit: val } })}
                          onEndEditing={(event) =>

                            this.setState({ dedDumSectionEnteteVO: { ...this.state.dedDumSectionEnteteVO, serieTransit: event.nativeEvent.text.padStart(7, "0") } })
                          }
                          style={CustomStyleSheet.mediumInput}
                        />
                      </Col>
                      <Col>
                        <TextInput
                          value={this.state.dedDumSectionEnteteVO.cleTransit}
                          maxLength={1}
                          label={translate('dedouanement.info.cle')}
                          onChangeText={(val) => this.setState({ dedDumSectionEnteteVO: { ...this.state.dedDumSectionEnteteVO, cleTransit: val.toUpperCase().replace(/[^A-Z]/g, '') } })}
                          style={CustomStyleSheet.mediumInput}
                        />
                      </Col>
                      <Col>
                        <TextInput
                          value={this.state.dedDumSectionEnteteVO.numVoyageTransit}
                          keyboardType={'numeric'}
                          maxLength={1}
                          label={translate('dedouanement.info.numVoyage')}
                          onChangeText={(val) => this.setState({ dedDumSectionEnteteVO: { ...this.state.dedDumSectionEnteteVO, numVoyageTransit: val } })}
                          style={CustomStyleSheet.mediumInput}
                        />
                      </Col>
                    </Row>
                    <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
                      <ComBadrButtonComp
                        style={{ width: 100 }}
                        onPress={() => (this.confirmerRefDum())}
                        text={translate('transverse.confirmer')}
                      />

                    </Row>
                  </Col>
                </Row>

              </View>
            )}
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteDocumentPrecedentBlock;
