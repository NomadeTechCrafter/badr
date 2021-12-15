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
    heureEntree: (new Date()).getTime(),
    motifAccostage: '',
    portEntree: '',
    provenance: { code: '', libelle: '' },
    villeProvenance: '',
    portAttache: '',
    pavillon: '',
    dateDepart: (new Date()).getTime(),
    heureDepart: (new Date()).getTime(),
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
    heureDebutControle: (new Date()).getTime(),
    dateFinControle: (new Date()).getTime(),
    heureFinControle: (new Date()).getTime(),
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
    heureAtterissage: (new Date()).getTime(),
    motifAtterissage: '',
    aeroportEntree: '',
    provenance: { code: '', libelle: '' },
    villeProvenance: '',
    aeroportAttache: '',
    pavillon: '',
    dateDepart: (new Date()).getTime(),
    heureDepart: (new Date()).getTime(),
    destination: { code: '', libelle: '' },
    villeDestination: '',
    typeAvion: '',
    immatriculation: '',
    nomAvion: '',
    couleur: '',
    nbPlaces: '',
    nbMoteurs: '',
    tonnage: '',
    dateDebutControle: (new Date()).getTime(),
    heureDebutControle: (new Date()).getTime(),
    dateFinControle: (new Date()).getTime(),
    heureFinControle: (new Date()).getTime(),
    documentsVerifies: '',
    observations: '',
    resultatControle: '',
    intervenants: [],
    proprietaires: []
  }
}

export const getNavigationAvitaillementEntreeModelInitial = () => {
  return {
    dateEntree: (new Date()).getTime(),
    heureEntree: (new Date()).getTime(),
    motifAccostage: '',
    portEntree: '',
    provenance: { code: '', libelle: '' },
    villeProvenance: '',
    portAttache: '',
    pavillon: '',
    dateDepart: (new Date()).getTime(),
    heureDepart: (new Date()).getTime(),
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
    heureDebutControle: (new Date()).getTime(),
    dateFinControle: (new Date()).getTime(),
    heureFinControle: (new Date()).getTime(),
    documentsVerifies: '',
    observations: '',
    resultatControle: '',
    intervenants: [],
    proprietaires: []
  }
}

export const getNavigationAvitaillementSortieModelInitial = () => {
  return {
    dateSortie: (new Date()).getTime(),
    heureSortie: (new Date()).getTime(),
    motifAccostage: '',
    portSortie: '',
    provenance: { code: '', libelle: '' },
    villeProvenance: '',
    portAttache: '',
    pavillon: '',
    dateDepart: (new Date()).getTime(),
    heureDepart: (new Date()).getTime(),
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
    heureDebutControle: (new Date()).getTime(),
    dateFinControle: (new Date()).getTime(),
    heureFinControle: (new Date()).getTime(),
    documentsVerifies: '',
    observations: '',
    resultatControle: '',
    intervenants: [],
    proprietaires: []
  }
}

export const convert = (date) => {
  var datearray = date.split("/");
  return datearray[2] + '-' + datearray[1] + '-' + datearray[0];

}

export const cleanOrdreService = (rsAEnregistrer) => {
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