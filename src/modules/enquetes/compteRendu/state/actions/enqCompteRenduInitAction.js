import EnqCompteRenduApi from '../../service/api/enqCompteRenduApi';

import * as Constants from '../enqCompteRenduConstants';

import {translate} from '../../../../../commons/i18n/ComI18nHelper';

export function request(action, navigation) {
    return async (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));

        let data = {
            natureVehiculeData: {},
            natureVehiculeError: false,
            natureVehiculeTechnicalError: false,
            uniteMesureData: {},
            uniteMesureError: false,
            uniteMesureTechnicalError: false,
        };

        await EnqCompteRenduApi.listNatureVehicule()
            .then((response) => {
                if (response) {
                    const natureVehiculeData = response.data;
                    if (natureVehiculeData && (natureVehiculeData.dtoHeader.messagesErreur == null || natureVehiculeData.dtoHeader.messagesErreur.length === 0)) {
                        data.natureVehiculeData = natureVehiculeData;
                    } else {
                        data.natureVehiculeData = natureVehiculeData;
                        data.natureVehiculeError = true;
                    }
                } else {
                    data.natureVehiculeTechnicalError = true;
                }
            })
            .catch((e) => {
                data.natureVehiculeTechnicalError = true;
            });

        await EnqCompteRenduApi.listUniteMesure()
            .then((response) => {
                if (response) {
                    const uniteMesureData = response.data;
                    if (uniteMesureData && (uniteMesureData.dtoHeader.messagesErreur == null || uniteMesureData.dtoHeader.messagesErreur.length === 0)) {
                        data.uniteMesureData = uniteMesureData;
                    } else {
                        data.uniteMesureData = uniteMesureData;
                        data.uniteMesureError = true;
                    }
                } else {
                    data.uniteMesureTechnicalError = true;
                }
            })
            .catch((e) => {
                data.uniteMesureTechnicalError = true;
            });


        if (data.natureVehiculeTechnicalError || data.uniteMesureTechnicalError) {
            dispatch(failed(translate('errors.technicalIssue')));
        } else if (data.natureVehiculeError) {
            dispatch(failed(data.natureVehiculeError));
        } else if (data.uniteMesureError) {
            dispatch(failed(data.uniteMesureError));
        } else {
            dispatch(success(data));
        }
    };
}

export function init(action) {
    return {
        type: Constants.INIT_COMPTE_RENDU_INIT,
        value: action.value,
    };
}

export function inProgress(action) {
    return {
        type: Constants.INIT_COMPTE_RENDU_IN_PROGRESS,
        value: action.value,
    };
}

export function success(data) {
    return {
        type: Constants.INIT_COMPTE_RENDU_SUCCESS,
        value: data,
    };
}

export function failed(data) {
    return {
        type: Constants.INIT_COMPTE_RENDU_FAILED,
        value: data,
    };
}

export default {
    request,
    success,
    failed,
    inProgress,
};
