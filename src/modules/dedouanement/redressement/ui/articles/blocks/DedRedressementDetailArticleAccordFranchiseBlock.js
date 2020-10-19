import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {
  Button,
  Paragraph,
  RadioButton,
  TextInput,
  Checkbox,
} from 'react-native-paper';
import {primaryColor} from '../../../../../../commons/styles/theme';
import {getValueByPath} from '../../../utils/DedUtils';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';

export default class DedRedressementDetailArticleAccordFranchiseBlocK extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleAccordChanged = (item) => {};

  handleFranchiseChanged = (item) => {};

  render() {
    return (
      <View style={{flex: 1}}>
        <ComAccordionComp title="Accord et franchise" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Code accord : "
              libelleSize={2}
              children={
                <ComBadrReferentielPickerComp
                  selected={{code: this.props.codeAccord}}
                  onRef={(ref) => (this.comboAccords = ref)}
                  command="getCmbAccord"
                  typeService="SP"
                  onValueChanged={this.handleAccordChanged}
                  code="code"
                  libelle="libelle"
                  params={{
                    codeAccord: '',
                    libelleAccord: '',
                  }}
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Franchise et exonération : "
              libelleSize={2}
              children={
                <ComBadrReferentielPickerComp
                  selected={{code: this.props.article.franchise}}
                  onRef={(ref) => (this.comboFranchise = ref)}
                  command="getCmbFranchise"
                  typeService="SP"
                  onValueChanged={this.handleFranchiseChanged}
                  code="code"
                  libelle="libelle"
                  params={{
                    codeFranchise: '',
                    libelleFranchise: '',
                  }}
                />
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}
