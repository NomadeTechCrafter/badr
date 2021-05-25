import React from 'react';
import {ScrollView, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
/**Custom Components */
import {
  ComBadrButtonIconComp,
  ComBadrItemsPickerComp,
} from '../../../../commons/component';
/** REDUX **/
import {connect} from 'react-redux';
import {
  CONTROLE_VEHICULE_REQUEST,
  status,
} from '../state/refControleVehiculeConstants';
import {init, request} from '../state/actions/refControleVehiculeAction';
/**Styling */
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import style from '../style/refControleVehiculeStyle';
/** i18n **/
/** Inmemory session */
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import translate from '../../../../commons/i18n/ComI18nHelper';

class RefControleVehiculeSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: ComSessionService.getInstance().getLogin(),
      status: '',
      numeroChassis: '',
      numeroCarteGrise: '',
      matricule: '',
    };
  }

  handleSearch = () => {
    let action = this.buildSearchControleVehiculesAction(this.state.login);
    this.props.actions.dispatch(action);
  };

  handleClear = () => {
    this.setState({
      status: '',
      numeroChassis: '',
      numeroCarteGrise: '',
      matricule: '',
    });
  };

  buildInitControleVehiculesAction = () => {
    let action = init({value: {}});
    return action;
  };

  buildSearchControleVehiculesAction = (login) => {
    let action = request({
      type: CONTROLE_VEHICULE_REQUEST,
      value: {
        login: login,
        numeroChassis: this.state.numeroChassis,
        status: this.state.status,
        matricule: this.state.matricule,
        numeroCarteGrise: this.state.numeroCarteGrise,
      },
    });
    this.props.navigation.navigate('Resultat', {
      login: this.state.login,
      first: true,
    });
    return action;
  };

  componentDidMount() {
    let action = this.buildInitControleVehiculesAction();
    this.props.actions.dispatch(action);
  }

  onStatusChanged = (v, i) => {
    this.setState({status: v});
  };

  render() {
    return (
      <ScrollView>
        <View style={CustomStyleSheet.verticalContainer20}>
          <View style={CustomStyleSheet.row}>
            <TextInput
              style={CustomStyleSheet.column}
              mode="outlined"
              label={translate('controleVehicules.numeroChassis')}
              value={this.state.numeroChassis}
              onChangeText={(text) => this.setState({numeroChassis: text})}
            />

            <TextInput
              style={CustomStyleSheet.column}
              mode="outlined"
              label={translate('controleVehicules.numeroCarteGrise')}
              value={this.state.numeroCarteGrise}
              onChangeText={(text) => this.setState({numeroCarteGrise: text})}
            />
          </View>

          <View style={CustomStyleSheet.row}>
            <TextInput
              style={CustomStyleSheet.column}
              mode="outlined"
              label={translate('controleVehicules.matricule')}
              value={this.state.matricule}
              onChangeText={(text) => this.setState({matricule: text})}
            />
            <ComBadrItemsPickerComp
              style={CustomStyleSheet.column}
              label={translate('controleVehicules.choose_status')}
              selectedValue={this.state.status}
              items={status}
              onValueChanged={(v, i) => this.onStatusChanged(v, i)}
            />
          </View>
        </View>

        <Grid>
          <Row>
            <Col size={20} />
            <Col size={30}>
              <ComBadrButtonIconComp
                onPress={() => this.handleSearch()}
                icon="magnify"
                style={style.buttonIcon}
                loading={this.props.showProgress}
                text={translate('transverse.rechercher')}
              />
            </Col>
            <Col size={30}>
              <ComBadrButtonIconComp
                onPress={() => this.handleClear()}
                icon="autorenew"
                style={style.buttonIcon}
                text={translate('transverse.retablir')}
              />
            </Col>
            <Col size={20} />
          </Row>
        </Grid>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.controleVehiculesReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RefControleVehiculeSearchScreen);
