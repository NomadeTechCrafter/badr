import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {ComBadrCardSectionComp} from '../../../../../commons/component';
import {translate} from '../../../../../commons/i18n/I18nHelper';
import {
  accentColor,
  atShadowColor,
  blueLabelColor,
  darkGrayColor,
  lightWhiteColor,
} from '../../../../../commons/styles/theme';

class DedRedressementInfoCommon extends React.Component {
  render() {
    return (
      <View>
        <ComBadrCardSectionComp style={styles.CardSectionInfo}>
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
          </View>
          <View style={styles.containerValRow}>
            <Text style={styles.libelleValM}>{this.props.bureau}</Text>
            <Text style={styles.libelleValM}>{this.props.regime}</Text>
            <Text style={styles.libelleValL}>{this.props.annee}</Text>
            <Text style={styles.libelleValL}>{this.props.serie}</Text>
            <Text style={styles.libelleValM}>{this.props.cle}</Text>
            <Text style={styles.libelleValL}>{this.props.nVoyage}</Text>
            <Text style={styles.libelleValL}>{this.props.type}</Text>
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
});

export default DedRedressementInfoCommon;
