import React, { Component } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import {
  ComContainerComp,
  ComBadrCardBoxComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComBadrNumericTextInputComp,
  ComBadrLibelleComp,
} from '../../../../../commons/component';
import moment from 'moment';

import { TextInput, Text, IconButton } from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';
/**i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';

import { connect } from 'react-redux';

const screenHeight = Dimensions.get('window').height;

import DateTimePicker from '@react-native-community/datetimepicker';

import * as Constants from '../state/actifsRapportRechercheConstants';
import * as getOrdresService from '../state/actions/actifsRapportRechercheGetOrdresServiceAction';
import { DataTable } from 'react-native-paper';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

class ActifsRapportRechercheScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: '',
      show: false,
      paginate: true,
      code1: ComSessionService.getInstance().getUserObject() ? ComSessionService.getInstance().getUserObject().codeUOR : '',
      code2: '',
      code3: '',
      data: '',// 'jj/mm/aaaa', //moment(this.state.date).format("MM/DD/YYYY")
    };
    this.cols = [
      { code: 'numero', libelle: 'N² OS', item: 'numero', width: 50 },
      { code: 'confidentiel', libelle: 'Conf', item: 'confidentiel', width: 50 },
      { code: 'additif', libelle: 'Add', item: 'additif', width: 50 },
      {
        code: 'description',
        libelle: 'Description',
        item: 'description',
        width: 250,
      },
      { code: 'dateDebut', libelle: 'Date début', item: 'dateDebut', width: 150 },
      { code: 'dateFin', libelle: 'Date fin', item: 'dateFin', width: 150 },
      {
        code: 'agentsBrigade',
        libelle: 'Agents',
        item: 'agentsBrigade',
        width: 200,
      },
      { code: 'vehicules', libelle: 'Véhicules', item: 'matricule', width: 200 },
      {
        code: 'chefEquipe',
        libelle: "Chef d'équipe",
        item: 'idActeur',
        width: 200,
      },
      {
        code: 'rapportExiste',
        libelle: 'Rapports',
        item: 'rapportExiste',
        width: 200,
      },
    ];
  }

  onItemSelected = (row) => {
    if (row.rapportExiste) {
      this.props.navigation.navigate('CreationRapport', {
        consultation: true,
        row: row,
      });
    } else {
      this.props.navigation.navigate('CreationRapport', {
        consultation: false,
        row: row,
      });
    }
    this.setState({
      date: new Date(),
      mode: '',
      show: false,
      paginate: true,
      code1: ComSessionService.getInstance().getUserObject() ? ComSessionService.getInstance().getUserObject().codeUOR : '',
      data: 'jj/mm/aaaa', //moment(this.state.date).format("MM/DD/YYYY")
    });

  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('Actifs componentDidMount');
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  rechercher = () => {
    this.setState({ errorMessage: null });
    console.log('this.state.data : ', this.state.data);
    if (
      this.state.data != 'jj/mm/aaaa' ||
      (this.state.code1 && this.state.code2 && this.state.code3)
    ) {
      let data = {
        // journeeDu: this.state.date ? this.state.date : null,
        journeeDu: null,
        codeUO: '',
        refPJ: '',
      };
      if (this.state.data != 'jj/mm/aaaa') {
        data.journeeDu = this.state.data;

      }
      if (this.state.code1) {
        data.codeUO = this.state.code1;
      }
      if (this.state.code1 && this.state.code2 && this.state.code3) {

        data.refPJ = this.state.code1 + '_' + this.state.code2 + '_' + this.state.code3;
      }


      let action = getOrdresService.request(
        {
          type: Constants.ACTIFS_RECHERCHE_REQUEST,
          value: { data: data },
        } /*,
                    this.props.navigation,
                    this.props.successRedirection,*/,
      );
      this.props.dispatch(action);
    } else {
      this.setState({ errorMessage: translate("actifs.recherche.errors.champsSearcheRapportRequired") });
    }
  };

  retablir = () => {
    console.log('this.state : ', JSON.stringify(this.state));
    // this.code1.clear();
    this.code2.clear();
    this.code3.clear();
    this.setState({
      date: new Date(),
      mode: '',
      show: false,
      paginate: true,
      code1: ComSessionService.getInstance().getUserObject() ? ComSessionService.getInstance().getUserObject().codeUOR : '',
      code2: '',
      code3: '',
      data: 'jj/mm/aaaa',
    });
    console.log('this.state : ', JSON.stringify(this.state));
  };


  iconAdd = () => {
    return <IconButton icon="calendar" onPress={() => { }} />;
  };

  onChange = (event, selectedDate) => {
    this.setState(
      {
        date: selectedDate,
        show: false,
        data: moment(selectedDate).format('DD/MM/YYYY'),
        errorMessage: null
      },
      // () => console.log('=======', this.state.data),
    );
  };

  showMode = (currentMode) => {
    this.setState({ show: true, mode: currentMode, errorMessage: null });
  };

  render_cols = (item, code) => {
    if (code === 'rapportExiste') {
      if (item === true) {
        return <Text>{'mode consultation'}</Text>;
      } else {
        return <Text>{'mode creation'}</Text>;
      }
    }
    if (code === 'confidentiel' || code === 'additif') {
      if (item) {
        return <Text>{'Oui'}</Text>;
      } else {
        return <Text>{'Non'}</Text>;
      }
    }
    if (_.isArray(item)) {

      return item.map((object) => {

        if (code === 'agentsBrigade') {
          return <Row><Text key={object.agentBrigade}> {object.agentBrigade}</Text></Row>;
        }
        if (code === 'vehicules') {
          return <Text key={object.matricule}> {object.matricule}</Text>;
        }
      });
    }
    if (_.isObject(item)) {
      if (code === 'chefEquipe') {
        return <Text> {item.nom} {item.prenom} ({item.idActeur})</Text>;
      } else {
        return <Text>{JSON.stringify(item)}</Text>;
      }
    }
    if (_.property(item)) {
      return <Text>{item}</Text>;
    }
  };

  render() {

    let rows = [];
    if (this.props.value && this.props.value.jsonVO) {
      rows = this.props.value.jsonVO;
    }

    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('actifsCreation.title')}
          subtitle={translate('actifs.recherche.title')}
          icon="menu"
        />
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
          <ComBadrCardBoxComp noPadding={true}>
            <Grid>
              {/*first row */}
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={8} />
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {translate('actifs.recherche.brigade')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {translate('actifs.recherche.annee')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {translate('actifs.recherche.numSerie')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>

              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={8}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifsCreation.entete.reference')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4} style={{ paddingRight: 5 }}>
                  <ComBadrNumericTextInputComp
                    maxLength={3}
                    style={{ height: 20, fontSize: 12 }}
                    value={this.state.code1}
                    onRef={(ref) => (this.code1 = ref)}
                    onChangeBadrInput={(text) => this.setState({ code1: text })}
                  />
                </Col>
                <Col size={4} style={{ paddingRight: 5 }}>
                  <ComBadrNumericTextInputComp
                    style={{ height: 20, fontSize: 12 }}
                    value={this.state.code2}
                    maxLength={4}
                    onRef={(ref) => (this.code2 = ref)}
                    onChangeBadrInput={(text) => this.setState({ code2: text })}
                  />
                </Col>
                <Col size={4} style={{ paddingRight: 5 }}>
                  <ComBadrNumericTextInputComp
                    style={{ height: 20, fontSize: 12 }}
                    value={this.state.code3}
                    maxLength={7}
                    onRef={(ref) => (this.code3 = ref)}
                    onChangeBadrInput={(text) => this.setState({ code3: text })}
                  />
                </Col>
              </Row>

              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={8}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('actifs.recherche.journeeDu')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={10}>
                  <TextInput
                    mode={'outlined'}
                    style={{ height: 20, fontSize: 12 }}
                    disabled={false}
                    value={this.state.data}
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({ date: text })}
                  />
                  {this.state.show && (
                    <DateTimePicker
                      value={this.state.date}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChange}
                    />
                  )}
                </Col>
                <Col size={2} style={{ paddingTop: 5 }}>
                  <IconButton
                    icon="calendar"
                    onPress={() => this.showMode('date')}
                  />
                </Col>
              </Row>
            </Grid>
          </ComBadrCardBoxComp>
          <View style={styles.containerActionBtn}>
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.rechercher();
              }}
              text={translate('transverse.rechercher')}
              disabled={false}
            />
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.retablir();
              }}
              text={translate('transverse.retablir')}
              disabled={false}
            />
          </View>

          <View>
            {(rows && rows.length > 0) && (
              <ScrollView
                ref="_horizontalScrollView"
                key="horizontalScrollView"
                horizontal={true}>
                <ScrollView key="verticalScrollView">
                  <DataTable>
                    <DataTable.Header>
                      {this.cols.map((column, index) => (
                        <DataTable.Title style={{ width: column.width }} key={index}>
                          {column.libelle}
                        </DataTable.Title>
                      ))}
                    </DataTable.Header>
                    {/* {console.log('rows recherche ......', rows)} */}
                    {rows && rows.length > 0
                      ? (this.state.paginate
                        ? _(rows).slice(this.state.offset).take(5).value()
                        : rows
                      ).map((row, index) => (
                        <DataTable.Row
                          key={index}
                          onPress={() => this.onItemSelected(row)}>
                          {this.cols.map((column, index) => (
                            <DataTable.Cell style={{ width: column.width }} key={index}>
                              {' '}
                              {this.render_cols(row[column.code], column.code)}
                            </DataTable.Cell>
                          ))}
                        </DataTable.Row>
                      ))
                      : !this.props.showProgress && (
                        <View style={CustomStyleSheet.centerContainer}>
                          <Text>{translate('transverse.noRowFound')}</Text>
                        </View>
                      )}
                  </DataTable>
                </ScrollView>
              </ScrollView>
            )}
          </View>
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

const mapStateToProps = (state) => ({ ...state.rechercheActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportRechercheScreen);
