import {
  MODULE_DED
} from '../../../../../commons/Config';
import { TYPE_SERVICE_UC } from '../../../../../commons/constants/ComGlobalConstants';
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

const CODE_FONCTIONNALITE_CONFIRMATION_RECEPTION='cf2243'

export default class DedConfirmerReceptionApi {
  static initConfirmerReception = async (params) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: CODE_FONCTIONNALITE_CONFIRMATION_RECEPTION,
        module: MODULE_DED,
        commande: 'ded.InitConfirmerReception',
        typeService: TYPE_SERVICE_UC,
      },
      jsonVO: params,
    };
    console.log('initConfirmerReception : ',data);
    let response = await ComHttpHelperApi.process(data);
    return response;
  };


  static confirmerCertificatReception = async (params) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf2243',
        module: 'DED_LIB',
        commande: 'ded.ConfirmerReception',
        typeService: TYPE_SERVICE_UC,
      },
      jsonVO: params,
    };
    console.log('confirmerCertificatReception : ',data)
    let response = await ComHttpHelperApi.process(data);
    return response;
  };
 

}
