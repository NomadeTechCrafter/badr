import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import fr from '../../common/translations/fr';

/**
 1) Import all translation modules imports
 */
import loginTranslations from '../../hab/login/i18n/habLoginTranslate';
import smsVerifyTranslations from '../../hab/smsVerify/i18n/habSmsVerifyTranslate';
import profileTranslations from '../../hab/profile/i18n/habProfileTranslate';
import annoncesTranslations from '../../hab/annonces/i18n/habAnnoncesTranslate';
import commonTranslations from '../i18n/common';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
/**
 2) Add here all translation modules imports
 */
let combined = {...commonTranslations, ...annoncesTranslations, ...loginTranslations, ...smsVerifyTranslations, ...profileTranslations};
I18n.translations = {
  fr: combined,
};

//export default I18n;

export function translate(key, option) {
  return I18n.t(key, option);
}

export default translate;
