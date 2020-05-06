const mapping = {
  '7605': 'RechercheDum',
  '7615': 'RechercheDum',
};
const DEFAULT_SCREEN = 'Bienvenue';

const buildRoute = code => {
  return mapping[code] ? mapping[code] : DEFAULT_SCREEN;
};

const buildRouteWithParams = (code, params) => {
  return mapping[code]
    ? {screen: mapping[code], params: params}
    : {screen: DEFAULT_SCREEN, params: params};
};

export {buildRouteWithParams, buildRoute};
