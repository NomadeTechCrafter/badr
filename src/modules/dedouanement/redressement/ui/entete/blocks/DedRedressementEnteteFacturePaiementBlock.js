import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp, ComBadrButtonComp, ComBadrErrorMessageComp, ComBadrKeyValueComp,
  ComBadrLibelleComp,
  ComBasicDataTableComp
} from '../../../../../../commons/component';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import styles from '../../../style/DedRedressementStyle';
import { getValueByPath, newDeclarationFacture } from '../../../utils/DedUtils';
import DedRedressementRow from '../../common/DedRedressementRow';
import _ from 'lodash';

class DedRedressementEnteteFacturePaiementBlock extends React.Component {
  constructor(props) {
    super(props);
    this.cols = [
      {
        code: '',
        libelle: '',
        width: 50,
        component: 'button',
        icon: 'pencil',
        action: (row, index) => {
          console.log('action ');
          this.setState({
            declarationFactureVO: row,
            currentIndex: index, displayBlocFactureEdition: true
          });
        }
      },
      {
        code: 'numeroOrdre',
        libelle: translate('dedouanement.info.numeroOrdre'),
        width: 150,

      },
      {
        code: 'numero',
        libelle: translate('dedouanement.info.numeroFacture'),
        width: 250,
      },
      {
        code: 'fournisseur',
        libelle: translate('dedouanement.info.fournisseurClients'),
        width: 300,
      },
      {
        code: 'stringDateFacture',
        libelle: translate('dedouanement.info.dateFacture'),
        width: 150,
      },
      {
        code: 'devise',
        libelle: translate('dedouanement.info.devise'),
        width: 200,
      },
      {
        code: 'valeur',
        libelle: translate('dedouanement.info.valeurDevise'),
        width: 200,
      }
    ];
    this.state = {
      dedDumVo: this.props.data,
      displayBlocFactureEdition: false,
      declarationFactureVO: newDeclarationFacture(),
      showDateFacture: false,
      dateFacture: new Date(),
      currentIndex: -1,
      errorMessage: null
    };
  }

  componentDidMount() { }

  handleDeviseChipsChanged = (devise) => {
    console.log('devise : ', devise);
    if (!_.isUndefined(devise)) {
      let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, devise: devise.code, deviseLibelle: devise.libelle } };
      this.setState({
        dedDumVo: dedDumVo
      });


      this.props.update(dedDumVo);
    }

   };

  handleModePaiementChanged = (mode) => { };

  handleConditionsLivraisonChanged = (condition) => {
    console.log("handleConditionsLivraisonChanged");
    console.log(condition);
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, conditionLivraison: condition.code } };
    this.setState({
      dedDumVo: dedDumVo
    });


    this.props.update(dedDumVo);
    
  };

  nouveau = () => {
    console.log('Nouveau');
    this.setState({ displayBlocFactureEdition: true, currentIndex: -1, declarationFactureVO: newDeclarationFacture() });
  };
  supprimer = () => {
    console.log('Supprimer');
    console.log('this.state.currentIndex : ', this.state.currentIndex);
    let list = this.state?.dedDumVo?.dedDumSectionEnteteVO?.listDeclarationFactureVO;
    console.log('list before : ', list);
    let declarationFactureVO = this.state.declarationFactureVO;
    let articleToDelete = list.filter(function (ele) {
      return ele.numeroOrdre != declarationFactureVO.numeroOrdre;
    });

    console.log('list after : ', list);
    this.updateListFactures(articleToDelete);
    this.setState({ displayBlocFactureEdition: false });


  };
  abandonner = () => {
    console.log('Abandonner');
    this.setState({ displayBlocFactureEdition: false, declarationFactureVO: newDeclarationFacture()  });
  };

  confirmer = () => {
    console.log('confirmer');
    if (!this.checkControles()) {
      console.log('this.state.currentIndex : ', this.state.currentIndex);
      if (this.state.currentIndex == -1) {
        console.log('this.state.currentIndex : 1');
        this.state?.dedDumVo?.dedDumSectionEnteteVO?.listDeclarationFactureVO.push(this.state.declarationFactureVO);
      } else {
        console.log('this.state.currentIndex : 2');
        this.state?.dedDumVo?.dedDumSectionEnteteVO?.listDeclarationFactureVO.splice(this.state.currentIndex, 1, this.state.declarationFactureVO);
      }

      this.updateListFactures(this.state?.dedDumVo?.dedDumSectionEnteteVO?.listDeclarationFactureVO);
    }
  };

  retablir = () => {
    console.log('retablir');
    this.setState({ declarationFactureVO: newDeclarationFacture() });
  };

  onDateFactureChange = (event, selectedDate) => {
    if (!_.isUndefined(event.nativeEvent.timestamp)) {
      this.setState({
        declarationFactureVO: {
          ...this.state.declarationFactureVO,
          dateFacture: event.nativeEvent.timestamp,
          stringDateFacture: moment(event.nativeEvent.timestamp).format('DD/MM/YYYY')
        }, showDateFacture: false, dateFacture: event.nativeEvent.timestamp


      });
    }
  }
  handleDeviseFactureChipsChanged = (devise) => {
    console.log('devise : ', devise);
    if (!_.isUndefined(devise)) {
      this.setState({ declarationFactureVO: { ...this.state.declarationFactureVO, devise: devise.code, deviseLibelle: devise.libelle } });
    }
  };
  updateListFactures(list) {
    list.forEach((element, index) => {
      element.numeroOrdre = index + 1;
    });

    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, listDeclarationFactureVO: list } };
    this.setState({
      dedDumVo: dedDumVo,
      displayBlocFactureEdition: false, currentIndex: -1,
      declarationFactureVO: newDeclarationFacture()
    });
    this.props.update(dedDumVo);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data?.dedReferenceVO?.identifiant != state.dedDumVo.dedReferenceVO?.identifiant
    ) {
      return {
        dedDumVo: props.data,
        displayBlocFactureEdition: false,
        declarationFactureVO: null,
        showDateFacture: false,
        dateFacture: new Date()
      }
    }
    return null;
  }


  checkControles = () => {

    let params = { msg: '', error: false }
    this.checkRequiredFields(params);
    if (params.error) {
      let message = translate('dedouanement.info.champsObligatoires') + params.msg;
      console.log("message : ", message);
      this.setState({
        errorMessage: message
      });
    } else {
      this.setState({
        errorMessage: null
      });
    }
    if (!params.error) {
      let declarationFactureVO = this.state.declarationFactureVO;
      let date = new moment();
      console.log("date : ", date);
      console.log("declarationFactureVO.dateFacture : ", declarationFactureVO.dateFacture);
      if (declarationFactureVO.dateFacture > date) {
        let message = translate('dedouanement.info.erreurDateFacture');
        this.setState({
          errorMessage: message
        });
        return true;
      }
    }
    return params.error;


  }

  checkRequiredFields = (params) => {
    let declarationFactureVO = this.state.declarationFactureVO;
    if (_.isEmpty(declarationFactureVO?.numero)) {
      params.error = true;
      params.msg += !_.isEmpty(params.msg) ? ", " : "";
      params.msg += translate('dedouanement.info.numeroFacture');
    }
    if (_.isEmpty(declarationFactureVO?.fournisseur)) {
      params.error = true;
      params.msg += !_.isEmpty(params.msg) ? ", " : "";
      params.msg += translate('dedouanement.info.fournisseurClients');
    }
    if (_.isEmpty(declarationFactureVO?.dateFacture?.toString())) {
      params.error = true;
      params.msg += !_.isEmpty(params.msg) ? ", " : "";
      params.msg += translate('dedouanement.info.dateFacture');
    }
    if (_.isEmpty(declarationFactureVO?.valeur)) {
      params.error = true;
      params.msg += !_.isEmpty(params.msg) ? ", " : "";
      params.msg += translate('dedouanement.info.valeurDevise');
    }
    if (_.isEmpty(declarationFactureVO?.devise)) {
      params.error = true;
      params.msg += !_.isEmpty(params.msg) ? ", " : "";
      params.msg += translate('dedouanement.info.devise');
    }

    console.log("params : ", params);


  }

  onChangeMontantTotal = (text, update) => {
    let dedDumVo = { ...this.state.dedDumVo };
    dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, montantTotal: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (update) {
      this.props.update(dedDumVo);
    }
  }

  onChangeMontantFret = (text, update) => {
    let dedDumVo = { ...this.state.dedDumVo };
    dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, montantFret: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (update) {
      this.props.update(dedDumVo);
    }
  }

  onChangeMontantAssurance = (text, update) => {
    let dedDumVo = { ...this.state.dedDumVo };
    dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, montantAssurance: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (update) {
      this.props.update(dedDumVo);
    }
  }

  onChangePoidsBrutTotal = (text, update) => {
    let dedDumVo = { ...this.state.dedDumVo };
    dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, poidsBrutTotal: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (update) {
      this.props.update(dedDumVo);
    }
  }

  onChangeMontantAutresFrais = (text, update) => {
    let dedDumVo = { ...this.state.dedDumVo };
    dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, montantAutresFrais: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (update) {
      this.props.update(dedDumVo);
    }
  }
  
  
  render() {
    // console.log('this.state?.dedDumVo?.dedDumSectionEnteteVO? : ', this.state?.dedDumVo?.dedDumSectionEnteteVO);
    const factures = this.state?.dedDumVo?.dedDumSectionEnteteVO?.listDeclarationFactureVO ? this.state?.dedDumVo?.dedDumSectionEnteteVO?.listDeclarationFactureVO : [];
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Facture" expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Grid>
                <Row style={{ width: '100%' }}>
                  <Col>
                    <ComBasicDataTableComp
                      ref="_badrTable"
                      id="scannerTable"
                      rows={factures}
                      cols={this.cols}
                      totalElements={factures.length}
                      maxResultsPerPage={10}
                      paginate={true}
                      showProgress={this.props.showProgress}
                      withId={false}

                    />
                  </Col>
                </Row>

                {!this.props.readOnly && <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
                  {(!this.state.displayBlocFactureEdition) && <ComBadrButtonComp
                    style={{ width: 100 }}
                    onPress={() => (this.nouveau())}
                    text={translate('transverse.nouveau')}
                  />}
                  <View style={{ width: 10 }} />
                  {(this.state.displayBlocFactureEdition) && <ComBadrButtonComp
                    style={{ width: 100 }}
                    onPress={() => {
                      this.supprimer()
                    }}
                    text={translate('transverse.supprimer')}
                  />}
                  <View style={{ width: 10 }} />
                  {(this.state.displayBlocFactureEdition) && <ComBadrButtonComp
                    style={{ width: 100 }}
                    onPress={() => {
                      this.abandonner()
                    }}
                    text={translate('transverse.abandonner')}
                  />}
                  <View style={{ width: 10 }} />
                </Row>}
                {(!this.props.readOnly && this.state.displayBlocFactureEdition) && <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
                  <Col>
                    {this.state.errorMessage != null && (
                      <Row>
                        <Col size={12}>
                          <ComBadrErrorMessageComp message={this.state.errorMessage} />
                        </Col></Row>
                    )}

                    <Row>
                      <Col size={4}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.numeroFacture')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={8}>
                        <TextInput
                          value={this.state.declarationFactureVO?.numero}
                          label={translate('dedouanement.info.numeroFacture')}
                          onChangeText={(val) => this.setState({ declarationFactureVO: { ...this.state.declarationFactureVO, numero: val } })}
                          style={CustomStyleSheet.mediumInput}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col size={4}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.fournisseurClients')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={8}><TextInput
                        value={this.state.declarationFactureVO?.fournisseur}
                        label={translate('dedouanement.info.fournisseurClients')}
                        onChangeText={(val) => this.setState({ declarationFactureVO: { ...this.state.declarationFactureVO, fournisseur: val } })}
                        style={CustomStyleSheet.mediumInput}
                      />
                      </Col>
                    </Row>
                    <Row>
                      <Col size={4}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.dateFacture')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={6}>
                        <TextInput
                          mode={'outlined'}
                          disabled={true}
                          style={{ height: 20, fontSize: 12 }}
                          value={!_.isUndefined(this.state.declarationFactureVO?.dateFacture) ? moment(this.state.declarationFactureVO?.dateFacture).format('DD/MM/YYYY') : ''}
                          multiline={true}
                          numberOfLines={1}
                        />
                        {this.state.showDateFacture && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.dateFacture}
                            mode="date"
                            display="default"
                            onChange={this.onDateFactureChange}
                          />
                        )}
                      </Col>
                      <Col size={2} style={{ paddingTop: 5 }}>
                        {!this.props.readOnly && (<IconButton
                          icon="calendar"
                          onPress={() => {
                            this.setState({ showDateFacture: true });

                          }}
                        />)}
                      </Col>
                    </Row>
                    <Row>
                      <Col size={4}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.valeurDevise')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={8}><TextInput
                        keyboardType={'number-pad'}
                        value={this.state.declarationFactureVO?.valeur}
                        label={translate('dedouanement.info.valeurDevise')}
                        onChangeText={(val) => this.setState({ declarationFactureVO: { ...this.state.declarationFactureVO, valeur: val } })}
                        style={CustomStyleSheet.mediumInput}
                      />
                      </Col>
                    </Row>
                    <Row>
                      <Col size={4}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('dedouanement.info.devise')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={8}><ComBadrAutoCompleteChipsComp
                        onRef={(ref) => (this.refDeviseFacture = ref)}
                        code="code"
                        selected={!_.isUndefined(this.state.declarationFactureVO?.deviseLibelle) ? this.state.declarationFactureVO?.deviseLibelle : this.state.declarationFactureVO?.devise}
                        maxItems={3}
                        libelle="libelle"
                        command="getCmbDevise"
                        paramName="libelleDevise"
                        onDemand={true}
                        searchZoneFirst={false}
                        onValueChange={this.handleDeviseFactureChipsChanged}
                      />
                      </Col>
                    </Row>
                    <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
                      <ComBadrButtonComp
                        style={{ width: 100 }}
                        onPress={() => (this.confirmer())}
                        text={translate('transverse.confirmer')}
                      />
                      <View style={{ width: 10 }} />
                      <ComBadrButtonComp
                        style={{ width: 100 }}
                        onPress={() => {
                          this.retablir()
                        }}
                        text={translate('transverse.retablir')}
                      />
                      <View style={{ width: 10 }} />
                    </Row>
                  </Col>
                </Row>}
              </Grid>

            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Conditions de livraison"
                children={
                  <ComBadrReferentielPickerComp
                    disabled={this.props.readOnly}
                    selected={{
                      code: this.state.dedDumVo.dedDumSectionEnteteVO?.conditionLivraison
                    }}
                    onRef={(ref) => (this.combo2 = ref)}
                    onValueChanged={this.handleConditionsLivraisonChanged}
                    command="getCmbIncoterm"
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Montant total"
                children={
                  <TextInput
                    type="flat"
                    disabled={this.props.readOnly}
                    label=""
                    value={this.state.dedDumVo.dedDumSectionEnteteVO?.montantTotal}
                    onChangeText={(val) => this.onChangeMontantTotal(val, false)}
                    onEndEditing={(event) => this.onChangeMontantTotal(event.nativeEvent.text, true)}
                  />
                }
              />
              <ComBadrKeyValueComp />
            </DedRedressementRow>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Devise"
                children={
                  <ComBadrAutoCompleteChipsComp
                    onRef={(ref) => (this.refDevise = ref)}
                    code="code"
                    disabled={this.props.readOnly}
                    selected={!_.isUndefined(this.state.dedDumVo.dedDumSectionEnteteVO?.deviseLibelle) ? this.state.dedDumVo.dedDumSectionEnteteVO?.deviseLibelle : this.state.dedDumVo.dedDumSectionEnteteVO?.devise}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbDevise"
                    paramName="libelleDevise"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handleDeviseChipsChanged}
                  />
                }
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Taux de change"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.tauxChange',
                  this.props.data,
                )}
              />
            </DedRedressementRow>
          </View>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Totaux</Text>
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Montant fret"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={this.props.readOnly}
                    value={this.state.dedDumVo.dedDumSectionEnteteVO?.montantFret}
                    onChangeText={(val) => this.onChangeMontantFret(val, false)}
                    onEndEditing={(event) => this.onChangeMontantFret(event.nativeEvent.text, true)}
                  />
                }
              />
              <ComBadrKeyValueComp
                libelleSize={2}
                libelle="Poids net total"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.poidsNetTotal',
                  this.props.data,
                )}
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Montant assurance"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={this.props.readOnly}
                    value={this.state.dedDumVo.dedDumSectionEnteteVO?.montantAssurance}
                    onChangeText={(val) => this.onChangeMontantAssurance(val, false)}
                    onEndEditing={(event) => this.onChangeMontantAssurance(event.nativeEvent.text, true)}
                  />
                }
              />
              <ComBadrKeyValueComp
                libelleSize={2}
                libelle="Poids brut total"
                children={
                  <TextInput
                    disabled={this.props.readOnly}
                    type="flat"
                    label=""
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.poidsBrutTotal',
                      this.props.data,
                    )}
                    value={this.state.dedDumVo.dedDumSectionEnteteVO?.poidsBrutTotal}
                    onChangeText={(val) => this.onChangePoidsBrutTotal(val, false)}
                    onEndEditing={(event) => this.onChangePoidsBrutTotal(event.nativeEvent.text, true)}
                    
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Aconage et autres frais"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={this.props.readOnly}
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.montantAutresFrais',
                      this.props.data,
                    )}
                    value={this.state.dedDumVo.dedDumSectionEnteteVO?.montantAutresFrais}
                    onChangeText={(val) => this.onChangeMontantAutresFrais(val, false)}
                    onEndEditing={(event) => this.onChangeMontantAutresFrais(event.nativeEvent.text, true)}
                  />
                }
              />
              <ComBadrKeyValueComp
                libelleSize={2}
                libelle="Valeur Totale declarée"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.valeurTotaleDeclaree',
                  this.props.data,
                )}
              />
            </DedRedressementRow>
          </View>

          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Paiement</Text>
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Mode"
                children={
                  <ComBadrReferentielPickerComp
                   // disabled={true}
                    selected={{
                      code: getValueByPath(
                        'dedDumSectionEnteteVO.modePaiement',
                        this.props.data,
                      ),
                    }}
                    onRef={(ref) => (this.comboModePaiement = ref)}
                    command="getCmbModePaiement"
                    onValueChanged={this.handleModePaiementChanged}
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                  />
                }
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Crédit d'enlevement"
                children={
                  <ComBadrReferentielPickerComp
                  //  disabled={true}
                    selected={{
                      code: getValueByPath(
                        'dedDumSectionEnteteVO.numero',
                        this.props.data,
                      ),
                    }}
                    onRef={(ref) => (this.comboCreditEnlevements = ref)}
                    command="ded.loadCreditEnlevement"
                    module="DED_LIB"
                    onValueChanged={this.handleModePaiementChanged}
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                    params={{
                      codeDeclarant: getValueByPath(
                        'dedDumSectionEnteteVO.codeDeclarant',
                        this.props.data,
                      ),
                      idOperateurEngage: getValueByPath(
                        'dedDumSectionEnteteVO.idOperateurEngage',
                        this.props.data,
                      ),
                      cde:
                        'null-' +
                        getValueByPath(
                          'dedDumSectionEnteteVO.modePaiement',
                          this.props.data,
                        ) +
                        '-null',
                    }}
                  />
                }
              />
            </DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteFacturePaiementBlock;
