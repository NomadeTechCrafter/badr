import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrDetailAccordion,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {cleDS, getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';
import DedRedressementDetailImputationTCManuelleBlock from './DedRedressementDetailImputationTCManuelleBlock';

class DedRedressementListImputationTitreChangeManuelleBlock extends React.Component {
  initialState = {
    agenceBancaire: '',
    agenceTitre: '',
    appelCouplageFromUC1: false,
    banque: '',
    banqueConsign: false,
    banqueSaisie: false,
    banqueTitre: '',
    callFromEC: false,
    codeNGPPaysPortNet: '',
    codeQuantiteImputee: 'KG',
    createParam: false,
    dateEcheanceTitre: '',
    dateEnregistrementTitre: '',
    defaultConverter: {},
    demandeModification: false,
    dontHandleLimitationOperateur: false,
    dumFictiveParam: false,
    identifiantTitre: '',
    incotermTitre: '',
    initiale: false,
    insideEtude: false,
    insideRedressement: false,
    insideRedressementApresMainLevee: false,
    lancerTraitementCompteDechage: false,
    marchandiseCode: '',
    montantTotalTitre: '',
    numeroOrdre: '',
    numeroTitre: '',
    numeroTitreChange: '',
    occasionnelle: false,
    paysOrigine: '',
    poidsNetTitre: '',
    quantiteImputee: '',
    regimeExport: false,
    regimeTransitImport: false,
    revaliderEtude: false,
    soldeMontantTitre: '',
    soldePoidsNetTitre: '',
    ssDUM: false,
    transfertOperateurParam: false,
    transit: false,
    typeTitreChange: '',
    valeurImputee: '',
    versionModifiee: true,
  };
  buildManuelleImputationsCols = () => {
    return [
      {
        code: '',
        libelle: '',
        width: 100,
        component: 'button',
        icon: 'eye',
        action: (row, index) => this.onItemSelected(row, index),
      },
      {code: 'typeTitreChange', libelle: 'Type', width: 100},
      {code: 'banque', libelle: 'Banque ', width: 120},
      {code: 'quantiteImputee', libelle: 'Qté à importer', width: 100},
      {code: 'codeQuantiteImputee', libelle: 'Code Qté ', width: 90},
      {code: 'valeurImputee', libelle: 'Valeur à imputer', width: 100},
      {code: 'devise', libelle: 'Devise', width: 60},
    ];
  };
  onItemSelected = (selectedItem, index) => {
    this.setState({rowSelected: index});
    this.setState({selectedItem: selectedItem});
    this.setState({edition: true});
  };
  onItemSelectedClosed = () => {
    this.setState({selectedItem: null});
  };

  getDetailAccordion = (selectedItem) => {
    return (
      <ComBadrDetailAccordion
        onClose={this.onItemSelectedClosed}
        visible={selectedItem !== null}>
        <DedRedressementDetailImputationTCManuelleBlock
          selectedItem={selectedItem}
          referenceVo={this.props.data?.dedReferenceVO}
          update={this.updateRedressementListImputation}
        />
      </ComBadrDetailAccordion>
    );
  };
  constructor(props) {
    super(props);
    this.state = {
      imputationsManuelles: [],
      imputationsManuelleCols: this.buildManuelleImputationsCols(),
    };
  }
  updateRedressementListImputation = (data) => {
    let imputationsManuelles = this.state.imputationsManuelles;
    if (!this.state.edition) {
      imputationsManuelles.push(data);
    } else {
      imputationsManuelles[this.state.rowSelected] = data;
    }
    this.setState({
      selectedItem: data,
    });
    let dedDumVo = this.props.data;
    dedDumVo = {
      ...dedDumVo,
      dedDumSectionImpTitresVO: {
        dedDumImpTitreFormVO: [...imputationsManuelles],
      },
    };

    console.log('newportnetimputations', JSON.stringify(dedDumVo));

    this.props.updateRedressementScreen(dedDumVo);
  };
  componentDidMount() {
    this.loadManuelleList();
  }

  loadManuelleList = () => {
    this.setState({
      imputationsManuelles: getValueByPath(
        'dedDumSectionImpTitresVO.dedDumImpTitreFormVO',
        this.props.data,
      ),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title={`MANUELLE - Nombre total des imputations : ${
            this.state.imputationsManuelles
              ? this.state.imputationsManuelles.length
              : 0
          }`}
          expanded={true}>
          <ComBasicDataTableComp
            hasId={true}
            rows={this.state.imputationsManuelles}
            cols={this.state.imputationsManuelleCols}
            totalElements={
              this.state.imputationsManuelles
                ? this.state.imputationsManuelles.length
                : 0
            }
            maxResultsPerPage={5}
            paginate={true}
          />
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <ComBadrButtonComp
              style={{width: 100}}
              onPress={() => {
                if (!this.state.edition) {
                  this.setState({
                    selectedItem: {...this.initialState},
                    edition: false,
                  });
                }
                if (this.state.edition) {
                  let imputationsManuelles = [
                    ...this.state.imputationsManuelles.splice(
                      this.state.rowSelected,
                      1,
                    ),
                  ];
                  this.setState({
                    imputationsManuelles: imputationsManuelles,
                  });
                  this.setState({
                    imputationsManuelles: this.state.imputationsManuelles.splice(
                      this.state.rowSelected,
                      1,
                    ),
                    edition: false,
                  });
                  let dedDumVo = this.props.data;
                  dedDumVo = {
                    ...dedDumVo,
                    dedDumSectionImpTitresVO: {
                      dedDumImpTitreFormVO: [...imputationsManuelles],
                    },
                  };

                  this.props.updateRedressementScreen(dedDumVo);
                  this.onItemSelectedClosed();
                }
              }}
              text={
                this.state.edition
                  ? translate('transverse.supprimer')
                  : translate('transverse.nouveau')
              }
              //  disabled={this.state.decisionControle ? false : true}
            />
            {this.state.edition && (
              <ComBadrButtonComp
                style={{width: 100}}
                onPress={() => {
                  this.setState({selectedItem: null, edition: false});
                }}
                text={translate('transverse.abandonner')}
                //  disabled={this.state.decisionControle ? false : true}
              />
            )}
          </View>
          {this.state.selectedItem &&
            this.getDetailAccordion(this.state.selectedItem)}
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementListImputationTitreChangeManuelleBlock;
