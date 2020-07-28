import HttpHelper from '../../../../../commons/services/api/common/HttpHelper';
import {Session} from '../../../../../commons/services/session/Session';

export default class HabLoginApi {
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
