import {
  MODULE_T6BIS, TYPE_SERVICE_UC
} from '../../../../../commons/Config';
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

const T6BIS_MODIFICATION_FONCTIONNALITE = 'cf110002';
const T6BIS_REDRESSEMENT_FONCTIONNALITE = 'cf110005';
const T6BIS_RECHERCHE_FONCTIONNALITE = 'cf110007';

export default class T6bisRechercheApi {
  static t6bisInitForUpdate = async (t6bis) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin() ? ComSessionService.getInstance().getLogin():'AD6202',
        fonctionnalite: (ComSessionService.getInstance().getFonctionalite())?ComSessionService.getInstance().getFonctionalite(): T6BIS_MODIFICATION_FONCTIONNALITE,
        module: MODULE_T6BIS,
        commande: 'T6bisInitForUpdate',
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null

      },
      jsonVO: t6bis,
    };
    console.log('TEST');
    console.log(t6bis);
    console.log(data);
    console.log('TEST');
    return await ComHttpHelperApi.process(data);
  };
  static t6bisInitForRedresser = async (t6bis) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin() ? ComSessionService.getInstance().getLogin() : 'AD6202',
        fonctionnalite: (ComSessionService.getInstance().getFonctionalite()) ? ComSessionService.getInstance().getFonctionalite() : T6BIS_REDRESSEMENT_FONCTIONNALITE,
        module: MODULE_T6BIS,
        commande: 'T6bisInitForRedresser',
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null

      },
      jsonVO: t6bis,
    };
    return await ComHttpHelperApi.process(data);
  };
}
