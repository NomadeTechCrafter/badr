import moment from 'moment';
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
  ComBadrAutoCompleteChipsComp,
  ComBadrCardBoxComp,
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,

  ComBadrLibelleComp,

  ComBadrPickerCheckerComp, ComBadrPickerComp, ComBadrProgressBarComp, ComBasicDataTableComp, ComContainerComp
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


    this.colsEdition = [
      {
        code: 'animateurConference',
        libelle: translate('actifsCreation.detail.animateurConference'),
        width: 400,
      },
      {
        code: 'qualiteAnimateur',
        libelle: translate('actifsCreation.detail.qualiteAnimateur'),
        width: 400,
      },
      {
        code: 'isNew',
        libelle: '',
        width: 150,
        component: 'button',
        icon: 'delete-outline',
        action: (row, index) =>
          this.deleteRow(row, index)
      }
    ];
    this.colsConsultation = [
      {
        code: 'animateurConference',
        libelle: translate('actifsCreation.detail.animateurConference'),
        width: 400,
      },
      {
        code: 'qualiteAnimateur',
        libelle: translate('actifsCreation.detail.qualiteAnimateur'),
        width: 400,
      },
    ];

    this.state = {
      osAvecSaisie: false,
      osAvecIncident: false,
      coiffeInitiePar: '',
      refAgentDetachement: null,
      description: '',
      command: null,
      selectedvalue: '',
      natureIncident: null,
      show: false,
    };
  }

  componentDidMount() { }

  handleOnIncidentItemsChanged = (items) => {
    this.setState({ selectedItems: items });
  };
  handleOnConfirmIncidentType = (items) => {
    this.setState({ typeIncident: items }, () => this.updateModele());
  };


  updateModele() {
    // console.log('updateModele ----------------===> : ' + JSON.stringify(this.state));
    return this.props.update({
      osAvecSaisie: this.state.osAvecSaisie,
      osAvecIncident: this.state.osAvecIncident,
      coiffeInitiePar: this.state.coiffeInitiePar,
      refAgentDetachement: this.state.refAgentDetachement,
      description: this.state.description
    });
  }
  render() {

    console.log('props ----------------===> : ' + JSON.stringify(this.props));
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
                    {this.props.consultation && (
                      <Checkbox
                        color={primaryColor}
                        disabled={true}
                        status={
                          this.props.rows?.osAvecSaisie
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    )}
                    {!this.props.consultation && (
                      <Checkbox
                        color={primaryColor}
                        status={
                          this.state?.osAvecSaisie
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          this.setState({
                            ...this.state,
                            osAvecSaisie: !this.state?.osAvecSaisie,
                          },
                          );
                          this.updateModele();
                        }}
                      />
                    )}
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
                    {this.props.consultation && (
                      <Checkbox
                        color={primaryColor}
                        disabled={true}
                        status={
                          this.props.rows?.osAvecIncident
                            ? 'checked'
                            : 'unchecked'
                        }
                      />
                    )}
                    {!this.props.consultation && (
                      <Checkbox
                        color={primaryColor}
                        status={
                          this.state?.osAvecIncident
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          this.setState({
                            ...this.state,
                            osAvecIncident: !this.state?.osAvecIncident,
                          },
                          );
                          this.updateModele();
                        }}
                      />
                    )}
                  </View>
                </Col>
              </Row>

              {(this.props?.rows?.typeService?.classeService === 'E' || this.props?.rows?.ordreService?.typeService?.classeService === 'E') && (
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.coiffeInitiePar')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    {(this.props.consultation &&
                      <RadioButton.Group disabled={true} value={this.props.rows?.coiffeInitiePar}>
                        <View style={{ justifyContent: 'space-around' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="OFFICIER_CONTROLE" color={primaryColor} />
                            <Text>{translate('actifsCreation.detail.officierControle')}</Text>
                            <RadioButton value="CHEF_SUBDIVISION" color={primaryColor} />
                            <Text>{translate('actifsCreation.detail.chefSubdivision')}</Text>
                          </View>
                        </View>
                      </RadioButton.Group>
                    )}
                    {(!this.props.consultation &&
                      <RadioButton.Group
                        onValueChange={(text) => {
                          this.setState(prevState => ({
                            ...prevState.coiffeInitiePar,
                            coiffeInitiePar: text,
                          }))
                          this.updateModele();
                        }
                        }
                        value={this.state?.coiffeInitiePar}>
                        <View style={{ justifyContent: 'space-around' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton value="OFFICIER_CONTROLE" color={primaryColor} />
                            <Text>{translate('actifsCreation.detail.officierControle')}</Text>
                            <RadioButton value="CHEF_SUBDIVISION" color={primaryColor} />
                            <Text>{translate('actifsCreation.detail.chefSubdivision')}</Text>
                          </View>
                        </View>
                      </RadioButton.Group>
                    )}
                  </Col>
                </Row>
              )}

              {(this.props?.rows?.typeService?.classeService === 'E' || this.props?.rows?.ordreService?.typeService?.classeService === 'E') && (
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <Row>
                      <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                        {translate('actifsCreation.detail.nomPrenom')}
                      </ComBadrLibelleComp>
                    </Row>
                  </Col>
                  <Col size={6} style={{ paddingRight: 5 }}>
                    {(this.props.consultation &&
                      <ComBadrAutoCompleteChipsComp
                        code="code"
                        disabled={true}
                        selected={this.props?.rows?.refAgentDetachement?.libelle}
                        maxItems={3}
                        libelle="libelle"
                        command="getCmbPays"
                        paramName="libellePays"
                        onDemand={true}
                        searchZoneFirst={false}
                      />
                    )}
                    {(!this.props.consultation &&
                      <ComBadrAutoCompleteChipsComp
                        code="code"
                        selected={this.state?.refAgentDetachement}
                        maxItems={3}
                        libelle="libelle"
                        command="getCmbPays"
                        paramName="libellePays"
                        onDemand={true}
                        searchZoneFirst={false}
                        onValueChange={(item) => {
                          this.setState(prevState => ({
                            ...prevState.refAgentDetachement,
                            refAgentDetachement: item,
                          }))
                          this.updateModele();
                        }
                        }
                      />
                    )}
                  </Col>
                </Row>
              )}

              {(this.props?.rows?.typeService?.classeService === 'E' || this.props?.rows?.ordreService?.typeService?.classeService === 'E') && (
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <ComBadrLibelleComp style={{ paddingRight: 2 }}>
                      {translate('actifsCreation.detail.du')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={3}>
                    <ComBadrDatePickerComp
                      dateFormat="DD/MM/YYYY"
                      heureFormat="HH:mm"
                      readonly={this.props.consultation}
                      value={this.props.rows?.dateDebut ? moment(this.props.rows?.dateDebut).format("YYYY-MM-DD") : moment(this.props.rows?.ordreService?.dateDebut).format("YYYY-MM-DD")}
                      timeValue={this.props.rows?.heureDebut ? moment(this.props.rows?.heureDebut, 'HH:mm', true) : moment(this.props.rows?.ordreService?.heureDebut, 'HH:mm', true)}
                      onDateChanged={(date) => this.setState(prevState => ({
                        ...prevState,
                        dateDebut: date,
                      }))}
                      onTimeChanged={(time) => this.setState(prevState => ({
                        ...prevState,
                        heureDebut: time,
                      }))}
                    />
                  </Col>

                  <Col size={1}>
                    <ComBadrLibelleComp style={{ paddingLeft: 15 }}>
                      {translate('actifsCreation.detail.au')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={3}>
                    <ComBadrDatePickerComp
                      dateFormat="DD/MM/YYYY"
                      heureFormat="HH:mm"
                      readonly={this.props.consultation}
                      value={this.props.rows?.dateFin ? moment(this.props.rows?.dateFin).format("YYYY-MM-DD") : moment(this.props.rows?.ordreService?.dateFin).format("YYYY-MM-DD")}
                      timeValue={this.props.rows?.heureFin ? moment(this.props.rows?.heureFin, 'HH:mm', true) : moment(this.props.rows?.ordreService?.heureFin, 'HH:mm', true)}
                      onDateChanged={(date) => this.setState(prevState => ({
                        ...prevState,
                        dateFin: date,
                      }))}
                      onTimeChanged={(time) => this.setState(prevState => ({
                        ...prevState,
                        heureFin: time,
                      }))}
                    />
                  </Col>
                </Row>
              )}

              {/* {(this.props?.rows?.ordreService?.conference || this.props?.rows?.conference ) && ( */}
              <Row style={CustomStyleSheet.whiteRow}>
                <Col>
                  <ComBasicDataTableComp
                    id="animateursTable"
                    rows={this.props.consultation ? this.props.rows?.listAnimateurConferenceVo : this.state.listAnimateurConferenceVo}
                    cols={this.props.consultation ? this.colsConsultation : this.colsEdition}
                    totalElements={this.props.consultation ? this.props.rows?.listAnimateurConferenceVo?.length : this.state.listAnimateurConferenceVo?.length}
                    maxResultsPerPage={10}
                    paginate={true}
                    showProgress={this.props.showProgress}
                  />
                </Col>
              </Row>
              {/* )} */}


              {/* {(this.props?.rows?.ordreService?.conference || this.props?.rows?.conference) && ( */}
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
                    disabled={this.props.consultation}
                    value={this.props.rows?.themeConference}
                    multiline={true}
                    numberOfLines={4}

                  />
                </Col>
              </Row>
              {/* )} */}

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
                    disabled={this.props.consultation}
                    value={this.props.description ? this.props.description : this.state.description}
                    multiline={true}
                    numberOfLines={4}

                  />
                </Col>
              </Row>
            </Grid>
          </ComBadrCardBoxComp>


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

const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(AtifsRapportCreationDetailsTab);
