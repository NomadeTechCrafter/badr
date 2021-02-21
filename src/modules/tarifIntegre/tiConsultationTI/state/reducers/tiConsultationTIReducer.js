/**Constants */
import {
    CONSULTATION_TI_FAILED,
    CONSULTATION_TI_IN_PROGRESS,
    CONSULTATION_TI_INIT,
    CONSULTATION_TI_REQUEST,
    CONSULTATION_TI_SUCCESS,
    INIT_CONSULTATION_TI_REQUEST,
    INIT_CONSULTATION_TI_IN_PROGRESS,
    INIT_CONSULTATION_TI_SUCCESS,
    INIT_CONSULTATION_TI_FAILED,
    INIT_CONSULTATION_TI_INIT,
} from '../tiConsultationTIConstants';

const initialState = {
    showProgress: false,
    errorMessage: '',
    displayError: false,
    data: [],
};

export default (state = initialState, action) => {
    let nextState = {
        ...state,
        value: action.value,
    };
    switch (action.type) {
        case INIT_CONSULTATION_TI_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.data = [];
            return nextState;
        case INIT_CONSULTATION_TI_IN_PROGRESS:
            return nextState;
        case INIT_CONSULTATION_TI_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            nextState.data = action.value;
            return nextState;
        case INIT_CONSULTATION_TI_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            nextState.errorMessage = action.value;
            return nextState;
        case INIT_CONSULTATION_TI_INIT:
            return initialState;


        case CONSULTATION_TI_REQUEST:
            nextState.displayError = false;
            nextState.errorMessage = null;
            nextState.showProgress = true;
            nextState.myBlocs = [];
            nextState.leftBlocs = [];
            return nextState;
        case CONSULTATION_TI_IN_PROGRESS:
            return nextState;
        case CONSULTATION_TI_SUCCESS:
            nextState.errorMessage = null;
            nextState.showProgress = false;
            const filtredBlocs = filterBlocs(action.value.consultationTI.datas);
            //console.log(JSON.stringify(filtredBlocs));
            nextState.myBlocs = filtredBlocs[0].sousBlocs;
            nextState.leftBlocs = filtredBlocs[0].sousBlocs.map(b => b.title);
            //console.log('filtredBlocs.sousBlocs[0].map(b => b.title) : ' + JSON.stringify(filtredBlocs[0].sousBlocs.map(b => b.title)));
            return nextState;
        case CONSULTATION_TI_FAILED:
            nextState.showProgress = false;
            nextState.displayError = true;
            nextState.errorMessage = action.value;
            return nextState;
        case CONSULTATION_TI_INIT:
            return initialState;

        default:
            nextState.showProgress = true;
            return initialState;
    }



};

function filterBlocs(donnees) {
    let listBlocs = [];
    // if ($scope.consultationTI) {
    for (var i = 0; i < donnees.length; i++) {
        if (donnees[i].name === 'bloc') {
            var bloc = new Object();

            bloc.title = donnees[i].blocTitre;
            bloc.condition = donnees[i].condition;
            bloc.sousBlocs = [];

            // $scope.Accordion[bloc.title + bloc.condition] = false;


            for (var j = 0; j < donnees[i].datas.length; j++) {
                if (donnees[i].datas[j].name === 'sousbloc-ig') {
                    var sousBloc = new Object();

                    sousBloc.title = donnees[i].datas[j].titre;
                    sousBloc.sousBlocsLines = [];

                    for (var k = 0; k < donnees[i].datas[j].datas.length; k++) {
                        if (donnees[i].datas[j].datas[k].name === 'sousblocig-infos') {
                            for (var l = 0; l < donnees[i].datas[j].datas[k].datas.length; l++) {
                                var sousBlocLigne = new Object();
                                sousBlocLigne.libelle = donnees[i].datas[j].datas[k].datas[l].libelle;

                                for (var m = 0; m < donnees[i].datas[j].datas[k].datas[l].datas.length; m++) {
                                    if (donnees[i].datas[j].datas[k].datas[l].datas[m].name === 'infoig-valeur') {
                                        if (donnees[i].datas[j].datas[k].datas[l].datas[m].datas && donnees[i].datas[j].datas[k].datas[l].datas[m].datas.length > 0) {
                                            sousBlocLigne.valeur = donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].valeur;
                                            if (!sousBlocLigne.valeur) {
                                                sousBlocLigne.valeur = '';
                                                for (var n = 0; n < donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].datas.length; n++) {
                                                    if (donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].datas[n].name === 'elem') {
                                                        sousBlocLigne.valeur += ',' + donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].datas[n].value;
                                                    }
                                                    else if (donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].datas[n].name === 'tableau') {
                                                        for (var o = 0; o < donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].datas[n].datas.length; o++) {
                                                            if (donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].datas[n].datas[o].name === 'tab-ligne') {
                                                                for (var p = 0; p < donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].datas[n].datas[o].datas.length; p++) {
                                                                    if (donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].datas[n].datas[o].datas[p].code === 'val') {
                                                                        sousBlocLigne.valeur += ' ' + donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].datas[n].datas[o].datas[p].libelle;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (sousBlocLigne.valeur.length > 0) {
                                                    sousBlocLigne.valeur = sousBlocLigne.valeur.substring(1);
                                                }
                                            }
                                        }
                                    }
                                }
                                if (sousBlocLigne.valeur && sousBlocLigne.valeur != null && sousBlocLigne.valeur.trim() != '') {
                                    sousBloc.sousBlocsLines.push(sousBlocLigne);
                                }
                            }
                        }
                    }
                    if (sousBloc.sousBlocsLines && sousBloc.sousBlocsLines != null && sousBloc.sousBlocsLines.length > 0) {
                        bloc.sousBlocs.push(sousBloc);
                    }
                }
            }

            listBlocs.push(bloc);
        }
    }
    // }
    return listBlocs;
}