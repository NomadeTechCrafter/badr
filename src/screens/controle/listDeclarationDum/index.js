import React, { Component }   from 'react';

import {View, Text, Dimensions, ScrollView,StyleSheet} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

/** REDUX **/
import {bindActionCreators} from 'redux';
import _ from 'lodash';


import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../common/constants/controle/listDeclarationDum';

/**i18n */
import {translate} from '../../common/translations/i18n';

import * as RechecheDumAction from '../../redux/actions/controle/listDeclarationDum';

import {BadrButton} from '../../components/buttons/Button';
import {BadrTextInput} from '../../components/inputs/TextInput';
import {BadrErrorMessage} from '../../components/messages/Error';
import {BadrInfoMessage} from '../../components/messages/Info';
import {BadrProgressBar} from '../../components/progressbars/BadrProgressBar';

import {CustomStyleSheet} from '../../styles/index';

import {load} from '../../services/storage-service';

/** CONSTANTS **/
const screenHeight = Dimensions.get('window').height;
const MAX_RESULTS_PER_PAGE = 10;
class ListDeclarationDum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      currentPage: 0,
      showDetail: false,
      item: {},
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const {offset} = this.state;
    if (prevState.offset !== offset) {
      console.log('-------');
      console.log(this.ref);
      console.log('-------');
      this.loadMore(this.props.route.params.searchState);
    }
  }

    listDeclarationSearchAction = searchObject => {
    var action = RechecheDumAction.searchListeDeclaration({
      type: Constants.RECHERCHEDUM_LISTDECLARATION_REQUEST,
      value: {
        login: this.props.route.params.login,
        typeControle: searchObject,
        //pageSize: MAX_RESULTS_PER_PAGE,
        //offset: this.state.offset,
      },
    });
    return action;
  };

  loadMore = searchState => {
    /**
      Load more data ...
    */
    let action = this.listDeclarationSearchAction(searchState);
    this.props.actions.dispatch(action);
  };

  onItemSelected = item => {
    console.log('selection item declaration',this.props.successRedirection);
    this.setState({showErrorMsg: true});
    if (this.state.regime && this.state.serie) {
      this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

      if (this.state.cle == this.state.cleValide) {
        var referenceDed =
          this.state.bureau +
          this.state.regime +
          this.state.annee +
          this.state.serie;
        var data = {
          referenceDed: item.reference,
          numeroVoyage: item.numVoyage,
        };
        var action = RechecheDumAction.request(
          {
            type: Constants.RECHERCHEDUM_INITCONTROLE_REQUEST,
            value: {
              login: this.state.login,
              commande: this.props.commande,
              data: data,
              cle: this.state.cle,
            },
          },
          this.props.navigation,
          this.props.successRedirection,
        );
        this.props.dispatch(action);
        console.log('dispatch fired !!');
      }
    }
  };

  render() {
    let pageCount = 0;
    let rows = [];
    let mItem = null;
    if (this.props.value && this.props.value.jsonVO) {
      rows = this.props.value.jsonVO;
      pageCount = this.props.value.jsonVO.length;
  
    }
    return (
      <ScrollView horizontal={true}>
        {!this.props.showProgress && (
          <ScrollView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{width: 300}}>
                  {translate('controle.declaration')}
                </DataTable.Title>
                <DataTable.Title style={{width: 150}}>
                  {translate('controle.nVoyage')}
                </DataTable.Title>
                <DataTable.Title style={{width: 150}}>
                  {translate('controle.version')}
                </DataTable.Title>
                <DataTable.Title style={{width: 200}}>
                  {translate('controle.dateCreation')}
                </DataTable.Title>
                <DataTable.Title style={{width: 200}}>
                  {translate('controle.dateEnregistrement')}
                </DataTable.Title>
              </DataTable.Header>
              {rows ? (
                rows.map((item, index) => (
                  <DataTable.Row
                    key={item.reference}
                    onPress={() => this.onItemSelected(item)}>
                    <DataTable.Cell
                      style={{width: 300}}
                      children={<CopyPaste value={item.reference} />}
                    />
                    <DataTable.Cell 
                    style={{width: 150}}
                    children={<CopyPaste value={item.numVoyage} />}
                   
                    />
                    <DataTable.Cell
                      style={{width: 150}}
                      children={<CopyPaste value={item.numeroVersion} />}
                    />
                    <DataTable.Cell
                      style={{width: 200}}
                      children={<CopyPaste value={item.dateCreationVersion} />}
                     
                    />

                    <DataTable.Cell
                      style={{width: 200}}
                      children={<CopyPaste value={item.dateEnregVersion} />}
                      
                    />
                  </DataTable.Row>
                ))
              ) : (
                <DataTable.Row />
              )}

      
            </DataTable>

     
          </ScrollView>
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.listDeclarationReducer};
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
)(ListDeclarationDum);
