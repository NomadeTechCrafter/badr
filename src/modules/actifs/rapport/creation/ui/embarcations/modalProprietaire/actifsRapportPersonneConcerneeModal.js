import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import {
  ComBadrAutoCompleteChipsComp, ComBadrButtonComp,
  ComBadrCardBoxComp,
  ComBadrErrorMessageComp, ComBadrItemsPickerComp, ComBadrLibelleComp,
  ComBadrModalComp
} from '../../../../../../../commons/component';
import { translate } from '../../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../../../../commons/styles/ComThemeStyle';
import { INTERVENANT_INITIAL, LIST_TYPES_IDENTIFIANT } from '../../../../utils/actifsConstants';


export default class ActifsRapportPersonneConcerneeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      intervenant: this.props.intervenant ? this.props.intervenant : INTERVENANT_INITIAL,
      index: null,
      acNationalite: '',
      cocherPassager: true,
      isPassager: 'true'
    };
  }

  onChangeTypeIdentifiant(text) {
    console.log(this.state.intervenant);
    this.setState({
      intervenant: {
        ...this.state.intervenant, intervenant: {
          ...this.state.intervenant.intervenant,
          refTypeDocumentIdentite: text,
        }
      }
    });
  }

  handlePaysChanged = (pays) => {
    console.log('handlePaysChanged : ', pays);
    this.setState({
      acNationalite: pays,
      intervenant: {
        ...this.state.intervenant, intervenant: {
          ...this.state.intervenant?.intervenant,
          nationaliteFr: pays.code
        }
      }
    });
    this.state.intervenant.intervenant.nationaliteFr = pays.code;

  };

  retablirIntervenant = () => {
    this.setState({ intervenant: INTERVENANT_INITIAL, acNationalite: { code: '', libelle: '' }, errorMessage: null, index:-1 });
  }

  confirmerIntervenant = () => {
    if (!this.checkRequiredFields()) {
      this.props.confirmer(this.state.intervenant);
      this.setState({
        cocherPassager: true,
        index:-1,
        isPassager: 'true', intervenant: INTERVENANT_INITIAL, acNationalite: { code: '', libelle: '' }
      });
    }
  }

  checkRequiredFields = () => {
    let msg = [];
    let required = false;

    if (_.isEmpty(this.state.intervenant?.intervenant.refTypeDocumentIdentite)) {
      required = true;
      msg.push(translate('actifsCreation.embarcations.intervenants.msgerrors.typeIdentifiant'));
    }

    if (_.isEmpty(this.state.intervenant?.intervenant.numeroDocumentIndentite)) {
      required = true;
      msg.push(translate('actifsCreation.embarcations.intervenants.msgerrors.identifiant'));
    }
    if (_.isEmpty(this.state.intervenant?.intervenant.nomIntervenant)) {
      required = true;
      msg.push(translate('actifsCreation.embarcations.intervenants.msgerrors.nomIntervenant'));
    }
    if (_.isEmpty(this.state.intervenant?.intervenant.prenomIntervenant)) {
      required = true;
      msg.push(translate('actifsCreation.embarcations.intervenants.msgerrors.prenomIntervenant'));
    }



    if (required) {

      this.setState({
        errorMessage: msg
      });
    } else {
      this.setState({
        errorMessage: null
      });

    }
    return required;


  }


  getPersonneForm() {

    return (<ComBadrCardBoxComp noPadding={true}>
      <Grid>
        { /*first Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={7}>
            <ComBadrLibelleComp withColor={true}>
              {translate('actifsCreation.embarcations.intervenants.typeIdentifiant')}
            </ComBadrLibelleComp>
          </Col>
          <Col size={10}>
            <ComBadrItemsPickerComp
              disabled={this.props.readOnly}
              style={{
                borderWidth: 1,
                borderColor: '#696969',
                borderRadius: 4,
                height: 40, fontSize: 12, paddingBottom: 45
              }}
              label={translate('actifsCreation.embarcations.intervenants.typeIdentifiant')}
              selectedValue={this.state.intervenant?.intervenant.refTypeDocumentIdentite}
              items={LIST_TYPES_IDENTIFIANT}
              onValueChanged={(value, index) =>
                (value?.code) ? this.onChangeTypeIdentifiant(value.code) : {}
              }
            />

          </Col>

          <Col size={1} />


          <Col size={6}>
            <Row style={{ paddingTop: 15 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.identifiant')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.intervenant?.intervenant.numeroDocumentIndentite}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant, intervenant: {
                    ...this.state.intervenant?.intervenant, numeroDocumentIndentite: text
                  }
                }
              })}
            />
          </Col>

        </Row>

        {/*third Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={7}>
            <Row style={{ paddingTop: 15 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.nomIntervenant')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={10}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.intervenant?.intervenant.nomIntervenant}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant, intervenant: {
                    ...this.state.intervenant?.intervenant, nomIntervenant: text
                  }
                }
              })}
            />
          </Col>
          <Col size={1} />
          <Col size={6}>
            <Row>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.prenomIntervenant')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.intervenant?.intervenant.prenomIntervenant}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant, intervenant: {
                    ...this.state.intervenant?.intervenant, prenomIntervenant: text
                  }
                }
              })}
            />
          </Col>
        </Row>
        {/*fourth Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={7}>
            <Row style={{ paddingTop: 35 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.nationalite')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={10}>
            <ComBadrAutoCompleteChipsComp
              disabled={this.props.readOnly}
              code="code"
              placeholder={translate(
                'actifsCreation.embarcations.intervenants.nationalite'
              )}
              selected={this.state.intervenant?.intervenant.nationaliteFr}
              maxItems={3}
              libelle="libelle"
              command="getCmbPays"
              paramName="libellePays"
              onDemand={true}
              searchZoneFirst={false}
              onValueChange={this.handlePaysChanged}
            />
          </Col>
          <Col size={1} />
          <Col size={6}>
            <Row style={{ paddingTop: 35 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.profession')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.intervenant?.professionIntervenant}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant,
                  professionIntervenant: text
                }
              })}
            />
          </Col>
        </Row>

        {/*fifth Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={6}>
            <Row>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.adresse')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={20}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              multiline={true}
              numberOfLines={4}
              style={{ fontSize: 12 }}
              value={this.state.intervenant?.intervenant.adresse}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant, intervenant: {
                    ...this.state.intervenant?.intervenant, adresse: text
                  }
                }
              })}
            />
          </Col>

        </Row>

      </Grid>
    </ComBadrCardBoxComp>);
  }


  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps--------------------props ', props);
    console.log('getDerivedStateFromProps--------------------state ', state);

    if (
      props.intervenant && props.index != state.index
    ) {
      return {
        intervenant: props.intervenant,// update the value of specific key
        index: props.index,
        isPassager: (props.intervenant.passager)?'true':'false'

      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  choisirPersonneConcernee = function (isPassager) {
    if (isPassager === "true") {
      this.setState({
        cocherPassager: true,
        intervenant: {
          ...this.state.intervenant, passager: true, equipage: false

        }
      })
    } else {
      this.setState({
        cocherPassager: false,
        intervenant: {
          ...this.state.intervenant, passager: false, equipage: true

        }
      })
    }
  }

  render() {
    return (
      <ComBadrModalComp
        visible={this.props.visible}
        onDismiss={this.props.onDismiss}
        icon={'window-close'}
        picker={true}
        onPress={this.props.onDismiss}
        onValueChange={(selectedValue, selectedIndex, item) => {
          // console.log("item", item)
        }}
      >
        {this.state.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.state.errorMessage} />
        )}
        <View style={CustomStyleSheet.whiteRow}>
          <Text>{translate('actifsCreation.embarcations.intervenants.title')}</Text>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col>
              <RadioButton.Group onValueChange={newValue => { this.setState({ isPassager: newValue }); this.choisirPersonneConcernee(newValue); }} value={this.state.isPassager}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{translate('actifsCreation.embarcations.intervenants.passager')}</Text>
                    <RadioButton value="true" color={primaryColor} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{translate('actifsCreation.embarcations.intervenants.equipage')}</Text>
                    <RadioButton value="false" color={primaryColor} />
                  </View>
                </View>
              </RadioButton.Group>
            </Col>
          </Row>

          {this.getPersonneForm()}

          <Row style={CustomStyleSheet.whiteRow}>
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => (this.confirmerIntervenant())}
              text={translate('transverse.confirmer')}
            />
            <View style={{ width: 10 }} />
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.retablirIntervenant()
              }}
              text={translate('transverse.retablir')}
            />
            <View style={{ width: 10 }} />
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.props.onDismiss()
              }}
              text={translate('transverse.quitter')}
            />
          </Row>

        </View>

      </ComBadrModalComp>
    );
  }
}
