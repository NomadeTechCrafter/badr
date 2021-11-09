import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {ComAccordionComp} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';

class DedRedressementEnteteAglaciBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="AGLACI" expanded={false}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}></DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteAglaciBlock;
