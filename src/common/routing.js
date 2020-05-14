const mapping = {
  '3072': {screen: 'RechercheDum', params: {typeControle: 'RI'}},
  '3064': {screen: 'RechercheDum', params: {typeControle: 'AC'}},
  '823': {screen: 'PlaquesImmatriculation', params: {}},
  '4096': {screen: 'ControleVehicules', params: {}},
};
const DEFAULT_SCREEN = 'Bienvenue';

const buildRoute = code => {
  return mapping[code].screen ? mapping[code].screen : DEFAULT_SCREEN;
};

const buildRouteWithParams = code => {
  console.log('code ==> ' + code);
  return mapping[code] && mapping[code].screen
    ? {screen: mapping[code].screen, params: mapping[code].params}
    : {screen: DEFAULT_SCREEN, params: {}};
};

export {buildRouteWithParams, buildRoute};
