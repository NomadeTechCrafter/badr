import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {cleDS, getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';

class DedRedressementListImputationTitreChangeManuelleBlock extends React.Component {
  buildManuelleImputationsCols = () => {
    return [
      {code: 'typeTitreChange', libelle: 'Type', width: 100},
      {code: 'banque', libelle: 'Banque ', width: 120},
      {code: 'quantiteImputee', libelle: 'Qté à importer', width: 100},
      {code: 'codeQuantiteImputee', libelle: 'Code Qté ', width: 90},
      {code: 'valeurImputee', libelle: 'Valeur à imputer', width: 100},
      {code: 'devise', libelle: 'Devise', width: 60},
    ];
  };

  constructor(props) {
    super(props);
    this.state = {
      imputationsManuelles: [],
      imputationsManuelleCols: this.buildManuelleImputationsCols(),
    };
  }

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
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementListImputationTitreChangeManuelleBlock;
