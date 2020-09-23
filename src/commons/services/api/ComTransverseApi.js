import ComHttpHelperApi from './common/ComHttpHelperApi';
/** Inmemory session */
import {ComSessionService} from '../session/ComSessionService';
export default class ComTransverseApi {
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
        fonctionnalite: ComSessionService.getInstance().setFonctionalite(),
        module: _module,
        commande: _command,
        typeService: _typeService,
        offset: _offset,
        pageSize: _pageSize,
      },
      jsonVO: _jsonVO,
    };
    let response = await ComHttpHelperApi.process(data);
    return response;
  };
}
