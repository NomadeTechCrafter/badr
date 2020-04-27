/** NATIVE **/
import React from 'react';
import {View, Dimensions, ScrollView, Text} from 'react-native';

/** REDUX **/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
/**ACTIONS */
import * as Constants from '../../common/constants/auth';
import * as authAction from '../../redux/actions/auth';

/** i18n **/
import {translate} from '../../common/translations/i18n';

/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';

/** COMPONENTS **/
import {
  LoginTextInput,
  PasswordTextInput,
} from '../../components/inputs/TextInput';
import {BadrButton} from '../../components/buttons/Button';
import {BadrLoginHeader} from '../../components/header/Login';
import {BadrProgressBar} from '../../components/progressbars/BadrProgressBar';
import {BadrErrorMessage} from '../../components/messages/Error';
import {BadrInfoMessage} from '../../components/messages/Info';
import {BadrPicker} from '../../components/pickers/BadrPicker';

/** CONSTANTS **/
const screenHeight = Dimensions.get('window').height;

class Login extends React.Component {
  state = {
    login: '',
    password: '',
  };

  handleLogin = () => {
    var action = authAction.request(
      {
        type: Constants.AUTH_LOGIN_REQUEST,
        value: {login: this.state.login, pwd: this.state.password},
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  };

  componentDidMount() {
    var action = authAction.init({
      type: Constants.LOGIN_INIT,
      value: {},
    });
    this.props.dispatch(action);
  }
  render() {
    return (
      <ScrollView style={CustomStyleSheet.whiteContainer}>
        {this.props.showProgress && <BadrProgressBar width={screenHeight} />}
        <View style={CustomStyleSheet.centerContainer}>
          <BadrLoginHeader />
          <LoginTextInput onChangeText={text => this.setState({login: text}) } value ={this.state.login}/>
          <PasswordTextInput
            onChangeText={text => this.setState({password: text})}  value = {this.state.password}
          />
          <BadrButton
            onPress={this.handleLogin}
            text={translate('login.connexion')}
          />
          {!this.props.loggedIn && this.props.errorMessage != null && (
            <BadrErrorMessage message={this.props.errorMessage} />
          )}
        </View>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({...state.authReducer});

export default connect(
  mapStateToProps,
  null,
)(Login);
