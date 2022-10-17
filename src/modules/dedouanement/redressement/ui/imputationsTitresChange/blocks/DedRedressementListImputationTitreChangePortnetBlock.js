import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrDetailAccordion,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {cleDS, getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';
import DedRedressementDetailImputationTCPortnetBlock from '../blocks/DedRedressementDetailImputationTCPortnetBlock';

class DedRedressementListImputationTitreChangePortnetBlock extends React.Component {
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

  buildPortnetImputationsCols = () => {
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
    console.log('itemselected', index);
    this.setState({rowSelected: index});
    this.setState({selectedItem: selectedItem});
    this.setState({edition: true});
  };
  onItemSelectedClosed = () => {
    this.setState({selectedItem: null});
  };
  updateRedressementListImputation = (data) => {
    let portnetImputations = this.state.portnetImputations;
    if(!this.state.edition)
      portnetImputations.push(data)
    else
    portnetImputations[this.state.rowSelected] = data;
    this.setState({
      selectedItem: data,
    });
    let dedDumVo = this.props.data;
    dedDumVo = {
      ...dedDumVo,
      dedDumSectionImpTitresPortNetVO: {
        dedDumImpTitrePortNetFormVO: [...portnetImputations],
      },
    };

    console.log('newportnetimputations', JSON.stringify(dedDumVo));

    this.props.updateRedressementScreen(dedDumVo);
  };
  getDetailAccordion = (selectedItem) => {
    return (
      <ComBadrDetailAccordion
        onClose={this.onItemSelectedClosed}
        visible={selectedItem !== null}>
        <DedRedressementDetailImputationTCPortnetBlock
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
      portnetImputations: [],
      portnetImputationsCols: this.buildPortnetImputationsCols(),
    };
  }

  componentDidMount() {
    this.loadPortnetList();
    this.loadManuelleList();
  }

  loadPortnetList = () => {
    this.setState({
      portnetImputations: getValueByPath(
        'dedDumSectionImpTitresPortNetVO.dedDumImpTitrePortNetFormVO',
        this.props.data,
      ),
    });
  };

  loadManuelleList = () => {
    this.setState({
      portnetImputations: getValueByPath(
        'dedDumSectionImpTitresPortNetVO.dedDumImpTitrePortNetFormVO',
        this.props.data,
      ),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title={`PORTNET - Nombre total des imputations : ${
            this.state.portnetImputations
              ? this.state.portnetImputations.length
              : 0
          }`}
          expanded={true}>
          <ComBasicDataTableComp
            hasId={true}
            rows={this.state.portnetImputations}
            cols={this.state.portnetImputationsCols}
            totalElements={
              this.state.portnetImputations
                ? this.state.portnetImputations.length
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
                  let portnetImputations = [
                    ...this.state.portnetImputations.splice(
                      this.state.rowSelected,
                      1,
                    ),
                  ];
                  this.setState({
                    portnetImputations: portnetImputations,
                  });
                  this.setState({
                    portnetImputations: this.state.portnetImputations.splice(
                      this.state.rowSelected,
                      1,
                    ),
                    edition: false,
                  });
                  let dedDumVo = this.props.data;
                  dedDumVo = {
                    ...dedDumVo,
                    dedDumSectionImpTitresPortNetVO: {
                      dedDumImpTitrePortNetFormVO: [...portnetImputations],
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

export default DedRedressementListImputationTitreChangePortnetBlock;
