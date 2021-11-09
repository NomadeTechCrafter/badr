import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {cleDS, getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';
import {Checkbox} from 'react-native-paper';
import {Col, Row} from 'react-native-easy-grid';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';

class DedRedressementListImputationCompteREDBlock extends React.Component {
  buildCompteREDImputationsCols = () => {
    return [
      {code: 'numeroImputation', libelle: 'N°', width: 130},
      {
        code: 'render',
        libelle: 'Compte',
        width: 200,
        render: (row) => {
          return row.referenceRefLCR
            ? row.referenceRefLCR
            : row.referenceRefIntrant;
        },
      },
      {
        code: 'render',
        libelle: 'NGP',
        width: 200,
        render: (row) => {
          let npg = row.referenceRefLCR ? row.ngpRefLCR : row.ngpRefIntrant;
          let numArticle = row.referenceRefLCR ? row.spoRefLCR : '';
          return npg + '\n\r \n\r Spo/N° Article : ' + numArticle;
        },
      },
      {
        code: 'render',
        libelle: 'Orig',
        width: 100,
        render: (row) => {
          return row.referenceRefLCR
            ? row.paysOrigineRefLCR
            : row.paysOrigineRefIntrant;
        },
      },
      {
        code: 'render',
        libelle: 'Qté / Val Solde',
        width: 150,
        render: (row) => {
          let quantite = row.referenceRefLCR
            ? row.quantiteSoldeRefLCR
            : row.quantiteSoldeRefIntrant;
          let unite = row.referenceRefLCR
            ? row.uniteRefLCR
            : row.uniteRefIntran;
          let solde = row.referenceRefLCR ? row.valeurSoldeRefLCR : '';

          return _.join([quantite, unite, solde], '\n\r \n\r');
        },
      },
      {
        code: 'render',
        libelle: 'Qté nette à imputer',
        width: 120,
        render: (row) => {
          return (
            row.quantiteNetteAImputer +
            '\n\r \n\r Tx. Dech : ' +
            row.tauxDechets
          );
        },
      },
      {
        code: 'render',
        libelle: 'Qté / Val brute à imputer',
        width: 140,
        render: (row) => {
          return (
            row.quantiteBruteAImputer +
            '\n\r \n\r Tx. Dech : ' +
            row.valeurBruteAImputer
          );
        },
      },
      {
        code: 'render',
        libelle: 'Déch. taxables',
        width: 120,
        render: (row) => {
          return row.dechetsTaxables === 'true' ? 'Oui' : 'Non';
        },
      },
    ];
  };

  constructor(props) {
    super(props);
    this.state = {
      compteRedImputations: [],
      compteRedImputationsCols: this.buildCompteREDImputationsCols(),
    };
  }

  componentDidMount() {
    this.loadCompteREDList();
  }

  loadCompteREDList = () => {
    this.setState({
      compteRedImputations: getValueByPath(
        'dedDumSectionImputationsVO.ligneImputationMetierFormVO',
        this.props.data,
      ),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="" expanded={true}>
          <Row>
            <Col size={2}>
              <Text style={{padding: 10}}>{`Nombre total des imputations : ${
                this.state.compteRedImputations
                  ? this.state.compteRedImputations.length
                  : 0
              }`}</Text>
            </Col>
            <Col size={1} />
            <Col style={{alignItems: 'flex-end'}} size={2}>
              <View style={{flexDirection: 'row'}}>
                <Checkbox disabled={true} />
                <Text style={{padding: 10}}>Imputation de déchets</Text>
              </View>
            </Col>
          </Row>
          <ComBasicDataTableComp
            rows={this.state.compteRedImputations}
            cols={this.state.compteRedImputationsCols}
            totalElements={
              this.state.compteRedImputations
                ? this.state.compteRedImputations.length
                : 0
            }
            maxResultsPerPage={5}
            paginate={true}
          />
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementListImputationCompteREDBlock;
