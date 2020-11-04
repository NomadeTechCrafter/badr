import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrButtonIconComp,
  ComBadrKeyValueComp,
  ComBadrLibelleComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput} from 'react-native-paper';
import {getValueByPath} from '../../../utils/DedUtils';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {CustomStyleSheet} from '../../../../../../commons/styles/ComThemeStyle';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import ComUtils from '../../../../../../commons/utils/ComUtils';
import _ from 'lodash';

export default class DedRedressementDetailImputationTCManuelleBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {selectedItem} = this.props;
    return (
      <View style={{flex: 1}}>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Type : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('typeTitreChange', selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Banque : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  getValueByPath('banqueLibelle', selectedItem) +
                  '(' +
                  getValueByPath('banque', selectedItem) +
                  ')'
                }
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Agence : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  getValueByPath('agenceBancaireLibelle', selectedItem) +
                  '(' +
                  getValueByPath('agenceBancaire', selectedItem) +
                  ')'
                }
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="titre de change: "
            libelleSize={1}
            children={
              <TextInput type="flat" label="" disabled={true} value={''} />
            }
          />
          <ComBadrKeyValueComp
            libelle="Date d'enregistrement : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('dateEnregistrementTitre', selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Numéro de titre: "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('numeroTitreChange', selectedItem)}
              />
            }
          />
        </DedRedressementRow>

        {/*block Quantité et valeur*/}
        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {'Quantité et valeur'}
            </ComBadrLibelleComp>
          </Col>
        </Row>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Quantité à imputer: "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('quantiteImputee', selectedItem)}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="code quantité: "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  getValueByPath('codeQuantiteImputeeLibelle', selectedItem) +
                  '(' +
                  getValueByPath('codeQuantiteImputee', selectedItem) +
                  ')'
                }
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Valeur à imputer: "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('valeurImputee', selectedItem)}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Devise: "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  getValueByPath('deviseLibelle', selectedItem) +
                  '(' +
                  getValueByPath('devise', selectedItem) +
                  ')'
                }
              />
            }
          />
        </DedRedressementRow>
      </View>
    );
  }
}
