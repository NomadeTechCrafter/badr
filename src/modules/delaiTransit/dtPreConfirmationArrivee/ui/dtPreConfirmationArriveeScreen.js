import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComBadrCardBoxComp as CardBox,
} from '../../../../commons/component';
import { connect } from 'react-redux';

import * as Constants from '../state/dtPreConfirmationArriveeConstants';

import translate from '../../../../commons/i18n/ComI18nHelper';
import DTRechercheParRefComp from '../component/dtRechercheParRefComp'
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as PreConfirmationArriveeAction from '../state/actions/dtConfirmerPreConfirmationArriveeAction';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { CustomStyleSheet } from '../../../../commons/styles/ComThemeStyle';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { MODULE_ECOREXP, TYPE_SERVICE_UC } from '../../../../commons/Config';


class PreConfirmationArriveeMainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datePreConfirmation: moment(new Date()).format('DD/MM/YYYY'),
      heurePreConfirmation: moment(new Date()).format('HH:mm'),
      referenceDUM: null,
      messageErreur: null
    };
  }

  preConfirmationArrivee = () => {
    if (this.state.datePreConfirmation && this.state.heurePreConfirmation && this.props?.data?.referenceDUM) {
      this.setState = {
        messageErreur: null
      }
      let action = PreConfirmationArriveeAction.request(
        {
          type: Constants.PRE_CONFIRMATION_ARRIVEE_REQUEST,
          value: {
            commande: 'confirmerPreConfirmationArrivee',
            module: MODULE_ECOREXP,
            typeService: TYPE_SERVICE_UC,
            data: {
              "referenceDUM": this.props?.data?.referenceDUM,
              "dateHeurePreConfirmationArrive": this.state.datePreConfirmation + ' ' + this.state.heurePreConfirmation
            },
          },
        },
        this.props.navigation,
      );
      this.props.dispatch(action);
    } else {
      this.setState({
        messageErreur: 'Date et heure de pré confirmation d\'arrivée obligatoire'
      });
    }
  }

  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    if (serie?.length > 6) {
      let firstSerie = serie?.substring(0, 1);
      if (firstSerie == '0') {
        serie = serie.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
  };

  render() {
    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
    // console.log(JSON.stringify(this.props.data));
    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('preConfirmationArrivee.title')}
          subtitle={translate('preConfirmationArrivee.subTitle')}
          icon="menu"
        />
        {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
        {this.props.data?.dtoHeader?.messagesInfo && (
          <ComBadrInfoMessageComp message={this.props.data?.dtoHeader?.messagesInfo} />
        )}
        {this.props.data?.dtoHeader?.messagesErreur && (
          <ComBadrErrorMessageComp message={this.props.data?.dtoHeader?.messagesErreur} />
        )}
        {this.state.messageErreur && (
          <ComBadrErrorMessageComp message={this.state.messageErreur} />
        )}
        <NavigationContainer independent={true}>
          {(!this.props.initSucces) && (
            <DTRechercheParRefComp
              commande="initPreConfirmationArrivee"
              typeService="UC"
              navigation={this.props.navigation}
              routeParams={this.props.route.params}
            />
          )}
          {(!this.props.data?.dtoHeader?.messagesErreur && this.props.initSucces) && (

            <ScrollView>
              <View style={styles.fabContainer}>
                <ScrollView>
                  {/* Référence déclaration */}
                  <CardBox style={styles.cardBoxInfoDum}>
                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                      <Text style={styles.libelleM}>
                        {translate('transverse.bureau')}
                      </Text>
                      <Text style={styles.libelleM}>
                        {translate('transverse.regime')}
                      </Text>
                      <Text style={styles.libelleM}>
                        {translate('transverse.annee')}
                      </Text>
                      <Text style={styles.libelleM}>
                        {translate('transverse.serie')}
                      </Text>
                      <Text style={styles.libelleM}>{translate('transverse.cle')}</Text>
                    </View>
                    <View style={styles.flexDirectionRow}>
                      <Text style={styles.valueM}>
                        {this.props?.data?.referenceDUM?.substring(0, 3)}
                      </Text>
                      <Text style={styles.valueM}>
                        {this.props?.data?.referenceDUM?.substring(3, 6)}
                      </Text>
                      <Text style={styles.valueM}>
                        {this.props?.data?.referenceDUM?.substring(6, 10)}
                      </Text>
                      <Text style={styles.valueM}>
                        {this.props?.data?.referenceDUM?.substring(10, 17)}
                      </Text>
                      <Text style={styles.valueM}>
                        {this.cleDUM(this.props?.data?.referenceDUM?.substring(3, 6), this.props?.data?.referenceDUM?.substring(10, 17))}
                      </Text>
                    </View>
                  </CardBox>
                </ScrollView>
              </View>
              <View style={CustomStyleSheet.verticalContainer20}>
                <View style={CustomStyleSheet.row}>
                  <Row>
                    <Col size={3} />
                    <Col size={6}>
                      <ComBadrDatePickerComp
                        readonly={this.props.confirmerSucces}
                        dateFormat="DD/MM/YYYY"
                        heureFormat="HH:mm"
                        value={this.state.datePreConfirmation ? moment(this.state.datePreConfirmation, 'DD/MM/YYYY', true) : moment(new Date()).format('DD/MM/YYYY')}
                        timeValue={this.state.heurePreConfirmation ? moment(this.state.heurePreConfirmation, 'HH:mm', true) : ''}

                        onDateChanged={(date) => {
                          this.setState({
                            datePreConfirmation: date
                          });
                        }}

                        onTimeChanged={(time) => {
                          this.setState({
                            heurePreConfirmation: time
                          });
                        }}
                      />
                    </Col>
                    <Col size={3} />
                  </Row>
                </View>
              </View>
              <Grid>
                <Row>
                  <Col size={20} />
                  <Col size={30}>
                    <Button
                      onPress={this.preConfirmationArrivee}
                      disabled={this.props.confirmerSucces}
                      icon="check"
                      compact="true"
                      mode="contained"
                      style={styles.btnConfirmer}
                      loading={this.props.showProgress}>
                      {translate('preConfirmationArrivee.confirmer')}
                    </Button>
                  </Col>
                  <Col size={20} />
                </Row>
              </Grid>
            </ScrollView>
          )}
        </NavigationContainer>
      </View>
    );
  }
}

const libelle = {
  fontSize: 14,
  color: '#006acd',
  fontWeight: 'bold',
};

const value = {
  fontSize: 14,
  fontWeight: 'bold',
};

const styles = {
  ComContainerCompBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnConfirmer: {
    color: '#FFF',
    padding: 5,
    marginRight: 15,
  },
  textInputsStyle: {
    padding: 10,
  },
  fabContainer: {
    height: '100%',
    flex: 1,
  },
  cardBoxInfoDum: {
    flexDirection: 'column',
    margin: 10,
  },
  libelle: { ...libelle },
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
  valueS: {
    ...value,
    flex: 1,
  },
  valueM: {
    ...value,
    flex: 2,
  },
  valueL: {
    ...value,
    flex: 3,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },

};

function mapStateToProps(state) {
  return { ...state.preConfirmationArriveeReducer };
}


export default connect(
  mapStateToProps,
  null,
)(PreConfirmationArriveeMainScreen);
