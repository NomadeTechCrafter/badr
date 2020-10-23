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
  '1203': {
    screen: 'RechercheEcorImport',
    params: {typeEcorImport: 'EnleverMarchandiseParPesage'},
  },
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
