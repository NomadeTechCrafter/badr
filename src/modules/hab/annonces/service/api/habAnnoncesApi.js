import HttpHelper from '../../../../../commons/services/api/common/HttpHelper';
import {Session} from '../../../../../commons/services/session/Session';

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
        module: 'HAB_LIB',
        commande: 'confirmerConnexionAgent',
        typeService: 'SP',
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
