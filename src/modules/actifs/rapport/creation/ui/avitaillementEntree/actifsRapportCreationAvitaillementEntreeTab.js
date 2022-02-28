import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import {
    ComBasicDataTableComp,
    ComBadrPickerCheckerComp,
    ComBadrCardBoxComp,
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrLibelleComp,
    ComBadrProgressBarComp,
    ComContainerComp,
    ComBadrDatePickerComp,
    ComBadrItemsPickerComp,
    ComBadrButtonComp
} from '../../../../../../commons/component';
import { DELETE_AVITAILLEMENTENTREE_TASK, EDIT_AVITAILLEMENTENTREE_TASK, FORMAT_DDMMYYYY, RESET_AVITAILLEMENTENTREE_TASK } from '../../../utils/actifsConstants';
import { formatCustomized, getNavigationAvitaillementEntreeModelInitial } from '../../../utils/actifsUtils';
import { ACTIFS_CONFIRMER_AVITAILLEMENTENTREE_REQUEST, ACTIFS_DELETE_AVITAILLEMENTENTREE_REQUEST, ACTIFS_EDITER_AVITAILLEMENTENTREE_REQUEST, ACTIFS_RESET_AVITAILLEMENTENTREE_REQUEST, naturesProduits, RECHERCHE_PERSONNE_MORALE_INIT, RECHERCHE_PERSONNE_MORALE_REQUEST } from '../../state/actifsRapportCreationConstants';
import actifsRapportConfirmerAvitaillementEntreeAction from '../../state/actions/actifsRapportConfirmerAvitaillementEntreeAction';
import actifsRapportEditerAvitaillementEntreeAction from '../../state/actions/actifsRapportEditerAvitaillementEntreeAction';
import actifsRapportResetAvitaillementEntreeAction from '../../state/actions/actifsRapportResetAvitaillementEntreeAction';
import actifsRapportSupprimerAvitaillementEntreeAction from '../../state/actions/actifsRapportSupprimerAvitaillementEntreeAction';
import RechercherPersonneMoraleAction from '../../state/actions/actifsRapportRechercherPersonneMoraleAction';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import styles from '../../style/actifsCreationStyle';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { TextInput, IconButton } from 'react-native-paper';
import { unitesMesure } from '../../state/actifsRapportCreationConstants';
import { Dimensions } from 'react-native';


const screenHeight = Dimensions.get('window').height;

class ActifsRapportCreationAvitaillementEntreeTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationsAvitaillementEntrees: this.props.navigationsAvitaillementEntrees ? this.props.navigationsAvitaillementEntrees : [],
            navigationAvitaillementEntreeModel: getNavigationAvitaillementEntreeModelInitial(),
            errorMessage: null
        };
        this.cols = [
            {
                code: 'numBonLivraison',
                libelle: translate('actifsCreation.avitaillementEntree.bonLivraison'),
                width: 150,
            },
            {
                code: 'raisonSocialeFourn',
                libelle: translate('actifsCreation.avitaillementEntree.fournisseur'),
                width: 150,
            },
            {
                code: 'nature.libelle',
                libelle: translate('actifsCreation.avitaillementEntree.natureProduit'),
                width: 150,
            },
            {
                code: 'quantiteReceptionne',
                libelle: translate('actifsCreation.avitaillementEntree.quantiteReceptionne'),
                width: 150,
            },
            {
                code: 'volumeAppEnvoye',
                libelle: translate('actifsCreation.avitaillementEntree.volumeApparent'),
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
                libelle: translate('actifsCreation.avitaillementEntree.bonLivraison'),
                width: 150,
            },
            {
                code: 'raisonSocialeFourn',
                libelle: translate('actifsCreation.avitaillementEntree.fournisseur'),
                width: 150,
            },
            {
                code: 'nature.libelle',
                libelle: translate('actifsCreation.avitaillementEntree.natureProduit'),
                width: 150,
            },
            {
                code: 'quantiteReceptionne',
                libelle: translate('actifsCreation.avitaillementEntree.quantiteReceptionne'),
                width: 150,
            },
            {
                code: 'volumeAppEnvoye',
                libelle: translate('actifsCreation.avitaillementEntree.volumeApparent'),
                width: 150,
            },
            {
                code: 'dateHeureReception',
                libelle: translate('actifsCreation.avitaillementEntree.dateHeureReception'),
                width: 300,
                render: (row) => {
                    return formatCustomized(row.dateEntree, FORMAT_DDMMYYYY);
                }
            }
        ];

    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }


    componentWillUnmount() {
    }



    reset = () => {
    };

    callbackHandler = (type, data) => {
        switch (type) {
            case EDIT_AVITAILLEMENTENTREE_TASK:

                let dataToAction = {
                    type: ACTIFS_EDITER_AVITAILLEMENTENTREE_REQUEST,
                    value: {
                        index: data.index,
                        navigationAvitaillementEntreeModel: data.navigationAvitaillementEntreeModel
                    }
                };

                console.log(this);

                this.props.dispatch(actifsRapportEditerAvitaillementEntreeAction.request(dataToAction));
                break;
            case DELETE_AVITAILLEMENTENTREE_TASK:
                dataToAction = {
                    type: ACTIFS_DELETE_AVITAILLEMENTENTREE_REQUEST,
                    value: {
                        index: data,

                    }
                };

                this.props.dispatch(actifsRapportSupprimerAvitaillementEntreeAction.request(dataToAction));
                break;

            case RESET_AVITAILLEMENTENTREE_TASK:
                console.log('RESET_AVITAILLEMENTENTREE_TASK ***************************');
                dataToAction = {
                    type: ACTIFS_RESET_AVITAILLEMENTENTREE_REQUEST,
                    value: {

                    }
                };

                this.props.dispatch(actifsRapportResetAvitaillementEntreeAction.request(dataToAction));
                break;

        }

    }

    nouveau = () => {
        this.retablir();
    }

    confirmer = () => {
        if (!this.checkRequiredFields()) {
            let navigationsAvitaillementEntrees = this.state.navigationsAvitaillementEntrees;
            navigationsAvitaillementEntrees.push(this.state.navigationAvitaillementEntreeModel);
            this.setState({
                myArray: [...this.state.navigationsAvitaillementEntrees, navigationsAvitaillementEntrees]
            });
            this.props.update({
                updateAvitaillementEntrees: this.state?.navigationsAvitaillementEntrees,
            });
        }
    }


    checkRequiredFields = () => {

        let params = { msg: '', required: false }
        this.checkRequiredFieldsNavigAvitaillementEntree(params);

        if (params.required) {
            let message = translate('actifsCreation.avitaillementEntree.champsObligatoires') + params.msg;
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

    checkRequiredFieldsNavigAvitaillementEntree = (params) => {
        let modele = this.state.navigationAvitaillementEntreeModel;
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log(JSON.stringify(modele));
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        if (_.isEmpty(modele.numBonLivraison)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.bonLivraison');
        }

        if (_.isEmpty(modele.dateLivraison)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.dateLivraison');
        }

        if (_.isEmpty(modele.heureLivraison)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.heureLivraison');
        }

        if (_.isEmpty(modele.immatriculationCamion)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.immatriculationCamion');
        }

        if (_.isEmpty(modele.immatriculationCiterne)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.immatriculationCiterne');
        }

        if (_.isEmpty(this.props?.raisonSocialeFourn)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.raisonSocialeFournisseur');
        }

        if (_.isEmpty(modele.nature)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.natureProduit');
        }

        if (_.isEmpty(modele.dateReception?.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.dateReception');
        }

        if (_.isEmpty(modele.heureReception?.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.heureReception');
        }

        if (_.isEmpty(modele.uniteMesure)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.uniteMesure');
        }

        if (_.isEmpty(modele.volumeAppEnvoye)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.volumentApparentEnvoye');
        }

        if (_.isEmpty(modele.volumeAppReceptionne)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.volumentApparentReceptionne');
        }

        if (_.isEmpty(modele.coeffConvert)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.coefficientConvertion');
        }

        if (_.isEmpty(modele.volume15Recep) && modele.volume15Recep < 0) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.volumeA15');
        }

        if (_.isEmpty(modele.densite15)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.densiteA15');
        }

        if (_.isEmpty(modele.poidsReceptionne) && modele.poidsReceptionne < 0) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.poidsReceptione');
        }

        if (_.isEmpty(modele.temperature)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.temperature');
        }

        if (_.isEmpty(modele.valeurEcart) && modele.valeurEcart < 0) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.ecart');
        }

        if (_.isEmpty(modele.observations)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.observations');
        }

    }


    retablir = () => {
        // this.props.callbackHandler(RESET_AVITAILLEMENTENTREE_TASK);
        console.log('retablir');
        this.setState({ navigationAvitaillementEntreeModel: getNavigationAvitaillementEntreeModelInitial() });

        let action = RechercherPersonneMoraleAction.init({
            type: RECHERCHE_PERSONNE_MORALE_INIT,
            value: {}
        });
        this.props.dispatch(action);
    }

    update() {
    }



    calculerValeurEcart = () => {
        console.log('calculerValeurEcart');
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppEnvoye)) {
            const volumeAppEnvoye = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppEnvoye);
            const volumeAppReceptionne = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne);
            if (volumeAppEnvoye > volumeAppReceptionne) {
                const calculatedEcart = volumeAppEnvoye - volumeAppReceptionne;
                this.setState(prevState => {
                    let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                    navigationAvitaillementEntreeModel.valeurEcart = calculatedEcart;
                    return { navigationAvitaillementEntreeModel };
                })
            } else {
                this.setState(prevState => {
                    let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                    navigationAvitaillementEntreeModel.valeurEcart = '';
                    return { navigationAvitaillementEntreeModel };
                })
            }
        } else {
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.valeurEcart = '';
                return { navigationAvitaillementEntreeModel };
            })
        }
        this.update();
    };

    calculerVolume15Recep = () => {
        console.log('calculerVolume15Recep');
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.coeffConvert)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne)) {
            const coeffConvert = _.parseInt(this.state.navigationAvitaillementEntreeModel?.coeffConvert);
            const volumeAppReceptionne = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne);
            const calculatedVolume15Recep = coeffConvert * volumeAppReceptionne;
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.volume15Recep = calculatedVolume15Recep;
                return { navigationAvitaillementEntreeModel };
            })
        } else {
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.volume15Recep = '';
                return { navigationAvitaillementEntreeModel };
            })
        }
        this.update();
    };

    calculerPoidRecep = () => {
        console.log('calculerValeurEcart');
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.densite15)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.coeffConvert)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne)) {
            const coeffConvert = _.parseInt(this.state.navigationAvitaillementEntreeModel?.coeffConvert);
            const densite15 = _.parseInt(this.state.navigationAvitaillementEntreeModel?.densite15);
            const volumeAppReceptionne = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne);
            const calculatedPoidsReceptionne = coeffConvert * densite15 * volumeAppReceptionne;
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.poidsReceptionne = calculatedPoidsReceptionne;
                return { navigationAvitaillementEntreeModel };
            })
        } else {
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.poidsReceptionne = '';
                return { navigationAvitaillementEntreeModel };
            })
        }
        this.update();
    };

    // static getDerivedStateFromProps(props, state) {

    //     if (
    //         props.navigationAvitaillementEntreeModel && props.index !== state.index
    //     ) {
    //         console.log("*********************************");
    //         console.log("*********************************");
    //         console.log("*********************************");
    //         console.log("*********************************");
    //         console.log("*********************************");
    //         console.log(JSON.stringify(props));
    //         console.log("*********************************");
    //         console.log("*********************************");
    //         console.log("*********************************");
    //         console.log("*********************************");
    //         console.log("*********************************");

    //         // this.setState(prevState => {
    //         //     let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
    //         //     navigationAvitaillementEntreeModel.raisonSocialeFourn = this.props?.raisonSocialeFourn;
    //         //     return { navigationAvitaillementEntreeModel };
    //         // })
    //         return {
    //             // navigationAvitaillementEntreeModel: props.navigationAvitaillementEntreeModel,
    //             navigationAvitaillementEntreeModel: { ...state.navigationAvitaillementEntreeModel.raisonSocialeFourn, ...props?.raisonSocialeFourn },
    //             index: props.index
    //         };
    //     }
    //     // Return null to indicate no change to state.
    //     return null;
    // }

    chercherPersonneConcernee = () => {
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.numRCFourn)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.centreRCFourn)) {
            const numeroDocumentIdentite = this.state.navigationAvitaillementEntreeModel?.numRCFourn;
            const nationalite = this.state.navigationAvitaillementEntreeModel?.centreRCFourn;

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

            console.log("=================================================================================");
            console.log("=================================================================================");
            console.log(JSON.stringify(this.props?.raisonSocialeFourn));
            console.log("=================================================================================");
            console.log("=================================================================================");

            // this.setState(prevState => {
            //     let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
            //     navigationAvitaillementEntreeModel.raisonSocialeFourn = this.props?.raisonSocialeFourn;
            //     return { navigationAvitaillementEntreeModel };
            // })
        }
        // else {
        //     this.setState(prevState => {
        //         let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
        //         navigationAvitaillementEntreeModel.raisonSocialeFourn = this.props.raisonSocialeFourn ? this.props?.raisonSocialeFourn : '';
        //         return { navigationAvitaillementEntreeModel };
        //     })
        // }
        this.update();
    };



    render() {
        return (
            <ScrollView>
                {this.props.successMessage != null && (
                    <ComBadrInfoMessageComp message={this.props.successMessage} />
                )}
                {this.props.showProgress && (
                    <ComBadrProgressBarComp width={screenHeight} />
                )}
                {this.props.errorMessage != null && (
                    <ComBadrErrorMessageComp message={this.props.errorMessage} />
                )}

                <View style={CustomStyleSheet.fullContainer}>
                    <ComContainerComp>
                        {/* Référence déclaration */}
                        <ComBadrCardBoxComp noPadding={true}>
                            <Grid>
                                {/*First Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={1} style={{ padding: 5 }}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.DUM.label')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementEntree.DUM.bureau')}
                                        // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        // this.setState({
                                        //     navigationAvitaillementEntreeModel: {
                                        //         ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                        //     }
                                        // });
                                        // this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                        // this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementEntree.DUM.regime')}
                                        // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementEntreeModel: {
                                        //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementEntree.DUM.annee')}
                                        // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementEntreeModel: {
                                        //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={2}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementEntree.DUM.serie')}
                                        // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementEntreeModel: {
                                        //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementEntree.DUM.cle')}
                                        // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementEntreeModel: {
                                        //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
                                        />
                                    </Col>
                                </Row>
                            </Grid>
                        </ComBadrCardBoxComp>


                    </ComContainerComp>
                </View>
                {/* <ActifsRapportAvitaillementRefDumBlock
                    navigationAvitaillementEntreeModel={this.props.navigationAvitaillementEntreeModel}
                    index={this.props.index}
                    push={this.ajouterNavigationAvitaillementEntreeModel}
                    callbackHandler={this.callbackHandler}
                    readOnly={this.props.consultation} /> */}

                <View style={{ marginLeft: 40 }}>
                    <ComBasicDataTableComp
                        ref="_badrTable"
                        id="avitaillementEntreesTable"
                        rows={this.state.navigationsAvitaillementEntrees}
                        cols={(this.props.readOnly) ? this.colsRO : this.cols}
                        onItemSelected={this.onItemSelected}
                        totalElements={this.props.avitaillementEntrees?.length}
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

                {/* <ActifsRapportAvitaillementEntreeBlock
                    navigationAvitaillementEntreeModel={this.props.navigationAvitaillementEntreeModel}
                    index={this.props.index}
                    push={this.ajouterNavigationAvitaillementEntreeModel}
                    callbackHandler={this.callbackHandler}
                    readOnly={this.props.consultation} /> */}

                <ScrollView>
                    <ComContainerComp>
                        {this.state.errorMessage != null && (
                            <ComBadrErrorMessageComp message={this.state.errorMessage} />
                        )}
                    </ComContainerComp>
                    {/* <ActifsRapportAvitaillementEntreeMainBlock index={this.props.index}
                    navigationAvitaillementEntreeModel={this.state.navigationAvitaillementEntreeModel}
                    readOnly={this.props.readOnly}
                    update={this.updateModelNavigationAvitaillementEntree} /> */}
                    <View style={[CustomStyleSheet.fullContainer, { marginTop: -60 }]}>
                        <ComContainerComp>
                            {this.props.showProgress && (
                                <ComBadrProgressBarComp width={screenHeight} />
                            )}
                            {this.props.errorMessage != null && (
                                <ComBadrErrorMessageComp message={this.props.errorMessage} />
                            )}
                            {this.props.successMessage != null && (
                                <ComBadrInfoMessageComp message={this.props.successMessage} />
                            )}
                            {/* Référence déclaration */}
                            <ComBadrCardBoxComp noPadding={true}>
                                <Grid>
                                    { /*first Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={4}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.refDum')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={6}>
                                            <ComBadrLibelleComp>
                                                3090102021000015
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={2} />
                                        <Col size={4}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.dateEnregistrementDum')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={4}>
                                            <ComBadrLibelleComp>
                                                11/10/2021 10:00
                                            </ComBadrLibelleComp>
                                        </Col>
                                    </Row>


                                    {/*second Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={1} style={{ padding: 5 }}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.numeroAquis')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={1}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                                placeholder={translate('actifsCreation.avitaillementEntree.DUM.bureau')}
                                            // value={this.state.navigationAvitaillementEntreeModel?.villeProvenance}
                                            // onChangeText={(text) => {
                                            // this.setState({
                                            //     navigationAvitaillementEntreeModel: {
                                            //         ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                            //     }
                                            // });
                                            // this.state.navigationAvitaillementEntreeModel?.villeProvenance = text;
                                            // this.props.update(this.state.navigationAvitaillementEntreeModel);
                                            // }}
                                            />
                                        </Col>
                                        <Col size={1}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                                placeholder={translate('actifsCreation.avitaillementEntree.DUM.regime')}
                                            // value={this.state.navigationAvitaillementEntreeModel?.villeProvenance}
                                            // onChangeText={(text) => {
                                            //     this.setState({
                                            //         navigationAvitaillementEntreeModel: {
                                            //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                            //         }
                                            //     });
                                            //     this.state.navigationAvitaillementEntreeModel?.villeProvenance = text;
                                            //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                            // }}
                                            />
                                        </Col>
                                        <Col size={1}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                                placeholder={translate('actifsCreation.avitaillementEntree.DUM.annee')}
                                            // value={this.state.navigationAvitaillementEntreeModel?.villeProvenance}
                                            // onChangeText={(text) => {
                                            //     this.setState({
                                            //         navigationAvitaillementEntreeModel: {
                                            //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                            //         }
                                            //     });
                                            //     this.state.navigationAvitaillementEntreeModel?.villeProvenance = text;
                                            //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                            // }}
                                            />
                                        </Col>
                                        <Col size={2}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                                placeholder={translate('actifsCreation.avitaillementEntree.DUM.serie')}
                                            // value={this.state.navigationAvitaillementEntreeModel?.villeProvenance}
                                            // onChangeText={(text) => {
                                            //     this.setState({
                                            //         navigationAvitaillementEntreeModel: {
                                            //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                            //         }
                                            //     });
                                            //     this.state.navigationAvitaillementEntreeModel?.villeProvenance = text;
                                            //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                            // }}
                                            />
                                        </Col>
                                        <Col size={1}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                                placeholder={translate('actifsCreation.avitaillementEntree.DUM.cle')}
                                            // value={this.state.navigationAvitaillementEntreeModel?.villeProvenance}
                                            // onChangeText={(text) => {
                                            //     this.setState({
                                            //         navigationAvitaillementEntreeModel: {
                                            //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                            //         }
                                            //     });
                                            //     this.state.navigationAvitaillementEntreeModel?.villeProvenance = text;
                                            //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                            // }}
                                            />
                                        </Col>
                                    </Row>

                                    {/*third Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.dateEnregistrementAcquis')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={6}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={true}
                                                style={{ height: 20, fontSize: 12 }}
                                                // value={moment(this.state.navigationMaritimeModel.dateEntree).format('DD/MM/YYYY')}
                                                multiline={true}
                                                numberOfLines={1}
                                            />
                                            {this.state.showDateEntree && (
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    // value={this.state.navigationMaritimeModel.dateEntree}
                                                    mode="date"
                                                    is24Hour={true}
                                                    display="default"
                                                // onChange={this.onDateEntreeChange}
                                                />
                                            )}
                                        </Col>
                                        <Col size={2} style={{ paddingTop: 5 }}>
                                            {!this.props.readOnly && (<IconButton
                                                icon="calendar"
                                            // onPress={() => {
                                            //     this.setState({ showDateEntree: true });
                                            // }}
                                            />)}
                                        </Col>
                                    </Row>

                                    {/*fourth Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.bonLivraison')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                                value={this.state.navigationAvitaillementEntreeModel?.numBonLivraison}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, numBonLivraison: text
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                        <Col size={2}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.dateLivraison')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={4}>
                                            <ComBadrDatePickerComp
                                                dateFormat="DD/MM/YYYY"
                                                heureFormat="HH:mm"
                                                value={this.state.navigationAvitaillementEntreeModel?.dateLivraison ? moment(this.state.navigationAvitaillementEntreeModel?.dateLivraison, 'DD/MM/YYYY', true) : ''}
                                                timeValue={this.state.navigationAvitaillementEntreeModel?.heureLivraison ? moment(this.state.navigationAvitaillementEntreeModel?.heureLivraison, 'HH:mm', true) : ''}

                                                onDateChanged={(date) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, dateLivraison: date
                                                        }
                                                    });
                                                    this.update();
                                                }}

                                                onTimeChanged={(time) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, heureLivraison: time
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.immatriculationCamion')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                                value={this.state.navigationAvitaillementEntreeModel?.immatriculationCamion}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, immatriculationCamion: text
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.immatriculationCiterne')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                                value={this.state.navigationAvitaillementEntreeModel?.immatriculationCiterne}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, immatriculationCiterne: text
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
                                                {translate('actifsCreation.avitaillementEntree.main.numeroRCFournisseur')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                keyboardType={'number-pad'}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                                value={this.state.navigationAvitaillementEntreeModel?.numRCFourn}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, numRCFourn: text
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
                                                {translate('actifsCreation.avitaillementEntree.main.centreRCFournisseur')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                keyboardType={'number-pad'}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                                value={this.state.navigationAvitaillementEntreeModel?.centreRCFourn}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, centreRCFourn: text
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

                                    {/*eight Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <Row>
                                                <ComBadrLibelleComp withColor={true}>
                                                    {translate('actifsCreation.avitaillementEntree.main.raisonSocialeFournisseur')}
                                                </ComBadrLibelleComp>
                                            </Row>
                                        </Col>
                                        <Col size={9}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={true}
                                                style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                                value={this.props?.raisonSocialeFourn}
                                                multiline={true}
                                                numberOfLines={10}
                                            />
                                        </Col>
                                    </Row>

                                    {/*nine Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.natureProduit')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3} style={{ paddingRight: 5 }}>
                                            <ComBadrItemsPickerComp
                                                label={translate('actifsCreation.avitaillementEntree.main.natureProduit')}
                                                disabled={this.props.readOnly}
                                                selectedValue={this.state.navigationAvitaillementEntreeModel?.nature ? this.state.navigationAvitaillementEntreeModel?.nature?.code : {}}
                                                items={naturesProduits}
                                                onValueChanged={(selectedValue) => {
                                                    console.log(selectedValue);
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, nature: selectedValue
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                        <Col size={3} />
                                        <Col size={3} />
                                    </Row>

                                    {/*ten Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.dateReception')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={4} >
                                            <ComBadrDatePickerComp
                                                dateFormat="DD/MM/YYYY"
                                                heureFormat="HH:mm"
                                                value={this.state.navigationAvitaillementEntreeModel?.dateReception ? moment(this.state.navigationAvitaillementEntreeModel?.dateReception, 'DD/MM/YYYY', true) : ''}
                                                timeValue={this.state.navigationAvitaillementEntreeModel?.heureReception ? moment(this.state.navigationAvitaillementEntreeModel?.heureReception, 'HH:mm', true) : ''}

                                                onDateChanged={(date) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, dateReception: date
                                                        }
                                                    });
                                                    this.update();
                                                }}

                                                onTimeChanged={(time) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, heureReception: time
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                        <Col size={5} />
                                    </Row>

                                    {/*eleven Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.quantiteReceptionne')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                                value={this.state.navigationAvitaillementEntreeModel?.quantiteReceptionne}
                                                keyboardType={'number-pad'}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, quantiteReceptionne: text
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.uniteMesure')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3} style={{ paddingRight: 5 }}>
                                            <ComBadrItemsPickerComp
                                                // style={CustomStyleSheet.column}
                                                label={translate('actifsCreation.avitaillementEntree.main.uniteMesure')}
                                                disabled={this.props.readOnly}
                                                selectedValue={this.state.navigationAvitaillementEntreeModel?.uniteMesure ? this.state.navigationAvitaillementEntreeModel?.uniteMesure?.code : {}}
                                                items={unitesMesure}
                                                onValueChanged={(selectedValue) => {
                                                    console.log(selectedValue);
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, uniteMesure: selectedValue?.code
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    {/*thirteen Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.volumentApparentEnvoye')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                                keyboardType={'number-pad'}
                                                onEndEditing={(event) => this.calculerValeurEcart()}
                                                value={this.state.navigationAvitaillementEntreeModel?.volumeAppEnvoye}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, volumeAppEnvoye: text
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.volumentApparentReceptionne')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                                keyboardType={'number-pad'}
                                                onEndEditing={(event) => {
                                                    this.calculerValeurEcart();
                                                    this.calculerVolume15Recep();
                                                    this.calculerPoidRecep();
                                                }}
                                                value={this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, volumeAppReceptionne: text
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.coefficientConvertion')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                                value={this.state.navigationAvitaillementEntreeModel?.coeffConvert}
                                                keyboardType={'number-pad'}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, coeffConvert: text
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                                onEndEditing={(event) => {
                                                    this.calculerVolume15Recep();
                                                    this.calculerPoidRecep();
                                                }}
                                            />
                                        </Col>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.volumeA15')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <ComBadrLibelleComp >
                                                {this.state.navigationAvitaillementEntreeModel?.volume15Recep}
                                            </ComBadrLibelleComp>
                                            {/* <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel?.volume15Recep}
                                    /> */}
                                        </Col>
                                    </Row>

                                    {/*fifteen Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.densiteA15')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                                keyboardType={'number-pad'}
                                                value={this.state.navigationAvitaillementEntreeModel?.densite15}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, densite15: text
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                                onEndEditing={(event) => {
                                                    this.calculerPoidRecep();
                                                }}
                                            />
                                        </Col>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.poidsReceptione')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <ComBadrLibelleComp >
                                                {this.state.navigationAvitaillementEntreeModel?.poidsReceptionne}
                                            </ComBadrLibelleComp>
                                            {/* <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel?.poidsReceptione}
                                    /> */}
                                        </Col>
                                    </Row>

                                    {/*sixteen Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.temperature')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                keyboardType={'number-pad'}
                                                style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                                value={this.state.navigationAvitaillementEntreeModel?.temperature}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, temperature: text
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                        <Col size={3}>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.ecart')}
                                            </ComBadrLibelleComp>
                                        </Col>
                                        <Col size={3}>
                                            <ComBadrLibelleComp>
                                                {this.state.navigationAvitaillementEntreeModel?.valeurEcart}
                                            </ComBadrLibelleComp>
                                            {/* <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel?.valeurEcart ? this.state.navigationAvitaillementEntreeModel?.valeurEcart : '35'}
                                    /> */}
                                        </Col>
                                    </Row>


                                    {/*seventeen Row*/}
                                    <Row style={CustomStyleSheet.whiteRow}>
                                        <Col size={3}>
                                            <Row>
                                                <ComBadrLibelleComp withColor={true}>
                                                    {translate('actifsCreation.avitaillementEntree.main.observations')}
                                                </ComBadrLibelleComp>
                                            </Row>
                                        </Col>
                                        <Col size={9}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.readOnly}
                                                style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                                value={this.state.navigationAvitaillementEntreeModel?.observations}
                                                multiline={true}
                                                numberOfLines={10}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        navigationAvitaillementEntreeModel: {
                                                            ...this.state.navigationAvitaillementEntreeModel, observations: text
                                                        }
                                                    });
                                                    this.update();
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                </Grid>
                            </ComBadrCardBoxComp>


                        </ComContainerComp>
                    </View>

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
                                onPress={() => this.retablir()}
                                text={translate('transverse.retablir')}
                            />
                            <View style={{ width: 10 }} />
                        </Row>
                    </View>)}

                </ScrollView>
            </ScrollView>

        );
    }
}





const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationAvitaillementEntreeTab);



