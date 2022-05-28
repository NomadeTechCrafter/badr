import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { DataTable, IconButton, Text, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  ComBadrCardBoxComp,


  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,


  ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
/**i18n */
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor
} from '../../../../../../commons/styles/ComThemeStyle';
import ComUtils from '../../../../../../commons/utils/ComUtils';
import { FORMAT_DDMMYYYY_HHMM } from '../../../utils/actifsConstants';
import { format } from '../../../utils/actifsUtils';
import * as Constants from '../../state/actifsRapportCreationConstants';
import * as getOsById from '../../state/actions/actifsRapportCreationGetOsByIdAction';


const screenHeight = Dimensions.get('window').height;



class ActifsRapportCreationEnteteTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: '',
      mode: '',

      show: false,
      paginate: true,
    };
    this.cols = [
      { code: 'agent', libelle: 'Agent', width: 300 },
      { code: 'agent', libelle: 'Grade', width: 100 },
      { code: 'agent', libelle: 'Date de validation', width: 150 },
      { code: 'agent', libelle: 'Commentaire', width: 150 },
      { code: 'agent', libelle: 'Validations', width: 100 },
    ];
  }

  componentDidMount() {

  }

  render_validations = (item, libelle, row) => {
    if (_.property(item)) {
      if (libelle === 'Agent') {
        return <Text> {row.agentBrigade}</Text>;
      }
      if (libelle === 'Commentaire') {
        return (
          <Text
            style={{
              color: 'red',
              borderColor: 'blue',
              borderWidth: 2,
            }}>
            {' '}
            {JSON.stringify(item.commentaire)}
          </Text>
        );
      }

      if (libelle === 'Grade') {
        return <Text> {JSON.stringify(item.refGradeLib)}</Text>;
      }
      if (libelle === 'Date de validation') {
        return <Text> {item.dateEffet}</Text>;
      }
      if (libelle === 'Validations') {
        return <Text> {item.avecCertificat}</Text>;
      }
    }
  };

  onChange = (event, selectedDate) => {

    if (this.state.mode == 'date') {
      this.setState({
        dateFin: moment(selectedDate).format("DD/MM/YYYY").toString(),
        show: false,
      });
      this.props.update({ heureFin: this.state.heureFin, dateFin: moment(selectedDate).format("DD/MM/YYYY").toString() });
      this.state.dateFin = moment(selectedDate).format("DD/MM/YYYY").toString();
    } else {
      this.setState({
        heureFin: moment(selectedDate).format("HH:mm").toString(),
        show: false,
      });
      this.props.update({ heureFin: moment(selectedDate).format("HH:mm").toString(), dateFin: this.state.dateFin });
    }
    this.checkDatesDebutFinInformations();
  };

  checkDatesDebutFinInformations = () => {
    this.setState({
      errorMessage: null
    });

    let dateDebut = format(this.props.rows.dateDebut);

    moment.suppressDeprecationWarnings = true;
    let dateHeureDebut = moment(dateDebut, FORMAT_DDMMYYYY_HHMM);

    let dateHeureFin = moment(this.state.dateFin + ' ' + this.state.heureFin, FORMAT_DDMMYYYY_HHMM);
    console.log(dateHeureFin, '   ', _.isNil(dateHeureFin), '   ', typeof dateHeureFin);
    if (dateHeureFin === null) {
      let message = translate('actifsCreation.entete.errors.dateFinRequired');
      this.setState({
        errorMessage: message
      });
      return true;

    }
    if (dateHeureFin < dateHeureDebut) {
      let message = translate('actifsCreation.entete.errors.dateDebutFinOrdre');

      this.setState({
        errorMessage: message
      });
      return true;
    } else {

      return false
    }



  }


  showMode = (currentMode) => {
    this.setState({ show: true, mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };
  onItemSelected = (row) => { };

  static getDerivedStateFromProps(props, state) {
    // console.log('getDerivedStateFromProps--------ActifsRapportCreationEnteteTab------------props ', props);
    // console.log('getDerivedStateFromProps--------ActifsRapportCreationEnteteTab------------state ', state);


    if ((!state?.rows && props?.rows) || (state?.rows && state.rows?.id !== props?.rows.id)) {
      return {
        rows: props.rows,
        dateFin: moment(props.rows.ordreService?.dateFin).format("DD/MM/YYYY").toString(),
        dateFinTech: ComUtils.convertStringTimeStamp(props.rows.ordreService?.dateFin),
        heureFinTech: ComUtils.convertStringTimeStamp(props.rows.ordreService?.dateFin),
        heureFin: props?.rows?.ordreService?.heureFin,
        refPJ: props?.rows?.ordreService?.refPJ,
        res: props?.rows?.ordreService?.refPJ?.split('_')
      };
    }
    // Return null to indicate no change to state.
    return null;
  }




  render() {
    console.log('--------------------------------------------------------------------------------------------');
    console.log('--------------------------------------------------------------------------------------------');
    console.log('--------------------------------------------------------------------------------------------');
    console.log('--------------------------------------------------------------------------------------------');
    console.log('--------------------------------------------------------------------------------------------');
    console.log(JSON.stringify(this.props.rows));
    console.log('--------------------------------------------------------------------------------------------');
    console.log('--------------------------------------------------------------------------------------------');
    console.log('--------------------------------------------------------------------------------------------');
    console.log('--------------------------------------------------------------------------------------------');
    let datatable = [];

    const references = this.props?.rows?.refPJ ? this.props?.rows?.refPJ?.split('_') : this.props?.rows?.ordreService?.refPJ?.split('_')

    datatable.push(this.props.rows);
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComContainerComp>
          {this.props.showProgress && (
            <ComBadrProgressBarComp width={screenHeight} />
          )}
          {this.props.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
          {this.state.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.state.errorMessage} />
          )}
          {this.props.successMessage != null && (
            <ComBadrInfoMessageComp message={this.props.successMessage} />
          )}
          {/* Référence déclaration */}
          <ComBadrCardBoxComp noPadding={true}>
            <Grid>
              {/*first row */}
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={this.props.consultation ? 5 : 15}>
                  <ComBadrLibelleComp>
                    {translate('actifsCreation.entete.enteteTitleLeft')}
                    {this.props.consultation && (
                      <ComBadrLibelleComp withColor={true}>
                        {this.props?.rows?.journeeDu}
                      </ComBadrLibelleComp>
                    )}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {this.props.consultation
                      ? translate('actifsCreation.entete.enteteTitleRight') + '1'
                      : translate('actifsCreation.entete.enteteTitleRight') + '0'}
                  </ComBadrLibelleComp>
                </Col>
              </Row>

              {/*second Row*/}
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={3}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.uniteOrganizationnelle')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={9}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 11 }}
                    disabled={true}
                    //maxLength={20}
                    //keyboardType={'number-pad'}
                    value={this.props?.rows?.uniteOrganisationnelle ? this.props?.rows?.uniteOrganisationnelle : this.props?.rows?.ordreService?.uniteOrganisationnelle}
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={(text) =>
                      this.setState({ uniteOrganisationnelle: text })
                    }
                  />
                </Col>
                <Col size={2} style={{ padding: 5 }}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.journeeDu')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 12 }}
                    disabled={true}
                    //keyboardType={'number-pad'}
                    value={this.props?.rows?.ordreService?.journeeDu ? this.props?.rows?.ordreService?.journeeDu : this.props?.rows?.journeeDu}
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({ journeeDu: text })}
                  />
                </Col>
              </Row>

              {/*third Row*/}
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.reference')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1} style={{ paddingRight: 5 }}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 12 }}
                    disabled={true}
                    value={references ? references[0] : ''}
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({ code1: text })}
                  />
                </Col>
                <Col size={1} style={{ paddingRight: 5 }}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 12 }}
                    disabled={true}
                    value={references ? references[1] : ''}
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({ code2: text })}
                  />
                </Col>
                <Col size={1} style={{ paddingRight: 5 }}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 12 }}
                    disabled={true}
                    value={references ? references[2] : ''}
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({ code3: text })}
                  />
                </Col>
                <Col size={1} style={{ padding: 5 }}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.NumeroOrder')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 12 }}
                    disabled={true}
                    value={(this.props.rows?.numero) ? this.props.rows?.numero?.toString() : this.props.rows?.ordreService?.numero?.toString()}
                  />
                </Col>
              </Row>

              {/*fourth Row*/}
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <Row>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('actifsCreation.entete.descriptionOS')}
                    </ComBadrLibelleComp>
                  </Row>
                </Col>
                <Col size={5}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                    disabled={true}
                    value={this.props.rows?.description ? this.props.rows?.description : this.props.rows?.ordreService?.description}
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={(text) => this.setState({ description: text })}
                  />
                </Col>
              </Row>

              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={4}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.dateDebut')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 12 }}
                    disabled={true}
                    value={this.props.rows?.dateDebut ? moment(this.props.rows?.dateDebut).format("DD/MM/YYYY") : moment(this.props.rows?.ordreService?.dateDebut).format("DD/MM/YYYY") }
                  />

                </Col>
                <Col size={2} style={{ paddingTop: 5 }}>
                </Col>
                <Col size={6} />
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.dateFin')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 12 }}
                    disabled={this.props.consultation ? true : false}
                    keyboardType={'number-pad'}
                    disabled={true}
                    value={this.props.consultation ? moment(this.props.rows?.dateFin).format("DD/MM/YYYY") : this.state.dateFin}
                    onChangeText={(text) => this.changeDateFin(text)}
                  />
                  {this.state.show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state?.dateFinTech}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChange}
                    />
                  )}
                </Col>
                <Col size={2} style={{ paddingTop: 5 }}>
                  {!this.props.consultation && <IconButton
                    icon="calendar"
                    onPress={() => this.showMode('date')}
                  />}
                </Col>
              </Row>

              {/*fifth line*/}

              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={3}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.heureDebut')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={0.5} />
                <Col size={3}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 12, alignSelf: 'center' }}
                    disabled={true}
                    value={this.props.rows?.heureDebut ? this.props.rows?.heureDebut : this.props.rows?.ordreService?.heureDebut}
                    multiline={false}
                    numberOfLines={1}
                  //onChangeText={text => this.setState({observation: text})}
                  />
                </Col>
                <Col size={2} style={{ paddingTop: 5 }}>
                  <Text style={{ fontSize: 12 }}>
                    {translate('actifsCreation.entete.uniteHeure')}
                  </Text>
                </Col>
                <Col size={5} />
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.heureFin')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={3}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 12, alignSelf: 'center' }}
                    disabled={this.props.consultation ? true : false}
                    value={this.props.consultation ? this.props.rows?.heureFin: this.state.heureFin }
                    onFocus={() => {
                      this.showMode('time');
                    }}
                    onChangeText={(text) => this.setState({ heureFin: text })}
                  />
                  {this.state.show && (
                    <DateTimePicker
                      style={{ width: '100%' }}
                      value={this.state.heureFinTech}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChange}
                    />
                  )}
                </Col>
                <Col size={2} style={{ paddingTop: 5 }}>
                  <Text style={{ fontSize: 12 }}>
                    {translate('actifsCreation.entete.uniteHeure')}
                  </Text>
                </Col>
              </Row>
            </Grid>
          </ComBadrCardBoxComp>

          {this.props.consultation && (
            <ComBadrCardBoxComp>
              <View>
                <Text>{'Validations'}</Text>
                <View>
                  <ScrollView
                    ref="_horizontalScrollView"
                    key="horizontalScrollView"
                    horizontal={true}>
                    <ScrollView key="verticalScrollView">
                      <DataTable key="tab00100">
                        <DataTable.Header>
                          {this.cols.map((column, index) => (
                            <DataTable.Title style={{ width: column.width }} key={index}>
                              {column.libelle}
                            </DataTable.Title>
                          ))}
                        </DataTable.Header>

                        {this.props.rows?.agentsBrigade && this.props.rows?.agentsBrigade.length > 0
                          ? (this.state.paginate
                            ? _(this.props.rows?.agentsBrigade)
                              .slice(this.state.offset)
                              .take(5)
                              .value()
                            : this.props.rows?.agentsBrigade
                          ).map((row, index) => (
                            <DataTable.Row
                              key={row.numeroChassis}
                              onPress={() => this.onItemSelected(row)}>
                              {this.cols.map((column, index) => (
                                <>
                                  <DataTable.Cell
                                    style={{ width: column.width }}>
                                    {' '}
                                    {this.render_validations(
                                      row[column.code],
                                      column.libelle,
                                      row
                                    )}
                                  </DataTable.Cell>
                                </>
                              ))}
                            </DataTable.Row>
                          ))
                          : !this.props.showProgress && (
                            <View style={CustomStyleSheet.centerContainer}>
                              <Text>
                                {translate('transverse.noRowFound')}
                              </Text>
                            </View>
                          )}
                      </DataTable>
                    </ScrollView>
                  </ScrollView>
                </View>
              </View>
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
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationEnteteTab);
