import React from 'react';
import { View } from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
  ComBadrPickerComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import { Checkbox, TextInput } from 'react-native-paper';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';

export default class DedRedressementDetailArticleTypeReconnaissanceBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeReconnaissance: this.props.article.typeReconnaissance,
    }
  }

  componentDidMount() {
    console.log(this.props.article.typeReconnaissance);
  }

  handleReconnaissanceChanged = (item) => {
    this.setState(previousState => ({
      typeReconnaissance: previousState.typeReconnaissance,
    }), () => {
      this.props.update({
        typeReconnaissance: item.code,
      });
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ComAccordionComp title="Type de reconnaissance" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Libelle : "
              libelleSize={3}
              children={
                <ComBadrPickerComp
                  disabled={!this.props.edition}
                  key="code"
                  style={CustomStyleSheet.badrPicker}
                  selectedValue={this.state?.typeReconnaissance}
                  titleStyle={CustomStyleSheet.badrPickerTitle}
                  cle="code"
                  libelle="libelle"
                  module="REF_LIB"
                  command="getCmbTypeReconnaissance"
                  param={null}
                  typeService="SP"
                  storeWithKey="code"
                  storeLibelleWithKey="libelle"
                  onValueChange={(selectedValue, selectedIndex, item) =>

                    item?.code ? this.handleReconnaissanceChanged(item) : {}
                  }
                />
                // <ComBadrReferentielPickerComp
                //   disabled={!this.props.edition}
                //   selected={
                //     this.state.typeReconnaissance
                //   }
                //   onRef={(ref) => (this.comboAccords = ref)}
                //   command="getCmbTypeReconnaissance"
                //   typeService="SP"
                //   onValueChanged={this.handleReconnaissanceChanged}
                //   code="code"
                //   libelle="libelle"
                //   params=""
                // />
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}
