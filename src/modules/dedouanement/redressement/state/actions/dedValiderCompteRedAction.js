import translate from '../../../../../commons/i18n/ComI18nHelper';
import {getValueByPath} from '../../utils/DedUtils';
import DedRedressementApi from '../../service/api/DedRedressementApi';
import {
  VALIDER_COMPTE_RED_FAILED,
  VALIDER_COMPTE_RED_IN_PROGRESS,
  VALIDER_COMPTE_RED_SUCCESS,
} from '../DedRedressementConstants';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    DedRedressementApi.validerCompteRed(action.value.data)
      .then((response) => {
        console.log('response', response);
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
          dispatch(
              success(response.data.jsonVO, action.value.command)
          );
        } else {
          dispatch(failed(messagesErreurs));
        }
      })
      .catch((e) => {
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: VALIDER_COMPTE_RED_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data, command)  {
  return {
    type: VALIDER_COMPTE_RED_SUCCESS,
    value: {
      command: command,
      data: data,
    },
  };
}

export function failed(data) {
  return {
    type: VALIDER_COMPTE_RED_FAILED,
    value: {
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
