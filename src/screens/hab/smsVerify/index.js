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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SmsVerifyActionCreators from '../../../redux/actions/hab/smsVerify';

/**ACTIONS */
import * as Constants from '../../../common/constants/hab/smsVerify';

/**i18n */
import {translate} from '../../../common/translations/i18n';

/**Styling */
import {CustomStyleSheet} from '../../../styles/index';

/**Storage */
import {loadParsed} from '../../../services/storage-service';


/** CONSTANTS **/
const screenWidth = Dimensions.get('window').width;

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
    loadParsed('user').then(user => {
      this.setState({login: user.login});
    });
  }

  render() {
    return (
      <ScrollView style={CustomStyleSheet.whiteContainer}>
        {(this.props.showProgress || this.props.showProgressConfirmCnx) && (
          <BadrProgressBar width={screenWidth} />
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
    ...state.smsVerifyReducer,
  };
};

export default connect(
  mapStateToProps,
  null,
)(SmsVerify);
