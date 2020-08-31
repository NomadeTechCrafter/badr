import React from 'react';
import {Session} from '../../../services/session/Session';
import {connect} from 'react-redux';
import * as AutoLoginConstants from '../../../constants/components/AutoLoginConstants';
import * as autoLoginActions from '../../../state/actions/AutoLoginAction';

class AutoLoginProcess extends React.Component {
  constructor(props) {
    super(props);
  }

  connect = async () => {
    return await this.shortAuth();
  };

  render = () => {
    return <></>;
  };

  componentDidMount = () => {
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
