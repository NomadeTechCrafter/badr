import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native-paper';
import { white } from 'react-native-paper/src/styles/colors';
import { ComBadrCardSectionComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import {
  accentColor,
  atShadowColor,
  blueLabelColor,
  darkGrayColor,
  lightWhiteColor,
} from '../../../../../commons/styles/ComThemeStyle';
import {
  cleDS,
  getAnnee,
  getBureau,
  getRegime,
  getSerie,
  getValueByPath,
} from '../../utils/DedUtils';

class DedRedressementInfoCommon extends React.Component {

  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    /*while (serie.length < 6) {
            serie = '0' + serie;
          }*/
    if (serie.length > 6) {
      let firstSerie = serie.substring(0, 1);
      if (firstSerie == '0') {
        serie = serie.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
  }

  render() {
    let couleurDecisionActivee = this.props?.searchData?.couleurDecisionActivee;
    let styleClasseEnteteByDecision = (couleurDecisionActivee) ? this.props?.searchData?.styleClasseEnteteByDecision : '';
    let circuit = ''
    let styleCircuit = '';
    switch (styleClasseEnteteByDecision) {
      case 'V':
        circuit = 'Circuit Vert';
        styleCircuit = styles.vert;
        break;
      case 'AC':
        circuit = 'Circuit Orange';
        styleCircuit = styles.orange;
        break;
      case 'VP':
        circuit = 'Circuit Rouge Partiel';
        styleCircuit = styles.red;
        break;
      case 'VI':
        circuit = 'Circuit Rouge Intégral';
        styleCircuit = styles.darkred;
        break;

      default:
        break;
    }
    return (
      <View style={styleCircuit}>
        <ComBadrCardSectionComp style={styles.CardSectionInfo}>
          <Row>
            <Col size={5}>
              <View style={styles.containerLibRow}>
                <Text style={styles.libelleTitleM}>
                  {translate('transverse.bureau')}
                </Text>
                <Text style={styles.libelleTitleM}>
                  {translate('transverse.regime')}
                </Text>
                <Text style={styles.libelleTitleL}>
                  {translate('transverse.annee')}
                </Text>
                <Text style={styles.libelleTitleL}>
                  {translate('transverse.serie')}
                </Text>
                <Text style={styles.libelleTitleM}>
                  {translate('transverse.cle')}
                </Text>
                <Text style={styles.libelleTitleL}>
                  {translate('transverse.nVoyage')}
                </Text>
                <Text style={styles.libelleTitleL}>
                  {translate('transverse.type')}
                </Text>
                <Text style={styles.libelleTitleL}>
                  {translate('dedouanement.transverse.libelleRegime')}
                </Text>
              </View>
              <View style={styles.containerValRow}>
                <Text style={styles.libelleValM}>
                  {getBureau(
                    getValueByPath('reference', this.props?.searchData),
                  )}
                </Text>
                <Text style={styles.libelleValM}>
                  {getRegime(
                    getValueByPath('reference', this.props?.searchData),
                  )}
                </Text>
                <Text style={styles.libelleValL}>
                  {getAnnee(
                    getValueByPath('reference', this.props?.searchData),
                  )}
                </Text>
                <Text style={styles.libelleValL}>
                  {getSerie(
                    getValueByPath('reference', this.props?.searchData),
                  )}
                </Text>
                <Text style={styles.libelleValM}>
                  {
                    this.cleDUM(
                      getRegime(
                        getValueByPath('reference', this.props?.searchData),
                      ), getSerie(
                        getValueByPath('reference', this.props?.searchData),
                      )
                    )
                  }
                </Text>
                <Text style={styles.libelleValL}>
                  {getValueByPath('nVoyage', this.props.searchData)}
                </Text>
                <Text style={styles.libelleValL}>
                  {getValueByPath(
                    'dedReferenceVO.libelleSupportDeclaratif',
                    this.props.data,
                  )}
                </Text>
                <Text style={styles.libelleValL}>
                  {getValueByPath('dedReferenceVO.libelleRegime', this.props.data)}
                </Text>
              </View>
            </Col>
            {couleurDecisionActivee && <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }} >
              <View >
                <Text style={{ fontSize: 14, color: white }}>
                  {circuit}
                </Text>
              </View>
            </Col>}
          </Row>
        </ComBadrCardSectionComp>
      </View >
    );
  }
}

const libelleTitle = {
  fontSize: 14,
  color: blueLabelColor,
};

const libelleVal = {
  fontSize: 14,
  color: darkGrayColor,
};

const containerRow = {
  flexDirection: 'row',
  padding: 10,
  borderRadius: 6,
  shadowColor: atShadowColor,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0,
  shadowRadius: 1,
  elevation: 2,
};

const styles = StyleSheet.create({
  CardSectionInfo: {
    flexDirection: 'column',
    borderRadius: 6,
    padding: 0,
    marginBottom: 10,
  },
  CardSectionValInfoAt: {
    flexDirection: 'column',
    backgroundColor: lightWhiteColor,
  },
  containerLibRow: {
    ...containerRow,
    marginBottom: 5,
    backgroundColor: accentColor,
  },
  containerValRow: {
    ...containerRow,
    backgroundColor: lightWhiteColor,
  },
  libelleTitleS: {
    ...libelleTitle,
    flex: 1,
  },
  libelleTitleM: {
    ...libelleTitle,
    flex: 2,
  },
  libelleTitleL: {
    ...libelleTitle,
    flex: 3,
  },
  libelleValS: {
    ...libelleVal,
    flex: 1,
  },
  libelleValM: {
    ...libelleVal,
    flex: 2,
  },
  libelleValL: {
    ...libelleVal,
    flex: 3,
  },
  red: {
    backgroundColor: '#FC0815',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%'
  },
  darkred: {
    backgroundColor: '#CA002A',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%'
  },
  orange: {
    backgroundColor: '#FF6600',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%'
  },
  vert: {
    backgroundColor: '#096A09',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%'
  },
});

export default DedRedressementInfoCommon;
