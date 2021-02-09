import {
  MODULE_T6BIS, TYPE_SERVICE_SP, MODULE_REF
} from '../../../../../commons/Config';
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

const T6BIS_CREATION_FONCTIONNALITE = 'cf110001';

export default class T6bisGestiontionApi {
  static initT6bisEnteteSection = async (codeType) => {
    console.log('initT6bisEnteteSection');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: T6BIS_CREATION_FONCTIONNALITE,
        module: MODULE_T6BIS,
        commande: 'initT6bisEnteteSection',
        typeService: TYPE_SERVICE_SP,
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

  static findIntervenant = async (identifiants) => {
    console.log('findIntervenant');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: T6BIS_CREATION_FONCTIONNALITE,
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
  
  

}
