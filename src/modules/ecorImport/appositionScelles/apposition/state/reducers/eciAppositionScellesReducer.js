import * as Constants from '../eciAppositionScellesConstants';
import _ from 'lodash';

const initialState = {
  showProgress: false,
  errorMessage: null,
  infoMessage: null,
  listeScellesdeclarees : '',
  listeScellesApposees:'',
  success: false,
  data: null
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.ECI_APPOSER_SCELLES_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.ECI_APPOSER_SCELLES_IN_PROGRESS:
      return nextState;
    case Constants.ECI_APPOSER_SCELLES_SUCCESS:
      nextState.showProgress = false;
      nextState.success = true;
      nextState.infoMessage = action.value.data.dtoHeader
        ? action.value.data.dtoHeader.messagesInfo
        : '';
      return nextState;
    case Constants.ECI_APPOSER_SCELLES_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.dtoHeader
        ? action.value.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.ECI_GET_SCELLES_APPOSEES_REQUEST:
      nextState.showProgress = true;
      return nextState;
    case Constants.ECI_GET_SCELLES_APPOSEES_IN_PROGRESS:
      return nextState;
    case Constants.ECI_GET_SCELLES_APPOSEES_SUCCESS:
      nextState.showProgress = false;
      nextState.listeScellesApposees = action.value.data.jsonVO;
      let listeScellesApposees = '';
      action.value.data.jsonVO.map(item => {
        if (!_.isEmpty(listeScellesApposees)) {
          listeScellesApposees += '; ';
        }
        listeScellesApposees += item;
      })
      nextState.listeScellesApposees = listeScellesApposees;
      return nextState;
    case Constants.ECI_GET_SCELLES_APPOSEES_FAILED:
      return nextState;
    case Constants.ECI_GET_SCELLES_DECLAREES_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      nextState.infoMessage = null;
      nextState.listeScellesdeclarees = '';
      nextState.listeScellesApposees = '';
      nextState.success = false;
      return nextState;
    case Constants.ECI_GET_SCELLES_DECLAREES_IN_PROGRESS:
      return nextState;
    case Constants.ECI_GET_SCELLES_DECLAREES_SUCCESS:
      nextState.showProgress = false;
      let listeScellesdeclarees = '';
      Object.entries(action.value.data.jsonVO.scelles).map(item => {
        if (!_.isEmpty(listeScellesdeclarees)) {
          listeScellesdeclarees += '; ';
        }
        listeScellesdeclarees += item[0]
      })
      nextState.listeScellesdeclarees = listeScellesdeclarees;
      return nextState;
    case Constants.ECI_GET_SCELLES_DECLAREES_FAILED:
      nextState.listeScellesdeclarees = '';
      return nextState;
    default:
      return nextState ? nextState : initialState;
  }
};
