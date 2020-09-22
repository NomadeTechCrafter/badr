import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import {TYPE_SERVICE_SP, MODULE_HAB} from '../../../../../commons/Config';
export default class HabProfileApi {
  static confirmConnexion = async (
    codeBureau,
    listeProfilCoche,
    codeArrondissement,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: MODULE_HAB,
        commande: 'confirmerConnexionAgent',
        typeService: TYPE_SERVICE_SP,
      },
      jsonVO: {
        codeArrondissement: codeArrondissement,
        codeBureau: codeBureau,
        listProfilsCoche: listeProfilCoche,
      },
    };
    return await ComHttpHelperApi.process(data);
  };
}
