import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput, Subheading} from 'react-native-paper';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';

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

            <DedRedressementRow></DedRedressementRow>
          </View>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Totaux</Text>
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
