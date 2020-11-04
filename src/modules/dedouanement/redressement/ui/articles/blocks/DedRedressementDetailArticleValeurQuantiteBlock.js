import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {
  Button,
  Paragraph,
  RadioButton,
  TextInput,
  Checkbox,
} from 'react-native-paper';
import {primaryColor} from '../../../../../../commons/styles/ComThemeStyle';
import {getValueByPath} from '../../../utils/DedUtils';

export default class DedRedressementDetailArticleValeurQuantiteBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <ComAccordionComp title="Valeur et quantités" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Valeur déclarée : "
              libelleSize={2}
              children={
                <TextInput
                  disabled={true}
                  type="flat"
                  label=""
                  value={getValueByPath('valeurDeclaree', this.props.article)}
                />
              }
            />
            <ComBadrKeyValueComp
              libelleSize={1}
              children={
                <Button
                  style={{margin: 10}}
                  mode="contained"
                  disabled={true}
                  color={primaryColor}>
                  Consulter base valeur
                </Button>
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Quantité facturée : "
              libelleSize={2}
              children={
                <TextInput
                  disabled={true}
                  type="flat"
                  label=""
                  value={getValueByPath('quantite', this.props.article)}
                />
              }
            />
            <ComBadrKeyValueComp
              libelle="Unité de quantité : "
              libelleSize={2}
              children={
                <ComBadrAutoCompleteChipsComp
                  disabled={true}
                  onRef={(ref) => (this.refUnite = ref)}
                  code="code"
                  selected={getValueByPath('uniteLibelle', this.props.article)}
                  maxItems={3}
                  libelle="libelle"
                  command="getCmbUnite"
                  paramName="libelleUnite"
                  onDemand={true}
                  searchZoneFirst={false}
                  onValueChange={this.handlePaysOrigineChipsChanged}
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Poids net (en kg) : "
              libelleSize={2}
              children={
                <TextInput
                  disabled={true}
                  type="flat"
                  label=""
                  value={getValueByPath('poidsNet', this.props.article)}
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Quantité normalisée : "
              libelleSize={3}
              children={
                <TextInput
                  disabled={true}
                  type="flat"
                  label=""
                  value={getValueByPath(
                    'quantiteNormalisee',
                    this.props.article,
                  )}
                />
              }
            />
            <ComBadrKeyValueComp
              libelle="Unité de quantité normalisée : "
              libelleSize={3}
              value={getValueByPath(
                'libelleUniteNormalisee',
                this.props.article,
              )}
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}
