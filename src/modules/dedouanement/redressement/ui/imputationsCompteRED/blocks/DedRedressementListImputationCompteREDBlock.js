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

class DedRedressementListImputationCompteREDBlock extends React.Component {
  buildCompteREDImputationsCols = () => {
    return [
      {code: 'refCompte', libelle: 'Compte', width: 130},
      {code: 'ngp', libelle: 'NGP ', width: 100},
      {code: 'origine', libelle: 'Orig', width: 100},
      {code: 'qteValSolde', libelle: 'Qté / Val Solde ', width: 120},
      {code: 'qteNetteImputer', libelle: 'Qté nette à imputer', width: 120},
      {
        code: 'qteValBruteImputer',
        libelle: 'Qté / Val brute à imputer',
        width: 140,
      },
      {code: 'dechetsTaxables', libelle: 'Déch. taxables', width: 120},
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
            hasId={true}
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
