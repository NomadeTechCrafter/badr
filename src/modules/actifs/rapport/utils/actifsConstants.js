export const FORMAT_DDMMYYYY_HHMM = 'DD/MM/YYYY HH:mm';
export const FORMAT_DDMMYYYY = 'DD/MM/YYYY';
export const FORMAT_HHMM = 'HH:mm';
export const LIST_TYPES_IDENTIFIANT= [
   
    {
        "code": "02",
        "libelle": "Numero Carte séjour(02)",
        "actif": false,
        "showDropDown": false,
        "disableAutoComplete": true,
        "onFocus": "",
        "disabled": false
    },
    {
        "code": "01",
        "libelle": "Numero C.I.N.(01)",
        "actif": false,
        "showDropDown": false,
        "disableAutoComplete": true,
        "onFocus": "",
        "disabled": false
    },
    {
        "code": "07",
        "libelle": "Passeport de service(07)",
        "actif": false,
        "showDropDown": false,
        "disableAutoComplete": true,
        "onFocus": "",
        "disabled": false
    },
    {
        "code": "06",
        "libelle": "Passeport Diplomatique(06)",
        "actif": false,
        "showDropDown": false,
        "disableAutoComplete": true,
        "onFocus": "",
        "disabled": false
    },
    {
        "code": "05",
        "libelle": "Passeport normal(05)",
        "actif": false,
        "showDropDown": false,
        "disableAutoComplete": true,
        "onFocus": "",
        "disabled": false
    }
];

export const NAVIGATION_MARITIME_MODEL_INITIAL = {
    dateEntree: (new Date()).getTime(),
    heureEntree: (new Date()).getTime(),
    motifAccostage: '',
    portEntree: '',
    provenance: { nomPays: ''},
    villeProvenance: '',
    portAttache: '',
    pavillon: '',
    dateDepart: (new Date()).getTime(),
    heureDepart: (new Date()).getTime(),
    destination: { code: '', libelle: '' },
    villeDestination: '',
    typeBateau: '',
    immatriculation:'',
    nomBateau: '',
    couleur: '',
    longueur: '',
    profondeur: '',
    tonnage: '',
    numDeclaration: '',
    delivreePar: { code: '', libelle: '' },
    dateDeclaration: (new Date()).getTime(),
    dateDebutControle: (new Date()).getTime(),
    heureDebutControle: (new Date()).getTime(),
    dateFinControle: (new Date()).getTime(),
    heureFinControle: (new Date()).getTime(),
    documentsVerifies: '',
    observations: '',
    resultatControle: '',
    intervenants: [],
    proprietaires: []
}

export const PROPRIETAIRE_INITIAL = {
    intervenant:
    {
        refTypeDocumentIdentite: '',
        numeroDocumentIndentite: '',
        nomIntervenant: '',
        prenomIntervenant: '',
        nationaliteFr:'',
        adresse: '',
        numeroRC: '',
        refCentreRC: { codeCentreRC: '' },
        dateEffet: new Date(),
        dateFin: '9999-01-01',
    },
    professionIntervenant: '',

}
export const INTERVENANT_INITIAL = {
    intervenant:
    {
        refTypeDocumentIdentite: '',
        numeroDocumentIndentite: '',
        nomIntervenant: '',
        prenomIntervenant: '',
        nationaliteFr: '',
        adresse: '',
        dateEffet: new Date(),
        dateFin: '9999-01-01',
        
    }, passager: true,
    equipage: false,
    professionIntervenant: '',

}

export const EDIT_EMBARCATION_TASK = "ACTIFS/EDIT_EMBARCATION";
export const DELETE_EMBARCATION_TASK = "ACTIFS/DELETE_EMBARCATION";
export const RESET_EMBARCATION_TASK = "ACTIFS/RESET_EMBARCATION";

export const EDIT_AVION_PRIVEE_TASK = "ACTIFS/EDIT_AVION_PRIVEE";
export const DELETE_AVION_PRIVEE_TASK = "ACTIFS/DELETE_AVION_PRIVEE";
export const RESET_AVION_PRIVEE_TASK = "ACTIFS/RESET_AVION_PRIVEE";

export const EDIT_AVITAILLEMENTENTREE_TASK = "ACTIFS/EDIT_AVITAILLEMENTENTREE";
export const DELETE_AVITAILLEMENTENTREE_TASK = "ACTIFS/DELETE_AVITAILLEMENTENTREE";
export const RESET_AVITAILLEMENTENTREE_TASK = "ACTIFS/RESET_AVITAILLEMENTENTREE";

export const EDIT_AVITAILLEMENTSORTIE_TASK = "ACTIFS/EDIT_AVITAILLEMENTENTREE";
export const DELETE_AVITAILLEMENTSORTIE_TASK = "ACTIFS/DELETE_AVITAILLEMENTENTREE";
export const RESET_AVITAILLEMENTSORTIE_TASK = "ACTIFS/RESET_AVITAILLEMENTENTREE";