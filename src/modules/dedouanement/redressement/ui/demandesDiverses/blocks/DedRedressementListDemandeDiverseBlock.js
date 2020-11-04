import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrDetailAccordion,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {cleDS, getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';
import DedRedressementDetailDemandeBlock from '../blocks/DedRedressementDetailDemandeBlock';

class DedRedressementListDemandeDiverseBlock extends React.Component {
  buildDemandesCols = () => {
    return [
      {
        code: '',
        libelle: '',
        width: 100,
        component: 'button',
        icon: 'eye',
        action: (row, index) => this.onArticleSelected(row, index),
      },
      {code: 'libelleDemande', libelle: 'Demande', width: 250},
      {code: 'parametres', libelle: 'Données paramétres ', width: 300},
    ];
  };
  onArticleSelected = (demande) => {
    this.setState({selectedDemande: demande});
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
  onDemandeSelectedClosed = () => {
    this.setState({selectedDemande: null});
  };

  getDetailAccordion = (selectedDemande) => {
    return (
      <ComBadrDetailAccordion
        onClose={this.onDemandeSelectedClosed}
        visible={selectedDemande !== null}>
        <DedRedressementDetailDemandeBlock demande={selectedDemande} />
      </ComBadrDetailAccordion>
    );
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
          {this.state.selectedDemande &&
            this.getDetailAccordion(this.state.selectedDemande)}
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementListDemandeDiverseBlock;
