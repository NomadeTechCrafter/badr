import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import {getValueByPath} from '../../../utils/DedUtils';
import {TextInput} from 'react-native-paper';

class DedRedressementEnteteDocumentPrecedentBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDum: getValueByPath(
        'dedDumSectionEnteteVO.typeDocument',
        this.props.data,
      ),
      isTir: getValueByPath(
        'dedDumSectionEnteteVO.typeDocument',
        this.props.data,
      ),
    };
  }

  componentDidMount() {}

  getTypesDocuments = () => {
    return [
      {code: 1, value: 'true', libelle: translate('redentete.carnetTir')},
      {code: 2, value: 'false', libelle: translate('redentete.dum')},
    ];
  };

  handleDocumentTypeChanged = (type, index) => {
    this.setState({
      isDum: type.value === 'false',
      isTir: type.value === 'true',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Document précédent" expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelleSize={1}
                libelle="Type document"
                children={
                  <ComBadrItemsPickerComp
                    disabled={true}
                    selectedValue={getValueByPath(
                      'dedDumSectionEnteteVO.typeDocument',
                      this.props.data,
                    )}
                    items={this.getTypesDocuments()}
                    label=""
                    onValueChanged={this.handleDocumentTypeChanged}
                  />
                }
              />
            </DedRedressementRow>

            {this.state.isDum === 'true' && (
              <View style={styles.container}>
                <DedRedressementRow zebra={true}>
                  <ComBadrKeyValueComp
                    libelleSize={2}
                    libelle="Année transit"
                    children={
                      <TextInput
                        type="flat"
                        label=""
                        value={getValueByPath(
                          'dedDumSectionEnteteVO.anneeTransit',
                          this.props.data,
                        )}
                      />
                    }
                  />
                  <ComBadrKeyValueComp
                    libelleSize={2}
                    libelle="Régime transit"
                    children={
                      <TextInput
                        type="flat"
                        label=""
                        value={getValueByPath(
                          'dedDumSectionEnteteVO.regimeTransit',
                          this.props.data,
                        )}
                      />
                    }
                  />
                </DedRedressementRow>

                <DedRedressementRow zebra={true}>
                  <ComBadrKeyValueComp
                    libelleSize={2}
                    libelle="Régime transit"
                    children={
                      <TextInput
                        type="flat"
                        label=""
                        value={getValueByPath(
                          'dedDumSectionEnteteVO.regimeTransit',
                          this.props.data,
                        )}
                      />
                    }
                  />
                  <ComBadrKeyValueComp
                    libelleSize={2}
                    libelle="Clé transit"
                    children={
                      <TextInput
                        type="flat"
                        label=""
                        value={getValueByPath(
                          'dedDumSectionEnteteVO.cleTransit',
                          this.props.data,
                        )}
                      />
                    }
                  />
                </DedRedressementRow>
              </View>
            )}

            {this.state.isTir === 'false' && (
              <View style={styles.container}>
                <DedRedressementRow zebra={true}>
                  <ComBadrKeyValueComp
                    libelleSize={2}
                    libelle="Référence transit"
                    children={
                      <TextInput
                        type="flat"
                        label=""
                        value={getValueByPath(
                          'dedDumSectionEnteteVO.refTransit',
                          this.props.data,
                        )}
                      />
                    }
                  />
                  <ComBadrKeyValueComp
                    libelleSize={2}
                    libelle="Numéro volet"
                    children={
                      <TextInput
                        type="flat"
                        label=""
                        value={getValueByPath(
                          'dedDumSectionEnteteVO.numVoletTransit',
                          this.props.data,
                        )}
                      />
                    }
                  />
                </DedRedressementRow>

                <DedRedressementRow zebra={true}>
                  <ComBadrKeyValueComp
                    libelleSize={2}
                    libelle="Date établissement transit"
                    children={
                      <TextInput
                        type="flat"
                        label=""
                        value={getValueByPath(
                          'dedDumSectionEnteteVO.dateEtablissementTransit',
                          this.props.data,
                        )}
                      />
                    }
                  />
                  <ComBadrKeyValueComp
                    libelleSize={2}
                    libelle="Clé transit"
                    children={
                      <TextInput
                        type="flat"
                        label=""
                        value={getValueByPath(
                          'dedDumSectionEnteteVO.cleTransit',
                          this.props.data,
                        )}
                      />
                    }
                  />
                </DedRedressementRow>
              </View>
            )}
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteDocumentPrecedentBlock;
