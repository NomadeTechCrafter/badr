import {Component} from 'react';

import HttpHelper from './common/http-helper';
const WS_MODULE_PARAM = 'CONTROL_LIB';
export default class ControleApi {
  static initControler = async (login, commande, data) => {
    const _data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf4011',
        module: WS_MODULE_PARAM,
        commande: commande,
        typeService: 'UC',
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: data,
    };

    return await HttpHelper.process(_data);
  };
  static validateSaveAction = async (login, commande, data) => {
    const _data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf4011',
        module: WS_MODULE_PARAM,
        commande: commande,
        typeService: 'UC',
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: {
        id: data.idControle,
        idDed: data.idDed,
        referenceDed: data.referenceDed,
        numeroVoyage: null,
        path: null,
        documentAnnexeResultVO: data.documentAnnexeResultVO,
        motivation: data.observation,
        motifRejet: null,
        contentieux: false,
        decision: data.decisions,
        numVersionIntermidiaire: null,
        numeroVersionCourante: data.numeroVersionCourante,
        numeroVersionInitiale: null,
        numeroVersionBase: data.numeroVersionCourante,
        reselect: null,
        motifAnnulation: null,
        ctrlTransit: false,
        ctrlInterne: false,
        ctrlDedArchivee: false,
        redressementEtude: false,
        constatdiffere: false,
        desactiverRedressement: null,
        suggererVP: false,
        refHistoriques: [],
      },
    };

    return await HttpHelper.process(_data);
  };
}
