import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {cleDS, getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';

class DedRedressementListImputationTitreChangePortnetBlock extends React.Component {
  buildPortnetImputationsCols = () => {
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
        'dedDumSectionImpTitresVO.dedDumImpTitreFormVO',
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
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementListImputationTitreChangePortnetBlock;
