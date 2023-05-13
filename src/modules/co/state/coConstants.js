export const CO_CONSULTATION_REQUEST =
  '[CO_CONSULTATION] CO_CONSULTATION_REQUEST';
export const CO_CONSULTATION_SUCCESS =
  '[CO_CONSULTATION] CO_CONSULTATION_SUCCESS';
export const CO_CONSULTATION_FAILED =
  '[CO_CONSULTATION] CO_CONSULTATION_FAILED';
export const CO_CONSULTATION_IN_PROGRESS =
  '[CO_CONSULTATION] CO_CONSULTATION_IN_PROGRESS';
export const CO_CONSULTATION_INIT = '[CO_CONSULTATION] CO_CONSULTATION_INIT';

export const criteresRecherche = [
  {
    code: 'numeroSerie',
    libelle: 'Numéro de série du document (Disponible sur le pré-imprimé)',
  },
  {code: 'reference', libelle: "Référence du certificat d'origine"},
  {code: 'referenceDUM', libelle: 'Référence de la déclaration'},
  {
    code: 'dates',
    libelle: "Date d'enregistrement du certificat d'enregistrement",
  },
];

export const typesCertificats = [
  {
    code: '01',
    libelle: 'SGP FORMULE A	AU,BY,JP,KZ,RU,TR,CA,NZ',
  },
  {
    code: '02',
    libelle: 'Certificat d’origine arabe',
  },
  {
    code: '03',
    libelle: 'Certificat d’origine émirats arabes unis',
  },
  {
    code: '04',
    libelle: 'Certificat d’origine jaune	EG,JO,LY,IQ,SA,MR',
  },
  {
    code: '05',
    libelle: 'Certificat d’origine tunisie',
  },
  {
    code: '06',
    libelle: 'Certificat d’origine EUR-MED TR,TN,EG,JO,UE,AELE,UK',
  },
  {
    code: '07',
    libelle: 'Certificat d’origine EUR.1 TR,TN,EG,JO,UE,AELE,UK',
  },
];

export const languesImpression = [
  {
    code: 'AR',
    libelle: 'ARABE',
  },
  {
    code: 'EN',
    libelle: 'Anglais',
  },
  {
    code: 'FR',
    libelle: 'Français',
  },
];

export const radioButtonsDataCumulAR = [
  {
    id: '2',
    label: 'نعم',
    value: 'true',
  },
  {
    id: '1',
    label: 'لا',
    value: 'false',
  },
];
export const radioButtonsDataCumulFR = [
  {
    id: '2',
    label: 'Oui',
    value: 'true',
  },
  {
    id: '1',
    label: 'Non',
    value: 'false',
  },
];
