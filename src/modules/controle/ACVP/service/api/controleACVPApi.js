import HttpHelper from '../../../../../commons/services/api/common/ComHttpHelperApi';

/** Inmemory session */
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';

const WS_MODULE_PARAM = 'CONTROL_LIB';
export default class ControleACVPApi {
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

  static getDataListDeclaration = async (login, typcontrol) => {
    const data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf4011',
        module: WS_MODULE_PARAM,
        commande: 'listeDeclaration',
        typeService: 'SP',
      },
      jsonVO: typcontrol,
    };
    return await HttpHelper.process(data);
  };

  static genererCompteRendu = async (login, data) => {
    const _data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf4011',
        module: WS_MODULE_PARAM,
        commande: 'genererCompteRenduRedressements',
        typeService: 'UC',
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: {
        idDed: data.idDed,
        numeroVersionBase: data.numeroVersionBase,
        numeroVersionCourante: data.numeroVersionCourante,
      },
    };
    return await HttpHelper.process(_data);
  };

  static getDetailBAD = async (data) => {
    const _data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf6153',
        module: WS_MODULE_PARAM,
        commande: 'getDetailBAD',
        typeService: 'SP',
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: data,
    };
    return await HttpHelper.process(_data);
  };
}
