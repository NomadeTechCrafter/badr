/** API Services */
import AtApi from '../../../services/api/at-api';

/**Constants */
import * as Constants from '../../../common/constants/at/at';

/** i18n */
import {translate} from '../../../common/translations/i18n';

import * as CreateApurementAction from './createApurement';
/**
  Initialisation manuelle
 */

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

/**
  Initialisation automatique
 */

const handleVerifierDepassementDelaiResponse = (response) => {
  if (response.data.dtoHeader.messagesErreur) {
    return response.data.dtoHeader.messagesErreur;
  } else if (response.data.dtoHeader.messagesInfo) {
    return response.data.dtoHeader.messagesInfo;
  }
};

export function requestAuto(action, componentInstance) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    AtApi.initApurerAutoAT(action.value.reference)
      .then((response) => {
        if (response) {
          const data = response.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(success(data));
            AtApi.verifierDepassementDelai(
              data.jsonVO.atEnteteVO.dateFinSaisieAT,
              // mock it to get depassement '17/10/2019',
            ).then((vddResponse) => {
              console.log('------______________________');
              console.log('------______________________');
              console.log(vddResponse.status);
              console.log('------______________________');
              console.log('------______________________');
              if (vddResponse && vddResponse.data.jsonVO) {
                componentInstance._showDialog(
                  vddResponse.data.dtoHeader.messagesErreur +
                    '\n ' +
                    translate(
                      'at.apurementauto.confirmDialog.confirmApurMessage',
                    ),
                  data.jsonVO,
                );
              } else if (!vddResponse.data.jsonVO) {
                /**apurer at */
                console.log('--__--__--__');
                console.log(data.jsonVO);
                var reqAutoAction = CreateApurementAction.requestAutomatique(
                  {
                    type: Constants.CREATE_APURAUTO_REQUEST,
                    value: {
                      atVO: data.jsonVO,
                    },
                  },
                  this,
                );
                dispatch(reqAutoAction);
              } else {
                const messages = handleVerifierDepassementDelaiResponse(
                  vddResponse,
                );
                if (messages && messages.length > 0) {
                  dispatch(failedAuto(messages[0]));
                } else {
                  vddResponse.data.dtoHeader = {
                    messagesErreur: translate(
                      'at.verifierDepassementDelai.message',
                    ),
                  };
                  dispatch(failedAuto(vddResponse.data));
                }
              }
            });
          } else {
            dispatch(failedAuto(data));
          }
        } else {
          dispatch(failedAuto(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgressAuto(action) {
  return {
    type: Constants.INIT_APURAUTO_IN_PROGRESS,
    value: action.value,
  };
}

export function initAuto(action) {
  return {
    type: Constants.INIT_APURAUTO_INIT,
    value: action.value,
  };
}

export function successAuto(data) {
  return {
    type: Constants.INIT_APURAUTO_SUCCESS,
    value: data,
  };
}

export function failedAuto(data) {
  return {
    type: Constants.INIT_APURAUTO_FAILED,
    value: data,
  };
}

export function verifierDepassementDelaiRequest(action) {
  return (dispatch) => {
    dispatch(action);
    AtApi.verifierDepassementDelai(action.value.dateFinSaisieAT).then(
      (vddResponse) => {
        if (!vddResponse.data.jsonVO) {
          dispatch(verifierDepassementDelaiSuccess(vddResponse.data.jsonVO));
        } else {
          dispatch(verifierDepassementDelaiFailed(vddResponse.data.jsonVO));
        }
      },
    );
  };
}

export function verifierDepassementDelaiSuccess(data) {
  return {
    type: Constants.VERIFIER_DELAI_DEPASSEMENT_SUCCESS,
    value: data,
  };
}

export function verifierDepassementDelaiFailed(data) {
  return {
    type: Constants.VERIFIER_DELAI_DEPASSEMENT__FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
  confirm,
  remove,
  requestAuto,
  successAuto,
  failedAuto,
  inProgressAuto,
  verifierDepassementDelaiRequest,
  verifierDepassementDelaiSuccess,
  verifierDepassementDelaiFailed,
};
