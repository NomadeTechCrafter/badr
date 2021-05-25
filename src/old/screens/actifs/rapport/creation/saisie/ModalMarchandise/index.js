import {
  ComBadrAutoCompleteComp,
  ComBadrButtonComp,
  ComBadrItemsPickerComp,
  ComBadrLibelleComp,
  ComBadrModalComp,
  ComBadrNumericTextInputComp,
  ComContainerComp,
} from '../../../../../../../commons/component';
//import {ComBadrModalComp} from '../../../../../../common/component/modal/ComBadrModalComp';
import {View} from 'react-native';
import {CustomStyleSheet} from '../../../../../../../commons/styles/ComThemeStyle';
import {Text, TextInput} from 'react-native-paper';
import {translate} from '../../../../../../../commons/i18n/ComI18nHelper';
import {Col, Row} from 'react-native-easy-grid';
import React from 'react';

export default class ModalMarchandise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(1598051730000),
      mode: '',
      show: false,
      add: false,
      selectedvalue: '',
    };
  }

  onDismiss = () => {
    this.setState({showDetail: false});
  };

  onChange = (event, selectedDate) => {
    this.setState({date: selectedDate, show: false});
  };

  showMode = (currentMode) => {
    this.setState({show: true, mode: currentMode});
  };

  addInput = () => {
    return (
      <Col size={2}>
        <TextInput
          mode={'outlined'}
          style={{height: 20, fontSize: 12}}
          disabled={false}
          value={this.props.autre}
          multiline={false}
          numberOfLines={1}
          onChangeText={this.props.onChangeTextAutre}
        />
      </Col>
    );
  };
  handleOperateurChanged = (item, id) => {
    this.setState({operateurCode: item.code});
  };
  render() {
    return (
      <ComBadrModalComp
        visible={this.props.visible}
        onDismiss={this.props.onDismiss}
        icon={'window-close'}
        onPress={this.props.onDismiss}>
        <View style={CustomStyleSheet.whiteRow}>
          <Text>{translate('actifs.saisie.marchandisesSaisies')}</Text>
          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifs.saisie.natureMarchandise')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={3}>
              <ComBadrAutoCompleteComp
                placeholder={''}
                onRef={(ref) => (this.code = ref)}
                libelle=""
                key="code"
                handleSelectItem={this.props.handlenatureMarchnadise}
                command="getNaturesMarchandise"
                styleInput={{width: '100%', marginBottom: 30}}
                //style={}
              />
            </Col>
            <Col size={0.5} />
            <Col size={2}>
              <ComBadrButtonComp
                style={{width: 90, height: 30}}
                onPress={() => {
                  this.setState({add: true});
                }}
                text={translate('actifs.saisie.autre')}
              />
            </Col>
            {this.state.add ? this.addInput() : null}
          </Row>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={3}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifs.saisie.unityMesure')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={8}>
              {this.props.rows.length > 0 && (
                <ComBadrItemsPickerComp
                  itemStyle={{fontSize: 12}}
                  style={[{height: 20}, CustomStyleSheet.Input]}
                  selectedValue={this.props.selectedvalue}
                  label={translate('actifs.saisie.choisirUnite')}
                  items={this.props.rows}
                  onValueChanged={this.props.onValueChanged}
                />
              )}
            </Col>
          </Row>
          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifs.saisie.quantity')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={3}>
              <ComBadrNumericTextInputComp
                mode={'outlined'}
                style={{height: 20, fontSize: 12}}
                disabled={false}
                value={this.props.Quantity}
                multiline={false}
                numberOfLines={1}
                onChangeBadrInput={this.props.onChangeQuantity}
              />
            </Col>
            <Col size={0.5} />
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifs.saisie.valeur')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrNumericTextInputComp
                mode={'outlined'}
                style={{height: 20, fontSize: 12}}
                disabled={false}
                value={this.props.valeur}
                multiline={false}
                numberOfLines={1}
                onChangeBadrInput={this.props.onChangeValeur}
              />
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
const styles = {
  pickerStyle: {
    backgroundColor: '#f1f1f1',
    fontSize: 12,
    height: 30,
  },
};
