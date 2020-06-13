/** API Services */
import AtApi from '../../../services/api/at-api';

/**Constants */
import * as Constants from '../../../common/constants/at/at';

/** i18n */
import {translate} from '../../../common/translations/i18n';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    AtApi.initApurement(action.value.reference)
      .then((response) => {
        if (response) {
          console.log('PARSE');
          const data = response.data;
          console.log('DATTTT');
          console.log(data);
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(success(data));
            navigation.navigate('Apurement', {});
          } else {
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.INIT_APUR_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: Constants.INIT_APUR_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: Constants.INIT_APUR_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: Constants.INIT_APUR_FAILED,
    value: data,
  };
}

export function confirm(data) {
  return {
    type: Constants.PREPARE_APUR_CONFIRM,
    value: {
      listComposantAapurer: data.value.listComposantAapurer,
      exportateur: data.value.exportateur,
      dateApurement: data.value.dateApurement,
      motif: data.value.motif,
    },
  };
}

export function remove(data) {
  return {
    type: Constants.PREPARE_APUR_REMOVE,
    value: {index: data.value.index},
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
