import HttpHelper from '../../../../../commons/services/api/common/ComHttpHelperApi';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import Utils from '../../../../../commons/utils/ComUtils';
import {MODULE_REF, TYPE_SERVICE_SP, TYPE_SERVICE_UC} from '../../../../../commons/Config';

export default class RefOperateursEconomiquesApi {

    static initBloquerOperateur = async () => {
        const data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_REF,
                commande: 'initBlocage',
                typeService: TYPE_SERVICE_SP,
            },
            jsonVO: '',
        };

        return await HttpHelper.process(data);
    };

    static confirmBlocageOperateur = async (blocageVo, mode) => {
        let command;
        switch (mode) {
            case 'add':
                command = 'ajouterBlocageOperateur';
                break;
            case 'edit':
                command = 'modifierBlocageOperateur';
                break;
            case 'unblock':
                command = 'debloquerOperateur';
                break;
            default:
                command = '';
                break;
        }

        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_REF,
                commande: command,
                typeService: TYPE_SERVICE_UC,
            },
            jsonVO: blocageVo,
        };

        console.log(JSON.stringify(data));

        data = Utils.deepDelete(data, [
            '$$hashKey',
            'root',
            'leaf',
            'level',
            'display',
        ]);

        return await HttpHelper.process(data);
    };

    static lookupBlocagesOperateur = async (blocageVo) => {
        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_REF,
                commande: 'rechercherBlocagesOperateur',
                typeService: TYPE_SERVICE_SP,
            },
            jsonVO: blocageVo,
        };

        return await HttpHelper.process(data);
    };

    static lookupBlocageOperateur = async (idBlocage) => {
        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_REF,
                commande: 'rechercherBlocageOperateur',
                typeService: TYPE_SERVICE_SP,
            },
            jsonVO: {
                idBlocage: idBlocage,
            },
        };

        return await HttpHelper.process(data);
    };
}
