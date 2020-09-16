import React from 'react';

/** React Components */
import {View, Text, Dimensions, ScrollView} from 'react-native';

/** Custom Components */
import {
  ComBadrTextInputComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrButtonComp,
  ComBadrProgressBarComp,
} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';
import * as SmsVerifyActionCreators from '../../../redux/actions/hab/smsVerify';

/**ACTIONS */
import * as Constants from '../../../common/constants/hab/smsVerify';

/**i18n */
import {translate} from '../../../../commons/i18n/I18nHelper';

/**Styling */
import {CustomStyleSheet} from '../../../styles/index';

/** Inmemory session */
import {Session} from '../../../../commons/services/session/Session';

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
          <ComBadrProgressBarComp />
        )}
        <Text style={CustomStyleSheet.centeredText}>
          {translate('smsVerify.message')}
        </Text>
        <View style={CustomStyleSheet.centerContainer}>
          <ComBadrTextInputComp
            maxLength={6}
            keyboardType="numeric"
            placeholder={translate('smsVerify.codePlaceholder')}
            onChangeText={(text) => this.setState({code: text})}
            value={this.state.code}
          />
          <ComBadrButtonComp
            onPress={this.onConfirmerClicked}
            text={translate('smsVerify.confirm')}
          />

          {!this.props.correct && this.props.displayError && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}

          {!this.props.confirmed && this.props.showProgressConfirmCnx && (
            <ComBadrInfoMessageComp
              message={translate('info.smsVerify.confirmConnexionPending')}
            />
          )}

          {!this.props.correct && this.props.showProgress && (
            <ComBadrInfoMessageComp message={translate('info.pleasewait')} />
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
