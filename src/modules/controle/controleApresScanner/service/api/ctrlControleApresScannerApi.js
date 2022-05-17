import HttpHelper from '../../../../../commons/services/api/common/ComHttpHelperApi';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import Utils from '../../../../../commons/utils/ComUtils';
import {MODULE_CTRL, TYPE_SERVICE_SP, TYPE_SERVICE_UC} from '../../../../../commons/Config';

export default class CtrlControleApresScannerApi {

    static initControleApresScanner = async () => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_CTRL,
                commande: 'initControleApresScanner',
                typeService: TYPE_SERVICE_SP,
            },
            jsonVO: '',
        };

        return await HttpHelper.process(data);
    };

    static confirmControleApresScanner = async (controleApresScannerVo) => {
        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_CTRL,
                commande: 'enregistrerControleApresScanner',
                typeService: TYPE_SERVICE_UC,
            },
            jsonVO: controleApresScannerVo,
        };

        data = Utils.deepDelete(data, [
            '$$hashKey',
            'defaultConverter',
            'actif',
            'showDropDown',
            'disableAutoComplete',
            'onFocus',
            'disabled', 'transactionId'
        ]);

        // console.log(JSON.stringify(data));

        return await HttpHelper.process(data);
    };

    static lookupControleApresScanner = async (typeRecherche,
                                               reference,
                                               numeroVoyage,
                                               typeRechercheEtatChargement,
                                               referenceDed,
                                               moyenTransport,
                                               numeroImmatriculation,
                                               bureauAgentConnecte) => {
        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_CTRL,
                commande: 'lookupControleApresScanner',
                typeService: TYPE_SERVICE_UC,
            },
            jsonVO: {
                'typeRecherche': typeRecherche,
                'reference': reference,
                'numeroVoyage': numeroVoyage,
                'typeRechercheEtatChargement': typeRechercheEtatChargement,
                'referenceDed': referenceDed,
                'moyenTransport': moyenTransport,
                'numeroImmatriculation': numeroImmatriculation,
                'bureauAgentConnecte': bureauAgentConnecte,
            },
        };

        return await HttpHelper.process(data);
    };
}
