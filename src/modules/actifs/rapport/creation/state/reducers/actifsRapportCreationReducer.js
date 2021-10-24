import { getNavigationAerienneModelInitial, getNavigationMaritimeModelInitial, format } from '../../../utils/actifsUtils';
import * as Constants from '../actifsRapportCreationConstants';
import { save, saveStringified } from '../../../../../../commons/services/async-storage/ComStorageService';
import { Rows } from 'react-native-table-component';

const initialState = {
  showProgress: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  console.log("actifsRapportCreationReducer action.type : " + action.type);
  console.log("actifsRapportCreationReducer action.value : " + JSON.stringify(action) )
  
  switch (action.type) {
    case Constants.ACTIFS_ENTETE_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      nextState.successMessage = null;
      console.log('--> ACTIFS_ENTETE request...');
      return nextState;
    case Constants.ACTIFS_ENTETE_IN_PROGRESS:
      console.log('--> ACTIFS_ENTETE in progress...');
      return nextState;
    case Constants.ACTIFS_ENTETE_SUCCESS:
      nextState.errorMessage = null;
      nextState.rows = action.value;
      nextState.rows.dateDebut = nextState?.rows?.dateDebut?.substring(0, 10);
      nextState.rows.dateFin = nextState?.rows?.dateFin?.substring(0, 10);
      nextState.consultation = action.value.rapportExiste;
      nextState.navigationsAeriennes = [];
      nextState.navigationAerienneModel = getNavigationAerienneModelInitial();
      nextState.rapportExiste = action.value.rapportExiste;
      nextState.navigationsMaritimes = [];
      nextState.navigationMaritimeModel = getNavigationMaritimeModelInitial();
      nextState.index = -1;
      nextState.successMessage = null;
      nextState.rapportServiceId = null;
      nextState.vehiculesSaisiVO = [];
      nextState.marchandisesVO = [];
      nextState.pvsSaisi = [];
      return nextState;
    case Constants.ACTIFS_ENTETE_FAILED:
      console.log('--> ACTIFS_ENTETE failed...');
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.ACTIFS_CONSULTATION_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      nextState.successMessage = null;
      console.log('--> ACTIFS_CONSULTATION request...');
      return nextState;
    case Constants.ACTIFS_CONSULTATION_IN_PROGRESS:
      console.log('--> ACTIFS_CONSULTATION_in progress...');
      return nextState;
    case Constants.ACTIFS_CONSULTATION_SUCCESS:
      console.log('--> ACTIFS_CONSULTATION success MRS...', nextState);
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.rows = action.value.rapportService.ordreService;
      nextState.rows.dateDebut = nextState?.rows?.dateDebut?.substring(0, 10);
      nextState.rows.dateFin = nextState?.rows?.dateFin?.substring(0, 10);
      nextState.consultation = nextState.rows.rapportExiste;
      nextState.rondesApparition = action.value?.rondesApparition?.map((ronde) => {
        ronde.dateDebut = format(ronde.dateDebut),
          ronde.dateFin = format(ronde.dateFin)
      });
      nextState.gibPerquisition = action.value?.gibPerquisition;
      nextState.navigationsAeriennes = (action.value.navigationsAeriennes) ? (action.value.navigationsAeriennes) : [];
      nextState.navigationsMaritimes = (action.value.navigationsMaritimes) ? (action.value.navigationsMaritimes):[];
      nextState.navigationMaritimeModel = getNavigationMaritimeModelInitial();
      nextState.navigationAerienneModel = getNavigationAerienneModelInitial();
      nextState.rapportExiste = nextState.rows.rapportExiste;
      nextState.rapportServiceId = action.value.rapportService.id;
      nextState.index = -1;
      nextState.successMessage = null;
      nextState.vehiculesSaisiVO = action.value.vehiculesSaisiVO;
      nextState.marchandisesVO = action.value.marchandisesVO;
      nextState.pvsSaisi = action.value.pvsSaisi;
      nextState.autreIncidents = action.value.autreIncidents;
      nextState.description = action.value.description;
      
      console.log('typesIncidents---------------------------------------------------------- action.value.typesIncidents : ', action.value.typesIncident);
      let typesIncidents = '';
      if (action.value && action.value.typesIncident) {
        let typesIncidentSelect = action.value.typesIncident;
        for (
          var i = 0;
          i < typesIncidentSelect.length;
          i++
        ) {
          if (i < typesIncidentSelect.length - 1) {
            typesIncidents +=
              typesIncidentSelect[i].libelle + "\n";
          } else {
            typesIncidents +=
              typesIncidentSelect[i].libelle;
          }
        }
      }
      nextState.typesIncidents = typesIncidents;
      return nextState;
    case Constants.ACTIFS_CONSULTATION_FAILED:
      console.log('--> ACTIFS_CONSULTATION failed...');
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.ACTIFS_SAISIE_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> ACTIFS_SAISIE request...');
      return nextState;
    case Constants.ACTIFS_SAISIE_IN_PROGRESS:
      console.log('--> ACTIFS_SAISIE in progress...');
      return nextState;
    case Constants.ACTIFS_SAISIE_SUCCESS:
      // console.log('--> ACTIFS_SAISIE ---------------------------------------------------------success...', nextState);
      // console.log('--> ACTIFS_SAISIE ---------------------------------------------------------success...', action.value.jsonVO);
      let listUnites = [];
      action.value.jsonVO.forEach(element => {
        listUnites.push({ code: element.codeUniteMesure, libelle: element.descriptionUniteMesure });
      });

      nextState.listUnites = listUnites;
      nextState.showProgress = false;
      nextState.errorMessage = null;
      return nextState;
    case Constants.ACTIFS_SAISIE_FAILED:
      console.log('--> ACTIFS_SAISIE failed...');
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.ACTIFS_CREATION_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      console.log('--> ACTIFS_CREATION request...');
      return nextState;
    case Constants.ACTIFS_CREATION_IN_PROGRESS:
      console.log('--> ACTIFS_CREATION in progress...');
      return nextState;
    case Constants.ACTIFS_CREATION_SUCCESS:
      console.log('--> ACTIFS_CREATION success...', nextState);
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.successMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesInfo : action.value;
      nextState.consultation = true;
      return nextState;
    case Constants.ACTIFS_CREATION_FAILED:
      console.log('--> ACTIFS_CREATION failed...');
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.ACTIFS_CONFIRMER_EMBARCATION_REQUEST:
      console.log('--> ACTIFS_CREATION request...');
      return nextState;
    case Constants.ACTIFS_CONFIRMER_EMBARCATION_IN_PROGRESS:
      console.log('ACTIFS_CONFIRMER_EMBARCATION_IN_PROGRESS');
      return nextState;
    case Constants.ACTIFS_CONFIRMER_EMBARCATION_SUCCESS:
      console.log('ACTIFS_CONFIRMER_EMBARCATION_SUCCESS', nextState);

      let navigationsMaritimes = [...action.value.navigationsMaritimes];
      if (action.value.index < 0) {
        navigationsMaritimes.push(action.value.navigationMaritimeModel);
      } else {
        navigationsMaritimes.splice(action.value.index, 1, action.value.navigationMaritimeModel);
      }
      nextState.navigationsMaritimes = navigationsMaritimes;
      saveStringified('navigationsMaritimes', navigationsMaritimes).then(() =>
        console.log('navigationsMaritimes', navigationsMaritimes),
      );


      nextState.navigationMaritimeModel = getNavigationMaritimeModelInitial();
      if (nextState.index < 0) {
        nextState.index = nextState.index - 1;
      } else {
        nextState.index = -1;
      }

      return nextState;
    case Constants.ACTIF_CONFIRMER_EMBARCATION_FAILED:
      console.log('ACTIF_CONFIRMER_EMBARCATION_FAILED');
      return nextState;
    case Constants.ACTIFS_EDITER_EMBARCATION_REQUEST:
      console.log('ACTIFS_EDITER_EMBARCATION_REQUEST');
      return nextState;
    case Constants.ACTIFS_EDITER_EMBARCATION_IN_PROGRESS:
      console.log('ACTIFS_EDITER_EMBARCATION_IN_PROGRESS');
      return nextState;
    case Constants.ACTIFS_EDITER_EMBARCATION_SUCCESS:
      console.log('ACTIFS_EDITER_EMBARCATION_SUCCESS', nextState);

      nextState.navigationMaritimeModel = action.value.navigationMaritimeModel;
      nextState.index = action.value.index;

      return nextState;
    case Constants.ACTIF_EDITER_EMBARCATION_FAILED:
      console.log('ACTIF_EDITER_EMBARCATION_FAILED');
      return nextState;
    case Constants.ACTIFS_DELETE_EMBARCATION_REQUEST:
      console.log('ACTIFS_DELETE_EMBARCATION_REQUEST');
      return nextState;
    case Constants.ACTIFS_DELETE_EMBARCATION_IN_PROGRESS:
      console.log('ACTIFS_DELETE_EMBARCATION_IN_PROGRESS');
      return nextState;
    case Constants.ACTIFS_DELETE_EMBARCATION_SUCCESS:
      console.log('ACTIFS_DELETE_EMBARCATION_SUCCESS', nextState);
      console.log('ACTIFS_DELETE_EMBARCATION_SUCCESS', action.value.index);
      nextState.navigationsMaritimes.splice(action.value.index, 1);
      nextState.navigationMaritimeModel = getNavigationMaritimeModelInitial();
      nextState.index = -1;

      return nextState;
    case Constants.ACTIF_DELETE_EMBARCATION_FAILED:
      console.log('ACTIF_DELETE_EMBARCATION_FAILED');
      return nextState;
    case Constants.ACTIFS_RESET_EMBARCATION_REQUEST:
      console.log('ACTIFS_RESET_EMBARCATION_REQUEST');
      return nextState;
    case Constants.ACTIFS_RESET_EMBARCATION_IN_PROGRESS:
      console.log('ACTIFS_RESET_EMBARCATION_IN_PROGRESS');
      return nextState;
    case Constants.ACTIFS_RESET_EMBARCATION_SUCCESS:
      console.log('ACTIFS_RESET_EMBARCATION_SUCCESS', nextState);
      if (nextState.index < 0) {
        nextState.index = nextState.index - 1;
      } else {
        nextState.index = -1;
      }
      nextState.navigationMaritimeModel = getNavigationMaritimeModelInitial();

      return nextState;
    case Constants.ACTIF_RESET_EMBARCATION_FAILED:
      console.log('ACTIF_RESET_EMBARCATION_FAILED');
      return nextState;

    case Constants.ACTIFS_CONFIRMER_AVION_PRIVEE_REQUEST:
      console.log('ACTIFS_CONFIRMER_AVION_PRIVEE_REQUEST');
      return nextState;
    case Constants.ACTIFS_CONFIRMER_AVION_PRIVEE_IN_PROGRESS:
      console.log('ACTIFS_CONFIRMER_AVION_PRIVEE_IN_PROGRESS');
      return nextState;
    case Constants.ACTIFS_CONFIRMER_AVION_PRIVEE_SUCCESS:
      console.log('ACTIFS_CONFIRMER_AVION_PRIVEE_SUCCESS', nextState);

      let navigationsAeriennes = [...action.value.navigationsAeriennes];
      if (action.value.index < 0) {
        navigationsAeriennes.push(action.value.navigationAerienneModel);
      } else {
        navigationsAeriennes.splice(action.value.index, 1, action.value.navigationAerienneModel);
      }
      nextState.navigationsAeriennes = navigationsAeriennes;
      saveStringified('navigationsAeriennes', navigationsAeriennes).then(() =>
        console.log('navigationsAeriennes', navigationsAeriennes),
      );


      nextState.navigationAerienneModel = getNavigationAerienneModelInitial();
      if (nextState.index < 0) {
        nextState.index = nextState.index - 1;
      } else {
        nextState.index = -1;
      }

      return nextState;
    case Constants.ACTIF_CONFIRMER_AVION_PRIVEE_FAILED:
      console.log('ACTIF_CONFIRMER_AVION_PRIVEE_FAILED');
      return nextState;
    case Constants.ACTIFS_EDITER_AVION_PRIVEE_REQUEST:
      console.log('ACTIFS_EDITER_AVION_PRIVEE_REQUEST');
      return nextState;
    case Constants.ACTIFS_EDITER_AVION_PRIVEE_IN_PROGRESS:
      console.log('ACTIFS_EDITER_AVION_PRIVEE_IN_PROGRESS');
      return nextState;
    case Constants.ACTIFS_EDITER_AVION_PRIVEE_SUCCESS:
      console.log('ACTIFS_EDITER_AVION_PRIVEE_SUCCESS', nextState);

      nextState.navigationAerienneModel = action.value.navigationAerienneModel;
      nextState.index = action.value.index;

      return nextState;
    case Constants.ACTIF_EDITER_AVION_PRIVEE_FAILED:
      console.log('ACTIF_EDITER_AVION_PRIVEE_FAILED');
      return nextState;
    case Constants.ACTIFS_DELETE_AVION_PRIVEE_REQUEST:
      console.log('ACTIFS_DELETE_AVION_PRIVEE_REQUEST');
      return nextState;
    case Constants.ACTIFS_DELETE_AVION_PRIVEE_IN_PROGRESS:
      console.log('ACTIFS_DELETE_AVION_PRIVEE_IN_PROGRESS');
      return nextState;
    case Constants.ACTIFS_DELETE_AVION_PRIVEE_SUCCESS:
      console.log('ACTIFS_DELETE_AVION_PRIVEE_SUCCESS', nextState);
      console.log('ACTIFS_DELETE_AVION_PRIVEE_SUCCESS', action.value.index);
      nextState.navigationsAeriennes.splice(action.value.index, 1);
      nextState.navigationAerienneModel = getNavigationAerienneModelInitial();
      nextState.index = -1;

      return nextState;
    case Constants.ACTIF_DELETE_AVION_PRIVEE_FAILED:
      console.log('ACTIF_DELETE_AVION_PRIVEE_FAILED');
      return nextState;
    case Constants.ACTIFS_RESET_AVION_PRIVEE_REQUEST:
      console.log('ACTIFS_RESET_AVION_PRIVEE_REQUEST');
      return nextState;
    case Constants.ACTIFS_RESET_AVION_PRIVEE_IN_PROGRESS:
      console.log('ACTIFS_RESET_AVION_PRIVEE_IN_PROGRESS');
      return nextState;
    case Constants.ACTIFS_RESET_AVION_PRIVEE_SUCCESS:
      console.log('ACTIFS_RESET_AVION_PRIVEE_SUCCESS', nextState);
      if (nextState.index < 0) {
        nextState.index = nextState.index - 1;
      } else {
        nextState.index = -1;
      }
      nextState.navigationAerienneModel = getNavigationAerienneModelInitial();

      return nextState;
    case Constants.ACTIF_RESET_AVION_PRIVEE_FAILED:
      console.log('ACTIF_RESET_AVION_PRIVEE_FAILED');
      return nextState;



    default:
      nextState.showProgress = false;
      return nextState ? nextState : initialState;
  }
};
