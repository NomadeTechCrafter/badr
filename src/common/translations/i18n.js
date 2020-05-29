import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import fr from './fr/index';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  fr,
};

//export default I18n;

export function translate(key, option) {
  return I18n.t(key, option);
}

export default translate;
