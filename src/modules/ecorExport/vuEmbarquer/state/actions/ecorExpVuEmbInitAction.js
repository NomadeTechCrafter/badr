import * as Constants from '../ecorExpVuEmbarquerConstants';

import ComTransverseApi from '../../../../../commons/services/api/ComTransverseApi';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action, navigation, successRedirection) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    console.log(JSON.stringify(action.value.data));
    ComTransverseApi.doProcess(
      action.value.module,
      action.value.commande,
      action.value.typeService,
      action.value.data,
    )
      .then((response) => {
        if (response) {
          const data = response.data;
          const params = action.value.data;
          if (
            data &&
            (data.dtoHeader.messagesErreur == null ||
              data.dtoHeader.messagesErreur.length === 0)
          ) {
            dispatch(success(data));
            navigation.navigate('VuEmbListeDeclaration2', {
              params: { params},
            });
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
    type: Constants.RECHERCHE_D17_DUM_IN_PROGRESS,
    value: action.value,
  };
}

export function init() {
  return {
    type: Constants.INIT_D17_DUM_REQUEST,
    value: {},
  };
}

export function success(data) {
  // ComTransverseApi.doProcess(
  //   "ECHANGE_LIB",
  //   "echange.findResultatScannerByDum",
  //   "SP",
  //   "30906020210000179",
  // )
  //   .then((response) => {
  //     // console.log('response Resultat Scanner VuEmbarquer : ' + JSON.stringify(response));
  //     if (response) {
  //       const scanData = response.data;
  //       if (
  //         scanData &&
  //         (scanData.dtoHeader.messagesErreur == null ||
  //           scanData.dtoHeader.messagesErreur.length === 0)
  //       ) {

  //         console.log("++++++++++++++++++++++++++++dispatch(success(data, scanner))+++++++++++++++++++++++++++++++++++++++++++++");
  //         console.log(JSON.stringify(scanData));
  //         data.scanData = scanData;
  //         console.log("+++++++++++++++++++++++++++++dispatch(success(data, scanner))++++++++++++++++++++++++++++++++++++++++++++");
  //         // dispatch(success(data, scanData?.jsonVO));
  //       } else {
  //         dispatch(failed(scanData));
  //       }
  //     } else {
  //       dispatch(failed(translate('errors.technicalIssue')));
  //     }
  //   })
  //   .catch((e) => {
  //     dispatch(failed(translate('errors.technicalIssue')));
  //   });

  return {
    type: Constants.RECHERCHE_D17_DUM_SUCCESS,
    value: data,
    // scannerData: scanData,
    
  };
}

export function failed(data) {
  return {
    type: Constants.RECHERCHE_D17_DUM_FAILED,
    value: data,
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
  remove,
};
