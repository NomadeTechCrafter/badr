const mapping = {
  '3072': {screen: 'RechercheDum', params: {typeControle: 'RI'}},
  '3064': {screen: 'RechercheDum', params: {typeControle: 'AC'}},
  '3086': {screen: 'RechercheDum', params: {typeControle: 'TR'}},
  '823': {screen: 'PlaquesImmatriculation', params: {}},
  '5971': {screen: 'RechecheMLV', params: {}},
  '597111': {screen: 'ScanQrCode', params: {screenAfterScan: 'RechecheMLV'}},
  '4096': {screen: 'ControleVehicules', params: {}},
  '9005': {screen: 'ScanQrCode', params: {screenAfterScan: 'CreerApurement'}},
  '1201': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'EnleverMarchandise'},
  },
  '1203': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'EnleverMarchandiseParPesage'},
  },
};

const ionicMapping = {
  '9932': {screen: 'app2.recherche', params: {}},
  '1101': {screen: 'app2.initConsultationTI', params: {}},
  '767': {screen: 'app2.bloquerOperateur', params: {}},
  '42997': {screen: 'app2.debloquerOperateur', params: {}},
  '110001': {screen: 'app2.ctrl_t6bis_type_chooser', params: {}},
};

const DEFAULT_SCREEN = 'ionic';

const buildRoute = (code) => {
  return mapping[code].screen ? mapping[code].screen : DEFAULT_SCREEN;
};

const buildIonicRoute = (code) => {
  return ionicMapping[code];
};

const buildRouteWithParams = (code) => {
  console.log('code ==> ' + code);
  return mapping[code] && mapping[code].screen
    ? {screen: mapping[code].screen, params: mapping[code].params}
    : buildIonicRoute(code);
};

export {buildRouteWithParams, buildRoute};
