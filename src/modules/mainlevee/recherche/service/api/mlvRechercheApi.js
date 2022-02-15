import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
/** Inmemory session */
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

import { TYPE_SERVICE_SP,TYPE_SERVICE_UC } from '../../../../../commons/constants/ComGlobalConstants';

const MODULE = 'MLV_LIB';
export default class TransverseApi {
  static doProcess = async (
    _module,
    _command,
    _typeService,
    _jsonVO,
    _offset,
    _pageSize,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf4011',
        module: _module,
        commande: _command,
        typeService: _typeService,
        offset: _offset,
        pageSize: _pageSize,
      },
      jsonVO: _jsonVO,
    };
    console.log('---doProcess Api', data);
    let response = await ComHttpHelperApi.process(data);
    return response;
  };


    static initEtatChargementMLV = async () => {
    console.log('before')
          const data = {
              dtoHeader: {
                  userLogin: ComSessionService.getInstance().getLogin(),
                  fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                  module: MODULE,
                  commande: 'initEtatChargementMLV',
                  typeService: TYPE_SERVICE_SP,
              },
              jsonVO: '',
          };

          return await ComHttpHelperApi.process(data);
      };



          static listeDeclarationsByAECMLV = async (
                                                     reference,
                                                     typeRechercheEtatChargement,
                                                     typeMoyenTransport,
                                                     numeroImmatriculation,
                                                     bureauAgentConnecte) => {

              let data = {
                  dtoHeader: {
                      userLogin: ComSessionService.getInstance().getLogin(),
                      fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                      module: MODULE,
                      commande: 'listeDeclarationsByAECMLV',
                      typeService: TYPE_SERVICE_UC,
                  },
                  jsonVO: {

                      'reference': reference,
                      'typeRechercheEC': typeRechercheEtatChargement,
                      'typeMoyenTransport': typeMoyenTransport,
                      'numeroImmatriculation': numeroImmatriculation,
                      'bureau': bureauAgentConnecte,
                  },
              };
              console.log('databeforesending',data)
              return await ComHttpHelperApi.process(data);
}


   static validateListMlv = async (dataValue/*reference,
                                             typeRechercheEtatChargement,
                                               typeMoyenTransport,
                                             numeroImmatriculation,
                                             listDed,
                                              bureauAgentConnecte*/) => {
              let data = {
                  dtoHeader: {
                      userLogin: ComSessionService.getInstance().getLogin(),
                      fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                      module: MODULE,
                      commande: 'validerListMlv',
                      typeService: TYPE_SERVICE_UC,
                  },
                  jsonVO: dataValue/*{

                                                'reference': reference,
                                                'typeRechercheEC': typeRechercheEtatChargement,
                                                'typeMoyenTransport': typeMoyenTransport,
                                                'numeroImmatriculation': numeroImmatriculation,
                                                'listDed':listDed
                                                'bureau': bureauAgentConnecte,
                                            }*/,
              };

              return await ComHttpHelperApi.process(data);
}



          static deliverListMlv = async (dataValue) => {

              let data = {
                  dtoHeader: {
                      userLogin: ComSessionService.getInstance().getLogin(),
                      fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                      module: MODULE,
                      commande: 'deliverListMlv',
                      typeService: TYPE_SERVICE_UC,
                  },
                  jsonVO:dataValue
              };
              console.log('databeforesending',data)
              return await ComHttpHelperApi.process(data);
}


}
