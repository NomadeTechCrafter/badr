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
import {getValueByPath} from '../../../utils/DedUtils';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import ComBadrPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrPickerComp';

class DedRedressementEnteteFacturePaiementBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    /* let conditions = getValueByPath(
      'dedDumSectionEnteteVO.conditionLivraison',
      this.props.data,
    );*/

    return (
      <View style={styles.container}>
        <ComAccordionComp title="Facture et paiement" expanded={false}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Facture</Text>
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Conditions de livraison"
                children={
                  <ComBadrReferentielPickerComp
                    onRef={(ref) => (this.combo1 = ref)}
                    onValueChanged={(value) => {
                      if (this.combo2) this.combo2.refresh(value, this.combo1);
                    }}
                    selectedValue={{}}
                    command="getListeBureaux"
                    code="codeBureau"
                    libelle="nomBureauDouane"
                    params={{codeBureau: '308'}}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Conditions de livraison"
                children={
                  <ComBadrReferentielPickerComp
                    onRef={(ref) => (this.combo2 = ref)}
                    selectedValue={{}}
                    command="getCmbLieuStockageParBureau"
                    code="code"
                    libelle="libelle"
                    params={{codeBureau: '308'}}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Montant total"
                children={<TextInput type="flat" label="" value="" />}
              />
              <ComBadrKeyValueComp />
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

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Montant assurance"
                libelleSize={3}
                children={<TextInput type="flat" label="" value="" />}
              />
              <ComBadrKeyValueComp
                libelleSize={2}
                libelle="Poids brut total"
                children={<TextInput type="flat" label="" value="" />}
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Aconage et autres frais"
                libelleSize={3}
                children={<TextInput type="flat" label="" value="" />}
              />
              <ComBadrKeyValueComp
                libelleSize={2}
                libelle="Valeur Totale declarée"
                value="0.00"
              />
            </DedRedressementRow>
          </View>

          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Paiement</Text>
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Mode"
                children={<ComBadrItemsPickerComp items={[]} label="" />}
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Crédit d'enlevement"
                children={<ComBadrItemsPickerComp items={[]} label="" />}
              />
            </DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteFacturePaiementBlock;
