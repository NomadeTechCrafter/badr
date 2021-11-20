import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {HelperText, TextInput, Button} from 'react-native-paper';
import {Col, Row} from 'react-native-easy-grid';
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComAtRechercheRefComp,
  ComBadrToolbarComp,
  ComBadrCardWithTileComp,
  ComBadrCardBoxComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
  ComBadrPickerComp,
  ComBadrAutoCompleteComp,
  ComBadrLibelleComp,
  ComBadrDialogComp,
  ComBasicDataTableComp,
} from '../../../../../commons/component';
import atRechercheAction, * as AtRechercheAction from '../../state/actions/atRechercheAction';
import atConsulterAction, * as AtConsulterAction from '../../state/actions/atConsulterAction';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../commons/styles/ComThemeStyle';
import * as ConstantsAt from '../../state/atConstants';

const initialState = {
  errorMessage: null,
};

class AtRechMultiResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
    this.cols = [
      {
        code: 'referenceAt',
        libelle: translate('at.apurement.reference'),
        width: 150,
      },
      {
        code: 'dateCreation',
        libelle: translate('at.dateCreation'),
        width: 150,
      },
      {
        code: 'dateDebutAt',
        libelle: translate('at.dateDebutAt'),
        width: 150,
      },
      {
        code: 'dateFinAt',
        libelle: translate('at.dateFinAt'),
        width: 150,
      },
      {
        code: 'statut',
        libelle: translate('at.statut'),
        width: 100,
      },
    ];
  }

  onItemSelected = (row) => {
    console.log(this.props.navigation);
    let action = AtConsulterAction.request(
      {
        type: ConstantsAt.CONSULTER_AT_REQUEST,
        value: {
          reference: row.referenceAt,
          enregistre: row.enregistree,
        },
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };

  componentDidUpdate() {
    if (
      this.props.route &&
      this.props.route.params &&
      this.props.route.params.first
    ) {
      // this.refs._badrTable.reset();
    }
  }

  render() {
    return (
      <ScrollView>
        <ComBadrCardBoxComp style={styles.cardBox}>
          <Text style={styles.margin10}>
            {translate('at.recherche.titleResult')} : {this.props.data.length}
          </Text>
          <ComBasicDataTableComp
            onRef={(ref) => (this.resultTable = ref)}
            key="resultTable"
            id="referenceAt"
            rows={this.props.data}
            // rowCount={rowCount}
            cols={this.cols}
            // command="recupererListAt"
            // module= {ConstantsAt.AT_MODULE}
            // typeService="SP"
            // searchObject={searchObject}
            onItemSelected={this.onItemSelected}
            totalElements={this.props.data.length}
            maxResultsPerPage={10}
            paginate={true}
            // paginateServer={true}
            showProgress={this.props.showProgress}
          />
          
        </ComBadrCardBoxComp>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.atRechercheReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AtRechMultiResultScreen);

const styles = StyleSheet.create({
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    margin: 15,
  },
  margin10: {
    margin: 10,
  },
});
