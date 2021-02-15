const mapping = {
  '9005': {screen: 'CreerApurement', params: {qr: true}},
  '2052': {screen: 'DedRechercheRedressement', params: {qr: true}},
  '3072': {screen: 'controleRechercheDumScreen', params: {typeControle: 'RI'}},
  '3064': {screen: 'controleRechercheDumScreen', params: {typeControle: 'AC'}},
  '3086': {screen: 'controleRechercheDumScreen', params: {typeControle: 'TR'}},
  '5971': {screen: 'RechecheMLV', params: {}},
  '1201': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'EnleverMarchandise'},
  },
  /*'1203': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'EnleverMarchandiseParPesage'},
  },*/

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
  '823': { screen: 'RefPlaquesImm', params: {} },
  /*T6bis creation*/
  '110001': { screen: 'T6bisCreation', params: {} },
  '110002': { screen: 'T6bisRecherche', params: {} },
  '110005': { screen: 'T6bisRecherche', params: {} },
  '110007': { screen: 'T6bisRecherche', params: {} },
};

const DEFAULT_SCREEN = 'ionic';

const buildRoute = (code) => {
  return mapping[code].screen ? mapping[code].screen : DEFAULT_SCREEN;
};

const buildRouteWithParams = (code) => {
  if (mapping[code] && mapping[code].screen) {
    return {screen: mapping[code].screen, params: mapping[code].params};
  }
  return mapping[code];
};

export {buildRouteWithParams, buildRoute};
