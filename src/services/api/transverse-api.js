import {Component} from 'react';

import HttpHelper from './common/http-helper';

export default class TransverseApi {
  static doProcess = async (
    _login,
    _module,
    _command,
    _typeService,
    _jsonVO,
  ) => {
    console.log("doProcess ...");
    const data = {
      dtoHeader: {
        userLogin: _login,
        fonctionnalite: 'cf4011',
        module: _module,
        commande: _command,
        typeService: _typeService,
      },
      jsonVO: _jsonVO,
    };
    console.log("returning response ...");
    return await HttpHelper.process(data);
  };
}
