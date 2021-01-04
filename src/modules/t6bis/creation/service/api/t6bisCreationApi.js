import {
  MODULE_T6BIS, TYPE_SERVICE_SP
} from '../../../../../commons/Config';
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';



export default class T6bisCreationApi {
  static getAllTypeT6bis = async () => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin() ? ComSessionService.getInstance().getLogin():'AD6202',
        fonctionnalite: 'cf110001',
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

}
