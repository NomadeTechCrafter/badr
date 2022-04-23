import React from 'react';
import { View } from 'react-native';
import {
  ComAccordionComp,
  ComBadrKeyValueComp,
  ComBadrPickerComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {
  Button,
  Paragraph,
  RadioButton,
  TextInput,
  Checkbox,
} from 'react-native-paper';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { getValueByPath } from '../../../utils/DedUtils';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';

export default class DedRedressementDetailArticleAccordFranchiseBlocK extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accord: this.props.article?.accord,
      franchise: this.props.article?.franchise,
    }
  }

  componentDidMount() { }

  update() {
    this.setState(previousState => ({
      accord: previousState.accord,
      franchise: previousState.franchise
    }), () => {
      this.props.update({
        accord: this.state?.accord,
        franchise: this.state?.franchise
      });
    });
  }

  handleAccordChanged = (item) => { };

  handleFranchiseChanged = (item) => { };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ComAccordionComp title="Accord et franchise" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Code accord : "
              libelleSize={2}
              children={
                <ComBadrPickerComp
                  disabled={!this.props.edition}
                  onRef={(ref) => (this.comboArrondissements55 = ref)}
                  key="code"
                  style={CustomStyleSheet.badrPicker}
                  selectedValue={this.state.accord}
                  titleStyle={CustomStyleSheet.badrPickerTitle}
                  cle="code"
                  libelle="libelle"
                  module="REF_LIB"
                  command="getCmbAccord"
                  param={{
                    codeAccord: "",
                    libelleAccord: "",
                  }}
                  typeService="SP"
                  storeWithKey="code"
                  storeLibelleWithKey="libelle"
                  onValueChange={(text) => {
                    this.setState({
                      accord: text
                    })
                    this.update();
                  }
                  }
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Franchise et exonération : "
              libelleSize={2}
              children={                
                <ComBadrPickerComp
                  disabled={!this.props.edition}
                  onRef={(ref) => (this.combofranchise = ref)}
                  key="code"
                  style={CustomStyleSheet.badrPicker}
                  selectedValue={this.state.franchise}
                  titleStyle={CustomStyleSheet.badrPickerTitle}
                  cle="code"
                  libelle="libelle"
                  module="REF_LIB"
                  command="getCmbFranchise"
                  param={{
                    "codeFranchise": "",
                    "libelleFranchise": ""
                  }}
                  typeService="SP"
                  storeWithKey="code"
                  storeLibelleWithKey="libelle"
                  onValueChange={(text) => {
                    this.setState({
                      franchise: text
                    })
                    this.update();
                  }
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
