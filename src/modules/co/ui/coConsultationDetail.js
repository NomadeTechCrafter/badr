import React from 'react';
import {ScrollView, View} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Text, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  ComAccordionComp,
  ComBadrButtonRadioComp,
  ComBadrCardBoxComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
  ComBadrLibelleComp,
  ComBadrPickerComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
} from '../../../commons/component';
import ComBadrReferentielPickerComp from '../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
/**Custom Components */
import translate from '../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../commons/styles/ComThemeStyle';
import {
  languesImpression,
  radioButtonsDataCumulAR,
  typesCertificats,
} from '../state/coConstants';
import coStyle from '../style/coStyle';

class COConsultationDetail extends React.Component {
  constructor(props) {
    super(props);

    this.coCols = [
      {
        code: 'numeroOrdreArticle',
        libelle: translate('co.numeroOrdreArticle'),
        width: 50,
      },
      {
        code: 'paysOrigine',
        libelle: translate('co.paysOrigine'),
        width: 120,
      },
      {
        code: 'nomenclature',
        libelle: translate('co.nomenclature'),
        width: 120,
      },
      {
        code: 'nombreContenant',
        libelle: translate('co.nombreContenant'),
        width: 120,
      },
      {
        code: 'nature',
        libelle: translate('co.nature'),
        width: 150,
      },
      {
        code: 'quantite',
        libelle: translate('co.quantite'),
        width: 120,
      },
      {
        code: 'unite',
        libelle: translate('co.unite'),
        width: 120,
      },
      {
        code: 'groupArcticles',
        libelle: translate('co.groupArcticles'),
        width: 150,
      },
      {
        code: '',
        libelle: 'Action',
        component: 'basic-button',
        text: 'Complément',
        action: (row, index) => this.traiter(row, index),
        width: 180,
      },
    ];
  }

  redirectToConsultationDUM(row, index) {
    console.log('============================================');
    console.log('============================================');
    console.log(JSON.stringify(row));
    console.log('============================================');
    console.log('============================================');
    console.log(JSON.stringify(index));
    console.log('============================================');
    console.log('============================================');
  }

  render() {
    const co = this.props.data;
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('co.title')}
          subtitle={translate('co.demandeCertificatOrigine')}
        />
        <ScrollView>
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.referenceDUM')}
                  libelleSize={2}
                  value={co?.referenceDUM}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.reference')}
                  libelleSize={2}
                  value={co?.reference}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.operateurCertificatOrigine')}
                  libelleSize={2}
                  value={co?.soumissionnaire}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.cachet')}
                  libelleSize={2}
                  value={co?.cachet}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.dateEnregistrementDum')}
                  libelleSize={2}
                  value={co?.dateEnrDum}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.statut')}
                  libelleSize={2}
                  value={co?.statut}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.dateMLV')}
                  libelleSize={2}
                  value={co?.dateMlv}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.dateEnregistrement')}
                  libelleSize={2}
                  value={co?.dateEnregistrement}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.accord')}
                  // libelleSize={2}
                  value={co?.accord}
                />
              </Row>
            </Grid>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2} />
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {translate('co.typeCertificat')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <ComBadrItemsPickerComp
                    selectedValue={co?.typeCertificat}
                    items={typesCertificats}
                    disabled={true}
                  />
                </Col>
                <Col size={2} />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2} />
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {translate('co.typeCertificat')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <ComBadrPickerComp
                    disabled={true}
                    key="code"
                    // style={CustomStyleSheet.badrPicker}
                    selectedValue={co?.paysDestination}
                    selected={co?.paysDestination}
                    // titleStyle={CustomStyleSheet.badrPickerTitle}
                    cle="code"
                    libelle="libelle"
                    module="CO_LIB"
                    command="vctDestinationLigueArabe"
                    param={null}
                    typeService="SP"
                    storeWithKey="code"
                    storeLibelleWithKey="libelle"
                  />
                </Col>
                <Col size={2} />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2} />
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {translate('co.langue')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <ComBadrItemsPickerComp
                    selectedValue={co?.langue}
                    items={languesImpression}
                    disabled={true}
                  />
                </Col>
                <Col size={2} />
              </Row>
            </Grid>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={5}>
                  <TextInput
                    mode={'outlined'}
                    disabled={true}
                    direction="rtl"
                    value={co?.exportateurAdresseAR}
                    textAlign="right"
                    style={coStyle.paddingLeft}
                  />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('co.exportateurAdresseAR')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={5}>
                  <TextInput
                    mode={'outlined'}
                    disabled={true}
                    direction="rtl"
                    value={co?.producteurAdresseAR}
                    textAlign="right"
                    style={coStyle.paddingLeft}
                  />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('co.producteurAdresseAR')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={5}>
                  <ComBadrButtonRadioComp
                    disabled={true}
                    value={String(co?.cumul)}
                    radioButtonsData={radioButtonsDataCumulAR}
                  />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('co.cumul')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={5}>
                  <TextInput
                    mode={'outlined'}
                    disabled={true}
                    direction="rtl"
                    value={co?.importateurAdresseAR}
                    textAlign="right"
                    style={coStyle.paddingLeft}
                  />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('co.importateurAdresseAR')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={7} />
                <Col size={5}>
                  <TextInput
                    mode={'outlined'}
                    disabled={true}
                    direction="rtl"
                    value={co?.detailExpeditionAR}
                    textAlign="right"
                    style={coStyle.paddingLeft}
                  />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('co.detailExpeditionAR')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={7} />
                <Col size={5}>
                  <TextInput
                    mode={'outlined'}
                    disabled={true}
                    direction="rtl"
                    value={co?.remarques}
                    textAlign="right"
                    style={coStyle.paddingLeft}
                  />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('co.remarques')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
            </Grid>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp>
            <ComBasicDataTableComp
              id="coArticlesTable"
              rows={co?.refArticlesCOVO}
              cols={this.coCols}
              totalElements={co?.refArticlesCOVO?.length}
              maxResultsPerPage={10}
              paginate={true}
              showProgress={this.props.showProgress}
            />
          </ComBadrCardBoxComp>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.coReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(COConsultationDetail);
