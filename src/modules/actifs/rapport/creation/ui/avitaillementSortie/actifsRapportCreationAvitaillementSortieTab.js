import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput, RadioButton } from 'react-native-paper';
import moment from 'moment';
import _ from 'lodash';
import {
    ComBasicDataTableComp,
    ComBadrButtonComp,
    ComBadrCardBoxComp,
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrLibelleComp,
    ComBadrProgressBarComp,
    ComContainerComp,
    ComBadrPickerCheckerComp,
    ComBadrAutoCompleteChipsComp,
    ComBadrPickerComp,
    ComBadrItemsPickerComp,
    ComBadrDatePickerComp,
} from '../../../../../../commons/component';
import { DELETE_AVITAILLEMENTSORTIE_TASK, EDIT_AVITAILLEMENTSORTIE_TASK, FORMAT_DDMMYYYY, FORMAT_DDMMYYYY_HHMM, RESET_AVITAILLEMENTSORTIE_TASK } from '../../../utils/actifsConstants';
import { getNavigationAvitaillementSortieModelInitial } from '../../../utils/actifsUtils';
import { ACTIFS_CONFIRMER_AVITAILLEMENTSORTIE_REQUEST, ACTIFS_DELETE_AVITAILLEMENTSORTIE_REQUEST, ACTIFS_EDITER_AVITAILLEMENTSORTIE_REQUEST, ACTIFS_RESET_AVITAILLEMENTSORTIE_REQUEST, naturesProduits, RECHERCHE_PERSONNE_MORALE_INIT, RECHERCHE_PERSONNE_MORALE_REQUEST } from '../../state/actifsRapportCreationConstants';
import actifsRapportConfirmerAvitaillementSortieAction from '../../state/actions/actifsRapportConfirmerAvitaillementSortieAction';
import actifsRapportEditerAvitaillementSortieAction from '../../state/actions/actifsRapportEditerAvitaillementSortieAction';
import actifsRapportResetAvitaillementSortieAction from '../../state/actions/actifsRapportResetAvitaillementSortieAction';
import actifsRapportSupprimerAvitaillementSortieAction from '../../state/actions/actifsRapportSupprimerAvitaillementSortieAction';
import RechercherPersonneMoraleAction from '../../state/actions/actifsRapportRechercherPersonneMoraleAction';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { formatCustomized } from '../../../utils/actifsUtils';
import styles from '../../style/actifsCreationStyle';
import ComUtils from '../../../../../../commons/utils/ComUtils';
import { ACTIFS_GENERIC_REQUEST } from '../../state/GenericConstants';
import * as GenericAction from '../../state/actions/GenericAction'


const screenHeight = Dimensions.get('window').height;



class ActifsRapportCreationAvitaillementSortieTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationsAvitaillementSorties: this.props.navigationsAvitaillementSorties ? this.props.navigationsAvitaillementSorties : [],
            // navigationAvitaillementSortieModel: this.props.navigationAvitaillementSortieModel,
            index: this.props.index,
            acProvenance: this.props.navigationAvitaillementSortieModel ? this.props.navigationAvitaillementSortieModel.provenance.nomPays : '',
            showDateDepart: false,
            showHeureDepart: false,
            typeDUM: '01',
            acDestination: this.props.navigationAvitaillementSortieModel ? this.props.navigationAvitaillementSortieModel.destination.nomPays : '',
            typeAvitaillement: '01',
            bureau: '',
            regime: '',
            annee: '',
            serie: '',
            cle: '',
            errorMessage: null,
            navigationAvitaillementSortieModel: getNavigationAvitaillementSortieModelInitial(),
        };
        this.cols = [
            {
                code: 'numBonLivraison',
                libelle: translate('actifsCreation.avitaillementSortie.bonLivraison'),
                width: 150,
            },
            {
                code: 'natureProduitCombo.libelle',
                libelle: translate('actifsCreation.avitaillementSortie.natureProduit'),
                width: 150,
            },
            {
                code: 'numCarte',
                libelle: translate('actifsCreation.avitaillementSortie.main.numCarte'),
                width: 150,
            },
            {
                code: 'compteurAvant',
                libelle: translate('actifsCreation.avitaillementSortie.main.compteurAvant'),
                width: 150,
            },
            {
                code: 'compteurApres',
                libelle: translate('actifsCreation.avitaillementSortie.main.compteurApres'),
                width: 150,
            },
            {
                code: 'quantiteLivree',
                libelle: translate('actifsCreation.avitaillementSortie.main.quantiteLivree'),
                width: 150,
            },

            // {
            //     code: '',
            //     libelle: '',
            //     width: 50,
            //     component: 'button',
            //     icon: 'pencil',
            //     action: (row, index) =>
            //         this.updateItem(row, index)
            // },
            // {
            //     code: '',
            //     libelle: '',
            //     width: 50,
            //     component: 'button',
            //     icon: 'delete-outline',
            //     action: (row, index) =>
            //         this.removeItem(row, index)
            // }
        ];

        this.colsRO = [
            {
                code: 'numBonLivraison',
                libelle: translate('actifsCreation.avitaillementSortie.bonLivraison'),
                width: 150,
            },
            {
                code: 'natureProduitCombo.libelle',
                libelle: translate('actifsCreation.avitaillementSortie.natureProduit'),
                width: 150,
            },
            {
                code: 'numCarte',
                libelle: translate('actifsCreation.avitaillementSortie.main.numCarte'),
                width: 150,
            },
            {
                code: 'compteurAvant',
                libelle: translate('actifsCreation.avitaillementSortie.main.compteurAvant'),
                width: 150,
            },
            {
                code: 'compteurApres',
                libelle: translate('actifsCreation.avitaillementSortie.main.compteurApres'),
                width: 150,
            },
            {
                code: 'quantiteLivree',
                libelle: translate('actifsCreation.avitaillementSortie.main.quantiteLivree'),
                width: 150,
            },
        ];
    }

    onItemSelected = (row) => { };

    updateItem = (row, index) => {
        let data = {
            index: index,
            navigationMaritimeModel: row
        }
        this.props.callbackHandler(EDIT_AVITAILLEMENTSORTIE_TASK, data);

    }
    removeItem = (row, index) => {
        this.props.callbackHandler(DELETE_AVITAILLEMENTSORTIE_TASK, index);


    }

    addZeros = (input) => {
        let keyImput = _.keys(input)[0];
        if (input[keyImput] !== '') {
            this.setState({
                [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
            });
        }
    };

    reset = () => {
    };

    nouveau = () => {
        this.retablir();
    };

    retablir = () => {
        console.log('retablir');
        this.setState({ navigationAvitaillementSortieModel: getNavigationAvitaillementSortieModelInitial() });

        let action = RechercherPersonneMoraleAction.init({
            type: RECHERCHE_PERSONNE_MORALE_INIT,
            value: {}
        });
        this.props.dispatch(action);
    }

    componentDidMount() {
    }

    // ajouterNavigationAvitaillementSortieModel = (model) => {
    //     let navigationsAvitaillementSorties = [...this.props.navigationsAvitaillementSorties];
    //     let dataToAction = {
    //         type: ACTIFS_CONFIRMER_AVITAILLEMENTSORTIE_REQUEST,
    //         value: {
    //             navigationsAvitaillementSorties: navigationsAvitaillementSorties,
    //             index: this.props.index,
    //             navigationAvitaillementSortieModel: model
    //         }
    //     };

    //     this.props.dispatch(actifsRapportConfirmerAvitaillementSortieAction.request(dataToAction));
    // }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    reset = () => {
    };

    // confirmer = () => {
    //     if (!this.checkRequiredFields()) {
    //         if (!this.checkDatesSortieDepartInformations()) {
    //             if (!this.checkDatesDebutFinControleInformations()) {
    //                 this.props.push(this.state.navigationAvitaillementSortieModel);
    //             }
    //         }
    //     }
    // }

    confirmer = () => {
        if (!this.checkRequiredFields()) {
            // if (!this.checkDatesSortieDepartInformations()) {
            // if (!this.checkDatesDebutFinControleInformations()) {
            let navigationsAvitaillementSorties = this.state.navigationsAvitaillementSorties;
            navigationsAvitaillementSorties.push(this.state.navigationAvitaillementSortieModel);
            this.setState({
                myArray: [...this.state.navigationsAvitaillementSorties, navigationsAvitaillementSorties]
            });
            this.props.update({
                updateAvitaillementSorties: this.state?.navigationsAvitaillementSorties,
            });
            this.retablir();
            // }
            // }
        }
    }


    checkRequiredFields = () => {

        let params = { msg: '', required: false }
        this.checkRequiredFieldsNavigAvitaillementSortie(params);
        // this.checkRequiredFieldsCaracteristiquesBateau(params);
        // this.checkRequiredFieldsResultatCtrl(params);

        if (params.required) {
            let message = translate('actifsCreation.avitaillementSortie.champsObligatoires') + params.msg;
            this.setState({
                errorMessage: message
            });
        } else {
            this.setState({
                errorMessage: null
            });

        }
        return params.required;


    }

    // checkDatesSortieDepartInformations = () => {
    //     let modele = this.state.navigationAvitaillementSortieModel;
    //     let dateLivraison = formatCustomized(modele.dateLivraison, FORMAT_DDMMYYYY);

    //     moment.suppressDeprecationWarnings = true;
    //     let dateHeureSortie = moment(dateLivraison + ' ' + modele.heureLivraison, FORMAT_DDMMYYYY_HHMM);
    //     let dateDepart = formatCustomized(modele.dateDepart, FORMAT_DDMMYYYY);

    //     let dateHeureDepart = moment(dateDepart + ' ' + modele.heureDepart, FORMAT_DDMMYYYY_HHMM);

    //     if (dateHeureDepart < dateHeureSortie) {
    //         let message = translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.msgErrorOrdredateLivraisonDepart');
    //         this.setState({
    //             errorMessage: message
    //         });
    //         return true;
    //     } else {
    //         this.setState({
    //             errorMessage: null
    //         });
    //         return false
    //     }



    // }

    // checkDatesDebutFinControleInformations = () => {
    //     let modele = this.state.navigationAvitaillementSortieModel;
    //     let dateDebutControle = formatCustomized(modele.dateDebutControle, FORMAT_DDMMYYYY);

    //     moment.suppressDeprecationWarnings = true;
    //     let dateHeureDebutControle = moment(dateDebutControle + ' ' + modele.heureDebutControle, FORMAT_DDMMYYYY_HHMM);
    //     let dateFinControle = formatCustomized(modele.dateFinControle, FORMAT_DDMMYYYY);

    //     let dateHeureFinControle = moment(dateFinControle + ' ' + modele.heureFinControle, FORMAT_DDMMYYYY_HHMM);

    //     if (dateHeureFinControle < dateHeureDebutControle) {
    //         let message = translate('actifsCreation.avitaillementSortie.resultatCtrl.msgErrorOrdreDateDebutFinControle');
    //         this.setState({
    //             errorMessage: message
    //         });
    //         return true;
    //     } else {
    //         this.setState({
    //             errorMessage: null
    //         });
    //         return false
    //     }



    // }

    checkRequiredFieldsNavigAvitaillementSortie = (params) => {
        let modele = this.state.navigationAvitaillementSortieModel;

        console.log(JSON.stringify(modele));

        if (_.isEmpty(modele.heureLivraison)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.main.heureLivraison');
        }

        if (_.isEmpty(modele.numBonLivraison)) {
            params.required = true;
            params.msg += translate('actifsCreation.avitaillementSortie.main.bonLivraison');
        }
        const quantiteLivree = modele.quantiteLivree + ''
        if (_.isEmpty(quantiteLivree)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.main.quantiteLivree');
        }
        if (_.isEmpty(modele.compteurAvant)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.main.compteurAvant');
        }
        if (_.isEmpty(modele.compteurApres)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.main.compteurApres');
        }
        if (_.isEmpty(modele.dateLivraison?.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.main.dateLivraison');
        }
        if (_.isEmpty(modele.numCarte)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.main.numCarte');
        }
        if (_.isEmpty(modele.referenceDum)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.main.refDum');
        }
        // if (_.isEmpty(modele.pavillon)) {
        //     params.required = true;
        //     params.msg += !_.isEmpty(params.msg) ? ", " : "";
        //     params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.pavillon');
        // }
        // if (_.isEmpty(modele.dateDepart.toString())) {
        //     params.required = true;
        //     params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.dateDepart');
        // }
        // if (_.isEmpty(modele.destination?.codePays)) {
        //     params.required = true;
        //     params.msg += !_.isEmpty(params.msg) ? ", " : "";
        //     params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.destination');
        // }
        // if (_.isEmpty(modele.villeDestination)) {
        //     params.required = true;
        //     params.msg += !_.isEmpty(params.msg) ? ", " : "";
        //     params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.villeDestination');
        // }



        // console.log(JSON.stringify(params));
    }
    checkRequiredFieldsCaracteristiquesBateau = (params) => {
        let modele = this.state.navigationAvitaillementSortieModel;
        if (_.isEmpty(modele.typeBateau)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.typeBateau');
        }
        if (_.isEmpty(modele.nomBateau)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.nomBateau');
        }
        if (_.isEmpty(modele.immatriculation)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.immatriculation');
        }
        if (_.isEmpty(modele.couleur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.couleur');
        }
        if (_.isEmpty(modele.longueur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.longueur');
        }
        if (_.isEmpty(modele.profondeur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.profondeur');
        }
        if (_.isEmpty(modele.tonnage)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.tonnage');
        }
        if (_.isEmpty(modele.numDeclaration)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.numDeclaration');
        }
        if (_.isEmpty(modele.delivreePar?.nom)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.delivreePar');
        }
        if (_.isEmpty(modele.dateDeclaration.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.dateDeclaration');
        }



    }
    checkRequiredFieldsResultatCtrl = (params) => {
        let modele = this.state.navigationAvitaillementSortieModel;
        if (_.isEmpty(modele.dateDebutControle.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.resultatCtrl.dateDebutControle');
        }
        if (_.isEmpty(modele.dateFinControle.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.resultatCtrl.dateFinControle');
        }
        if (_.isEmpty(modele.documentsVerifies)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.resultatCtrl.documentsVerifies');
        }
        if (_.isEmpty(modele.observations)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.resultatCtrl.observations');
        }
        if (_.isEmpty(modele.resultatControle)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.resultatCtrl.resultatControle');
        }
    }

    updateTypeDUM = (value) => {
        console.log('updateTypeDUM : ' + value);
        this.props.navigationsAvitaillementSorties.typeDUM = value;
        this.props.index++;
        // this.props.update(this.props.navigationMaritimeModel);
    }

    callbackHandler = (type, data) => {
        switch (type) {
            case EDIT_AVITAILLEMENTSORTIE_TASK:

                let dataToAction = {
                    type: ACTIFS_EDITER_AVITAILLEMENTSORTIE_REQUEST,
                    value: {
                        index: data.index,
                        navigationAvitaillementSortieModel: data.navigationAvitaillementSortieModel
                    }
                };

                console.log(this);

                this.props.dispatch(actifsRapportEditerAvitaillementSortieAction.request(dataToAction));
                break;
            case DELETE_AVITAILLEMENTSORTIE_TASK:
                dataToAction = {
                    type: ACTIFS_DELETE_AVITAILLEMENTSORTIE_REQUEST,
                    value: {
                        index: data,

                    }
                };

                this.props.dispatch(actifsRapportSupprimerAvitaillementSortieAction.request(dataToAction));
                break;

            case RESET_AVITAILLEMENTSORTIE_TASK:
                dataToAction = {
                    type: ACTIFS_RESET_AVITAILLEMENTSORTIE_REQUEST,
                    value: {
                    }
                };
                this.props.dispatch(actifsRapportResetAvitaillementSortieAction.request(dataToAction));
                break;
        }
    }

    update() {
    }

    calculerQuantiteLivree = () => {
        console.log('calculerQuantiteLivree');
        if (!_.isEmpty(this.state.navigationAvitaillementSortieModel?.compteurAvant)
            && !_.isEmpty(this.state.navigationAvitaillementSortieModel?.compteurApres)) {
            const compteurApres = _.parseInt(this.state.navigationAvitaillementSortieModel?.compteurApres);
            const compteurAvant = _.parseInt(this.state.navigationAvitaillementSortieModel?.compteurAvant);
            if (compteurApres > compteurAvant) {
                const calculatedQuantiteLivree = compteurApres - compteurAvant;
                this.setState(prevState => {
                    let navigationAvitaillementSortieModel = Object.assign({}, prevState.navigationAvitaillementSortieModel);
                    navigationAvitaillementSortieModel.quantiteLivree = calculatedQuantiteLivree;
                    return { navigationAvitaillementSortieModel };
                })
            } else {
                this.setState(prevState => {
                    let navigationAvitaillementSortieModel = Object.assign({}, prevState.navigationAvitaillementSortieModel);
                    navigationAvitaillementSortieModel.quantiteLivree = '';
                    return { navigationAvitaillementSortieModel };
                })
            }
        } else {
            this.setState(prevState => {
                let navigationAvitaillementSortieModel = Object.assign({}, prevState.navigationAvitaillementSortieModel);
                navigationAvitaillementSortieModel.quantiteLivree = '';
                return { navigationAvitaillementSortieModel };
            })
        }
        this.update();
    };

    isDumExist = () => {
        if (_.isEmpty(this.state.bureau)
            || _.isEmpty(this.state.regime)
            || _.isEmpty(this.state.annee)
            || _.isEmpty(this.state.serie)
            || _.isEmpty(this.state.cle)) {
            this.setState({
                errorMessage: translate('errors.referenceNotValid')
            });
        } else {
            const cleValide = ComUtils.cleDUMRegimeSerie(this.state.regime, this.state.serie);

            if (this.state.cle === cleValide) {
                this.setState({
                    errorMessage: null
                });
                console.log(JSON.stringify(this.state));

                let action = GenericAction.request({
                    type: ACTIFS_GENERIC_REQUEST,
                    value: {
                        module: "GIB",
                        command: "validerReferenceDumAvitaillementSorties",
                        typeService: "SP",
                        jsonVO: {
                            bureau: this.state.bureau,
                            regime: this.state.regime,
                            annee: this.state.annee,
                            serie: this.state.serie,
                            cle: this.state.cle
                        },
                    },
                });
                this.props.dispatch(action);
                this.setState(prevState => {
                    let navigationAvitaillementSortieModel = Object.assign({}, prevState.navigationAvitaillementSortieModel);
                    navigationAvitaillementSortieModel.referenceDum = this.state.bureau + this.state.regime + this.state.annee + this.state.serie;
                    navigationAvitaillementSortieModel.dateEnregistrementDum = this.props?.validerReferenceDumAvitaillementSortiesDate;
                    return { navigationAvitaillementSortieModel };
                })
            } else {
                this.setState({
                    errorMessage: translate('errors.referenceNotValid') + ' (' + cleValide + ')'
                });
            }
        }
    };

    chercherPersonneConcernee = () => {
        if (!_.isEmpty(this.state.navigationAvitaillementSortieModel?.numRCFourn)
            && !_.isEmpty(this.state.navigationAvitaillementSortieModel?.centreRCFourn)) {
            const numeroDocumentIdentite = this.state.navigationAvitaillementSortieModel?.numRCFourn;
            const nationalite = this.state.navigationAvitaillementSortieModel?.centreRCFourn;

            let action = RechercherPersonneMoraleAction.request({
                type: RECHERCHE_PERSONNE_MORALE_REQUEST,
                value: {
                    module: "REF_LIB",
                    command: "findIntervenantMorale",
                    typeService: "SP",
                    jsonVO: {
                        "numeroDocumentIdentite": numeroDocumentIdentite,
                        "nationalite": nationalite
                    },
                },
            });
            this.props.dispatch(action);
        }
        this.update();
    };

    render() {
        // console.log(JSON.stringify(this.props?.validerReferenceDumAvitaillementSorties));
        // console.log(':::::::::::::::::::::::::::::::1:::::::::::::::::::::::::::::::::::::::::');
        // console.log(':::::::::::::::::::::::::::::::1:::::::::::::::::::::::::::::::::::::::::');
        // console.log(JSON.stringify(this.props?.validerReferenceDumAvitaillementSorties));
        // console.log(':::::::::::::::::::::::::::::::1:::::::::::::::::::::::::::::::::::::::::');
        // console.log('::::::::::::::::::::::::::::::1::::::::::::::::::::::::::::::::::::::::::');

        return (
            <ScrollView>
                {this.props.successMessage != null && (
                    <ComBadrInfoMessageComp message={this.props.successMessage} />
                )}
                <ComContainerComp>
                    {this.props.showProgress && (
                        <ComBadrProgressBarComp width={screenHeight} />
                    )}
                    {this.props.errorMessage != null && (
                        <ComBadrErrorMessageComp message={this.props.errorMessage} />
                    )}
                    {this.state.errorMessage != null && (
                        <ComBadrErrorMessageComp message={this.state.errorMessage} />
                    )}
                    {this.props.validerReferenceDumAvitaillementSorties?.dtoHeader?.messagesErreur != null && (
                        <ComBadrErrorMessageComp message={this.props.validerReferenceDumAvitaillementSorties.dtoHeader.messagesErreur} />
                    )}
                    {this.props.successMessage != null && (
                        <ComBadrInfoMessageComp message={this.props.successMessage} />
                    )}
                    {/* Référence déclaration */}
                    <ComBadrCardBoxComp noPadding={true}>
                        <Grid>
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={1} style={{ padding: 5 }}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.typeDum')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={6}>
                                    <RadioButton.Group onValueChange={newValue => this.setState({ typeDUM: newValue })} value={this.state.typeDUM}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text>{translate('actifsCreation.avitaillementSortie.dumProvNormale')}</Text>
                                                <RadioButton value="01" color={primaryColor} />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text>{translate('actifsCreation.avitaillementSortie.dumSimplifie')}</Text>
                                                <RadioButton value="02" color={primaryColor} />
                                            </View>
                                        </View>
                                    </RadioButton.Group>
                                </Col>
                            </Row>
                            {(this.state.typeDUM == '01') &&
                                (<Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={1} style={{ padding: 5 }}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementSortie.DUM.label')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.consultation}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.bureau')}
                                            value={this.state.bureau}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    bureau: text
                                                });
                                            }}
                                            onEndEditing={(event) =>
                                                this.addZeros({
                                                    bureau: event.nativeEvent.text,
                                                    maxLength: 3,
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.consultation}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.regime')}
                                            value={this.state.regime}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    regime: text
                                                });
                                            }}
                                            onEndEditing={(event) =>
                                                this.addZeros({
                                                    regime: event.nativeEvent.text,
                                                    maxLength: 3,
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.consultation}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.annee')}
                                            value={this.state.annee}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    annee: text
                                                });
                                            }}
                                            onEndEditing={(event) =>
                                                this.addZeros({
                                                    annee: event.nativeEvent.text,
                                                    maxLength: 4,
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col size={2}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.consultation}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.serie')}
                                            value={this.state.serie}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    serie: text
                                                });
                                            }}
                                            onEndEditing={(event) =>
                                                this.addZeros({
                                                    serie: event.nativeEvent.text,
                                                    maxLength: 7,
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            maxLength={1}
                                            disabled={this.props.consultation}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.cle')}
                                            value={this.state.cle}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    cle: text
                                                });
                                            }}
                                        />
                                    </Col>
                                    {(!this.props.consultation) && (
                                        <Col size={1}>
                                            <ComBadrButtonComp
                                                style={styles.okBtn}
                                                onPress={() => {
                                                    this.isDumExist();
                                                }}
                                                text={translate('transverse.Ok')}
                                            />
                                        </Col>
                                    )}
                                </Row>
                                )}
                            {(this.state.typeDUM == '02') && (
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementSortie.main.numeroRCFournisseur')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.consultation}
                                            keyboardType={'number-pad'}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                            value={this.state.navigationAvitaillementSortieModel?.numRCFourn}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementSortieModel: {
                                                        ...this.state.navigationAvitaillementSortieModel, numRCFourn: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                            onEndEditing={(event) => {
                                                this.chercherPersonneConcernee();
                                            }}
                                        />
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementSortie.main.centreRCFournisseur')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.consultation}
                                            keyboardType={'number-pad'}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAvitaillementSortieModel?.centreRCFourn}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementSortieModel: {
                                                        ...this.state.navigationAvitaillementSortieModel, centreRCFourn: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                            onEndEditing={(event) => {
                                                this.chercherPersonneConcernee();
                                            }}
                                        />
                                    </Col>
                                </Row>
                            )}
                            {(this.state.typeDUM == '02') && (
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementSortie.main.raisonSocialeFournisseur')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={9}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.props?.raisonSocialeFourn}
                                            onContentSizeChange={() => {
                                                this.setState({
                                                    navigationAvitaillementSortieModel: {
                                                        ...this.state.navigationAvitaillementSortieModel, keyIntervenant: this.props?.keyIntervenant
                                                    }
                                                });
                                                console.log('---------------------------------');
                                                console.log('---------------------------------');
                                                console.log(this.props?.keyIntervenant);
                                                console.log('---------------------------------');
                                                console.log('---------------------------------');
                                                this.update();
                                            }}
                                            multiline={true}
                                            numberOfLines={10}
                                        />
                                    </Col>
                                </Row>
                            )}
                        </Grid>
                    </ComBadrCardBoxComp>
                </ComContainerComp>

                <View style={{ marginLeft: 40 }}>
                    <ComBasicDataTableComp
                        ref="_badrTable"
                        id="avitaillementSortiesTable"
                        rows={(this.props.readOnly) ? this.props.navigationsAvitaillementSorties : this.state.navigationsAvitaillementSorties}
                        cols={(this.props.readOnly) ? this.colsRO : this.cols}
                        onItemSelected={this.onItemSelected}
                        totalElements={(this.props.readOnly) ? this.props.navigationsAvitaillementSorties?.length : this.state.navigationsAvitaillementSorties?.length}
                        maxResultsPerPage={10}
                        paginate={true}
                        showProgress={this.props.showProgress}
                        hasId={false}
                    />
                    {(!this.props.readOnly) && (<View style={styles.ComContainerCompBtn}>
                        <ComBadrButtonComp
                            style={styles.actionBtn}
                            onPress={() => {
                                this.nouveau();
                            }}
                            text={translate('transverse.nouveau')}
                        />
                    </View>)}
                </View>
                <ComBadrCardBoxComp noPadding={true}>
                    <Grid>
                        { /*first Row*/}
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={4}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('actifsCreation.avitaillementSortie.main.refDum')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={6}>
                                <ComBadrLibelleComp>
                                    {this.state.navigationAvitaillementSortieModel?.referenceDum}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={2} />
                            <Col size={4}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('actifsCreation.avitaillementSortie.main.dateEnregistrementDum')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={4}>
                                <ComBadrLibelleComp>

                                    {this.props?.validerReferenceDumAvitaillementSortiesDate}
                                </ComBadrLibelleComp>
                            </Col>
                        </Row>
                        {/*first Row*/}
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={3}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('actifsCreation.avitaillementSortie.main.bonLivraison')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={8}>
                                <TextInput
                                    mode={'outlined'}
                                    disabled={this.props.readOnly}
                                    style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                    value={this.state.navigationAvitaillementSortieModel?.numBonLivraison}
                                    onChangeText={(text) => {
                                        this.setState({
                                            navigationAvitaillementSortieModel: {
                                                ...this.state.navigationAvitaillementSortieModel, numBonLivraison: text
                                            }
                                        });
                                        this.update();
                                    }}
                                />
                            </Col>
                        </Row>

                        {/*second Row*/}
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={1}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('actifsCreation.avitaillementSortie.main.dateLivraison')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={3}>
                                <ComBadrDatePickerComp
                                    readonly={this.props.consultation}
                                    dateFormat="DD/MM/YYYY"
                                    heureFormat="HH:mm"
                                    value={this.state.navigationAvitaillementSortieModel?.dateLivraison ? moment(this.state.navigationAvitaillementSortieModel?.dateLivraison, 'DD/MM/YYYY', true) : ''}
                                    timeValue={this.state.navigationAvitaillementSortieModel?.heureLivraison ? moment(this.state.navigationAvitaillementSortieModel?.heureLivraison, 'HH:mm', true) : ''}

                                    onDateChanged={(date) => {
                                        this.setState({
                                            navigationAvitaillementSortieModel: {
                                                ...this.state.navigationAvitaillementSortieModel, dateLivraison: date
                                            }
                                        });
                                        this.update();
                                    }}

                                    onTimeChanged={(time) => {
                                        this.setState({
                                            navigationAvitaillementSortieModel: {
                                                ...this.state.navigationAvitaillementSortieModel, heureLivraison: time
                                            }
                                        });
                                        this.update();
                                    }}
                                />
                            </Col>
                            {/* <Col size={1} style={{ paddingTop: 5 }}>
                                <Text style={{ fontSize: 12 }}>
                                    {translate('actifsCreation.entete.uniteHeure')}
                                </Text>
                            </Col> */}
                        </Row>

                        {/*third Row*/}
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={1} style={{ padding: 5 }}>
                            </Col>
                            <Col size={6}>
                                <RadioButton.Group onValueChange={newValue => this.setState({ typeAvitaillement: newValue })} value={this.state.typeAvitaillement}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>{translate('actifsCreation.avitaillementSortie.embarcations')}</Text>
                                            <RadioButton value="01" color={primaryColor} />
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>{translate('actifsCreation.avitaillementSortie.aeronefs')}</Text>
                                            <RadioButton value="02" color={primaryColor} />
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </Col>
                        </Row>

                        {/*fourth Row*/}
                        {(this.state.typeAvitaillement == '02') &&
                            (<Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.main.compagnieAerienne')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={8} style={{ paddingRight: 5 }}>
                                    <Row>
                                        <Col size={10}>
                                            <ComBadrPickerComp
                                                disabled={this.props?.consultation}
                                                key="code"
                                                style={CustomStyleSheet.badrPicker}
                                                selectedValue={this.state?.compagnieAerienne}
                                                selected={this.state?.compagnieAerienne}
                                                titleStyle={CustomStyleSheet.badrPickerTitle}
                                                cle="code"
                                                libelle="libelle"
                                                module="GIB"
                                                command="getListAvitaillementSorieCompAerienne"
                                                param={null}
                                                typeService="SP"
                                                storeWithKey="code"
                                                storeLibelleWithKey="libelle"
                                                onValueChange={(text) => {
                                                    this.setState({
                                                        compagnieAerienne: text
                                                    })
                                                    // this.update();
                                                    console.log(JSON.stringify(this.state));
                                                }
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>)}

                        {(this.state.typeAvitaillement == '01') &&
                            (<Row style={CustomStyleSheet.whiteRow}>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.main.bateau')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={8} style={{ paddingRight: 5 }}>
                                    <Row>
                                        <Col size={10}>
                                            <ComBadrPickerComp
                                                disabled={this.props?.consultation}
                                                key="code"
                                                style={CustomStyleSheet.badrPicker}
                                                selectedValue={this.state?.bateau}
                                                selected={this.state?.bateau}
                                                titleStyle={CustomStyleSheet.badrPickerTitle}
                                                cle="code"
                                                libelle="libelle"
                                                module="GIB"
                                                command="getListAvitaillementSorieBateau"
                                                param={null}
                                                typeService="SP"
                                                storeWithKey="code"
                                                storeLibelleWithKey="libelle"
                                                onValueChange={(text) => {
                                                    this.setState({
                                                        compagnieAerienne: text
                                                    })
                                                    // this.update();
                                                    console.log(JSON.stringify(this.state));
                                                }
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>)}

                        {/*fifth Row*/}
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={3}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('actifsCreation.avitaillementSortie.main.natureProduit')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={8} style={{ paddingRight: 5 }}>
                                <Row>
                                    <Col size={10}>
                                        <ComBadrItemsPickerComp
                                            label={translate('actifsCreation.avitaillementSortie.main.natureProduit')}
                                            disabled={this.props.readOnly}
                                            selectedValue={this.state.navigationAvitaillementSortieModel?.natureProduitCombo ? this.state.navigationAvitaillementSortieModel?.natureProduitCombo?.code : {}}
                                            items={naturesProduits}
                                            onValueChanged={(selectedValue) => {
                                                console.log(selectedValue);
                                                this.setState({
                                                    navigationAvitaillementSortieModel: {
                                                        ...this.state.navigationAvitaillementSortieModel, natureProduitCombo: selectedValue
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>


                        {/*sixth Row*/}
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={3}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('actifsCreation.avitaillementSortie.main.numCarte')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={8}>
                                <TextInput
                                    mode={'outlined'}
                                    disabled={this.props.readOnly}
                                    style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                    value={this.state.navigationAvitaillementSortieModel?.numCarte}
                                    onChangeText={(text) => {
                                        this.setState({
                                            navigationAvitaillementSortieModel: {
                                                ...this.state.navigationAvitaillementSortieModel, numCarte: text
                                            }
                                        });
                                        this.update();
                                    }}
                                />
                            </Col>
                        </Row>

                        {/*seventh Row*/}
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={3}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('actifsCreation.avitaillementSortie.main.compteurAvant')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={8}>
                                <TextInput
                                    mode={'outlined'}
                                    disabled={this.props.readOnly}
                                    style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                    keyboardType={'number-pad'}
                                    value={this.state.navigationAvitaillementSortieModel?.compteurAvant}
                                    onEndEditing={(event) => this.calculerQuantiteLivree()}
                                    onChangeText={(text) => {
                                        this.setState({
                                            navigationAvitaillementSortieModel: {
                                                ...this.state.navigationAvitaillementSortieModel, compteurAvant: text
                                            }
                                        });
                                        this.update();
                                    }}
                                />
                            </Col>
                        </Row>

                        {/*eight Row*/}
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={3}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('actifsCreation.avitaillementSortie.main.compteurApres')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={8}>
                                <TextInput
                                    mode={'outlined'}
                                    disabled={this.props.readOnly}
                                    style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                    keyboardType={'number-pad'}
                                    value={this.state.navigationAvitaillementSortieModel?.compteurApres}
                                    onEndEditing={(event) => this.calculerQuantiteLivree()}
                                    onChangeText={(text) => {
                                        this.setState({
                                            navigationAvitaillementSortieModel: {
                                                ...this.state.navigationAvitaillementSortieModel, compteurApres: text
                                            }
                                        });
                                        this.update();
                                    }}
                                />
                            </Col>
                        </Row>

                        {/*nine Row*/}
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={3}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('actifsCreation.avitaillementSortie.main.quantiteLivree')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={8}>
                                <TextInput
                                    mode={'outlined'}
                                    disabled={this.props.readOnly}
                                    style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                    value={(this.state.navigationAvitaillementSortieModel?.quantiteLivree) ? this.state.navigationAvitaillementSortieModel?.quantiteLivree + '' : ''}
                                    keyboardType={'number-pad'}
                                    onChangeText={(text) => {
                                        this.setState({
                                            navigationAvitaillementSortieModel: {
                                                ...this.state.navigationAvitaillementSortieModel, quantiteLivree: text
                                            }
                                        });
                                        this.update();
                                    }}
                                />
                            </Col>
                        </Row>

                    </Grid>
                </ComBadrCardBoxComp>

                {(!this.props.readOnly) && (<View>
                    <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            onPress={() => (this.confirmer())}
                            text={translate('transverse.confirmer')}
                        />
                        <View style={{ width: 10 }} />
                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            onPress={() => {
                                this.retablir()
                            }}
                            text={translate('transverse.retablir')}
                        />
                        <View style={{ width: 10 }} />
                    </Row>
                </View>)}
            </ScrollView>

        );
    }
}





const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationAvitaillementSortieTab);



