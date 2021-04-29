
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';
export default class PecEtatChargementApi {

    static consulterDumEtatChargement = async (rechercheObject) => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                "module": "AEC_LIB",
                "commande": "recupererVersionAECVO",
                "typeService": "SP",
                "motif": null,
                "messagesInfo": null,
                "messagesErreur": null
            },
            jsonVO:rechercheObject
        };
        let response = await ComHttpHelperApi.process(data);
        return response;
    };

    static consulterHistoriqueDumEtatChargement = async (rechercheObject) => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                "module": "ECOREXP_LIB",
                "commande": "getListHistoriqueEtdc",
                "typeService": "SP",
                "motif": null,
                "messagesInfo": null,
                "messagesErreur": null
            },
            jsonVO:rechercheObject
        };
        let response = await ComHttpHelperApi.process(data);
        return response;
    };

    static consulterVersionsDumEtatChargement = async (rechercheObject) => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                "module": "ECOREXP_LIB",
                "commande": "getListVersionsEtdc",
                "typeService": "SP",
                "motif": null,
                "messagesInfo": null,
                "messagesErreur": null
            },
            jsonVO:rechercheObject
        };
        let response = await ComHttpHelperApi.process(data);
        console.log('***********************************************************');
        console.log(JSON.stringify(response));
        console.log('***********************************************************');
        return response;
    };

    
}