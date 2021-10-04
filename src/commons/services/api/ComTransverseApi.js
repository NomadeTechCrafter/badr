import ComHttpHelperApi from './common/ComHttpHelperApi';
/** Inmemory session */
import {ComSessionService} from '../session/ComSessionService';
import {DEFAULT_FONCTIONALITE_IONIC} from '../../../commons/Config';
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
          : DEFAULT_FONCTIONALITE_IONIC,
        module: _module,
        commande: _command,
        typeService: _typeService,
        offset: _offset,
        pageSize: _pageSize,
      },
      jsonVO: _.isEmpty(_jsonVO) ? '' : _jsonVO,
    };
    let response = await ComHttpHelperApi.process(data);
    return response;
  };
}
