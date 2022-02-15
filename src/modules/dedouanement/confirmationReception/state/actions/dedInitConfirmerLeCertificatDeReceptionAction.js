/** API Services */

/**Constants */
import { GENERIC_FAILED, GENERIC_IN_PROGRESS, GENERIC_SUCCESS } from '../../../../../commons/constants/generic/ComGenericConstants';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import { getValueByPath } from '../../../redressement/utils/DedUtils';
import DedConfirmerReceptionApi from '../../service/api/dedConfirmationReceptionApi';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    DedConfirmerReceptionApi.initConfirmerReception(action.value.jsonVO).then((response) => {

      const messagesErreurs = getValueByPath(
        'data.dtoHeader.messagesErreur',
        response,
      );
      if (
        response &&
        response.data &&
        response.data.jsonVO &&
        !messagesErreurs
      ) {
        dispatch(success(response.data.jsonVO, action.value));
        navigation.navigate('DedRedressementScreen', {
          searchData: action.value ? action.value.jsonVO : {}, title:  translate('confimationReception.title'),
          subtitle: translate('confimationReception.subTitle'), showHeader: true, isConfirmationReception: true, isRedressementDUM: false, successRedirection: null
        });
      } else {
        dispatch(failed(messagesErreurs, action.value));
      }
    })
      .catch((e) => {
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: GENERIC_IN_PROGRESS,
    value: action.value,
  };
}


export function success(data, searchParams) {
  return {
    type: GENERIC_SUCCESS,
    value: {
      searchParams: searchParams,
      data: data,
      isRedressementDUM: false
    },
  };
}

export function failed(data, command) {
  return {
    type: GENERIC_FAILED,
    value: {
      command: command,
      data: data,
    },
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
