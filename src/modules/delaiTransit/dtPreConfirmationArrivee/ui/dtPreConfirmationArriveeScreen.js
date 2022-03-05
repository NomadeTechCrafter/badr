import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  ComAccordionComp,
  ComBadrButtonIconComp,
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrLibelleComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';
import { connect } from 'react-redux';

import * as Constants from '../state/dtPreConfirmationArriveeConstants';

import translate from '../../../../commons/i18n/ComI18nHelper';
import DTRechercheParRefComp from '../component/dtRechercheParRefComp'
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as PreConfirmationArriveeAction from '../state/actions/dtConfirmerPreConfirmationArriveeAction';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { CustomStyleSheet } from '../../../../commons/styles/ComThemeStyle';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { MODULE_ECI, TYPE_SERVICE_UC } from '../../../../commons/Config';


class PreConfirmationArriveeMainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datePreConfirmation: moment(new Date()).format('DD/MM/YYYY'),
      messageErreur: null
    };
  }

  preConfirmationArrivee = () => {
    if (this.state.datePreConfirmation) {
      this.setState = {
        messageErreur: null
      }
      // console.log('************************************************');
      // console.log('************************************************');
      // console.log('************************************************');
      // console.log('************************************************');
      // console.log(JSON.stringify(this.state.datePreConfirmation))
      // console.log('************************************************');
      // console.log('************************************************');
      // console.log('************************************************');
      // console.log('************************************************');
      let action = PreConfirmationArriveeAction.request(
        {
          type: Constants.PRE_CONFIRMATION_ARRIVEE_REQUEST,
          value: {
            commande: 'confirmerPreConfirmationArrivee',
            module: MODULE_ECI,
            typeService: TYPE_SERVICE_UC,
            datePreConfirmation: this.state.datePreConfirmation,
          },
        },
        this.props.navigation,
      );
      this.props.dispatch(action);
    } else {
      this.setState({
        messageErreur: 'Date pré confirmation d\'arrivée obligatoire'
      });
    }
  }

  render() {
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
          <DTRechercheParRefComp
            commande="initPreConfirmationArrivee"
            typeService="UC"
            navigation={this.props.navigation}
            routeParams={this.props.route.params}
          />
          {(!this.props.data?.dtoHeader?.messagesErreur && this.props.initSucces) && (
            <ScrollView>
              <View style={CustomStyleSheet.verticalContainer20}>
                <View style={CustomStyleSheet.row}>
                  <Row>
                    <Col size={3} />
                    <Col size={6}>
                      <ComBadrDatePickerComp
                        labelDate={translate('preConfirmationArrivee.datePreConfirmation')}
                        dateFormat="DD/MM/YYYY"
                        value={this.state.datePreConfirmation ? moment(this.state.datePreConfirmation, 'DD/MM/YYYY', true) : moment(new Date()).format('DD/MM/YYYY') }
                        inputStyle={styles.textInputsStyle}
                        onDateChanged={(date) => {
                          this.setState({
                            datePreConfirmation: date
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
  }

};

function mapStateToProps(state) {
  return { ...state.preConfirmationArriveeReducer };
}


export default connect(
  mapStateToProps,
  null,
)(PreConfirmationArriveeMainScreen);
