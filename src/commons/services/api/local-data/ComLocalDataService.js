let localStore

if (process.env.NODE_ENV === 'development') {
  localStore = {
    login: require('../../../../modules/hab/login/service/local-data/habLoginData.json'),
    confirmerConnexionAgent: require('../../../../modules/hab/login/service/local-data/habConfirmerConnexionAgentData.json'),
    verifierCodeGenere: require('../../../../modules/hab/smsVerify/service/local-data/habVerifierCodeGenereData.json'),
    getListeProfil: require('../../../../modules/hab/profile/service/local-data/habGetListeProfilData.json'),
    getArrondissementsByAgentAndBureau: require('../../../../modules/hab/profile/service/local-data/habGetArrondissementsByAgentAndBureauData.json'),
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
    getCmbTypeContenant: require('./referential/getCmbTypeContenant.json'),
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
    getListMoyenTransport: require('../../../../modules/ecorExport/confirmationEntree/service/local-data/getListMoyenTransport.json'),
    initConfirmerEntree: require('../../../../modules/ecorExport/confirmationEntree/service/local-data/initConfirmerEntree.json'),
    findDumByEtatChargement: require('../../../../modules/ecorExport/confirmationEntree/service/local-data/findDumByEtatChargement.json'),
    recupererDumInfo: require('../../../../modules/ecorExport/confirmationEntree/service/local-data/recupererDumInfo.json'),
    findDumByAmp: require('../../../../modules/ecorExport/confirmationEntree/service/local-data/findDumByAmp.json'),
    confirmerEntree: require('../../../../modules/ecorExport/confirmationEntree/service/local-data/confirmerEntree.json'),
    initConfirmerArrivee: require('../../../../modules/ecorExport/confirmationArrivee/service/local-data/initConfirmerEntree.json'),
    confirmerArrivee: require('../../../../modules/ecorExport/confirmationArrivee/service/local-data/confirmerEntree.json'),
    findEciRechBls: require('../../../../modules/ecorImport/eciConsultationBLS/service/local-data/eciFindEciRechBls.json'),
    findEciRechBle: require('../../../../modules/ecorImport/eciConsultationBLE/service/local-data/eciFindEciRechBle.json'),
    initApposerScelles: require('../../../../modules/ecorImport/appositionScelles/recherche/service/local-data/eciInitAppositionScellesData.json'),
    recupererVersionAECVO: require('../../../../modules/pecEtatChargement/rechParRef/service/local-data/recupererVersionAECVO.json'),
    getListHistoriqueEtdc: require('../../../../modules/pecEtatChargement/rechParRef/service/local-data/getListHistoriqueEtdc.json'),
    getListVersionsEtdc: require('../../../../modules/pecEtatChargement/rechParRef/service/local-data/getListVersionsEtdc.json'),
    findResultatScannerByReferenceEtatChargement: require('../../../../modules/pecEtatChargement/rechParRef/service/local-data/findResultatScannerByReferenceEtatChargement.json'),
    getListInformationsConsultation: require('../../../../modules/tarifIntegre/tiConsultationIgTI/service/local-data/getListInformationsConsultation.json'),
    getListFlux: require('../../../../modules/tarifIntegre/tiConsultationTI/service/local-data/getFlux.json'),
    consulterTI: require('../../../../modules/tarifIntegre/tiConsultationTI/service/local-data/consulterTI.json'),
    'ded.getDecSortiPortParMatVehicule': require('../../../../modules/DeclarationD17D20/sortiPort/service/local-data/ded.getDecSortiPortParMatVehicule.json'),
    'ded.vuEmbRechercheDeclarationTrypByRef': require('../../../../modules/DeclarationD17D20/sortiPort/service/local-data/ded.vuEmbRechercheDeclarationTrypByRef.json'),
    'echange.findDtpsByCritereForSortie': require('../../../../modules/dtps/dtpsSortie/service/local-data/echange.findDtpsByCritereForSortie.json'),
    'echange.validerSortieDtps': require('../../../../modules/dtps/dtpsSortie/service/local-data/echange.validerSortieDtps.json'),
    'echange.findDtpsByCritereForEntree': require('../../../../modules/dtps/dtpsEntree/service/local-data/echange.findDtpsByCritereForEntree.json'),
    'echange.validerEntreeDtps': require('../../../../modules/dtps/dtpsEntree/service/local-data/echange.validerEntreeDtps.json'),
    'echange.findDtpsByCritere': require('../../../../modules/dtps/consultation/service/local-data/echange.findDtpsByCritere.json'),
    'ded.sortiPortRechercheDeclarationTrypByRef': require('../../../../modules/DeclarationD17D20/sortiPort/service/local-data/ded.sortiPortRechercheDeclarationTrypByRef.json'),
    'ece.initAutoriserAcheminement': require('../../../../modules/ecorExport/autoriserAcheminement/recherche/service/local-data/initAutoriserAcheminementData.json'),
    getCmbOperateurByCode: require('../../../../modules/ecorExport/autoriserAcheminement/mainScreen/service/local-data/getCmbOperateurByCodeData.json'),
    getScellesApposees: require('../../../../modules/ecorExport/autoriserAcheminement/mainScreen/service/local-data/getScellesApposeesData.json'),
    'ded.isRegimeTransbordement': require('../../../../modules/ecorExport/autoriserAcheminement/mainScreen/service/local-data/isRegimeTransbordementData.json'),
    'ded.vuEmbRechercheDeclarationTrypByRef': require('../../../../modules/DeclarationD17D20/vuEmbarquer/service/local-data/ded.vuEmbRechercheDeclarationTrypByRef.json'),
    'ded.getDecTryptiqueParMatVehicule': require('../../../../modules/DeclarationD17D20/sortiPort/service/local-data/ded.getDecSortiPortParMatVehicule.json'),
    findListDumConfirmerEntreeArrivee: require('../../../../modules/ecorExport/confirmationEntreeArrivee/service/local-data/findListDumConfirmerEntreeArrivee.json'),
    'ded.ConsulterDum': require('../../../../modules/dedouanement/redressement/service/local-data/ded.ConsulterDum.json'),
    'ded.initRechercheDeclarationTryp': require('../../../../modules/DeclarationD17D20/rechParRef/service/local-data/ded.initRechercheDeclarationTryp.json'),
    'ded.findTrypByRef': require('../../../../modules/DeclarationD17D20/rechParRef/service/local-data/ded.findTrypByRef.json'),
    'initAffecterAgentVisiteur': require('../../../../modules/controle/reconnaissance/service/local-data/initAffecterAgentVisiteurData.json'),
    listeDeclarationsRec: require('../../../../modules/controle/reconnaissance/service/local-data/listeDeclarationsRecData.json'),
    initVuEmbarquer: require('../../../../modules/ecorExport/vuEmbarquer/service/local-data/initVuEmbarquer.json'),
    findResultatScanner: require('../../../../modules/controle/ctrlResultatScanner/service/local-data/findResultatScanner.json'),
    lookupControleApresScanner: require('../../../../modules/controle/controleApresScanner/service/local-data/lookupControleApresScanner.json'),
    initPreConfirmationArrivee: require('../../../../modules/delaiTransit/dtPreConfirmationArrivee/service/local-data/initPreConfirmationArriveeOK.json'),
    confirmerPreConfirmationArrivee: require('../../../../modules/delaiTransit/dtPreConfirmationArrivee/service/local-data/confirmerPreConfirmationArriveeOK.json'),
    initMainleveeTrypByRef: require('../../../../modules/DeclarationD17D20/mainlevee/service/local-data/initMainleveeTrypByRef.json')
  };
}
export default localStore;
