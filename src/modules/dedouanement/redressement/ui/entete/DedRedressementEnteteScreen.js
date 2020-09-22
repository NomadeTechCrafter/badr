import React from 'react';
import {ScrollView, View} from 'react-native';
import DedRedressementInfoCommon from '../common/DedRedressementInfoCommon';
import DedRedressementEnteteVersionBlock from './blocks/DedRedressementEnteteVersionBlock';
import DedRedressementEnteteInfoBlock from './blocks/DedRedressementEnteteInfoBlock';
import DedRedressementEnteteDeclarantOpeBlock from './blocks/DedRedressementEnteteDeclarantOpeBlock';
import DedRedressementEnteteFacturePaiementBlock from './blocks/DedRedressementEnteteFacturePaiementBlock';

class DedRedressementEnteteScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /*  <DedRedressementInfoCommon
      bureau="309"
      regime="010"
      annee="2020"
      serie="0000344"
      nVoyage="12990"
      type="Régime interne"
      cle="N"></DedRedressementInfoCommon>
    <DedRedressementEnteteVersionBlock />
    <DedRedressementEnteteInfoBlock />
    <DedRedressementEnteteDeclarantOpeBlock />
    <DedRedressementEnteteFacturePaiementBlock />*/
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <DedRedressementInfoCommon
            bureau="309"
            regime="010"
            annee="2020"
            serie="0000344"
            nVoyage="12990"
            type="Régime interne"
            cle="N"></DedRedressementInfoCommon>
          <DedRedressementEnteteVersionBlock />
          <DedRedressementEnteteInfoBlock />
          <DedRedressementEnteteDeclarantOpeBlock />
          <DedRedressementEnteteFacturePaiementBlock />
        </View>
      </ScrollView>
    );
  }
}

export default DedRedressementEnteteScreen;
