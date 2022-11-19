import React from 'react';
import {ScrollView, View} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Text} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  ComAccordionComp,
  ComBadrCardBoxComp,
  ComBadrKeyValueComp,
  ComBadrLibelleComp,
  ComBadrToolbarComp,
} from '../../../commons/component';
/**Custom Components */
import translate from '../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../commons/styles/ComThemeStyle';

class COConsultationDetail extends React.Component {
  constructor(props) {
    super(props);
    console.log('====================================');
    console.log('====================================');
    console.log(JSON.stringify(this.props.showProgress));
    console.log('====================================');
    console.log('====================================');
  }

  render() {
    const co = this.props.value;
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
                  value={co.referenceDUM}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.reference')}
                  libelleSize={2}
                  value={co.reference}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.operateurCertificatOrigine')}
                  libelleSize={2}
                  value={co.soumissionnaire}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.cachet')}
                  libelleSize={2}
                  value={co.cachet}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.dateEnregistrementDum')}
                  libelleSize={2}
                  value={co.dateEnrDum}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.statut')}
                  libelleSize={2}
                  value={co.statut}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.dateMLV')}
                  libelleSize={2}
                  value={co.dateMlv}
                />
                <ComBadrKeyValueComp
                  libelle={translate('co.dateEnregistrement')}
                  libelleSize={2}
                  value={co.dateEnregistrement}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  libelle={translate('co.accord')}
                  // libelleSize={2}
                  value={co.accord}
                />
              </Row>
            </Grid>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  rtl={true}
                  libelle={translate('co.producteurAdresseAR')}
                  libelleSize={2}
                  value={co.producteurAdresseAR}
                />
                <ComBadrKeyValueComp
                  rtl={true}
                  libelle={translate('co.exportateurAdresseAR')}
                  libelleSize={2}
                  value={co.exportateurAdresseAR}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  rtl={true}
                  libelle={translate('co.cumul')}
                  libelleSize={2}
                  value={co.cumul}
                />
                <ComBadrKeyValueComp
                  rtl={true}
                  libelle={translate('co.importateurAdresseAR')}
                  libelleSize={2}
                  value={co.importateurAdresseAR}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  rtl={true}
                  libelle={translate('co.detailExpeditionAR')}
                  // libelleSize={2}
                  value={co.detailExpeditionAR}
                />
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <ComBadrKeyValueComp
                  rtl={true}
                  libelle={translate('co.remarques')}
                  // libelleSize={2}
                  value={co.remarques}
                />
              </Row>
            </Grid>
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
