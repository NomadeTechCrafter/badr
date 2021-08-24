import React from 'react';
import { View } from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
  ComBadrPickerComp,
} from '../../../../../../commons/component';
import styles from '../../../style/DedRedressementStyle';
import { Checkbox } from 'react-native-paper';
import { primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import DedRedressementRow from '../../common/DedRedressementRow';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';
import { getValueByPath } from '../../../utils/DedUtils';
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';

class DedRedressementEnteteInfoBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBureau: '',
    };
  }

  componentDidMount() { }

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Info" expanded={true}>
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
                  titleStyle={{ flex: 1 }}
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
                    codeBureau: getValueByPath(
                      'dedDumSectionEnteteVO.refBureauDedouanement',
                      this.props.data,
                    ),
                  }}
                  typeService="SP"
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Lieu de stockage"
              children={
                <ComBadrReferentielPickerComp
                  key="lieuStockage"
                  disabled={true}
                  selected={{
                    code: getValueByPath(
                      'dedDumSectionEnteteVO.lieuStockageLocalisation',
                      this.props.data,
                    ),
                  }}
                  module="REF_LIB"
                  onRef={(ref) => (this.comboLieuStockage = ref)}
                  command="getCmbLieuStockageParBureau"
                  onValueChange={(selectedValue, selectedIndex, item) =>
                    this.handleLieuStockageChanged(
                      selectedValue,
                      selectedIndex,
                      item,
                    )
                  }
                  params={{
                    codeBureau: getValueByPath(
                      'dedDumSectionEnteteVO.refBureauDedouanement',
                      this.props.data,
                    ),
                  }}
                  typeService="SP"
                  code="code"
                  libelle="libelle"
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
      { codeBureau: item.codeBureau },
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
      { codeBureau: selectedValue },
      this.comboBureaux,
    );
  };
}

export default DedRedressementEnteteInfoBlock;
