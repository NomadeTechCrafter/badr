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
import { save } from '../../../../../../commons/services/async-storage/ComStorageService';
import {
  CustomStyleSheet,
  primaryColor
} from '../../../../../../commons/styles/ComThemeStyle';
import * as Constants from '../../state/actifsRapportCreationConstants';
import * as getOsById from '../../state/actions/actifsRapportCreationGetOsByIdAction';



const screenHeight = Dimensions.get('window').height;



class ActifsRapportCreationEnteteTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(1598051730000),
      time: new Date(1598051730000),
      mode: '',
      show: false,
      paginate: true,
    };
    this.cols = [
      {code: 'agent', libelle: 'Agent', width: 100},
      {code: 'agent', libelle: 'Grade', width: 100},
      {code: 'agent', libelle: 'Date de validation', width: 150},
      {code: 'agent', libelle: 'Commentaire', width: 150},
      {code: 'agent', libelle: 'Validations', width: 100},
    ];
  }

  componentDidMount() {
    console.log('--------------------------------------------------ActifsRapportCreationEnteteTab---------------------------------------------------------start');
    this.Enregister();
    console.log('--------------------------------------------------ActifsRapportCreationEnteteTab---------------------------------------------------------fin');
  }

  Enregister = () => {
    console.log('this.props : ', this.props);
    let data = this.props.row?.id;
  
    let action = getOsById.request(
      {
        type: Constants.ACTIFS_ENTETE_REQUEST,
        value: {data: data},
      } /*,
                    this.props.navigation,
                    this.props.successRedirection,*/,
    );
    this.props.dispatch(action);
    ////console.log('dispatch fired !!');
  };

  render_validations = (item, libelle) => {
    console.log('item______', item);
    console.log('libelle______', libelle);
    if (_.property(item)) {
      if (libelle === 'Agent') {
        return <Text> {item.nom}</Text>;
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
        return <Text> {JSON.stringify(item.refGrade)}</Text>;
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
    this.setState({
      date: selectedDate,
      time: selectedDate.getHours() + ':' + selectedDate.getMinutes(),
      show: false,
    });
  };

  showMode = (currentMode) => {
    this.setState({show: true, mode: currentMode});
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };
  onItemSelected = (row) => {};

  render() {
    let rows = '';
    let datatable = [];
    let res = '';
    if (this.props.value && this.props.value.jsonVO) {
      rows = this.props.value.jsonVO;
      save('rows', JSON.stringify(rows)).then(() => {
        console.log('success');
      });
      const refPJ = this.props.value.jsonVO.refPJ;
               
      res = refPJ.split('_');
    }
    datatable.push(rows);
    //console.log("_______v___agentBrigade_____________",JSON.stringify(this.props.row.agentsBrigade))
    console.log('rows props _______', datatable);
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
          <ComBadrCardBoxComp noPadding={true}>
            <Grid>
              {/*first row */}
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={this.props.consultation ? 5 : 15}>
                  <ComBadrLibelleComp>
                    {translate('actifsCreation.entete.enteteTitleLeft')}
                    {this.props.consultation && (
                      <ComBadrLibelleComp withColor={true}>
                        {moment(this.props.journeeDu).format(
                          'MM/DD/YYYY hh:mm',
                        )}
                      </ComBadrLibelleComp>
                    )}
                  </ComBadrLibelleComp>
                </Col>
                {this.props.consultation ? (
                  <Col size={5}>
                    <ComBadrLibelleComp>
                      {translate('actifsCreation.entete.enteteTitleLeft')}
                      {this.props.consultation && (
                        <ComBadrLibelleComp withColor={true}>
                          {moment(this.props.journeeDu).format(
                            'MM/DD/YYYY hh:mm',
                          )}
                        </ComBadrLibelleComp>
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                ) : null}
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
                    style={{height: 20, fontSize: 11}}
                    disabled={true}
                    //maxLength={20}
                    //keyboardType={'number-pad'}
                    value={rows.uniteOrganisationnelle}
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={(text) =>
                      this.setState({uniteOrganisationnelle: text})
                    }
                  />
                </Col>
                <Col size={2} style={{padding: 5}}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.journeeDu')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <TextInput
                    mode={'outlined'}
                    style={{height: 20, fontSize: 12}}
                    disabled={true}
                    //keyboardType={'number-pad'}
                    value={rows.journeeDu}
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({journeeDu: text})}
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
                <Col size={1} style={{paddingRight: 5}}>
                  <TextInput
                    mode={'outlined'}
                    style={{height: 20, fontSize: 12}}
                    disabled={true}
                    value={res[0]}
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({code1: text})}
                  />
                </Col>
                <Col size={1} style={{paddingRight: 5}}>
                  <TextInput
                    mode={'outlined'}
                    style={{height: 20, fontSize: 12}}
                    disabled={true}
                    //maxLength={8}
                    //keyboardType={'number-pad'}
                    value={res[1]}
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({code2: text})}
                  />
                </Col>
                <Col size={1} style={{paddingRight: 5}}>
                  <TextInput
                    mode={'outlined'}
                    style={{height: 20, fontSize: 12}}
                    disabled={true}
                    //maxLength={8}
                    //keyboardType={'number-pad'}
                    value={res[2]}
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({code3: text})}
                  />
                </Col>
                <Col size={1} style={{padding: 5}}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.NumeroOrder')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <TextInput
                    mode={'outlined'}
                    style={{height: 20, fontSize: 12, textAlignVertical: 'top'}}
                    disabled={true}
                    value={''+rows.numero}
                    onChangeText={(text) => this.setState({NumeroOrder: text})}
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
                    style={{height: 90, fontSize: 12, textAlignVertical: 'top'}}
                    disabled={true}
                    value={
                      this.props.consultation
                        ? this.props.row.description
                        : rows.description
                    }
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={(text) => this.setState({description: text})}
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
                    style={{height: 20, fontSize: 12}}
                    disabled={true}
                    value={moment(rows.dateDebut).format('MM/DD/YYYY')}
                    multiline={true}
                    numberOfLines={1}
                    //onChangeText={text => this.setState({observation: text})}
                  />
                  {this.state.show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.date}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChange}
                    />
                  )}
                </Col>
                <Col size={2} style={{paddingTop: 5}}>
                  <IconButton
                    icon="calendar"
                    onPress={() => {
                      this.showMode('date');
                    }}
                  />
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
                    style={{height: 20, fontSize: 12}}
                    disabled={this.props.consultation ? true : false}
                    //keyboardType={'number-pad'}
                    value={moment(rows.dateFin).format('MM/DD/YYYY').toString()}
                    multiline={true}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({dateFin: text})}
                  />
                  {this.state.show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.date}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChange}
                    />
                  )}
                </Col>
                <Col size={2} style={{paddingTop: 5}}>
                  <IconButton
                    icon="calendar"
                    onPress={() => this.showMode('date')}
                  />
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
                    style={{height: 20, fontSize: 12, alignSelf: 'center'}}
                    disabled={true}
                    //keyboardType={'number-pad'}
                    value={rows.heureDebut}
                    multiline={false}
                    numberOfLines={1}
                    //onChangeText={text => this.setState({observation: text})}
                  />
                  {this.state.show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.date}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChange}
                    />
                  )}
                </Col>
                <Col size={2} style={{paddingTop: 5}}>
                  <Text style={{fontSize: 12}}>
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
                    style={{height: 20, fontSize: 12, alignSelf: 'center'}}
                    disabled={this.props.consultation ? true : false}
                    value={rows.heureFin}
                    multiline={false}
                    numberOfLines={1}
                    onFocus={() => {
                      this.showMode('time');
                    }}
                    onChangeText={(text) => this.setState({time: text})}
                  />
                  {this.state.show && (
                    <DateTimePicker
                      style={{width: '100%'}}
                      value={this.state.time}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChange}
                    />
                  )}
                </Col>
                <Col size={2} style={{paddingTop: 5}}>
                  <Text style={{fontSize: 12}}>
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
                      <DataTable>
                        <DataTable.Header>
                          {this.cols.map((column, index) => (
                            <DataTable.Title style={{width: column.width}}>
                              {column.libelle}
                            </DataTable.Title>
                          ))}
                        </DataTable.Header>
                        {console.log(
                          'row__________________',
                          rows.agentsBrigade,
                        )}
                        {rows.agentsBrigade && rows.agentsBrigade.length > 0
                          ? (this.state.paginate
                              ? _(rows.agentsBrigade)
                                  .slice(this.state.offset)
                                  .take(5)
                                  .value()
                              : rows.agentsBrigade
                            ).map((row, index) => (
                              <DataTable.Row
                                key={row.numeroChassis}
                                onPress={() => this.onItemSelected(row)}>
                                {this.cols.map((column, index) => (
                                  <>
                                    <DataTable.Cell
                                      style={{width: column.width}}>
                                      {' '}
                                      {this.render_validations(
                                        row[column.code],
                                        column.libelle,
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

const mapStateToProps = (state) => ({...state.enteteReducer});

export default connect(mapStateToProps, null)(ActifsRapportCreationEnteteTab);
