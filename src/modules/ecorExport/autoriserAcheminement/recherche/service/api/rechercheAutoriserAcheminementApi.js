import { MODULE_ECOREXP, TYPE_SERVICE_UC } from '../../../../../../commons/Config';
import ComHttpHelperApi from '../../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';

const T6BIS_CREATION_FONCTIONNALITE = 'cf110001';

export default class RechercheAutoriserAcheminementApi {
  static initAutoriserAcheminement = async (dumVO) => {
    console.log('initAutoriserAcheminement');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_ECOREXP,
        commande: 'ece.initAutoriserAcheminement',
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: dumVO,
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };

 
}
