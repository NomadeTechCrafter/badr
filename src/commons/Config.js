import Config from 'react-native-config';
module.exports = {
  HOST: Config.HOST,
  HOST_BO: Config.HOST_BO,
  BASE_SERVER_URL: Config.SERVER_URL,
  BACK_OFFICE_BASE_URL: Config.BACK_OFFICE_BASE_URL,
  LOGIN_API: '/rest/api/login',
  LOGOUT_API: '/rest/api/logout',
  PROCESS_API: '/rest/api/process',
  SEND_STATS: '/action/set',
  SEND_CRASH: '/crashWebService/addCrash',
  TYPE_SERVICE_UC: 'UC',
  TYPE_SERVICE_SP: 'SP',
  MODULE_AT: 'AT',
  MODULE_CTRL: 'CONTROL_LIB',
  MODULE_ENQ: 'ENQ_LIB',
  MODULE_HAB: 'HAB_LIB',
  MODULE_REF: 'REF_LIB',
  MODULE_ECI: 'ECI_LIB',
  MODULE_T6BIS: 'T6BIS_LIB',
  AUTOCOMPLETE_MIN_CHARACTERS: 3,
  AUTOCOMPLETE_LIST_NB_ELEMENTS: -1,
  remote: true,
  bootstrapRoute: 'test',
};
