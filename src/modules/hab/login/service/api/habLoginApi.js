import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';

export default class HabLoginApi {
  static login = async (login, pwd, forcerConnexion = false) => {
    const response = await ComHttpHelperApi.login({
      login: login,
      password: pwd,
      forcerConnexion: forcerConnexion,
    });
    return response && response.data ? response.data : {};
  };

  static logout = async () => {
    const data = {
      login: ComSessionService.getInstance().getLogin(),
    };
    return await ComHttpHelperApi.logout(data);
  };
}
