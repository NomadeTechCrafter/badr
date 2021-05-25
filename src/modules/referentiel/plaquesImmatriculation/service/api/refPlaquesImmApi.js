import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import HttpHelper from '../../../../../old/services/api/common/http-helper';

export default class RefPlaquesImmApi {
  static rechercheEchangeMetVehicule = async (
    login,
    rechercheObject,
    pageSize,
    offset,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf6153',
        module: 'REF_LIB',
        commande: 'rechercheEchangeMetVehicule',
        typeService: 'SP',
        offset: offset,
        pageSize: pageSize,
      },
      jsonVO: rechercheObject,
    };
    let response = await HttpHelper.process(data);
    return response;
  };
}
