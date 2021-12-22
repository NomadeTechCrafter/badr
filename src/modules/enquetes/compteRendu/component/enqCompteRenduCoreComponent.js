import React from 'react';

import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import {
    ComAccordionComp,
    ComBadrAutoCompleteChipsComp,
    ComBadrAutoCompleteComp,
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrItemsPickerComp,
    ComBadrProgressBarComp,
    ComBasicDataTableComp,
} from '../../../../commons/component';

import { connect } from 'react-redux';
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import style from '../style/enqCompteRenduStyle';

import * as Constants from '../state/enqCompteRenduConstants';

import * as EnqCompteRenduInitAction from '../state/actions/enqCompteRenduInitAction';
import * as EnqCompteRenduConfirmAction from '../state/actions/enqCompteRenduConfirmAction';
import * as EnqCompteRenduSearchAction from '../state/actions/enqCompteRenduSearchAction';
import _ from 'lodash';

let RNFS = require('react-native-fs');

const initialState = {
    marchandiseVo: {},
    vehiculeVo: {},
    scelleVo: {},
    enqueteVo: {},
    showErrorMessage: false,
};

class EnqCompteRenduCoreComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.prepareState();
        this.initDropdowns();
    }

    initDropdowns = () => {
        let action = EnqCompteRenduInitAction.request(
            {
                type: Constants.INIT_COMPTE_RENDU_REQUEST,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    prepareState = () => {
        let uor = this.props.enqueteVo.referenceEnquete.slice(0, 3);
        let annee = this.props.enqueteVo.referenceEnquete.slice(3, 7);
        let serie = this.props.enqueteVo.referenceEnquete.slice(7, 14);
        let etat = this.props?.enqueteVo?.refMissionSelected?.refCompteRenduMission?.etatCompteRendu;
        let type = 'Mission';
        let numeroMission = this.props.enqueteVo.refMissionSelected.numOrdre;

        this.state = {
            ...this.state,
            readonly: this.props.mode === 'validate',
            uor: uor,
            annee: annee,
            serie: serie,
            etat: etat,
            type: type,
            numeroMission: numeroMission,
            enqueteVo: this.props.enqueteVo,
            isActive: {
                saisieDocuments: false,
                saisieMarchandises: this.props.enqueteVo.refMissionSelected.refCompteRenduMission.marchandiseList && this.props.enqueteVo.refMissionSelected.refCompteRenduMission.marchandiseList.length !== 0,
                saisieVehicules: this.props.enqueteVo.refMissionSelected.refCompteRenduMission.vehiculeList && this.props.enqueteVo.refMissionSelected.refCompteRenduMission.vehiculeList.length !== 0,
                appositionScelles: this.props.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList && this.props.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList.length !== 0,
                oppositionFonctions: false,
                recensement: false,
                autre: false,
            },
        };
    };

    buildMarchandiseTableColumns = () => {
        let marchandiseTableColumns = [
            {
                code: 'marque.libelle',
                libelle: translate('enquetes.compteRenduMission.core.saisieMarchandises.natureMarchandise'),
                width: 235,
            },
            {
                code: 'quantite',
                libelle: translate('enquetes.compteRenduMission.core.saisieMarchandises.quantite'),
                width: 235,
            },
            {
                code: 'uniteMesure.descriptionUniteMesure',
                libelle: translate('enquetes.compteRenduMission.core.saisieMarchandises.uniteMesure'),
                width: 235,
            },
            {
                code: 'valeur',
                libelle: translate('enquetes.compteRenduMission.core.saisieMarchandises.valeur'),
                width: 235,
            },
        ];

        if (!this.state.readonly) {
            marchandiseTableColumns.push({
                code: '',
                libelle: '',
                width: 235,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) => this.removeMarchandise(row),
            });
        }

        return marchandiseTableColumns;
    };

    buildVehiculeTableColumns = () => {
        let vehiculeTableColumns = [
            {
                code: 'natureVehicule.libelle',
                libelle: translate('enquetes.compteRenduMission.core.saisieVehicules.natureVehicule'),
                width: 290,
            },
            {
                code: 'libelle',
                libelle: translate('enquetes.compteRenduMission.core.saisieVehicules.libelle'),
                width: 290,
            },
            {
                code: 'valeur',
                libelle: translate('enquetes.compteRenduMission.core.saisieVehicules.valeur'),
                width: 290,
            },
        ];

        if (!this.state.readonly) {
            vehiculeTableColumns.push({
                code: '',
                libelle: '',
                width: 290,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) => this.removeVehicule(row),
            });
        }

        return vehiculeTableColumns;
    };

    buildDocumentAnnexeTableColumns = () => {
        let documentAnnexeTableColumns = [
            {
                code: 'idToShow',
                libelle: translate('enquetes.compteRenduMission.core.documentsAnnexes.numero'),
                width: 300,
            },
            {
                code: 'urlDoc',
                libelle: translate('enquetes.compteRenduMission.core.documentsAnnexes.document'),
                width: 600,
            },
            {
                code: '',
                libelle: '',
                width: 70,
                component: 'button',
                icon: 'eye',
                action: (row, index) => this.consultDocumentAnnexe(row),
            },
        ];

        if (!this.state.readonly) {
            documentAnnexeTableColumns.push({
                code: '',
                libelle: '',
                width: 70,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) => this.removeDocumentAnnexe(row),
            });
        }

        return documentAnnexeTableColumns;
    };

    deleteIdToShowFromDocument(document) {
        delete document.idToShow;
        let newDocument = document;
        return newDocument;
    }

    confirm = () => {
        this.state?.enqueteVo?.refMissionSelected?.refCompteRenduMission?.docList.map((document, index) => this.deleteIdToShowFromDocument(document));


        if ('validate' === this.props.mode) {
            if (_.isEmpty(this.state.enqueteVo.refMissionSelected.refCompteRenduMission.commentaire)) {
                this.setState({
                    ...this.state,
                    errorMessage: 'E00596 Commentaire: Valeur obligatoire.',
                });

                return;
            } else {
                this.setState({
                    ...this.state,
                    errorMessage: '',
                });
            }

        }
        let action = EnqCompteRenduConfirmAction.request(
            {
                type: Constants.CONFIRM_COMPTE_RENDU_REQUEST,
                value: this.state.enqueteVo,
                mode: this.props.mode,
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    back = () => {
        let action = EnqCompteRenduSearchAction.init(
            {
                type: Constants.SEARCH_COMPTE_RENDU_INIT,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    addMarchandise = () => {
        if (this.state.marchandiseVo.marque && this.state.marchandiseVo.uniteMesure) {
            this.state.enqueteVo.refMissionSelected.refCompteRenduMission.marchandiseList.push(this.state.marchandiseVo);
            this.resetMarchandise();
        }
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log(JSON.stringify(this.state.enqueteVo.refMissionSelected.refCompteRenduMission.marchandiseList));
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    };

    removeMarchandise = (marchandise) => {
        for (var i = 0; i < this.state.enqueteVo.refMissionSelected.refCompteRenduMission.marchandiseList.length; i++) {
            if (this.state.enqueteVo.refMissionSelected.refCompteRenduMission.marchandiseList[i].marque.code === marchandise.marque.code) {
                this.state.enqueteVo.refMissionSelected.refCompteRenduMission.marchandiseList.splice(i, 1);

                this.setState({
                    ...this.state,
                });

                break;
            }
        }
    };

    resetMarchandise = () => {
        // this.natureMarchandiseInput.clearInput();

        if (this.state.isActive.autre) {
            this.autreInput.clear();
        }

        this.quantiteInput.clear();
        this.valeurInput.clear();

        this.setState({
            ...this.state,
            marchandiseVo: {},
            isActive: {
                ...this.state.isActive,
                autre: false,
            },
        });
    };

    addVehicule = () => {
        if (this.state.vehiculeVo.natureVehicule) {
            this.state.enqueteVo.refMissionSelected.refCompteRenduMission.vehiculeList.push(this.state.vehiculeVo);
            this.resetVehicule();
        }
    };

    removeVehicule = (vehicule) => {
        for (var i = 0; i < this.state.enqueteVo.refMissionSelected.refCompteRenduMission.vehiculeList.length; i++) {
            if (this.state.enqueteVo.refMissionSelected.refCompteRenduMission.vehiculeList[i].natureVehicule.code === vehicule.natureVehicule.code) {
                this.state.enqueteVo.refMissionSelected.refCompteRenduMission.vehiculeList.splice(i, 1);

                this.setState({
                    ...this.state,
                });

                break;
            }
        }
    };

    resetVehicule = () => {
        this.libelleInput.clear();
        this.valeurVehiculeInput.clear();

        this.setState({
            ...this.state,
            vehiculeVo: {},
        });
    };

    addScelle = () => {
        if (this.state.scelleVo.reference && this.state.scelleVo.reference.length === 8 && !this.containsScelle(this.state.scelleVo)) {
            this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList.push(this.state.scelleVo);
            this.resetScelle();
        }
    };

    removeScelle = () => {
        if (this.state.selectedScelle) {
            for (var i = 0; i < this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList.length; i++) {
                if (this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList[i].reference === this.state.selectedScelle) {
                    this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList.splice(i, 1);
                    i--;
                }
            }

            this.setState({
                ...this.state,
                selectedScelle: {},
            });
        }
    };

    resetScelle = () => {
        this.scelleInput.clear();

        this.setState({
            ...this.state,
            scelleVo: {},
        });
    };

    containsScelle = (scelle) => {
        for (var i = 0; i < this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList.length; i++) {
            if (this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList[i].reference === scelle.reference) {
                return true;
            }
        }
        return false;
    };

    consultDocumentAnnexe = (documentAnnexe) => {
        let documentLocalPath = RNFS.DocumentDirectoryPath + '/' + documentAnnexe.urlDoc;
        RNFS.writeFile(documentLocalPath, documentAnnexe.content, 'base64')
            .then((success) => {
                FileViewer.open(documentLocalPath)
                    .then(() => {
                        // Do nothing
                    })
                    .catch(error => {
                        // Do nothing
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    addDocumentAnnexe = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                readContent: true,
            });
            const docList = this.state?.enqueteVo?.refMissionSelected?.refCompteRenduMission?.docList;
            const newIdDocAnnexe = docList?.length ? docList?.length + 1 : 1;
            console.log(JSON.stringify(newIdDocAnnexe));
            this.state.enqueteVo.refMissionSelected.refCompteRenduMission.docList.push({
                idDocannnexe: newIdDocAnnexe,
                urlDoc: result.name,
                size: null,
                content: await RNFS.readFile(result.uri, 'base64'),
            });

            this.setState({
                ...this.state,
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // Do nothing
            } else {
                throw err;
            }
        }
    };

    removeDocumentAnnexe = (documentAnnexe) => {
        for (var i = 0; i < this.state.enqueteVo.refMissionSelected.refCompteRenduMission.docList.length; i++) {
            if ((documentAnnexe.idDocannnexe && this.state.enqueteVo.refMissionSelected.refCompteRenduMission.docList[i].idDocannnexe === documentAnnexe.idDocannnexe)
                || (documentAnnexe.urlDoc && this.state.enqueteVo.refMissionSelected.refCompteRenduMission.docList[i].urlDoc === documentAnnexe.urlDoc)) {
                this.state.enqueteVo.refMissionSelected.refCompteRenduMission.docList.splice(i, 1);

                this.setState({
                    ...this.state,
                });

                break;
            }
        }
    };

    renderBoxItem = ({ item }) => {
        const itemStyle = item.reference === this.state.selectedScelle ? style.selectedBoxItem : style.boxItem;
        const itemTextStyle = item.reference === this.state.selectedScelle ? style.selectedBoxItemText : style.boxItemText;

        return (
            <View style={itemStyle}>
                <TouchableOpacity disabled={this.state.readonly}
                    onPress={() => this.setState({
                        ...this.state,
                        selectedScelle: item.reference,
                    })}>
                    <Text style={itemTextStyle}>{item.reference}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    transformDocument(document, index) {
        document.idToShow = index + 1;
        let newDocument = document;
        return newDocument;
    }

    render() {
        let filtredDocList = this.state?.enqueteVo?.refMissionSelected?.refCompteRenduMission?.docList.map((document, index) => this.transformDocument(document, index));
        return (
            <ScrollView style={style.innerContainer}
                keyboardShouldPersistTaps={(this.state.autocompleteDropdownOpen || Platform.OS === 'android') ? 'always' : 'never'}>
                {this.props.showProgress && (
                    <ComBadrProgressBarComp />
                )}

                {this.props.infoMessage != null && (
                    <ComBadrInfoMessageComp message={this.props.infoMessage} />
                )}

                {this.props.errorMessage != null && (
                    <ComBadrErrorMessageComp message={this.props.errorMessage} />
                )}

                {this.state.errorMessage != null && (
                    <ComBadrErrorMessageComp message={this.state.errorMessage} />
                )}

                {!this.props.showProgress && (
                    <View>
                        <Grid style={style.referenceCardInfo}>
                            <Row style={style.referenceTitles}>
                                <Col>
                                    <Text style={style.referenceTitleLabel}>
                                        {translate('enquetes.compteRenduMission.core.generic.uor')}
                                    </Text>
                                </Col>

                                <Col>
                                    <Text style={style.referenceTitleLabel}>
                                        {translate('enquetes.compteRenduMission.core.generic.annee')}
                                    </Text>
                                </Col>

                                <Col>
                                    <Text style={style.referenceTitleLabel}>
                                        {translate('enquetes.compteRenduMission.core.generic.serie')}
                                    </Text>
                                </Col>

                                <Col>
                                    <Text style={style.referenceTitleLabel}>
                                        {translate('enquetes.compteRenduMission.core.generic.type')}
                                    </Text>
                                </Col>

                                <Col>
                                    <Text style={style.referenceTitleLabel}>
                                        {translate('enquetes.compteRenduMission.core.generic.numeroMission')}
                                    </Text>
                                </Col>

                                <Col>
                                    <Text style={style.referenceTitleLabel}>
                                        {translate('at.statut')}
                                    </Text>
                                </Col>
                            </Row>

                            <Row style={style.referenceValues}>
                                <Col>
                                    <Text style={style.referenceValueLabel}>
                                        {this.state.uor}
                                    </Text>
                                </Col>

                                <Col>
                                    <Text style={style.referenceValueLabel}>
                                        {this.state.annee}
                                    </Text>
                                </Col>

                                <Col>
                                    <Text style={style.referenceValueLabel}>
                                        {this.state.serie}
                                    </Text>
                                </Col>

                                <Col>
                                    <Text style={style.referenceValueLabel}>
                                        {this.state.type}
                                    </Text>
                                </Col>

                                <Col>
                                    <Text style={style.referenceValueLabel}>
                                        {this.state.numeroMission}
                                    </Text>
                                </Col>

                                <Col>
                                    <Text style={style.referenceValueLabel}>
                                        {this.state.etat}
                                    </Text>
                                </Col>
                            </Row>
                        </Grid>

                        <Grid style={style.topMarginStyle}>
                            <Row size={100}>
                                <Col size={30} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate('enquetes.compteRenduMission.core.codeInitiateur')}
                                    </Text>
                                </Col>

                                <Col size={20}>
                                    <Text>
                                        {this.state.enqueteVo.refAgentInitiateur.idActeur}
                                    </Text>
                                </Col>

                                <Col size={30} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate('enquetes.compteRenduMission.core.nomInitiateur')}
                                    </Text>
                                </Col>

                                <Col size={20}>
                                    <Text>
                                        {this.state.enqueteVo.refAgentInitiateur.nom + ' ' + this.state.enqueteVo.refAgentInitiateur.prenom}
                                    </Text>
                                </Col>
                            </Row>

                            <Row size={100}>
                                <Col size={30} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate('enquetes.compteRenduMission.core.dateCreation')}
                                    </Text>
                                </Col>

                                <Col size={70}>
                                    <Text>
                                        {this.state.enqueteVo.dateCreation}
                                    </Text>
                                </Col>
                            </Row>

                            <Row size={100}>
                                <Col size={30} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate('enquetes.compteRenduMission.core.libelle')}
                                    </Text>
                                </Col>

                                <Col size={70}>
                                    <Text>
                                        {this.state.enqueteVo.libelle}
                                    </Text>
                                </Col>
                            </Row>

                            <Row size={100}>
                                <Col size={30} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate('enquetes.compteRenduMission.core.typeEnquete')}
                                    </Text>
                                </Col>

                                <Col size={70}>
                                    <Text>
                                        {this.state.enqueteVo.typeEnqVOSelected.valeur}
                                    </Text>
                                </Col>
                            </Row>

                            <View style={style.topMarginStyle}>
                                <Row size={100}>
                                    <Col size={3} style={style.checkboxContainer}>
                                        <CheckBox
                                            value={this.state.isActive.saisieDocuments}
                                            onValueChange={(check) => this.setState({
                                                ...this.state,
                                                isActive: {
                                                    ...this.state.isActive,
                                                    saisieDocuments: check,
                                                },
                                            })}
                                            disabled={this.state.readonly}
                                        />
                                    </Col>

                                    <Col size={15} style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('enquetes.compteRenduMission.core.saisieDocuments')}
                                        </Text>
                                    </Col>

                                    <Col size={20} />

                                    <Col size={3} style={style.checkboxContainer}>
                                        <CheckBox
                                            value={this.state.isActive.saisieMarchandises}
                                            onValueChange={(check) => this.setState({
                                                ...this.state,
                                                isActive: {
                                                    ...this.state.isActive,
                                                    saisieMarchandises: check,
                                                },
                                            })}
                                            disabled={this.state.readonly}
                                        />
                                    </Col>

                                    <Col size={15} style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('enquetes.compteRenduMission.core.saisieMarchandises.radioButton')}
                                        </Text>
                                    </Col>

                                    <Col size={20} />

                                    <Col size={3} style={style.checkboxContainer}>
                                        <CheckBox
                                            value={this.state.isActive.saisieVehicules}
                                            onValueChange={(check) => this.setState({
                                                ...this.state,
                                                isActive: {
                                                    ...this.state.isActive,
                                                    saisieVehicules: check,
                                                },
                                            })}
                                            disabled={this.state.readonly}
                                        />
                                    </Col>

                                    <Col size={15} style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('enquetes.compteRenduMission.core.saisieVehicules.radioButton')}
                                        </Text>
                                    </Col>
                                </Row>

                                <Row size={100}>
                                    <Col size={3} style={style.checkboxContainer}>
                                        <CheckBox
                                            value={this.state.isActive.appositionScelles}
                                            onValueChange={(check) => this.setState({
                                                ...this.state,
                                                isActive: {
                                                    ...this.state.isActive,
                                                    appositionScelles: check,
                                                },
                                            })}
                                            disabled={this.state.readonly}
                                        />
                                    </Col>

                                    <Col size={15} style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('enquetes.compteRenduMission.core.appositionScelles.radioButton')}
                                        </Text>
                                    </Col>

                                    <Col size={20} />

                                    <Col size={3} style={style.checkboxContainer}>
                                        <CheckBox
                                            value={this.state.isActive.oppositionFonctions}
                                            onValueChange={(check) => this.setState({
                                                ...this.state,
                                                isActive: {
                                                    ...this.state.isActive,
                                                    oppositionFonctions: check,
                                                },
                                            })}
                                            disabled={this.state.readonly}
                                        />
                                    </Col>

                                    <Col size={15} style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('enquetes.compteRenduMission.core.oppositionFonctions')}
                                        </Text>
                                    </Col>

                                    <Col size={20} />

                                    <Col size={3} style={style.checkboxContainer}>
                                        <CheckBox
                                            value={this.state.isActive.recensement}
                                            onValueChange={(check) => this.setState({
                                                ...this.state,
                                                isActive: {
                                                    ...this.state.isActive,
                                                    recensement: check,
                                                },
                                            })}
                                            disabled={this.state.readonly}
                                        />
                                    </Col>

                                    <Col size={15} style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('enquetes.compteRenduMission.core.recensement')}
                                        </Text>
                                    </Col>
                                </Row>
                            </View>

                            {this.state.isActive.saisieMarchandises && (
                                <View style={style.topMarginStyle}>
                                    <ComAccordionComp
                                        expanded={false}
                                        title={translate('enquetes.compteRenduMission.core.saisieMarchandises.title')}>
                                        {!this.state.readonly && (
                                            <View>
                                                <Row size={100}>
                                                    <Col size={20} style={style.labelContainer}>
                                                        <Text style={style.labelTextStyle}>
                                                            {translate('enquetes.compteRenduMission.core.saisieMarchandises.natureMarchandise')}
                                                        </Text>
                                                    </Col>

                                                    <Col size={30}>
                                                        {this.state.isActive.autre && (
                                                            <TextInput
                                                                mode="outlined"
                                                                label={translate('enquetes.compteRenduMission.core.saisieMarchandises.natureMarchandise')}
                                                                disabled={this.state.isActive.autre}
                                                            />
                                                        )}

                                                        {!this.state.isActive.autre && (
                                                            <ComBadrAutoCompleteChipsComp
                                                                code="code"
                                                                selected={this.state?.marchandiseVo?.marque}
                                                                maxItems={3}
                                                                libelle="libelle"
                                                                module="ENQ_LIB"
                                                                command="autocompleteNatureMarchandise"
                                                                onDemand={true}
                                                                searchZoneFirst={false}
                                                                onValueChange={(item, id) =>
                                                                    this.setState({
                                                                        ...this.state,
                                                                        marchandiseVo: {
                                                                            ...this.state.marchandiseVo,
                                                                            marque: {
                                                                                code: item?.code,
                                                                                libelle: item?.libelle
                                                                            },
                                                                        },
                                                                    })
                                                                }
                                                            />
                                                        )}
                                                    </Col>

                                                    <Col size={5} />

                                                    <Col size={10} style={style.labelContainer}>
                                                        <Button
                                                            title={translate('transverse.autre')}
                                                            type={'solid'}
                                                            buttonStyle={style.buttonAction}
                                                            onPress={() => {
                                                                this.setState({
                                                                    ...this.state,
                                                                    isActive: {
                                                                        ...this.state.isActive,
                                                                        autre: !this.state.isActive.autre,
                                                                    },
                                                                    marchandiseVo: {
                                                                        ...this.state.marchandiseVo,
                                                                        autreMarque: null,
                                                                    },
                                                                });
                                                            }} />
                                                    </Col>

                                                    <Col size={5} />

                                                    {this.state.isActive.autre && (
                                                        <Col size={20}>
                                                            <TextInput
                                                                ref={(ref) => (this.autreInput = ref)}
                                                                key="autreInput"
                                                                mode="outlined"
                                                                label={translate('transverse.autre')}
                                                                value={this.state.marchandiseVo.autreMarque}
                                                                onChangeText={(text) => this.setState({
                                                                    ...this.state,
                                                                    marchandiseVo: {
                                                                        ...this.state.marchandiseVo,
                                                                        autreMarque: text,
                                                                    },
                                                                })}
                                                            />
                                                        </Col>
                                                    )}

                                                    {this.state.isActive.autre && (
                                                        <Col size={20} />
                                                    )}

                                                    {!this.state.isActive.autre && (
                                                        <Col size={40} />
                                                    )}
                                                </Row>

                                                <Row size={100}>
                                                    <Col size={20} style={style.labelContainer}>
                                                        <Text style={style.labelTextStyle}>
                                                            {translate('enquetes.compteRenduMission.core.saisieMarchandises.uniteMesure')}
                                                        </Text>
                                                    </Col>

                                                    <Col size={20} style={style.labelContainer}>
                                                        <ComBadrItemsPickerComp
                                                            label={translate('enquetes.compteRenduMission.core.saisieMarchandises.uniteMesureList')}
                                                            selectedValue={this.state.marchandiseVo.uniteMesure ? this.state.marchandiseVo.uniteMesure.codeUniteMesure : ''}
                                                            items={this.props.data.init.listUniteMesure}
                                                            onValueChanged={(value, index) => this.setState({
                                                                ...this.state,
                                                                marchandiseVo: {
                                                                    ...this.state.marchandiseVo,
                                                                    uniteMesure: {
                                                                        codeUniteMesure: value.code,
                                                                        descriptionUniteMesure: value.libelle,
                                                                    },
                                                                },
                                                            })}
                                                        />
                                                    </Col>

                                                    <Col size={10} />

                                                    <Col size={20} style={style.labelContainer}>
                                                        <Text style={style.labelTextStyle}>
                                                            {translate('enquetes.compteRenduMission.core.saisieMarchandises.quantite')}
                                                        </Text>
                                                    </Col>

                                                    <Col size={20}>
                                                        <TextInput
                                                            ref={(ref) => (this.quantiteInput = ref)}
                                                            key="quantiteInput"
                                                            mode="outlined"
                                                            label={translate('enquetes.compteRenduMission.core.saisieMarchandises.quantite')}
                                                            value={this.state.marchandiseVo.quantite}
                                                            keyboardType={'number-pad'}
                                                            onChangeText={(text) => {
                                                                text = text.replace(/[^0-9.]/g, '');
                                                                this.setState({
                                                                    ...this.state,
                                                                    marchandiseVo: {
                                                                        ...this.state.marchandiseVo,
                                                                        quantite: text,
                                                                    },
                                                                });
                                                            }}
                                                        />
                                                    </Col>

                                                    <Col size={10} />
                                                </Row>

                                                <Row size={100}>
                                                    <Col size={20} style={style.labelContainer}>
                                                        <Text style={style.labelTextStyle}>
                                                            {translate('enquetes.compteRenduMission.core.saisieMarchandises.valeur')}
                                                        </Text>
                                                    </Col>

                                                    <Col size={20}>
                                                        <TextInput
                                                            ref={(ref) => (this.valeurInput = ref)}
                                                            key="valeurInput"
                                                            mode="outlined"
                                                            label={translate('enquetes.compteRenduMission.core.saisieMarchandises.valeur')}
                                                            value={this.state.marchandiseVo.valeur}
                                                            keyboardType={'number-pad'}
                                                            onChangeText={(text) => {
                                                                text = text.replace(/[^0-9.]/g, '');
                                                                this.setState({
                                                                    ...this.state,
                                                                    marchandiseVo: {
                                                                        ...this.state.marchandiseVo,
                                                                        valeur: text,
                                                                    },
                                                                });
                                                            }}
                                                        />
                                                    </Col>

                                                    <Col size={60} />
                                                </Row>

                                                <Row size={100}>
                                                    <Col size={25} />

                                                    <Col size={20}>
                                                        <Button
                                                            title={translate('transverse.confirmer')}
                                                            type={'solid'}
                                                            buttonStyle={style.buttonAction}
                                                            onPress={() => this.addMarchandise()} />
                                                    </Col>

                                                    <Col size={2} />

                                                    <Col size={20}>
                                                        <Button
                                                            title={translate('transverse.retablir')}
                                                            type={'solid'}
                                                            buttonStyle={style.buttonAction}
                                                            onPress={() => this.resetMarchandise()} />
                                                    </Col>

                                                    <Col size={25} />
                                                </Row>
                                            </View>
                                        )}

                                        <Row size={100}>
                                            <Col size={100}>
                                                <ComBasicDataTableComp
                                                    onRef={(ref) => (this.marchandiseTable = ref)}
                                                    id="marchandiseTable"
                                                    hasId={false}
                                                    rows={this.state.enqueteVo.refMissionSelected.refCompteRenduMission.marchandiseList}
                                                    cols={this.buildMarchandiseTableColumns()}
                                                    totalElements={this.state.enqueteVo.refMissionSelected.refCompteRenduMission.marchandiseList ? this.state.enqueteVo.refMissionSelected.refCompteRenduMission.marchandiseList.length : 0}
                                                    maxResultsPerPage={5}
                                                    paginate={true}
                                                />
                                            </Col>
                                        </Row>
                                    </ComAccordionComp>
                                </View>
                            )}

                            {this.state.isActive.saisieVehicules && (
                                <View style={style.topMarginStyle}>
                                    <ComAccordionComp
                                        expanded={false}
                                        title={translate('enquetes.compteRenduMission.core.saisieVehicules.title')}>
                                        {!this.state.readonly && (
                                            <View>
                                                <Row size={100}>
                                                    <Col size={20} style={style.labelContainer}>
                                                        <Text style={style.labelTextStyle}>
                                                            {translate('enquetes.compteRenduMission.core.saisieVehicules.natureVehicule')}
                                                        </Text>
                                                    </Col>

                                                    <Col size={20} style={style.labelContainer}>
                                                        <ComBadrItemsPickerComp
                                                            label={translate('enquetes.compteRenduMission.core.saisieVehicules.natureVehiculeList')}
                                                            selectedValue={this.state.vehiculeVo.natureVehicule ? this.state.vehiculeVo.natureVehicule.code : ''}
                                                            items={this.props.data.init.listNatureVehicule}
                                                            onValueChanged={(value, index) => this.setState({
                                                                ...this.state,
                                                                vehiculeVo: {
                                                                    ...this.state.vehiculeVo,
                                                                    natureVehicule: {
                                                                        code: value,
                                                                        libelle: this.props.data.init.listNatureVehicule[index - 1].libelle,
                                                                    },
                                                                },
                                                            })}
                                                        />
                                                    </Col>

                                                    <Col size={10} />

                                                    <Col size={20} style={style.labelContainer}>
                                                        <Text style={style.labelTextStyle}>
                                                            {translate('enquetes.compteRenduMission.core.saisieVehicules.libelle')}
                                                        </Text>
                                                    </Col>

                                                    <Col size={20}>
                                                        <TextInput
                                                            ref={(ref) => (this.libelleInput = ref)}
                                                            key="libelleInput"
                                                            mode="outlined"
                                                            label={translate('enquetes.compteRenduMission.core.saisieVehicules.libelle')}
                                                            value={this.state.vehiculeVo.libelle}
                                                            onChangeText={(text) => {
                                                                this.setState({
                                                                    ...this.state,
                                                                    vehiculeVo: {
                                                                        ...this.state.vehiculeVo,
                                                                        libelle: text,
                                                                    },
                                                                });
                                                            }}
                                                        />
                                                    </Col>

                                                    <Col size={10} />
                                                </Row>

                                                <Row size={100}>
                                                    <Col size={20} style={style.labelContainer}>
                                                        <Text style={style.labelTextStyle}>
                                                            {translate('enquetes.compteRenduMission.core.saisieVehicules.valeur')}
                                                        </Text>
                                                    </Col>

                                                    <Col size={20}>
                                                        <TextInput
                                                            ref={(ref) => (this.valeurVehiculeInput = ref)}
                                                            key="valeurVehiculeInput"
                                                            mode="outlined"
                                                            label={translate('enquetes.compteRenduMission.core.saisieVehicules.valeur')}
                                                            value={this.state.vehiculeVo.valeur}
                                                            keyboardType={'number-pad'}
                                                            onChangeText={(text) => {
                                                                text = text.replace(/[^0-9.]/g, '');
                                                                this.setState({
                                                                    ...this.state,
                                                                    vehiculeVo: {
                                                                        ...this.state.vehiculeVo,
                                                                        valeur: text,
                                                                    },
                                                                });
                                                            }}
                                                        />
                                                    </Col>

                                                    <Col size={60} />
                                                </Row>

                                                <Row size={100}>
                                                    <Col size={25} />

                                                    <Col size={20}>
                                                        <Button
                                                            title={translate('transverse.confirmer')}
                                                            type={'solid'}
                                                            buttonStyle={style.buttonAction}
                                                            onPress={() => this.addVehicule()} />
                                                    </Col>

                                                    <Col size={2} />

                                                    <Col size={20}>
                                                        <Button
                                                            title={translate('transverse.retablir')}
                                                            type={'solid'}
                                                            buttonStyle={style.buttonAction}
                                                            onPress={() => this.resetVehicule()} />
                                                    </Col>

                                                    <Col size={25} />
                                                </Row>
                                            </View>
                                        )}

                                        <Row size={100}>
                                            <Col size={100}>
                                                <ComBasicDataTableComp
                                                    onRef={(ref) => (this.vehiculeTable = ref)}
                                                    id="vehiculeTable"
                                                    hasId={false}
                                                    rows={this.state.enqueteVo.refMissionSelected.refCompteRenduMission.vehiculeList}
                                                    cols={this.buildVehiculeTableColumns()}
                                                    totalElements={this.state.enqueteVo.refMissionSelected.refCompteRenduMission.vehiculeList ? this.state.enqueteVo.refMissionSelected.refCompteRenduMission.vehiculeList.length : 0}
                                                    maxResultsPerPage={5}
                                                    paginate={true}
                                                />
                                            </Col>
                                        </Row>
                                    </ComAccordionComp>
                                </View>
                            )}

                            {this.state.isActive.appositionScelles && (
                                <View style={style.topMarginStyle}>
                                    <ComAccordionComp
                                        expanded={false}
                                        title={translate('enquetes.compteRenduMission.core.appositionScelles.title')}>
                                        <Row size={100} style={style.topMarginStyle}>
                                            <Col size={20} style={style.labelContainer}>
                                                <Text style={style.labelTextStyle}>
                                                    {translate('enquetes.compteRenduMission.core.appositionScelles.numerosScelles')}
                                                </Text>
                                            </Col>

                                            <Col size={20} style={style.labelContainer}>
                                                <TextInput
                                                    ref={(ref) => (this.scelleInput = ref)}
                                                    key="scelleInput"
                                                    mode="outlined"
                                                    value={this.state.scelleVo.reference}
                                                    keyboardType={'number-pad'}
                                                    maxLength={8}
                                                    onChangeText={(text) => {
                                                        text = text.replace(/[^0-9.]/g, '');
                                                        this.setState({
                                                            ...this.state,
                                                            scelleVo: {
                                                                ...this.state.scelleVo,
                                                                reference: text,
                                                            },
                                                        });
                                                    }}
                                                    disabled={this.state.readonly}
                                                />
                                            </Col>

                                            <Col size={10} style={style.labelContainer}>
                                                <TouchableOpacity style={style.touchableArrow}
                                                    disabled={this.props.readonly}>
                                                    <Button
                                                        type={'outline'}
                                                        icon={{
                                                            name: 'chevron-right',
                                                            size: 12,
                                                            color: 'black',
                                                        }}
                                                        onPress={() => this.addScelle()}
                                                        disabled={this.props.readonly}
                                                    />
                                                </TouchableOpacity>

                                                <TouchableOpacity style={style.touchableArrow}
                                                    disabled={this.props.readonly}>
                                                    <Button
                                                        type={'outline'}
                                                        icon={{
                                                            name: 'chevron-left',
                                                            size: 12,
                                                            color: 'black',
                                                        }}
                                                        onPress={() => this.removeScelle()}
                                                        disabled={this.props.readonly}
                                                    />
                                                </TouchableOpacity>
                                            </Col>

                                            <Col size={50} style={style.boxContainer}>
                                                <SafeAreaView style={style.boxSafeArea}>
                                                    {(this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList == null || this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList.length === 0) && (
                                                        <Text style={style.boxItemText}>Aucun élément</Text>
                                                    )}

                                                    {(this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList != null && this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList.length !== 0) && (
                                                        <FlatList
                                                            data={this.state.enqueteVo.refMissionSelected.refCompteRenduMission.scelleList}
                                                            renderItem={(item) => this.renderBoxItem(item)}
                                                            keyExtractor={item => item.reference}
                                                            nestedScrollEnabled={true}
                                                        />
                                                    )}
                                                </SafeAreaView>
                                            </Col>
                                        </Row>
                                    </ComAccordionComp>
                                </View>
                            )}

                            <Row size={100}>
                                <Col size={20} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate('enquetes.compteRenduMission.core.compteRendu')}
                                    </Text>
                                </Col>


                                <Col size={80}>
                                    <Col size={70}>
                                        <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            mode="outlined"
                                            label={translate('enquetes.compteRenduMission.core.compteRendu')}
                                            value={this.state.enqueteVo.refMissionSelected.refCompteRenduMission.description}
                                            onChangeText={(text) => this.setState({
                                                ...this.state,
                                                enqueteVo: {
                                                    ...this.state.enqueteVo,
                                                    refMissionSelected: {
                                                        ...this.state.enqueteVo.refMissionSelected,
                                                        refCompteRenduMission: {
                                                            ...this.state.enqueteVo.refMissionSelected.refCompteRenduMission,
                                                            description: text,
                                                        },
                                                    },
                                                },
                                            })}
                                            disabled={this.state.readonly}
                                        />
                                    </Col>
                                </Col>
                            </Row>

                            {this.props.mode === 'validate' && (
                                <Row size={100}>
                                    <Col size={20} style={style.labelContainer}>
                                        <Text style={style.labelTextStyle}>
                                            {translate('enquetes.compteRenduMission.core.commentaire')}
                                        </Text>
                                    </Col>


                                    <Col size={80}>
                                        <Col size={70}>
                                            <TextInput
                                                multiline={true}
                                                numberOfLines={4}
                                                mode="outlined"
                                                label={translate('enquetes.compteRenduMission.core.commentaire')}
                                                value={this.state.enqueteVo.refMissionSelected.refCompteRenduMission.commentaire}
                                                onChangeText={(text) => this.setState({
                                                    ...this.state,
                                                    enqueteVo: {
                                                        ...this.state.enqueteVo,
                                                        refMissionSelected: {
                                                            ...this.state.enqueteVo.refMissionSelected,
                                                            refCompteRenduMission: {
                                                                ...this.state.enqueteVo.refMissionSelected.refCompteRenduMission,
                                                                commentaire: text,
                                                            },
                                                        },
                                                    },
                                                })}
                                            />
                                        </Col>
                                    </Col>
                                </Row>
                            )}

                            <View style={style.topMarginStyle}>
                                <ComAccordionComp
                                    expanded={false}
                                    title={translate('enquetes.compteRenduMission.core.documentsAnnexes.title')}>
                                    <Row size={100} style={style.topMarginStyle}>
                                        <Col size={100}>
                                            <ComBasicDataTableComp
                                                onRef={(ref) => (this.documentAnnexeTable = ref)}
                                                id="documentAnnexeTable"
                                                hasId={false}
                                                rows={filtredDocList}
                                                cols={this.buildDocumentAnnexeTableColumns()}
                                                totalElements={filtredDocList ? filtredDocList?.length : 0}
                                                maxResultsPerPage={5}
                                                paginate={true} />
                                        </Col>
                                    </Row>

                                    {!this.state.readonly && (
                                        <Row size={100}>
                                            <Col size={40} />

                                            <Col size={20}>
                                                <Button
                                                    title={translate('transverse.ajouter')}
                                                    type={'solid'}
                                                    buttonStyle={style.buttonAction}
                                                    onPress={() => this.addDocumentAnnexe()} />
                                            </Col>

                                            <Col size={40} />
                                        </Row>
                                    )}
                                </ComAccordionComp>
                            </View>

                            <View style={style.topMarginStyle}>
                                <Row size={100}>
                                    <Col size={40} />

                                    <Col size={20}>
                                        <Button
                                            title={translate('transverse.confirmer')}
                                            type={'solid'}
                                            buttonStyle={style.buttonAction}
                                            onPress={() => this.confirm()} />
                                    </Col>

                                    <Col size={40} />
                                </Row>

                                <Row size={100}>
                                    <Col size={40} />

                                    <Col size={20}>
                                        <Button
                                            title={translate('transverse.back')}
                                            type={'solid'}
                                            buttonStyle={style.buttonAction}
                                            onPress={() => this.back()} />
                                    </Col>

                                    <Col size={40} />
                                </Row>
                            </View>
                        </Grid>
                    </View>
                )}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.enqCompteRenduReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnqCompteRenduCoreComponent);
