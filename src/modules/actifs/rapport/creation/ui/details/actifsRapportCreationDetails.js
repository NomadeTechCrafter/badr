import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
  Checkbox,
  RadioButton,
  TextInput, Text
} from 'react-native-paper';
import { connect } from 'react-redux';
import {
  ComBadrCardBoxComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,

  ComBadrLibelleComp,

  ComBadrPickerCheckerComp, ComBadrPickerComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
/**i18n */
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { save } from '../../../../../../commons/services/async-storage/ComStorageService';
import {
  CustomStyleSheet,
  primaryColor
} from '../../../../../../commons/styles/ComThemeStyle';


const screenHeight = Dimensions.get('window').height;


class AtifsRapportCreationDetailsTab extends Component {
  constructor(props) {
    super(props);
    //console.log('props entete')
    //console.log(props)
    this.state = {
      command: null,
      selectedvalue: '',
      natureIncident:null,
      show: false,
    };
    console.log('consultation_________details', this.props.consultation);
  }

  componentDidMount() { }

  handleOnIncidentItemsChanged = (items) => {
    this.setState({ selectedItems: items }, console.log('handleOnIncidentItemsChanged items',items));
  };
  handleOnConfirmIncidentType = (items) => {
    console.log('handleOnConfirmIncidentType items', items);
    this.setState({ typeIncident: items }, () => this.updateModele());
  };


  updateModele() {
    return this.props.update({
      description: this.state.descriptionRapport,
      typeIncident: this.state.typeIncident,
      autreIncident: this.state.autreIncident
    });
  }
  render() {

    let typesIncidents = '';
    console.log('typesIncidents----------------------------------------------------------this.props.row : ', this.props.rows);
    if (this.props.rows && this.props.rows?.typesIncidentSelect) {
      let typesIncidentSelect = this.props.rows?.typesIncidentSelect;
      for (
        var i = 0;
        i < typesIncidentSelect.length;
        i++
      ) {
        if (i < typesIncidentSelect.length - 1) {
          typesIncidents +=
            typesIncidentSelect[i].libelle + "\n";
        } else {
          typesIncidents +=
            typesIncidentSelect[i].libelle;
        }
      }
    }
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComContainerComp>
          {this.props.showProgress && (
            <ComBadrProgressBarComp width={screenHeight} />
          )}
          {this.props.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
          {this.props.successMessage != null && (
            <ComBadrInfoMessageComp message={this.props.successMessage} />
          )}
          {/* Référence déclaration */}
          {!this.props.consultation && (
            <ComBadrCardBoxComp noPadding={true}>
              <Grid>
                {/*first row */}

                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={4}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('actifsCreation.detail.natureIncidents')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={8}>

                    <ComBadrCardBoxComp>
                      <ComBadrPickerComp
                        onRef={(ref) => (this.code = ref)}
                        key="code"
                        titleStyle={CustomStyleSheet.badrPickerTitle}
                        style={{ flex: 1 }}
                        title={translate('actifsCreation.detail.natureIncidents')}
                        cle="code"
                        libelle="libelle"
                        module="GIB"
                        command="getNaturesIncident"
                        onValueChange={(selectedValue, selectedIndex, item) => {
                          this.setState({ natureIncident: selectedValue });
                          this.refTypesIncidents.refresh(selectedValue);
                        }}
                        param={'this.state.value'}
                        typeService="SP"
                        storeWithKey="code"
                        storeLibelleWithKey="code"
                      />
                    </ComBadrCardBoxComp>


                  </Col>
                </Row>

                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={4}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('actifsCreation.detail.typesIncidents')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={8} style={{ paddingRight: 5 }}>
                    <Row>
                      <Col size={10}>
                        <ComBadrCardBoxComp>
                          <ComBadrPickerCheckerComp
                            onRef={(ref) => (this.refTypesIncidents = ref)}
                            key={'code'}
                            title={translate('actifsCreation.detail.typesIncidents')}
                            titleStyle={CustomStyleSheet.badrPickerTitle}
                            style={{ flex: 1 }}
                            cle="code"
                            libelle="libelle"
                            module="GIB"
                            command={'getTypesIncident'}
                            onValueChange={(selectedValue, selectedIndex) => {
                              console.log("selectedValue", selectedValue);
                              this.setState({ typeIncident: selectedValue },()=>this.updateModele());
                            }}
                            param={this.state.natureIncident}
                            typeService="SP"
                            onConfirm={this.handleOnConfirmIncidentType}
                            onSelectedItemObjectsChange={
                              this.handleOnIncidentItemsChanged
                            }
                          />
                        </ComBadrCardBoxComp>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={4}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('actifsCreation.detail.autresIncidents')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={8} style={{ paddingRight: 5 }}>
                    <TextInput
                      mode={'outlined'}
                      style={[
                        styles.textInputStyle,
                        { backgroundColor: '#f7f7fa' },
                      ]}
                      disabled={this.props.consultation}
                      value={this.state.autreIncident}
                      multiline={false}
                      numberOfLines={1}
                      onChangeText={(text) =>this.setState({ autreIncident: text },  () => this.updateModele())}
                    />
                  </Col>
                </Row>

                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }} withColor={true}>
                        {translate('actifsCreation.detail.descriptionRapport')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <TextInput
                      mode={'outlined'}
                      textAlignVertical={'top'}
                      style={[
                        styles.multilineInputStyle,
                        { backgroundColor: '#f7f7fa' },
                      ]}
                      disabled={this.props.consultation}
                      value={this.state.descriptionRapport}
                      multiline
                      numberOfLines={20}
                      onChangeText={(text) => this.setState({ descriptionRapport: text }, () =>this.updateModele())
                        
                      }
                    />
                  </Col>
                </Row>
              </Grid>
            </ComBadrCardBoxComp>)}
          {(this.props.consultation) && (
            <ComBadrCardBoxComp noPadding={true}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.osAvecSaisies')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <View style={styles.ComContainerCompCheckbox}>
                      <View pointerEvents="none">
                        <Checkbox
                          color={primaryColor}
                          disabled={true}
                          status={
                            this.props.rows?.osAvecSaisie
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </View>
                    </View>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.osAvecIncidents')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <View style={styles.ComContainerCompCheckbox}>
                      <View pointerEvents="none">
                        <Checkbox
                          color={primaryColor}
                          disabled={true}
                          status={
                            this.props.rows?.osAvecIncident
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </View>
                    </View>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.typesIncidents')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa'
                      }
                      }
                      disabled={true}
                      value={this.props.typesIncidents}
                      multiline={true}
                      numberOfLines={4}

                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.autresIncidents')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa'
                      }
                      }
                      disabled={true}
                      value={this.props.rows?.autreIncidents}
                      multiline={true}
                      numberOfLines={4}

                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.coiffeInitiePar')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <RadioButton.Group disabled={true} value={this.props.rows.coiffeInitiePar}>
                      <View style={{ justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text>{translate('actifsCreation.detail.officierControle')}</Text>
                          <RadioButton value="OFFICIER_CONTROLE" color={primaryColor} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text>{translate('actifsCreation.detail.chefSubdivision')}</Text>
                          <RadioButton value="CHEF_SUBDIVISION" color={primaryColor} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text>{translate('actifsCreation.detail.chefServiceCoordination')}</Text>
                          <RadioButton value="CHEF_SERVICE_COORDINATION" color={primaryColor} />
                        </View>
                      </View>
                    </RadioButton.Group>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.nomPrenom')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa'
                      }
                      }
                      disabled={true}
                      value={''}
                      multiline={false}

                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.du')}
                        
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={1.2}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa',
                        paddingRight: 2
                      }
                      }
                      disabled={true}
                      value={this.props?.rows?.dateDebut.slice(0, 10)}
                      multiline={false}

                    />
                  </Col>
                  <Col size={0.8}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa'
                      }
                      }
                      disabled={true}
                      value={this.props?.rows?.heureDebut}
                      multiline={false}

                    />
                  </Col>
                  <Col size={2}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingLeft: 15 }}>
                        {translate('actifsCreation.detail.au')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={1.2}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa'
                      }
                      }
                      disabled={true}
                      value={this.props?.rows?.dateFin.slice(0,10)}
                      multiline={false}

                    />
                  </Col>
                  <Col size={0.8}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa'
                      }
                      }
                      disabled={true}
                      value={this.props?.rows?.heureFin}
                      multiline={false}

                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.animateurConference')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa'
                      }
                      }
                      disabled={true}
                      value={this.props.rows?.animateur}
                      multiline={true}
                      numberOfLines={4}

                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.qualiteAnimateur')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa'
                      }
                      }
                      disabled={true}
                      value={this.props.rows?.qualiteAnimateur}
                      multiline={true}
                      numberOfLines={4}

                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.themesRetenus')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa'
                      }
                      }
                      disabled={true}
                      value={this.props.rows?.themeConference}
                      multiline={true}
                      numberOfLines={4}

                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.descriptionRapport')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    <TextInput
                      mode={'outlined'}
                      style={{
                        fontSize: 12,
                        backgroundColor: '#f7f7fa'
                      }
                      }
                      disabled={true}
                      value={this.props.rows?.description}
                      multiline={true}
                      numberOfLines={4}

                    />
                  </Col>
                </Row>
              </Grid>
            </ComBadrCardBoxComp>
          )}


        </ComContainerComp>
      </View>
    );
  }

  
}

const libelle = {
  fontSize: 14,
  color: '#006acd',
};

const styles = {
  cardBoxInfoDum: {
    flexDirection: 'column',
  },
  ComBadrCardBoxComp: {
    flexDirection: 'column',
    padding: 0,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  containerActionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ComContainerCompCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  libelleS: {
    ...libelle,
    flex: 1,
  },
  libelleM: {
    ...libelle,
    flex: 2,
  },
  libelleL: {
    ...libelle,
    flex: 3,
  },
  decisionContainerRB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: primaryColor,
    padding: 8,
    width: 300,
  },
  checkboxCol: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  textRadio: {
    color: '#FFF',
  },
  multilineInputStyle: {
    height: 80,
    fontSize: 12,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  textInputStyle: {
    height: 20,
    fontSize: 12,
    backgroundColor: 'white',
  },
  pickerStyle: {
    backgroundColor: '#f1f1f1',
    fontSize: 12,
    height: 30,
  },
};

const mapStateToProps = (state) => ({ ...state.creationReducer });

export default connect(mapStateToProps, null)(AtifsRapportCreationDetailsTab);
