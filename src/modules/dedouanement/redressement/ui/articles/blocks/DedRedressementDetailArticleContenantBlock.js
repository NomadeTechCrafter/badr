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

export default class DedRedressementDetailArticleContenantBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <ComAccordionComp title="Contenant" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Nature : "
              libelleSize={1}
              children={
                <ComBadrAutoCompleteChipsComp
                  selected={getValueByPath(
                    'typeContenantLibelle',
                    this.props.article,
                  )}
                  disabled={true}
                  onRef={(ref) => (this.refNature = ref)}
                  code="typeContenant"
                  maxItems={3}
                  libelle="intitule"
                  command="getCmbTypeContenant"
                  paramName="libelleTypeContenant"
                  onDemand={true}
                  searchZoneFirst={false}
                />
              }
            />
            <ComBadrKeyValueComp
              libelle="Nombre : "
              libelleSize={3}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={getValueByPath('nombreContenants', this.props.article)}
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Marque"
              libelleSize={1}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={getValueByPath(
                    'marquesContenants',
                    this.props.article,
                  )}
                />
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}
