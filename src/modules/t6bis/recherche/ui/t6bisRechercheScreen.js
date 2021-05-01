import _ from 'lodash';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button, Checkbox, HelperText, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  ComBadrErrorMessageComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import {primaryColor} from '../../../../commons/styles/ComThemeStyle';
import * as t6bisConstants from '../../utils/t6bisConstants';
import {isRedressement} from '../../utils/t6bisUtils';
import t6bisInitForRedresser from '../state/actions/t6bisInitForRedresser';
import t6bisInitForUpdateAction from '../state/actions/t6bisInitForUpdateAction';
import * as Constantes from '../state/t6bisRechercheConstants';
import styles from '../style/t6bisRechercheStyle';

class T6bisRecherche extends React.Component {
  defaultState = {
    showErrorMsg: false,
    mode: t6bisConstants.MODE_UPDATE,
    bureau: ComSessionService.getInstance().getCodeBureau(),
    annee: null,
    serie: null,
    title: isRedressement()
      ? translate('t6bisrecherche.redressmenttitle')
      : translate('t6bisrecherche.title'),

    t6bis: {
      enregistree: false,
      annee: '',
      utilisateur: {idActeur: ComSessionService.getInstance().getLogin()},
      bureauCourant: {
        codeBureau: ComSessionService.getInstance().getCodeBureau(),
        refArrondissement: [],
      },
    },
  };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  componentDidMount() {
    this.setState({
      title: isRedressement()
        ? translate('t6bisrecherche.redressmenttitle')
        : translate('t6bisrecherche.title'),
    });
  }

  //accept just Number
  onChangeInput = (input) => {
    let keyImput = _.keys(input)[0];
    this.setState({[keyImput]: input[keyImput].replace(/[^0-9]/g, '')});
  };

  addZeros = (input) => {
    let keyImput = _.keys(input)[0];
    if (input[keyImput] !== '') {
      let value = _.padStart(input[keyImput], input.maxLength, '0');
      this.setState({
        [keyImput]: value,
      });
      this.state[keyImput] = value;
    }
  };
  abandonner = () => {
    console.log('retablir');
    this.setState({...this.defaultState});
  };

  completeTextInputFields = () => {
    this.addZeros({
      bureau: this.state.bureau,
      maxLength: 3,
    });
    this.addZeros({
      annee: this.state.annee,
      maxLength: 4,
    });
    this.addZeros({
      serie: this.state.serie,
      maxLength: 7,
    });
  };

  valider = () => {
    console.log(this.state);
    if (isRedressement()) {
      console.log('Redressement');
      this.setState({mode: t6bisConstants.MODE_REDRESSEMENT});
    } else {
      this.setState({mode: t6bisConstants.MODE_UPDATE});
    }
    this.completeTextInputFields();
    console.log(this.state);
    if (this.state.mode === 'redressement') {
      this.state.t6bis.referenceEnregistrement =
        this.state.bureau + '' + this.state.annee + '' + this.state.serie;
    } else if (!this.state.t6bis.enregistree) {
      console.log('1', this.state.t6bis.enregistree);
      this.state.t6bis.referenceProvisoire =
        this.state.bureau + '' + this.state.annee + '' + this.state.serie;
    } else {
      console.log('2', this.state.t6bis.enregistree);
      this.state.t6bis.referenceEnregistrement =
        this.state.bureau + '' + this.state.annee + '' + this.state.serie;
    }
    console.log('Search by : ');

    this.state.t6bis = {
      ...this.state.t6bis,
      annee: this.state.annee,
      bureauCourant: {
        ...this.state.t6bis.bureauCourant,
        codeBureau: this.state.bureau,
      },
    };
    let action = null;
    console.log(
      'Redressement ---------------------------------------------------------15022021----------> ',
      this.state.t6bis,
    );
    if (isRedressement()) {
      action = t6bisInitForRedresser.request(
        {
          type: Constantes.T6BIS_INIT_FOR_REDRESSER_REQUEST,
          value: {
            t6bis: this.state.t6bis,
            mode: t6bisConstants.MODE_REDRESSEMENT,
          },
        },
        this.props.navigation,
      );
    } else {
      action = t6bisInitForUpdateAction.request(
        {
          type: Constantes.T6BIS_INIT_FOR_UPDATE_REQUEST,
          value: {
            t6bis: this.state.t6bis,
            mode: 'update',
            title: translate('t6bisrecherche.title'),
          },
        },
        this.props.navigation,
      );
    }
    this.props.actions.dispatch(action);
  };
  _hasErrors = (field) => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };

  getTitre = () => {
    console.log('getTitre  this.props  : ', this.props?.route?.params.title);
    return this.props?.route?.params.title;
  };

  render() {
    console.log('6bisRecherche  ', this.props);
    console.log('6bisRecherche  ', this.state);
    return (
      <ScrollView>
        <View style={styles.container}>
          <ComBadrToolbarComp
            navigation={this.props.navigation}
            icon="menu"
            title={this.getTitre()}
          />
          {this.props.errorMessage != null && (
            <View style={styles.messages}>
              <ComBadrErrorMessageComp
                style={styles.centerErrorMsg}
                message={this.props.errorMessage}
              />
            </View>
          )}
          <View>
            <Text style={styles.labelTextStyle}>
              {translate('t6bisrecherche.fields.referenceT6bis')}
            </Text>
          </View>
          <View style={styles.ComContainerCompInputs}>
            <View style={{width: 150, marginTop: 50}}>
              <TextInput
                error={this._hasErrors('bureau')}
                maxLength={3}
                keyboardType={'number-pad'}
                value={this.state.bureau}
                label={translate('transverse.bureau')}
                onChangeText={(val) => this.onChangeInput({bureau: val})}
                onEndEditing={(event) =>
                  this.addZeros({
                    bureau: event.nativeEvent.text,
                    maxLength: 3,
                  })
                }
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
            <View style={{width: 150, marginTop: 50}}>
              <TextInput
                error={this._hasErrors('annee')}
                maxLength={4}
                keyboardType={'number-pad'}
                value={this.state.annee}
                label={translate('transverse.annee')}
                onChangeText={(val) => this.onChangeInput({annee: val})}
                onEndEditing={(event) =>
                  this.addZeros({
                    annee: event.nativeEvent.text,
                    maxLength: 4,
                  })
                }
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
            <View style={{width: 150, marginTop: 50}}>
              <TextInput
                error={this._hasErrors('serie')}
                maxLength={7}
                keyboardType={'number-pad'}
                value={this.state.serie}
                label={translate('transverse.serie')}
                onChangeText={(val) => this.onChangeInput({serie: val})}
                onEndEditing={(event) =>
                  this.addZeros({
                    serie: event.nativeEvent.text,
                    maxLength: 7,
                  })
                }
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

          {!_.isEmpty(this.state.bureau) &&
            !_.isEmpty(this.state.annee) &&
            !_.isEmpty(this.state.serie) && (
              <View style={styles.enregistreeStyle}>
                <Checkbox.Item
                  status={
                    this.state.t6bis.enregistree ? 'checked' : 'unchecked'
                  }
                  label={translate('t6bisrecherche.fields.enregistree')}
                  color={primaryColor}
                  onPress={() => {
                    this.setState({
                      t6bis: {
                        ...this.state.t6bis,
                        enregistree: !this.state.t6bis.enregistree,
                      },
                    });
                    this.completeTextInputFields();
                  }}
                />
              </View>
            )}

          {!_.isEmpty(this.state.bureau) &&
            !_.isEmpty(this.state.annee) &&
            !_.isEmpty(this.state.serie) && (
              <View style={styles.ComContainerCompBtn}>
                <Button
                  onPress={this.valider}
                  icon="check"
                  compact="true"
                  mode="contained"
                  style={styles.btnValider}
                  loading={this.props.showProgress}>
                  {translate('transverse.valider')}
                </Button>
                <Button
                  onPress={this.abandonner}
                  icon="autorenew"
                  mode="contained"
                  style={styles.btnAbandonner}>
                  {translate('transverse.abandonner')}
                </Button>
              </View>
            )}
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.t6bisRechercheReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(T6bisRecherche);
