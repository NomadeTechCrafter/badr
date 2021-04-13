
import { TYPE_SERVICE_UC } from '../../../../../../commons/constants/ComGlobalConstants';
import ComHttpHelperApi from '../../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';

const ECI_APPOSITION_SCELLES = 'cf1226';

export default class ECIInitAppositionScellesApi {
  static initApposerScelles = async (referenceEnregistrement,numeroOrdreVoyage) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin() ? ComSessionService.getInstance().getLogin():'AD6202',
        fonctionnalite: ECI_APPOSITION_SCELLES,
        module: 'ECI_LIB',
        commande: 'initApposerScelles',
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null

      },
      jsonVO: {
        "numeroOrdreVoyage": numeroOrdreVoyage,
        "referenceEnregistrement": referenceEnregistrement
      }
    };
    return await ComHttpHelperApi.process(data);
  };

  
}
