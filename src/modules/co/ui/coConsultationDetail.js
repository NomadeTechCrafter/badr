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
  ComBadrCardWithTileComp,
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

  toShowDestinationAR(typeCertificat) {
    return (
      typeCertificat === '03' ||
      typeCertificat === '04' ||
      typeCertificat === '05'
    );
  }
  toShowDestination(typeCertificat) {
    return (
      typeCertificat === '06' ||
      typeCertificat === '07' ||
      typeCertificat === '01'
    );
  }

  toShowMoyenTransport(typeCertificat) {
    return (
      typeCertificat === '01' ||
      typeCertificat === '06' ||
      typeCertificat === '07'
    );
  }

  toShowDestinataire(typeCertificat) {
    return typeCertificat === '06' || typeCertificat === '07';
  }

  toShowAR(typeCertificat) {
    return (
      typeCertificat === '02' ||
      typeCertificat === '03' ||
      typeCertificat === '04' ||
      typeCertificat === '05'
    );
  }

  toShowDetailExpedition(typeCertificat) {
    return typeCertificat === '02' || typeCertificat === '03';
  }

  toShowValeurTotalArticleAR(typeCertificat) {
    return typeCertificat === '04' || typeCertificat === '05';
  }

  render() {
    const co = this.props.data;
    return (
      <ScrollView>
        <View>
          <ComBadrToolbarComp
            navigation={this.props.navigation}
            icon="menu"
            title={translate('co.title')}
            subtitle={translate('co.demandeCertificatOrigine')}
          />
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
                  value={co?.dateHeureEnregistrement}
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
                <Col size={1} />
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {translate('co.typeCertificat')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={6}>
                  <ComBadrItemsPickerComp
                    selectedValue={co?.typeCertificat}
                    items={typesCertificats}
                    disabled={true}
                  />
                </Col>
                <Col size={1} />
              </Row>

              {co?.paysDestination &&
                this.toShowDestination(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.destination')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
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
                    <Col size={1} />
                  </Row>
                )}

              {co?.paysDestination &&
                this.toShowDestinationAR(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.destination')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      <ComBadrPickerComp
                        disabled={true}
                        key="code"
                        selectedValue={co?.paysDestination}
                        selected={co?.paysDestination}
                        cle="code"
                        libelle="libelle"
                        command="vctDestinationLigueArabe"
                        param={null}
                        typeService="SP"
                        storeWithKey="code"
                        storeLibelleWithKey="libelle"
                      />
                    </Col>
                    <Col size={1} />
                  </Row>
                )}

              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={1} />
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {translate('co.langue')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={6}>
                  <ComBadrItemsPickerComp
                    selectedValue={co?.langue}
                    items={languesImpression}
                    disabled={true}
                  />
                </Col>
                <Col size={1} />
              </Row>

              {co?.moyenTransport &&
                this.toShowMoyenTransport(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.moyenTransport')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {co?.moyenTransport}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1} />
                  </Row>
                )}
              {co?.typeCertificat &&
                this.toShowDestinataire(co?.typeCertificat) && (
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1} />
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.destinataire')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {co?.destinataire}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1} />
                  </Row>
                )}
            </Grid>
          </ComBadrCardBoxComp>
          {co?.typeCertificat && this.toShowAR(co?.typeCertificat) && (
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
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
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
                  {co?.typeCertificat && co?.typeCertificat === '06' && (
                    <Col size={5}>
                      <ComBadrButtonRadioComp
                        disabled={true}
                        value={String(co?.cumul)}
                        radioButtonsData={radioButtonsDataCumulAR}
                      />
                    </Col>
                  )}
                  {co?.typeCertificat && co?.typeCertificat === '06' && (
                    <Col size={2}>
                      <ComBadrLibelleComp>
                        {translate('co.cumul')}
                      </ComBadrLibelleComp>
                    </Col>
                  )}
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
                {co?.typeCertificat &&
                  this.toShowDetailExpedition(co?.typeCertificat) && (
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
                  )}
                {co?.typeCertificat &&
                  this.toShowDetailExpedition(co?.typeCertificat) && (
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
                  )}
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

          {co?.typeCertificat &&
            this.toShowValeurTotalArticleAR(co?.typeCertificat) && (
              <ComBadrCardBoxComp>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={16}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurTotalArticleAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurTotalArticleAR')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                </Grid>
              </ComBadrCardBoxComp>
            )}

          {co?.typeCertificat &&
            this.toShowValeurTotalArticleAR(co?.typeCertificat) &&
            this.state.selectedArticle && (
              <ComBadrCardWithTileComp title={translate('co.elemProd')}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={9}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.marqueAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>
                        {translate('co.marqueAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={4}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.designationARCount}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.designationARCount')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={10}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.designationAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.articleDesignationAR')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.qteNetAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {translate('co.qteNetAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.qteBrut}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {translate('co.articleQteBrut')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.valeurLocalAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurLocalAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.valeurQTAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={6}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurQTAR')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                </Grid>
              </ComBadrCardWithTileComp>
            )}

          {co?.typeCertificat &&
            this.toShowAR(co?.typeCertificat) &&
            this.toShowDetailExpedition(co?.typeCertificat) &&
            this.state.selectedArticle && (
              <ComBadrCardBoxComp>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={3} />
                    <Col size={9}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={this.state.selectedArticle?.designationAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.designationAR')}
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
                        value={this.state.selectedArticle?.qteBrut}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={4}>
                      <ComBadrLibelleComp>
                        {translate('co.qteBrut')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                </Grid>
              </ComBadrCardBoxComp>
            )}

          {co?.typeCertificat &&
            this.toShowMoyenTransport(co?.typeCertificat) &&
            this.state.selectedArticle && (
              <ComBadrCardBoxComp>
                <Grid>
                  <Row>
                    <Col>
                      <ComBadrKeyValueComp
                        libelle={translate('co.descriptionMarchandise')}
                        libelleSize={3}
                        value={this.state.selectedArticle?.designation}
                      />
                    </Col>
                    <Col>
                      <ComBadrKeyValueComp
                        libelle={translate('co.critereMarchandise')}
                        libelleSize={3}
                        value={this.state.selectedArticle?.type}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ComBadrKeyValueComp
                        libelle={translate('co.poidsBrute')}
                        libelleSize={3}
                        value={this.state.selectedArticle?.qteBrut}
                      />
                    </Col>
                    <Col>
                      <ComBadrKeyValueComp
                        libelle={translate('co.marque')}
                        libelleSize={3}
                        value={this.state.selectedArticle?.marque}
                      />
                    </Col>
                    {this.state.selectedArticle?.critereOrigine && (
                      <Col>
                        <ComBadrKeyValueComp
                          libelle={translate('co.taux')}
                          libelleSize={2}
                          value={
                            this.state.selectedArticle?.critereOrigine + ' %'
                          }
                        />
                      </Col>
                    )}
                  </Row>
                </Grid>
              </ComBadrCardBoxComp>
            )}

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
          {co?.typeCertificat &&
            this.toShowValeurTotalArticleAR(co?.typeCertificat) && (
              <ComBadrCardWithTileComp title={translate('co.elemProd')}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurElementProdDevAR1}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.qtElementProdDevAR1}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={16}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.libElementProdDevAR1}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR1')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurElementProdDevAR2}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.qtElementProdDevAR2}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={16}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.libElementProdDevAR2}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR2')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurElementProdDevAR3}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.qtElementProdDevAR3}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={16}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.libElementProdDevAR3}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR3')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurElementProdExterneAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.qtElementProdExterneAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={10}>
                      {/* <TextInput
                      mode={'outlined'}
                      disabled={true}
                      direction="rtl"
                      value={co?.libElementProdDevAR3}
                      textAlign="right"
                      style={coStyle.paddingLeft}
                    /> */}
                    </Col>
                    <Col size={11}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR4')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.sommeValeurElementProdAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.sommeQtElementProdAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={16}>
                      {/* <TextInput
                      mode={'outlined'}
                      disabled={true}
                      direction="rtl"
                      value={co?.libElementProdDevAR3}
                      textAlign="right"
                      style={coStyle.paddingLeft}
                    /> */}
                    </Col>
                    <Col size={5}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR5')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.valeurFinaleElementProdAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.valeurElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={8}>
                      <TextInput
                        mode={'outlined'}
                        disabled={true}
                        direction="rtl"
                        value={co?.qtFinaleElementProdAR}
                        textAlign="right"
                        style={coStyle.paddingLeft}
                      />
                    </Col>
                    <Col size={3}>
                      <ComBadrLibelleComp>
                        {translate('co.qtElementProdDevAR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={10}>
                      {/* <TextInput
                      mode={'outlined'}
                      disabled={true}
                      direction="rtl"
                      value={co?.libElementProdDevAR3}
                      textAlign="right"
                      style={coStyle.paddingLeft}
                    /> */}
                    </Col>
                    <Col size={11}>
                      <ComBadrLibelleComp>
                        {translate('co.libElementProdDevAR6')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                </Grid>
              </ComBadrCardWithTileComp>
            )}
          {co?.numeroSerieConfinement && (
            <ComBadrKeyValueComp
              libelle={translate('co.numeroSerieConfinement')}
              libelleSize={6}
              value={co?.numeroSerieConfinement}
            />
          )}
        </View>
      </ScrollView>
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
