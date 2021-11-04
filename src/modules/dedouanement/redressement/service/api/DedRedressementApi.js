import { TYPE_SERVICE_SP, TYPE_SERVICE_UC } from '../../../../../commons/constants/ComGlobalConstants';
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComComSessionServiceService } from '../../../../../commons/services/ComSessionService/ComComSessionServiceService';

export default class DedRedressementApi {
  static initConsultationDum = async (params) => {
    const data = {
      dtoHeader: {
        userLogin: ComComSessionServiceService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'DED_LIB',
        commande: 'ded.RecupererDum',
        typeService: TYPE_SERVICE_UC,
      },
      jsonVO: params,
    };
    let response = await ComHttpHelperApi.process(data);
    return response;
  };

  static consultationDum = async (params) => {
    const data = {
      dtoHeader: {
        userLogin: ComComSessionServiceService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'DED_LIB',
        commande: 'ded.ConsulterDum',
        typeService: TYPE_SERVICE_UC,
      },
      jsonVO: params,
    };
    let response = await ComHttpHelperApi.process(data);
    return response;
  };

  static getDecisionCaution = async (numeroDecision) => {
    const data = {
      dtoHeader: {
        userLogin: ComComSessionServiceService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'DED_LIB',
        commande: 'ded.getDecisionCautionVO',
        typeService: TYPE_SERVICE_SP,
      },
      jsonVO: numeroDecision,
    };
    let response = await ComHttpHelperApi.process(data);
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
    let response = await ComHttpHelperApi.process(data);
    return response;

  }
  static initRedresserDum = async (idDed) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'DED_LIB',
        commande: 'ded.InitRedresserDum',
        typeService: TYPE_SERVICE_UC,
      },
      jsonVO: idDed,
    };
    let response = await ComHttpHelperApi.process(data);
    return response;
  };

}
