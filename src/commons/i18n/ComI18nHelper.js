import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

/**
 1) Import all translation modules imports
 */
import loginTranslations from '../../modules/hab/login/i18n/habLoginTranslateFr';
import smsVerifyTranslations from '../../modules/hab/smsVerify/i18n/habSmsVerifyTranslateFr';
import profileTranslations from '../../modules/hab/profile/i18n/habProfileTranslateFr';
import annoncesTranslations from '../../modules/hab/annonces/i18n/habAnnoncesTranslateFr';
import atTranslations from '../../modules/at/apurement/i18n/atApurementTranslateFr';
import refOperateursEconomiquesTranslations from '../../modules/referentiel/operateursEconomiques/i18n/refOperateursEconomiquesTranslateFr';
import ctrlReconnaissanceTranslations from '../../modules/controle/reconnaissance/i18n/ctrlReconnaissanceTranslateFr';
import enqCompteRenduTranslations from '../../modules/enquetes/compteRendu/i18n/enqCompteRenduTranslateFr';
import ctrlControleApresScannerTranslations from '../../modules/controle/controleApresScanner/i18n/ctrlControleApresScannerTranslateFr';
import vuEmbTranslations from '../../modules/DeclarationD17D20/vuEmbarquer/i18n/vuEmbarquerTranslateFr';
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
import actifTranslateFr from '../../old/common/translations/actif/actifTranslateFr';
import liquidationTranslateFr from '../../modules/liquidation/i18n/liquidationTranslateFr';
import ecorExpConfirmationEntreeTranslateFr from '../../modules/ecorExport/confirmationEntree/i18n/ecorExpConfirmationEntreeTranslateFr';
import ecorExpConfirmationArriveeTranslateFr from '../../modules/ecorExport/confirmationArrivee/i18n/ecorExpConfirmationArriveeTranslateFr';
import eciConsultationBLSTranslateFr from '../../modules/ecorImport/eciConsultationBLS/i18n/eciConsultationBLSTranslateFr';
import eciAppositionScellesRechercheTranslateFr from '../../modules/ecorImport/appositionScelles/recherche/i18n/eciAppositionScellesRechercheTranslateFr';
import eciAppositionScellesTranslateFr from '../../modules/ecorImport/appositionScelles/apposition/i18n/eciAppositionScellesTranslateFr';
import rechercheAutoriserAcheminementTranslateFr from '../../modules/ecorExport/autoriserAcheminement/recherche/i18n/rechercheAutoriserAcheminementTranslateFr';
import autoriserAcheminementGestionTranslateFr from '../../modules/ecorExport/autoriserAcheminement/mainScreen/i18n/autoriserAcheminementGestionTranslateFr';

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
  ...actifTranslateFr,
  ...vuEmbTranslations,
  ...liquidationTranslateFr,
  ...t6bisCreationTranslationsFr,
  ...t6bisGestionTranslateFr,
  ...t6bisRechercheTranslationsFr,
  ...eciConsultationBLSTranslateFr,
  ...eciAppositionScellesRechercheTranslateFr,
  ...eciAppositionScellesTranslateFr,
  ...ecorExpConfirmationEntreeTranslateFr,
  ...ecorExpConfirmationArriveeTranslateFr,
  ...rechercheAutoriserAcheminementTranslateFr,
  ...autoriserAcheminementGestionTranslateFr
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
