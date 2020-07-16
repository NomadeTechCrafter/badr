import HttpHelper from '../../../../services/api/common/http-helper';
import {Session} from '../../../../common/session';

export default class LoginApi {
  static login = async (login, pwd) => {
    const response = await HttpHelper.login({
      login: login,
      password: pwd,
      forcerConnexion: true,
    });
    return response && response.data ? response.data : {};
  };

  static logout = async () => {
    const data = {
      login: Session.getInstance().getLogin(),
    };
    return await HttpHelper.logout(data);
  };
}
