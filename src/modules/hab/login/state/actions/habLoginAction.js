/** API Services */
import HabLoginApi from '../../service/api/habLoginApi';

/** Constants */
import * as Constants from '../habLoginConstants';
import * as GenericConstants from '../../../../../commons/constants/generic/ComGenericConstants';
/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';

/** Storage */
import {saveStringified} from '../../../../../commons/services/async-storage/ComStorageService';

/** Inmemory session */
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import {
    USER_SKIP_VERIVICATION_VERSION,
    IONIC_PACKAGE_NAME,
} from '../../../../../commons/Config';
import {getVersion} from 'react-native-device-info';
import {getApps} from 'react-native-android-installed-apps-unblocking';
import _ from 'lodash';

export function request(action, navigation) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgress(action));
        HabLoginApi.login(
            action.value.login,
            action.value.pwd,
            action.value.forcerConnexion,
            action.value.isFromCohabitation,
        )
            .then((data) => {
                console.log(data);
                if (data) {
                    if (data.statutConnexion === '1') {
                        dispatch(success(data));
                        /** Saving the user login into the local storage */
                        saveStringified('user', data).then(() => data.login);
                        /** Saving the user login into the global in-memory session */
                        ComSessionService.getInstance().setLogin(data.login);
                        ComSessionService.getInstance().setPassword(action.value.pwd);
                        /** skip check verification for specific users */
                        if (_.includes(USER_SKIP_VERIVICATION_VERSION, data.login)) {
                            /** Naviguer vers la vue suivant. */
                            navigation.navigate('SmsVerify', {
                                login: action.value.login,
                            });
                        } else {
                            /** start the version check for RN && IONIC */
                            dispatch(
                                requestCheckVersion(
                                    {
                                        type: Constants.CHECK_VERSION_REQUEST,
                                        value: {},
                                    },
                                    navigation,
                                ),
                            );
                        }
                    } else if (data.statutConnexion === '2') {
                        /** pour afficher msg de confirmation de connx. */
                        dispatch(failed(data));
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

export function requestClearCacheObjects(action, navigation) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgressClearCacheObjects(action));
        HabLoginApi.clearCacheObjects()
            .then((data) => {
                if (data) {
                    dispatch(successClearCacheObjects(data));
                } else {
                    dispatch(failedClearCacheObjects(translate('errors.technicalIssue')));
                }
            })
            .catch((e) => {
                dispatch(failedClearCacheObjects(translate('errors.technicalIssue')));
            });
    };
}

export function requestLogout(action, navigation) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgressLogout(action));
        HabLoginApi.logout()
            .then((data) => {
                if (data) {
                    dispatch(successLogout(data));
                    /** navigate to login screen  if the api call return 403  */
                    action.value.isFrom === GenericConstants.GENERIC_CATCH_API
                        ? navigation.navigate('Login', { msg: action.value.msg })
                        : navigation.navigate('Login', {});
                } else {
                    dispatch(failedLogout(translate('errors.technicalIssue')));
                }
            })
            .catch((e) => {
                dispatch(failedLogout(translate('errors.technicalIssue')));
            });
    };
}

export function inProgress(action) {
    return {
        type: Constants.AUTH_LOGIN_IN_PROGRESS,
        value: action.value,
    };
}

export function success(data) {
    return {
        type: Constants.AUTH_LOGIN_SUCCESS,
        value: data,
    };
}

export function failed(data) {
    return {
        type: Constants.AUTH_LOGIN_FAILED,
        value: data,
    };
}

export function inProgressClearCacheObjects(action) {
    return {
        type: Constants.AUTH_CLEAR_CACHE_OBJECTS_IN_PROGRESS,
        value: action.value,
    };
}

export function successClearCacheObjects(data) {
    return {
        type: Constants.AUTH_CLEAR_CACHE_OBJECTS_SUCCESS,
        value: data,
    };
}

export function failedClearCacheObjects(data) {
    return {
        type: Constants.AUTH_CLEAR_CACHE_OBJECTS_FAILED,
        value: data,
    };
}

export function inProgressLogout(action) {
    return {
        type: Constants.AUTH_LOGOUT_IN_PROGRESS,
        value: action.value,
    };
}

export function successLogout(data) {
    return {
        type: Constants.AUTH_LOGOUT_SUCCESS,
        value: data,
    };
}

export function failedLogout(data) {
    return {
        type: Constants.AUTH_LOGOUT_FAILED,
        value: data,
    };
}

export function init(action) {
    return {
        type: Constants.LOGIN_INIT,
        value: action.value,
    };
}
export function requestCheckVersion(action, navigation) {
    return (dispatch) => {
        dispatch(action);
        dispatch(inProgressCheckVersion(action));

        HabLoginApi.checkVersion()
            .then((rep) => {
                if (rep.data && rep.data.version) {
                    console.log('===> REMOTE VERSION :', rep.data.version);
                    console.log('===> INSTALLED RN VERSION :', getVersion());
                    if (getVersion() !== rep.data.version) {
                        /** Version RN n'est pas à jour  */
                        dispatch(successCheckVersion(true, translate('versionAjourRN')));
                    } else {
                        getApps()
                            .then((apps) => {
                                let indexIonicApp = _.findIndex(apps, [
                                    'packageName',
                                    IONIC_PACKAGE_NAME,
                                ]);
                                if (indexIonicApp !== -1) {
                                    console.log(
                                        '===> INSTALLED IONIC VERSION :',
                                        apps[indexIonicApp].versionName,
                                    );
                                    if (apps[indexIonicApp].versionName !== rep.data.version) {
                                        dispatch(
                                            successCheckVersion(true, translate('versionAjourIONIC')),
                                        );
                                    } else {
                                        dispatch(successCheckVersion(false));
                                        /** Naviguer vers la vue suivant. */
                                        navigation.navigate('SmsVerify', {
                                            login: action.value.login,
                                        });
                                    }
                                } else {
                                    //IONIC VERSION NOT INSTALLED
                                    dispatch(
                                        successCheckVersion(
                                            true,
                                            translate('appIonicNotInstalled'),
                                        ),
                                    );
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                dispatch(
                                    failedCheckVersion(translate('errors.technicalIssue')),
                                );
                            });
                    }
                } else {
                    dispatch(failedCheckVersion(translate('errors.technicalIssue')+ translate('errorGetVersionFromBo')));
                }
            })
            .catch((e) => {
                dispatch(failedCheckVersion(translate('errors.technicalIssue')+translate('errorGetVersionFromBo')));
            });
    };
}

export function inProgressCheckVersion(action) {
    return {
        type: Constants.CHECK_VERSION_IN_PROGRESS,
        value: action.value,
    };
}

export function successCheckVersion(showModalUpdateVersion, msg) {
    return {
        type: Constants.CHECK_VERSION_SUCCESS,
        value: {
            showModalUpdateVersion: showModalUpdateVersion,
            msg: msg,
        },
    };
}

export function failedCheckVersion(data) {
    return {
        type: Constants.CHECK_VERSION_FAILED,
        value: data,
    };
}

export default {
    request,
    success,
    failed,
    inProgress,
    requestLogout,
    successLogout,
    failedLogout,
    inProgressLogout,
    requestCheckVersion,
    successCheckVersion,
    failedCheckVersion,
    inProgressCheckVersion,
};
