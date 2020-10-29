const localStore = {
  login: require('../../../../modules/hab/login/service/local-data/habLoginData.json'),
  confirmerConnexionAgent: require('../../../../modules/hab/login/service/local-data/habConfirmerConnexionAgentData.json'),
  verifierCodeGenere: require('../../../../modules/hab/smsVerify/service/local-data/habVerifierCodeGenereData.json'),
  initControlerDedRI: require('./controle/initControleDedRI.json'),
  initEnleverMarchandise: require('./ecorImport/enleverMarchandise.json'),
  initEnleverMarchandiseParPesage: require('./ecorImport/initEnleverMarchandiseParPesage.json'),
  'ded.ConsulterDum': require('./dedouanement/consulterDum.json'),
  'ded.RecupererDum': require('./dedouanement/recupererDum.json'),
  'ded.getTraceSignatureDUM': require('./dedouanement/getTraceSignatureDUM.json'),
  'ded.recupererDocumentsExigiblesDUM': require('./dedouanement/recupererDocumentsExigiblesDUM.json'),
};
export default localStore;
