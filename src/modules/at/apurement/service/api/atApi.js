import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
/** Inmemory session */
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import ComUtils from '../../../../../commons/utils/ComUtils';
import {AT_MODULE} from '../../state/atConstants';
import {
  TYPE_SERVICE_SP,
  TYPE_SERVICE_UC,
} from '../../../../../commons/constants/ComGlobalConstants';

export default class AtApi {
  static initApurement = async (reference) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: AT_MODULE,
        commande: 'initApurerAT',
        typeService: TYPE_SERVICE_UC,
      },
      jsonVO: {
        referenceAT: {
          reference: reference,
          enregistre: true,
        },
      },
    };
    let response = await ComHttpHelperApi.process(data);
    return response;
  };

  static initApurerAutoAT = async (reference) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: AT_MODULE,
        commande: 'initApurerAutoAT',
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: {
        referenceAT: {
          reference: reference,
          enregistre: true,
        },
      },
    };
    return await ComHttpHelperApi.process(data);
  };

  static apurerAT = async (apurementVO) => {
    apurementVO = ComUtils.deepDelete(apurementVO, [
      'defaultConverter',
      'showDropDown',
      'disableAutoComplete',
      'onFocus',
      'disabled',
      'selected',
      'typeComposantApur',
      'ref',
      'id',
      'informationAffichee',
      'infoApurement',
      'typeComposant',
      'composantsApures',
      'modeApurementComposant',
      'fileName',
      'atHistoriqueVOs',
    ]);

    if (apurementVO.apurementVOs) {
      apurementVO.apurementVOs.forEach((apurement) => {
        delete apurement.modeApur;
      });
    }
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: AT_MODULE,
        commande: 'apurerAT',
        typeService: TYPE_SERVICE_UC,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: apurementVO,
    };
    const response = await ComHttpHelperApi.process(data);
    return response;
  };

  static apurerAutoAT = async (apurementVO) => {
    apurementVO = ComUtils.deepDelete(apurementVO, [
      'defaultConverter',
      'showDropDown',
      'disableAutoComplete',
      'onFocus',
      'disabled',
      'selected',
      'typeComposantApur',
      'ref',
      'id',
      'informationAffichee',
      'typeComposant',
      'composantsApures',
      'modeApurementComposant',
      'fileName',
      'atHistoriqueVOs',
    ]);
    if (apurementVO.apurementVOs) {
      apurementVO.apurementVOs.forEach((apurement) => {
        delete apurement.modeApur;
      });
    }
    let apurAutoData = {
      admissionTemporaireVO: apurementVO,
      bureau: ComSessionService.getInstance().getCodeBureau(),
      arrondissement: ComSessionService.getInstance().getCodeArrondissement(),
    };

    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: AT_MODULE,
        commande: 'apurerAutoAT',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: apurAutoData,
    };
    let response = await ComHttpHelperApi.process(data);
    return response;
  };

  static verifierDepassementDelai = async (dateFinSaisieAT) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: AT_MODULE,
        commande: 'verifierDepassementDelai',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: dateFinSaisieAT,
    };
    return await ComHttpHelperApi.process(data);
  };
  static recupererListAt = async (atRechercheBean, pageSize, offset) => {
    console.log('atRechercheBean');
    console.log(atRechercheBean);
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9009',
        module: AT_MODULE,
        commande: 'recupererListAt',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
        offset: offset,
        pageSize: pageSize,
      },
      jsonVO: atRechercheBean,
    };
    return await ComHttpHelperApi.process(data);
  };
  static searchAtByRef = async (referenceVO) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9009',
        module: AT_MODULE,
        commande: 'searchAtByRef',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: referenceVO,
    };
    return await ComHttpHelperApi.process(data);
  };

  static consulterFichierDocument = async (urlFichier) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9009',
        module: AT_MODULE,
        commande: 'consulterFichierDocument',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: urlFichier,
    };
    return await ComHttpHelperApi.process(data);
  };
  
}
