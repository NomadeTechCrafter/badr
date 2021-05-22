import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';

class DedRedressementEnteteTransbordementBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Transbordement" expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Mode de transport"
                children={<ComBadrItemsPickerComp items={[]} label="" disabled={true}/>}
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Moyen de transport"
                children={<ComBadrItemsPickerComp items={[]} label="" disabled={true}/>}
              />
            </DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteTransbordementBlock;
