import React, {Component} from 'react';
import {View} from 'react-native';
import {Col, Row} from 'react-native-easy-grid';
import {HelperText, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  RechercheRefDum,
  ComBadrToolbarComp,
  ComBadrButtonRadioComp,
  ComBadrCardBoxComp,
  ComBadrCardWithTileComp,
} from '../../../../commons/component';

/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import * as MLVInitRechercheAction from '../state/actions/mlvInitRechercheAction';
import * as Constants from '../state/mlvRechercheConstants';
import styles from '../style/mlvRechercheStyle';
import EtatChargementBlock from './block/etatChargementTabSearchComponent';

class NewRechercheMLV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeRecherche: null,
    };

    this.radioButtonsTypeRecherche = [
      {
        id: '1',
        label: translate('newmlv.typeRecherche.declarationDetaille'),
        value: '1',
      },
      {
        id: '2',
        label: translate('newmlv.typeRecherche.etatChargement'),
        value: '2',
      },
    ];
    this.initRecherche();
  }

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('mlv rechercher focus start');
      this.setState({
        typeRecherche: null,
      });
    });
  };
  componentWillUnmount() {
    this._unsubscribe();
  }
  initRecherche = async () => {
    let action = await MLVInitRechercheAction.request(
      {
        type: Constants.MAINLEVEE_INIT_RECHERCHEDECLARATION_REQUEST,
        value: {},
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };
  render() {
    console.log('props', this.props.value?.jsonVO);
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('newmlv.title')}
          subtitle={translate('newmlv.delivrerMainlevee.title')}
          icon="menu"
        />

        {this.props.value?.jsonVO && this.state.typeRecherche == null && (
          <ComBadrButtonRadioComp
            onValueChange={(value) => this.setState({typeRecherche: value})}
            disabled={false}
            value={String(this.state.typeRecherche)}
            title={translate('newmlv.typeRecherche.typeRecherche')}
            radioButtonsData={this.radioButtonsTypeRecherche}
          />
        )}

        {this.props.value?.jsonVO && this.state.typeRecherche == '1' && (
          <RechercheRefDum
            commande={'initDelivrerMlv'}
            module="MLV_LIB"
            typeService="UC"
            successRedirection={'DelivrerMLV'}
            navigation={this.props.navigation}
            routeParams={this.props.route.params}
          />
        )}
        {!this.props.value?.jsonVO && (
          <RechercheRefDum
            commande={'initDelivrerMlv'}
            module="MLV_LIB"
            typeService="UC"
            successRedirection={'DelivrerMLV'}
            navigation={this.props.navigation}
            routeParams={this.props.route.params}
          />
        )}

        {this.props.value?.jsonVO && this.state.typeRecherche == '2' && (
          <EtatChargementBlock />
        )}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

function mapStateToProps(state) {
  //console.log('state mlv',state)
  return {...state.mlvRechercheReducer};
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRechercheMLV);
