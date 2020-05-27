import React, {Component} from 'react';
import {View} from 'react-native';
import {RechercheRefDum, Toolbar} from '../../../components';

import {connect} from 'react-redux';

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
  typeControle = '';
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.typeControle = this.props.route.params.typeControle; //(props.route.params.typeControle) ? props.route.params.typeControle : 'RI';
  }
  getSuccessRedirectionScreen = () => {
    switch (this.typeControle) {
      case 'RI':
        return 'RegimeInterne';
      case 'AC':
        return 'ACVP';
    }
  };
  render() {
    return (
      <View>
        <Toolbar
          navigation={this.props.navigation}
          title="Contrôle"
          subtitle="Régime interne"
          icon="menu"
        />
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
