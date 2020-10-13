import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {cleDS, getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';

class DedRedressementListDemandeDiverseBlock extends React.Component {
  buildDemandesCols = () => {
    return [
      {code: 'libelleDemande', libelle: 'Demande', width: 250},
      {code: 'parametres', libelle: 'Données paramétres ', width: 300},
    ];
  };

  constructor(props) {
    super(props);
    this.state = {
      demandes: [],
      demandesCols: this.buildDemandesCols(),
    };
  }

  componentDidMount() {
    this.loadDemandesDiverses();
  }

  loadDemandesDiverses = () => {
    this.setState({
      demandes: getValueByPath(
        'dedDumSectionDemandesVO.dedDumDemandeFormVO',
        this.props.data,
      ),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title={`Nombre total des demandes : ${
            this.state.demandes ? this.state.demandes.length : 0
          }`}
          expanded={true}>
          <ComBasicDataTableComp
            rows={this.state.demandes}
            cols={this.state.demandesCols}
            totalElements={this.state.demandes ? this.state.demandes.length : 0}
            maxResultsPerPage={5}
            paginate={true}
          />
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementListDemandeDiverseBlock;
