import React from 'react';
import { View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { TextInput } from 'react-native-paper';
import {
  ComBadrAutoCompleteChipsComp, ComBadrKeyValueComp,
  ComBadrLibelleComp, ComBadrButtonComp, ComAccordionComp
} from '../../../../../../commons/component';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import ComUtils from '../../../../../../commons/utils/ComUtils';
import { getValueByPath } from '../../../utils/DedUtils';
import DedRedressementRow from '../../common/DedRedressementRow';
import _ from 'lodash';

export default class DedRedressementLotDedBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  render() {
    console.log('this.props.selectedItem : ', this.props.selectedItem);
    const { selectedItem } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ComAccordionComp
          title={translate('dedouanement.peapurementds.lotded')}
          expanded={true}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle={translate('dedouanement.peapurementds.modetransport')}
              libelleSize={1}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={
                    getValueByPath('descriptionModeTransport', selectedItem)

                  }
                />
              } />
          </DedRedressementRow>

          
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle={translate('dedouanement.peapurementds.moyentransport')}
              libelleSize={1}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={
                    getValueByPath('descriptionMoyenTransport', selectedItem)

                  }
                />
              } />
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle={translate('dedouanement.peapurementds.datearrivee')}
              libelleSize={1}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={
                    getValueByPath('dateArrivee', selectedItem)

                  }
                />
              } />
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle={translate('dedouanement.peapurementds.poidsbrut')}
              libelleSize={1}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={
                    getValueByPath('poidsLot', selectedItem)

                  }
                />
              } />
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle={translate('dedouanement.peapurementds.nbrecontenant')}
              libelleSize={1}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={
                    getValueByPath('nombreContenant', selectedItem)

                  }
                />
              } />
          </DedRedressementRow>
          
          {!this.props.readOnly && <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
           
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.props.confirmer()
              }}
              text={translate('transverse.confirmer')}
            />

            <View style={{ width: 10 }} />
          </Row>}
        </ComAccordionComp>
      </View>
    );
  }
}
