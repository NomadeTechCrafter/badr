import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput, Subheading} from 'react-native-paper';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';

class DedRedressementEnteteDeclarantOpeBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Déclarant (Opérateur)">
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Déclarant (Opérateur)</Text>
            </DedRedressementRow>
            <DedRedressementRow>
              <ComBadrKeyValueComp libelle="Code" />
              <ComBadrKeyValueComp
                libelle="N° Répertoire"
                children={<TextInput type="flat" label="" value="" />}
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp libelle="Nom ou raison sociale" />
            </DedRedressementRow>
          </View>

          {this.buildOperateurBlock('Expediteur / Exportateur / Cédant')}
          {this.buildOperateurBlock('Destinataire, Importateur / Cessionaire')}
          {this.buildOperateurBlock(
            "Operateur pour lequel est engagé l'opération",
          )}
        </ComAccordionComp>
      </View>
    );
  }

  buildOperateurBlock = (title) => {
    return (
      <View style={styles.container}>
        <DedRedressementRow zebra={true}>
          <Text style={styles.headingText}>{title}</Text>
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp libelle="N° R.C" />
          <ComBadrKeyValueComp libelle="Centre R.C" />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp libelle="IFU" />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Nom ou raison sociale"
            children={<TextInput type="flat" label="" value="" />}
          />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Adresse complète"
            children={<TextInput type="flat" label="" value="" />}
          />
        </DedRedressementRow>
      </View>
    );
  };
}

export default DedRedressementEnteteDeclarantOpeBlock;
