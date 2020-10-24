import {
  CRUD_CREATE,
  CRUD_DELETE,
  CRUD_INIT_REQUEST,
  CRUD_SAVE_ALL_REQUEST,
  CRUD_SHOW_CREATE,
  CRUD_SHOW_UPDATE,
  CRUD_SYNC,
  CRUD_UPDATE,
} from '../../constants/components/ComCrudDataTableConstants';

import _ from 'lodash';
const initialState = {
  items: [],
  newItem: false,
  editItem: false,
  selectedItem: {},
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case CRUD_INIT_REQUEST:
      nextState.newItem = false;
      nextState.editItem = false;
      return initialState;
    case CRUD_SYNC:
      if (action.value.selectedItem) {
        nextState.selectedItem = action.value.selectedItem;
      }
      if (action.value.items) {
        nextState.items = action.value.items;
      }
      return nextState;
    case CRUD_SHOW_CREATE:
      nextState.newItem = true;
      nextState.editItem = false;
      return nextState;
    case CRUD_CREATE:
      nextState.selectedItem = {};
      if (_.values(action.value.item).some((item) => item !== undefined)) {
        nextState.items.push(action.value.item);
      }
      nextState.newItem = false;
      nextState.editItem = false;
      return nextState;
    case CRUD_SHOW_UPDATE:
      nextState.newItem = false;
      nextState.editItem = true;
      nextState.selectedItem = nextState.items[action.value.index];
      nextState.selectedIndex = action.value.index;
      return nextState;
    case CRUD_UPDATE:
      nextState.items.splice(nextState.selectedIndex, 1, action.value.item);
      nextState.newItem = false;
      nextState.editItem = false;
      nextState.selectedItem = {};
      return nextState;
    case CRUD_DELETE:
      nextState.newItem = false;
      nextState.editItem = false;
      _.remove(nextState.items, function (currentObject) {
        return (
          currentObject[action.value.id] === action.value.item[action.value.id]
        );
      });
      return nextState;
    case CRUD_SAVE_ALL_REQUEST:
      nextState.newItem = false;
      nextState.editItem = false;
      return nextState;
    default:
      return nextState;
  }
};
