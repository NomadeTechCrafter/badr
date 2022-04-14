/** API Services */

import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';

/**Constants */
import * as Constants from '../ApurementConstants';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action) {
  return (dispatch) => {
    // dispatch(action);
    dispatch(inProgress(action));
    ComTransverseApi.doProcess(
      action.value.module,
      action.value.commande,
      action.value.typeService,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          const data = response.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(success(data,action));
          } else {
            dispatch(failed(data));
          }
        } else {
          dispatch(failed(translate('errors.technicalIssue')));
        }
      })
      .catch((e) => {
        dispatch(failed(translate('errors.technicalIssue')));
      });
  };
}

export function inProgress(action) {
  return {
    type: Constants.APUR_CONFIRMER_IN_PROGRESS,
    value: action.value,
  };
}

export function success(data, action) {
  return action.type === Constants.APUR_CONFIRMER_REQUEST ?
    {
      type: Constants.APUR_CONFIRMER_SUCCESS,
      value: data,
    } : (
      action.type === Constants.AJOUTER_LIGNE_DUM_REQUEST ?
        {
          type: Constants.AJOUTER_LIGNE_DUM_SUCCESS,
          value: data,
        } : (
          action.type === Constants.AJOUTER_LIGNE_EC_REQUEST ?
            {
              type: Constants.AJOUTER_LIGNE_EC_SUCCESS,
              value: data,
              refEC: action.value.data.bureauAEC + action.value.data.regimeAEC + action.value.data.anneeAEC + action.value.data.serieAEC,
            } : (
              action.type === Constants.AJOUTER_LOT_DS_REQUEST ?
                {
                  type: Constants.AJOUTER_LOT_DS_SUCCESS,
                  value: data,
                  preapAnnee: action.value.data.anneeDS,
                  preapBureau: action.value.data.bureauDS,
                  preapRegime: action.value.data.regimeDS,
                  preapSerie: action.value.data.serieDS,
                  referenceLot: action.value.data.referenceLot,
                  typeDS: action.value.data.typeDS,
                  lieuChargement: action.value.data.codeLieuChargement,
                  refDS: action.value.refDS,
                  libelleTypeDS: action.value.libelleTypeDS,
                  libelleLieuChargement: action.value.libelleLieuChargement,
                } :
                {
                  type: Constants.APUR_CONFIRMER_USE_CASE_SUCCESS,
                  value: data,
              }
            )
           
        )
    )
    
}
export function failed(data) {
  return {
    type: Constants.APUR_CONFIRMER_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
