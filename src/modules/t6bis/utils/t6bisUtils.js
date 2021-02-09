import _ from 'lodash';
import moment from 'moment';
import * as Constants from "./t6bisConstants";

export const getValueByPath = (key, object) => {


  return object ? _.get(object, key) : '';

};




export const getValueByPaths = (key1, key2, object) => {
  return _.get(object, key1) ? _.get(object, key1) : _.get(object, key2);
};


export const getSerie = (reference) => {
  return reference ? reference.substring(7, 16) : '';
};

export const hasAtLeastOneTaxationLine = (t6bis) => {
  /*
  verify if each article has at least one ligne taxation
  */
  let hasIt = false;
  if (t6bis && t6bis.listeArticleT6bis) {
    t6bis.listeArticleT6bis.forEach(function (current) {
      if (current) {
        if (( current.listeT6bisLigneTaxation && current.listeT6bisLigneTaxation.length > 0) || (t6bis.listeT6bisLigneTaxation && t6bis.listeT6bisLigneTaxation.length > 0) || (t6bis.listeT6bisLigneTaxationGlobale && t6bis.listeT6bisLigneTaxationGlobale.length > 0)) {
          hasIt = true;
        } else {
          hasIt = false;
        }
      }
    });
  }
  console.log(hasIt);
  return hasIt;
}

export const format = (date) => {

  return moment(date).format('DD/MM/YYYY HH:mm',)
}

export const getState = (state) => {
  console.log('state*******************************', state, getValueByPath(Constants.STATES, state), Constants.STATES);
  let value;
  Object.keys(Constants.STATES).map((key, val) => {
    console.log(key, val);
    console.log(Constants.STATES[key]);
    if (key === state) {
      value = Constants.STATES[key];
    }
    console.log(value);
  });
  return value;
}

export const validateCin = (cin) => {
  console.log('validateCin**************************************************************************start', cin);
  if (cin) {
    var condition1 = cin.charAt(0).match(/[a-z]/i);
    console.log(condition1);
    var condition2 = cin.charAt(1).match(/[0-9]/i);
    console.log(condition2);
    var c1 = false;
    var c2 = false;
    var c3 = cin.length >= 2 && cin.length <= 8;
    if (condition1 && condition1.length > 0) {
      c1 = true;
    }
    if (condition2 && condition2.length > 0) {
      c2 = true;
    }
    if (c1 && c2 && c3) {
      var part2 = cin.substr(1).padStart(7, '0');
      console.log('validateCin**************************************************************************end' + cin.substr(0, 1) + part2);
      return cin.substr(0, 1) + part2;
    }
  }
  console.log('validateCin**************************************************************************end');
  return '';
}

export const stringEmpty = (string) => {
  return (string != null && string.trim() != "");
}

export const isRedevableOperator = (codeTypeT6bis) => {
  console.log('Constants.TYPE_T6BIS[2] ', Constants.TYPE_T6BIS[2])
  console.log((codeTypeT6bis === Constants.TYPE_T6BIS[2].code));
  return (codeTypeT6bis === Constants.TYPE_T6BIS[2].code);
}

export const isRedevableNonOperator = (codeTypeT6bis) => {
  console.log((codeTypeT6bis === Constants.TYPE_T6BIS[0].code || codeTypeT6bis === Constants.TYPE_T6BIS[1].code || codeTypeT6bis === Constants.TYPE_T6BIS[3].code || codeTypeT6bis === Constants.TYPE_T6BIS[5].code || codeTypeT6bis === Constants.TYPE_T6BIS[6].code));
  return (codeTypeT6bis === Constants.TYPE_T6BIS[0].code || codeTypeT6bis === Constants.TYPE_T6BIS[1].code || codeTypeT6bis === Constants.TYPE_T6BIS[3].code || codeTypeT6bis === Constants.TYPE_T6BIS[5].code || codeTypeT6bis === Constants.TYPE_T6BIS[6].code);
}

export const isMtm = (codeTypeT6bis) => {
  return (codeTypeT6bis === Constants.TYPE_T6BIS[0].code);
}
export const isCm = (codeTypeT6bis) => {
  return (codeTypeT6bis === Constants.TYPE_T6BIS[1].code);
}
export const isTaxeCoordination = (codeTypeT6bis) => {
  return (codeTypeT6bis === Constants.TYPE_T6BIS[2].code);
}
export const isContrainteParCorps = (codeTypeT6bis) => {
  return (codeTypeT6bis === Constants.TYPE_T6BIS[3].code);
}
export const isAffaireChange = (codeTypeT6bis) => {
  return (codeTypeT6bis === Constants.TYPE_T6BIS[5].code);
}

export const isAmendeTransactionnelle = (codeTypeT6bis) => {
  return (codeTypeT6bis === Constants.TYPE_T6BIS[6].code);
}

export const formatSerie = (numeroSerieAffaire) => {
  if (numeroSerieAffaire && numeroSerieAffaire.length < 6) {
    numeroSerieAffaire = numeroSerieAffaire.padStart(6, "0");
  } else if (numeroSerieAffaire && numeroSerieAffaire.length > 6) {
    numeroSerieAffaire = numeroSerieAffaire.substring(0, 6);
  }
  console.log('formatSerie : ', numeroSerieAffaire);
  return numeroSerieAffaire;
}

export const formatNomenclature = function (codeNomenclature) {
  var limit = 10;
  if (

    codeNomenclature &&
    codeNomenclature.length < limit
  ) {
    return codeNomenclature
      .toString()
      .padStart(limit, "1");
  }
  else {
    return codeNomenclature
      .toString()
      .substr(0, limit);
  }

};

export const getCurrentArticle = (codeTypeT6bis,num=0) => {

  
  if (isMtm(codeTypeT6bis)) {
    return {
      id: num + 1,
      numArticle: num + 1,
      codeNomenclature: null,
      natureMarchandise: null,
      designation: null,
      valeurTaxable: null,
      montantFacture: null,
      devise: null,
      uniteQuantite: null,
      isNew: true,
      listeT6bisLigneTaxation: []
    }
  }
  if (isCm(codeTypeT6bis)) {
    return {
      numArticle: 1,
      marque: null,
      modele: null,
      cylindree: null,
      numeroCadre: null,
      numeroImmatriculation: null,
      dateMiseCirculation: null,
      valeurTaxable: null,
      montantFacture: null,
      devise: null,
      isNew: true,
      listeT6bisLigneTaxation: []
    }
  }
  return null;
}
