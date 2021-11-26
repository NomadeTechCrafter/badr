import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';

export default class CtrlResultatScannerApi {
    static findCtrlResultatScanner = async (rechercheObject) => {
        console.log(JSON.stringify(rechercheObject));
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: 'cf306611',
                module: 'CONTROL_LIB',
                commande: 'findResultatScanner',
                typeService: 'SP',
            },
            jsonVO: rechercheObject,
        };
        let response = await ComHttpHelperApi.process(data);
        console.log(response);
        return response;
    };
}