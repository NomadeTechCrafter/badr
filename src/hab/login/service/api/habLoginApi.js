import HttpHelper from '../../../../services/api/common/http-helper';
import {CommonSession} from '../../../../commons/services/session/commonSession';

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
      login: CommonSession.getInstance().getLogin(),
    };
    return await HttpHelper.logout(data);
  };
}
