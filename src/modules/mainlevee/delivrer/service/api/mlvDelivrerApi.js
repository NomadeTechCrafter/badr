import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
/** Inmemory session */
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

export default class TransverseApi {
  static doProcess = async (
    _module,
    _command,
    _typeService,
    _jsonVO,
    _offset,
    _pageSize,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: _module,
        commande: _command,
        typeService: _typeService,
        offset: _offset,
        pageSize: _pageSize,
      },
      jsonVO: _jsonVO,
    };
    console.log('---doProcess Api', data);
    let response = await ComHttpHelperApi.process(data);
    return response;
  };
}
