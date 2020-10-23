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
import commonTranslations from './common/ComTranslationsFr';
import refControleVehiculeTranslateFr from '../../modules/referentiel/controleVehicules/i18n/refControleVehiculeTranslateFr';
import refPlaquesImmTranslateFr from '../../modules/referentiel/plaquesImmatriculation/i18n/refPlaquesImmTranslateFr';

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
    ...refControleVehiculeTranslateFr,
    ...refPlaquesImmTranslateFr,
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
