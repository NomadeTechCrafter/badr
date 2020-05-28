import * as Constants from '../../../common/constants/components/qrCode';

const initialState = {
    showProgress: false,
    errorMessage: null,
    qrData:null,
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
        console.log('--> QRCODE request...');
      return nextState;
    case Constants.QRCODE_IN_PROGRESS:
        console.log('--> QRCODE in progress...');
        return nextState;
    case Constants.QRCODE_SUCCESS:
        console.log('--> QRCODE success...',nextState);
        nextState.showProgress = false;
        nextState.errorMessage = null;
        nextState.qrData = action.value.data;
        return nextState;
      case Constants.QRCODE_FAILED:
        console.log('--> QRCODE failed...');
        nextState.showProgress = false;
        nextState.errorMessage = (action.value.data.dtoHeader) ? action.value.data.dtoHeader.messagesErreur : action.value ;
        return nextState;
      return nextState;
    case Constants.QRCODE_INIT:
      return initialState;
    default:
      return initialState;
  }
};
