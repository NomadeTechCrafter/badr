import React from 'react';

import {ScrollView} from 'react-native';

import {DataTable} from 'react-native-paper';

import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../../common/constants/controle/listDeclarationDum';

/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';

import * as RechecheDumAction from '../../../redux/actions/controle/listDeclarationDum';
import {ComCopyPasteComp} from '../../../components';

class ListDeclarationDum extends React.Component {
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
    //this.typeControle ='RI'; //(props.route.params.typeControle) ? props.route.params.typeControle : 'RI';
  }
  getSuccessRedirectionScreen = () => {
    switch (this.state.typeControle) {
      case 'RI':
        return 'RegimeInterne';
      case 'AC':
        return 'ACVP';
      case 'TR':
        return 'RegimeTransit';
    }
  };
  getCommandeScreen = () => {
    switch (this.state.typeControle) {
      case 'RI':
        return 'initControlerDedRI';
      case 'AC':
        return 'initControlerDedACVP';
      case 'TR':
        return 'initControlerDedTR';
    }
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  onItemSelected = (item) => {
    console.log('selection item declaration', this.props.successRedirection);
    this.setState({showErrorMsg: true});
    if (this.state.regime && this.state.serie) {
      this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

      if (this.state.cle === this.state.cleValide) {
        /*var referenceDed =
          this.state.bureau +
          this.state.regime +
          this.state.annee +
          this.state.serie;*/
        var data = {
          referenceDed: item.reference,
          numeroVoyage: item.numVoyage,
        };
        var action = RechecheDumAction.request(
          {
            type: Constants.LISTDECLARATION_REQUEST,
            value: {
              login: this.state.login,
              commande: this.getCommandeScreen(),
              data: data,
              cle: this.state.cle,
            },
          },
          this.props.navigation,
          (this.props.successRedirection = this.getSuccessRedirectionScreen()),
        );
        this.props.dispatch(action);
        console.log('dispatch fired !!');
      }
    }
  };

  render() {
    let rows = [];
    if (this.state.listeDeclaration) {
      rows = this.state.listeDeclaration;
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
                rows.map((item) => (
                  <DataTable.Row
                    key={item.reference}
                    onPress={() => this.onItemSelected(item)}>
                    <DataTable.Cell
                      style={{width: 300}}
                      children={<ComCopyPasteComp value={item.reference} />}
                    />
                    <DataTable.Cell
                      style={{width: 150}}
                      children={<ComCopyPasteComp value={item.numVoyage} />}
                    />
                    <DataTable.Cell
                      style={{width: 150}}
                      children={<ComCopyPasteComp value={item.numeroVersion} />}
                    />
                    <DataTable.Cell
                      style={{width: 200}}
                      children={
                        <ComCopyPasteComp value={item.dateCreationVersion} />
                      }
                    />

                    <DataTable.Cell
                      style={{width: 200}}
                      children={
                        <ComCopyPasteComp value={item.dateEnregVersion} />
                      }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListDeclarationDum);
