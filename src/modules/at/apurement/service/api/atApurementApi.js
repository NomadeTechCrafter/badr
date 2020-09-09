import HttpHelper from '../../../../../commons/services/api/common/HttpHelper';
/** Inmemory session */
import {Session} from '../../../../../commons/services/session/Session';
import Utils from '../../../../../commons/utils/Util';
import {AT_MODULE} from '../../../../../commons/constants/at/At';
import {
  TYPE_SERVICE_SP,
  TYPE_SERVICE_UC,
} from '../../../../../commons/constants/GlobalConstants';

export default class AtApurementApi {
  static initApurement = async (reference) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
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
    let response = await HttpHelper.process(data);
    return response;
  };

  static initApurerAutoAT = async (reference) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
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
    return await HttpHelper.process(data);
  };

  static apurerAT = async (apurementVO) => {
    apurementVO = Utils.deepDelete(apurementVO, [
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
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
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
    const response = await HttpHelper.process(data);
    return response;
  };

  static apurerAutoAT = async (apurementVO) => {
    apurementVO = Utils.deepDelete(apurementVO, [
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
      bureau: Session.getInstance().getCodeBureau(),
      arrondissement: Session.getInstance().getCodeArrondissement(),
    };

    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
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
    let response = await HttpHelper.process(data);
    return response;
  };

  static verifierDepassementDelai = async (dateFinSaisieAT) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
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
    return await HttpHelper.process(data);
  };
}
