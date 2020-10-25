const localStore = {
  login: require('../../../../modules/hab/login/service/local-data/habLoginData.json'),
  confirmerConnexionAgent: require('../../../../modules/hab/login/service/local-data/habConfirmerConnexionAgentData.json'),
  verifierCodeGenere: require('../../../../modules/hab/smsVerify/service/local-data/habVerifierCodeGenereData.json'),
  initControlerDedRI: require('./controle/initControleDedRI.json'),
};
export default localStore;
