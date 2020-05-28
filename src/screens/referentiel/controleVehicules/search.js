import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import {TextInput, Headline, Subheading} from 'react-native-paper';

/**Custom Components */
import {BadrTable, BadrButtonIcon, BadrItemsPicker} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';
import * as ConstantsControleVehicules from '../../../common/constants/referentiel/controleVehicules';
import * as controleVehiculesAction from '../../../redux/actions/referentiel/controleVehicules';

/** Storage **/
import {loadParsed} from '../../../services/storage-service';

/**Styling */
import {CustomStyleSheet} from '../../../styles/index';

/** i18n **/
import {translate} from '../../../common/translations/i18n';

/** Inmemory session */
import {Session} from '../../../common/session';

class ControleVehiculesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: Session.getInstance().getLogin(),
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
    var action = controleVehiculesAction.init({value: {}});
    return action;
  };

  buildSearchControleVehiculesAction = login => {
    var action = controleVehiculesAction.request({
      type: ConstantsControleVehicules.CONTROLE_VEHICULE_REQUEST,
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
    console.log(v);
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
              label={translate('referentiel.controleVehicules.numeroChassis')}
              value={this.state.numeroChassis}
              onChangeText={text => this.setState({numeroChassis: text})}
            />

            <TextInput
              style={CustomStyleSheet.column}
              mode="outlined"
              label={translate(
                'referentiel.controleVehicules.numeroCarteGrise',
              )}
              value={this.state.numeroCarteGrise}
              onChangeText={text => this.setState({numeroCarteGrise: text})}
            />
          </View>

          <View style={CustomStyleSheet.row}>
            <TextInput
              style={CustomStyleSheet.column}
              mode="outlined"
              label={translate('referentiel.controleVehicules.matricule')}
              value={this.state.matricule}
              onChangeText={text => this.setState({matricule: text})}
            />
            <BadrItemsPicker
              style={CustomStyleSheet.column}
              label={translate('referentiel.controleVehicules.choose_status')}
              selectedValue={this.state.status}
              items={ConstantsControleVehicules.status}
              onValueChanged={(v, i) => this.onStatusChanged(v, i)}
            />
          </View>
        </View>

        <View style={CustomStyleSheet.verticalActionsContainer}>
          <BadrButtonIcon
            onPress={() => this.handleSearch()}
            icon="magnify"
            loading={this.props.showProgress}
            text={translate('transverse.rechercher')}
          />
          <BadrButtonIcon
            onPress={() => this.handleClear()}
            icon="autorenew"
            style={{marginTop: 15}}
            text={translate('transverse.retablir')}
          />
        </View>
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
)(ControleVehiculesSearch);
