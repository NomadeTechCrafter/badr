import {Component} from 'react';

import HttpHelper from './common/http-helper';
import {load} from '../../services/storage-service';

export default class TransverseApi {
  static doProcess = async (
    _login,
    _module,
    _command,
    _typeService,
    _jsonVO,
  ) => {
    console.log('doProcess ...');

    const user = await load('user');

    const data = {
      dtoHeader: {
        userLogin: JSON.parse(user).login,
        fonctionnalite: 'cf4011',
        module: _module,
        commande: _command,
        typeService: _typeService,
      },
      jsonVO: _jsonVO,
    };
    let response = await HttpHelper.process(data);
    console.log('returning response ...');
    return response;
  };
}
