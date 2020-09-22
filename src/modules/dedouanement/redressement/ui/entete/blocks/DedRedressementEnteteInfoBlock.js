import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteComp,
  ComBadrKeyValueComp,
  ComBadrPickerComp,
} from '../../../../../../commons/component';
import styles from '../../../style/DedRedressementStyle';
import {Checkbox} from 'react-native-paper';
import {primaryColor} from '../../../../../../commons/styles/theme';
import DedRedressementRow from '../../common/DedRedressementRow';

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
            <ComBadrKeyValueComp
              libelle="Bureau d'entrée / Sortie"
              children={
                <ComBadrPickerComp
                  onRef={(ref) => (this.comboBureaux = ref)}
                  key="bureauEntreeSortie"
                  style={{
                    flex: 1,
                    marginLeft: -80,
                  }}
                  titleStyle={{flex: 1}}
                  cle="codeBureau"
                  libelle="nomBureauDouane"
                  module="REF_LIB"
                  command="getListeBureaux"
                  onValueChange={(selectedValue, selectedIndex, item) => {
                    this.handleBureauChanged(
                      selectedValue,
                      selectedIndex,
                      item,
                    );
                  }}
                  param=""
                  typeService="SP"
                />
              }
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

  handleBureauChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      selectedBureau: selectedValue,
      selectedBureauIndex: selectedIndex,
      nomBureauDouane: item.nomBureauDouane,
      selectedArrondissement: '',
    });
    console.log(selectedValue);
    this.comboArrondissements.refresh(selectedValue, this.comboBureaux);
    this.comboLieuStockage.refresh(
      {codeBureau: selectedValue},
      this.comboBureaux,
    );
  };
}

export default DedRedressementEnteteInfoBlock;
