import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
  ComBadrPickerComp,
} from '../../../../../../commons/component';
import styles from '../../../style/DedRedressementStyle';
import {Checkbox} from 'react-native-paper';
import {primaryColor} from '../../../../../../commons/styles/ComThemeStyle';
import DedRedressementRow from '../../common/DedRedressementRow';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';
import {getValueByPath} from '../../../utils/DedUtils';
import {ComSessionService} from '../../../../../../commons/services/session/ComSessionService';

class DedRedressementEnteteInfoBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBureau: '',
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Info" expanded={true}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Combinée"
              children={
                <Checkbox
                  status={
                    getValueByPath(
                      'dedDumSectionEnteteVO.combinee',
                      this.props.data,
                    ) === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                  color={primaryColor}
                />
              }
            />
            <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Déclaration par anticipation"
              children={
                <Checkbox
                  status={
                    getValueByPath(
                      'dedDumSectionEnteteVO.anticipee',
                      this.props.data,
                    ) === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                  color={primaryColor}
                />
              }
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
              code="codeBureau"
              selected={this.props.dedDumSectionEnteteVO.bureauDestinationLibelle}
              maxItems={10}
              disabled={true}
              libelle="nomBureauDouane"
              command="getListeBureaux"
              onDemand={true}
              searchZoneFirst={false}
              onValueChange={this.handleBureauChipsChanged}
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Lieu de stockage"
              libelleSize={3}
              children={
                <ComBadrPickerComp
                  disabled={true}
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
              libelleSize={3}
              children={
                <ComBadrPickerComp
                  disabled={true}
                  selected={getValueByPath(
                    'dedDumSectionEnteteVO.arrondissement',
                    this.props.data,
                  )}
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
                  command="getArrondissementByBureau"
                  onValueChange={(selectedValue, selectedIndex, item) =>
                    this.handleArrondissementChanged(
                      selectedValue,
                      selectedIndex,
                      item,
                    )
                  }
                  param={{
                    codeBureau: ComSessionService.getInstance().getCodeBureau(),
                  }}
                  typeService="SP"
                />
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }

  isActivehandleBureauChipsChanged = (item) => {
    this.setState({
      selectedBureau: item.codeBureau,
      nomBureauDouane: item.nomBureauDouane,
      selectedArrondissement: '',
    });
    this.comboArrondissements.refresh(item.codeBureau, this.refBureau);
    this.comboLieuStockage.refresh(
      {codeBureau: item.codeBureau},
      this.comboBureaux,
    );
  };

  handleBureauChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      selectedBureau: selectedValue,
      selectedBureauIndex: selectedIndex,
      nomBureauDouane: item.nomBureauDouane,
      selectedArrondissement: '',
    });
    this.comboArrondissements.refresh(selectedValue, this.refBureau);
    this.comboLieuStockage.refresh(
      {codeBureau: selectedValue},
      this.comboBureaux,
    );
  };
}

export default DedRedressementEnteteInfoBlock;
