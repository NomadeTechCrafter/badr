const localStore = {
  login: require('../../../../modules/hab/login/service/local-data/habLoginData.json'),
  confirmerConnexionAgent: require('../../../../modules/hab/login/service/local-data/habConfirmerConnexionAgentData.json'),
  verifierCodeGenere: require('../../../../modules/hab/smsVerify/service/local-data/habVerifierCodeGenereData.json'),
  initControlerDedRI: require('./controle/initControleDedRI.json'),
  initControlerDedACVP: require('./controle/initControlerDedACVP.json'),
  initEnleverMarchandise: require('./ecorImport/initEnleverMarchandise.json'),
  getLotsApures: require('./ecorImport/getLotsApures.json'),
  getCmbOperateur: require('./ecorImport/getCmbOperateur.json'),
  getEquipementsbyLot: require('./ecorImport/getEquipementsbyLot.json'),
  initEnleverMarchandiseParPesage: require('./ecorImport/initEnleverMarchandiseParPesage.json'),
  enleverMarchandise: require('./ecorImport/enleverMarchandise.json'),
  'ded.ConsulterDum': require('./dedouanement/consulterDum.json'),
  'ded.RecupererDum': require('./dedouanement/recupererDum.json'),
  'ded.getTraceSignatureDUM': require('./dedouanement/Documents/getTraceSignatureDUM.json'),
  'ded.recupererDocumentsExigiblesDUM': require('./dedouanement/Documents/recupererDocumentsExigiblesDUM.json'),
  'ded.consulterFichierPdfDumSign': require('./dedouanement/Documents/consulterFichierPdfDumSign.json'),
  'ded.consulterFichier': require('./dedouanement/Documents/consulterFichier.json'),
  'ded.consulterFichierPdfXMLSign': require('./dedouanement/Documents/consulterFichierPdfXMLSign.json'),
  'ded.recupererDocumentsAnnexesDUM': require('./dedouanement/Documents/documentsAnnexesDUM.json'),
  'ded.recupererListeDemandesDocumentDUM': require('./dedouanement/Documents/recupererListeDemandesDocumentDUM.json'),
  'ded.recupererListeVersions': require('./dedouanement/info/dataListeVersions.json'),
  'ded.recupererHistoriqueDeclaration': require('./dedouanement/info/dataHistoriqueDeclaration.json'),
  'ded.recupererListeHistoriqueVersion': require('./dedouanement/info/dataListeHistoriqueVersion.json'),
  'ded.recupererListeAnnotations': require('./dedouanement/info/dataListeAnnotations.json'),
  'ded.recupererEstimationDroitsTaxes': require('./dedouanement/info/dataEstimationDroitsTaxes.json'),
  'ded.recupererListeDeclarationsCouplees': require('./dedouanement/info/dataListeDeclarationsCouplees.json'),
  'ded.getCertificatsDechargeCompteRED': require('./dedouanement/info/getCertificatsDechargeCompteRED.json'),
  'ded.isCautionAccessible': require('./dedouanement/accesOnglet/isCautionAccessible.json'),
  'ded.isPreapurementDSAccessible': require('./dedouanement/accesOnglet/isPreapurementDSAccessible.json'),
  'ded.isImputationCompteREDAccessible': require('./dedouanement/accesOnglet/isImputationCompteREDAccessible.json'),
  'ded.isImputationTitresDeChangeAccessible': require('./dedouanement/accesOnglet/isImputationTitresDeChangeAccessible.json'),
  getOsById: require('../../../../modules/actifs/rapport/creation/service/local-data/getOsByIdData.json'), 
  getOrdresService: require('../../../../modules/actifs/rapport/recherche/service/local-data/getOrdresServiceData.json'),
  getNaturesIncident: require('./actifs/dataNatureMarchandises.json'),
  getNaturesMarchandise: require('./actifs/dataNatureMarchandises.json'),
  getUnitesMesure: require('./actifs/dataUnitesMesure.json'),
  getTypesIncident: require('./actifs/rapportDetails.json'),
  getRsByIdOs: require('./actifs/dataRapportServiceAvecValidation.json'),
  enregistrerRS: require('./actifs/dataRapportServiceAvecValidation.json'),
  getNaturesVehicule: require('./actifs/dataNaturesVehicule.json'),
  getCmbBureau: require('./referential/getListeBureaux.json'),
  getCmbLieuStockageParBureau: require('./referential/getCmbLieuStockageParBureau.json'),
  getArrondissementByBureau: require('./referential/getArrondissementByBureau.json'),
  getCmbPays: require('./referential/getCmbPays.json'),
  getListeBureaux: require('./referential/getListeBureaux'),
  getCmbAllTypeCautionnement: require('./referential/getCmbAllTypeCautionnement.json'),
  'ded.getDecisionCautionVO': require('./dedouanement/caution/getDecisionCautionVO.json'),
  initLiquiderAutomatiquement: require('../../../../modules/liquidation/service/local-data/initLiquiderAutomatiquement.json'),
  getRefEnteteDeclarationEnDouane: require('../../../../modules/liquidation/service/local-data/getRefEnteteDeclarationEnDouane.json'),
  typesBordereau: require('../../../../modules/liquidation/service/local-data/typesBordereau.json'),
  getRubriqueComptableByTypeConsignation: require('../../../../modules/liquidation/service/local-data/getRubriqueComptableByTypeConsignation.json'),
  getRubriquesComptablesGlobalesVO: require('../../../../modules/liquidation/service/local-data/getRubriquesComptablesGlobalesVO.json'),
  liquiderTaxeGlobale: require('../../../../modules/liquidation/service/local-data/liquiderTaxeGlobale.json'),
  consignerTaxeGlobale: require('../../../../modules/liquidation/service/local-data/consignerTaxeGlobale.json'),
  getAllTypeT6bis: require('../../../../modules/t6bis/creation/service/local-data/getAllTypeT6bisData.json'),
  T6bisInitForCreate: require('../../../../modules/t6bis/creation/service/local-data/t6bisInitForCreateData.json'),
  initT6bisEnteteSection: require('../../../../modules/t6bis/gestion/service/local-data/initT6bisEnteteSectionData.json'),
  findIntervenant: require('../../../../modules/t6bis/gestion/service/local-data/findIntervenantData.json'),
  completeNatureMarchandise: require('../../../../modules/t6bis/gestion/service/local-data/completeNatureMarchandiseData.json'),
  completeDeviseChangeCmb: require('../../../../modules/t6bis/gestion/service/local-data/completeDeviseChangeCmbData.json'),
  completeUniteQte: require('../../../../modules/t6bis/gestion/service/local-data/completeUniteQteData.json'),
  getListRubrique: require('../../../../modules/t6bis/gestion/service/local-data/getListRubriqueData.json'),
  T6bisInitForUpdate: require('../../../../modules/t6bis/recherche/service/local-data/t6bisInitForUpdateData2.json'),
  getListRubriqueMtmTaxationGlobale: require('../../../../modules/t6bis/gestion/service/local-data/getListRubriqueMtmTaxationGlobaleData.json'),
  T6bisInitForRedresser: require('../../../../modules/t6bis/recherche/service/local-data/t6bisInitForRedresserData.json'),
  getCmbActeurs: require('../../../../modules/actifs/rapport/creation/service/local-data/getCmbActeursData.json'),
  /* T6bisInitForUpdate: require('../../../../modules/t6bis/recherche/service/local-data/t6bisInitForUpdateDataError.json'), */
};
export default localStore;
