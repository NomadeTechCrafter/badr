/** Constants */
import * as Constants from '../habLoginConstants';

const initialState = {
    user: null,
    loggedIn: false,
    showProgress: false,
    errorMessage: null,
    showModalUpdateVersion: false,
    msgModalUpdateVersion: '',
    failures:{}
};

export default (state = initialState, action) => {
    let nextState = {
        ...state,
        value: action.value,
    };
    switch (action.type) {
        case Constants.AUTH_LOGIN_REQUEST:
            nextState.showProgress = true;
            nextState.errorMessage = null;
            return nextState;
        case Constants.AUTH_LOGIN_IN_PROGRESS:
            return nextState;
        case Constants.AUTH_LOGIN_SUCCESS:
            nextState.showProgress = false;
            nextState.errorMessage = null;
            nextState.loggedIn = true;
            delete nextState.failures[action.value.login];
            nextState.user = action.value;
            return nextState;
        case Constants.AUTH_LOGIN_FAILED:
            nextState.showProgress = false;
            var f=nextState.failures[action.value.login]
            if (f && f.count>2 && Date.now() > f.nextTry)
                               delete nextState.failures[action.value.login];
                               if(action.value.login){
             f = nextState.failures[action.value.login] = nextState.failures[action.value.login] || {count: 0, nextTry: new Date()};
            ++f.count;

            if(f.count>2)
               f.nextTry.setTime(Date.now() + 60*1000*5);
}
          //  nextState.nbrRetries=nextState.nbrRetries+1
            nextState.loggedIn = false;
            if (action.value.messagesRetour) {
                nextState.errorMessage = action.value.messagesRetour
                    ? JSON.stringify(action.value.messagesRetour[0])
                    : action.value;
            } else if (action.value.statutConnexion === '2') {
                /** pour afficher msg de confirmation de connx. */
                nextState.errorMessage = '2';
            } else {
                nextState.errorMessage = action.value;
            }
            return nextState;
        case Constants.AUTH_LOGOUT_REQUEST:
            nextState.errorMessage = null;
            return nextState;
        case Constants.AUTH_LOGOUT_IN_PROGRESS:
            nextState.showProgress = true;
            return nextState;
        case Constants.AUTH_LOGOUT_SUCCESS:
            nextState.showProgress = false;
            nextState.loggedIn = false;
            return initialState;
        case Constants.AUTH_LOGOUT_FAILED:
            nextState.showProgress = false;
            nextState.loggedIn = true;

        case Constants.CHECK_VERSION_REQUEST:
            nextState.showProgress = true;
            nextState.errorMessage = null;
            return nextState;
        case Constants.CHECK_VERSION_IN_PROGRESS:
            return nextState;
        case Constants.CHECK_VERSION_SUCCESS:
            nextState.showProgress = false;
            nextState.showModalUpdateVersion = action.value.showModalUpdateVersion;
            nextState.msgModalUpdateVersion = action.value.msg;
            return nextState;
        case Constants.CHECK_VERSION_FAILED:
            nextState.showProgress = false;
            nextState.showModalUpdateVersion = false;
            nextState.loggedIn = false;
            nextState.msgModalUpdateVersion = '';
            nextState.errorMessage = action.value;
            return nextState;
        case Constants.LOGIN_INIT:
            return initialState;
        default:
            nextState.showProgress = false;
            return initialState;
    }
};
