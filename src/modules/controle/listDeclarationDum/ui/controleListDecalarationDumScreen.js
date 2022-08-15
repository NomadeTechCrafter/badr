import React from 'react';

import {ScrollView, View} from 'react-native';

import {connect} from 'react-redux';
import ComUtils from '../../../../commons/utils/ComUtils';
/**ACTIONS */
import * as RechecheRefDumAction from '../../common/state/actions/controleCommonRechercheRefDumAction';
import * as Constants from '../../common/state/controleCommonConstants';

/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';

import {
  ComBadrErrorMessageComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
  ComControleRechercheRefComp,
  ComCopyPasteComp,
} from '../../../../commons/component';
import { Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native-paper';

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
      listeDeclaration: props.data.listDeclaration,
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

  getInfoControle = () => {
    let typeControle = this.props.route.params.typeControle;
    console.log('----getInfoControle---', typeControle);
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
    console.log('----onItemSelected---', item);
    var data = {
      referenceDed: item.reference,
      numeroVoyage: item.numVoyage ? item.numVoyage : '',
    };
    var action = RechecheRefDumAction.request(
      {
        type: Constants.INIT_CONTROLE_COMMUN_REQUEST,
        value: {
          login: this.state.login,
          commande: this.getInfoControle().commande,
          module: 'CONTROL_LIB',
          typeService: 'UC',
          data: data,
          referenceDed: item.reference,
          cle: ComUtils.cleDUM(item.reference),
        },
      },
      this.props.navigation,
      this.getInfoControle().successRedirectionScreen,
    );
    this.props.actions.dispatch(action);
  };

  render() {
    let rows = [];
    if (this.props.data.listDeclaration) {
      rows = this.props.data.listDeclaration;
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
        <Row size={100}>
          <Col size={20}>
            <Text>
              {translate('transverse.totalEnregistrements') + (rows.length ? rows.length : 0)}
            </Text>
          </Col>
        </Row>
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
  return {...state.controleCommonReducer};
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
