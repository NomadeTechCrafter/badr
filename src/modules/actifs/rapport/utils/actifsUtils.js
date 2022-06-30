import _ from 'lodash';
import moment from 'moment';
import { FORMAT_DDMMYYYY_HHMM } from './actifsConstants';

export const getValueByPath = (key, object) => {


  return object ? _.get(object, key) : '';

};




export const getValueByPaths = (key1, key2, object) => {
  return _.get(object, key1) ? _.get(object, key1) : _.get(object, key2);
};




export const format = (date) => {

  return moment(date).format(FORMAT_DDMMYYYY_HHMM,)
}


export const formatCustomized = (date, formatDate) => {

  return moment(date).format(formatDate);
}

export const getNavigationMaritimeModelInitial = () => {
  return {
    dateEntree: (new Date()).getTime(),
    heureEntree: moment((new Date()).getTime()).format('HH:mm'),
    motifAccostage: '',
    portEntree: '',
    provenance: { code: '', libelle: '' },
    villeProvenance: '',
    portAttache: '',
    pavillon: '',
    dateDepart: (new Date()).getTime(),
    heureDepart: moment((new Date()).getTime()).format('HH:mm'),
    destination: { code: '', libelle: '' },
    villeDestination: '',
    typeBateau: '',
    immatriculation: '',
    nomBateau: '',
    couleur: '',
    longueur: '',
    profondeur: '',
    tonnage: '',
    numDeclaration: '',
    delivreePar: { code: '', libelle: '' },
    dateDeclaration: (new Date()).getTime(),
    dateDebutControle: (new Date()).getTime(),
    heureDebutControle: null,
    dateFinControle: (new Date()).getTime(),
    heureFinControle: null,
    documentsVerifies: '',
    observations: '',
    resultatControle: '',
    intervenants: [],
    proprietaires: []
  }
}

export const getNavigationAerienneModelInitial = () => {
  return {
    dateAtterissage: (new Date()).getTime(),
    heureAtterissage: moment((new Date()).getTime()).format('HH:mm'),
    motifAtterissage: '',
    aeroportEntree: '',
    provenance: { codePays: '', nomPays: '' },
    villeProvenance: '',
    aeroportAttache: '',
    pavillon: '',
    dateDepart: (new Date()).getTime(),
    heureDepart: moment((new Date()).getTime()).format('HH:mm'),
    destination: { codePays: '', nomPays: '' },
    villeDestination: '',
    typeAvion: '',
    immatriculation: '',
    nomAvion: '',
    couleur: '',
    nbPlaces: '',
    nbMoteurs: '',
    tonnage: '',
    dateDebutControle: (new Date()).getTime(),
    heureDebutControle: null,
    dateFinControle: (new Date()).getTime(),
    heureFinControle: null,
    documentsVerifies: '',
    observations: '',
    resultatControle: '',
    intervenants: [],
    proprietaires: [],
    navigationAerienne: {}
  }
}

export const getNavigationAvitaillementEntreeModelInitial = () => {
  return {
    numBonLivraison: '',
    dateLivraison: '',
    heureLivraison: '',
    immatriculationCamion: '',
    immatriculationCiterne: '',
    numRCFourn: '',
    centreRCFourn: '',
    raisonSocialeFourn: '',
    nature: {},
    quantiteReceptionne: '',
    uniteMesure: {},
    volumeAppEnvoye: '',
    volumeAppReceptionne: '',
    coeffConvert: '',
    volume15Recep: null,
    densite15: '',
    temperature: '',
    valeurEcart: null,
    poidsReceptionne: null,
    observations: ''
  }
}

export const getNavigationAvitaillementSortieModelInitial = () => {
  return {
    // heureLivraison: '',
    numBonLivraison: '',
    quantiteLivree: '',
    compteurAvant: '',
    compteurApres: '',
    numCarte: '',
  }
}

export const convert = (date) => {
  var datearray = date.split("/");
  return datearray[2] + '-' + datearray[1] + '-' + datearray[0];

}


export const validCIN = (cin) => {
  let result = [];
  result[0] = cin;
  let buffer = '';
  if (cin == null || _.isEmpty(cin)) {
    result[0] = null;
    result[1] = null;
    return result;
  }

  let charPart = cin.substring(0, 1);
  if (!charPart.match(/^[A-Z]$/i)) {
    result[1] = 'E00502: Le premier caractère du CIN doit être une lettre';
    return result;
  }
  if (cin.length < 2 || cin.length > 8) {
    result[1] = 'E00503: Taille du CIN incorrecte (elle doit etre comprise entre 2 et 8).';
    return result;
  }

  let alphaNumPart = cin.substring(1, 2);
  if (cin.length == 2) {
    if (!isNumber(alphaNumPart)) {
      result[1] = 'E00504: La taille minimale du champ est égale à 2 (au moins un caractère alphabétique  et un caractère numérique)';
      return result;
    }
  } else {
    if (!alphaNumPart.match()) {
      result[1] = 'E00505: Le deuxième caractère du CIN doit être alphanumérique';
      return result;
    }
  }

  console.log('cin before : ' + cin);
  let numPart = cin.length === 2 ? '' :  cin.substring(2);
  console.log('numPart after : ' + numPart);

  for (let i = 0; i < numPart.length; i++) {
    let num = numPart.substring(i, i + 1);
    if (!isNumber(num)) {
      result[1] = 'E00501: Les caractères autres que les deux premiers doivent être numériques ';
      return result;
    }
  }
  let cp = 0;
  console.log('result : ' + result + ' ' + cp++);
  if (isNumber(alphaNumPart)) {
    buffer = alphaNumPart + numPart;
    console.log('buffer : ' + buffer);
    console.log('numPart : ' + numPart);
    console.log('alphaNumPart : ' + alphaNumPart);
    let numericPart = buffer;
    if (cin.length < 8) {
      console.log('result isNumber : ' + result + ' ' + cp++);
      numericPart = addZeros(numericPart, 7);
    }
    cin = charPart.toUpperCase() + numericPart;
  } else {
    console.log('result : ' + result + ' ' + cp++);
    buffer += numPart;
    let numericPart = buffer;
    if (cin.length < 8) {
      console.log('result : ' + result + ' ' + cp++);
      numericPart = addZeros(numericPart, 6);
    }
    cin = charPart.toUpperCase() + alphaNumPart.toUpperCase() + numericPart;
  }
  result[0] = cin;
  result[1] = null;
  console.log('result : ' + result);
  return result;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const addZeros = (input, maxLength) => {
  console.log('input : ' + input);
  // let keyImput = _.keys(input)[0];
  // if (input[keyImput] !== '') {
  let value = _.padStart(input, maxLength, '0');
  console.log('value : ' + value);
  return value;
  // }
};

// addZeros = (input) => {
//   let keyImput = _.keys(input)[0];
//   if (input[keyImput] !== '') {
//     this.setState({
//       [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
//     });
//   }
// };

export const validCarteSejour = (carteSejour) => {
  let result = [];
  result[0] = carteSejour;
  if (carteSejour == null || _.isEmpty(carteSejour)) {
    result[0] = null;
    result[1] = null;
    return result;
  }
  let lengthCarteSejour = carteSejour.length;
  if (lengthCarteSejour < 2 || lengthCarteSejour > 8) {
    result[1] = 'E00508: Taille de la carte de séjour incorrecte (elle doit etre comprise entre 2 et 8).';
    return result;
  }
  let numPart = carteSejour.substring(2);
  console.log('numPart : ' + numPart);
  if (lengthCarteSejour > 2) {
    for (let i = 0; i < numPart.length - 1; i++) {
      let num = numPart.substring(i, i + 1);
      if (!isNumber(num)) {
        console.log('num : ' + num);
        result[1] = 'E00507: Les caractères autres que les deux premiers et le dernier doivent être numériques';
        return result;
      }
    }
  }
  let dernierChar = carteSejour.substring(lengthCarteSejour - 1);
  console.log('dernierChar : ' + dernierChar);
  if (isNumber(dernierChar)) {
    result[1] = 'E00506: Le dernier caractère de la carte de séjour doit être une lettre';
    return result;
  }

  //Completer par les zeros
  let premierElement = String.valueOf(carteSejour.charAt(0));
  let dexiemeElement = String.valueOf(carteSejour.charAt(1));
  let indexFirstNumber = 0;
  if (lengthCarteSejour > 2 && !isNumber(premierElement) && !isNumber(dexiemeElement)) {
    indexFirstNumber = 2;
  } else if (!isNumber(premierElement)) {
    indexFirstNumber = 1;
  }
  let complementZero = 8 - lengthCarteSejour;
  let valideCarteSejour = carteSejour.substring(0, indexFirstNumber);
  let stringBuilder = "";
  stringBuilder += (valideCarteSejour);

  for (let i = 0; i < complementZero.length; i++) {
    stringBuilder = stringBuilder + "0";
  }
  valideCarteSejour = stringBuilder + carteSejour.substring(indexFirstNumber);
  result[0] = valideCarteSejour;
  result[1] = null;
  return result;
}

export const cleanOrdreService = (rsAEnregistrer) => {
  delete rsAEnregistrer.typesIncidentSelect;
  delete rsAEnregistrer.rapportService?.ordreService?.chefEquipe?.refGradeLib;
  delete rsAEnregistrer.rapportService?.ordreService?.uniteOrganisationnelle;
  delete rsAEnregistrer.rapportService?.ordreService?.refPJ;
  delete rsAEnregistrer.rapportService?.ordreService?.journeeDu;
  delete rsAEnregistrer.rapportService?.ordreService?.libAdditif;
  delete rsAEnregistrer.rapportService?.ordreService?.libChefBrigade;
  delete rsAEnregistrer.rapportService?.ordreService?.libRonde;
  delete rsAEnregistrer.rapportService?.ordreService?.libMaritime;
  delete rsAEnregistrer.rapportService?.ordreService?.libAerien;
  delete rsAEnregistrer.rapportService?.ordreService?.libConfidentiel;
  delete rsAEnregistrer.rapportService?.ordreService?.defaultConverter;
  delete rsAEnregistrer.rapportService?.ordreService?.rapportExiste;
  delete rsAEnregistrer.rondesApparition?.forEach((rondeApparition) => {
    delete rondeApparition?.dateHeureDebut;
    delete rondeApparition?.dateHeureFin;
  });

  // rsAEnregistrer.gibPerquisition.intervenants = [];
  delete rsAEnregistrer?.gibPerquisition?.intervenantsVO?.forEach((intervenantVO) => {
    delete intervenantVO?.defaultConverter;
    delete intervenantVO?.dtoHeader;
    delete intervenantVO?.jsonVO;
    delete intervenantVO?.module;
    delete intervenantVO?.command;
    delete intervenantVO?.payload;
    delete intervenantVO?.typeService;
    delete intervenantVO?.param;
    delete intervenantVO?.identifiants;
    delete intervenantVO?.idPourRecherche;
    delete intervenantVO?.rechercheValides;
    delete intervenantVO?.rechercheAnnules;
    intervenantVO.intervenant = {};
    intervenantVO.intervenant.adresse = intervenantVO.adresse;
    delete intervenantVO.adresse;
    intervenantVO.intervenant.nationaliteFr = intervenantVO.nationaliteFr;
    delete intervenantVO.nationaliteFr;
    intervenantVO.intervenant.nomIntervenant = intervenantVO.nomIntervenant;
    delete intervenantVO.nomIntervenant;
    intervenantVO.intervenant.numeroDocumentIndentite = intervenantVO.numeroDocumentIndentite;
    delete intervenantVO.numeroDocumentIndentite;
    intervenantVO.intervenant.numeroOrdreIntervenant = intervenantVO.numeroOrdreIntervenant;
    delete intervenantVO.numeroOrdreIntervenant;
    intervenantVO.intervenant.prenomIntervenant = intervenantVO.prenomIntervenant;
    delete intervenantVO.prenomIntervenant;
    intervenantVO.intervenant.refTypeDocumentIdentite = intervenantVO.refTypeDocumentIdentite;
    delete intervenantVO.refTypeDocumentIdentite;
    intervenantVO.intervenant.typeIntervenant = intervenantVO.typeIntervenant;
    delete intervenantVO.typeIntervenant;
    // rsAEnregistrer?.gibPerquisition?.intervenants.push(intervenantVO);
  });
  delete rsAEnregistrer?.gibPerquisition?.intervenantsVO;

  if (_.isArray(rsAEnregistrer?.rapportService?.ordreService?.agentsBrigade)) {
    rsAEnregistrer.rapportService?.ordreService?.agentsBrigade?.forEach((agentBrigade) => {

      delete agentBrigade?.agent?.refGradeLib;
      delete agentBrigade?.agentBrigade;
    });

  }
}