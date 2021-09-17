import React from 'react';

import {View} from 'react-native';

import {ComBadrToolbarComp} from '../../../../../commons/component';
import RefOperateursEconomiquesSearchComponent from '../../component/refOperateursEconomiquesSearchComponent';

import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/refOperateursEconomiquesStyle';

import * as Constants from '../../state/refOperateursEconomiquesConstants';

import * as RefOperateursEconomiquesSearchAction from '../../state/actions/refOperateursEconomiquesSearchAction';
import * as RefOperateursEconomiquesConfirmAction from '../../state/actions/refOperateursEconomiquesConfirmAction';

class DebloquerOperateur extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      this.reset();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
    this.reset();
  }

  reset = () => {
    let action = RefOperateursEconomiquesSearchAction.init(
      {
        type: Constants.SEARCH_OPERATEURS_ECONOMIQUES_INIT,
        value: {},
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };

  debloquer = (row) => {
    let action = RefOperateursEconomiquesConfirmAction.request(
      {
        type: Constants.CONFIRM_OPERATEURS_ECONOMIQUES_REQUEST,
        value: {idBlocage: row.idBlocage},
        mode: 'unblock',
      },
      this.props.navigation, () => { }
    );
    this.props.actions.dispatch(action);
  };

  render() {
    return (
      <View style={style.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('operateursEconomiques.debloquerOperateur.title')}
        />

        {this.props.searchMode && (
          <RefOperateursEconomiquesSearchComponent
            navigation={this.props.navigation}
            includeInvalid={false}
            onAction={this.debloquer}
            typeRecherche={'TYPE_RECHERCHE_ANNULATION'}
          />
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.refOperateursEconomiquesReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DebloquerOperateur);
