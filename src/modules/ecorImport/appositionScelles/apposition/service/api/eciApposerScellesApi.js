
import { TYPE_SERVICE_SP, TYPE_SERVICE_UC } from '../../../../../../commons/constants/ComGlobalConstants';
import ComHttpHelperApi from '../../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';

const ECI_APPOSITION_SCELLES = 'cf1226';

export default class EciApposerScellesApi {
  static apposerScelles = async (appositionScellesVO) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin() ? ComSessionService.getInstance().getLogin():'AD6202',
        fonctionnalite: ECI_APPOSITION_SCELLES,
        module: 'ECI_LIB',
        commande: 'apposerScelles',
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null

      },
      jsonVO: appositionScellesVO
    };
    return await ComHttpHelperApi.process(data);
  };

  static getScellesDeclarees = async (referenceEnregistrement, numeroOrdreVoyage) => {
    console.log('getScellesDeclarees');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : T6BIS_CREATION_FONCTIONNALITE,
        module: 'ECI',
        commande: 'getScellesDeclarees',
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

  static getScellesApposees = async (referenceEnregistrement, numeroOrdreVoyage) => {
    console.log('getScellesApposees');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : T6BIS_CREATION_FONCTIONNALITE,
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

  
}
