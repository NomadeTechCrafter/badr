import _ from 'lodash';
import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
/**i18n */
import {translate} from '../../common/translations/i18n';
import {CustomStyleSheet} from '../../styles';
import {BadrErrorMessage, BadrProgressBar, Container} from '../index';

const screenWidth = Dimensions.get('window').width;
class RechecheRefAt extends Component {
  defaultState = {
    bureau: '',
    annee: '',
    numero: '',
    serie: '',
    login: '',
    showErrorMsg: false,
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidMount() {
    // var action = RechecheDumAction.init({
    //   type: Constants.RECHERCHEDUM_INITCONTROL_INIT,
    //   value: {},
    // });
    // this.props.dispatch(action);
    // load('user').then(user => {
    //   this.setState({login: JSON.parse(user).login});
    // });
  }
  onChangeInput = input => {
    let keyImput = _.keys(input)[0];
    this.setState({[keyImput]: input[keyImput].replace(/[^0-9]/g, '')});
  };

  addZeros = input => {
    let keyImput = _.keys(input)[0];
    if (input[keyImput] !== '') {
      this.setState({
        [keyImput]: _.padStart(input[keyImput], input['maxLength'], '0'),
      });
    }
  };
  retablir = () => {
    console.log('retablir');
    this.setState({...this.defaultState});
  };

  confirmer = () => {
    console.log('confirmer', this.props.successRedirection);
    // this.setState({showErrorMsg: true});
    // if (this.state.regime && this.state.serie) {
    //   this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);

    //   if (this.state.cle == this.state.cleValide) {
    //     var referenceDed =
    //       this.state.bureau +
    //       this.state.regime +
    //       this.state.annee +
    //       this.state.serie;
    //     var data = {
    //       referenceDed: referenceDed,
    //       numeroVoyage: this.state.numeroVoyage,
    //     };
    //     var action = RechecheDumAction.request(
    //       {
    //         type: Constants.RECHERCHEDUM_INITCONTROLE_REQUEST,
    //         value: {
    //           login: this.state.login,
    //           commande: this.props.commande,
    //           data: data,
    //           cle: this.state.cle,
    //         },
    //       },
    //       this.props.navigation,
    //       this.props.successRedirection,
    //     );
    //     this.props.dispatch(action);
    //     console.log('dispatch fired !!');
    //   }
    // }
  };
  _hasErrors = field => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };

  render() {
    return (
      <Container style={styles.container}>
        {this.props.showProgress && <BadrProgressBar width={screenWidth} />}
        {this.props.errorMessage != null && (
          <BadrErrorMessage message={this.props.errorMessage} />
        )}
        <View style={styles.containerInputs}>
          <View>
            <TextInput
              error={this._hasErrors('bureau')}
              maxLength={3}
              keyboardType={'number-pad'}
              value={this.state.bureau}
              label={translate('transverse.bureau')}
              onChangeText={val => this.onChangeInput({bureau: val})}
              onEndEditing={event =>
                this.addZeros({
                  bureau: event.nativeEvent.text,
                  maxLength: 3,
                })
              }
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
              visible={this._hasErrors('bureau')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.bureau'),
              })}
            </HelperText>
          </View>

          <View>
            <TextInput
              error={this._hasErrors('annee')}
              maxLength={4}
              keyboardType={'number-pad'}
              value={this.state.annee}
              label={translate('transverse.annee')}
              onChangeText={val => this.onChangeInput({annee: val})}
              onEndEditing={event =>
                this.addZeros({
                  annee: event.nativeEvent.text,
                  maxLength: 4,
                })
              }
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
              visible={this._hasErrors('annee')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.annee'),
              })}
            </HelperText>
          </View>

          <View>
            <TextInput
              error={this._hasErrors('numero')}
              maxLength={3}
              keyboardType={'number-pad'}
              value={this.state.numero}
              label={translate('transverse.numero')}
              onChangeText={val => this.onChangeInput({numero: val})}
              onEndEditing={event =>
                this.addZeros({
                  serie: event.nativeEvent.text,
                  maxLength: 3,
                })
              }
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
              visible={this._hasErrors('numero')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.numero'),
              })}
            </HelperText>
          </View>

          <View>
            <TextInput
              error={this._hasErrors('serie')}
              maxLength={7}
              keyboardType={'number-pad'}
              value={this.state.serie}
              label={translate('transverse.serie')}
              onChangeText={val => this.onChangeInput({serie: val})}
              onEndEditing={event =>
                this.addZeros({
                  serie: event.nativeEvent.text,
                  maxLength: 7,
                })
              }
              style={CustomStyleSheet.largeInput}
            />
            <HelperText
              type="error"
              padding="none"
              visible={this._hasErrors('serie')}>
              {translate('errors.donneeObligatoire', {
                champ: translate('transverse.serie'),
              })}
            </HelperText>
          </View>
        </View>

        <View style={styles.containerBtn}>{this.props.children}</View>
      </Container>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  containerInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  cleHelperMsg: {width: 150},
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
};

const mapStateToProps = state => ({...state.controleRechercheDumReducer});

export default connect(
  mapStateToProps,
  null,
)(RechecheRefAt);
