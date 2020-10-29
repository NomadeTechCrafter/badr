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

export function synchronize(action) {
  return (dispatch) => {
    dispatch({
      type: CRUD_SYNC,
      value: {
        items: action.value.items,
        selectedItem: action.value.selectedItem,
      },
    });
  };
}
export function showCreateItem(action) {
  return (dispatch) => {
    dispatch({
      type: CRUD_SHOW_CREATE,
      value: action.value,
    });
  };
}

export function createItem(action) {
  return (dispatch) => {
    dispatch({
      type: CRUD_CREATE,
      value: action.value,
    });
  };
}

export function showUpdateItem(action) {
  return (dispatch) => {
    dispatch({
      type: CRUD_SHOW_UPDATE,
      value: action.value,
    });
  };
}

export function updateItem(action) {
  return {
    type: CRUD_UPDATE,
    value: action.value,
  };
}

export function deleteItem(action) {
  return {
    type: CRUD_DELETE,
    value: action.value,
  };
}

export function initItems(action) {
  return {
    type: CRUD_INIT_REQUEST,
    value: action.value,
  };
}

export function saveAll(action) {
  return {
    type: CRUD_SAVE_ALL_REQUEST,
    value: action.value,
  };
}
