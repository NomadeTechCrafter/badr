const mapping = {
  '9005': {screen: 'CreerApurement', params: {qr: true}},
  '9009': {screen: 'RechercheAtMulti', params: {qr: true}},
  '2243': {screen: 'RechercheConfirmationReceptionScreen', params: {}},
  '90023': {screen: 'SortiPortScreen', params: {}},
  '90026': {screen: 'AnnoterTrypt', params: {}},
  '100001': {screen: 'InitierCtrlRechercherScreen', params: {}},
  '90019': {screen: 'MainleveeScreen', params: {}},
  '5970': {screen: 'NewRechercheMLV', params: {}},
  '5971': {screen: 'NewRechercheMLV', params: {}},
  '2052': {screen: 'DedRechercheRedressement', params: {qr: false}},
  '20470': {screen: 'DedEnvoyerValeurScreen', params: {qr: false}},
  '20471': {screen: 'DedTraiterValeurScreen', params: {qr: false}},
  '3202': {screen: 'DedEtudeRetudeScreen', params: {qr: false}},
  '3203': {screen: 'DedRecoterEtudeScreen', params: {qr: false}},
  '3204': {screen: 'DedREtudeRetudeScreen', params: {qr: false}},
  '30661': {screen: 'ControleApresScanner', params: {}},
  '90025': {screen: 'VuEmbarqueScreen', params: {qr: true}},
  '90018': {screen: 'RechApurementParRefScreen', params: {}},
  '90008': {screen: 'RechParRefTrypScreen', params: {}},
  '1101': {screen: 'ConsultationTIScreen', params: {modeConsultation: 'E'}},
  '1102': {screen: 'ConsultationTIScreenI', params: {modeConsultation: 'I'}},
  '1103': {screen: 'ConsultationIgTIScreen', params: {modeConsultation: 'E'}},
  '1104': {screen: 'ConsultationIgTIScreenI', params: {modeConsultation: 'I'}},
  '6064': {screen: 'PecEtatChargementMainScreen', params: {}},
  '6060': {screen: 'PecEtatChargementVEMainScreen', params: {}},
  '767': {screen: 'BloquerOperateur', params: {}},
  '42997': {screen: 'DebloquerOperateur', params: {}},
  '306011': {screen: 'AjouterReconnaissance', params: {}},
  '306012': {screen: 'ModifierReconnaissance', params: {}},
  '306013': {screen: 'AnnulerReconnaissance', params: {}},
  '306014': {screen: 'AffecterAgentVisiteur', params: {}},
  '2301': {screen: 'DTPSSortieMainScreen', params: {}},
  '2302': {screen: 'DTPSEntreeMainScreen', params: {}},
  '2303': {screen: 'DTPSConsultationMainScreen', params: {}},
  '61525': {screen: 'RechercheAutoriserAcheminementScreen', params: {}},
  '6153': {screen: 'EcorExportVuEmbarqueScreen', params: {}},
  '6160': {screen: 'ConfirmationEntreeArriveeRechercheScreen', params: {}},
  '6151': {
    //CONFIRMATION ENTREE
    screen: 'ConfirmationEntreeRechercheScreen',
    params: {title: 'Ecran  Recherche Confirmation entree'},
  },
  '61530': {
    //CONFIRMATION ARRIVEE
    screen: 'ConfirmationArriveeRechercheScreen',
    params: {title: 'Ecran  Recherche Confirmation arrivee'},
  },
  '121711': {
    screen: 'EciConsultationBLS',
    params: {title: 'Ecran  Recherche Consultation BLS'},
  },
  '121714': {
    screen: 'EciConsultationBLE',
    params: {title: 'Ecran  Recherche Consultation BLE'},
  },
  '30805': {
    screen: 'CtrlResultatScannerMainScreen',
    params: {
      title: 'Résultat de scanner',
    },
  },
  '1226': {
    screen: 'ECIAppositionScellesRechercheScreen',
    params: {},
  },
  '2243': {screen: 'RechercheConfirmationReceptionScreen', params: {}},
  '14000011': {screen: 'ModifierCompteRenduMission', params: {}},
  '14000012': {screen: 'ValiderCompteRenduMission', params: {}},
  '4096': {screen: 'RefControleVehicule', params: {}},
  '823': {screen: 'RefPlaquesImm', params: {}},
  '14000010': {screen: 'CreerCompteRenduMission', params: {}},
  '5202': {screen: 'LiquidationRechercheScreen', params: {qr: false}},

  /*
  '9932': { screen: 'ActifsRecherche', params: {} },
  */
  '3064': {screen: 'controleRechercheDumScreen', params: {typeControle: 'AC'}},
  '3072': {screen: 'controleRechercheDumScreen', params: {typeControle: 'RI'}},
  '3086': {screen: 'controleRechercheDumScreen', params: {typeControle: 'TR'}},
  /*
  '2401': { screen: 'PreConfirmationArriveeMainScreen', params: {} },
  '2402': { screen: 'JustifRetardTransitMainScreen', params: {} },
  '90026': {screen: 'AnnoterTrypt', params: {}},
*/
  '110001': {screen: 'T6bisCreation', params: {}},
  '110002': {
    screen: 'T6bisRecherche',
    params: {title: 'Ecran Modification T6bis'},
  },
  '110005': {
    screen: 'T6bisRecherche',
    params: {title: 'Ecran Redressement T6bis'},
  },
  '110007': {
    screen: 'T6bisRecherche',
    params: {title: 'Ecran  Recherche T6BIS'},
  },

  '1201': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'EnleverMarchandise'},
  },
  '1202': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'PeserMarchandise'},
  },
  '1203': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'EnleverMarchandiseParPesage'},
  },
  '1213': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'EnleverMarchandiseSsManifeste'},
  },
  '1220': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'VerifierPContreEcorSsManifeste'},
  },
  '1219': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'ConfirmerArriveeSsManifeste'},
  },
  '1218': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'AutoriserAcheminementSsManifeste'},
  },

  '1204': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'VerifierParContreEcor'},
  },
  '110001': {screen: 'T6bisCreation', params: {}},
  '110002': {
    screen: 'T6bisRecherche',
    params: {title: 'Ecran Modification T6bis'},
  },
  '110005': {
    screen: 'T6bisRecherche',
    params: {title: 'Ecran Redressement T6bis'},
  },
  '110007': {
    screen: 'T6bisRecherche',
    params: {title: 'Ecran  Recherche T6BIS'},
  },
  '2401': {screen: 'PreConfirmationArriveeMainScreen', params: {}},
  '2402': {screen: 'JustifRetardTransitMainScreen', params: {}},
};

const ionicMapping = {};

const DEFAULT_SCREEN = 'ionic';

const buildRoute = (code) => {
  return mapping[code].screen ? mapping[code].screen : DEFAULT_SCREEN;
};
const buildIonicRoute = (code) => {
  return ionicMapping[code];
};
/*const buildRouteWithParams = (code) => {
  return mapping[code] && mapping[code].screen
    ? {screen: mapping[code].screen, params: mapping[code].params}
    : buildIonicRoute(code);
};*/
const buildRouteWithParams = (code) => {
  if (mapping[code] && mapping[code].screen) {
    return {screen: mapping[code].screen, params: mapping[code].params};
  }
  return mapping[code];
};

export {buildRouteWithParams, buildRoute};
