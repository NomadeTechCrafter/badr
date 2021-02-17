import {
  ComBadrAutoCompleteComp,
  ComBadrButtonComp,
  ComBadrLibelleComp,
  ComBadrModalComp,
  ComBadrNumericTextInputComp,
  ComContainerComp,
} from '../../../../../../../commons/component';
import {View} from 'react-native';
import {CustomStyleSheet} from '../../../../../../../commons/styles/ComThemeStyle';
import {Text, TextInput} from 'react-native-paper';
import {translate} from '../../../../../../../commons/i18n/ComI18nHelper';
import {Col, Row} from 'react-native-easy-grid';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {IconButton} from 'react-native-paper';

export default class ModalPV extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ComBadrModalComp
        visible={this.props.visible}
        onDismiss={this.props.onDismiss}
        icon={'window-close'}
        onPress={this.props.onDismiss}>
        <View style={CustomStyleSheet.whiteRow}>
          <Text>{translate('actifs.saisie.pVSaisi')}</Text>
          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={3}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifs.saisie.nPV')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={5} style={{paddingRight: 10}}>
              <ComBadrNumericTextInputComp
                onRef={this.props.onRefPV}
                maxLength={3}
                style={{height: 20, fontSize: 12}}
                value={this.props.value}
                onChangeBadrInput={this.props.onChangeBadrInput}
              />
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifs.saisie.dU')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={4}>
              <TextInput
                mode={'outlined'}
                style={{height: 20, fontSize: 12}}
                disabled={false}
                value={this.props.valueDate}
                multiline={false}
                numberOfLines={1}
                onChangeText={this.props.onChangeTextDate}
              />
              {this.props.show && (
                <DateTimePicker
                  value={this.props.date}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={this.props.onChange}
                />
              )}
            </Col>
            <Col size={2}>
              <IconButton icon="calendar" onPress={this.props.showMode} />
            </Col>
          </Row>
          <Row
            style={[
              CustomStyleSheet.whiteRow,
              {justifyContent: 'space-between'},
            ]}>
            <ComBadrButtonComp
              style={{width: 100}}
              onPress={this.props.confirmer}
              text={translate('transverse.confirmer')}
            />
            <View style={{width: 10}} />
            <ComBadrButtonComp
              style={{width: 100}}
              onPress={() => {
                this.props.retablir;
              }}
              text={translate('transverse.retablir')}
            />
          </Row>
        </View>
      </ComBadrModalComp>
    );
  }
}