import HttpHelper from '../../../../../commons/services/api/common/ComHttpHelperApi';

/** Inmemory session */
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';

const WS_MODULE_PARAM = 'CONTROL_LIB';
export default class ControleRechercheDumApi {
  static initControler = async (login, commande, data) => {
    const _data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf4011',
        module: WS_MODULE_PARAM,
        commande: commande,
        typeService: 'UC',
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: data,
    };
    return await HttpHelper.process(_data);
  };

  static getDataListDeclaration = async (
    login,
    typcontrol,
    offset,
    pageSize,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf4011',
        module: WS_MODULE_PARAM,
        commande: 'listeDeclaration',
        typeService: 'SP',
        offset: offset,
        pageSize: pageSize,
      },
      jsonVO: typcontrol,
    };
    console.info('getDataListDeclaration', data);
    return await HttpHelper.process(data);
  };
}
