import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import {
  ComAccordionComp as Accordion,
  ComBadrCardBoxComp as CardBox,
  ComBasicDataTableComp,
} from '../../../../../commons/component';
import { cleDUM } from '../../state/decMainleveeConstants';

const initialState = {
  reference: '',
  dialogVisibility: false,
  dialogMessage: '',
  apurAutoData: null,
};

class MainleveeEtatChargement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.composantTablesCols = this.buildComposantsColumns(true);
  }

  componentDidMount() {
    //this.state = {...initialState};
  }

  /**
   * This function build the components datatable headers labels and actions.
   * the reference is considered as the current component instance
   */
  buildComposantsColumns = (actions) => {
    return [
      {
        code: 'referenceEnregistrement',
        libelle: translate('mainlevee.etatChargement.ref'),
        width: 160,
      },
      {
        code: 'etatChargement.dateHeureEnregistrement',
        libelle: translate('mainlevee.dateEnregistrement'),
        width: 200,
      },
      {
        code: 'etatChargement.dateHeureVoyage',
        libelle: translate('mainlevee.etatChargement.dateVoyage'),
        width: 150,
      },
      {
        code: 'etatChargement.refDeclarant',
        libelle: translate('mainlevee.etatChargement.declarant'),
        width: 100,
      },
      {
        code: 'etatChargement.bureauSortie',
        libelle: translate('mainlevee.etatChargement.bureauSortie'),
        width: 100,
      },
      {
        code: 'etatChargement.navire',
        libelle: translate('mainlevee.etatChargement.navire'),
        width: 100,
      },
    ];
  };


  render() {
    const enteteTrypVO = this.props.dataVo?.enteteTrypVO;
    const listEtatChargementVO = this.props.dataVo?.listEtatChargementVO;
    const referenceEnregistrement = this.props.dataVo?.declarationTriptique?.referenceEnregistrement;

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
                {cleDUM(
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
              title={translate('mainlevee.listeEtatChargement')}
              expanded>
              <Text style={styles.nombreResult}>
                {translate('mainlevee.versions.nbreVersions')} :{' '}
                {listEtatChargementVO?.length
                  ? listEtatChargementVO?.length
                  : 0}
              </Text>
              {listEtatChargementVO && (
                <ComBasicDataTableComp
                  badr
                  onRef={(ref) => (this.badrComposantsTable = ref)}
                  hasId={false}
                  id="idComposant"
                  rows={listEtatChargementVO}
                  cols={this.composantTablesCols}
                  onItemSelected={this.onComposantSelected}
                  totalElements={
                    listEtatChargementVO?.length
                      ? listEtatChargementVO?.length
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
  libelle: { ...libelle },
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
  flexColumn: { flexDirection: 'column' },
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
  nombreResult: { margin: 20, marginVertical: 10, ...value },
  cardBoxInfoDum: {
    flexDirection: 'column',
    margin: 10,
  },
});

function mapStateToProps(state) {
  return { ...state.initApurementReducer };
}

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainleveeEtatChargement);
