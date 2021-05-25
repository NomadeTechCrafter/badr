const mapping = {
  '9005': {screen: 'CreerApurement', params: {qr: true}},
  /*'3064': {screen: 'controleRechercheDumScreen', params: {typeControle: 'AC'}},
  '3072': {screen: 'controleRechercheDumScreen', params: {typeControle: 'RI'}},
  '767': {screen: 'BloquerOperateur', params: {}},
  '42997': {screen: 'DebloquerOperateur', params: {}},
  '306011': {screen: 'AjouterReconnaissance', params: {}},
  '306012': {screen: 'ModifierReconnaissance', params: {}},
  '306013': {screen: 'AnnulerReconnaissance', params: {}},
  '14000010': {screen: 'CreerCompteRenduMission', params: {}},
  '14000011': {screen: 'ModifierCompteRenduMission', params: {}},
  '14000012': {screen: 'ValiderCompteRenduMission', params: {}},
  '30661': {screen: 'ControleApresScanner', params: {}},
  '4096': {screen: 'RefControleVehicule', params: {}},
  '121711': {screen: 'EciConsultationBLS', params: {}},
  '823': {screen: 'RefPlaquesImm', params: {}},
  '90025': {screen: 'VuEmbarqueScreen', params: {qr: true}},*/

  /*  '3086': {screen: 'controleRechercheDumScreen', params: {typeControle: 'TR'}},
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
  /*'110001': {screen: 'T6bisCreation', params: {}},
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
  },*/
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
