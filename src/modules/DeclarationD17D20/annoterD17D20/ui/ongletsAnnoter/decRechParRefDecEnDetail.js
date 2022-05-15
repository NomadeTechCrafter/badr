import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
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

class RechParRefDecEnDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.composantTablesCols = this.buildComposantsColumns(true);
  }

  componentDidMount() {
    // this.state = {...initialState};
  }

  /**
   * This function build the components datatable headers labels and actions.
   * the reference is considered as the current component instance
   */
  buildComposantsColumns = (actions) => {
    return [
      {
        code: 'referenceEnregistrement',
        libelle: translate('annoter.decEnDetail.ref'),
        width: 160,
      },
      {
        code: 'dedServicesVO.operateurDeclarant',
        libelle: translate('annoter.decEnDetail.operateur'),
        width: 160,
      },
      {
        code: 'formatedDateenregistrement',
        libelle: translate('annoter.dateEnregistrement'),
        width: 200,
      },
      {
        code: 'dedServicesVO.nombreContenants',
        libelle: translate('annoter.decEnDetail.nbreContenant'),
        width: 150,
      },
      {
        code: 'dedServicesVO.poidsBruts',
        libelle: translate('annoter.decEnDetail.poidsBrut'),
        width: 100,
      },
      {
        code: 'dedServicesVO.poidsNet',
        libelle: translate('annoter.decEnDetail.poidsNet'),
        width: 100,
      },
      {
        code: 'dedServicesVO.valeurDeclaree',
        libelle: translate('annoter.decEnDetail.valDeclaree'),
        width: 100,
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
    const enteteTrypVO = this.props.dataVo?.enteteTrypVO;
    const listDeclarationEnDouaneVO = this.props.dataVo
      ?.listDeclarationEnDouaneVO;
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
            <Accordion
              badr
              title={translate('annoter.listeDeclarationsDetail')}
              expanded>
              <Text style={styles.nombreResult}>
                {translate('annoter.versions.nbreVersions')} :
                <Text style={styles.libelle}>
                  {'    ' + listDeclarationEnDouaneVO?.length}
                </Text>
              </Text>
              {listDeclarationEnDouaneVO && (
                <ComBasicDataTableComp
                  badr
                  onRef={(ref) => (this.badrComposantsTable = ref)}
                  hasId={false}
                  id="idComposant"
                  rows={listDeclarationEnDouaneVO}
                  cols={this.composantTablesCols}
                  onItemSelected={this.onComposantSelected}
                  totalElements={
                    listDeclarationEnDouaneVO?.length
                      ? listDeclarationEnDouaneVO?.length
                      : 0
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RechParRefDecEnDetail);
