const mapping = {
  '9005': {screen: 'CreerApurement', params: {qr: true}},
  // '767': {screen: 'BloquerOperateur', params: {}},
  // '42997': {screen: 'DebloquerOperateur', params: {}},
  // '306011': {screen: 'AjouterReconnaissance', params: {}},
  // '306012': {screen: 'ModifierReconnaissance', params: {}},
  // '306013': {screen: 'AnnulerReconnaissance', params: {}},
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
