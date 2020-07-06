import React from 'react';

/** React Components */
import {View, Text, Dimensions, ScrollView} from 'react-native';

/** Custom Components */
import {
  BadrTextInput,
  BadrErrorMessage,
  BadrInfoMessage,
  BadrButton,
  BadrProgressBar,
} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';
import * as SmsVerifyActionCreators from '../../../redux/actions/hab/smsVerify';

/**ACTIONS */
import * as Constants from '../../../common/constants/hab/smsVerify';

/**i18n */
import {translate} from '../../../common/translations/i18n';

/**Styling */
import {CustomStyleSheet} from '../../../styles/index';

/** Inmemory session */
import {Session} from '../../../common/session';

class SmsVerify extends React.Component {
  state = {
    code: '',
    login: Session.getInstance().getLogin(),
  };

  onConfirmerClicked = () => {
    var action = SmsVerifyActionCreators.request(
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
    var action = SmsVerifyActionCreators.init({
      type: Constants.SMSVERIFY_INIT,
      value: {},
    });
    this.props.dispatch(action);
  }

  render() {
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

const mapStateToProps = (state) => {
  return {
    ...state.smsVerifyReducer,
  };
};

export default connect(mapStateToProps, null)(SmsVerify);
