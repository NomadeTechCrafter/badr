import HttpHelper from '../../../../commons/services/api/common/http-helper';
import {CommonSession} from '../../../../commons/services/session/commonSession';

export default class HabAnnoncesApi {
  static confirmConnexion = async (
    codeBureau,
    listeProfilCoche,
    codeArrondissement,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: CommonSession.getInstance().getLogin(),
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
