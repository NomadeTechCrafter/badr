import React, {Component} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
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

import {TextInput, Text, IconButton} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';

import {connect} from 'react-redux';

const screenHeight = Dimensions.get('window').height;

import DateTimePicker from '@react-native-community/datetimepicker';

import * as Constants from '../../../../common/constants/actifs/rapport/recherche/recherche';
import * as getOrdresService from '../../../../redux/actions/actifs/rapport/recherche/recherche';
import {DataTable} from 'react-native-paper';

class Recherche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(1598051730000),
      mode: '',
      show: false,
      paginate: true,
      data: 'jj/mm/aaaa', //moment(this.state.date).format("MM/DD/YYYY")
    };
    this.cols = [
      {code: 'numero', libelle: 'N² OS', item: 'numero', width: 50},
      {code: 'confidentiel', libelle: 'Conf', item: 'confidentiel', width: 50},
      {code: 'additif', libelle: 'Add', item: 'additif', width: 50},
      {
        code: 'description',
        libelle: 'Description',
        item: 'description',
        width: 250,
      },
      {code: 'dateDebut', libelle: 'Date début', item: 'dateDebut', width: 150},
      {code: 'dateFin', libelle: 'Date fin', item: 'dateFin', width: 150},
      {
        code: 'agentsBrigade',
        libelle: 'Agents',
        item: 'agentsBrigade.id',
        width: 200,
      },
      {code: 'vehicules', libelle: 'Véhicules', item: 'matricule', width: 200},
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
      this.props.navigation.navigate('Creation', {
        consultation: true,
        row: row,
      });
    } else {
      this.props.navigation.navigate('Creation', {
        consultation: false,
        row: row,
      });
    }
  };

  componentDidMount() {}

  Enregister = () => {
    if (
      this.state.data != 'jj/mm/aaaa' ||
      (this.state.code1 && this.state.code2 && this.state.code3)
    ) {
      let data = {
        journeeDu: this.state.date ? this.state.date : null,
        codeUO: this.state.code1,
        refPJ: this.state.code1 + this.state.code2 + this.state.code3,
      };

      let action = getOrdresService.request(
        {
          type: Constants.ACTIFS_RECHERCHE_REQUEST,
          value: {data: data},
        } /*,
                    this.props.navigation,
                    this.props.successRedirection,*/,
      );
      this.props.dispatch(action);
      // console.log('dispatch fired !!');
    } else {
      return (
        this.props.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.props.errorMessage} />
        )
      );
    }
  };

  iconAdd = () => {
    return <IconButton icon="calendar" onPress={() => {}} />;
  };

  onChange = (event, selectedDate) => {
    this.setState(
      {
        date: selectedDate,
        show: false,
        data: moment(selectedDate).format('MM/DD/YYYY'),
      },
      () => console.log('=======', this.state.data),
    );
  };

  showMode = (currentMode) => {
    this.setState({show: true, mode: currentMode});
  };

  render_cols = (item, code) => {
    if (code === 'rapportExiste') {
      if (item === true) {
        return <Text>{'mode consultation'}</Text>;
      } else {
        return <Text>{'mode creation'}</Text>;
      }
    }
    if (_.isArray(item)) {
      return item.map((object) => {
        return <Text> {object.matricule}</Text>;
      });
    }
    if (_.isObject(item)) {
      if (code === 'chefEquipe') {
        return <Text> {item.idActeur}</Text>;
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
          title={translate('actifs.title')}
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
                    {translate('actifs.entete.reference')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4} style={{paddingRight: 5}}>
                  <ComBadrNumericTextInputComp
                    maxLength={3}
                    style={{height: 20, fontSize: 12}}
                    value={this.state.code1}
                    onChangeBadrInput={(text) => this.setState({code1: text})}
                  />
                </Col>
                <Col size={4} style={{paddingRight: 5}}>
                  <ComBadrNumericTextInputComp
                    style={{height: 20, fontSize: 12}}
                    value={this.state.code2}
                    maxLength={4}
                    onChangeBadrInput={(text) => this.setState({code2: text})}
                  />
                </Col>
                <Col size={4} style={{paddingRight: 5}}>
                  <ComBadrNumericTextInputComp
                    style={{height: 20, fontSize: 12}}
                    value={this.state.code3}
                    maxLength={7}
                    onChangeBadrInput={(text) => this.setState({code3: text})}
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
                    style={{height: 20, fontSize: 12}}
                    disabled={false}
                    value={this.state.data}
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={(text) => this.setState({date: text})}
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
                <Col size={2} style={{paddingTop: 5}}>
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
              style={{width: 100}}
              onPress={() => {
                this.Enregister();
              }}
              text={translate('actifs.entete.enregister')}
              disabled={false}
            />
          </View>

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
                  {console.log('rows recherche ......', rows)}
                  {rows && rows.length > 0
                    ? (this.state.paginate
                        ? _(rows).slice(this.state.offset).take(5).value()
                        : rows
                      ).map((row, index) => (
                        <DataTable.Row
                          key={row.numeroChassis}
                          onPress={() => this.onItemSelected(row)}>
                          {this.cols.map((column, index) => (
                            <DataTable.Cell style={{width: column.width}}>
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
          </View>

          <Grid>
            <Row>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('actif.recherche.nOS')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('actif.recherche.conf')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('actif.recherche.add')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('actif.recherche.description')}
                </ComBadrLibelleComp>
              </Col>
              <Col>{translate('actif.recherche.conf')}</Col>
              <Col>{translate('actif.recherche.add')}</Col>
              <Col>{translate('actif.recherche.description')}</Col>
              <Col>{translate('actif.recherche.dateDebut')}</Col>
              <Col>{translate('actif.recherche.dateFin')}</Col>
            </Row>
          </Grid>
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

const mapStateToProps = (state) => ({...state.recherchereducer});

export default connect(mapStateToProps, null)(Recherche);
