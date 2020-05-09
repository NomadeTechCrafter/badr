import {Component} from 'react';

import HttpHelper from './common/http-helper';

import utf8 from 'utf8';

export default class RefApi {
  static rechercheEchangeMetVehicule = async (login, rechercheObject) => {
    const data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf6153',
        module: 'REF_LIB',
        commande: 'rechercheEchangeMetVehicule',
        typeService: 'SP',
        offset: 0,
        pageSize: 10,
      },
      jsonVO: rechercheObject,
    };
    let response = await HttpHelper.process(data);
    return response;
  };
}
