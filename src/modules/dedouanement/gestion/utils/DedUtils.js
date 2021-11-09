import _ from 'lodash';
import { CATEGORIE_GLOBALE_INIT, CATEGORIE_GLOBALE_VOY, CATEGORIE_NORMALE, CATEGORIE_PROVISOIRE_INIT, CATEGORIE_PROVISOIRE_VOY, CATEGORIE_SIMPLIFIEE_APU, CATEGORIE_SIMPLIFIEE_DEC, CATEGORIE_TRYPTIQUE_APU, CATEGORIE_TRYPTIQUE_DEC, TYPEDED_APURSIMPLIFIEE, TYPEDED_APURTRIPTYQUE, TYPEDED_DSIMPLIFIEE, TYPEDED_DTRIPTYQUE, TYPEDED_DUMPROV_INIT, TYPEDED_SOUSDUM_GLOB, TYPEDED_SOUSDUM_PROV } from './DedConstants';

export const getValueByPath = (key, object, reducer) => {
  if (key === 'dedDumSectionEnteteVO.typeDUM' || key === 'sousDum') {
    //console.log('----getValueByPath--', JSON.stringify(object));
  }

  return _.get(object, key)
    ? _.get(object, key)
    : _.get(object, reducer + '.data.' + key);
};

export const cleDS = (obj) => {
  var alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  obj = obj % 23;
  alpha = alpha.charAt(obj);
  return alpha;
};

export const getValueByPaths = (key1, key2, object) => {
  return _.get(object, key1) ? _.get(object, key1) : _.get(object, key2);
};

export const getAnnee = (reference) => {
  return reference ? reference.substring(6, 10) : '';
};

export const getBureau = (reference) => {
  return reference ? reference.substring(0, 3) : '';
};

export const getRegime = (reference) => {
  return reference ? reference.substring(3, 6) : '';
};

export const getSerie = (reference) => {
  return reference ? reference.substring(10, 17) : '';
};

export const getCategorieDum = (typeDum, isSousDum) => {
  // console.log('getCategorieDum typeDum :', typeDum);
  if (typeDum == '01') {
    return '1';
  } else if (typeDum == '02') {
    return isSousDum ? '4' : '2';
  } else if (typeDum == '04') {
    return '4';
  } else if (typeDum == '99') {
    return '99';
  }
};

export const initDedCategorie=(typeDeclarationParam, refDumInit)=> {
	
		let categorie = DedCstPresentation.CATEGORIE_COMPLEMENTAIRE;

  if (typeDeclarationParam == TYPEDED_APURSIMPLIFIEE) {
    categorie = CATEGORIE_SIMPLIFIEE_APU;
  } else if (typeDeclarationParam == TYPEDED_DSIMPLIFIEE) {
    categorie = CATEGORIE_SIMPLIFIEE_DEC;
  } else if (typeDeclarationParam == TYPEDED_APURTRIPTYQUE) {
    categorie = CATEGORIE_TRYPTIQUE_APU;
  } else if (typeDeclarationParam == TYPEDED_DTRIPTYQUE) {
    categorie = CATEGORIE_TRYPTIQUE_DEC;
  } else if (typeDeclarationParam == TYPEDED_DUM) {
    categorie = CATEGORIE_NORMALE;
  } else if (typeDeclarationParam == TYPEDED_DUMGLOB_INIT) {
    categorie = CATEGORIE_GLOBALE_INIT;
  } else if (typeDeclarationParam == TYPEDED_DUMPROV_INIT) {
    categorie = CATEGORIE_PROVISOIRE_INIT;
  } else if (typeDeclarationParam == TYPEDED_SOUSDUM_PROV) {
    categorie = CATEGORIE_PROVISOIRE_VOY;
  } else if (typeDeclarationParam == TYPEDED_SOUSDUM_GLOB) {
    categorie = CATEGORIE_GLOBALE_VOY;
  }

  if (!_.isEmpty(refDumInit)) {
    categorie = CATEGORIE_PROVISOIRE_VOY;
  }
  return categorie;
}
