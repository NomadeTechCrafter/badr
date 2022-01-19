export const STATES = { 'ENREGISTRER': 'Enregistré', 'SAUVEGARDER': 'Sauvegardé', 'EDITER': 'Edité' };

export const FIND_INTERVENANT_TASK = 'ENTETE_REDEVABLE/FIND_INTERVENANT_TASK';
export const UPDATE_INTERVENANT_TASK = 'ENTETE_REDEVABLE/UPDATE_INTERVENANT_TASK';
export const UPDATE_OPERATEUR_TASK = 'ENTETE_REDEVABLE/UPDATE_OPERATEUR_TASK';
export const ADD_ARTCLE_MTM_TASK = 'ARTICLES/ADD_ARTCLE_MTM';
export const EDIT_ARTCLE_MTM_TASK = 'ARTICLES/EDIT_ARTCLE_MTM';
export const NEW_ARTCLE_MTM_TASK = 'ARTICLES/NEW_ARTCLE_MTM';
export const MODIFY_ARTCLE_MTM_TASK = 'ARTICLES/MODIFY_ARTCLE_MTM';
export const DELETE_ARTCLE_MTM_TASK = 'ARTICLES/DELETE_ARTCLE_MTM';
export const ADD_ARTCLE_CM_TASK = 'ARTICLES/ADD_ARTCLE_CM';
export const EDIT_ARTCLE_CM_TASK = 'ARTICLES/EDIT_ARTCLE_CM';
export const MODIFY_ARTCLE_CM_TASK = 'ARTICLES/MODIFY_ARTCLE_CM';
export const DELETE_ARTCLE_CM_TASK = 'ARTICLES/DELETE_ARTCLE_CM';
export const ADD_TAXATION_ARTICLE_TASK = 'TAXATION_MANUELLE/ADD_TAXATION_ARTICLE';
export const ADD_TAXATION_GLOBALE_TASK = 'TAXATION_GLOBALE/ADD_TAXATION_GLOBALE';


export const TYPE_T6BIS = [{
    "code": "01",
    "libelle": "Marchandises et taxe de magasinage",
    "paiementTpeAutorise": true,
    "defaultConverter": {}
},
{
    "code": "02",
    "libelle": "Cyclomoteur <= 50cc",
    "paiementTpeAutorise": true,
    "defaultConverter": {}
},
{
    "code": "03",
    "libelle": "Taxe coordination",
    "paiementTpeAutorise": true,
    "defaultConverter": {}
},
{
    "code": "04",
    "libelle": "Contrainte par corps",
    "paiementTpeAutorise": true,
    "defaultConverter": {}
},
{
    "code": "05",
    "libelle": "Dépassement délai",
    "paiementTpeAutorise": true,
    "defaultConverter": {}
},
{
    "code": "06",
    "libelle": "Affaire change import",
    "paiementTpeAutorise": false,
    "defaultConverter": {}
},
{
    "code": "07",
    "libelle": "Amende transactionnelle (autres)",
    "paiementTpeAutorise": false,
    "defaultConverter": {}
}
]

export const GENRES = [{ code: "Tracteur", libelle: "Tracteur" }, { code: "Remorque", libelle: "Remorque" }, { code: "Ensemble routier", libelle: "Ensemble routier" }];

export const MODE_REDRESSEMENT = 'redressement';
export const MODE_CREATION = 'creation';
export const MODE_UPDATE = 'update';
export const serverErrors = {
    "??? E1100007 ???": "E1100007 : APUREMENT : Vous ne pouvez pas apurer une T6Bis autre que type amende.",
    "??? E1100009 ???": "E1100009 : Vous avez déjà une T6Bis de même type en attente d’édition.",
    "??? E1100001 ???": "E1100001 : T6bis inexistante.",
    "??? E1100021 ???": "E1100021 : T6bis doit être crée par l’agent connecté.",
    "??? E1100014 ???": "E1100014 : T6bis déjà apurée, elle ne peut plus être modifiée.",
    "??? E1100013 ???": "E1100013 : T6bis déjà éditée, elle ne peut plus être modifiée.",
    "??? E1100027 ???": "E1100027 : T6bis déjà annulée.",
    "??? E1100015 ???": "E1100015 : T6bis déjà liquidée, elle ne peut plus être modifiée.",
    "??? E1100030 ???": "E1100030 : T6bis déjà versée.",
    "??? E1100026 ???": "E1100026 : T6BIS doit être à l’état édité ou versé.",
    "??? E1100028 ???": "E1100028 : T6bis déjà redressée par une autre T6bis.",
    "??? E1100025 ???": "E1100025 : T6bis déjà annulée.",
    "??? E1100022 ???": "E1100022 : La quittance est déjà utilisée.",
    "??? E1100020 ???": "E1100020 : APUREMENT : Vous ne pouvez pas apurer une T6Bis déjà liquidée.",
    "??? E1100019 ???": "E1100019 : T6bis encore sauvegardée, elle doit être enregistrée.",
}


export const CMD_SAUVEGARDER_T6BIS = 'sauvegarderT6BIS';
export const CMD_ENREGISTRER_T6BIS = 'enregistrerT6BIS';
export const CMD_SAUVEGARDER_TPE_T6BIS = 'sauvegarderT6BisTPE';

export const T6BIS_MODIFICATION_FONCTIONNALITE = 'cf110002';
export const T6BIS_REDRESSEMENT_FONCTIONNALITE = 'cf110005';
export const T6BIS_RECHERCHE_FONCTIONNALITE = 'cf110007';
export const T6BIS_CREATION_FONCTIONNALITE = 'cf110001';
