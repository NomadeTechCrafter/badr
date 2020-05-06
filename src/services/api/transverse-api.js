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
  ) => {
    console.log('doProcess ...');

    const user = await loadParsed('user');

    const data = {
      dtoHeader: {
        userLogin: user.login,
        fonctionnalite: 'cf4011',
        module: _module,
        commande: _command,
        typeService: _typeService,
      },
      jsonVO: _jsonVO,
    };
    if (_jsonVO) {
      console.log('################ json vo : ');
      console.log(_jsonVO);
    }
    let response = await HttpHelper.process(data);
    console.log('returning response ...');
    console.log(response);
    return response;
  };
}
