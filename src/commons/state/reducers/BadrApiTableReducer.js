import * as Constants from '../../constants/components/BadrApiTableConstants';

const initialState = {
  data: [],
  showProgress: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.BADR_APITABLE_REQUEST:
      nextState.showProgress = true;
      nextState.data = [];
      return nextState;
    case Constants.BADR_APITABLE_IN_PROGRESS:
      console.log('... in progress ...');
      nextState.data = [];
      nextState.showProgress = true;
      return nextState;
    case Constants.BADR_APITABLE_SUCCESS:
      console.log('... success ...');
      nextState.data = action.value.payload;
      nextState.showProgress = false;
      return nextState;
    case Constants.BADR_APITABLE_FAILED:
      console.log('... failed ...');
      nextState.showProgress = false;
      return nextState;
    case Constants.BADR_APITABLE_INIT:
      return initialState;
    default:
      return nextState ? nextState : initialState;
  }
};
