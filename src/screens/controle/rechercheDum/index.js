import React, {Component} from 'react';
import {View} from 'react-native';
import {RechercheRefDum, Toolbar} from '../../../components';

import {BadrButtonIcon} from 'react-native-paper';
/**i18n */
import {translate} from '../../../common/translations/i18n';

import {connect} from 'react-redux';
import * as Constants from '../../../common/constants/controle/rechercheDum';
import * as RechecheDumAction from '../../../redux/actions/controle/rechercheDum';

class RechecheDum extends Component {
  subTitle = '';

  constructor(props) {
    super(props);
  }

  getInfoControle = () => {
    let typeControle = this.props.route.params.typeControle;
    console.log('  getSuccessRedirectionScreen', typeControle);
    switch (typeControle) {
      case 'RI':
        return {
          successRedirectionScreen: 'RegimeInterne',
          subtitle: translate('controle.RI'),
          commande: 'initControlerDedRI',
        };
      case 'AC':
        return {
          successRedirectionScreen: 'ACVP',
          subtitle: translate('controle.ACVP'),
          commande: 'initControlerDedACVP',
        };
      case 'TR':
        return {
          successRedirectionScreen: 'RegimeTransit',
          subtitle: translate('controle.regimeTransite'),
          commande: 'initControlerDedTR',
        };
    }
  };

  listDeclarationSearchAction = () => {
    var action = RechecheDumAction.searchListeDeclaration(
      {
        type: Constants.RECHERCHEDUM_LISTDECLARATION_REQUEST,
        value: {
          login: this.state.login,
          typeControle: this.typeControle,
          // pageSize: 10,
          // offset: 0,
        },
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  };
  listDeclarationSearch = () => {
    let action = this.listDeclarationSearchAction();
    this.props.actions.dispatch(action);
  };

  render() {
    let infoControle = this.getInfoControle();
    return (
      <View>
        <Toolbar
          navigation={this.props.navigation}
          title="Contrôle"
          subtitle={infoControle.subtitle}
          icon="menu"
        />
        <RechercheRefDum
          module="CONTROL_LIB"
          commande={infoControle.commande}
          typeService="UC"
          navigation={this.props.navigation}
          successRedirection={infoControle.successRedirectionScreen}
          routeParams={this.props.route.params}
        />
        <BadrButtonIcon
          onPress={() => this.listDeclarationSearch()}
          icon="magnify"
          loading={this.props.showProgress}
          text={translate('transverse.listDeclaration')}
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
