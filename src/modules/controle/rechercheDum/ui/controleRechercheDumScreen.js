import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {
  ComBadrToolbarComp,
  ComBadrButtonIconComp,
} from '../../../../commons/component';
import ComControleRechercheRefComp from '../../common/component/ControleCommonRechercheRefComp';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import {connect} from 'react-redux';
import * as Constants from '../../common/state/controleCommonConstants';
import * as ListDeclarationAction from '../../common/state/actions/controleCommonListDeclarationAction';

class controleRechercheDumScreen extends Component {
  subTitle = '';
  constructor(props) {
    super(props);
  }

  getInfoControle = () => {
    let typeControle = 'AC'; // this.props.route.params.typeControle;
    switch (typeControle) {
      case 'RI':
        return {
          successRedirectionScreen: 'ControleRegimeInterneScreen',
          subtitle: translate('controle.RI'),
          commande: 'initControlerDedRI',
        };
      case 'AC':
        return {
          successRedirectionScreen: 'ControleACVPScreen',
          subtitle: translate('controle.ACVP'),
          commande: 'initControlerDedACVP',
        };
      case 'TR':
        return {
          successRedirectionScreen: 'ControleRegimeTransitScreen',
          subtitle: translate('controle.regimeTransite'),
          commande: 'initControlerDedTR',
        };
    }
  };

  listDeclarationSearchAction = () => {
    return ListDeclarationAction.searchListeDeclaration(
      {
        type: Constants.LISTDECLARATION_CONTROLE_COMMUN_REQUEST,
        value: {
          login: ComSessionService.getInstance().getLogin(),
          typeControle: this.props.route.params.typeControle,
          offset: 0,
          pageSize: 100,
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
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('controle.title')}
          subtitle={infoControle.subtitle}
          icon="menu"
        />
        <View style={styles.rechercheDum}>
          <ComControleRechercheRefComp
            module="CONTROL_LIB"
            commande={infoControle.commande}
            typeService="UC"
            navigation={this.props.navigation}
            successRedirection={infoControle.successRedirectionScreen}
            routeParams={this.props.route.params}
          />
        </View>

        <View style={styles.listDeclarationStyle}>
          <ComBadrButtonIconComp
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

const mapStateToProps = (state) => ({...state.controleCommonReducer});

export default connect(mapStateToProps, null)(controleRechercheDumScreen);
