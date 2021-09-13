import HttpHelper from '../../../../../commons/services/api/common/ComHttpHelperApi';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import Utils from '../../../../../commons/utils/ComUtils';
import {MODULE_CTRL, TYPE_SERVICE_UC} from '../../../../../commons/Config';
import {TYPE_SERVICE_SP} from '../../../../../commons/constants/ComGlobalConstants';

export default class CtrlReconnaissanceApi {

    static lookupReconnaissance = async (reconnaissanceVo) => {
        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_CTRL,
                commande: 'initReconnaissanceDeclaration',
                typeService: TYPE_SERVICE_UC,
            },
            jsonVO: reconnaissanceVo,
        };

        return await HttpHelper.process(data);
    };

    static lookupReconnaissances = async (typeControle) => {
        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_CTRL,
                commande: 'listeDeclarationsRec',
                typeService: TYPE_SERVICE_SP,
            },
            jsonVO: typeControle,
        };
        console.log(JSON.stringify(data));

        return await HttpHelper.process(data);
    };

    static confirmReconnaissance = async (reconnaissanceVo, operationType) => {
        let command;
        switch (operationType) {
            case 'sauvegarde':
                command = 'reconnaissanceSauvegarder';
                break;
            case 'enregistrement':
                command = 'reconnaissanceEnregistrer';
                break;
            case 'annulation':
                command = 'reconnaissanceAnnuler';
                break;
            default:
                command = '';
                break;
        }

        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_CTRL,
                commande: command,
                typeService: TYPE_SERVICE_UC,
            },
            jsonVO: reconnaissanceVo,
        };

        data = Utils.deepDelete(data, [
            'transactionid',
        ]);

        return await HttpHelper.process(data);
    };

    static initAffecterAgentVisiteur = async (objectVO) => {
        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_CTRL,
                commande: 'initAffecterAgentVisiteur',
                typeService: TYPE_SERVICE_UC,
            },
            jsonVO: objectVO,
        };

        return await HttpHelper.process(data);
    };

    static affecterAgentVisiteur = async (affecterAgentVisiteurVo) => {
        let data = {
            dtoHeader: {
                userLogin: ComSessionService.getInstance().getLogin(),
                fonctionnalite: ComSessionService.getInstance().getFonctionalite(),
                module: MODULE_CTRL,
                commande: 'affecterAgentVisiteur',
                typeService: TYPE_SERVICE_UC,
            },
            jsonVO: affecterAgentVisiteurVo,
        };
        data = Utils.deepDelete(data, [
            'defaultConverter','refGradeLib'
        ]);

        return await HttpHelper.process(data);
    };
    
}
