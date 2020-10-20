import HttpHelper from '../../../../../commons/services/api/common/HttpHelper';
/** Inmemory session */
import {Session} from '../../../../../commons/services/session/Session';
import {
  TYPE_SERVICE_SP,
  TYPE_SERVICE_UC,
} from '../../../../../commons/constants/GlobalConstants';

export default class DedRedressementApi {
  static initConsultationDum = async (params) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'DED_LIB',
        commande: 'ded.RecupererDum',
        typeService: TYPE_SERVICE_UC,
      },
      jsonVO: params,
    };
    let response = await HttpHelper.process(data);
    return response;
  };

  static consultationDum = async (params) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'DED_LIB',
        commande: 'ded.ConsulterDum',
        typeService: TYPE_SERVICE_UC,
      },
      jsonVO: params,
    };
    let response = await HttpHelper.process(data);
    return response;
  };

  static getDecisionCaution = async (numeroDecision) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'DED_LIB',
        commande: 'ded.getDecisionCautionVO',
        typeService: TYPE_SERVICE_SP,
      },
      jsonVO: numeroDecision,
    };
    let response = await HttpHelper.process(data);
    return response;
  };


  static isPreapurementDSAccessible = async (userlogin, codeRegime, categorie, codeBureau, identifiant, sessionID) => {
  const data = {
          "dtoHeader": {
            "userLogin": userlogin,
            "fonctionnalite": transverseService.getfonctionalite(),
            "module": "DED_LIB",
            "commande": "ded.isPreapurementDSAccessible",
            "typeService": "SP",
            "motif": null,
            "messagesInfo": null,
            "messagesErreur": null
          }
          , "jsonVO": {
            "codeRegime": codeRegime,
            "categorie": categorie,
            "codeBureau": codeBureau,
            "identifiant": identifiant,
            "readOnlyAcces": "false",
            "redressement": "true"
          }
    };
    let response = await HttpHelper.process(data);
    return response;

}

}
