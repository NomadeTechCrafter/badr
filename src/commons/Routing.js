const mapping = {
  '9005': {screen: 'CreerApurement', params: {qr: true}},
  //'9009': {screen: 'RechercheAtMulti', params: {qr: false}},
  '2243': {screen: 'RechercheConfirmationReceptionScreen', params: {}},
  '1226': {
    screen: 'ECIAppositionScellesRechercheScreen',
    params: {},
  },
  '90023': { screen: 'SortiPortScreen', params: {} },
  '2052': { screen: 'DedRechercheRedressement', params: { qr: false } },
  '20470': { screen: 'DedEnvoyerValeurScreen', params: { qr: false } },
  '20471': { screen: 'DedTraiterValeurScreen', params: { qr: false } },
  '61525': {screen: 'RechercheAutoriserAcheminementScreen',params: {}},
  '30661': { screen: 'ControleApresScanner', params: {} },
  '90025': { screen: 'VuEmbarqueScreen', params: { qr: true } },
  '90008': { screen: 'RechParRefTrypScreen', params: {} },
  

  '1101': { screen: 'ConsultationTIScreen', params: { modeConsultation: 'E' } },
  '1102': { screen: 'ConsultationTIScreenI', params: { modeConsultation: 'I' } },
  '1103': { screen: 'ConsultationIgTIScreen', params: { modeConsultation: 'E' } },
  '1104': {screen: 'ConsultationIgTIScreenI', params: {modeConsultation: 'I'}},
  '6064': {screen: 'PecEtatChargementMainScreen', params: {}},
  '6060': { screen: 'PecEtatChargementVEMainScreen', params: {} },
  '3064': {screen: 'controleRechercheDumScreen', params: {typeControle: 'AC'}},
  '3072': {screen: 'controleRechercheDumScreen', params: {typeControle: 'RI'}},
  '3086': {screen: 'controleRechercheDumScreen', params: {typeControle: 'TR'}},
  '767': { screen: 'BloquerOperateur', params: {} },
  '42997': { screen: 'DebloquerOperateur', params: {} },
  '6160': { screen: 'ConfirmationEntreeArriveeRechercheScreen', params: {} },
  '6151': {
    //CONFIRMATION ENTREE
    screen: 'ConfirmationEntreeRechercheScreen',
    params: { title: 'Ecran  Recherche Confirmation entree' },
  },
  '61530': {
    //CONFIRMATION ARRIVEE
    screen: 'ConfirmationArriveeRechercheScreen',
    params: { title: 'Ecran  Recherche Confirmation arrivee' },
  },
  '306011': { screen: 'AjouterReconnaissance', params: {} },
  '306012': { screen: 'ModifierReconnaissance', params: {} },
  '306013': { screen: 'AnnulerReconnaissance', params: {} },
  '306014': { screen: 'AffecterAgentVisiteur', params: {} },
  /*

  '2301': { screen: 'DTPSSortieMainScreen', params: {} },
  '2302': { screen: 'DTPSEntreeMainScreen', params: {} },
  '2303': { screen: 'DTPSConsultationMainScreen', params: {} },
  '121711': {
    screen: 'EciConsultationBLS',
    params: {title: 'Ecran  Recherche Consultation BLS'},
  },
  '6064': {screen: 'PecEtatChargementMainScreen', params: {}},
  '14000010': {screen: 'CreerCompteRenduMission', params: {}},
  '14000011': {screen: 'ModifierCompteRenduMission', params: {}},
  '14000012': {screen: 'ValiderCompteRenduMission', params: {}},
  '30661': {screen: 'ControleApresScanner', params: {}},
  '4096': {screen: 'RefControleVehicule', params: {}},
  '823': {screen: 'RefPlaquesImm', params: {}},


  '2052': {screen: 'DedRechercheRedressement', params: {qr: false}},
  '5971': {screen: 'RechecheMLV', params: {}},
  '1201': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'EnleverMarchandise'},
  },
  '1203': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'EnleverMarchandiseParPesage'},
  },
  '5202': {screen: 'LiquidationRechercheScreen', params: {qr: false}},*/

  /*T6bis creation*/
  /* '110001': {screen: 'T6bisCreation', params: {}},
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

  '121711': {
    screen: 'EciConsultationBLS',
    params: {title: 'Ecran  Recherche Consultation BLS'},
  },
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
    '61525': {
        //AUTORISER ACHEMINEMENT
        screen: 'RechercheAutoriserAcheminementScreen',
        params: {},
    },
'9932': { screen: 'ActifsRecherche', params: {} },
*/
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
