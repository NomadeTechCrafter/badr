import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  ComAccordionComp,
  ComBadrCardSectionComp,
} from '../../../../commons/component';
import translate from '../../../../commons/i18n/ComI18nHelper';
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import {
  accentColor,
  atShadowColor,
  blueLabelColor,
  darkGrayColor,
  lightWhiteColor,
} from '../../../../commons/styles/ComThemeStyle';

import _ from 'lodash';
import ComUtils from '../../../../commons/utils/ComUtils';

class DedInfosCommunsBlock extends React.Component {
  defaultState = {
    bureau: '',
    regime: '',
    annee: '',
    serie: '',
    cle: '',
    numeroVoyage: '',
  };
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidMount = async () => {
    // if (this.props.route.params?.declarationRI.dedReferenceVO) {
    const refDeclaration = this.props.dedRef.reference;
    const libRegime=this.props.dedRef.libelleRegime;
    const type=this.props.dedRef.type;
  //  alert(JSON.stringify(this.props.dedRef.reference));
    this.setState({
      bureau: refDeclaration.slice(0, 3),
      regime: refDeclaration.slice(3, 6),
      annee: refDeclaration.slice(6, 10),
      serie: refDeclaration.slice(10, 17),
      libRegime: libRegime,
      type: type
    });
    //}
  };
  static getDerivedStateFromProps(props, state) {
    const refDeclaration = props.dedRef.reference
    return{
      ...state,
      bureau: refDeclaration.slice(0, 3),
      regime: refDeclaration.slice(3, 6),
      annee: refDeclaration.slice(6, 10),
      serie: refDeclaration.slice(10, 17),
      libRegime: props.dedRef.libelleRegime,
      type: props.dedRef.type
    }};

  componentWillUnmount() {}

  reset = () => {};
  getValueByPath = (key, object) => {
    return object ? _.get(object, key) : '';
  };

  getValueByPaths = (key1, key2, object) => {
    return _.get(object, key1) ? _.get(object, key1) : _.get(object, key2);
  };

  render() {
    // let dedRef = this.props?.route.params.declarationRI.dedReferenceVO;

    // let remplace6bis = this.getValueByPath('referenceT6BisRemplacee', dedRef);

    return (
      <View>
        <ComAccordionComp expanded={true}>
          <ComBadrCardSectionComp style={styles.CardSectionInfo}>
            <View style={styles.containerLibRow}>
              <Text style={styles.libelleTitleM}>
                {translate('dedCommunInfo.bureau')}
              </Text>
              <Text style={styles.libelleTitleM}>
                {translate('dedCommunInfo.regime')}
              </Text>
              <Text style={styles.libelleTitleM}>
                {translate('dedCommunInfo.annee')}
              </Text>
              <Text style={styles.libelleTitleL}>
                {translate('dedCommunInfo.serie')}
              </Text>
              <Text style={styles.libelleTitleL}>
                {translate('dedCommunInfo.cle')}
              </Text>
            </View>

            <View style={styles.containerLibRow}>
              <Text style={styles.libelleValM}>
                {ComSessionService.getInstance().getCodeBureau()}
              </Text>
              <Text style={styles.libelleValM}>{this.state.regime}</Text>
              <Text style={styles.libelleValM}>{this.state.annee}</Text>
              <Text style={styles.libelleValL}>{this.state.serie}</Text>
              <Text style={styles.libelleValL}>{ComUtils.cleDUM(this.props.dedRef.reference)}</Text>
            </View>
            <View style={styles.containerLibRow}>
              <Text style={styles.libelleTitleL}>
                {translate('dedCommunInfo.type')}
              </Text>
              <Text style={styles.libelleTitleM}>
                {translate('dedCommunInfo.libelleRegime')}
              </Text>
            </View>
            <View style={styles.containerLibRow}>
              <Text style={styles.libelleValL}>{this.state.type}</Text>
              <Text style={styles.libelleValL}>{this.state.libRegime}</Text>
            </View>

          </ComBadrCardSectionComp>
        </ComAccordionComp>
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

export default DedInfosCommunsBlock;
