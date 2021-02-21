import ComHttpHelperApi from "../../../../../commons/services/api/common/ComHttpHelperApi";
import { ComSessionService } from "../../../../../commons/services/session/ComSessionService";

export default class TiConsultationIgTIApi {
    static getListInformationsConsultation = async () => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: 'cf1104',
                module: 'TI_LIB',
                commande: 'getListInformationsConsultation',
                typeService: 'SP',
            }
        };
        let response = await ComHttpHelperApi.process(data);
        return response;
    };

    static consulterTI = async (voJson) => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: 'cf1104',
                module: 'TI_LIB',
                commande: 'consulterTI',
                typeService: 'SP',
            },
            jsonVO: voJson
        };

        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        console.log(JSON.stringify(voJson));
        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        let response = await ComHttpHelperApi.process(data);
        return response;
    };
}