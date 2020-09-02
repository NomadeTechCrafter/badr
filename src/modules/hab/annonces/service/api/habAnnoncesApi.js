import HttpHelper from '../../../../../commons/services/api/common/HttpHelper';
import {Session} from '../../../../../commons/services/session/Session';
import {TYPE_SERVICE_SP, MODULE_HAB} from '../../../../../commons/Config';
export default class HabAnnoncesApi {
  static confirmConnexion = async (
    codeBureau,
    listeProfilCoche,
    codeArrondissement,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
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
    return await HttpHelper.process(data);
  };
}
