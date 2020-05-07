import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Container, RechercheRefDum,Toolbar} from '../../../components';

import {TextInput, Button, HelperText} from 'react-native-paper';
/**i18n */
import {translate} from '../../../common/translations/i18n';
import {CustomStyleSheet} from '../../../styles';
import _ from 'lodash';

import {load} from '../../../services/storage-service';
import {connect} from 'react-redux';
import * as Constants from '../../../common/constants/controle/rechercheDum';
import * as RechecheDumAction from '../../../redux/actions/controle/rechercheDum';

class RechecheDum extends Component {
  defaultState = {
    bureau: '',
    regime: '',
    annee: '',
    serie: '',
    cle: '',
    cleValide: '',
    login: '',
    numeroVoyage: '',
    showErrorMsg: false,
  };
  typeControle ='';
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.typeControle ='RI'; //(props.route.params.typeControle) ? props.route.params.typeControle : 'RI';
  }
  getSuccessRedirectionScreen = () => {
    switch (this.typeControle) {
      case 'RI':
        return 'RegimeInterne';
        break;
      case 'AC':
        return 'ACVP';
    }
  };
  render() {
    return (
      <View>
      <Toolbar navigation={this.props.navigation} title="Contrôle" subtitle="Régime interne" icon="menu"/>
      <RechercheRefDum
        navigation={this.props.navigation}
        commande={'initControlerDedRI'}
        successRedirection={this.getSuccessRedirectionScreen()}
      />

      </View>
    );
  }
}

const mapStateToProps = state => ({...state.controleRechercheDumReducer});

export default connect(
  mapStateToProps,
  null,
)(RechecheDum);
