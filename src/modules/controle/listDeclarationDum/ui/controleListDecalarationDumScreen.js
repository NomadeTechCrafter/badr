import React from 'react';

import {ScrollView, View} from 'react-native';

import {connect} from 'react-redux';

/**ACTIONS */
import * as RechecheRefDumAction from '../../rechercheDum/state/actions/controleRechercheRefDumAction';
import * as Constants from '../../rechercheDum/state/controleRechercheRefDumConstants';

/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';

import {
  ComBadrErrorMessageComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
  ComControleRechercheRefComp,
  ComCopyPasteComp,
} from '../../../../commons/component';

class controleListDecalarationDumScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bureau: '',
      regime: '',
      annee: '',
      serie: '',
      cle: '',
      cleValide: '',
      login: props.route.params.login,
      typeControle: props.route.params.typeControle,
      numeroVoyage: '',
      showErrorMsg: false,
      offset: 0,
      currentPage: 0,
      showDetail: false,
      item: {},
      listeDeclaration: props.route.params.listeDeclaration,
    };
    this.cols = [
      {
        code: 'reference',
        libelle: translate('controle.declaration'),
        width: 300,
      },
      {
        code: 'numVoyage',
        libelle: translate('controle.nVoyage'),
        width: 150,
      },
      {
        code: 'numeroVersion',
        libelle: translate('controle.version'),
        width: 150,
      },
      {
        code: 'dateCreationVersion',
        libelle: translate('controle.dateCreation'),
        width: 200,
      },
      {
        code: 'dateEnregVersion',
        libelle: translate('controle.dateEnregistrement'),
        width: 200,
      },
    ];
    console.info('in constructor', props.route.params.typeControle);
    //this.typeControle ='RI'; //(props.route.params.typeControle) ? props.route.params.typeControle : 'RI';
  }

  /*getSuccessRedirectionScreen = () => {
    switch (this.props.route.params.typeControle) {
      case 'RI':
        return 'ControleRegimeInterneScreen';
      case 'AC':
        return 'ControleACVPScreen';
      case 'TR':
        return 'ControleRegimeTransitScreen';
    }
  };

  getCommandeScreen = () => {
    switch (this.props.route.params.typeControle) {
      case 'RI':
        return 'initControlerDedRI';
      case 'AC':
        return 'initControlerDedACVP';
      case 'TR':
        return 'initControlerDedTR';
    }
  };*/

  getInfoControle = () => {
    let typeControle = this.props.route.params.typeControle;
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

  componentDidMount() {
    console.info('-------componentDidMount-------');
  }

  componentDidUpdate(prevProps, prevState) {
    console.info('-------componentDidUpdate-------');
  }

  onItemSelected = (item) => {
    var data = {
      referenceDed: item.reference,
      numeroVoyage: item.numVoyage,
    };
    var action = RechecheRefDumAction.request(
      {
        type: Constants.RECHERCHEREFDUM_REQUEST,
        value: {
          login: this.state.login,
          commande: this.getInfoControle().commande,
          module: 'CONTROL_LIB',
          typeService: 'UC',
          data: data,
          referenceDed: item.reference,
          cle: this.state.cle,
        },
      },
      this.props.navigation,
      this.getInfoControle().successRedirectionScreen,
    );
    this.props.actions.dispatch(action);
  };

  render() {
    let rows = [];
    console.info(
      '-------render List-------',
      this.props.route.params.listeDeclaration.length,
    );
    if (this.props.route.params.listeDeclaration) {
      rows = this.props.route.params.listeDeclaration;
    }
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('controle.title')}
          subtitle={this.getInfoControle().subtitle}
          icon="menu"
        />
        {this.props.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.props.errorMessage} />
        )}
        <ComBasicDataTableComp
          ref="_badrTable"
          id="listeDeclarationControle"
          rows={rows}
          cols={this.cols}
          onItemSelected={(row) => this.onItemSelected(row)}
          totalElements={rows.length}
          maxResultsPerPage={10}
          paginate={true}
          showProgress={this.props.showProgress}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.controleRechercheRefDumReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(controleListDecalarationDumScreen);
