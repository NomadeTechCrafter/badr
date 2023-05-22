import {MODULE_DED} from '../../../../../commons/Config';
import {TYPE_SERVICE_UC} from '../../../../../commons/constants/ComGlobalConstants';
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';

const CODE_FONCTIONNALITE_INITIER_CONTROLE = 'cf100001';

export default class dedInitierControlApi {
  static initierControle = async (params) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: CODE_FONCTIONNALITE_INITIER_CONTROLE,
        module: MODULE_DED,
        commande: 'ded.initierControle',
        typeService: TYPE_SERVICE_UC,
      },
      jsonVO: params,
    };
    console.log('initierControle : ', data);
    let response = await ComHttpHelperApi.process(data);
    return response;
  };

  static initierListControle = async (params) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: CODE_FONCTIONNALITE_INITIER_CONTROLE,
        module: MODULE_DED,
        commande: 'ded.initierListControle',
        typeService: TYPE_SERVICE_UC,
      },
      jsonVO: params,
    };
    console.log('initierListControle : ', data);
    let response = await ComHttpHelperApi.process(data);
    return response;
  };
}
