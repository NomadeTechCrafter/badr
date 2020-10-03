import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  ComBadrToolbarComp,
  ComBadrAutoCompleteComp,
} from '../../../../commons/component';
import {Button, DataTable} from 'react-native-paper';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {connect} from 'react-redux';
import * as Constants from '../../../common/constants/mainLevee/listeDeclarationsMLV';
import * as listeDeclarationsMLVAction from '../../../redux/actions/mainLevee/listeDeclarationsMLV';
//const MAX_RESULTS_PER_PAGE = 10;

class ListDeclarationMLV extends Component {
  defaultState = {
    operateurCode: '',
    typeRegimeCode: '',
    showErrorMsg: false,
  };
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }
  confirmer = () => {
    this.setState({showErrorMsg: true});

    if (this.state.operateurCode && this.state.typeRegimeCode) {
      var data = {
        identificateurOperateur: this.state.operateurCode,
        regimebean: this.state.typeRegimeCode,
      };
      var action = listeDeclarationsMLVAction.request(
        {
          type: Constants.MAINLEVEE_LISTEDECLARATIONS_REQUEST,
          value: {data: data},
        } /*,
                    this.props.navigation,
                    this.props.successRedirection,*/,
      );
      this.props.dispatch(action);
    }
  };
  retablir = () => {
    this.setState({...this.defaultState});
    this.CmbRegimByCode.clearInput();
    this.CmbOperateur.clearInput();
  };
  handleRegimeChanged = (item, id) => {
    this.setState({typeRegimeCode: item.code});
  };
  handleOperateurChanged = (item, id) => {
    this.setState({operateurCode: item.code});
  };
  render() {
    let rows = [];
    if (this.props.value && this.props.value.jsonVO) {
      rows = this.props.value.jsonVO;
    }
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('mainlevee.title')}
          subtitle={translate('mainlevee.delivrerMainlevee.title')}
          icon="menu"
        />

        <ComBadrAutoCompleteComp
          onRef={(ref) => (this.CmbRegimByCode = ref)}
          libelle="Regime"
          key="CmbRegimByCode"
          handleSelectItem={(item, id) => this.handleRegimeChanged(item, id)}
          command="getRegimByCode"
        />

        <ComBadrAutoCompleteComp
          onRef={(ref) => (this.CmbOperateur = ref)}
          libelle="Operateur"
          key="CmbOperateur"
          handleSelectItem={(item, id) => this.handleOperateurChanged(item, id)}
          command="getCmbOperateur"
        />

        <View style={styles.containerBtn}>
          <Button
            onPress={this.confirmer}
            mode="contained"
            icon="check"
            compact="true"
            style={styles.btnConfirmer}>
            {translate('transverse.confirmer')}
          </Button>
          <Button
            onPress={this.retablir}
            icon="autorenew"
            mode="contained"
            style={styles.btnRetablir}>
            {translate('transverse.retablir')}
          </Button>
        </View>

        <ScrollView horizontal={true}>
          {!this.props.showProgress && (
            <View>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={{width: 150}}>
                    {translate('mainlevee.referenceDeclaration')}
                  </DataTable.Title>
                  <DataTable.Title style={{width: 90}}>
                    {translate('mainlevee.numVoyage')}
                  </DataTable.Title>
                  <DataTable.Title style={{width: 90}}>
                    {translate('mainlevee.numVersion')}
                  </DataTable.Title>
                  <DataTable.Title style={{width: 150}}>
                    {translate('mainlevee.operateurDeclarant')}
                  </DataTable.Title>
                  <DataTable.Title style={{width: 140}}>
                    {translate('mainlevee.dateCreation')}
                  </DataTable.Title>
                  <DataTable.Title style={{width: 140}}>
                    {translate('mainlevee.dateEnregistrement')}
                  </DataTable.Title>
                </DataTable.Header>
                {rows ? (
                  rows.map((item, index) => (
                    <DataTable.Row
                      key={item.identifiantDMD}
                      onPress={() => this.onItemSelected(item)}>
                      <DataTable.Cell
                        style={{width: 150}}
                        children={item.refDeclaration}
                      />
                      <DataTable.Cell style={{width: 90}} />
                      <DataTable.Cell
                        style={{width: 90}}
                        children={item.numVersion}
                      />
                      <DataTable.Cell
                        style={{width: 150}}
                        children={item.opeDeclarant}
                      />

                      <DataTable.Cell
                        style={{width: 140}}
                        children={item.declarationDateCreation}
                      />
                      <DataTable.Cell
                        style={{width: 140}}
                        children={item.declarationDateEnrg}
                      />
                    </DataTable.Row>
                  ))
                ) : (
                  <DataTable.Row />
                )}
              </DataTable>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnConfirmer: {
    color: '#FFF',
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: '#FFF',
    padding: 5,
  },
});
const mapStateToProps = (state) => ({...state.listeDeclarationsMLVReducer});

export default connect(mapStateToProps, null)(ListDeclarationMLV);
