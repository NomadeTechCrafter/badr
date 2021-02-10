import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

export default class EciConsultationBLSApi {
    static findEciRechBls = async (rechercheObject) => {
        console.log(JSON.stringify(rechercheObject));
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: 'cf121711',
                module: 'ECI',
                commande: 'findEciRechBls',
                typeService: 'SP',
            },
            jsonVO: rechercheObject,
        };
        let response = await ComHttpHelperApi.process(data);
        console.log(response);
        return response;
    };
}