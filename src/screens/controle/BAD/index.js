import React from 'react';
import {View} from 'react-native';

/**Custom Components */
import {BadrApiTable, BadrModal, DetailBAD} from '../../../components';

export class BAD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      detail: {},
    };
  }

  onItemSelected = item => {};

  handleBadPressed = item => {
    this.setState({detail: item, showDetail: true});
  };

  onDismiss = () => {
    this.setState({showDetail: false});
  };

  render() {
    return (
      <View>
        <BadrApiTable
          module="CONTROL_LIB"
          command="listePreapurements"
          typeService="SP"
          searchObject={{
            numeroVersionCourante: '3',
            infosDUMVO: {
              identifiant: '141381',
            },
          }}
          id="referenceDs"
          onItemSelected={item => this.onItemSelected(item)}
          cols={[
            {code: 'vo.typeDS', libelle: 'Type DS', width: 70},
            {code: 'referenceDs', libelle: 'Reference DS', width: 200},
            {
              code: 'vo.lieuChargement',
              libelle: 'Lieu de chargement',
              width: 180,
            },
            {code: 'vo.referenceLot', libelle: 'Référence lot', width: 120},
            {code: 'vo.poidsLot', libelle: 'Poids brut', width: 120},
            {
              code: 'vo.nombreContenant',
              libelle: 'Nombre contenants',
              width: 130,
            },
            {
              //   code: 'vo.bonADelivrer.numeroBAD',
              code: 'vo.lieuChargement',
              libelle: 'Bon à délivrer',
              action: item => this.handleBadPressed(item),
              width: 200,
            },
          ]}
          paginate={false}
        />

        <BadrModal visible={this.state.showDetail} onDismiss={this.onDismiss}>
          <DetailBAD data={this.state.detail.vo} />
        </BadrModal>
      </View>
    );
  }
}
