import * as Constants from '../../constants/components/ComBadrPickerConstants';

const initialState = {
  showProgress: false,
  picker: {
    empty: {
      loaded: true,
      group: [
        {
          children: [],
        },
      ],
    },
  },
};

export default (state = initialState, action) => {
  let nextState = {
    ...state,
    value: action.value,
  };
  switch (action.type) {
    case Constants.BADRPICKER_CHECKER_REQUEST:
      nextState.showProgress = true;
      nextState.picker[action.value.command] = {
        loaded: false,
        errorMessage: '',
        displayError: false,
        group: [],
      };
      return nextState;
    case Constants.BADRPICKER_CHECKER_IN_PROGRESS:
      nextState.showProgress = true;
      nextState.picker[action.value.command] = {
        loaded: false,
        errorMessage: '',
        displayError: false,
        group: [],
      };
      return nextState;
    case Constants.BADRPICKER_CHECKER_SUCCESS:
      nextState.showProgress = false;
      nextState.picker[action.value.command] = {
        loaded: true,
        errorMessage: '',
        displayError: false,
        group: [
          {
            children: action.value.payload,
          },
        ],
      };
      nextState.picker[action.value.command].group[0][action.value.cle] = '0';
      nextState.picker[action.value.command].group[0][action.value.libelle] =
        'Séléctionnez tous';
      return nextState;
    case Constants.BADRPICKER_CHECKER_FAILED:
      nextState.showProgress = false;
      nextState.picker[action.value.command] = {
        loaded: false,
        errorMessage: 'Erreur lors du chargement du composant : <BADR_PICKER>',
        displayError: false,
      };
      return nextState;
    default:
      state.picker = initialState.picker;
      return state;
  }
};
