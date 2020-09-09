import React from 'react';

/** React Components */
import {View, Text, ScrollView,PermissionsAndroid} from 'react-native';

/** Custom Components */
import {
  BadrTextInput,
  BadrErrorMessage,
  BadrButton,
  BadrProgressBar,
} from '../../../../commons/component';

/** REDUX **/
import {connect} from 'react-redux';
import * as SmsVerifyActionCreators from '../state/actions/habSmsVerifyAction';
import * as Constants from '../state/habSmsVerifyConstants';
import {CustomStyleSheet} from '../../../../commons/styles';
import {translate} from '../../../../commons/i18n/I18nHelper';
import {Session} from '../../../../commons/services/session/Session';
import {GeoFinder} from '../../../../commons/services/geo-location/GeoFinder';
import RNShake from 'react-native-shake';
class HabSmsVerifyScreen extends React.Component {

  /*
     Constructor
  */
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      login: Session.getInstance().getLogin(),
    };
  }

  componentWillMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      GeoFinder.synchronizeGeoPosition().then(()=> {});
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
  }

  /*
  componentDidMount Initialization
 */
  componentDidMount() {
    GeoFinder.synchronizeGeoPosition().then(()=> {});


    let action = SmsVerifyActionCreators.init({
      type: Constants.SMSVERIFY_INIT,
      value: {},
    });
    this.props.dispatch(action);
  }

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
