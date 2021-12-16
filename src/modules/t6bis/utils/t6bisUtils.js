import _ from 'lodash';
import moment from 'moment';
import {ComBadrNumericTextInputComp} from '../../../commons/component';
import {ComSessionService} from '../../../commons/services/session/ComSessionService';
import * as Constants from './t6bisConstants';

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
        if (
          (current.listeT6bisLigneTaxation &&
            current.listeT6bisLigneTaxation.length > 0) ||
          (t6bis.listeT6bisLigneTaxation &&
            t6bis.listeT6bisLigneTaxation.length > 0) ||
          (t6bis.listeT6bisLigneTaxationGlobale &&
            t6bis.listeT6bisLigneTaxationGlobale.length > 0)
        ) {
          hasIt = true;
        } else {
          hasIt = false;
        }
      }
    });
  }
  console.log(hasIt);
  return hasIt;
};

export const format = (date) => {
  return moment(date).format('DD/MM/YYYY HH:mm');
};

export const getState = (state) => {
  console.log(
    'state*******************************',
    state,
    getValueByPath(Constants.STATES, state),
    Constants.STATES,
  );
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
};

export const validateCin = (cin) => {
  console.log(
    'validateCin**************************************************************************start',
    cin,
  );
  if (cin) {
    var condition1 = cin.charAt(0).match(/[a-z]/i);
    console.log(condition1);
    var condition2 = cin.charAt(1).match(/[a-z]/i);
    console.log(condition2);
    var condition3 = cin.charAt(1).match(/[0-9]/i);
    console.log(condition3);
    var c1 = false;
    var c2 = false;
    var c3 = false;
    var alphaPart = 1;
    if (cin.length > 8) {
      cin = cin.substring(0, 8);
    }
    var c4 = cin.length >= 2 && cin.length <= 8;
    if (condition1 && condition1.length > 0) {
      c1 = true;
    }
    if (condition2 && condition2.length > 0) {
      c2 = true;
      alphaPart = 2;
    }
    if (condition3 && condition3.length > 0) {
      c3 = true;
    }
    if (c1 && (c2 || c3) && c4) {
      var part2 = cin.substr(alphaPart).padStart(7 - alphaPart+1, '0');
      console.log(
        'validateCin**************************************************************************end cin : ' +
        cin 
      );
      console.log(
        'validateCin**************************************************************************end cin.substr(1) :' +
        cin.substr(1)
      );
      console.log(
        'validateCin**************************************************************************end cin.substr(1).padStart(7, 0) :' +
        cin.substr(alphaPart).padStart(7 - alphaPart+1, '0')
      );

      console.log(
        'validateCin**************************************************************************end' +
          cin.substr(0, 1) +
          part2,
      );
      return cin.substr(0, alphaPart) + part2;
    }
  }
  console.log(
    'validateCin**************************************************************************end',
  );
  return cin;
};

export const stringNotEmpty = (string) => {
  return string != null && string.trim() != '';
};

export const isRedevableOperator = (codeTypeT6bis) => {
  console.log('Constants.TYPE_T6BIS[2] ', Constants.TYPE_T6BIS[2]);
  console.log(codeTypeT6bis === Constants.TYPE_T6BIS[2].code);
  return codeTypeT6bis === Constants.TYPE_T6BIS[2].code;
};

export const isRedevableNonOperator = (codeTypeT6bis) => {
  console.log(
    codeTypeT6bis === Constants.TYPE_T6BIS[0].code ||
      codeTypeT6bis === Constants.TYPE_T6BIS[1].code ||
      codeTypeT6bis === Constants.TYPE_T6BIS[3].code ||
      codeTypeT6bis === Constants.TYPE_T6BIS[5].code ||
      codeTypeT6bis === Constants.TYPE_T6BIS[6].code,
  );
  return (
    codeTypeT6bis === Constants.TYPE_T6BIS[0].code ||
    codeTypeT6bis === Constants.TYPE_T6BIS[1].code ||
    codeTypeT6bis === Constants.TYPE_T6BIS[3].code ||
    codeTypeT6bis === Constants.TYPE_T6BIS[5].code ||
    codeTypeT6bis === Constants.TYPE_T6BIS[6].code
  );
};

export const isMtm = (codeTypeT6bis) => {
  return codeTypeT6bis === Constants.TYPE_T6BIS[0].code;
};
export const isCm = (codeTypeT6bis) => {
  return codeTypeT6bis === Constants.TYPE_T6BIS[1].code;
};
export const isTaxeCoordination = (codeTypeT6bis) => {
  return codeTypeT6bis === Constants.TYPE_T6BIS[2].code;
};
export const isContrainteParCorps = (codeTypeT6bis) => {
  return codeTypeT6bis === Constants.TYPE_T6BIS[3].code;
};
export const isAffaireChange = (codeTypeT6bis) => {
  return codeTypeT6bis === Constants.TYPE_T6BIS[5].code;
};

export const isAmendeTransactionnelle = (codeTypeT6bis) => {
  return codeTypeT6bis === Constants.TYPE_T6BIS[6].code;
};

export const formatSerie = (numeroSerieAffaire) => {
  if (numeroSerieAffaire && numeroSerieAffaire.length < 6) {
    numeroSerieAffaire = numeroSerieAffaire.padStart(6, '0');
  } else if (numeroSerieAffaire && numeroSerieAffaire.length > 6) {
    numeroSerieAffaire = numeroSerieAffaire.substring(0, 6);
  }
  console.log('formatSerie : ', numeroSerieAffaire);
  return numeroSerieAffaire;
};

export const formatNomenclature = function (codeNomenclature) {
  var limit = 10;
  if (codeNomenclature && codeNomenclature.length < limit) {
    return codeNomenclature.toString().padStart(limit, '1');
  } else {
    return codeNomenclature.toString().substr(0, limit);
  }
};

export const getCurrentArticle = (codeTypeT6bis, num = 0) => {
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
      libelleUnite: null,
      quantite: null,
      isNew: true,
      listeT6bisLigneTaxation: [],
    };
  }
  if (isCm(codeTypeT6bis)) {
    return {
      numArticle: 1,
      marque: null,
      modele: null,
      cylindree: null,
      numeroCadre: null,
      numeroImmatriculation: null,
      dateMiseEnCirculation: null,
      valeurTaxable: null,
      montantFacture: null,
      devise: null,
      quantite: null,
      isNew: true,
      listeT6bisLigneTaxation: [],
    };
  }
  return null;
};

export const mapErrors = function (errorsArray) {
  var serverErrors = Constants.serverErrors;
  let messages = [];
  errorsArray.forEach(function (error) {
    if (serverErrors[error]) {
      messages.push(serverErrors[error]);
    }
  });
  return messages && messages.length > 0 ? messages : errorsArray;
};

export const groupLignesByRubrique = function (t6bis, listeRecap) {
  var groupedList = [];

  if (t6bis && t6bis.listeArticleT6bis) {
    t6bis.listeArticleT6bis.forEach(function (current) {
      if (current.listeT6bisLigneTaxation) {
        current.listeT6bisLigneTaxation.forEach(function (ligne) {
          groupedList.push({
            rubrique: ligne.rubriqueTaxation.code,
            designation: ligne.rubriqueTaxation.libelle,
            montant: parseFloat(ligne.montantTaxation),
          });
        });
      }
    });
  }
  if (groupedList.length > 0) {
    ajouterTaxationGlobale(t6bis, groupedList);
    group(groupedList, 'rubrique', listeRecap);
  } else if (
    t6bis &&
    t6bis.listeT6bisLigneTaxationGlobale &&
    t6bis.listeT6bisLigneTaxationGlobale.length > 0
  ) {
    ajouterTaxationGlobale(t6bis, groupedList);
    group(groupedList, 'rubrique', listeRecap);
  }
};

const ajouterTaxationGlobale = function (t6bis, groupedList) {
  /*
     Ajouter la taxe timbre si moyen paiement == 'Espece'
     */
  if (t6bis.typeMoyenPaiement && '01' === t6bis.typeMoyenPaiement.code) {
    groupedList.push({
      rubrique: '000601',
      designation: 'DT TIMBRE QUIT.(000601)',
      montant: 1.0,
    });
  }
  if (t6bis && t6bis.listeT6bisLigneTaxationGlobale) {
    t6bis.listeT6bisLigneTaxationGlobale.forEach(function (ligne) {
      groupedList.push({
        rubrique: ligne.rubriqueTaxation.code,
        designation: ligne.rubriqueTaxation.libelle,
        montant: parseFloat(ligne.montantTaxation),
      });
    });
  }
};

const group = function (collection, property, listeRecap) {
  var i = 0,
    val,
    index,
    values = [],
    result = [];
  for (; i < collection.length; i++) {
    val = collection[i][property];
    index = values.indexOf(val);
    if (index > -1) result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  result.forEach(function (groupedList) {
    var montant = 0.0;
    var rubrique;
    var designation;
    groupedList.forEach(function (list) {
      montant += parseFloat(list.montant);
      rubrique = list.rubrique;
      designation = list.designation;
    });
    listeRecap.push({
      rubrique: rubrique,
      designation: designation,
      montant: parseFloat(montant),
    });
  });
};

export const calculateTotalT6bis = function (listRecap, t6bis) {
  var montantTotal = 0.0;
  if (listRecap) {
    listRecap.forEach(function (item) {
      console.log('Calculating t6bis total => ');
      montantTotal += parseFloat(item.montant);
    });
  }

  if (
    t6bis &&
    t6bis.typeMoyenPaiement &&
    '01' === t6bis.typeMoyenPaiement.code &&
    montantTotal > 0
  ) {
    t6bis.taxationPaiementEspece = Math.ceil(montantTotal * 0.0025);
    console.log('t6bis.taxationPaiementEspece====');
    console.log(t6bis.taxationPaiementEspece);
  }

  return montantTotal;
};

export const groupLignesByRubriqueByArticle = function (
  t6bis,
  listeRecap,
  article,
) {
  var groupedList = [];
  if (t6bis && article) {
    // t6bis.listeArticleT6bis.forEach(function (current) {
    if (article.listeT6bisLigneTaxation) {
      article.listeT6bisLigneTaxation.forEach(function (ligne) {
        groupedList.push({
          rubrique: ligne.rubriqueTaxation.code,
          designation: ligne.rubriqueTaxation.libelle,
          montant: parseFloat(ligne.montantTaxation),
        });
      });
    }
    // });
  }
  if (groupedList.length > 0) {
    group(groupedList, 'rubrique', listeRecap);
  }
};

export const completer = function (t6bis) {
  (t6bis.utilisateur = {idActeur: ComSessionService.getInstance().getLogin()}),
    (t6bis.bureauCourant = {
      codeBureau: ComSessionService.getInstance().getCodeBureau(),
    });
};

export const deleteAttributes = function (t6bis) {
  if (t6bis) {
    if (t6bis.utilisateur) {
      delete t6bis.utilisateur.refGradeLib;
    }
    if (t6bis.intervenantVO) {
      delete t6bis.intervenantVO.idPourRecherche;
      delete t6bis.intervenantVO.defaultConverter;
      delete t6bis.intervenantVO.defaultConverter;
    }
    delete t6bis.defaultConverter;
    delete t6bis.actionModification;
    delete t6bis.idPourRecherche;
    delete t6bis.referenceAffaire;
    delete t6bis.sauvegardee;
    delete t6bis.infoCompleted;
    if (t6bis.listeArticleT6bis) {
      t6bis.listeArticleT6bis.forEach(function (article) {
        delete article.defaultConverter;
        if (article.listeT6bisLigneTaxation) {
          article.listeT6bisLigneTaxation.forEach(function (ligne) {
            delete ligne.defaultConverter;
          });
        }
      });
    }
    if (t6bis.listeT6bisLigneTaxationGlobale) {
      t6bis.listeT6bisLigneTaxationGlobale.forEach(function (ligne) {
        delete ligne.defaultConverter;
      });
    }
  }
};

export const prepareListArticlesMtm = function (tempListArticles, t6bis) {
  if (t6bis && t6bis.listeArticleT6bis) {
    t6bis.listeArticleT6bis.forEach(function (current) {
      tempListArticles.push({
        id: current.id,
        codeNomenclature: current.codeNomenclature,
        montantFacture: current.montantFacture,
        designation: current.designation,
        numArticle: current.numArticle,
        quantite: current.quantite,
        uniteQuantite: current.uniteQuantite,
        valeurTaxable: current.valeurTaxable,
        natureMarchandise: current.natureMarchandise,
        devise: current.devise,
        listeT6bisLigneTaxation: current.listeT6bisLigneTaxation,
      });
      if (current.natureMarchandise.code) {
        current.natureMarchandise = current.natureMarchandise.code;
      }
      if (current.uniteQuantite.code) {
        current.uniteQuantite = current.uniteQuantite.code;
      }
      if (current.devise.code) {
        current.devise = current.devise.code;
      }
      delete current.unite;
      delete current.isNew;
      delete current.montantGlobalByArticle;
      delete current.recapCurrentArticleList;
      delete current.$$hashKey;
    });
  }
};

export const prepareListArticlesCm = function (tempListArticles, t6bis) {
  if (t6bis && t6bis.listeArticleT6bis) {
    t6bis.listeArticleT6bis.forEach(function (current) {
      tempListArticles.push({
        marque: current.marque,
        modele: current.modele,
        numArticle: current.numArticle,
        cylindree: current.cylindree,
        numeroCadre: current.numeroCadre,
        numeroImmatriculation: current.numeroImmatriculation,
        dateMiseEnCirculation: current.dateMiseEnCirculation,
        valeurTaxable: current.valeurTaxable,
        montantFacture: current.montantFacture,
        devise: current.devise,
        listeT6bisLigneTaxation: current.listeT6bisLigneTaxation,
      });
      if (current.devise.code) {
        current.devise = current.devise.code;
      }
      delete current.unite;
      delete current.isNew;
      delete current.montantGlobalByArticle;
      delete current.recapCurrentArticleList;
      console.log(
        'current.recapCurrentArticleList------------------------------------------------------------',
        current?.recapCurrentArticleList,
      );
      delete current.$$hashKey;
    });
  }
};

export const validate = function (t6bis) {
  if (t6bis && t6bis.codeTypeT6bis === '03') {
    return (
      t6bis.numeroTriptyque &&
      t6bis.genre &&
      t6bis.immatriculation &&
      t6bis.dateEntree &&
      t6bis.dateSortie &&
      t6bis.ptc &&
      t6bis.typeMoyenPaiement
    );
  } else if (t6bis && t6bis.codeTypeT6bis === '04') {
    return t6bis.typeMoyenPaiement && t6bis.refContrainteCorps;
  } else if (
    (t6bis && t6bis.codeTypeT6bis === '06') ||
    (t6bis && t6bis.codeTypeT6bis === '07')
  ) {
    return t6bis.typeMoyenPaiement && t6bis.descriptifInfraction;
  }
  return t6bis?.typeMoyenPaiement;
};

export const getMessageValidation = function (t6bis) {
  var messages = [];
  if (t6bis && t6bis.codeTypeT6bis === '03') {
    if (!t6bis.numeroTriptyque) {
      messages.push('Numero triptyque');
    }
    if (!t6bis.genre) {
      messages.push('Genre');
    }
    if (!t6bis.immatriculation) {
      messages.push('Immatriculation');
    }
    if (!(typeof t6bis.dateEntree === 'string')) {
      messages.push('Date entrée');
    }
    if (!(typeof t6bis.dateSortie === 'string')) {
      messages.push('Date sortie');
    }
    if (!t6bis.ptc) {
      messages.push('PTC');
    }
    if (!t6bis.typeMoyenPaiement) {
      messages.push('Type de paiement');
    }
  } else if (t6bis && t6bis.codeTypeT6bis === '04') {
    if (!t6bis.typeMoyenPaiement) {
      messages.push('Type de paiement');
    }
    if (!t6bis.refContrainteCorps) {
      messages.push('Référence contrainte par corps');
    }
  } else if (
    (t6bis && t6bis.codeTypeT6bis === '06') ||
    (t6bis && t6bis.codeTypeT6bis === '07')
  ) {
    if (!t6bis.typeMoyenPaiement) {
      messages.push('Type de paiement');
    }
    if (!t6bis.descriptifInfraction) {
      messages.push("Descriptif de l'infraction");
    }
  } else if (!t6bis.typeMoyenPaiement) {
    messages.push('Type de paiement');
  }
  return messages;
};

export const preconditions = function (t6bis, action) {
  var messages = [];
  if ('supprimer' === action) {
    if (t6bis && t6bis.dateEnregistrement) {
      messages.push('Vous ne pouvez pas supprimer une T6Bis déjà enregistrée.');
    }
  } else if ('sauvegarder' === action) {
    if (t6bis && !t6bis.typeMoyenPaiement) {
      messages.push('Merci de renseigner le type de paiement.');
    }
  } else if ('enregistrer' === action) {
    if (t6bis && t6bis.dateEnregistrement && isCreation()) {
      messages.push('T6bis déja enregistrée');
    }
    if (t6bis && t6bis.montantGlobal == 0) {
      messages.push(
        'Le montant global de la T6bis ne doit pas être inférieur ou égal à 0.',
      );
    }
    if (!hasAtLeastOneTaxationLine(t6bis)) {
      messages.push("Merci d'ajouter au moins une ligne de taxation.");
    }
  }
  return messages.length > 0 ? messages : null;
};

export const mapErrorsCreation = function (serverErrors) {
  var errorsArray = {
    E1100008:
      'E1100008 : Vous avez déjà une T6Bis numéro {0} de même type en attente d’enregistrement.',
    E1100009:
      'E1100009 : Vous avez déjà une T6Bis numéro {0} de même type en attente d’édition.',
  };
  let messages = [];
  console.log('mapErrorsCreation : ', errorsArray);
  Object.keys(errorsArray).forEach(function (key) {
    console.log('mapErrorsCreation : ', key);
    console.log('mapErrorsCreation : ', errorsArray[key]);
    console.log('mapErrorsCreation : ', serverErrors);
    serverErrors.forEach(function (serverError) {
      if (serverError.includes(key)) {
        // [MIComponent] cle: E1100009 info: 30920200000154
        messages.push(
          errorsArray[key].replace(
            '{0}',
            serverError.toString().split(' ')[
              serverError.toString().split(' ').length - 1
            ],
          ),
        );
      }
    });
  });
  return messages;
};

export const calculerMontantGlobal = function (t6bis) {
  if ((t6bis && !t6bis.montantGlobal) || t6bis.montantGlobal <= 0) {
    var listeRecap = [];
    groupLignesByRubrique(t6bis, listeRecap);
    t6bis.montantGlobal = calculateTotalT6bis(listeRecap, t6bis);
    console.log('Montant de la t6bis > ');
    console.log(t6bis.montantGlobal);
  }
};

export const isCreation = () => {
  return (
    ComSessionService.getInstance().getFonctionalite() ===
    Constants.T6BIS_CREATION_FONCTIONNALITE
  );
};
export const isModification = () => {
  return (
    ComSessionService.getInstance().getFonctionalite() ===
    Constants.T6BIS_MODIFICATION_FONCTIONNALITE
  );
};
export const isRedressement = () => {
  return (
    ComSessionService.getInstance().getFonctionalite() ===
    Constants.T6BIS_REDRESSEMENT_FONCTIONNALITE
  );
};
export const isRecherche = () => {
  return (
    ComSessionService.getInstance().getFonctionalite() ===
    Constants.T6BIS_RECHERCHE_FONCTIONNALITE
  );
};

export const mapErrorsGestion = function (errorsArray) {
  var serverErros = {
    E1100029: "E1100029 : L'affaire est inexistante",
    // "??? TECH_EXCEPTION ???": "TECH_EXCEPTION : Erreur technique",
    '??? E1100010 ???':
      'E1100010 : Il faut ajouter au moins un article avec une taxation à la T6bis.',
    '??? E1100011 ???':
      'E1100011 : Il faut ajouter au moins une taxation globale à la T6bis.',
    '??? E1100012 ???': 'E1100012 : Il faut renseigner le redevable.',
    '??? E1100023 ???':
      'E1100023 : La date entrée doit être inférieure ou égal à la date système.',
    '??? E1100024 ???':
      'E1100024 : La date de sortie doit être inférieure ou égal à la date système.',
    '??? E1100032 ???':
      'E1100032 : Le montant global de T6BIS doit être supérieur à zéro.',
    '??? E1100003 ???':
      'E1100003 : SUPPRESION : Vous ne pouvez pas supprimer une T6Bis déjà enregistrée.',
    '??? AjouterIntervenantPrecondiitonManager.ARE-013 ???':
      'Il faut renseigner le redevable',
    '??? E1100021 ???': 'E1100021 : T6bis doit être crée par l’agent connecté.',
    '??? E1100022 ???': 'E1100022 : La quittance est déjà utilisée.',
    '??? E1100023 ???':
      'E1100023 : La date entrée doit être inférieure ou égal à la date système.',
    '??? E1100024 ???':
      'E1100024 : La date de sortie doit être inférieure ou égal à la date système.',
    '??? E1100025 ???':
      'E1100025 : La date de sortie doit être  supérieure à la date d’entrée.',
  };
  let messages = [];
  errorsArray.forEach(function (error) {
    if (serverErros[error]) {
      messages.push(serverErros[error]);
    }
  });
  return messages && messages.length > 0 ? messages : errorsArray;
};

export const verifyIntervenant = function (intervenantVO) {
 
  return isParamSetted(intervenantVO) && stringNotEmpty(intervenantVO.nomIntervenant) && stringNotEmpty(intervenantVO.prenomIntervenant) && stringNotEmpty(intervenantVO.adresse);
};

export const isParamSetted = function (intervenantVO) {
  console.log('isParamSetted----------------------------  : ');
  if (isPasseport(intervenantVO)) {
    if (
      intervenantVO.numeroDocumentIndentite &&
      intervenantVO.refTypeDocumentIdentite &&
      intervenantVO.nationaliteFr
    ) {
      console.log('isParamSetted----------------------------  : true');
      return true;
    }
  } else if (
    intervenantVO.numeroDocumentIndentite &&
    intervenantVO.refTypeDocumentIdentite
  ) {
    console.log('isParamSetted----------------------------  : true');
    return true;
  }
  console.log('isParamSetted----------------------------  : false');
  return false;
};

isPasseport = function (intervenantVO) {
  if (intervenantVO) {
    return (
      '05' === intervenantVO.refTypeDocumentIdentite ||
      '06' === intervenantVO.refTypeDocumentIdentite ||
      '07' === intervenantVO.refTypeDocumentIdentite
    );
  } else {
    return false;
  }
};

