import * as Constants from '../../constants/components/ComAutoCompleteConstants';
import {translate} from '../../i18n/ComI18nHelper';

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
      nextState.loaded = false;
      return nextState;
    case Constants.AUTOCOMPLETE_SUCCESS:
      nextState.data = action.value.data;
      nextState.loaded = true;
      return nextState;
    case Constants.AUTOCOMPLETE_FAILED:
      nextState.loaded = true;
      nextState.errorMessage = translate('errors.autoCompleteErr');
      return nextState;
    case Constants.AUTOCOMPLETE_INIT:
      return initialState;
    default:
      return initialState;
  }
};
