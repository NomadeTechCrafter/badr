
import ComHttpHelperApi from '../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../commons/services/session/ComSessionService';
export default class PecEtatChargementApi {
    static consulterDumEtatChargement = async (rechercheObject) => {
        console.log(JSON.stringify(rechercheObject));
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
        console.log(response);
        return response;
    };
}