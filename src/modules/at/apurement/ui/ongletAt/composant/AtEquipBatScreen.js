import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Checkbox, RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { Col, Row } from 'react-native-easy-grid';

import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import * as ConstantsAt from '../../../state/atConstants';

/** Utils */
import ComUtils from '../../../../../../commons/utils/ComUtils';
/** Inmemory session */
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';

import {
  ComBadrToolbarComp,
  ComContainerComp,
  ComBadrCardBoxComp,
  ComBadrButtonRadioComp,
  ComBadrPickerComp,
  ComBadrItemsPickerComp,
  ComAccordionComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBasicDataTableComp,
  ComBadrCardWithTileComp,
  ComBadrDatePickerComp,
  ComBadrActionButtonComp,
} from '../../../../../../commons/component';
import moment from 'moment';

class AtEquipBat extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    console.log('this.props.bateau');
    console.log(this.props.bateau);

    this.cols = [
      {
        code: 'typeIdentifiant.libelle',
        libelle: translate('at.typeIdent'),
        width: 150,
      },
      {
        code: 'identifiant',
        libelle: translate('at.identifiant'),
        width: 100,
      },
      {
        code: 'pays.libelle',
        libelle: translate('at.pays'),
        width: 100,
      },
      {
        code: 'nom',
        libelle: translate('at.entete.nom'),
        width: 150,
      },
      {
        code: 'prenom',
        libelle: translate('at.entete.prenom'),
        width: 150,
      },
      {
        code: 'dateNaissance',
        libelle: translate('at.entete.dateNaissance'),
        width: 100,
      },
      {
        code: 'adresse',
        libelle: translate('at.composants.adresse'),
        width: 150,
      },
    ];
  }

  onItemSelected = (row) => {
  };


  componentDidMount = () => {
  };

  componentWillUnmount() {
  }

  render() {
    return (
        <ComBasicDataTableComp
          ref="_badrTable"
          id="identifiant"
          rows={this.props.bateau.listEquipages}
          cols={this.cols}
          onItemSelected={this.onItemSelected}
          totalElements={this.props.bateau.listEquipages.length}
          maxResultsPerPage={10}
          paginate={true}
          showProgress={this.props.showProgress}
        />
    );
  }
}
function mapStateToProps(state) {
  const combinedState = {
    initApurement: { ...state.initApurementReducer },
    atConsulter: { ...state.atConsulterReducer },
  };
  return combinedState;
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
)(AtEquipBat);

const styles = StyleSheet.create({
  
});
