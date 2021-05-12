import {
  ComBadrButtonComp,
  ComBadrLibelleComp,
  ComBadrModalComp,
  ComBadrNumericTextInputComp,
  ComBadrPickerComp,
  ComBadrCardBoxComp,
} from '../../../../../../../commons/component';
import {View} from 'react-native';
import {CustomStyleSheet} from '../../../../../../../commons/styles/ComThemeStyle';
import {Text, TextInput} from 'react-native-paper';
import {translate} from '../../../../../../../commons/i18n/ComI18nHelper';
import {Col, Row} from 'react-native-easy-grid';

import React from 'react';

export default class ActifsRapportCreationSaisieMTSModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <ComBadrModalComp
        visible={this.props.visible}
        onDismiss={this.props.onDismiss}
        icon={'window-close'}
        picker={true}
        command={'getNaturesVehicule'}
        typeService={'SP'}
        onPress={this.props.onDismiss}
        onValueChange={(selectedValue, selectedIndex, item) => {
          // console.log("item", item)
        }}
        module={'GIB'}>
        <View style={CustomStyleSheet.whiteRow}>
          <Text>{translate('actifsCreation.saisie.moyensTransportS')}</Text>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={8}>
              <ComBadrCardBoxComp>
                <ComBadrPickerComp
                  onRef={(ref) => (this.code = ref)}
                  key="code"
                  titleStyle={CustomStyleSheet.badrPickerTitle}
                  style={{flex: 1}}
                  title={translate('actifsCreation.saisie.choisirNature')}
                  cle="code"
                  libelle="libelle"
                  module="GIB"
                  command="getNaturesVehicule"
                  selectedValue={this.props.natureVehicule.code}
                  selected={this.props.natureVehicule.code}
                  onValueChange={this.props.onValueChangeMTS}
                  param={'this.state.value'}
                  typeService="SP"
                  storeWithKey="code"
                  storeLibelleWithKey="code"
                />
              </ComBadrCardBoxComp>
            </Col>
          </Row>
          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.saisie.libelle')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={3}>
              <TextInput
                mode={'outlined'}
                style={{height: 20, fontSize: 12}}
                disabled={false}
                value={this.props.libelle}
                multiline={false}
                numberOfLines={1}
                onChangeText={this.props.onChangelibelle}
              />
            </Col>
            <Col size={0.5} />
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.saisie.valeur')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrNumericTextInputComp
                mode={'outlined'}
                style={{height: 20, fontSize: 12}}
                disabled={false}
                value={this.props.valueMTS}
                multiline={false}
                numberOfLines={1}
                onChangeBadrInput={this.props.onChangeValueMTS}
              />
            </Col>
          </Row>
          <Row style={CustomStyleSheet.whiteRow}>
            <ComBadrButtonComp
              style={{width: 100}}
              onPress={this.props.confirmer}
              text={translate('transverse.confirmer')}
            />
            <View style={{width: 10}} />
            <ComBadrButtonComp
              style={{width: 100}}
              onPress={() => {
                // this.Enregister()
              }}
              text={translate('transverse.retablir')}
            />
          </Row>
        </View>
      </ComBadrModalComp>
    );
  }
}
