import HttpHelper from './common/http-helper';
/** Inmemory session */
import {ComSessionService} from '../../../commons/services/session/ComSessionService';

import Utils from '../../common/util';

export default class AtApi {
  static initApurement = async (reference) => {
    console.log('Start initApurement');
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'AT',
        commande: 'initApurerAT',
        typeService: 'UC',
      },
      jsonVO: {
        referenceAT: {
          reference: reference,
          enregistre: true,
        },
      },
    };
    let response = await HttpHelper.process(data);
    console.log(response);
    return response;
  };

  static initApurerAutoAT = async (reference) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'AT',
        commande: 'initApurerAutoAT',
        typeService: 'UC',
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
    console.log(apurementVO);
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'AT',
        commande: 'apurerAT',
        typeService: 'UC',
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: apurementVO,
    };
    const response = await HttpHelper.process(data);
    console.log(response);
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
      bureau: ComSessionService.getInstance().getCodeBureau(),
      arrondissement: ComSessionService.getInstance().getCodeArrondissement(),
    };

    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'AT',
        commande: 'apurerAutoAT',
        typeService: 'SP',
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: apurAutoData,
    };
    let response = await HttpHelper.process(data);
    console.log('>>>>>>>>>>>>> apurerAutoAT >>>>> OK >>>>>>>>>>>>>>>>>>');
    return response;
  };

  static verifierDepassementDelai = async (dateFinSaisieAT) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf9005',
        module: 'AT',
        commande: 'verifierDepassementDelai',
        typeService: 'SP',
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: dateFinSaisieAT,
    };
    return await HttpHelper.process(data);
  };
}
