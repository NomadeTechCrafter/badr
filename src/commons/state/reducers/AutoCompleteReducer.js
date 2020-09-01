import * as Constants from '../../constants/components/AutoCompleteConstants';

const initialState = {
  loaded: false,
  data: [],
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.AUTOCOMPLETE_REQUEST:
      nextState.loaded = false;
      nextState.data = [];
      return nextState;
    case Constants.AUTOCOMPLETE_IN_PROGRESS:
      return nextState;
    case Constants.AUTOCOMPLETE_SUCCESS:
      console.log('in reducers success', action.value.data);
      nextState.data = action.value.data;
      nextState.loaded = true;
      return nextState;
    case Constants.AUTOCOMPLETE_FAILED:
      nextState.loaded = true;
      nextState.errorMessage =
        'Erreur lors du chargement du composant autocomplete';
      return nextState;
    case Constants.AUTOCOMPLETE_INIT:
      return initialState;
    default:
      return initialState;
  }
};
