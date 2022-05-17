import React from 'react';
import { View } from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import { TextInput } from 'react-native-paper';
import { getValueByPath } from '../../../utils/DedUtils';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';

class DedRedressementEnteteAccordFranchiseBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dedDumVo: this.props.data
    };
  }

  componentDidMount() { }

  static getDerivedStateFromProps(props, state) {
    if (props.data?.dedReferenceVO?.identifiant != state.dedDumVo.dedReferenceVO?.identifiant
    ) {
      return {
        dedDumVo: props.data
      }
    }
    return null;
  }

  handleAccordChanged = (accord) => {
    console.log("handleAccordChanged");
    console.log(accord);
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, codeAccord: accord.code } };
    this.setState({
      dedDumVo: dedDumVo
    });


    this.props.update(dedDumVo);
  }

  handleFranchiseChanged = (franchise) => {
    console.log("handleFranchiseChanged");
    console.log(franchise);
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, codeFranchise: franchise.code } };
    this.setState({
      dedDumVo: dedDumVo
    });


    this.props.update(dedDumVo);
  }
  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Accord et Franchise" expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Code accord"
                libelleSize={3}
                children={
                  <ComBadrReferentielPickerComp
                    label="Choisir un code accord"
                    selected={{
                      code: this.state.dedDumVo.dedDumSectionEnteteVO?.codeAccord,
                    }}
                    onRef={(ref) => (this.comboAccords = ref)}
                    command="getCmbAccord"
                    onValueChanged={this.handleAccordChanged}
                    code="code"
                    libelle="libelle"

                    disabled={this.props.readOnly || (this.state.dedDumVo.dedDumSectionEnteteVO.accordFranchiseDisabled === "true")}
                    params={{
                      codeAccord: '',
                      libelleAccord: ''
                    }}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Franchise et exonération"
                children={<ComBadrReferentielPickerComp
                  selected={{
                    code: this.state.dedDumVo.dedDumSectionEnteteVO?.codeFranchise,
                  }}
                  onRef={(ref) => (this.comboFranchiseExoneration = ref)}
                  command="getCmbFranchise"
                  onValueChanged={this.handleFranchiseChanged}
                  code="code"
                  libelle="libelle"
                  label="Choisir un code franchise"
                  disabled={this.props.readOnly || (this.state.dedDumVo.dedDumSectionEnteteVO.accordFranchiseDisabled === "true")}
                  params={{
                    codeFranchise: '',
                    libelleFranchise: ''
                  }}
                />}
              />
            </DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteAccordFranchiseBlock;
