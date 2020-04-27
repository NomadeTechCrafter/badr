import {Component} from 'react';

import HttpHelper from './common/http-helper';
const WS_MODULE_PARAM = "CONTROL_LIB";
export default class ControleApi {


  static initControler = async (login,commande,data) => {
    const _data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf4011',
        module: WS_MODULE_PARAM,
        commande: commande,
        typeService: 'UC',
        motif: null,
        messagesInfo: null,
        messagesErreur: null
      },
      jsonVO: data,
    };
    
    return await HttpHelper.process(_data);
  };
 
}
