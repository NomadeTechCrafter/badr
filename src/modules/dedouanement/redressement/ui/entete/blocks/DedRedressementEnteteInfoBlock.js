import React from 'react';
import {View, Text} from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrAutoCompleteComp,
  ComBadrKeyValueComp,
  ComBadrPickerComp,
} from '../../../../../../commons/component';
import styles from '../../../style/DedRedressementStyle';
import {Checkbox} from 'react-native-paper';
import {primaryColor} from '../../../../../../commons/styles/theme';
import DedRedressementRow from '../../common/DedRedressementRow';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';

class DedRedressementEnteteInfoBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBureau: '',
    };
  }

  componentDidMount() {
    /*
    <ComBadrAutoCompleteComp
              onRef={(ref) => (this.CmbBureauByCode = ref)}
              key="CmbBureauByCode"
              handleSelectItem={this.handleAutoCompleteBureauChanged}
              paramName="codeBureau"
              command="getCmbBureau"
              codeName="code"
              listNbElements={10}
              libelleName="libelle"
              minimumCharacters={1}
            />
     */
  }

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Info" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Combinée"
              children={<Checkbox color={primaryColor}></Checkbox>}
            />
            <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Déclaration par anticipation"
              children={<Checkbox color={primaryColor}></Checkbox>}
            />
          </DedRedressementRow>

          <DedRedressementRow zebra={true}>
            <ComBadrAutoCompleteChipsComp
              label={
                <ComBadrLibelleComp withColor={true}>
                  Bureau d'entrée
                </ComBadrLibelleComp>
              }
              onRef={(ref) => (this.refBureau = ref)}
              code="code"
              libelle="libelle"
              command="getCmbBureau"
              paramName="codeBureau"
              onDemand={true}
              searchZoneFirst={false}
              onValueChange={this.handleBureauChipsChanged}
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Lieu de stockage"
              children={
                <ComBadrPickerComp
                  onRef={(ref) => (this.comboLieuStockage = ref)}
                  style={{
                    flex: 1,
                    marginLeft: -80,
                  }}
                  titleStyle={{flex: 1}}
                  key="lieuStockage"
                  cle="code"
                  libelle="libelle"
                  module="REF_LIB"
                  command="getCmbLieuStockageParBureau"
                  onValueChange={(selectedValue, selectedIndex, item) =>
                    this.handleArrondissementChanged(
                      selectedValue,
                      selectedIndex,
                      item,
                    )
                  }
                  param={{codeBureau: this.state.selectedBureau.code}}
                  typeService="SP"
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Arrondissement"
              children={
                <ComBadrPickerComp
                  onRef={(ref) => (this.comboArrondissements = ref)}
                  style={{
                    flex: 1,
                    marginLeft: -80,
                  }}
                  titleStyle={{flex: 1}}
                  key="arrondissements"
                  cle="code"
                  libelle="libelle"
                  module="REF_LIB"
                  command="getArrondissementsByAgentAndBureau"
                  onValueChange={(selectedValue, selectedIndex, item) =>
                    this.handleArrondissementChanged(
                      selectedValue,
                      selectedIndex,
                      item,
                    )
                  }
                  param={this.state.selectedBureau}
                  typeService="SP"
                />
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }

  handleBureauChipsChanged = (item) => {
    this.setState({
      selectedBureau: item.code,
      nomBureauDouane: item.libelle,
      selectedArrondissement: '',
    });
    this.comboArrondissements.refresh(item.code, this.refBureau);
    this.comboLieuStockage.refresh({codeBureau: item.code}, this.comboBureaux);
  };

  handleBureauChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      selectedBureau: selectedValue,
      selectedBureauIndex: selectedIndex,
      nomBureauDouane: item.nomBureauDouane,
      selectedArrondissement: '',
    });
    console.log(selectedValue);
    this.comboArrondissements.refresh(selectedValue, this.refBureau);
    this.comboLieuStockage.refresh(
      {codeBureau: selectedValue},
      this.comboBureaux,
    );
  };
}

export default DedRedressementEnteteInfoBlock;
