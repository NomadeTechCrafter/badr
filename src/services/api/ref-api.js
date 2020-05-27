import HttpHelper from './common/http-helper';

export default class RefApi {
  static rechercheEchangeMetVehicule = async (
    login,
    rechercheObject,
    pageSize,
    offset,
  ) => {
    const data = {
      dtoHeader: {
        userLogin: login,
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

  static findVehiculeVoleByParameter = async (login, rechercheObject) => {
    const data = {
      dtoHeader: {
        userLogin: login,
        fonctionnalite: 'cf6153',
        module: 'MCV_LIB',
        commande: 'findVehiculeVoleByParameter',
        typeService: 'SP',
      },
      jsonVO: rechercheObject,
    };
    let response = await HttpHelper.process(data);
    return response;
  };
}
