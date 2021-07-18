
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';
export default class PecEtatChargementApi {

    static consulterDumEtatChargement = async (rechercheObject) => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                "module": "AEC_LIB",
                "commande": "initVE",
                "typeService": "UC",
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

    static ValiderVuEmbarquerEtatChargement = async (rechercheObject) => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                "module": "AEC_LIB",
                "commande": "vuEmbarquer",
                "typeService": "UC",
                "motif": null,
                "messagesInfo": null,
                "messagesErreur": null
            },
            jsonVO: rechercheObject
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
        return response;
    };

    static consulterScannerDumEtatChargement = async (reference) => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                "module": "AEC_LIB",
                "commande": "findResultatScannerByReferenceEtatChargement",
                "typeService": "SP",
                "motif": null,
                "messagesInfo": null,
                "messagesErreur": null
            },
            jsonVO:reference
        };
        let response = await ComHttpHelperApi.process(data);
        console.log('***********************************************************');
        console.log(JSON.stringify(response));
        console.log('***********************************************************');
        return response;
    };
        
}