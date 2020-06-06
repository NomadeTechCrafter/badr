import HttpHelper from './common/http-helper';
/** Inmemory session */
import {Session} from '../../common/session';

export default class AtApi {
  static initApurement = async reference => {
    console.log('Start initApurement');
    const data = {
      dtoHeader: {
        userLogin: Session.getInstance().getLogin(),
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
}
