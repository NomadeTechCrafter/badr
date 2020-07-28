const mapping = {
  '9005': {screen: 'CreerApurement', params: {qr: true}},
};

const ionicMapping = {
  '9932': {screen: 'app2.recherche', params: {}},
  '1101': {screen: 'app2.initConsultationTI', params: {}},
  '767': {screen: 'app2.bloquerOperateur', params: {}},
  '42997': {screen: 'app2.debloquerOperateur', params: {}},
  '110001': {
    screen: 'app2.ctrl_t6bis_type_chooser',
    params: {},
  },
};

const DEFAULT_SCREEN = 'ionic';

const buildRoute = (code) => {
  return mapping[code].screen ? mapping[code].screen : DEFAULT_SCREEN;
};

const buildRouteWithParams = (code) => {
  return mapping[code] && mapping[code].screen
    ? {screen: mapping[code].screen, params: mapping[code].params}
    : buildIonicRoute(code);
};

const buildIonicRoute = (code) => {
  return ionicMapping[code];
};

export {buildRouteWithParams, buildRoute};
