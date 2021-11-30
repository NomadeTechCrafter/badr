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
      dedDumVo: this.props.data,
      selectedBureau: '',
    };
  }

  componentDidMount() { }

  handleArrondissementChanged = (selectedValue, selectedIndex, item) => {

    this.setState({
      dedDumVo: { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo?.dedDumSectionEnteteVO, arrondissement: selectedValue } }
    });
    this.props.handleArrondissementChanged(selectedValue, selectedIndex, item);
  };

  handleLieuStockageLocalisationChanged = (selectedValue, selectedIndex, item) => {
  
    this.setState({
      dedDumVo: { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo?.dedDumSectionEnteteVO, lieuStockageLocalisation: selectedValue } }
    });
    this.props.handleLieuStockageLocalisationChanged(selectedValue, selectedIndex, item);
  };

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Arrondissement et lieu de stockage de Dédouanement" expanded={true}>
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Arrondissement"
              libelleSize={3}
              children={
                <ComBadrPickerComp
                  disabled={this.props.readOnly}
                  selected={this.state.dedDumVo?.dedDumSectionEnteteVO?.arrondissement}
                  onRef={(ref) => (this.comboArrondissements = ref)}
                  style={{
                    flex: 1,
                    marginLeft: -130,
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
              libelle="Lieu de stockage "
              children={

                < ComBadrPickerComp
                  disabled={this.props.readOnly || this.state.dedDumVo?.dedDumSectionEnteteVO?.regimeInterne}
                  selected={this.state.dedDumVo?.dedDumSectionEnteteVO?.lieuStockageLocalisation}
                  onRef={(ref) => (this.comboLieuStockage = ref)}
                  
                  titleStyle={{ flex: 1 }}
                  key="lieuStockage"
                  cle="code"
                  libelle="libelle"
                  module="REF_LIB"
                  command="getCmbLieuStockageParBureau"
                  onValueChange={(selectedValue, selectedIndex, item) =>
                    this.handleLieuStockageChanged(
                      selectedValue,
                      selectedIndex,
                      item
                    )
                  }
                  param={{
                    codeBureau: getValueByPath(
                      'dedDumSectionEnteteVO.refBureauDedouanement',
                      this.props.data,
                    ), dateValidite: getValueByPath(
                      'dedReferenceVO.dateValidite',
                      this.props.data,
                    )
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




}

export default DedRedressementEnteteInfoBlock;
