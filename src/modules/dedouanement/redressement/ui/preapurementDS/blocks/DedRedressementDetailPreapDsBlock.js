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

export default class DedRedressementDetailPreapDsBlock extends React.Component {
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
            libelle="Type DS : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  getValueByPath('typeDSLib', selectedItem) +
                  '(' +
                  getValueByPath('typeDS', selectedItem) +
                  ')'
                }
              />
            }
          />
        </DedRedressementRow>

        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col size={2}>
            <ComBadrLibelleComp withColor={true}>
              {translate('ecorimport.declarationSommaire.referenceDeclaration')}
            </ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp withColor={true}>
              {translate('transverse.bureau')}
            </ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp withColor={true}>
              {translate('transverse.regime')}
            </ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp withColor={true}>
              {translate('transverse.annee')}
            </ComBadrLibelleComp>
          </Col>
          <Col size={2}>
            <ComBadrLibelleComp withColor={true}>
              {translate('transverse.serie')}
            </ComBadrLibelleComp>
          </Col>
          <Col size={1}>
            <ComBadrLibelleComp withColor={true}>
              {translate('transverse.cle')}
            </ComBadrLibelleComp>
          </Col>
        </Row>
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={2} />
          <Col size={2}>
            <TextInput
              type="flat"
              label=""
              disabled={true}
              value={ComUtils.getValueByPath('preapBureau', selectedItem)}
            />
          </Col>
          <Col size={2}>
            <TextInput
              type="flat"
              label=""
              disabled={true}
              value={ComUtils.getValueByPath('preapRegime', selectedItem)}
            />
          </Col>
          <Col size={2}>
            <TextInput
              type="flat"
              label=""
              disabled={true}
              value={ComUtils.getValueByPath('preapAnnee', selectedItem)}
            />
          </Col>
          <Col size={2}>
            <TextInput
              type="flat"
              label=""
              disabled={true}
              value={ComUtils.getValueByPath('preapSerie', selectedItem)}
            />
          </Col>
          <Col size={1}>
            <TextInput
              type="flat"
              label=""
              disabled={true}
              value={ComUtils.cleDS(
                ComUtils.getValueByPath('preapRegime', selectedItem) +
                  ComUtils.getValueByPath('preapSerie', selectedItem) +
                  ComUtils.getValueByPath('preapAnnee', selectedItem),
              )}
            />
          </Col>
        </Row>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Lieu de chargement : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  getValueByPath('descLieuChargement', selectedItem) +
                  '(' +
                  getValueByPath('lieuChargement', selectedItem) +
                  ')'
                }
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Référence lot : "
            libelleSize={1}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('referenceLot', selectedItem)}
              />
            }
          />
        </DedRedressementRow>
      </View>
    );
  }
}
