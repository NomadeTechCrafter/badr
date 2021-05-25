const localStore = {
  rechercheEchangeMetVehicule: require('./referential/rechercheEchangeMetVehicule.json'),
  initControlerDedRI: require('./controle/initControleDedRI.json'),
  getCmbOperateur: require('./referential/getCmbOperateur.json'),
  getRegimByCode: require('./referential/getRegimByCode.json'),
  initDelivrerMlv: require('./mainLevee/initDelivrerMlv.json'),
  listeDeclarationsMLV: require('./mainLevee/listeDeclarationsMLV.json'),
  initEnleverMarchandise: require('./ecorImport/initEnleverMarchandise.json'),
  initEnleverMarchandiseParPesage: require('./ecorImport/initEnleverMarchandiseParPesage.json'),
  'ded.ConsulterDum': require('./dedouanement/consulterDum.json'),
  'ded.RecupererDum': require('./dedouanement/recupererDum.json'),
  getCmbBureau: require('./referential/getListeBureaux.json'),
  getCmbLieuStockageParBureau: require('./referential/getCmbLieuStockageParBureau.json'),
  getArrondissementByBureau: require('./referential/getArrondissementByBureau.json'),
  getCmbPays: require('./referential/getCmbPays.json'),
  getListeBureaux: require('./referential/getListeBureaux'),
};
export default localStore;
