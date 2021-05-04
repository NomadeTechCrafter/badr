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
            let filtredBlocs = filterBlocs(action.value.consultationTI.datas);
            filtredBlocs = filtredBlocs.filter(function (item) {
                return item.condition === action.value.condition;
            });
            nextState.myBlocs = filtredBlocs;
            nextState.descriptionFr = filterDescriptionFr(action.value.consultationTI.datas)
            nextState.descriptionAr = filterDescriptionAr(action.value.consultationTI.datas)
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
    for (var i = 0; i < donnees.length; i++) {
        if (donnees[i].name === 'bloc') {
            var bloc = new Object();

            bloc.title = donnees[i].blocTitre;
            bloc.condition = donnees[i].condition;
            bloc.sousBlocs = [];

            for (var j = 0; j < donnees[i].datas.length; j++) {
                var sousBloc = new Object();

                sousBloc.title = donnees[i].datas[j].titre;
                sousBloc.sousBlocsLines = [];

                for (var k = 0; k < donnees[i].datas[j].datas.length; k++) {
                    if (donnees[i].datas[j].datas[k].name === 'sousbloc-contenu') {
                        for (var l = 0; l < donnees[i].datas[j].datas[k].datas.length; l++) {
                            var sousBlocLigne = new Object();

                            sousBlocLigne.libelle = donnees[i].datas[j].datas[k].datas[l].libelle;

                            for (var m = 0; m < donnees[i].datas[j].datas[k].datas[l].datas.length; m++) {
                                if (donnees[i].datas[j].datas[k].datas[l].datas[m].name === 'sousblocligne-valeur') {
                                    if (donnees[i].datas[j].datas[k].datas[l].datas[m].datas && donnees[i].datas[j].datas[k].datas[l].datas[m].datas.length > 0) {

                                        if (donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].name === 'propriete') {
                                            sousBlocLigne.valeur = donnees[i].datas[j].datas[k].datas[l].datas[m].datas[0].valeur;
                                        }
                                        else {
                                            for (var n = 0; n < donnees[i].datas[j].datas[k].datas[l].datas[m].datas.length; n++) {
                                                for (var o = 0; o < donnees[i].datas[j].datas[k].datas[l].datas[m].datas[n].datas.length; o++) {
                                                    if (donnees[i].datas[j].datas[k].datas[l].datas[m].datas[n].datas[o].name === 'elem-prop') {
                                                        if (donnees[i].datas[j].datas[k].datas[l].datas[m].datas[n].datas[o].datas && donnees[i].datas[j].datas[k].datas[l].datas[m].datas[n].datas[o].datas.length > 0) {
                                                            if (donnees[i].datas[j].datas[k].datas[l].datas[m].datas[n].datas[o].datas[0].valeur.trim() !== '') {
                                                                sousBlocLigne.valeur = donnees[i].datas[j].datas[k].datas[l].datas[m].datas[n].datas[o].datas[0].valeur;
                                                            }
                                                        }

                                                    }
                                                }
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

            listBlocs.push(bloc);
        }
    }
    return listBlocs;
}

function filterDescriptionFr(donnees) {
    let descriptionFr = {
        title: '',
        listData: []
    };
    var objRespDescriptionFr = null;
    for (var i = 0; i < donnees.length; i++) {
        if (donnees[i].name === 'description-fr') {
            objRespDescriptionFr = donnees[i];
            break;
        }
    }
    if (objRespDescriptionFr != null) {
        descriptionFr.title = objRespDescriptionFr.descTitre;
        for (var i = 0; i < objRespDescriptionFr.datas.length; i++) {
            if (objRespDescriptionFr.datas[i].name === 'desc-ligne') {
                var ligneDescFr = new Object();
                for (var j = 0; j < objRespDescriptionFr.datas[i].datas.length; j++) {
                    if (objRespDescriptionFr.datas[i].datas[j].name === 'codification') {
                        var codification = new Object();
                        codification.code4 = objRespDescriptionFr.datas[i].datas[j].proprieteValeurCode4.valeur;
                        codification.code6 = objRespDescriptionFr.datas[i].datas[j].proprieteValeurCode6.valeur;
                        codification.code8 = objRespDescriptionFr.datas[i].datas[j].proprieteValeurCode8.valeur;
                        codification.code10 = objRespDescriptionFr.datas[i].datas[j].proprieteValeurCode10.valeur;
                        codification.ingGrp = objRespDescriptionFr.datas[i].datas[j].proprieteValeurIndgrp.valeur;

                        for (var k = 0; k < objRespDescriptionFr.datas[i].datas[j].datas.length; k++) {
                            if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'code10') {
                                for (var l = 0; l < objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length; l++) {
                                    if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas[l].name === 'desc-renvoi') {
                                        if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas[l].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas[l].datas.length > 0) {
                                            ligneDescFr.codificationRenvoi = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[l].datas[0].valeur;
                                        }
                                    }
                                }

                            }
                        }

                        ligneDescFr.codification = codification;
                    }
                    else if (objRespDescriptionFr.datas[i].datas[j].name === 'designation') {
                        for (var k = 0; k < objRespDescriptionFr.datas[i].datas[j].datas.length; k++) {
                            if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-valeur') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.designation = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                            else if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-renvoi') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.designationRenvoi = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                        }
                    }
                    else if (objRespDescriptionFr.datas[i].datas[j].name === 'di') {
                        for (var k = 0; k < objRespDescriptionFr.datas[i].datas[j].datas.length; k++) {
                            if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-valeur') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.di = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                            else if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-renvoi') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.diRenvoi = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                        }
                    }
                    else if (objRespDescriptionFr.datas[i].datas[j].name === 'uqn') {
                        for (var k = 0; k < objRespDescriptionFr.datas[i].datas[j].datas.length; k++) {
                            if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-valeur') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.uqn = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                            else if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-renvoi') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.uqnRenvoi = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                        }
                    }
                    else if (objRespDescriptionFr.datas[i].datas[j].name === 'uc') {
                        for (var k = 0; k < objRespDescriptionFr.datas[i].datas[j].datas.length; k++) {
                            if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-valeur') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.uc = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                            else if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-renvoi') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.ucRenvoi = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                        }
                    }
                }
                descriptionFr.listData.push(ligneDescFr);
            }
        }
    }
    return descriptionFr;
}

function filterDescriptionAr(donnees) {
    let descriptionAr = {
        title: '',
        listData: []
    };
    var objRespDescriptionFr = null;
    for (var i = 0; i < donnees.length; i++) {
        if (donnees[i].name === 'description-ar') {
            objRespDescriptionFr = donnees[i];
            break;
        }
    }
    if (objRespDescriptionFr != null) {
        descriptionAr.title = objRespDescriptionFr.descTitre;
        for (var i = 0; i < objRespDescriptionFr.datas.length; i++) {
            if (objRespDescriptionFr.datas[i].name === 'desc-ligne') {
                var ligneDescFr = new Object();
                for (var j = 0; j < objRespDescriptionFr.datas[i].datas.length; j++) {
                    if (objRespDescriptionFr.datas[i].datas[j].name === 'codification') {
                        var codification = new Object();
                        codification.code4 = objRespDescriptionFr.datas[i].datas[j].proprieteValeurCode4.valeur;
                        codification.code6 = objRespDescriptionFr.datas[i].datas[j].proprieteValeurCode6.valeur;
                        codification.code8 = objRespDescriptionFr.datas[i].datas[j].proprieteValeurCode8.valeur;
                        codification.code10 = objRespDescriptionFr.datas[i].datas[j].proprieteValeurCode10.valeur;
                        codification.ingGrp = objRespDescriptionFr.datas[i].datas[j].proprieteValeurIndgrp.valeur;

                        for (var k = 0; k < objRespDescriptionFr.datas[i].datas[j].datas.length; k++) {
                            if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'code10') {
                                for (var l = 0; l < objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length; l++) {
                                    if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas[l].name === 'desc-renvoi') {
                                        if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas[l].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas[l].datas.length > 0) {
                                            ligneDescFr.codificationRenvoi = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[l].datas[0].valeur;
                                        }
                                    }
                                }

                            }
                        }

                        ligneDescFr.codification = codification;
                    }
                    else if (objRespDescriptionFr.datas[i].datas[j].name === 'designation') {
                        for (var k = 0; k < objRespDescriptionFr.datas[i].datas[j].datas.length; k++) {
                            if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-valeur') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.designation = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                            else if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-renvoi') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.designationRenvoi = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                        }
                    }
                    else if (objRespDescriptionFr.datas[i].datas[j].name === 'di') {
                        for (var k = 0; k < objRespDescriptionFr.datas[i].datas[j].datas.length; k++) {
                            if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-valeur') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.di = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                            else if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-renvoi') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.diRenvoi = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                        }
                    }
                    else if (objRespDescriptionFr.datas[i].datas[j].name === 'uqn') {
                        for (var k = 0; k < objRespDescriptionFr.datas[i].datas[j].datas.length; k++) {
                            if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-valeur') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.uqn = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                            else if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-renvoi') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.uqnRenvoi = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                        }
                    }
                    else if (objRespDescriptionFr.datas[i].datas[j].name === 'uc') {
                        for (var k = 0; k < objRespDescriptionFr.datas[i].datas[j].datas.length; k++) {
                            if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-valeur') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.uc = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                            else if (objRespDescriptionFr.datas[i].datas[j].datas[k].name === 'desc-renvoi') {
                                if (objRespDescriptionFr.datas[i].datas[j].datas[k].datas && objRespDescriptionFr.datas[i].datas[j].datas[k].datas.length > 0) {
                                    ligneDescFr.ucRenvoi = objRespDescriptionFr.datas[i].datas[j].datas[k].datas[0].valeur;
                                }
                            }
                        }
                    }
                }
                descriptionAr.listData.push(ligneDescFr);
            }
        }
    }
    return descriptionAr;
}