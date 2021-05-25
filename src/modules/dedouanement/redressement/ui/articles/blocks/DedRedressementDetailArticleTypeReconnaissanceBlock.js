import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {Checkbox, TextInput} from 'react-native-paper';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';

export default class DedRedressementDetailArticleTypeReconnaissanceBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.article.typeReconnaissance);
  }

  handleReconnaissanceChanged = () => {};

  render() {
    return (
      <View style={{flex: 1}}>
        <ComAccordionComp title="Type de reconnaissance" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Libelle : "
              libelleSize={3}
              children={
                <ComBadrReferentielPickerComp
                  selected={
                    this.props.article.typeReconnaissance
                      ? this.props.article.typeReconnaissance
                      : {code: 'RACC'}
                  }
                  onRef={(ref) => (this.comboAccords = ref)}
                  command="getCmbTypeReconnaissance"
                  typeService="SP"
                  onValueChanged={this.handleReconnaissanceChanged}
                  code="code"
                  libelle="libelle"
                  params=""
                />
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}
