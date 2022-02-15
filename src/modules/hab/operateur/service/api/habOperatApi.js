import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import {TYPE_SERVICE_SP, MODULE_HAB} from '../../../../../commons/Config';
export default class HabProfileApi {
  static confirmConnexionDeclarant = async (
    operateur
  ) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: MODULE_HAB,
        commande: 'confirmerConnexionDeclarant',
        typeService: TYPE_SERVICE_SP,
      },
      jsonVO: operateur
      ,
    };
    return await ComHttpHelperApi.process(data);
  };
}
