import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
  accentColor,
  lightWhiteColor,
  blueLabelColor,
} from '../../../../../commons/styles/ComThemeStyle';
import {ComBadrCardSectionComp} from '../../../../components';
export class InfoCommon extends React.Component {
  render() {
    return (
      <View>
        {/* Référence AT */}
        <ComBadrCardSectionComp style={styles.CardSectionInfo}>
          <View style={styles.containerLibRow}>
            <Text style={styles.libelleTitleM}>
              {translate('transverse.bureau')}
            </Text>
            <Text style={styles.libelleTitleM}>
              {translate('transverse.annee')}
            </Text>
            <Text style={styles.libelleTitleM}>
              {translate('transverse.numero')}
            </Text>
            <Text style={styles.libelleTitleL}>
              {translate('transverse.serie')}
            </Text>
            <Text style={styles.libelleTitleM}>{translate('at.statut')}</Text>
          </View>
          <View style={styles.containerValRow}>
            <Text style={styles.libelleValM}>{this.props.bureau}</Text>
            <Text style={styles.libelleValM}>{this.props.annee}</Text>
            <Text style={styles.libelleValM}>{this.props.numeroOrdre}</Text>
            <Text style={styles.libelleValL}>{this.props.serie}</Text>
            <Text style={styles.libelleValM}>{this.props.etat}</Text>
          </View>
        </ComBadrCardSectionComp>
        {/* Dates creation, enreg AT */}
        <ComBadrCardSectionComp style={styles.CardSectionInfo}>
          <View style={styles.containerLibRow}>
            <Text style={styles.libelleTitleL}>
              {translate('at.dateCreation')}
            </Text>
            <Text style={styles.libelleTitleL}>
              {translate('at.dateEnregistrement')}
            </Text>
            <Text style={styles.libelleTitleS}>{translate('at.version')}</Text>
          </View>
          <View style={styles.containerValRow}>
            <Text style={styles.libelleValL}>{this.props.dateCreation}</Text>
            <Text style={styles.libelleValL}>
              {this.props.dateEnregistrement}
            </Text>
            <Text style={styles.libelleValS}>{this.props.numVersion}</Text>
          </View>
        </ComBadrCardSectionComp>
      </View>
    );
  }
}

const libelleTitle = {
  fontSize: 14,
  color: blueLabelColor,
};

const libelleVal = {
  fontSize: 14,
  color: '#444444',
};

const containerRow = {
  flexDirection: 'row',
  padding: 10,
  borderRadius: 6,
  shadowColor: 'rgba(59,59,59,0.04)',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0,
  shadowRadius: 1,
  elevation: 2,
};

const styles = {
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
};
