import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {
  RechercheRefDum,
  ComBadrToolbarComp,
  ComBadrButtonRadioComp,
  ComBadrDatePickerComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp,
} from '../../../../commons/component';

/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {Button, Text} from 'react-native-paper';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import {Col, Row} from 'react-native-easy-grid';
import moment from 'moment';
import dedInitierListControlAction from '../state/actions/dedInitierListControlAction';
import * as Constants from '../state/dedInitierControlConstants';

class InitierCtrlRechercherScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeRecherche: null,
      periodeDu: '',
      periodeAu: '',
      success:false,
      errorMessage:null
    };

    this.radioButtonsTypeRecherche = [
      {
        id: '1',
        label: translate('initierControl.typeRecherche.reference'),
        value: '1',
        key: '1',
      },
      {
        id: '2',
        label: translate('initierControl.typeRecherche.dateSignature'),
        value: '2',
        key: '2',
      },
    ];
  }
  static getDerivedStateFromProps(props, state) {
    if (props.errorMessage) {
      return {...state,errorMessage: props.errorMessage};
    }
    // Return null to indicate no change to state.
    return null;
  }
  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        typeRecherche: null,
        periodeDu: '',
        periodeAu: '',
        errorMessage:null,
        success:false
      });
    });
  };
  componentWillUnmount() {
    this._unsubscribe();
  }
  confirmer = () => {
    this.setState({showErrorMsg: true});

    var action = dedInitierListControlAction.request(
        {
          type: Constants.DED_INIT_LIST_CONTROLE_COMMUN_REQUEST,
          value: {
            dateDebut: this.state.periodeDu,
            dateFin: this.state.periodeAu
          },
        },
        this.props.navigation,
    );
    this.props.actions.dispatch(action);
    console.log('dispatch fired !!');
  };
  render() {
    return (
        <View>
          <ComBadrToolbarComp
              navigation={this.props.navigation}
              title={translate('initierControl.title')}
              subtitle={translate('initierControl.typeRecherche.recherche')}
              icon="menu"
          />

          {this.state.errorMessage != null && (
              <ComBadrErrorMessageComp
                  message={[].concat(

                      this.state.errorMessage,
                  )}
              />
          )}

          {this.state.typeRecherche == null && (
              <ComBadrButtonRadioComp
                  onValueChange={(value) => this.setState({typeRecherche: value})}
                  disabled={false}
                  styleContainer={{
                    flexDirection: 'column',
                    padding: 10,
                    color: '#009ab2',
                  }}
                  value={String(this.state.typeRecherche)}
                  title={translate('initierControl.typeRecherche.typeRecherche')}
                  radioButtonsData={this.radioButtonsTypeRecherche}
              />
          )}

          {this.state.typeRecherche == '1' && (
              <RechercheRefDum
                  commande={'ded.initInitierControle'}
                  module="DED_LIB"
                  typeService="UC"
                  successRedirection={'DedInitierControleScreen'}
                  navigation={this.props.navigation}
                  routeParams={this.props.route.params}
              />
          )}

          {this.state.typeRecherche == '2' && (
              <View style={{flexDirection: 'column'}}>
                <View style={styles.viewPeriode}>
                  <Text style={styles.titlePeriode}>
                    {translate('initierControl.typeRecherche.periode')}
                  </Text>
                </View>
                <View style={CustomStyleSheet.verticalContainer20}>
                  <View style={CustomStyleSheet.row}>
                    <Row>
                      <Col>
                        <ComBadrDatePickerComp
                            dateFormat="DD/MM/yyyy"
                            value={
                              this.state.periodeDu
                                  ? moment(this.state.periodeDu, 'DD/MM/yyyy', true)
                                  : ''
                            }
                            onDateChanged={(date) =>
                                this.setState({
                                  periodeDu: date,
                                })
                            }
                            labelDate={translate('transverse.du')}
                            //   inputStyle={style.dateInputStyle}
                        />
                      </Col>
                      <Col>
                        <ComBadrDatePickerComp
                            dateFormat="DD/MM/yyyy"
                            value={
                              this.state.periodeAu
                                  ? moment(this.state.periodeAu, 'DD/MM/yyyy', true)
                                  : ''
                            }
                            onDateChanged={(date) =>
                                this.setState({
                                  periodeAu: date,
                                })
                            }
                            labelDate={translate('transverse.au')}
                            //   inputStyle={style.dateInputStyle}
                        />
                      </Col>
                    </Row>
                  </View>
                </View>
                <View style={{padding: 50}}>
                  <Button
                      onPress={this.confirmer}
                      icon="check"
                      compact="true"
                      mode="contained"
                      style={styles.btnConfirmer}
                      loading={this.props.showProgress}>
                    {translate('transverse.confirmer')}
                  </Button>
                </View>
              </View>
          )}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  titlePeriode: {
    color: '#009ab2',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 20,
  },
  viewPeriode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

function mapStateToProps(state) {
  //console.log('state mlv',state)
  return {...state.initierControlReducer};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(InitierCtrlRechercherScreen);
