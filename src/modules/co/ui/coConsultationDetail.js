import React from 'react';
import {ScrollView, View} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Text, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
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
    this.state = {};
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
        attrCondition: 'numeroOrdreArticle',
        action: (row, index) => this.complement(row, index),
        width: 180,
      },
    ];
    this.coFacturesCols = [
      {
        code: '',
        libelle: translate('co.id'),
        icon: 'eye',
        component: 'button',
        action: (row, index) => this.afficherFacture(row, index),
        width: 50,
      },
      {
        code: 'numeroFacture',
        libelle: translate('co.numeroFacture'),
        width: 120,
      },
      {
        code: 'dateFacture',
        libelle: translate('co.dateFacture'),
        width: 120,
      },
    ];
  }

  complement(row, index) {
    this.setState({
      selectedArticle: row,
    });
  }

  afficherFacture(row, index) {
    this.setState({
      selectedFacture: row,
    });
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

  toShow(typeCertificat) {
    return (
      typeCertificat === '06' ||
      typeCertificat === '07' ||
      typeCertificat === '02' ||
      typeCertificat === '03'
    );
  }

  toShowDestination(typeCertificat) {
    return typeCertificat !== '06' || typeCertificat !== '07';
  }

  toShowMoyenTransport(typeCertificat) {
    return (
      typeCertificat === '01' ||
      typeCertificat === '06' ||
      typeCertificat === '07'
    );
  }

  toShowAR(typeCertificat) {
    return (
      typeCertificat === '02' ||
      typeCertificat === '03' ||
      typeCertificat === '04' ||
      typeCertificat === '05'
    );
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
              {co?.typeCertificat && this.toShow(co.typeCertificat) && (
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <ComBadrKeyValueComp
                    libelle={translate('co.accord')}
                    value={co?.accordCode}
                  />
                </Row>
              )}
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

              {co?.paysDestination &&
                this.toShowDestination(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={2} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.destination')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={4}>
                      <ComBadrPickerComp
                        disabled={true}
                        key="code"
                        selectedValue={co?.paysDestination}
                        selected={co?.paysDestination}
                        cle="code"
                        libelle="libelle"
                        command="getCmbPays"
                        param={null}
                        typeService="SP"
                        storeWithKey="code"
                        storeLibelleWithKey="libelle"
                      />
                    </Col>
                    <Col size={2} />
                  </Row>
                )}

              {co?.moyenTransport &&
                this.toShowMoyenTransport(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={2} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.destination')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {co?.moyenTransport}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>
                )}
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
          {co?.moyenTransport && this.toShowAR(co?.typeCertificat) && (
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
          )}
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
          {this.state.selectedArticle && (
            <ComBadrCardBoxComp>
              <ComBasicDataTableComp
                id="coFacturesTable"
                rows={this.state.selectedArticle?.refFacturesVO}
                cols={this.coFacturesCols}
                totalElements={
                  this.state.selectedArticle?.refFacturesVO?.length
                }
                maxResultsPerPage={10}
                paginate={true}
                showProgress={this.props.showProgress}
              />
            </ComBadrCardBoxComp>
          )}
          {this.state.selectedFacture && (
            <ComBadrCardBoxComp>
              <ComBadrKeyValueComp
                libelle={translate('co.numeroFacture')}
                libelleSize={2}
                value={this.state.selectedFacture?.numeroFacture}
              />
              <ComBadrKeyValueComp
                libelle={translate('co.dateFacture')}
                libelleSize={2}
                value={this.state.selectedFacture?.dateFacture}
              />
            </ComBadrCardBoxComp>
          )}
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
