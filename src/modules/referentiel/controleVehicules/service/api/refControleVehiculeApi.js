import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import HttpHelper from '../../../../../old/services/api/common/http-helper';

export default class RefControleVehiculeApi {
  static findVehiculeVoleByParameter = async (rechercheObject) => {
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: 'cf6153',
        module: 'MCV_LIB',
        commande: 'findVehiculeVoleByParameter',
        typeService: 'SP',
      },
      jsonVO: rechercheObject,
    };
    let response = await HttpHelper.process(data);
    console.log(response);
    return response;
  };
}
