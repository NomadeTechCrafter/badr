import * as Constants from '../../constants/components/QrCodeConstants';

const initialState = {
  showProgress: false,
  errorMessage: null,
  qrData: null,
  qrFailed: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.QRCODE_REQUEST:
      nextState.qrFailed = false;
      nextState.qrData = {};
      nextState.showProgress = true;
      nextState.errorMessage = null;
      return nextState;
    case Constants.QRCODE_IN_PROGRESS:
      nextState.showProgress = true;
      return nextState;
    case Constants.QRCODE_SUCCESS:
      nextState.qrFailed = false;
      nextState.showProgress = false;
      nextState.errorMessage = null;
      nextState.qrData = action.value.data;
      return nextState;
    case Constants.QRCODE_FAILED:
      nextState.qrFailed = true;
      nextState.showProgress = false;
      nextState.qrData = {};
      nextState.errorMessage =
        action.value.data && action.value.data.dtoHeader
          ? action.value.data.dtoHeader.messagesErreur
          : action.value;
      return nextState;
    case Constants.QRCODE_INIT:
      return initialState;
    default:
      return initialState;
  }
};
