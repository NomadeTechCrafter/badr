import HttpHelper from './common/http-helper';

/** Inmemory session */
import {Session} from '../../../commons/services/session/Session';

export default class RefApi {
  static rechercheEchangeMetVehicule = async (
    login,
    rechercheObject,
    pageSize,
    offset,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
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

  static findVehiculeVoleByParameter = async (rechercheObject) => {
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
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
