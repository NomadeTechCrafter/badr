import HttpHelper from '../../../../../commons/services/api/common/ComHttpHelperApi';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import Utils from '../../../../../commons/utils/ComUtils';
import {MODULE_ENQ, TYPE_SERVICE_SP, TYPE_SERVICE_UC} from '../../../../../commons/Config';

export default class EnqCompteRenduApi {

    static listNatureVehicule = async () => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_ENQ,
                commande: 'listNatureVehicule',
                typeService: TYPE_SERVICE_SP,
            },
            jsonVO: '',
        };

        return await HttpHelper.process(data);
    };

    static listUniteMesure = async () => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_ENQ,
                commande: 'listUniteMesure',
                typeService: TYPE_SERVICE_SP,
            },
            jsonVO: '',
        };

        return await HttpHelper.process(data);
    };

    static confirmCompteRendu = async (enqueteVo, mode) => {
        let command;
        switch (mode) {
            case 'add':
                command = 'createCompteRenduMission';
                break;
            case 'edit':
                command = 'modifyCompteRenduMission';
                break;
            case 'validate':
                command = 'validateCompteRenduMission';
                break;
            default:
                command = '';
                break;
        }

        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_ENQ,
                commande: command,
                typeService: TYPE_SERVICE_UC,
            },
            jsonVO: enqueteVo,
        };

        data = Utils.deepDelete(data, [
            '$$hashKey',
            'defaultConverter',
            'active',
            'idPourRecherche',
            'formatedListLibelleClasseInspecteur',
            'formatedListArrondissementOrdonnateur',
            'blocGestionMission',
            'natureVehiculeToString',
            'marqueToString',
            'uniteMesureToString',
            'transactionid',
        ]);

        return await HttpHelper.process(data);
    };

    static lookupEnquete = async (reference,
                                  isMissionLookup,
                                  selectedMissionId,
                                  selectedMissionNumero,
                                  isCrMissionCreation,
                                  isCrMissionModification,
                                  isCrMissionValidation) => {
        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_ENQ,
                commande: 'lookupEnquete',
                typeService: TYPE_SERVICE_UC,
            },
            jsonVO: {
                'isCrLookup': true,
                'isMissionLookup': isMissionLookup,
                'selectedMission': {
                    'id': selectedMissionId,
                    'numeroMission': selectedMissionNumero,
                },
                'isCrMissionCreation': isCrMissionCreation,
                'isCrMissionModification': isCrMissionModification,
                'isCrMissionValidation': isCrMissionValidation,
                'reference': reference,
                'operateur': {},
            },
        };

        return await HttpHelper.process(data);
    };
}
