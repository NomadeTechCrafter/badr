import TransverseApi from '../../../../commons/services/api/ComTransverseApi';

import * as Constants from '../liquidationRechercheRefDumConstants';

/**i18n */
import { translate } from '../../../../commons/i18n/ComI18nHelper';

export function request(action, navigation, successRedirection) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module,
      action.value.commande,
      action.value.typeService,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          // console.log('response', response);
          const data = response.data;
          if (data && !data.dtoHeader.messagesErreur) {
            //console.log('data', data);
            dispatch(success(data, action.value.liquidationType, action.value.indicateurLiquidationArticlesEnFranchiseTotale, navigation));
            /** Naviguer vers la vue suivant. */
            console.log('successRedirection', successRedirection);
            navigation.navigate(successRedirection, {
              liquidationType: action.value.liquidationType,
              indicateurLiquidationArticlesEnFranchiseTotale: action.value.indicateurLiquidationArticlesEnFranchiseTotale
            });
          } else {
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log('in action request catch', e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function requestUpdate(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    TransverseApi.doProcess(
      action.value.module,
      action.value.commande,
      action.value.typeService,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          // console.log('response', response);
          const data = response.data;
          if (data && !data.dtoHeader.messagesErreur) {
            //console.log('data', data);
            dispatch(update(data));
          } else {
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        console.log('in action request catch', e);
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.RECHERCHEREFDUM_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data, liquidationType, indicateurLiquidationArticlesEnFranchiseTotale, navigation) {
  return {
    type: Constants.RECHERCHEREFDUM_SUCCESS,
    value: {
      data: data,
      liquidationType: liquidationType,
      indicateurLiquidationArticlesEnFranchiseTotale: indicateurLiquidationArticlesEnFranchiseTotale,
      navigation: navigation
    },
  };
}

export function update(data) {
  return {
    type: Constants.RECHERCHEREFDUM_UPDATE,
    value: {
      data: data
    },
  };
}

export function failed(data) {
  return {
    type: Constants.RECHERCHEREFDUM_FAILED,
    value: data,
  };
}

export function init(action) {
  return {
    type: Constants.RECHERCHEREFDUM_INIT,
    value: action.value,
  };
}

export default {
  request,
  success,
  requestUpdate,
  update,
  failed,
  inProgress,
};
