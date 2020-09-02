import * as Constants from '../../constants/components/QrCodeConstants';

const initialState = {
  showProgress: false,
  errorMessage: null,
  qrData: null,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.QRCODE_REQUEST:
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.QRCODE_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.QRCODE_SUCCESS:
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.qrData = action.value.data;
      return nextState;
    case Constants.QRCODE_FAILED:
      nextState.showProgress = false;
      nextState.errorMessage = action.value.data.dtoHeader
        ? action.value.data.dtoHeader.messagesErreur
        : action.value;
      return nextState;
    case Constants.QRCODE_INIT:
      return initialState;
    default:
      return initialState;
  }
};
