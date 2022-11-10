import React from 'react';
import {ScrollView, FlatList} from 'react-native';
import {View} from 'react-native';
import {Checkbox, TextInput, Text, RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
/**Custom Components */
import {
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBasicDataTableComp,
  ComBadrListComp,
  ComBadrButtonIconComp,
} from '../../../commons/component';
import translate from '../../../commons/i18n/ComI18nHelper';
import style from '../style/coStyle';
import {Divider} from 'react-native-paper';

class coResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    if (this.props.data && this.props.data?.listeNumScelle) {
      // console.log(JSON.stringify(Object.values(this.props.data?.listeNumScelle)));
    }
    this.cols = [
      {
        code: 'numeroMessage',
        libelle: translate('co.numeroMessage'),
        width: 150,
      },
      {
        code: 'dateMessage',
        libelle: translate('co.dateMessage'),
        width: 180,
      },
      {
        code: 'dateCreation',
        libelle: translate('co.dateCreation'),
        width: 180,
      },
      {
        code: 'referenceDeclaration',
        libelle: translate('co.referenceDeclaration'),
        width: 180,
      },
      {
        code: 'dateSortie',
        libelle: translate('co.dateSortie'),
        width: 180,
      },
      {
        code: 'agentSortie',
        libelle: translate('co.agentSortie'),
        width: 180,
      },
      {
        code: 'dateEntree',
        libelle: translate('co.dateEntree'),
        width: 180,
      },
      {
        code: 'agentEntree',
        libelle: translate('co.agentEntree'),
        width: 180,
      },
      {
        code: 'nomOperateurAutorise',
        libelle: translate('co.nomOperateurAutorise'),
        width: 200,
      },
      {
        code: 'portSec',
        libelle: translate('co.portSec'),
        width: 150,
      },
      {
        code: 'etat',
        libelle: translate('co.etat'),
        width: 150,
      },
      {
        code: 'referenceDs',
        libelle: translate('co.referenceDs'),
        width: 180,
      },
      {
        code: 'typeDs',
        libelle: translate('co.typeDs'),
        width: 150,
      },
      ,
      {
        code: 'avecScanner',
        libelle: translate('co.decisionScanner'),
        width: 150,
      },
    ];
    this.chauffeursCols = [
      {
        code: 'nomChauffeur',
        libelle: translate('co.nomChauffeur'),
        width: 150,
      },
      {
        code: 'prenomChauffeur',
        libelle: translate('co.prenomChauffeur'),
        width: 150,
      },
      {
        code: 'typeIdentifiantChauffeur',
        libelle: translate('co.typeIdentifiantChauffeur'),
        width: 150,
      },
      {
        code: 'identifiantChauffeur',
        libelle: translate('co.identifiantChauffeur'),
        width: 150,
      },
      {
        code: 'paysPasseportChauffeur',
        libelle: translate('co.paysPasseportChauffeur'),
        width: 150,
      },
    ];
    this.lotsCols = [
      {
        code: 'referenceLot',
        libelle: translate('co.referenceLot'),
        width: 150,
      },
      {
        code: 'codeLieuChargement',
        libelle: translate('co.codeLieuChargement'),
        width: 150,
      },
    ];
    this.scannerCols = [
      {
        code: 'dateScannage',
        libelle: translate('co.scanner.dateScannage'),
        width: 180,
      },
      {
        code: 'agent',
        libelle: translate('co.scanner.agent'),
        width: 200,
      },
      {
        code: 'resultat',
        libelle: translate('co.scanner.resultat'),
        width: 200,
      },
      {
        code: 'commentaire',
        libelle: translate('co.scanner.commentaire'),
        width: 300,
      },
    ];
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      // let action1 = this.buildInitConsultationTIActionInit();
      // this.props.actions.dispatch(action1);
      // let action = this.buildInitConsultationTIAction();
      // this.props.actions.dispatch(action);
      // this.setState({
      //     ...initialState,
      //     codeIG: '',
      //     libelleIG: '',
      //     positionTarifaire: '',
      //     errorMessage: '',
      //     date: moment(new Date()).format('DD/MM/YYYY')
      // });
      // this.positionTarifaireInput.clear();

      this.setState({
        selectedItem: null,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onItemSelected = (item) => {
    this.setState({
      selectedItem: item,
    });
    // console.log(JSON.stringify(this.state.selectedItem));
  };

  render() {
    return (
      <View style={style.container}>
        <ScrollView>
          <ComBasicDataTableComp
            ref="_badrTable"
            id="co"
            rows={this.props.data}
            cols={this.cols}
            totalElements={this.props.data?.length}
            maxResultsPerPage={10}
            paginate={true}
            showProgress={this.props.showProgress}
            onItemSelected={(item) => this.onItemSelected(item)}
          />
          <Divider />

          {this.state.selectedItem && (
            <ComBadrCardBoxComp style={style.cardBox}>
              <ComAccordionComp
                badr
                title={translate('co.scelles')}
                // expanded={true}
              >
                <ComBadrListComp
                  data={this.state.selectedItem?.listeNumScelle}
                />
              </ComAccordionComp>
            </ComBadrCardBoxComp>
          )}

          {this.state.selectedItem && (
            <ComBadrCardBoxComp style={style.cardBox}>
              <ComAccordionComp
                badr
                title={translate('co.matricules')}
                // expanded={true}
              >
                <ComBadrListComp
                  data={this.state.selectedItem?.listeMatricules}
                />
              </ComAccordionComp>
            </ComBadrCardBoxComp>
          )}

          {this.state.selectedItem && (
            <ComBadrCardBoxComp style={style.cardBox}>
              <ComAccordionComp
                badr
                title={translate('co.lots')}
                // expanded={true}
              >
                <ComBasicDataTableComp
                  ref="_badrTable"
                  id="coLots"
                  rows={this.state.selectedItem?.listLots}
                  cols={this.lotsCols}
                  totalElements={this.state.selectedItem?.listLots?.length}
                  maxResultsPerPage={10}
                  paginate={true}
                  showProgress={this.props.showProgress}
                  onItemSelected={(item) => this.onItemSelected(item)}
                />
              </ComAccordionComp>
            </ComBadrCardBoxComp>
          )}

          {this.state.selectedItem && (
            <ComBadrCardBoxComp style={style.cardBox}>
              <ComAccordionComp
                badr
                title={translate('co.chauffeurs')}
                // expanded={true}
              >
                <ComBasicDataTableComp
                  ref="_badrTable"
                  id="coChauffeurs"
                  rows={this.state.selectedItem?.listeChauffeurs}
                  cols={this.chauffeursCols}
                  totalElements={
                    this.state.selectedItem?.listeChauffeurs?.length
                  }
                  maxResultsPerPage={10}
                  paginate={true}
                  showProgress={this.props.showProgress}
                  onItemSelected={(item) => this.onItemSelected(item)}
                />
              </ComAccordionComp>
            </ComBadrCardBoxComp>
          )}

          {this.state.selectedItem && (
            <ComBadrCardBoxComp style={style.cardBox}>
              <ComAccordionComp
                badr
                title={translate('co.scannerTitle')}
                // expanded={true}
              >
                <ComBasicDataTableComp
                  ref="_badrTable"
                  id="coChauffeurs"
                  rows={
                    this.state.selectedItem?.resultatsScanners
                      ? this.state.selectedItem?.resultatsScanners
                      : []
                  }
                  cols={this.scannerCols}
                  totalElements={0}
                  maxResultsPerPage={10}
                  paginate={true}
                  showProgress={this.props.showProgress}
                  onItemSelected={(item) => this.onItemSelected(item)}
                />
              </ComAccordionComp>
            </ComBadrCardBoxComp>
          )}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.coReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(coResultScreen);
