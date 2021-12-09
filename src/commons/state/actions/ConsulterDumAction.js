/**Constants */
import * as Constants from '../../constants/generic/ComGenericConstants';

/** i18n */
import { translate } from '../../i18n/ComI18nHelper';
import TransverseApi from '../../services/api/ComTransverseApi';
import { getValueByPath } from '../../../modules/dedouanement/redressement/utils/DedUtils';

export function request(action, navigation) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      'DED_LIB',
      action.command,
      'UC',
      action.value.jsonVO,
    )
      .then((response) => {

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
          if (action.command === 'ded.TraiterValeur' || action.command === 'ded.EnvoyerValeur') {
            dispatch(success(response.data.jsonVO, action.value, action.command, response.data.dtoHeader.messagesInfo));
          } else {
            dispatch(success(response.data.jsonVO, action.value, action.command, ''));
          }
          navigation.navigate('DedRedressementScreen', {
            searchData: action.value ? action.value.jsonVO : {}, title: translate('dedouanement.title'),
            subtitle: translate('dedouanement.subTitle'), showHeader: true, isConfirmationReception: false
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
    type: Constants.GENERIC_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: action.type,
    value: action.value,
  };
}

export function success(data, searchParams, fromWhere1, messagesInfo) {
  return {
    type: Constants.GENERIC_SUCCESS,
    value: {
      searchParams: searchParams,
      data: data,
      fromWhere1: fromWhere1,
      messageInfo: messagesInfo[0]
    },
  };
}

export function failed(data, command) {
  return {
    type: Constants.GENERIC_FAILED,
    value: {
      command: command,
      data: data,
      errorMessage: data
    },
  };
}
