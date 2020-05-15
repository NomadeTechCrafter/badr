import {Component} from 'react';

import HttpHelper from './common/http-helper';
import {loadParsed} from '../../services/storage-service';

export default class TransverseApi {
  static doProcess = async (
    _login,
    _module,
    _command,
    _typeService,
    _jsonVO,
    _offset,
    _pageSize,
  ) => {
    const user = await loadParsed('user');
    const data = {
      dtoHeader: {
        userLogin: user.login,
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
