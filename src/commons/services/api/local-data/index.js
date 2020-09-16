const localStore = {
  rechercheEchangeMetVehicule: require('./referential/rechercheEchangeMetVehicule.json'),
  initControlerDedRI: require('./controle/initControleDedRI.json'),
  getCmbOperateur: require('./referential/getCmbOperateur.json'),
  getRegimByCode: require('./referential/getRegimByCode.json'),
  initDelivrerMlv: require('./mainLevee/initDelivrerMlv.json'),
  listeDeclarationsMLV: require('./mainLevee/listeDeclarationsMLV.json'),
  initEnleverMarchandise: require('./ecorImport/initEnleverMarchandise.json'),
  initEnleverMarchandiseParPesage: require('./ecorImport/initEnleverMarchandiseParPesage.json'),
};
export default localStore;
