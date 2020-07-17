import React from 'react';
import {View} from 'react-native';
import {BadrApiTable} from '../../../components';

const buildCols = () => {
  return [
    {
      code: 'proprietaireNom',
      libelle: 'Proprietaire',
      width: 300,
    },
    {
      code: 'vehiculeNumChassis',
      libelle: 'Numéro de chassis',
      width: 300,
    },
  ];
};

export default class PlaquesImmatriculationFormationResult extends React.Component {
  render = () => {
    return (
      <View>
        <BadrApiTable
          id="vehiculeNumChassis"
          module="REF_LIB"
          command="rechercheEchangeMetVehicule"
          typeService="SP"
          resultArrayMapping="resultBean.rows"
          searchObject={{proprietairePrenom: 'ahmed'}}
          onItemSelected={(item) => this.onItemSelected(item)}
          cols={buildCols()}
          paginate={true}
          maxResultsPerPage={5}
          totalElementsMapping="totalNumberOfResult"
        />
      </View>
    );
  };
}
