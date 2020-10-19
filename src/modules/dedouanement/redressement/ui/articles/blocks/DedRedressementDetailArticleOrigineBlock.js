import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {Checkbox, TextInput} from 'react-native-paper';
import {getValueByPath} from '../../../utils/DedUtils';

export default class DedRedressementDetailArticleOrigineBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <ComAccordionComp title="Origine" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Issu ATPA : "
              libelleSize={3}
              children={
                <Checkbox
                  disabled={true}
                  status={
                    getValueByPath('issuATPA', this.props.article)
                      ? 'checked'
                      : 'unchecked'
                  }
                />
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}
