import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { RadioButton,IconButton, Text, TextInput } from 'react-native-paper';
import moment from 'moment';
import {
  ComBadrButtonComp,
  ComBadrCardBoxComp,
  ComBadrCardWithTileComp,
  ComBadrLibelleComp,
  ComBadrModalComp
} from '../../../../../commons/component';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../../commons/styles/ComThemeStyle';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

export default class ModalConfirmationReception extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifiant: this.props.identifiant,
      index: this.props.index,
      showDateReception: false,
      showHeureReception: false,
      heureReceptionTech: new Date(),
      heureReception: moment(new Date()).format('HH:mm').toString(),
      dateReceptionTech: new Date(),
      dateReception: moment(new Date()).format('DD/MM/YYYY'),
      transitCertifRecep: { identifiantDum: this.props.identifiant,dateReception: moment(new Date()).format('DD/MM/YYYY HH:mm').toString(), integrite: '', observations:'', numBulletin:'' },
      isIntegrite:null,


    };

  }

  onDateReceptionChange = (event, selectedDate) => {
    console.log(event);
    console.log('test ===============> ', event);
    console.log(selectedDate);
    console.log('test ===============> ', selectedDate);
    this.setState({


      dateReceptionTech: event.nativeEvent.timestamp,
      dateReception: moment(selectedDate).format('DD/MM/YYYY').toString()
      , showDateReception: false


    });
    this.state.dateReception = moment(selectedDate).format('DD/MM/YYYY').toString();


    this.state.transitCertifRecep = {
      ...this.state.transitCertifRecep,
      dateReception: this.state.dateReception + ' ' + this.state.heureReception
    }
    this.props.update(this.state.transitCertifRecep);
  }
  onHeureReceptionChange = (event, selectedHeure) => {
    console.log(event);
    console.log('test ===============> ', event);
    console.log(selectedHeure);
    console.log('test ===============> ', selectedHeure);
    this.setState({

      heureReception: moment(selectedHeure).format('HH:mm').toString()
      , showHeureReception: false, heureReceptionTech: event.nativeEvent.timestamp


    });
    this.state.transitCertifRecep = {
      ...this.state.transitCertifRecep,
      dateReception: this.state.dateReception + ' ' + this.state.heureReception
    }
    this.props.update(this.state.transitCertifRecep);
  }

  choisirIntegrite = function (isIntegrite) {
    if (isIntegrite === "true") {
      this.setState({
        intervenant: {
          ...this.state.transitCertifRecep, integrite: true

        }
      });
      this.state.transitCertifRecep.integrite = true;
    } else {
      this.setState({
        intervenant: {
          ...this.state.transitCertifRecep, integrite: false

        }
      });
      this.state.transitCertifRecep.integrite = false;
    }
    this.props.update(this.state.transitCertifRecep);
  }

  onChangeObservations = (text) => {
    this.setState({
      ...this.state,
      transitCertifRecep: {
        ...this.state.transitCertifRecep,
        observations: text,
      },
    })
    this.state.transitCertifRecep.observations = text;
  
    this.props.update(this.state.transitCertifRecep);
  }


  onChangeNumBulletin = (text) => {
    this.setState({
      ...this.state,
      transitCertifRecep: {
        ...this.state.transitCertifRecep,
        numBulletin: text,
      },
    })
    this.state.transitCertifRecep.numBulletin = text;

    this.props.update(this.state.transitCertifRecep);
  }


  confirmer = () => {
    this.props.update(this.state.transitCertifRecep);
    this.props.confirmer();
    
  }
  static getDerivedStateFromProps(props, state) {
    console.log('props.identifiant ', props.identifiant);
    console.log('state.identifiant ', state.identifiant);
    console.log('props.index ', props.index);
    console.log('state.index ', state.index);

    if (
      
      props.identifiant !== state.identifiant || props.index !== state.index
    ) {
      return {
        index: props.index,
        identifiant: props.identifiant,
        showDateReception: false,
        showHeureReception: false,
        heureReceptionTech: new Date(),
        heureReception: moment(new Date()).format('HH:mm').toString(),
        dateReceptionTech: new Date(),
        dateReception: moment(new Date()).format('DD/MM/YYYY'),
        transitCertifRecep: { identifiantDum: props.identifiant,dateReception: moment(new Date()).format('DD/MM/YYYY HH:mm').toString(), integrite: '', observations: '', numBulletin: '' },
        isIntegrite: null, // update the value of specific key
      };
    }
    // Return null to indicate no change to state.
    return null;
  }
  

  render() {
    return (
      <ComBadrModalComp
        visible={this.props.visible}
        onDismiss={this.props.onDismiss}
        icon={'window-close'}
        onPress={this.props.onDismiss}>
        <View style={CustomStyleSheet.whiteRow}>
          <Text>{translate('confimationReception.title')}</Text>
          {(!this.props.depotageSansPresenceDouaniere) && (<Row style={CustomStyleSheet.lightBlueRow}>

            <Col size={4}>
              <ComBadrLibelleComp withColor={true}>
                {translate('confimationReception.dateHeure')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={6}>
              <TextInput
                mode={'outlined'}
                disabled={true}
                style={{ height: 20, fontSize: 12 }}
                value={this.state.dateReception}
                multiline={true}
                numberOfLines={1}
              />
              {this.state.showDateReception && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.dateReceptionTech}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={this.onDateReceptionChange}
                />
              )}
            </Col>
            <Col size={2}>
              {!this.props.readOnly && (<IconButton
                icon="calendar"
                onPress={() => {
                  this.setState({ showDateReception: true });

                }}
              />)}
            </Col>

            <Col size={4}>
              <TextInput
                mode={'outlined'}
                disabled={this.props.readOnly}
                style={{ height: 20, fontSize: 12, padding: 15 }}
                value={this.state.heureReception}
                onFocus={() => {
                  this.setState({ showHeureReception: true });
                }}
                multiline={false}
                numberOfLines={1}
                onChangeText={(text) => {
                  this.setState({
                    heureReception: text,
                  });
                  this.state.heureReception = text;
                  this.props.update(this.state.transitCertifRecep);
                }}
              />
              {this.state.showHeureReception && (
                <DateTimePicker
                  style={{ width: '100%' }}
                  value={this.state.heureReceptionTech}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={this.onHeureReceptionChange}
                />
              )}
            </Col>
          </Row>)}
          {(!this.props.depotageSansPresenceDouaniere) && <Row style={CustomStyleSheet.lightBlueRow}>

            <Col size={4}>
              <ComBadrLibelleComp withColor={true}>
                {translate('confimationReception.agent')}
              </ComBadrLibelleComp>
            </Col>
            <Col>
              <Text
                style={{ height: 20, fontSize: 12 }}
                value={ComSessionService.getInstance().getLogin()}
              />

            </Col>

          </Row>}
          <Row>
            <ComBadrCardBoxComp style={styles.cardBox}>
              <ComBadrCardWithTileComp
                title={(!this.props.depotageSansPresenceDouaniere)?translate('confimationReception.modalTitle'):''}>
                <View>
                  {(!this.props.depotageSansPresenceDouaniere) && <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <RadioButton.Group onValueChange={newValue => { this.setState({ isIntegrite: newValue }); this.choisirIntegrite(newValue); }} value={this.state.isIntegrite}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>{translate('confimationReception.avec')}</Text>
                            <RadioButton value="true" color={primaryColor} />
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>{translate('confimationReception.sans')}</Text>
                            <RadioButton value="false" color={primaryColor} />
                          </View>
                        </View>
                      </RadioButton.Group>
                    </Col>
                  </Row>}
                  <Row style={CustomStyleSheet.lightBlueRow}>

                    <Col size={1}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('confimationReception.observation')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={3}>
                      <TextInput
                        multiline={true}
                        numberOfLines={4}
                        underlineColor={primaryColor}
                        mode="outlined"
                        value={this.state.transitCertifRecep.observations}
                        label={translate('confimationReception.observation')}
                        onChangeText={(text) => this.onChangeObservations(text)}
                      />

                    </Col>

                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>

                    <Col size={1}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('confimationReception.numBulletinReception')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={3}>
                      <TextInput
                        underlineColor={primaryColor}
                        mode="outlined"
                        value={this.state.transitCertifRecep.numBulletin}
                        label={translate('confimationReception.numBulletinReception')}
                        onChangeText={(text) => this.onChangeNumBulletin(text)}
                      />

                    </Col>

                  </Row>
                </View>
              </ComBadrCardWithTileComp>
            </ComBadrCardBoxComp>
          </Row>
         
          <Row
            style={[
              CustomStyleSheet.whiteRow,
              { justifyContent: 'space-between' },
            ]}>
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={()=>this.confirmer()}
              text={translate('transverse.confirmer')}
            />
            <View style={{ width: 10 }} />
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.props.retablir()
              }}
              text={translate('transverse.retablir')}
            />
          </Row>
        </View>
      </ComBadrModalComp>
    );
  }
}
const styles = StyleSheet.create({
  cardBox: {
    flexDirection: 'column',
    width: '100%',
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
  },
});
