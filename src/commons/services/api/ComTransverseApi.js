import ComHttpHelperApi from './common/ComHttpHelperApi';
/** Inmemory session */
import {ComSessionService} from '../session/ComSessionService';
import _ from 'lodash';
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
        fonctionnalite: ComSessionService.getInstance().getFonctionalite()
          ? ComSessionService.getInstance().getFonctionalite()
          : ComSessionService.getInstance().setFonctionalite(),
        module: _module,
        commande: _command,
        typeService: _typeService,
        offset: _.isEmpty(_offset) ? 0 : _offset,
        pageSize: _.isEmpty(_pageSize) ? 0 : _pageSize,
      },
      jsonVO: _jsonVO,
    };
    console.log('send data', data);
    let response = await ComHttpHelperApi.process(data);
    return response;
  };
}
