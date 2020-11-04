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
import DedRedressementDetailPreapDsBlock from '../blocks/DedRedressementDetailPreapDsBlock';

class DedRedressementListsPreapBlock extends React.Component {
  buildPreapCols = () => {
    return [
      {
        code: '',
        libelle: '',
        width: 100,
        component: 'button',
        icon: 'eye',
        action: (row, index) => this.onItemSelected(row, index),
      },
      {code: 'typeDS', libelle: 'Type DS', width: 60},
      {
        code: 'render',
        width: 240,
        render: (row) => {
          return (
            _.padStart(row.preapBureau, 3, '0') +
            ' - ' +
            _.padStart(row.preapRegime, 3, '0') +
            ' - ' +
            _.padStart(row.preapAnnee, 3, '0') +
            ' - ' +
            _.padStart(row.preapSerie, 7, '0') +
            '-' +
            cleDS(row.preapRegime + row.preapSerie + row.preapAnnee)
          );
        },
        libelle: 'Référence DS',
      },
      {code: 'lieuChargement', libelle: 'Lieu chargement', width: 100},
      {code: 'referenceLot', libelle: 'Référence Lot', width: 80},
      {code: 'poidsLot', libelle: 'Poids lot', width: 80},
      {code: 'nombreContenant', libelle: 'Nombre contenant', width: 60},
    ];
  };
  onItemSelected = (selectedItem) => {
    this.setState({selectedItem: selectedItem});
  };
  constructor(props) {
    super(props);
    this.state = {
      preapurements: [],
      preapCols: this.buildPreapCols(),
    };
  }

  componentDidMount() {
    this.loadPreapurements();
  }

  loadPreapurements = () => {
    this.setState({
      preapurements: getValueByPath(
        'dedDumSectionPreapVO.dedDumPreapFormVO',
        this.props.data,
      ),
    });
  };
  onItemSelectedClosed = () => {
    this.setState({selectedItem: null});
  };

  getDetailAccordion = (selectedItem) => {
    return (
      <ComBadrDetailAccordion
        onClose={this.onItemSelectedClosed}
        visible={selectedItem !== null}>
        <DedRedressementDetailPreapDsBlock selectedItem={selectedItem} />
      </ComBadrDetailAccordion>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title={`Nombre total des préapurements : ${
            this.state.preapurements ? this.state.preapurements.length : 0
          }`}
          expanded={true}>
          <ComBasicDataTableComp
            hasId={true}
            rows={this.state.preapurements}
            cols={this.state.preapCols}
            totalElements={
              this.state.preapurements ? this.state.preapurements.length : 0
            }
            maxResultsPerPage={5}
            paginate={true}
          />
          {this.state.selectedItem &&
            this.getDetailAccordion(this.state.selectedItem)}
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementListsPreapBlock;
