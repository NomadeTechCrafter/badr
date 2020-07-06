import React from 'react';

import {ScrollView} from 'react-native';
import {Toolbar} from '../../../components';
import {DataTable} from 'react-native-paper';

import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../../common/constants/controle/listDeclarationDum';

/**i18n */
import {translate} from '../../../common/translations/i18n';

import * as RechecheDumAction from '../../../redux/actions/controle/listDeclarationDum';
import {CopyPaste} from '../../../components';
import {View} from 'react-native-animatable';

class ListDeclarationDum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: props.route.params.login,
      typeControle: props.route.params.typeControle,
      showErrorMsg: false,
      offset: 0,
      currentPage: 0,
      showDetail: false,
      item: {},
      listeDeclaration: props.route.params.listeDeclaration,
    };
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

  onItemSelected = (item) => {
    console.log('selection item declaration', item);
    let infoControle = this.getInfoControle();
    this.setState({showErrorMsg: true});

    var data = {
      referenceDed: item.reference,
      numeroVoyage: item.numVoyage,
    };
    var action = RechecheDumAction.request(
      {
        type: Constants.LISTDECLARATION_REQUEST,
        value: {
          login: this.state.login,
          commande: infoControle.commande,
          data: data,
          cle: this.state.cle,
        },
      },
      this.props.navigation,
      infoControle.successRedirectionScreen,
    );
    this.props.dispatch(action);
    console.log('dispatch fired !!');
  };

  render() {
    let rows = [];
    let infoControle = this.getInfoControle();
    if (this.state.listeDeclaration) {
      rows = this.state.listeDeclaration;
    }
    return (
      <View>
        <Toolbar
          navigation={this.props.navigation}
          title={translate('transverse.listDeclaration')}
          subtitle={infoControle.subtitle}
          icon="menu"
        />
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
                        children={
                          <CopyPaste value={item.dateCreationVersion} />
                        }
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
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.listDeclarationReducer};
}

export default connect(mapStateToProps, null)(ListDeclarationDum);
