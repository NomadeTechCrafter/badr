import React from 'react';
import HabLoginApi from '../../../../modules/hab/login/service/api/habLoginApi';
import HabSmsVerifyApi from '../../../../modules/hab/smsVerify/service/api/habSmsVerifyApi';
import HabProfileApi from '../../../../modules/hab/profile/service/api/habProfileApi';
import {Session} from '../../../services/session/Session';

import {connect} from 'react-redux';

import {
  getAndroidId,
  getDeviceName,
  getManufacturer,
  getModel,
  getSystemVersion,
} from 'react-native-device-info';
/** Device informations */
import {saveStringified} from '../../../services/async-storage/storage-service';

import * as AutoLoginConstants from '../../../../commons/constants/components/autoLogin';
import * as autoLoginActions from '../../../../commons/state/actions/autoLoginAction';

class AutoLoginProcess extends React.Component {
  constructor(props) {
    super(props);
  }

  connect = async () => {
    console.log('connecting ...');
    return await this.shortAuth();
  };

  render = () => {
    return <></>;
  };

  componentDidMount = () => {
    console.log('this.props.usr');
    console.log(this.props.usr);
    Session.getInstance().setLogin(this.props.usr);
    Session.getInstance().setPassword(this.props.password);
    Session.getInstance().setCodeSmsVerify(this.props.smsCode);
    Session.getInstance().setCodeBureau(this.props.bureauCode);
    Session.getInstance().setCodeArrondissement(this.props.arrondissementCode);
    let action = autoLoginActions.request(
      {
        type: AutoLoginConstants.AUTOLOGIN_REQUEST,
        value: {
          usr: this.props.usr,
          password: this.props.password,
          smsCode: this.props.smsCode,
          bureauCode: this.props.bureauCode,
          bureau: this.props.bureau,
          arrondissementCode: this.props.arrondissementCode,
          arrondissement: this.props.arrondissement,
          profiles: this.props.profiles,
        },
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  };
}

const mapStateToProps = (state) => ({...state.loginReducer});
export default connect(mapStateToProps, null)(AutoLoginProcess);
