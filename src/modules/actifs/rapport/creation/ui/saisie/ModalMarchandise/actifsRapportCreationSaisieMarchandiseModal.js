import React from 'react';
//import {ComBadrModalComp} from '../../../../../../common/component/modal/ComBadrModalComp';
import { View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { Text, TextInput } from 'react-native-paper';
import {
  ComBadrAutoCompleteChipsComp,

  ComBadrButtonComp,
  ComBadrItemsPickerComp,
  ComBadrLibelleComp,
  ComBadrModalComp,
  ComBadrNumericTextInputComp
} from '../../../../../../../commons/component';
import { translate } from '../../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';
export default class ActifsRapportCreationSaisieMarchandiseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: '',
      show: false,
      add: false,
      selectedvalue: '',
      natureMarchandiseSelected: '',
    };
  }

  onDismiss = () => {
    this.setState({ showDetail: false });
  };

  onChange = (event, selectedDate) => {
    this.setState({ date: selectedDate, show: false });
  };

  showMode = (currentMode) => {
    this.setState({ show: true, mode: currentMode });
  };

  clear = () => {
    this.setState({ natureMarchandiseSelected: '', selectedvalue: '', add: false});
  }
  populate = (data) => {
    console.log("ActifsRapportCreationSaisieMarchandiseModal data : ", data);
    console.log("ActifsRapportCreationSaisieMarchandiseModal _.isEmpty(data.autre) : ", !_.isEmpty(data.autreMarque));
    this.setState({
      natureMarchandiseSelected: data.marque.libelle,
      add: !_.isEmpty(data.autreMarque),
      selectedvalue: data.uniteMesure.codeUniteMesure
    });
  }

  addInput = () => {
    return (
      
      <Col size={2}>
        <TextInput
          ref={ref => this.refAutre = ref}
          mode={'outlined'}
          style={{ height: 20, fontSize: 12 }}
          disabled={false}
          value={this.props.autreMarque}
          multiline={false}
          numberOfLines={1}
          onChangeText={this.props.onChangeTextAutre}
        />
      </Col>
    );
  };
  handleOperateurChanged = (item, id) => {
    this.setState({ operateurCode: item.code });
  };
  render() {
    return (
      <ComBadrModalComp
        visible={this.props.visible}
        onDismiss={this.props.onDismiss}
        icon={'window-close'}
        onPress={this.props.onDismiss}>
        <View style={CustomStyleSheet.whiteRow}>
          <Text>{translate('actifsCreation.saisie.marchandisesSaisies')}</Text>
          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.saisie.natureMarchandise')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={3}>
              {/* <ComBadrAutoCompleteComp
                placeholder={''}
                onRef={(ref) => (this.code = ref)}
                libelle=""
                key="code"
                handleSelectItem={this.props.handlenatureMarchnadise}
                command="getNaturesMarchandise"
                styleInput={{ width: '100%', marginBottom: 30 }}
              //style={}
              /> */}
              <ComBadrAutoCompleteChipsComp
                code="code"
                disabled={this.props.readOnly}
                placeholder={''}
                selected={this.state.natureMarchandiseSelected}
                maxItems={3}
                libelle="libelle"
                module="GIB"
                command="getNaturesMarchandise"
                onDemand={true}
                searchZoneFirst={false}
                onValueChange={(item, index) => {
                  this.setState({ natureMarchandiseSelected: item.libelle });
                  this.props.handlenatureMarchnadise(item, index);
                }}
              />
            </Col>
            <Col size={0.5} />
            <Col size={2}>
              <ComBadrButtonComp
                style={{ width: 90, height: 30 }}
                onPress={() => {
                  this.setState({ add: true, natureMarchandiseSelected: '' });
                  this.props.handlenatureMarchnadise('', 0);
                }}
                text={translate('actifsCreation.saisie.autre')}
              />
            </Col>
            <Col size={0.5} />
            {this.state.add ? this.addInput() : null}
          </Row>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={3}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.saisie.unityMesure')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={8}>
              {this.props.listUnites?.length > 0 && (
                <ComBadrItemsPickerComp
                  itemStyle={{ fontSize: 12 }}
                  style={[{ height: 20 }, CustomStyleSheet.Input]}
                  selectedValue={this.state.selectedvalue}
                  label={translate('actifsCreation.saisie.choisirUnite')}
                  items={this.props.listUnites}
                  onValueChanged={(value, index) => {
                    console.log('actifsCreation.saisie.choisirUnite : ', value);
                    this.props.onValueChanged(value, index);
                    this.setState({ selectedvalue: value.code });
                  }
                  }
                />)}
              
            </Col>
          </Row>
          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.saisie.quantity')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={3}>
              <ComBadrNumericTextInputComp
                ref={ref => this.refQuantity=ref}
                mode={'outlined'}
                style={{ height: 20, fontSize: 12 }}
                disabled={false}
                value={this.props.quantite}
                multiline={false}
                numberOfLines={1}
                onChangeBadrInput={this.props.onChangeQuantity}
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
                ref={ref => this.refValue = ref}
                mode={'outlined'}
                style={{ height: 20, fontSize: 12 }}
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
              { justifyContent: 'space-between' },
            ]}>
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={this.props.confirmer}
              text={translate('transverse.confirmer')}
            />
            <View style={{ width: 10 }} />
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.props.retablir();
                this.refQuantity.clear();
                this.refValue.clear();
                this.refAutre.clear();
                this.clear();
              }
              }
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
