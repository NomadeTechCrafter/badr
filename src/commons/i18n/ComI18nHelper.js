import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

/**
 1) Import all translation modules imports
 */
import loginTranslations from '../../modules/hab/login/i18n/habLoginTranslateFr';
import smsVerifyTranslations from '../../modules/hab/smsVerify/i18n/habSmsVerifyTranslateFr';
import profileTranslations from '../../modules/hab/profile/i18n/habProfileTranslateFr';
import operatTranslations from '../../modules/hab/operateur/i18n/habOperatTranslateFr';
import annoncesTranslations from '../../modules/hab/annonces/i18n/habAnnoncesTranslateFr';
import atTranslations from '../../modules/at/apurement/i18n/atTranslateFr';
import refOperateursEconomiquesTranslations from '../../modules/referentiel/operateursEconomiques/i18n/refOperateursEconomiquesTranslateFr';
import ctrlReconnaissanceTranslations from '../../modules/controle/reconnaissance/i18n/ctrlReconnaissanceTranslateFr';
import enqCompteRenduTranslations from '../../modules/enquetes/compteRendu/i18n/enqCompteRenduTranslateFr';
import ctrlControleApresScannerTranslations from '../../modules/controle/controleApresScanner/i18n/ctrlControleApresScannerTranslateFr';
import vuEmbTranslations from '../../modules/DeclarationD17D20/vuEmbarquer/i18n/vuEmbarquerTranslateFr';
import vuEmbarquer from '../../modules/ecorExport/vuEmbarquer/i18n/ecorExpVuEmbarquerTranslateFr';
import commonTranslations from './common/ComTranslationsFr';
import dedouanementTranslateFr from '../../modules/dedouanement/redressement/i18n/dedouanementTranslateFr';
import controleRechrcheDumTranslateFr from '../../modules/controle/rechercheDum/i18n/controleRechrcheDumTranslateFr';
import controleBadTranslateFr from '../../modules/controle/BAD/i18n/controleBadTranslateFr';
import mainLeveeTranslateFr from '../../old/screens/mainlevee/i18/mainLeveeTranslateFr';
import ecorImportTranslateFr from '../../modules/ecorImport/i18/ecorImportTranslateFr';
import refControleVehiculeTranslateFr from '../../modules/referentiel/controleVehicules/i18n/refControleVehiculeTranslateFr';
import refPlaquesImmTranslateFr from '../../modules/referentiel/plaquesImmatriculation/i18n/refPlaquesImmTranslateFr';
import t6bisCreationTranslationsFr from '../../modules/t6bis/creation/i18n/t6bisCreationTranslateFr';
import t6bisGestionTranslateFr from '../../modules/t6bis/gestion/i18n/t6bisGestionTranslateFr';
import t6bisRechercheTranslationsFr from '../../modules/t6bis/recherche/i18n/t6bisRechercheTranslateFr';
import liquidationTranslateFr from '../../modules/liquidation/i18n/liquidationTranslateFr';
import ecorExpConfirmationEntreeTranslateFr from '../../modules/ecorExport/confirmationEntree/i18n/ecorExpConfirmationEntreeTranslateFr';
import ecorExpConfirmationArriveeTranslateFr from '../../modules/ecorExport/confirmationArrivee/i18n/ecorExpConfirmationArriveeTranslateFr';
import eciConsultationBLSTranslateFr from '../../modules/ecorImport/eciConsultationBLS/i18n/eciConsultationBLSTranslateFr';
import eciConsultationBLETranslateFr from '../../modules/ecorImport/eciConsultationBLE/i18n/eciConsultationBLETranslateFr';
import eciAppositionScellesRechercheTranslateFr from '../../modules/ecorImport/appositionScelles/recherche/i18n/eciAppositionScellesRechercheTranslateFr';
import eciAppositionScellesTranslateFr from '../../modules/ecorImport/appositionScelles/apposition/i18n/eciAppositionScellesTranslateFr';
import pecEtatChargementTranslateFr from '../../modules/pecEtatChargement/rechParRef/i18n/pecEtatChargementTranslateFr';
import pecEtatChargementVETranslateFr from '../../modules/pecEtatChargement/VuEmbarquer/i18n/pecEtatChargementTranslateFr';
import consultationIgTI from '../../modules/tarifIntegre/tiConsultationIgTI/i18n/tiConsultationIgTITranslateFr';
import consultationTI from '../../modules/tarifIntegre/tiConsultationTI/i18n/tiConsultationTITranslateFr';
import dedConfirmationReception from '../../modules/dedouanement/confirmationReception/i18n/dedConfirmationReceptionTranslateFr';
import decSortiPortTranslateFr from '../../modules/DeclarationD17D20/sortiPort/i18n/decSortiPortTranslateFr';
import decAnnoterTranslateFr from '../../modules/DeclarationD17D20/annoterD17D20/i18n/decAnnoterTranslateFr';
import dtpsSortieTranslateFr from '../../modules/dtps/dtpsSortie/i18n/sortieDTPSTranslateFr';
import dtpsEntreeTranslateFr from '../../modules/dtps/dtpsEntree/i18n/entreeDTPSTranslateFr';
import dtpsConsultationTranslateFr from '../../modules/dtps/consultation/i18n/consultationDTPSTranslateFr';
import rechercheAutoriserAcheminementTranslateFr from '../../modules/ecorExport/autoriserAcheminement/recherche/i18n/rechercheAutoriserAcheminementTranslateFr';
import autoriserAcheminementGestionTranslateFr from '../../modules/ecorExport/autoriserAcheminement/mainScreen/i18n/autoriserAcheminementGestionTranslateFr';
import actifsRapportConsultationTranslateFr from '../../modules/actifs/rapport/recherche/i18n/actifsRapportConsultationTranslateFr';
import actifsRapportCreationTranslateFr from '../../modules/actifs/rapport/creation/i18n/actifsRapportCreationTranslateFr';
import decRechParRefTranslateFr from '../../modules/DeclarationD17D20/rechParRef/i18n/decRechParRefTranslateFr';
import ecorExpConfirmationEntreeArriveeTranslateFr from '../../modules/ecorExport/confirmationEntreeArrivee/i18n/ecorExpConfirmationEntreeArriveeTranslateFr';
import ctrlResultatScannerTranslateFr from '../../modules/controle/ctrlResultatScanner/i18n/ctrlResultatScannerTranslateFr';
import mlvDelivrerTranslateFr from '../../modules/mainlevee/delivrer/i18n/mlvDelivrerTranslateFr';
import mlvListDeclarationsTranslateFr from '../../modules/mainlevee/listedeclarations/i18n/mlvListDeclarationsTranslateFr';
import mlvRechercheTranslateFr from '../../modules/mainlevee/recherche/i18n/mlvRechercherTranslateFr';
import dtPreConfirmationArriveeTranslateFr from '../../modules/delaiTransit/dtPreConfirmationArrivee/i18n/dtPreConfirmationArriveeTranslateFr'
import dtJustifRetardTransitTranslateFr from '../../modules/delaiTransit/dtJustifRetardTransit/i18n/dtJustifRetardTransitTranslateFr'
import decMainleveeTranslateFr from '../../modules/DeclarationD17D20/mainlevee/i18n/decMainleveeTranslateFr'


const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
/**
 2) Add here all translation modules imports
 */
let combined = {
  ...commonTranslations,
  ...annoncesTranslations,
  ...loginTranslations,
  ...smsVerifyTranslations,
  ...profileTranslations,
  ...operatTranslations,
  ...atTranslations,
  ...refOperateursEconomiquesTranslations,
  ...ctrlReconnaissanceTranslations,
  ...enqCompteRenduTranslations,
  ...ctrlControleApresScannerTranslations,
  ...refControleVehiculeTranslateFr,
  ...refPlaquesImmTranslateFr,
  ...controleBadTranslateFr,
  ...dedouanementTranslateFr,
  ...controleRechrcheDumTranslateFr,
  ...mainLeveeTranslateFr,
  ...ecorImportTranslateFr,
  //...actifTranslateFr,
  ...vuEmbTranslations,
  ...vuEmbarquer,
  ...liquidationTranslateFr,
  ...t6bisCreationTranslationsFr,
  ...t6bisGestionTranslateFr,
  ...t6bisRechercheTranslationsFr,
  ...actifsRapportConsultationTranslateFr,
  ...actifsRapportCreationTranslateFr,
  ...eciConsultationBLSTranslateFr,
  ...eciConsultationBLETranslateFr,
  ...eciAppositionScellesRechercheTranslateFr,
  ...eciAppositionScellesTranslateFr,
  ...pecEtatChargementTranslateFr,
  ...consultationIgTI,
  ...consultationTI,
  ...dedConfirmationReception,
  ...eciAppositionScellesTranslateFr,
  ...decSortiPortTranslateFr,
  ...decAnnoterTranslateFr,
  ...ecorExpConfirmationEntreeTranslateFr,
  ...ecorExpConfirmationArriveeTranslateFr,
  ...dtpsSortieTranslateFr,
  ...dtpsEntreeTranslateFr,
  ...dtpsConsultationTranslateFr,
  ...rechercheAutoriserAcheminementTranslateFr,
  ...autoriserAcheminementGestionTranslateFr,
  ...pecEtatChargementVETranslateFr,
  ...decRechParRefTranslateFr,
  ...ecorExpConfirmationEntreeArriveeTranslateFr,
  ...ctrlResultatScannerTranslateFr,
  ...mlvDelivrerTranslateFr,
  ...mlvListDeclarationsTranslateFr,
  ...mlvRechercheTranslateFr,
  ...dtPreConfirmationArriveeTranslateFr,
  ...dtJustifRetardTransitTranslateFr,
  ...decMainleveeTranslateFr
};
I18n.translations = {
  fr: combined,
  'en-US': combined,
};

//export default I18n;

export function translate(key, option) {
  return I18n.t(key, option);
}

export default translate;
