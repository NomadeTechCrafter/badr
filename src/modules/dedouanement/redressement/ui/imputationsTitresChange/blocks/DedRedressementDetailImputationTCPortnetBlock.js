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

export default class DedRedressementDetailImputationTCPortnetBlock extends React.Component {
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
          <ComBadrKeyValueComp
            libelle="Titre de change : "
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
                  getValueByPath('banqueTitre', selectedItem) +
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
                value={getValueByPath('agenceTitre', selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Date début validté : "
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
          <ComBadrKeyValueComp
            libelle="Date d'échance : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('dateEcheanceTitre', selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="valeur Total: "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('montantTotalTitre', selectedItem)}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Devise : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('devise', selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Solde valeur: "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('soldeMontantTitre', selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Incoterme : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('incotermTitre', selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        {/*block Marchandise*/}
        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {'Marchandise'}
            </ComBadrLibelleComp>
          </Col>
        </Row>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Marchandise : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('marchandiseCode', selectedItem)}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Poids Net (KG): "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('poidsNetTitre', selectedItem)}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Solde Poids (KG): "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('soldePoidsNetTitre', selectedItem)}
              />
            }
          />
        </DedRedressementRow>

        {/*block Imputation*/}
        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {'Imputation'}
            </ComBadrLibelleComp>
          </Col>
        </Row>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Poids (KG) : "
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
            libelle="Valeur: "
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
        </DedRedressementRow>
      </View>
    );
  }
}
