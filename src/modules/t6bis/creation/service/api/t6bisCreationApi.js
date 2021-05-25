import {
  MODULE_T6BIS, TYPE_SERVICE_SP, TYPE_SERVICE_UC
} from '../../../../../commons/Config';
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

const T6BIS_CREATION_FONCTIONNALITE = 'cf110001';

export default class T6bisCreationApi {
  static getAllTypeT6bis = async () => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin() ? ComSessionService.getInstance().getLogin():'AD6202',
        fonctionnalite: T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_T6BIS,
        commande: 'getAllTypeT6bis',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null

      },
      jsonVO: '',
    };
    return await ComHttpHelperApi.process(data);
  };

  static t6bisInitForCreate = async (codeType) => {
    console.log('t6bisInitForCreate');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_T6BIS,
        commande: 'T6bisInitForCreate',
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: {
        "utilisateur": { "idActeur": ComSessionService.getInstance().getLogin(), "refBureau": { "codeBureau": ComSessionService.getInstance().getCodeBureau(), "refArrondissement": [] } },
        "codeTypeT6bis": codeType,
        "bureauCourant": { "codeBureau": ComSessionService.getInstance().getCodeBureau(), "refArrondissement": [] }
      },
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };

  static initT6bisEnteteSection = async (codeType) => {
    console.log('initT6bisEnteteSection');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_T6BIS,
        commande: 'initT6bisEnteteSection',
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      t6bisMtmDto: {
        codeTypeT6bis: codeType
      },
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };

}
