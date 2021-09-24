import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { Col, Row } from 'react-native-easy-grid';

import InfoCommon from '../common/AtInfoCommonScreen';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import * as CreateApurementAction from '../../../state/actions/atApurementCreateAction';
import * as InitApurementAction from '../../../state/actions/atApurementInitAction';
import * as ConstantsAt from '../../../state/atConstants';

/** Utils */
import ComUtils from '../../../../../../commons/utils/ComUtils';
/** Inmemory session */
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';

import {
  ComBadrToolbarComp,
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBasicDataTableComp,
  ComBadrCardWithTileComp,
  ComBadrDatePickerComp,
  ComBadrActionButtonComp,
} from '../../../../../../commons/component';
import moment from 'moment';

class AtHistorique extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
    };

    this.cols = [
      {
        code: 'dateHeureIntervention',
        libelle: translate('at.historique.date'),
        width: 150,
      },
      {
        code: 'version',
        libelle: translate('at.version'),
        width: 80,
      },
      {
        code: 'intervention',
        libelle: translate('at.historique.intervention'),
        width: 120,
      },
      {
        code: 'etatResultat',
        libelle: translate('at.historique.etatResultat'),
        width: 100,
      },
      {
        code: 'utilisateur',
        libelle: translate('at.historique.utilisateur'),
        width: 150,
      },
      {
        code: 'commentaire',
        libelle: translate('at.historique.commentaire'),
        width: 200,
      },
    ];
  }

  componentDidMount = () => {
  };

  componentWillUnmount() {
  }

  render() {
    const atVo: any = this.props.data;
    return (
      <View style={styles.fabContainer}>
        <ScrollView
          ref={(c) => {
            this.scroll = c;
          }}>


          {atVo != null && atVo.atEnteteVO != null && (
            <ComContainerComp>
              {/* Information commun */}
              <InfoCommon
                bureau={atVo.atEnteteVO.bureau}
                annee={atVo.atEnteteVO.annee}
                numeroOrdre={atVo.atEnteteVO.numeroOrdre}
                serie={atVo.atEnteteVO.serie}
                dateEnregistrement={atVo.atEnteteVO.dateEnregistrement}
                dateCreation={atVo.atEnteteVO.dateCreation}
                numVersion={atVo.atEnteteVO.numVersion}
                etat={atVo.atEnteteVO.etatAt.libelle}
                etatValidation={atVo.atEnteteVO.etatValidation}
              />

              <ComBadrCardBoxComp style={styles.cardBox}>
                <Text style={styles.titleTab}>
                  {translate('at.historique.title')} : {atVo.atHistoriqueVOs.length}
                </Text>
                <ComBasicDataTableComp
                  ref="_badrTable"
                  id="date"
                  rows={atVo.atHistoriqueVOs}
                  cols={this.cols}
                  onItemSelected={this.onItemSelected}
                  maxResultsPerPage={10}
                  paginate={true}
                  showProgress={this.props.showProgress}
                />
              </ComBadrCardBoxComp>

            </ComContainerComp>
          )}
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.atConsulterReducer };
}

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AtHistorique);

const styles = StyleSheet.create({
  fabContainer: {
    height: '100%',
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
  },
  titleTab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    ...CustomStyleSheet.badrPickerTitle,
  },
});
