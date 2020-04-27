import React from 'react';

import {View, Text, Dimensions, ScrollView} from 'react-native';

/** REDUX **/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../common/constants/smsVerify';

/**i18n */
import {translate} from '../../common/translations/i18n';

import * as SmsVerifyActionCreators from '../../redux/actions/smsVerify';
import * as ConfirmConnexionActionCreators from '../../redux/actions/confirmCnx';

import {BadrButton} from '../../components/buttons/Button';
import {BadrTextInput} from '../../components/inputs/TextInput';
import {BadrErrorMessage} from '../../components/messages/Error';
import {BadrInfoMessage} from '../../components/messages/Info';
import {BadrProgressBar} from '../../components/progressbars/BadrProgressBar';

import {CustomStyleSheet} from '../../styles/index';

import {load} from '../../services/storage-service';

/** CONSTANTS **/
const screenHeight = Dimensions.get('window').height;

class SmsVerify extends React.Component {
  state = {
    code: '000000',
    login: '',
  };

  onConfirmerClicked = () => {
    var action = SmsVerifyActionCreators.request(
      {
        type: Constants.SMSVERIFY_REQUEST,
        value: {code: this.state.code, login: this.state.login},
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
    console.log('dispatch fired !!');
  };

  handleTextChanged = text => {
    this.setState({smsCode: text});
  };

  componentDidMount() {
    var action = SmsVerifyActionCreators.init({
      type: Constants.SMSVERIFY_INIT,
      value: {},
    });
    this.props.dispatch(action);
    load('user').then(user => {
      this.setState({login: JSON.parse(user).login});
    });
  }

  render() {
    return (
      <ScrollView style={CustomStyleSheet.whiteContainer}>
        {(this.props.showProgress || this.props.showProgressConfirmCnx) && (
          <BadrProgressBar width={screenHeight} />
        )}

        <Text style={CustomStyleSheet.centeredText}>
          {translate('smsVerify.message')}
        </Text>
        <View style={CustomStyleSheet.centerContainer}>
          <BadrTextInput
            maxLength={6}
            keyboardType="numeric"
            placeholder={translate('smsVerify.codePlaceholder')}
            onChangeText={text => this.setState({code: text})}
            value={this.state.code}
          />
          <BadrButton
            onPress={this.onConfirmerClicked}
            text={translate('smsVerify.confirm')}
          />

          {!this.props.correct && this.props.displayError && (
            <BadrErrorMessage message={this.props.errorMessage} />
          )}

          {!this.props.confirmed && this.props.showProgressConfirmCnx && (
            <BadrInfoMessage
              message={translate('info.smsVerify.confirmConnexionPending')}
            />
          )}

          {!this.props.correct && this.props.showProgress && (
            <BadrInfoMessage message={translate('info.pleasewait')} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.confirmConnexionReducer,
    ...state.smsVerifyReducer,
  };
};

export default connect(
  mapStateToProps,
  null,
)(SmsVerify);
