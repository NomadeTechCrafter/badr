import * as Constants from '../../constants/generic/ComGenericConstants';
import * as authAction from '../../../modules/hab/login/state/actions/habLoginAction';
import * as LoginConstants from '../../../modules/hab/login/state/habLoginConstants';
import * as RootNavigation from '../../utils/ComRootNavigationUtils';
import ComHttpHelperApi from '../../services/api/common/ComHttpHelperApi';

import store from '../../state/Store';

export const comCustomMiddlewareService = (store) => (next) => (action) => {
  if (action.type === Constants.GENERIC_CATCH_API) {
    let error = action.value.data;
    console.log('customMiddleware GENERIC_CATCH_API ');
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      logout(error.message);
    } else if (error.request) {
      // The request was made but no response was receivedjs
      console.log('error.request', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error from ComCustomMiddlewareService : ', error.message);
    }
    sendCrash(error);
  }
  next(action);
};
const sendCrash = async (error) => {
  return await ComHttpHelperApi.sendCrash(
    error.response.status,
    error.message,
    error.message,
    error.response,
  );
};
const logout = (error) => {
  let action = authAction.requestLogout(
    {
      type: LoginConstants.AUTH_LOGOUT_REQUEST,
      value: {isFrom: Constants.GENERIC_CATCH_API, msg: error},
    },
    RootNavigation,
  );
  store.dispatch(action);
};
