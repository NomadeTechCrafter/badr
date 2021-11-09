import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput} from 'react-native-paper';
import {getValueByPath} from '../../../utils/DedUtils';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';

class DedRedressementEnteteAccordFranchiseBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleAccordChanged = (accord) => {};

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
                      code: getValueByPath(
                        'dedDumSectionEnteteVO.codeAccord',
                        this.props.data,
                      ),
                    }}
                    onRef={(ref) => (this.comboAccords = ref)}
                    command="getCmbAccord"
                    onValueChanged={this.handleAccordChanged}
                    disabled={true}
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
                libelleSize={3}
                libelle="Franchise et exonération"
                children={<ComBadrItemsPickerComp items={[]} label="Choisir un code franchise" disabled={true} />}
              />
            </DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteAccordFranchiseBlock;
