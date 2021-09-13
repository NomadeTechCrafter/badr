import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';

export default class HabLoginApi {
  static login = async (login, pwd, forcerConnexion = false, isFromCohabitation) => {
    const response = await ComHttpHelperApi.login({
      login: login,
      password: pwd,
      forcerConnexion: forcerConnexion,
      isFromCohabitation: isFromCohabitation,
    });
    return response && response.data ? response.data : {};
  };

  static logout = async () => {
    const data = {
      login: ComSessionService.getInstance().getLogin(),
    };
    console.log('..................................logout....................................');
    console.log('..................................logout....................................');
    console.log('..................................logout....................................');
    console.log(JSON.stringify(data));
    console.log('..................................logout....................................');
    console.log('..................................logout....................................');
    console.log('..................................logout....................................');
    return await ComHttpHelperApi.logout(data);
  };
  static checkVersion = async () => {
    return await ComHttpHelperApi.checkVersion();
  };
}
