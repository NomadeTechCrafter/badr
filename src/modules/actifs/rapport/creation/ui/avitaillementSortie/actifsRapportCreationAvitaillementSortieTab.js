import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput, RadioButton } from 'react-native-paper';
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
} from '../../../../../../commons/component';
import { DELETE_AVITAILLEMENTSORTIE_TASK, EDIT_AVITAILLEMENTSORTIE_TASK, RESET_AVITAILLEMENTSORTIE_TASK } from '../../../utils/actifsConstants';
import { getNavigationAvitaillementSortieModelInitial } from '../../../utils/actifsUtils';
import { ACTIFS_CONFIRMER_AVITAILLEMENTSORTIE_REQUEST, ACTIFS_DELETE_AVITAILLEMENTSORTIE_REQUEST, ACTIFS_EDITER_AVITAILLEMENTSORTIE_REQUEST, ACTIFS_RESET_AVITAILLEMENTSORTIE_REQUEST, naturesProduits } from '../../state/actifsRapportCreationConstants';
import actifsRapportConfirmerAvitaillementSortieAction from '../../state/actions/actifsRapportConfirmerAvitaillementSortieAction';
import actifsRapportEditerAvitaillementSortieAction from '../../state/actions/actifsRapportEditerAvitaillementSortieAction';
import actifsRapportResetAvitaillementSortieAction from '../../state/actions/actifsRapportResetAvitaillementSortieAction';
import actifsRapportSupprimerAvitaillementSortieAction from '../../state/actions/actifsRapportSupprimerAvitaillementSortieAction';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { formatCustomized } from '../../../utils/actifsUtils';
import styles from '../../style/actifsCreationStyle';





class ActifsRapportCreationAvitaillementSortieTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationsAvitaillementSorties: this.props.navigationsAvitaillementSorties ? this.props.navigationsAvitaillementSorties : [],
            // navigationAvitaillementSortieModel: this.props.navigationAvitaillementSortieModel,
            index: this.props.index,
            showDateSortie: false,
            showHeureSortie: false,
            heureSortieTech: this.props.navigationAvitaillementSortieModel ? this.props.navigationAvitaillementSortieModel.heureSortie : new Date(),
            acProvenance: this.props.navigationAvitaillementSortieModel ? this.props.navigationAvitaillementSortieModel.provenance.nomPays : '',
            showDateDepart: false,
            showHeureDepart: false,
            heureDepartTech: this.props.navigationAvitaillementSortieModel ? this.props.navigationAvitaillementSortieModel.heureDepart : new Date(),
            acDestination: this.props.navigationAvitaillementSortieModel ? this.props.navigationAvitaillementSortieModel.destination.nomPays : '',
            typeAvitaillement: '01',
            navigationAvitaillementSortieModel: getNavigationAvitaillementSortieModelInitial(),
        };
        this.cols = [
            {
                code: 'bonLivraison',
                libelle: translate('actifsCreation.avitaillementEntree.bonLivraison'),
                width: 150,
            },
            {
                code: 'fournisseur',
                libelle: translate('actifsCreation.avitaillementEntree.fournisseur'),
                width: 150,
            },
            {
                code: 'natureProduit',
                libelle: translate('actifsCreation.avitaillementEntree.natureProduit'),
                width: 150,
            },
            {
                code: 'quantiteReceptionne',
                libelle: translate('actifsCreation.avitaillementEntree.quantiteReceptionne'),
                width: 150,
            },
            {
                code: 'volumeApparent',
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
            },
            {
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'pencil',
                action: (row, index) =>
                    this.updateItem(row, index)
            },
            {
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) =>
                    this.removeItem(row, index)
            }


        ];

        this.colsRO = [
            {
                code: 'bonLivraison',
                libelle: translate('actifsCreation.avitaillementEntree.bonLivraison'),
                width: 150,
            },
            {
                code: 'fournisseur',
                libelle: translate('actifsCreation.avitaillementEntree.fournisseur'),
                width: 150,
            },
            {
                code: 'natureProduit',
                libelle: translate('actifsCreation.avitaillementEntree.natureProduit'),
                width: 150,
            },
            {
                code: 'quantiteReceptionne',
                libelle: translate('actifsCreation.avitaillementEntree.quantiteReceptionne'),
                width: 150,
            },
            {
                code: 'volumeApparent',
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

    reset = () => {
    };

    nouveau = () => {
        this.props.callbackHandler(RESET_AVITAILLEMENTSORTIE_TASK);
    };

    componentDidMount() {
    }

    ajouterNavigationAvitaillementSortieModel = (model) => {
        let navigationsAvitaillementSorties = [...this.props.navigationsAvitaillementSorties];
        let dataToAction = {
            type: ACTIFS_CONFIRMER_AVITAILLEMENTSORTIE_REQUEST,
            value: {
                navigationsAvitaillementSorties: navigationsAvitaillementSorties,
                index: this.props.index,
                navigationAvitaillementSortieModel: model
            }
        };

        this.props.dispatch(actifsRapportConfirmerAvitaillementSortieAction.request(dataToAction));
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    reset = () => {
    };

    confirmer = () => {
        if (!this.checkRequiredFields()) {
            if (!this.checkDatesSortieDepartInformations()) {
                if (!this.checkDatesDebutFinControleInformations()) {
                    this.props.push(this.state.navigationAvitaillementSortieModel);
                }
            }
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

    checkDatesSortieDepartInformations = () => {
        let modele = this.state.navigationAvitaillementSortieModel;
        let dateSortie = formatCustomized(modele.dateSortie, FORMAT_DDMMYYYY);

        moment.suppressDeprecationWarnings = true;
        let dateHeureSortie = moment(dateSortie + ' ' + modele.heureSortie, FORMAT_DDMMYYYY_HHMM);
        let dateDepart = formatCustomized(modele.dateDepart, FORMAT_DDMMYYYY);

        let dateHeureDepart = moment(dateDepart + ' ' + modele.heureDepart, FORMAT_DDMMYYYY_HHMM);

        if (dateHeureDepart < dateHeureSortie) {
            let message = translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.msgErrorOrdreDateSortieDepart');
            this.setState({
                errorMessage: message
            });
            return true;
        } else {
            this.setState({
                errorMessage: null
            });
            return false
        }



    }

    checkDatesDebutFinControleInformations = () => {
        let modele = this.state.navigationAvitaillementSortieModel;
        let dateDebutControle = formatCustomized(modele.dateDebutControle, FORMAT_DDMMYYYY);

        moment.suppressDeprecationWarnings = true;
        let dateHeureDebutControle = moment(dateDebutControle + ' ' + modele.heureDebutControle, FORMAT_DDMMYYYY_HHMM);
        let dateFinControle = formatCustomized(modele.dateFinControle, FORMAT_DDMMYYYY);

        let dateHeureFinControle = moment(dateFinControle + ' ' + modele.heureFinControle, FORMAT_DDMMYYYY_HHMM);

        if (dateHeureFinControle < dateHeureDebutControle) {
            let message = translate('actifsCreation.avitaillementSortie.resultatCtrl.msgErrorOrdreDateDebutFinControle');
            this.setState({
                errorMessage: message
            });
            return true;
        } else {
            this.setState({
                errorMessage: null
            });
            return false
        }



    }

    checkRequiredFieldsNavigAvitaillementSortie = (params) => {
        let modele = this.state.navigationAvitaillementSortieModel;

        // console.log(JSON.stringify(modele));

        if (_.isEmpty(modele.heureSortie)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.main.heureSortie');
        }

        if (_.isEmpty(modele.bonLivraison)) {
            params.required = true;
            params.msg += translate('actifsCreation.avitaillementSortie.main.bonLivraison');
        }
        if (_.isEmpty(modele.quantiteLivree)) {
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
        if (_.isEmpty(modele.dateSortie.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.main.dateSortie');
        }
        if (_.isEmpty(modele.numCarte)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.main.numCarte');
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


    render() {
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
                    {this.props.successMessage != null && (
                        <ComBadrInfoMessageComp message={this.props.successMessage} />
                    )}
                    {/* Référence déclaration */}
                    <ComBadrCardBoxComp noPadding={true}>
                        <Grid>
                            {/*First Row*/}
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={1} style={{ padding: 5 }}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementSortie.typeDum')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={6}>
                                    <RadioButton.Group onValueChange={this.onChangeTypeDUM} value={this.state.typeDUM}>
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

                            {/*Second Row*/}
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
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.bureau')}
                                        // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        // this.setState({
                                        //     navigationAvitaillementSortieModel: {
                                        //         ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                        //     }
                                        // });
                                        // this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                        // this.props.update(this.state.navigationAvitaillementSortieModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.regime')}
                                        // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementSortieModel: {
                                        //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.annee')}
                                        // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementSortieModel: {
                                        //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={2}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.serie')}
                                        // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementSortieModel: {
                                        //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementSortie.DUM.cle')}
                                        // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementSortieModel: {
                                        //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                        // }}
                                        />
                                    </Col>
                                </Row>)}
                        </Grid>
                    </ComBadrCardBoxComp>
                </ComContainerComp>

                <View style={{ marginLeft: 40 }}>
                    <ComBasicDataTableComp
                        ref="_badrTable"
                        id="avitaillementEntreesTable"
                        rows={this.props.avitaillementEntrees}
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
                {/* <ActifsRapportAvitaillementRefDumBlock navigationAvitaillementSortieModel={this.props.navigationAvitaillementSortieModel} index={this.props.index} push={this.ajouterNavigationAvitaillementSortieModel} callbackHandler={this.callbackHandler} readOnly={this.props.consultation} /> */}
                {/* {(this.props.navigationsAvitaillementSorties) && (<ActifsRapportCreationAvitaillementSortieTableBlock navigationsAvitaillementSorties={this.props.navigationsAvitaillementSorties} callbackHandler={this.callbackHandler} readOnly={this.props.consultation} />)} */}
                {/* {(this.props.navigationAvitaillementSortieModel) && (<ActifsRapportAvitaillementSortieBlock navigationAvitaillementSortieModel={this.props.navigationAvitaillementSortieModel} index={this.props.index} push={this.ajouterNavigationAvitaillementSortieModel} callbackHandler={this.callbackHandler} readOnly={this.props.consultation} />)} */}
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
                                // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                // onChangeText={(text) => {
                                //     this.setState({
                                //         navigationAvitaillementSortieModel: {
                                //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                //         }
                                //     });
                                //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                // }}
                                />
                            </Col>
                        </Row>

                        {/*second Row*/}
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={3}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('actifsCreation.avitaillementSortie.main.dateLivraison')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={4}>
                                <TextInput
                                    mode={'outlined'}
                                    disabled={true}
                                    style={{ height: 20, fontSize: 12 }}
                                    // value={moment(this.state.navigationMaritimeModel.dateSortie).format('DD/MM/YYYY')}
                                    multiline={true}
                                    numberOfLines={1}
                                />
                                {this.state.showDateSortie && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        // value={this.state.navigationMaritimeModel.dateSortie}
                                        mode="date"
                                        is24Hour={true}
                                        display="default"
                                    // onChange={this.onDateSortieChange}
                                    />
                                )}
                            </Col>
                            <Col size={1} style={{ paddingTop: 5 }}>
                                {!this.props.readOnly && (<IconButton
                                    icon="calendar"
                                // onPress={() => {
                                //     this.setState({ showDateSortie: true });

                                // }}
                                />)}
                            </Col>
                            <Col size={2}>
                                <TextInput
                                    mode={'outlined'}
                                    disabled={this.props.readOnly}
                                    style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                    // value={this.state.navigationMaritimeModel.heureSortie}
                                    // onFocus={() => {
                                    //     this.setState({ showHeureSortie: true });
                                    // }}
                                    multiline={false}
                                    numberOfLines={1}
                                // onChangeText={(text) => {
                                //     this.setState({
                                //         navigationMaritimeModel: {
                                //             ...this.state.navigationMaritimeModel,
                                //             heureSortie: text,
                                //         }
                                //     });
                                //     this.state.navigationMaritimeModel.heureSortie = text;
                                //     this.props.update(this.state.navigationMaritimeModel);
                                // }}
                                />
                                {this.state.showHeureSortie && (
                                    <DateTimePicker
                                        style={{ width: '100%' }}
                                        // value={this.state.heureSortieTech}
                                        mode="time"
                                        is24Hour={true}
                                        display="default"
                                    // onChange={this.onHeureSortieChange}
                                    />
                                )}
                            </Col>
                            <Col size={1} style={{ paddingTop: 5 }}>
                                <Text style={{ fontSize: 12 }}>
                                    {translate('actifsCreation.entete.uniteHeure')}
                                </Text>
                            </Col>
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
                                            label={translate('actifsCreation.avitaillementEntree.main.natureProduit')}
                                            disabled={this.props.readOnly}
                                            selectedValue={this.state.navigationAvitaillementSortieModel?.nature ? this.state.navigationAvitaillementSortieModel?.nature?.code : {}}
                                            items={naturesProduits}
                                            onValueChanged={(selectedValue) => {
                                                console.log(selectedValue);
                                                this.setState({
                                                    navigationAvitaillementSortieModel: {
                                                        ...this.state.navigationAvitaillementSortieModel, nature: selectedValue
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
                                // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                // onChangeText={(text) => {
                                //     this.setState({
                                //         navigationAvitaillementSortieModel: {
                                //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                //         }
                                //     });
                                //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                // }}
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
                                // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                // onChangeText={(text) => {
                                //     this.setState({
                                //         navigationAvitaillementSortieModel: {
                                //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                //         }
                                //     });
                                //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                // }}
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
                                // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                // onChangeText={(text) => {
                                //     this.setState({
                                //         navigationAvitaillementSortieModel: {
                                //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                //         }
                                //     });
                                //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                // }}
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
                                // value={this.state.navigationAvitaillementSortieModel.villeProvenance}
                                // onChangeText={(text) => {
                                //     this.setState({
                                //         navigationAvitaillementSortieModel: {
                                //             ...this.state.navigationAvitaillementSortieModel, villeProvenance: text
                                //         }
                                //     });
                                //     this.state.navigationAvitaillementSortieModel.villeProvenance = text;
                                //     this.props.update(this.state.navigationAvitaillementSortieModel);
                                // }}
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





const mapStateToProps = (state) => ({ ...state.creationReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationAvitaillementSortieTab);



