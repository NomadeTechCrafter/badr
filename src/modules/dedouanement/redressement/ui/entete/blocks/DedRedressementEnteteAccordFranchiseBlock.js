import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput} from 'react-native-paper';

class DedRedressementEnteteAccordFranchiseBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Accord et Franchise" expanded={false}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Code accord"
                children={<ComBadrItemsPickerComp items={[]} label="" />}
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Franchise et exonération"
                children={<ComBadrItemsPickerComp items={[]} label="" />}
              />
            </DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteAccordFranchiseBlock;
