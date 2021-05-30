import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';
import { RadioButton, HelperText, TextInput } from 'react-native-paper';
import {
  ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp, ComBadrLibelleComp
} from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import style from '../../style/autoriserAcheminementMainStyle';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class EceAutoriserAcheminementBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vo: this.props.vo,
      operateur: {
        libelle: '',
        code: ''
      }, reference: '',
      showMsgScelle: false,
      msgScelle: '',
      dateAcheminement: this.props.vo.dateHeureAcheminement.substring(0, 10),
      heureAcheminement: this.props.vo.dateHeureAcheminement.substring(11, 16),
      showDateAcheminement: false,
      showHeureAcheminement: false,
      dateAcheminementTech: new Date(),
      heureAcheminementTech: new Date(),
      infoEcorScelle: (this.props.vo.infoEcorScelle)?"true":"false",
      referenceEnregistrement:this.props.referenceEnregistrement





    }
  }
  onDateAutoriserAcheminementChange = (event, selectedDate) => {
    if (selectedDate) {
      console.log(selectedDate);
      console.log(event.nativeEvent.timestamp);
      this.setState({

        dateAcheminement: moment(selectedDate).format('DD/MM/YYYY').toString(),
        showDateAcheminement: false,
        dateAcheminementTech: event.nativeEvent.timestamp


      });
      this.props.updateDate(moment(selectedDate).format('DD/MM/YYYY').toString());
    }
  }
  onHeureAutoriserAcheminementChange = (event, selectedHeure) => {
    if (selectedHeure) {
      this.setState({
        heureAcheminement: moment(selectedHeure).format('HH:mm').toString(),
        showHeureAcheminement: false,
        heureAcheminementTech: event.nativeEvent.timestamp



      });
      this.props.updateHeure(moment(selectedHeure).format('HH:mm').toString());
    }

  }

  choisirNouveauScelles = function (isNouveauScelle) {
    console.log("isNouveauScelle :", isNouveauScelle);
    console.log("isNouveauScelle :", (isNouveauScelle === "false"));
    if (isNouveauScelle === "true") {
      console.log("isNouveauScelle : 1");
      this.setState({
        infoEcorScelle: "true",
        vo: {
          ...this.state.vo, infoEcorScelle: true

        }
      })
      this.props.vo.infoEcorScelle = true;
    } else {
      console.log("isNouveauScelle : 2");
      this.setState({
        infoEcorScelle: "false",
        operateur: {
          libelle: '',
          code: ''
        },
        vo: {
          ...this.state.vo, infoEcorScelle: false, numeroPince: '', nombreScelle: '', transporteurExploitantMEADAutoAchemin: '', reference:''

        }
      });
      this.props.vo.infoEcorScelle = false;
      this.props.scellesList.splice(0, this.props.scellesList.length);
      this.props.vo.numeroPince = '';
      this.props.vo.nombreScelle = '';
      this.props.vo.transporteurExploitantMEADAutoAchemin = '';
    }
  } 




  addScelle = () => {
    if (
      this.state.reference.length != 8
    ) {
      this.props.setError('La scellé doit être sur 8 caractères');
      this.setState({
        showMsgScelle: true,
        msgScelle: 'La scellé doit être sur 8 caractères'
      });
      return;
    }
    if (this.state.reference && this.state.reference.length === 8 && !this.containsScelle(this.state.reference)) {
      this.props.scellesList.push(this.state.reference);
      console.log(this.props.scellesList);
      this.resetScelle();
    }
    this.props.setError(null);
    this.setState({
      showMsgScelle: false,
      msgScelle: ''
    });
  };

  removeScelle = () => {
    console.log('removeScelle', this.state.selectedScelle);
    if (this.state.selectedScelle) {
      for (var i = 0; i < this.props.scellesList.length; i++) {
        if (this.props.scellesList[i] === this.state.selectedScelle) {
          this.props.scellesList.splice(i, 1);
          i--;
        }
      }

      this.setState({
        ...this.state,
        selectedScelle: {},
      });
    }
    this.setState({
      showMsgScelle: false,
      msgScelle: ''
    });
  };

  resetScelle = () => {
    if (this.scelleInput) {
      this.scelleInput.clear();
    }
    
  };

  containsScelle = (reference) => {
    for (var i = 0; i < this.props.scellesList.length; i++) {
      if (this.props.scellesList[i] === reference) {
        return true;
      }
    }
    return false;
  };
  renderBoxItem = ({ item }) => {
    const itemStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItem
        : style.boxItem;
    const itemTextStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItemText
        : style.boxItemText;

    return (
      <View style={itemStyle}>
        <TouchableOpacity
          disabled={this.props.readOnly}
          onPress={() =>
            this.setState({
              ...this.state,
              selectedScelle: item,
            })
          }>
          <Text style={itemTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  generateScelles = () => {
    if (
      this.state.generateurDu.length != 8 ||
      this.state.generateurAu.length != 8
    ) {
      this.props.setError('La scellé doit être sur 8 caractères');
      this.setState({
        showMsgScelle: true,
        msgScelle: 'La scellé doit être sur 8 caractères'
      });
      return;
    }
    if (

      this.state.generateurDu > this.state.generateurAu
    ) {
      this.props.setError('La veleur de départ est supérieure à la valeur d\'arrivée');
      this.setState({
        showMsgScelle: true,
        msgScelle: 'La veleur de départ est supérieure à la valeur d\'arrivée'
      });
      return;

    }
    if (
      this.state.generateurDu.length === 8 &&
      this.state.generateurAu.length === 8 &&
      this.state.generateurDu <= this.state.generateurAu
    ) {
      for (
        let scelle = this.state.generateurDu;
        scelle <= this.state.generateurAu;
        scelle++
      ) {
        if (!this.containsScelle(scelle.toString())) {
          this.props.scellesList.push(scelle.toString());
          console.log(this.props.scellesList);
          this.resetScelle();
        }

      }


      this.props.setError(null);
      this.setState({
        ...this.state, generateurDu: '', generateurAu: '', showMsgScelle: false,
        msgScelle: ''
      });
    }
  };

  handleOperateurChanged = (operateur) => {
    console.log('operateur', operateur)
    this.setState({
      operateur: operateur,
      vo: { ...this.state.vo, transporteurExploitantMEADAutoAchemin: operateur.code },
      showMsgScelle: false,
      msgScelle: ''
    });
    this.props.vo.transporteurExploitantMEADAutoAchemin = operateur.code;

  };

  static getDerivedStateFromProps(props, state) {
    console.log('props', props);
    console.log('state', state);
    if (
      props.referenceEnregistrement!==state.referenceEnregistrement
    ) {
      return {
        vo: props.vo,
        operateur: {
          libelle: '',
          code: ''
        }, reference: '',
        showMsgScelle: false,
        msgScelle: '',
        dateAcheminement: props.vo.dateHeureAcheminement.substring(0, 10),
        heureAcheminement: props.vo.dateHeureAcheminement.substring(11, 16),
        showDateAcheminement: false,
        showHeureAcheminement: false,
        dateAcheminementTech: new Date(),
        heureAcheminementTech: new Date(),
        infoEcorScelle: (props.vo.infoEcorScelle)?"true": "false",
        referenceEnregistrement: props.referenceEnregistrement
      };
    }
     if (
      _.isEmpty(props.vo.nombreScelle) && !_.isEmpty(state.vo.nombreScelle) &&
      _.isEmpty(props.vo.numeroPince) && !_.isEmpty(state.vo.numeroPince)
    ) {
      return {
        vo: {
          ...props.vo,
          numeroPince: ""
        },
        operateur: {
          libelle: '',
          code: ''
        }, reference: '',
        showMsgScelle: false,
        msgScelle: '',
      };
    } 
    // Return null to indicate no change to state.
    return null;
  }

  render() {
    return (
      <View>
        <ComBadrCardBoxComp noPadding={true}>
          {/* Accordion Déclaration en Détail*/}
          <ComAccordionComp
            title={translate('autoriserAcheminemenMainScreen.autorisationAcheminement.title')}
            expanded={true}>
            <View>

              <Grid>
                { /*first Row*/}
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.autorisationAcheminement.dateHeureAcheminement')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <TextInput
                      mode={'outlined'}
                      style={{ height: 20, fontSize: 12 }}
                      value={this.state.dateAcheminement}
                      multiline={true}
                      numberOfLines={1}
                      onFocus={() => {
                        this.setState({ showDateAcheminement: true });
                      }}
                      onChangeText={(text) => {
                        this.setState({
                          dateAcheminement: text
                        });
                        this.props.updateDate(text);
                      }}
                    />
                    {this.state.showDateAcheminement && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.dateAcheminementTech}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={this.onDateAutoriserAcheminementChange}
                      />
                    )}
                  </Col>


                  <Col>
                    <TextInput
                      mode={'outlined'}
                      style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                      value={this.state.heureAcheminement}
                      onFocus={() => {
                        this.setState({ showHeureAcheminement: true });
                      }}
                      multiline={false}
                      numberOfLines={1}
                      onChangeText={(text) => {
                        this.setState({
                          heureAcheminement: text
                        });
                        this.props.updateHeure(text);
                      }}
                    />
                    {this.state.showHeureAcheminement && (
                      <DateTimePicker
                        style={{ width: '100%' }}
                        value={this.state.heureAcheminementTech}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={this.onHeureAutoriserAcheminementChange}
                      />
                    )}
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.autorisationAcheminement.agentDouanier')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.props.vo?.refAgentAutorisationAcheminement?.nom}{' '}
                      {this.props.vo?.refAgentAutorisationAcheminement?.prenom}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
              </Grid>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={2}>
                    <RadioButton.Group  onValueChange={newValue =>  this.choisirNouveauScelles(newValue)} value={this.state.infoEcorScelle}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text>{translate('autoriserAcheminemenMainScreen.autorisationAcheminement.oui')}</Text>
                          <RadioButton value="true" color={primaryColor} disabled={this.props.readOnly || this.props.success}/>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text>{translate('autoriserAcheminemenMainScreen.autorisationAcheminement.non')}</Text>
                          <RadioButton value="false" color={primaryColor} disabled={this.props.readOnly || this.props.success}/>
                        </View>
                      </View>
                    </RadioButton.Group>
                  </Col>

                </Row>
              </Grid>
            </View>
            {(this.props.vo.infoEcorScelle) && (<View><Grid><Row size={100} style={CustomStyleSheet.whiteRow}>
              <Col size={30} style={style.labelContainer}>
                <ComBadrLibelleComp withColor={true}>
                  {translate(
                    'autoriserAcheminemenMainScreen.autorisationAcheminement.numeroPince',
                  )}
                </ComBadrLibelleComp>
              </Col>

              <Col size={70}>
                <TextInput
                  mode="outlined"
                  label={translate(
                    'autoriserAcheminemenMainScreen.autorisationAcheminement.numeroPince',
                  )}
                  value={
                    this.state.vo
                      .numeroPince
                  }
                  keyboardType={'number-pad'}
                  maxLength={8}
                  onChangeText={(text) => {
                    text = text.replace(/[^0-9.]/g, '');
                    this.setState({

                      vo: {
                        ...this.state.vo,
                        numeroPince: text,
                      },

                    });
                    this.props.vo.numeroPince = text;
                  }}
                  disabled={this.props.readOnly || this.props.success }
                />
              </Col>
            </Row>

              <Row size={100} style={CustomStyleSheet.lightBlueRow}>
                <Col size={30} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.nombreScelles',
                    )}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={70}>
                  <TextInput
                    mode="outlined"
                    label={translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.nombreScelles',
                    )}
                    value={
                      this.state.vo
                        .nombreScelle
                    }
                    keyboardType={'number-pad'}
                    maxLength={8}
                    onChangeText={(text) => {
                      text = text.replace(/[^0-9.]/g, '');
                      this.setState({
                        vo: {
                          ...this.state.vo,
                          nombreScelle: text,
                        },
                      });
                      this.props.vo.nombreScelle = text;
                    }}
                    disabled={this.props.readOnly || this.props.success }
                  />
                </Col>
              </Row>
              <Row size={100} style={style.topMarginStyle}>
                <Col size={100} style={style.labelContainer}>

                  <HelperText
                    type="error"
                    padding="none"
                    visible={this.state.showMsgScelle}>
                    {this.state.msgScelle}
                  </HelperText>
                </Col>
              </Row>

              <Row size={100} style={CustomStyleSheet.whiteRow}>
                <Col size={30} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.generateurScelle',
                    )}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={5} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.du',
                    )}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={20}>
                  <TextInput
                    mode="outlined"
                    label={translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.du',
                    )}
                    value={this.state.generateurDu}
                    keyboardType={'number-pad'}
                    maxLength={8}
                    onChangeText={(text) => {
                      text = text.replace(/[^0-9.]/g, '');
                      this.setState({
                        ...this.state,
                        generateurDu: text,
                      });
                    }}
                    disabled={this.props.readOnly || this.props.success }
                  />
                </Col>

                <Col size={5} />

                <Col size={5} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.au',
                    )}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={20}>
                  <TextInput
                    mode="outlined"
                    label={translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.au',
                    )}
                    value={this.state.generateurAu}
                    keyboardType={'number-pad'}
                    maxLength={8}
                    onChangeText={(text) => {
                      text = text.replace(/[^0-9.]/g, '');
                      this.setState({
                        ...this.state,
                        generateurAu: text,
                      });
                    }}
                    disabled={this.props.readOnly || this.props.success }
                  />
                </Col>

                <Col size={5} />

                <Col size={10}>
                  <Button
                    title={translate('transverse.Ok')}
                    type={'solid'}
                    disabled={this.props.readOnly || this.props.success }
                    buttonStyle={style.buttonAction}
                    onPress={() => this.generateScelles()}
                  />
                </Col>
              </Row>

              <Row size={100} style={CustomStyleSheet.lightBlueRow}>
                <Col size={30} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.numeroScelle',
                    )}
                  </ComBadrLibelleComp>

                </Col>

                <Col size={20} style={style.labelContainer}>
                  <TextInput
                    ref={(ref) => (this.scelleInput = ref)}
                    key="scelleInput"
                    mode="outlined"
                    value={this.state.reference}
                    keyboardType={'number-pad'}
                    maxLength={8}
                    onChangeText={(text) => {
                      text = text.replace(/[^0-9.]/g, '');
                      this.setState({

                        reference: text,
                      });
                    }}
                    disabled={this.props.readOnly || this.props.success }
                  />
                </Col>

                <Col size={5} />

                <Col size={10} style={style.labelContainer}>
                  <TouchableOpacity
                    style={style.touchableArrow}
                    disabled={this.props.readOnly || this.props.success }>
                    <Button
                      type={'outline'}
                      icon={{
                        name: 'chevron-right',
                        size: 12,
                        color: 'black',
                      }}
                      onPress={() => this.addScelle()}
                      disabled={this.props.readOnly || this.props.success }
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={style.touchableArrow}
                    disabled={this.props.readOnly || this.props.success }>
                    <Button
                      type={'outline'}
                      icon={{
                        name: 'chevron-left',
                        size: 12,
                        color: 'black',
                      }}
                      onPress={() => this.removeScelle()}
                      disabled={this.props.readOnly || this.props.success }
                    />
                  </TouchableOpacity>
                </Col>

                <Col size={5} />

                <Col size={40} style={style.boxContainer}>
                  {console.log(this.props.scellesList)}
                  <SafeAreaView style={style.boxSafeArea}>
                    {(this.props.scellesList == null ||

                      _.isEmpty(this.props.scellesList)) && (
                        <Text style={style.boxItemText}>
                          Aucun élément
                        </Text>
                      )}

                    {this.state.vo
                      .scelles != null &&
                      this.props.scellesList
                        .size !== 0 && (
                        <FlatList
                          data={Object.values(
                            this.props.scellesList,
                          )}
                          renderItem={(item) =>
                            this.renderBoxItem(item)
                          }
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                          disabled={this.props.readOnly || this.props.success }
                        />
                      )}
                  </SafeAreaView>
                </Col>
              </Row>
              <Row size={100} style={CustomStyleSheet.whiteRow}>
                <Col size={30} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.nombreScellesSaisies',
                    )}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={70}>
                  <Text

                  >
                    {this.props.scellesList.length}


                  </Text>
                </Col>
              </Row>
              <Row size={100} style={CustomStyleSheet.lightBlueRow}>
                <Col size={30} style={style.labelContainer}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.transporteurExploitantMEAD',
                    )}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={70}>
                  {(!this.props.readOnly) && <ComBadrAutoCompleteChipsComp
                    placeholder={translate(
                      'autoriserAcheminemenMainScreen.autorisationAcheminement.choisirValeur'
                    )}
                    code="code"
                    disabled={this.props.success}
                    selected={this.state.operateur?.libelle}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbOperateur"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handleOperateurChanged}
                  />}
                  {(this.props.readOnly) && <TextInput
                    value={this.props.transporteurExploitantMEADAutoAchemin?.libelle }
                    disabled={true}
                  />}
                </Col>
              </Row>
            </Grid>
            </View>)}
          </ComAccordionComp>
        </ComBadrCardBoxComp>
      </View>
    );
  }
}
