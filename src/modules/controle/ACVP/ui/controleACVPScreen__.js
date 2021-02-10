import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';

import {
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';

import BAD from '../../BAD';
import {Checkbox, TextInput, Text, RadioButton} from 'react-native-paper';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';
import {load} from '../../../../commons/services/async-storage/ComStorageService';
import {connect} from 'react-redux';
import * as Constants from '../state/controleACVPConstants';
import * as RegimeACVPAction from '../state/actions/controleACVPAction';
import ControleCoreComponent from '../../ACVP/component/controleCoreComponent';
import * as ControleRechercheRefDumAction from '../../common/state/actions/controleCommonRechercheRefDumAction';
import * as controleCommonConstants from '../../common/state/controleCommonConstants';

class ControleACVPScreen extends Component {
  constructor(props) {
    super(props);
    console.log('---test constructor----');
  }

  /*componentDidMount() {
    console.log('---tcomponentDidMount parent----');
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      console.log('---tcomponentDidMount parent unsbscrib----');
      this.reset();
    });
  }

  componentWillUnmount() {
    console.log('---test componentWillUnmount parent----');
    this._unsubscribe();
  }

  reset = () => {
    let action = ControleRechercheRefDumAction.init(
      {
        type: controleCommonConstants.INIT_CONTROLE_COMMUN_INIT,
        value: {},
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  };*/

  render() {
    console.log('render parent----', JSON.stringify(this.props));
    return (
      this.props.data &&
      this.props.data.init && (
        <ControleCoreComponent
          navigation={this.props.navigation}
          controleVo={this.props.data.init}
          refDeclaration={this.props.data.refDeclaration}
        />
      )
    );
  }
}

const libelle = {
  fontSize: 14,
  color: '#006acd',
};

const styles = {
  cardBoxInfoDum: {
    flexDirection: 'column',
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  containerActionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  libelleS: {
    ...libelle,
    flex: 1,
  },
  libelleM: {
    ...libelle,
    flex: 2,
  },
  libelleL: {
    ...libelle,
    flex: 3,
  },
  decisionContainerRB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#009ab2',
    padding: 8,
    width: 300,
  },
  textRadio: {
    color: '#FFF',
  },
  flexColumn: {flexDirection: 'column'},
};

//const mapStateToProps = (state) => ({...state.controleACVPReducer});

function mapStateToProps(state) {
  return {...state.controleCommonReducer};
}

export default connect(mapStateToProps, null)(ControleACVPScreen);
