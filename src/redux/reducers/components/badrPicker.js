import * as Constants from '../../../common/constants/badrPicker';

const initialState = {
  picker: {
    empty: {
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
      nextState.picker[action.value.command] = {
        loaded: false,
        errorMessage: '',
        displayError: false,
        items: [],
      };
      return nextState;
    case Constants.BADRPICKER_IN_PROGRESS:
      nextState.picker[action.value.command] = {
        loaded: false,
        errorMessage: '',
        displayError: false,
        items: [],
      };
      return nextState;
    case Constants.BADRPICKER_SUCCESS:
      nextState.picker[action.value.command] = {
        loaded: true,
        errorMessage: '',
        displayError: false,
        items : action.value.payload
      };
      return nextState;
    case Constants.BADRPICKER_FAILED:
      nextState.picker[action.value.command] = {
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
