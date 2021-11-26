import {
  RESULTAT_SCANNER_FAILED,
  RESULTAT_SCANNER_IN_PROGRESS,
  RESULTAT_SCANNER_INIT,
  RESULTAT_SCANNER_SUCCESS,
} from '../ctrlResultatScannerConstants';
import CtrlResultatScannerApi from '../../service/api/ctrlResultatScannerApi';
import translate from '../../../../../commons/i18n/ComI18nHelper';

export function request(action) {
  return (dispatch) => {
    dispatch(action);
    dispatch(inProgress(action));
    CtrlResultatScannerApi.findCtrlResultatScanner({
      dateDebut: action.value.dateDebut,
      dateFin: action.value.dateFin,
      resultat: action.value.resultat,
      typeDeclaration: action.value.typeDeclaration,
      bureau: action.value.bureau,
      regime: action.value.regime,
      annee: action.value.annee,
      serie: action.value.serie,
      cle: action.value.cle,
    })
      .then((response) => {
        if (response && response.data && response?.data?.jsonVO) {
          dispatch(success(response?.data?.jsonVO));
        } else {
          if (response?.data?.jsonVO) {
            dispatch(failed(response?.data?.jsonVO));
          } else {
            dispatch(failed(translate('errors.technicalIssue')));
          }
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
    type: RESULTAT_SCANNER_IN_PROGRESS,
    value: action.value,
  };
}

export function init(action) {
  return {
    type: RESULTAT_SCANNER_INIT,
    value: action.value,
  };
}

export function success(data) {
  return {
    type: RESULTAT_SCANNER_SUCCESS,
    value: data,
  };
}

export function failed(data) {
  return {
    type: RESULTAT_SCANNER_FAILED,
    value: data,
  };
}

export default {
  request,
  success,
  failed,
  inProgress,
};
