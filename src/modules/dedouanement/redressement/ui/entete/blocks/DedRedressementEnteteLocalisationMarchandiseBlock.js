import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput } from 'react-native-paper';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
  ComBasicDataTableComp, ComBadrButtonComp
} from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import styles from '../../../style/DedRedressementStyle';
import { getValueByPath } from '../../../utils/DedUtils';
import DedRedressementRow from '../../common/DedRedressementRow';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

class DedRedressementEnteteLocalisationMarchandiseBlock extends React.Component {
  constructor(props) {
    super(props);
    this.cols = [
      {
        code: 'referenceDeclExport',
        libelle: translate('dedouanement.entete.refDeclarationExport'),
        width: 200,

      },
      {
        code: '',
        libelle: '',
        width: 50,
        component: 'button',
        icon: 'minus',
        action: (row, index) => {
          console.log('action ');
          this.deleteItem(index);
        }
      }

    ];
    this.state = {
      dedDumVo: this.props.data, 
      showDateVoyage: false,
      dateVoyageTech: (new Date()).getTime(),
      paysDestinationTransbordementDisabled: !this.props.data.dedDumSectionEnteteVO?.regimeExport && this.props.data.dedDumSectionEnteteVO.paysDestinationTransbordement == 'MA',
      paysProvenanceOuDestinationDisabled: this.props.data.dedDumSectionEnteteVO?.regimeExport || this.props.data.dedDumSectionEnteteVO.paysProvenanceOuDestination == 'MA'
    };
  }

  deleteItem = (index) => {
    let dedDumVo = { ...this.state.dedDumVo };
    dedDumVo.dedDumSectionEnteteVO.listeRefDeclationExportVO.splice(index, 1);
    this.setState({
      dedDumVo: dedDumVo
    });
    this.props.update(dedDumVo);
  }

  addItem = () => {
    let reference = this.state.dedDumVo.dedDumSectionEnteteVO.referenceDeclarationExport;
    let dedDumVo = { ...this.state.dedDumVo };

    let trouve = false;
    dedDumVo.dedDumSectionEnteteVO.listeRefDeclationExportVO.forEach(element => {
      if (element.referenceDeclExport == reference) trouve = true;
    });
    if (!trouve && !_.isEmpty(reference)) {
      dedDumVo.dedDumSectionEnteteVO.listeRefDeclationExportVO.push({ referenceDeclExport: reference });
      dedDumVo = { ...dedDumVo, dedDumSectionEnteteVO: { ...dedDumVo.dedDumSectionEnteteVO, referenceDeclarationExport: '' } };
    }

    this.setState({
      dedDumVo: dedDumVo
    });
    this.props.update(dedDumVo);
  }

  onChangeReferenceDeclarationExport = (text) => {
    let dedDumVo = { ...this.state.dedDumVo };
    dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, referenceDeclarationExport: text } };
    this.setState({
      dedDumVo: dedDumVo
    });

  }

  componentDidMount() { }

  handlePaysProvChipsChanged = (pays) => {
    console.log('pays : ', pays);
    if (!_.isUndefined(pays)) {
      let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, paysProvenanceOuDestination: pays.code, paysProvenanceOuDestinationLibelle: pays.libelle } };
      this.setState({
        dedDumVo: dedDumVo
      });


      this.props.update(dedDumVo);
    }
  };

  handlePaysOrigineChipsChanged = (pays) => {
    if (!_.isUndefined(pays)) {
      let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, paysOrigine: pays.code, paysOrigineLibelle: pays.libelle } };
      dedDumVo.dedDumSectionArticlesVO.dedDumArticleFormVO.forEach(article => {
        article.paysOrigine = pays.code
      });

      this.setState({
        dedDumVo: dedDumVo
      });


      this.props.update(dedDumVo);
    }

  };

  handlePaysDestinationTransChipsChanged = (pays) => {

    if (!_.isUndefined(pays)) {
      let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, paysDestinationTransbordement: pays.code, paysDestinationTransbordementLibelle: pays.libelle } };


      this.setState({
        dedDumVo: dedDumVo
      });


      this.props.update(dedDumVo);
    }

  };

  onDateVoyageChange = (event, selectedDate) => {
    if (selectedDate) {
      console.log('moment(event.nativeEvent.timestamp, DD/MM/yyyy, true)', moment(event.nativeEvent.timestamp).format('DD/MM/YYYY'));
      console.log('selectedDate', selectedDate);
      let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, dateVoyage: moment(event.nativeEvent.timestamp).format('DD/MM/YYYY')} };
    

      this.setState({
        dedDumVo: dedDumVo, dateVoyageTech: event.nativeEvent.timestamp, showDateVoyage:false
      });


      this.props.update(dedDumVo);
    }
  }
  render() {

    console.log('this.state.dedDumVo.dedReferenceVO?.reference : ', this.state.dedDumVo.dedReferenceVO?.reference);
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title="Localisation de la marchandise"
          expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Grid>
                <Row style={{ width: '100%' }}>
                  <Col>
                    <ComBasicDataTableComp
                      ref="_badrTable"
                      id="scannerTable"
                      rows={this.state.dedDumVo.dedDumSectionEnteteVO.listeRefDeclationExportVO}
                      cols={this.cols}
                      totalElements={this.state.dedDumVo.dedDumSectionEnteteVO.listeRefDeclationExportVO.length}
                      maxResultsPerPage={10}
                      paginate={true}
                      showProgress={this.props.showProgress}
                      withId={false}

                    />
                  </Col>
                </Row>
              </Grid>
            </DedRedressementRow>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Référence de la déclaration d'export"
                children={
                  <TextInput
                    disabled={this.props.readOnly}
                    type="flat"
                    maxLength={17}
                    keyboardType={'number-pad'}
                    value={this.state.dedDumVo.dedDumSectionEnteteVO?.referenceDeclarationExport}
                    onChangeText={(val) => this.onChangeReferenceDeclarationExport(val)}
                    onEndEditing={(event) => this.onChangeReferenceDeclarationExport(event.nativeEvent.text)}
                  />
                }
              />
              {(!this.props.readOnly) && <ComBadrButtonComp
                style={{ width: 100 }}
                onPress={() => {
                  this.addItem()
                }}
                text={translate('transverse.ajouter')}
              />}
            </DedRedressementRow>
            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Pays de provenance"
                children={
                  <ComBadrAutoCompleteChipsComp
                    disabled={this.props.readOnly || this.state.paysProvenanceOuDestinationDisabled}
                    onRef={(ref) => (this.refPaysProv = ref)}
                    code="code"
                    selected={this.state.dedDumVo.dedDumSectionEnteteVO?.paysProvenanceOuDestinationLibelle}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbPaysDestination"
                    paramName="libellePays"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handlePaysProvChipsChanged}
                    params={{
                      codeRegime: this.state.dedDumVo.dedReferenceVO?.reference.substring(3, 6)
                    }}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Pays d'origine"
                children={
                  <ComBadrAutoCompleteChipsComp
                    disabled={this.props.readOnly}
                    onRef={(ref) => (this.refPaysOrigine = ref)}
                    code="code"
                    selected={this.state.dedDumVo.dedDumSectionEnteteVO?.paysOrigineLibelle}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbPaysOrigine"
                    paramName="libellePays"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handlePaysOrigineChipsChanged}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Pays de destination"
                children={
                  <ComBadrAutoCompleteChipsComp
                    disabled={this.props.readOnly || this.state.paysDestinationTransbordementDisabled}
                    onRef={(ref) => (this.refPaysDestinationTrans = ref)}
                    code="code"
                    selected={this.state.dedDumVo.dedDumSectionEnteteVO?.paysDestinationTransbordementLibelle}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbPays"
                    paramName="libellePays"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handlePaysDestinationTransChipsChanged}
                    params={{
                      codeRegime: this.state.dedDumVo.dedReferenceVO?.reference.substring(3, 6)
                    }}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Date de voyage"
                children={
                    <TextInput
                      type="flat"
                      disabled={true}
                      label=""
                      value={this.state.dedDumVo.dedDumSectionEnteteVO.dateVoyage}
                    />
                    }
                    
                

              />
              {this.state.showDateVoyage && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.dateVoyageTech}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={this.onDateVoyageChange}
                />
              )}
              {!this.props.readOnly && (<IconButton
                icon="calendar"
                onPress={() => {
                  this.setState({ showDateVoyage: true });

                }}
              />)}
            </DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteLocalisationMarchandiseBlock;
