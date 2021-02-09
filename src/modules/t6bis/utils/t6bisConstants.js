export const STATES = { 'ENREGISTRER': 'Enregistré', 'SAUVEGARDER': 'Sauvegardé', 'EDITER': 'Edité' };

export const FIND_INTERVENANT_TASK = 'ENTETE_REDEVABLE/FIND_INTERVENANT_TASK';
export const UPDATE_INTERVENANT_TASK = 'ENTETE_REDEVABLE/UPDATE_INTERVENANT_TASK';
export const ADD_ARTCLE_MTM_TASK = 'ARTICLES/ADD_ARTCLE_MTM';
export const EDIT_ARTCLE_MTM_TASK = 'ARTICLES/EDIT_ARTCLE_MTM';
export const NEW_ARTCLE_MTM_TASK = 'ARTICLES/NEW_ARTCLE_MTM';
export const MODIFY_ARTCLE_MTM_TASK = 'ARTICLES/MODIFY_ARTCLE_MTM';
export const DELETE_ARTCLE_MTM_TASK = 'ARTICLES/DELETE_ARTCLE_MTM';
export const ADD_ARTCLE_CM_TASK = 'ARTICLES/ADD_ARTCLE_CM';
export const EDIT_ARTCLE_CM_TASK = 'ARTICLES/EDIT_ARTCLE_CM';
export const MODIFY_ARTCLE_CM_TASK = 'ARTICLES/MODIFY_ARTCLE_CM';
export const DELETE_ARTCLE_CM_TASK = 'ARTICLES/DELETE_ARTCLE_CM';


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

export const GENRES = [{ code: "01", libelle: "Tracteur" }, { code: "02", libelle: "Remorque" }, { code: "03", libelle: "Ensemble routier" }];

