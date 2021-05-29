import Config from 'react-native-config';
module.exports = {
  HOST: 'badr4.douane.gov.ma',
  HOST_BO: 'bomobile-recette.douane.gov.ma',
  BASE_SERVER_URL: 'https://badr4.douane.gov.ma/badr',
  BACK_OFFICE_BASE_URL: 'https://bomobile-recette.douane.gov.ma/BadrMobile/api',
  LOGIN_API: '/rest/api/login',
  LOGOUT_API: '/rest/api/logout',
  PROCESS_API: '/rest/api/process',
  SEND_STATS: '/action/set',
  SEND_CRASH: '/crashWebService/addCrash',
  CHECK_VERION: '/mobileVersion',
  USER_SKIP_VERIVICATION_VERSION: ['Z193731', 'C974202', 'AD6205', 'AD6203'],
  IONIC_PACKAGE_NAME: 'ma.adii.badrmobile',
  DEFAULT_FONCTIONALITE_IONIC: 'cf4011',
  TYPE_SERVICE_UC: 'UC',
  TYPE_SERVICE_SP: 'SP',
  MODULE_AT: 'AT',
  MODULE_CTRL: 'CONTROL_LIB',
  MODULE_ENQ: 'ENQ_LIB',
  MODULE_HAB: 'HAB_LIB',
  MODULE_REF: 'REF_LIB',
  MODULE_ECI: 'ECI_LIB',
  MODULE_T6BIS: 'T6BIS_LIB',
  MODULE_ECOREXP: 'ECOREXP_LIB',
  MODULE_DED: 'DED_LIB',
  AUTOCOMPLETE_MIN_CHARACTERS: 3,
  AUTOCOMPLETE_LIST_NB_ELEMENTS: -1,
  remote: true,
  bootstrapRoute: 'test',
};
