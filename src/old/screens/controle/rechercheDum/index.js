import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {RechercheRefDum, Toolbar, BadrButtonIcon} from '../../../components';
/**i18n */
import {translate} from '../../../../commons/i18n/I18nHelper';
import {Session} from '../../../../commons/services/session/Session';
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
    return RechecheDumAction.searchListeDeclaration(
      {
        type: Constants.RECHERCHEDUM_LISTDECLARATION_REQUEST,
        value: {
          login: Session.getInstance().getLogin(),
          typeControle: this.typeControle,
        },
      },
      this.props.navigation,
    );
  };
  listDeclarationSearch = () => {
    let action = this.listDeclarationSearchAction();
    this.props.dispatch(action);
  };

  render() {
    let infoControle = this.getInfoControle();
    return (
      <ScrollView>
        <Toolbar
          navigation={this.props.navigation}
          title={translate('controle.title')}
          subtitle={infoControle.subtitle}
          icon="menu"
        />
        <View style={styles.rechercheDum}>
          <RechercheRefDum
            module="CONTROL_LIB"
            commande={infoControle.commande}
            typeService="UC"
            navigation={this.props.navigation}
            successRedirection={infoControle.successRedirectionScreen}
            routeParams={this.props.route.params}
          />
        </View>

        <View style={styles.listDeclarationStyle}>
          <BadrButtonIcon
            onPress={() => this.listDeclarationSearch()}
            icon="magnify"
            loading={this.props.showProgress}
            text={translate('transverse.listDeclaration')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  listDeclarationStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  rechercheDum: {
    paddingTop: 30,
  },
};

const mapStateToProps = (state) => ({...state.controleRechercheDumReducer});

export default connect(mapStateToProps, null)(RechecheDum);
