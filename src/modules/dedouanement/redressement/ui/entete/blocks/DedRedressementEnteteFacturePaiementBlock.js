import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput, Subheading, Checkbox} from 'react-native-paper';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';
import {primaryColor} from '../../../../../../commons/styles/theme';

class DedRedressementEnteteFacturePaiementBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /*
    <ComBadrKeyValueComp
                libelle="Condition de livraison"
                children={
                  <ComBadrItemsPickerComp items={[]} selectedItem={{}} />
                }
              />
     */
  }

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Facture et paiement" expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Facture</Text>
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Conditions de livraison"
                children={<ComBadrItemsPickerComp items={[]} label="" />}
              />
            </DedRedressementRow>
            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Montant total"
                children={<TextInput type="flat" label="" value="" />}
              />
            </DedRedressementRow>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Devise"
                children={<TextInput type="flat" label="" value="" />}
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Taux de change"
                value="0.00"
              />
            </DedRedressementRow>
          </View>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Totaux</Text>
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Montant fret"
                libelleSize={3}
                children={<TextInput type="flat" label="" value="" />}
              />
              <ComBadrKeyValueComp
                libelleSize={2}
                libelle="Poids net total"
                value="0.00"
              />
            </DedRedressementRow>
          </View>

          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Paiement</Text>
            </DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteFacturePaiementBlock;
