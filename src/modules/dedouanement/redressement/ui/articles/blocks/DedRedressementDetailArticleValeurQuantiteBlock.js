import React from 'react';
import { View } from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrAutoCompleteComp,
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
import { primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { getValueByPath } from '../../../utils/DedUtils';

export default class DedRedressementDetailArticleValeurQuantiteBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valeurDeclaree: this.props.article?.valeurDeclaree,
      quantite: this.props.article?.quantite,
      uniteLibelle: this.props.article?.uniteLibelle,
      poidsNet: this.props.article?.poidsNet,
      quantiteNormalisee: this.props.article?.quantiteNormalisee,
    }
  }

  update() {
    this.setState(previousState => ({
      valeurDeclaree: previousState.valeurDeclaree,
      quantite: previousState.quantite,
      uniteLibelle: previousState.uniteLibelle,
      poidsNet: previousState.poidsNet,
      quantiteNormalisee: previousState.quantiteNormalisee,
    }), () => {
      this.props.update({
        valeurDeclaree: this.state?.valeurDeclaree,
        quantite: this.state?.quantite,
        uniteLibelle: this.state?.uniteLibelle,
        poidsNet: this.state?.poidsNet,
        quantiteNormalisee: this.state?.quantiteNormalisee,
      });
    });
  }

  componentDidMount() { }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ComAccordionComp title="Valeur et quantités" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Valeur déclarée : "
              libelleSize={2}
              children={
                <TextInput
                  disabled={!this.props.edition}
                  type="flat"
                  label=""
                  keyboardType={'number-pad'}
                  value={this.state.valeurDeclaree}
                  onChangeText={(text) => {
                    this.setState({
                      valeurDeclaree: text
                    })
                    this.update();
                  }
                  }
                />
              }
            />
            <ComBadrKeyValueComp
              libelleSize={1}
              children={
                <Button
                  style={{ margin: 10 }}
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
                  disabled={!this.props.edition}
                  type="flat"
                  label=""
                  keyboardType={'number-pad'}
                  value={this.state.quantite}
                  onChangeText={(text) => {
                    this.setState({
                      quantite: text
                    })
                    this.update();
                  }
                  }
                />
              }
            />
            <ComBadrKeyValueComp
              libelle="Unité de quantité : "
              libelleSize={2}
              children={
                <ComBadrAutoCompleteChipsComp
                  disabled={!this.props.edition}
                  onRef={(ref) => (this.refUnite = ref)}
                  code="code"
                  selected={this.state.uniteLibelle}
                  maxItems={3}
                  libelle="libelle"
                  command="getCmbUniteQuantite"
                  paramName="libelleUniteQuantite"
                  onDemand={true}
                  searchZoneFirst={false}
                  onValueChange={(text) => {
                    this.setState({
                      uniteLibelle: text
                    })
                    this.update();
                  }
                  }
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
                  disabled={!this.props.edition}
                  type="flat"
                  label=""
                  keyboardType={'number-pad'}
                  value={this.state.poidsNet}
                  onChangeText={(text) => {
                    this.setState({
                      poidsNet: text
                    })
                    this.update();
                  }
                  }
                />
              }
            />
            <ComBadrKeyValueComp
              libelle=""
              libelleSize={2}
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Quantité normalisée : "
              libelleSize={3}
              children={
                <TextInput
                  disabled={!this.props.edition}
                  type="flat"
                  label=""
                  keyboardType={'number-pad'}
                  value={this.state.quantiteNormalisee}
                  onChangeText={(text) => {
                    this.setState({
                      quantiteNormalisee: text
                    })
                    this.update();
                  }
                  }
                />
              }
            />
            <ComBadrKeyValueComp
              libelle="Unité de quantité normalisée : "
              libelleSize={3}
              value={getValueByPath(
                'unite',
                this.props.article,
              ) + ' ' + getValueByPath(
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
