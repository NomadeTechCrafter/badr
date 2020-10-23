const mapping = {
  '9005': {screen: 'CreerApurement', params: {qr: true}},
  '4096': {screen: 'RefControleVehicule', params: {}},
  '823': {screen: 'RefPlaquesImm', params: {}},
  '767': {screen: 'BloquerOperateur', params: {}},
  '42997': {screen: 'BloquerOperateur', params: {}},
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
