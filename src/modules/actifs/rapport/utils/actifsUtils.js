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
    provenance: { code: '', libelle: ''},
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
export const convert = (date) => {
  var datearray = date.split("/");
  return datearray[2] + '-' + datearray[1] + '-' + datearray[0];

}

export const cleanOrdreService = (rsAEnregistrer)=>{
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

  if (_.isArray(rsAEnregistrer?.rapportService?.ordreService?.agentsBrigade)) {
    rsAEnregistrer.rapportService?.ordreService?.agentsBrigade?.forEach((agentBrigade) => {

      delete agentBrigade?.agent?.refGradeLib;
      delete agentBrigade?.agentBrigade;
    });
    
  }
}