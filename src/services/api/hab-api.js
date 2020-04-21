import {Component} from 'react';

import HttpHelper from './common/http-helper';

export default class HabApi {
  static login = async (login, pwd) => {
    const response = await HttpHelper.login({
      login: login,
      password: pwd,
      forcerConnexion: true,
    });
    console.log(response);
    return response && response.data ? JSON.parse(response.data) : {};
  };

  static verify = async (code, login) => {
    const data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf4011',
        module: 'HAB_LIB',
        commande: 'verifierCodeGenere',
        typeService: 'SP',
      },
      jsonVO: {
        code: code,
        device_id: 'fb47c06d6b403712',
        device_manufacturer: 'apple',
        device_model: 'p1010',
        os: 'iOs',
        os_version: 'iOS7',
        app_version: '2.3',
        device_name: 'iPhone7',
        lng: '150.644',
        lat: '-34.397',
      },
    };
    return await HttpHelper.process(data);
  };

  static confirmConnexion = async (codeBureau, listeProfilCoche, login) => {
    const data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf4011',
        module: 'HAB_LIB',
        commande: 'confirmerConnexionAgent',
        typeService: 'SP',
      },
      jsonVO: {
        codeBureau: codeBureau,
        listProfilsCoche: listeProfilCoche,
      },
    };
    return await HttpHelper.process(data);
  };
}
