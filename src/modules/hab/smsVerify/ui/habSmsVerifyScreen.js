import React from 'react';

/** React Components */
import {View, Text, ScrollView} from 'react-native';

/** Custom Components */
import {
  BadrTextInput,
  BadrErrorMessage,
  BadrInfoMessage,
  BadrButton,
  BadrProgressBar,
} from '../../../../commons/component';

/** REDUX **/
import {connect} from 'react-redux';
import * as SmsVerifyActionCreators from '../state/actions/habSmsVerifyAction';
import * as Constants from '../state/habSmsVerifyConstants';
import {CustomStyleSheet} from '../../../../commons/styles';
import {translate} from '../../../../commons/i18n';
import {Session} from '../../../../commons/services/session/Session';

class HabSmsVerifyScreen extends React.Component {
  state = {
    code: '',
    login: Session.getInstance().getLogin(),
  };

  onConfirmClicked = () => {
    let action = SmsVerifyActionCreators.request(
      {
        type: Constants.SMSVERIFY_REQUEST,
        value: {code: this.state.code},
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  };

  handleTextChanged = (text) => {
    this.setState({smsCode: text});
  };

  componentDidMount() {
    let action = SmsVerifyActionCreators.init({
      type: Constants.SMSVERIFY_INIT,
      value: {},
    });
    this.props.dispatch(action);
  }

  render = () => {
    return (
      <ScrollView style={CustomStyleSheet.whiteContainer}>
        {(this.props.showProgress || this.props.showProgressConfirmCnx) && (
          <BadrProgressBar />
        )}
        <Text style={CustomStyleSheet.centeredText}>
          {translate('smsVerify.message')}
        </Text>
        <View style={CustomStyleSheet.centerContainer}>
          <BadrTextInput
            maxLength={6}
            keyboardType="numeric"
            placeholder={translate('smsVerify.codePlaceholder')}
            onChangeText={(text) => this.setState({code: text})}
            value={this.state.code}
          />
          <BadrButton
            onPress={this.onConfirmClicked}
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
  };
}

const mapStateToProps = (state) => {
  return {
    ...state.smsVerifyReducer,
  };
};

export default connect(mapStateToProps, null)(HabSmsVerifyScreen);
