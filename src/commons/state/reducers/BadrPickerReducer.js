import * as Constants from '../../constants/components/BadrPickerConstants';

const initialState = {
  showProgress : false,
  picker: {
    empty: {
      showProgress : false,
      loaded: false,
      data: [],
    },
  },
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.BADRPICKER_REQUEST:
      nextState.showProgress  = true;
      nextState.picker[action.value.command] = {
        showProgress : true,
        loaded: false,
        errorMessage: '',
        displayError: false,
        items: [],
      };
      return nextState;
    case Constants.BADRPICKER_IN_PROGRESS:
      nextState.showProgress  = true;
      nextState.picker[action.value.command] = {
        showProgress : true,
        loaded: false,
        errorMessage: '',
        displayError: false,
        items: [],
      };
      return nextState;
    case Constants.BADRPICKER_SUCCESS:
      nextState.showProgress  = false;
      nextState.picker[action.value.command] = {
        showProgress : false,
        loaded: true,
        errorMessage: '',
        displayError: false,
        items: action.value.payload,
      };
      return nextState;
    case Constants.BADRPICKER_FAILED:
      nextState.showProgress  = false;
      nextState.picker[action.value.command] = {
        showProgress : false,
        loaded: false,
        errorMessage: 'Erreur lors du chargement du composant : <BADR_PICKER>',
        displayError: false,
      };
      return nextState;
    case Constants.BADRPICKER_INIT:
      return initialState;
    default:
      return initialState;
  }
};
