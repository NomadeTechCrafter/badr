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
import commonTranslations from './common/ComTranslationsFr';
import dedouanementTranslateFr from '../../modules/dedouanement/redressement/i18n/dedouanementTranslateFr';
import controleRechrcheDumTranslateFr from '../../modules/controle/rechercheDum/i18n/controleRechrcheDumTranslateFr';
import mainLeveeTranslateFr from '../../old/screens/mainlevee/i18/mainLeveeTranslateFr';
import ecorImportTranslateFr from '../../old/screens/ecorImport/i18/ecorImportTranslateFr';
import refControleVehiculeTranslateFr from '../../modules/referentiel/controleVehicules/i18n/refControleVehiculeTranslateFr';
import refPlaquesImmTranslateFr from '../../modules/referentiel/plaquesImmatriculation/i18n/refPlaquesImmTranslateFr';
import t6bisCreationTranslationsFr from '../../modules/t6bis/creation/i18n/t6bisCreationTranslateFr';
import t6bisGestionTranslateFr from '../../modules/t6bis/gestion/i18n/t6bisGestionTranslateFr';
import actifTranslateFr from '../../old/common/translations/actif/actifTranslateFr';

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
  ...dedouanementTranslateFr,
  ...controleRechrcheDumTranslateFr,
  ...mainLeveeTranslateFr,
  ...ecorImportTranslateFr,
  ...actifTranslateFr,
  ...t6bisCreationTranslationsFr,
  ...t6bisGestionTranslateFr
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
