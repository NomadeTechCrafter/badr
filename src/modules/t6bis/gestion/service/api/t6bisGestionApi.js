import {
  MODULE_T6BIS, TYPE_SERVICE_SP, MODULE_REF
} from '../../../../../commons/Config';
import { TYPE_SERVICE_UC } from '../../../../../commons/constants/ComGlobalConstants';
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

const T6BIS_CREATION_FONCTIONNALITE = 'cf110001';

export default class T6bisGestiontionApi {
  static initT6bisEnteteSection = async (codeType) => {
    console.log('initT6bisEnteteSection');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() :T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_T6BIS,
        commande: 'initT6bisEnteteSection',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: {
        t6bisMtmDto: {
          codeTypeT6bis: codeType
        }
      },
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };

  static findIntervenant = async (identifiants) => {
    console.log('findIntervenant');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() :T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_REF,
        commande: 'findIntervenant',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: identifiants
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };

  static getUniteByCode = async (identifiants) => {
    console.log('getUniteByCode');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite():T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_REF,
        commande: 'getUniteByCode',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: identifiants
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };
  static getCmbOperateurByCode = async (identifiant) => {
    console.log('getCmbOperateurByCode');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_REF,
        commande: 'getCmbOperateurByCode',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: identifiant
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };
  
  
  static sauvegarderT6BIS = async (cmd,t6bis) => {
    console.log('sauvegarderT6BIS');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_T6BIS,
        commande: cmd,
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: t6bis
    };
    console.log('sauvegarderT6BIS',data);
    return await ComHttpHelperApi.process(data);
  };

  static supprimerT6BIS = async (cmd, t6bis) => {
    console.log('supprimerT6BIS');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_T6BIS,
        commande: cmd,
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: t6bis
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };

  static enregistrerT6BIS = async (cmd, t6bis) => {
    console.log('enregistrerT6BIS');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_T6BIS,
        commande: cmd,
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: t6bis
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };

}
