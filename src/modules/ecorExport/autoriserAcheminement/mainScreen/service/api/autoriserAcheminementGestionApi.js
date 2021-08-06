import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';
import { MODULE_REF, TYPE_SERVICE_SP, MODULE_ECOREXP, TYPE_SERVICE_UC } from '../../../../../../commons/Config';
import ComHttpHelperApi from '../../../../../../commons/services/api/common/ComHttpHelperApi';

const AUTORISER_ACHEMINEMENT_FONCTIONNALITE = 'cf61525';

export default class AutoriserAcheminementGestionApi {
  

  

 
  static getCmbOperateurByCode = async (identifiant) => {
    console.log('getCmbOperateurByCode');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : AUTORISER_ACHEMINEMENT_FONCTIONNALITE,
        module: MODULE_REF,
        commande: 'getCmbOperateurByCode',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: identifiant
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };

  static getScellesApposees = async (referenceEnregistrement, numeroOrdreVoyage) => {
    console.log('getScellesApposees');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : AUTORISER_ACHEMINEMENT_FONCTIONNALITE,
        module: 'ECI',
        commande: 'getScellesApposees',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: {
        "numeroOrdreVoyage": numeroOrdreVoyage,
        "referenceEnregistrement": referenceEnregistrement
      }
    };
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };
  
  static isRegimeTransbordement = async (codeRegime) => {
    console.log('isRegimeTransbordement');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : AUTORISER_ACHEMINEMENT_FONCTIONNALITE,
        module: 'DED_LIB',
        commande: "ded.isRegimeTransbordement",
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: codeRegime.toString()
    }; 
    console.log(data);
    return await ComHttpHelperApi.process(data);
  };

  static autoriserAcheminement = async (ecorDumVO) => {
    console.log('autoriserAcheminement');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : AUTORISER_ACHEMINEMENT_FONCTIONNALITE,
        module: MODULE_ECOREXP,
        commande: 'ece.autoriserAcheminement',
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: ecorDumVO,
    };
    console.log('data to send');
    console.log(JSON.stringify(data));
    return await ComHttpHelperApi.process(data);
  };

 

  

}
