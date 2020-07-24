import HttpHelper from './common/http-helper';
/** Inmemory session */
import {Session} from '../session/Session';
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
        userLogin: Session.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: _module,
        commande: _command,
        typeService: _typeService,
        offset: _offset,
        pageSize: _pageSize,
      },
      jsonVO: _jsonVO,
    };
    let response = await HttpHelper.process(data);
    return response;
  };
}
