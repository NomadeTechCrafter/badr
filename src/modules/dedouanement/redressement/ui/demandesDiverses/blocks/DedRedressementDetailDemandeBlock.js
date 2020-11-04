import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput} from 'react-native-paper';
import {getValueByPath} from '../../../utils/DedUtils';

export default class DedRedressementDetailDemandeBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Demande : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  getValueByPath('libelleDemande', this.props.demande) +
                  '(' +
                  getValueByPath('typeDemande', this.props.demande) +
                  ')'
                }
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Données paramètres"
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('parametres', this.props.demande)}
              />
            }
          />
        </DedRedressementRow>
      </View>
    );
  }
}
