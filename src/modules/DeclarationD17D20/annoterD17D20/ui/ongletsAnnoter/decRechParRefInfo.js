import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {DataTable} from 'react-native-paper';
import {
  ComCopyPasteComp as CopyPaste,
  ComAccordionComp as Accordion,
  ComBadrCardBoxComp as CardBox,
  ComBasicDataTableComp,
} from '../../../../../commons/component';

const initialState = {
  reference: '',
  dialogVisibility: false,
  dialogMessage: '',
  apurAutoData: null,
};

class RechParRefInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.composantTablesCols = this.buildComposantsColumns(true);
  }

  componentDidMount() {
    // this.setState({...initialState});
  }

  /**
   * This function build the components datatable headers labels and actions.
   * the reference is considered as the current component instance
   */
  buildComposantsColumns = (actions) => {
    return [
      {
        code: 'dateHeureIntervention',
        libelle: translate('annoter.historique.date'),
        width: 160,
      },
      {
        code: 'numeroVersion',
        libelle: translate('annoter.historique.version'),
        width: 60,
      },
      {
        code: 'intervention',
        libelle: translate('annoter.historique.intervention'),
        width: 200,
      },
      {
        code: 'refEtatResultat',
        libelle: translate('annoter.historique.etatResult'),
        width: 200,
      },
      {
        code: 'codeActeur',
        libelle: translate('annoter.historique.user'),
        width: 150,
      },
      {
        code: 'commentaireIntervention',
        libelle: translate('annoter.historique.comment'),
        width: 300,
      },
    ];
  };

  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    if (serie?.length > 6) {
      let firstSerie = serie?.substring(0, 1);
      if (firstSerie === '0') {
        serie = serie?.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
  };

  render() {
    let listeVersions = this.props.dataVo?.declarationTriptique
      ?.refVersionsDeclarationEnDouane;
    const listeHistorique = this.props.dataVo?.trypRechercheSectionsVO
      ?.historique;
    const enteteTrypVO = this.props.dataVo?.enteteTrypVO;
    const referenceEnregistrement = this.props.dataVo?.declarationTriptique
      ?.referenceEnregistrement;

    return (
      <View style={styles.fabContainer}>
        <ScrollView>
          {/* Référence déclaration */}
          <CardBox style={styles.cardBoxInfoDum}>
            <View style={[styles.flexDirectionRow, styles.margtb]}>
              <Text style={styles.libelleM}>
                {translate('transverse.bureau')}
              </Text>
              <Text style={styles.libelleM}>
                {translate('transverse.regime')}
              </Text>
              <Text style={styles.libelleM}>
                {translate('transverse.annee')}
              </Text>
              <Text style={styles.libelleL}>
                {translate('transverse.serie')}
              </Text>
              <Text style={styles.libelleS}>{translate('transverse.cle')}</Text>
              <Text style={styles.libelleL}>
                {translate('transverse.type')}
              </Text>
              <Text style={styles.libelleL}>
                {translate('transverse.libRegime')}
              </Text>
            </View>
            <View style={styles.flexDirectionRow}>
              <Text style={styles.valueM}>
                {referenceEnregistrement?.slice(0, 3)}
              </Text>
              <Text style={styles.valueM}>
                {referenceEnregistrement?.slice(3, 6)}
              </Text>
              <Text style={styles.valueM}>
                {referenceEnregistrement?.slice(6, 10)}
              </Text>
              <Text style={styles.valueL}>
                {referenceEnregistrement?.slice(10, 17)}
              </Text>
              <Text style={styles.valueS}>
                {this.cleDUM(
                  referenceEnregistrement?.slice(3, 6),
                  referenceEnregistrement?.slice(10, 17),
                )}
              </Text>
              <Text style={styles.valueL}>TRYPTIQUE</Text>
              <Text style={styles.valueL}>{enteteTrypVO?.libelleRegime}</Text>
            </View>
          </CardBox>
          <CardBox style={styles.cardBox}>
            <Accordion badr title={translate('annoter.versions.title')}>
              <Text style={styles.nombreResult}>
                {translate('annoter.versions.nbreVersions')} :
                <Text style={styles.libelle}>
                  {'    ' + listeVersions?.length}
                </Text>
              </Text>

              <ScrollView horizontal={true} style={styles.centre}>
                {!this.props.showProgress && (
                  <ScrollView>
                    <View>
                      <DataTable style={styles.table}>
                        <DataTable.Header style={styles.tableHeader}>
                          <DataTable.Title style={{width: 60}}>
                            <Text style={styles.libelle}>
                              {translate('annoter.versions.num')}
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title style={{width: 150}}>
                            <Text style={styles.libelle}>
                              {translate('annoter.versions.type')}
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title style={{width: 150}}>
                            <Text style={styles.libelle}>
                              {translate('annoter.versions.statut')}
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title style={{width: 200}}>
                            <Text style={styles.libelle}>
                              {translate('annoter.versions.dateCreation')}
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title style={{width: 200}}>
                            <Text style={styles.libelle}>
                              {translate('annoter.versions.dateSignature')}
                            </Text>
                          </DataTable.Title>
                        </DataTable.Header>
                        {listeVersions ? (
                          listeVersions?.map((item) => (
                            <DataTable.Row
                              key={item.reference}
                              // onPress={() => this.onItemSelected(item)}
                            >
                              <DataTable.Cell
                                style={{width: 60}}
                                children={
                                  <CopyPaste value={item.numeroVersion} />
                                }
                              />
                              <DataTable.Cell
                                style={{width: 150}}
                                children={
                                  <CopyPaste value={item.typeVersion} />
                                }
                              />
                              <DataTable.Cell
                                style={{width: 150}}
                                children={
                                  <CopyPaste value={item.etatVersionForm} />
                                }
                              />
                              <DataTable.Cell
                                style={{width: 200}}
                                children={
                                  <CopyPaste value={item.dateEnregistrement} />
                                }
                              />

                              <DataTable.Cell
                                style={{width: 200}}
                                children={
                                  <CopyPaste value={item.dateSignature} />
                                }
                              />
                            </DataTable.Row>
                          ))
                        ) : (
                          <DataTable.Row />
                        )}
                      </DataTable>
                    </View>
                  </ScrollView>
                )}
              </ScrollView>
              {/* </View> */}
            </Accordion>
          </CardBox>

          <CardBox style={styles.cardBox}>
            <Accordion
              badr
              title={translate('annoter.historique.title')}
              expanded>
              <Text style={styles.nombreResult}>
                {translate('annoter.versions.nbreVersions')} :
                <Text style={styles.libelle}>
                  {'    ' + listeHistorique?.length}
                </Text>
              </Text>
              {listeHistorique && (
                <ComBasicDataTableComp
                  badr
                  onRef={(ref) => (this.badrComposantsTable = ref)}
                  hasId={false}
                  id="idComposant"
                  rows={listeHistorique}
                  cols={this.composantTablesCols}
                  onItemSelected={this.onComposantSelected}
                  totalElements={
                    listeHistorique?.length ? listeHistorique?.length : 0
                  }
                  maxResultsPerPage={5}
                  paginate={true}
                />
              )}
            </Accordion>
          </CardBox>
        </ScrollView>
      </View>
    );
  }
}

const libelle = {
  fontSize: 14,
  color: '#006acd',
  fontWeight: 'bold',
};

const value = {
  fontSize: 14,
  fontWeight: 'bold',
};

const styles = StyleSheet.create({
  messages: {},
  fabContainer: {
    height: '100%',
    flex: 1,
  },
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerInfoMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardBox: {
    padding: 0,
    margin: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  containerActionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  libelle: {...libelle},
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
  valueS: {
    ...value,
    flex: 1,
  },
  valueM: {
    ...value,
    flex: 2,
  },
  valueL: {
    ...value,
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
  margLeft: {
    marginLeft: 20,
  },
  marg: {
    margin: 10,
  },
  margtb: {
    marginBottom: 10,
  },
  textarea: {
    height: 50,
    marginRight: 50,
  },
  date: {
    fontWeight: 'bold',
    borderColor: 'red',
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: '#ecf0f1',
  },
  centre: {
    alignSelf: 'center',
  },
  nombreResult: {margin: 20, marginVertical: 10, ...value},
  cardBoxInfoDum: {
    flexDirection: 'column',
    margin: 10,
  },
});

function mapStateToProps(state) {
  return {...state.initApurementReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RechParRefInfo);
