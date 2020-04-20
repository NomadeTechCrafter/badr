import * as Constants from '../../common/constants/menu';
import _ from 'lodash';

const initialState = {
  menuList: [],
  level: 1,
  showProgress: false,
  displayError: false,
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.MENU_REQUEST:
      nextState.displayError = false;
      nextState.showProgress = true;
      return nextState;
    case Constants.MENU_IN_PROGRESS:
      return nextState;
    case Constants.MENU_SUCCESS:
      console.log('success');
      nextState.showProgress = false;
      var collection = JSON.parse(action.value.payload);
      var libelleSearch = action.value.predicate.libelleFonctionnalite;
      if (libelleSearch) {
        collection = _.filter(collection, function(menu) {
          return _.includes(
            menu.libelleFonctionnalite.toLowerCase(),
            libelleSearch.toLowerCase(),
          );
        });
      } else {
        collection = _.filter(collection, action.value.predicate);
        if (!_.isEmpty(collection)) {
          nextState.level = collection[0].niveau;
        }
      }
      console.log(collection.length);
      nextState.menuList = collection;
      return nextState;
    case Constants.MENU_FAILED:
      console.log('failed');
      nextState.showProgress = false;
      nextState.displayError = true;
      nextState.errorMessage = action.value;
      return nextState;
    case Constants.MENU_INIT:
      return initialState;
    default:
      nextState.showProgress = false;
      return initialState;
  }
};
