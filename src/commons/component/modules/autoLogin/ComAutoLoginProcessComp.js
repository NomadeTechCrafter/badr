/** RN Components **/
import React from 'react';
import {ComSessionService} from '../../../services/session/ComSessionService';
/** REDUX **/
import {connect} from 'react-redux';
import * as AutoLoginConstants from '../../../constants/components/ComAutoLoginConstants';
import * as autoLoginActions from '../../../ionic/state/actions/ComAutoLoginAction';

class ComAutoLoginProcessComp extends React.Component {
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
    /** charger les infos du user connecté **/
    ComSessionService.getInstance().setLogin(this.props.usr);
    ComSessionService.getInstance().setUserObject(this.props.usr);
    ComSessionService.getInstance().setPassword(this.props.password);
    ComSessionService.getInstance().setCodeSmsVerify(this.props.smsCode);
    ComSessionService.getInstance().setCodeBureau(this.props.bureauCode);
    ComSessionService.getInstance().setNomBureauDouane(this.props.bureau);
    ComSessionService.getInstance().setCodeArrondissement(
      this.props.arrondissementCode,
    );
    /** auto login action pour gerer la cohabitation RN Ionic**/
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
export default connect(mapStateToProps, null)(ComAutoLoginProcessComp);
