import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {Checkbox, TextInput, Button} from 'react-native-paper';
import {primaryColor} from '../../../../../../commons/styles/ComThemeStyle';
import {getValueByPath} from '../../../utils/DedUtils';

export default class DedRedressementDetailArticleLiquidationBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <ComAccordionComp title="Liquidation" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="A liquider : "
              libelleSize={3}
              children={
                <Checkbox
                  status={getValueByPath('aliquider', this.props.article)}
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Propriété T.I. "
              libelleSize={3}
              children={
                <Button
                  style={{width: 100, margin: 10}}
                  mode="contained"
                  disabled={true}
                  color={primaryColor}>
                  OK
                </Button>
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}
