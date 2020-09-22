import React from 'react';

/** React Components */
import {View, Text, ScrollView} from 'react-native';
import style from '../style/habSmsVerifyStyle';

/** Custom Components */
import {
  ComBadrTextInputComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrButtonComp,
  ComBadrProgressBarComp,
} from '../../../../commons/component';

/** REDUX **/
import {connect} from 'react-redux';
import * as SmsVerifyActionCreators from '../state/actions/habSmsVerifyAction';
import * as Constants from '../state/habSmsVerifyConstants';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import {ComGeoFinderService} from '../../../../commons/services/geo-location/ComGeoFinderService';
import RNShake from 'react-native-shake';
class HabSmsVerifyScreen extends React.Component {
  /*
     Constructor
  */
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      login: ComSessionService.getInstance().getLogin(),
    };
  }

  componentWillMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      ComGeoFinderService.synchronizeGeoPosition().then(() => {});
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
  }

  /*
  componentDidMount Initialization
 */
  componentDidMount() {
    ComGeoFinderService.synchronizeGeoPosition().then(() => {});

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

  onRenvoyerCodeClicked = () => {
    let action = SmsVerifyActionCreators.requestGenererCodeSms(
      {
        type: Constants.GENERERCODESMS_REQUEST,
        value: {},
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
            onPress={this.onConfirmClicked}
            text={translate('smsVerify.confirm')}
          />
          <ComBadrButtonComp
            style={style.btnSmsCode}
            onPress={this.onRenvoyerCodeClicked}
            text={translate('smsVerify.renvoyerCode')}
          />
          {!this.props.correct && this.props.displayError && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
          {this.props.correct && this.props.infoMessage && (
            <ComBadrInfoMessageComp
              message={translate('smsVerify.errorCodeGenerated')}
            />
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
