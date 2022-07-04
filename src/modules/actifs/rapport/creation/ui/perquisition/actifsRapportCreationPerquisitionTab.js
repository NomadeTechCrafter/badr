
import React from 'react';
import { connect } from 'react-redux';
import {
    ComAccordionComp, ComBadrButtonComp, ComBadrDatePickerComp,
    ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp,
    ComBadrPickerComp, ComBasicDataTableComp
} from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/actifsCreationStyle';
import { Col, Row } from 'react-native-easy-grid';
import moment from 'moment';
import { ScrollView, Text, View } from 'react-native';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { Checkbox, RadioButton, TextInput } from 'react-native-paper';
import DedRedressementRow from '../../../../../dedouanement/redressement/ui/common/DedRedressementRow';
import _ from 'lodash';
import { validCarteSejour, validCIN } from '../../../utils/actifsUtils';
import RechercherPersonneMoraleAction from '../../state/actions/actifsRapportRechercherPersonneMoraleAction';
import { RECHERCHE_PERSONNE_MORALE_INIT, RECHERCHE_PERSONNE_MORALE_REQUEST } from '../../state/actifsRapportCreationConstants';
import { INTERVENANT_INITIAL_PERQUISITION } from '../../../utils/actifsConstants';



class ActifsRapportCreationPerquisitionTab extends React.Component {

    constructor(props) {
        super(props);
        this.colsConsultation = [
            {
                code: 'intervenant.numeroDocumentIndentite',
                libelle: translate('actifsCreation.perquisition.identifiant'),
                width: 200,
            },
            {
                code: 'intervenant.nomIntervenant',
                libelle: translate('actifsCreation.perquisition.nom'),
                width: 200,
            },
            {
                code: 'intervenant.prenomIntervenant',
                libelle: translate('actifsCreation.perquisition.prenom'),
                width: 200,
            },
            {
                code: 'consentement',
                libelle: translate('actifsCreation.perquisition.consentement'),
                width: 200,
                render: (row) => {
                    return row.consentement ? 'Oui' : 'Non';
                },
            }
        ];
        this.cols = [
            {
                code: 'intervenant.numeroDocumentIndentite',
                libelle: translate('actifsCreation.perquisition.identifiant'),
                width: 200,
            },
            {
                code: 'intervenant.nomIntervenant',
                libelle: translate('actifsCreation.perquisition.nom'),
                width: 200,
            },
            {
                code: 'intervenant.prenomIntervenant',
                libelle: translate('actifsCreation.perquisition.prenom'),
                width: 200,
            },
            {
                code: 'consentement',
                libelle: translate('actifsCreation.perquisition.consentement'),
                width: 200,
                render: (row) => {
                    return row.consentement ? 'Oui' : 'Non';
                },
            },
            {
                code: 'isNew',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) =>
                    this.supprimerIntervenant(row, index)
            }
        ];

        this.state = {
            gibPerquisition: { intervenants: [], autorite: {} },
            intervenantVO: INTERVENANT_INITIAL_PERQUISITION,
            newIntervenant: null,
            isRetablir: false,
            updateState: false,
            isC: false,
        };
    }

    componentDidMount = () => {

        this.setState({
            gibPerquisition: this.props.gibPerquisition,
        });

    }

    update() {
        // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
        // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
        // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
        // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
        // console.log(JSON.stringify(this.state.gibPerquisition?.intervenants));
        // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
        // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
        // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
        // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
        this.setState(previousState => ({
            gibPerquisition: {
                ...this.state.gibPerquisition
            }
        }), () => {
            this.props.update({
                gibPerquisition: this.state?.gibPerquisition,
            });
        });

        // this.props.update({
        //     gibPerquisition: this.state?.gibPerquisition,
        // });
    }


    onChangeTypeIdentifiant(value) {
        console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
        console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
        console.log(JSON.stringify(value));
        console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
        console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
        this.setState({
            intervenantVO: {
                ...this.state.intervenantVO, intervenant: {
                    ...this.state.intervenantVO.intervenant,
                    refTypeDocumentIdentite: { code: value.code, libelle: value.libelle }
                }
            }
        });

    }

    chercherPersonneConcernee = () => {
        let action = RechercherPersonneMoraleAction.init({
            type: RECHERCHE_PERSONNE_MORALE_INIT,
            value: {}
        });
        this.props.dispatch(action);
        let required = false;
        let msg = [];
        let result = [];
        if (!_.isEmpty(this.state.intervenantVO.intervenant.numeroDocumentIndentite)
            && !_.isEmpty(this.state.intervenantVO.intervenant.refTypeDocumentIdentite?.code)) {
            if ("01" === this.state.intervenantVO.intervenant.refTypeDocumentIdentite?.code) {

                result = validCIN(this.state.intervenantVO.intervenant.numeroDocumentIndentite);

                if (result[1] != null) {
                    required = true;
                    msg.push(result[1]);
                } else {
                    this.setState({
                        intervenantVO: {
                            ...this.state.intervenantVO, intervenant: {
                                ...this.state.intervenantVO?.intervenant, numeroDocumentIndentite: result[0]
                            }
                        }
                    })
                }
            }
            if ("02" === this.state.intervenantVO.intervenant.refTypeDocumentIdentite?.code) {
                result = validCarteSejour(this.state.intervenantVO?.intervenant.numeroDocumentIndentite);
                console.log('validCarteSejour');
                if (result[1] != null) {
                    required = true;
                    msg.push(result[1]);
                } else {

                    this.setState({
                        intervenantVO: {
                            ...this.state.intervenantVO, intervenant: {
                                ...this.state.intervenantVO?.intervenant, numeroDocumentIndentite: result[0]
                            }
                        }
                    })
                }
            }
        }
        if (required) {
            this.setState({
                errorMessage: msg
            });
        } else {
            this.chercherPersonneConcerneeRemote(result[0]);
            this.setState({
                errorMessage: null,
            });

        }
        this.update();
    };



    chercherPersonneConcerneeRemote = (numeroDocumentIndentite) => {
        let action = RechercherPersonneMoraleAction.request({
            type: RECHERCHE_PERSONNE_MORALE_REQUEST,
            value: {
                module: "REF_LIB",
                command: "getIntervenant",
                typeService: "SP",
                jsonVO: {
                    "numeroDocumentIdentite": numeroDocumentIndentite,
                    "typeIdentifiant": this.state.intervenantVO?.intervenant.refTypeDocumentIdentite?.code
                },
            },
        });

        this.props.dispatch(action);
    };


    supprimerIntervenant = (row, index) => {
        let intervenants = this.state.gibPerquisition?.intervenants;
        intervenants.splice(index, 1);
        this.setState({ myArray: [...this.state.gibPerquisition?.intervenants, intervenants] });
        this.update();
    };

    ajouterIntervenant = () => {
        if (!this.checkRequiredFields()) {
            if (!this.state.gibPerquisition) {
                this.state.gibPerquisition = {};
            }
            if (!this.state.gibPerquisition?.intervenants) {
                this.state.gibPerquisition.intervenants = [];
            }
            let localIntervenantsVO = this.state.gibPerquisition?.intervenants;
            let currentIntervenantVO = this.state.intervenantVO;
            console.log('++++++++++++++++++++++++1+++++++++++++++++++++++++++++');
            console.log('+++++++++++++++++++++++++2++++++++++++++++++++++++++++');
            console.log(JSON.stringify(currentIntervenantVO));
            console.log('++++++++++++++++++++++++3+++++++++++++++++++++++++++++');
            console.log(JSON.stringify(localIntervenantsVO));
            console.log('+++++++++++++++++++++++++4++++++++++++++++++++++++++++');
            currentIntervenantVO.index = this.state.gibPerquisition?.intervenants.length + 1;
            this.state.gibPerquisition?.intervenants.push(currentIntervenantVO);

            this.setState({
                // intervenants: localIntervenantsVO,
                intervenantVO: INTERVENANT_INITIAL_PERQUISITION,
                isRetablir: true,
                updateState: false,
            });
            this.comboArrondissements55.clearInput();
            let action = RechercherPersonneMoraleAction.init({
                type: RECHERCHE_PERSONNE_MORALE_INIT,
                value: {}
            });
            this.props.dispatch(action);
            this.update();
        }
    };

    checkRequiredFields = () => {
        let params = { msg: '', required: false }
        this.checkRequiredFieldsForIntervenant(params);
        if (params.required) {
            let message = translate('actifsCreation.avionsPrivees.champsObligatoires') + params.msg;
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


    checkRequiredFieldsForIntervenant = (params) => {
        let modele = this.state.intervenantVO.intervenant;

        // console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
        // console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
        // console.log(JSON.stringify(modele));
        // console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
        // console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
        if (_.isEmpty(modele.refTypeDocumentIdentite?.code)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('t6bisGestion.tabs.entete.redevableBlock.typeIdentifiant');
        }
        if (_.isEmpty(modele.numeroDocumentIndentite)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('t6bisGestion.tabs.entete.redevableBlock.identifiant');
        }
        if (_.isEmpty(modele.nomIntervenant)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('t6bisGestion.tabs.entete.redevableBlock.nom');
        }
        if (_.isEmpty(modele.prenomIntervenant)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('t6bisGestion.tabs.entete.redevableBlock.prenom');
        }
    }

    retablir = () => {
        console.log('retablir');
        this.comboArrondissements55.clearInput();
        this.setState({
            intervenantVO: INTERVENANT_INITIAL_PERQUISITION,
            isRetablir: true,
            updateState: false,
        });
        let action = RechercherPersonneMoraleAction.init({
            type: RECHERCHE_PERSONNE_MORALE_INIT,
            value: {}
        });
        this.props.dispatch(action);
        this.update();
    };

    render() {

        return (
            <ScrollView >
                <View style={CustomStyleSheet.verticalContainer20}>
                    {this.state.errorMessage != null && (
                        <ComBadrErrorMessageComp message={this.state.errorMessage} />
                    )}
                    {(this.props.errorMessage != null && this.props.errorMessage !== '') && (
                        <ComBadrInfoMessageComp message={this.props.errorMessage} />
                    )}
                    <ComAccordionComp title={translate('actifsCreation.perquisition.title')} expanded={true}>
                        <View>
                            <View style={CustomStyleSheet.row}>
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={false}>
                                            {translate('actifsCreation.perquisition.dateHeureDebut')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={7}>
                                        <ComBadrDatePickerComp
                                            readonly={this.props?.consultation}
                                            dateFormat="DD/MM/YYYY"
                                            heureFormat="HH:mm"
                                            value={this.state?.gibPerquisition?.datePerquisition ? moment(this.state?.gibPerquisition?.datePerquisition, 'DD/MM/YYYY', true) : ''}
                                            timeValue={this.state?.gibPerquisition?.heurePerquisition ? moment(this.state?.gibPerquisition?.heurePerquisition, 'HH:mm', true) : ''}
                                            onDateChanged={(date) => {
                                                this.setState({
                                                    gibPerquisition: {
                                                        ...this.state.gibPerquisition, datePerquisition: date
                                                    }
                                                });
                                                this.update();
                                            }}
                                            onTimeChanged={(time) => {
                                                this.setState({
                                                    gibPerquisition: {
                                                        ...this.state.gibPerquisition, heurePerquisition: time
                                                    }
                                                });
                                                this.update();
                                            }}
                                            inputStyle={style.dateInputStyle}
                                        />
                                    </Col>
                                </Row>
                            </View>
                            <View style={CustomStyleSheet.row}>
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={false}>
                                            {translate('actifsCreation.perquisition.lieuPerquisition')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={7}>
                                        <TextInput
                                            disabled={this.props?.consultation}
                                            maxLength={250}
                                            multiline
                                            numberOfLines={2}
                                            value={this.props?.consultation ? this.props?.gibPerquisition?.lieuPerquisition : this.state.gibPerquisition?.lieuPerquisition}
                                            onChangeText={(text) => {
                                                this.setState(prevState => ({
                                                    gibPerquisition: {
                                                        ...prevState.gibPerquisition,
                                                        lieuPerquisition: text,
                                                    }
                                                }))
                                            }
                                            }
                                            onEndEditing={() => {
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </View>
                            <View style={CustomStyleSheet.row}>
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={false}>
                                            {translate('actifsCreation.perquisition.autoritePerquisition')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={7}>
                                        <ComBadrPickerComp
                                            disabled={this.props?.consultation}
                                            key="code"
                                            style={CustomStyleSheet.badrPicker}
                                            selectedValue={this.state?.gibPerquisition?.autorite?.code}
                                            selected={this.state?.gibPerquisition?.autorite?.code}
                                            titleStyle={CustomStyleSheet.badrPickerTitle}
                                            cle="code"
                                            libelle="libelle"
                                            module="GIB"
                                            command="getAllAutorite"
                                            param={null}
                                            typeService="SP"
                                            storeWithKey="code"
                                            storeLibelleWithKey="libelle"
                                            onValueChange={(selectedValue, selectedIndex, item) => {
                                                this.setState(previousState => ({
                                                    gibPerquisition: {
                                                        ...this.state.gibPerquisition,
                                                        autorite: item,
                                                    }
                                                }), () => {
                                                    this.props.update({
                                                        gibPerquisition: {
                                                            ...this.state.gibPerquisition,
                                                            autorite: item,
                                                        }
                                                    });
                                                });
                                            }
                                            }
                                        />
                                    </Col>
                                </Row>
                            </View>
                            <View style={CustomStyleSheet.row}>
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={false}>
                                            {translate('actifsCreation.perquisition.officierPJ')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={7}>
                                        <Checkbox
                                            disabled={this.props?.consultation}
                                            status={
                                                this.state?.gibPerquisition?.opj ? 'checked' : 'unchecked'
                                            }
                                            color={primaryColor}
                                            onPress={() => {
                                                this.setState(previousState => ({
                                                    gibPerquisition: {
                                                        ...this.state.gibPerquisition,
                                                        opj: !this.state?.gibPerquisition?.opj,
                                                    }
                                                }), () => {
                                                    this.props.update({
                                                        gibPerquisition: {
                                                            ...this.state.gibPerquisition,
                                                            opj: this.state?.gibPerquisition?.opj,
                                                        }
                                                    });
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </View>
                        </View>
                    </ComAccordionComp>
                    <ComAccordionComp title={translate('actifsCreation.perquisition.personnesConcernees')} expanded={true}>
                        {(!this.props?.consultation &&
                            <DedRedressementRow>
                                <Col size={30} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate(
                                            't6bisGestion.tabs.entete.redevableBlock.typeIdentifiant',
                                        )}
                                    </Text>
                                </Col>
                                <Col size={70} style={style.labelContainer}>
                                    <ComBadrPickerComp
                                        disabled={this.props.readOnly || this.props?.consultation}
                                        onRef={(ref) => (this.comboArrondissements55 = ref)}
                                        key="code"
                                        style={CustomStyleSheet.badrPicker}
                                        selectedValue={this.state?.intervenantVO?.intervenant.refTypeDocumentIdentite?.code}
                                        titleStyle={CustomStyleSheet.badrPickerTitle}
                                        cle="code"
                                        libelle="libelle"
                                        module="REF_LIB"
                                        command="getCmbTypeIdentifiant"
                                        param={null}
                                        typeService="SP"
                                        storeWithKey="code"
                                        storeLibelleWithKey="libelle"
                                        onValueChange={(selectedValue, selectedIndex, item) =>

                                            this.onChangeTypeIdentifiant(item)
                                        }
                                    />
                                </Col>
                                <Col size={30} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate(
                                            't6bisGestion.tabs.entete.redevableBlock.identifiant',
                                        )}
                                    </Text>
                                </Col>

                                <Col size={70} style={style.labelContainer}>
                                    <TextInput
                                        disabled={this.props.readOnly || this.props?.consultation}
                                        mode="outlined"
                                        label={translate(
                                            't6bisGestion.tabs.entete.redevableBlock.identifiant',
                                        )}
                                        value={this.state.intervenantVO.intervenant.numeroDocumentIndentite}
                                        onChangeText={(text) => {
                                            this.setState({
                                                intervenantVO: {
                                                    ...this.state.intervenantVO, intervenant: {
                                                        ...this.state.intervenantVO.intervenant,
                                                        numeroDocumentIndentite: text
                                                    }
                                                }
                                            });
                                        }}
                                        onEndEditing={() =>
                                            this.chercherPersonneConcernee()
                                        }
                                    />
                                </Col>
                            </DedRedressementRow>
                        )}


                        {(!this.props?.consultation &&
                            <DedRedressementRow>
                                <Col size={30} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate('t6bisGestion.tabs.entete.redevableBlock.nom')}
                                    </Text>
                                </Col>
                                <Col size={70} style={style.labelContainer}>
                                    <TextInput
                                        mode="outlined"
                                        label={translate('t6bisGestion.tabs.entete.redevableBlock.nom')}
                                        value={this.props?.nomIntervenant ? this.props?.nomIntervenant : this.state?.intervenantVO?.intervenant.nomIntervenant}
                                        disabled={this.props?.nomIntervenant || this.props?.consultation}
                                        onChangeText={(text) => {
                                            if (_.isEmpty(this.props.nomIntervenant)) {
                                                this.setState({
                                                    intervenantVO: {
                                                        ...this.state.intervenantVO, intervenant: {
                                                            ...this.state.intervenantVO?.intervenant, nomIntervenant: text
                                                        }
                                                    }
                                                });
                                            }
                                        }}
                                        onContentSizeChange={
                                            (text) => {
                                                if (this.props.nomIntervenant) {
                                                    this.setState({
                                                        intervenantVO: {
                                                            ...this.state.intervenantVO, intervenant: {
                                                                ...this.state.intervenantVO?.intervenant, nomIntervenant: this.props?.nomIntervenant
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                        onEndEditing={() => {
                                            this.update();
                                        }}
                                    />
                                </Col>
                                <Col size={30} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate('t6bisGestion.tabs.entete.redevableBlock.prenom')}
                                    </Text>
                                </Col>
                                <Col size={70} style={style.labelContainer}>
                                    <TextInput
                                        mode="outlined"
                                        label={translate(
                                            't6bisGestion.tabs.entete.redevableBlock.prenom',
                                        )}
                                        value={this.props?.prenomIntervenant ? this.props?.prenomIntervenant : this.state?.intervenantVO?.intervenant.prenomIntervenant}
                                        disabled={this.props?.prenomIntervenant || this.props?.consultation}
                                        onChangeText={(text) => {
                                            if (_.isEmpty(this.props.prenomIntervenant)) {
                                                this.setState({
                                                    intervenantVO: {
                                                        ...this.state.intervenantVO, intervenant: {
                                                            ...this.state.intervenantVO?.intervenant, prenomIntervenant: text
                                                        }
                                                    }
                                                });
                                            }
                                        }}
                                        onContentSizeChange={(text) => {
                                            if (this.props.prenomIntervenant) {
                                                this.setState({
                                                    intervenantVO: {
                                                        ...this.state.intervenantVO, intervenant: {
                                                            ...this.state.intervenantVO?.intervenant, prenomIntervenant: this.props?.prenomIntervenant
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                        }
                                        onEndEditing={() => {
                                            this.update();
                                        }}
                                    />
                                </Col>
                            </DedRedressementRow>
                        )}
                        {(!this.props?.consultation &&
                            <DedRedressementRow>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={false}>
                                        {translate('actifsCreation.perquisition.consentement')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={7}>
                                    <Checkbox
                                        status={
                                            this.state?.intervenantVO?.consentement ? 'checked' : 'unchecked'
                                        }
                                        disabled={this.props.readOnly || this.props?.consultation}
                                        color={primaryColor}
                                        onPress={() => {
                                            this.setState({
                                                intervenantVO: {
                                                    ...this.state?.intervenantVO,
                                                    consentement: !this.state?.intervenantVO?.consentement,
                                                },
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>

                            </DedRedressementRow>
                        )}
                        {(!this.props?.consultation &&
                            <View style={style.containerActionBtn}>
                                <ComBadrButtonComp
                                    style={{ width: 100 }}
                                    onPress={() => {
                                        this.ajouterIntervenant();
                                    }}
                                    text={translate('transverse.confirmer')}
                                    disabled={false}
                                    onEndEditing={() => {
                                        this.update();
                                    }}
                                />
                                <ComBadrButtonComp
                                    style={{ width: 100 }}
                                    onPress={() => {
                                        this.retablir();
                                    }}
                                    text={translate('transverse.retablir')}
                                    disabled={false}
                                />
                            </View>
                        )}
                        <View style={CustomStyleSheet.row}>
                            <ComBasicDataTableComp
                                id="PerquiTable"
                                rows={this.state.gibPerquisition?.intervenants}
                                cols={this.props?.consultation ? this.colsConsultation : this.cols}
                                totalElements={this.state.gibPerquisition?.intervenants?.length}
                                maxResultsPerPage={10}
                                paginate={true}
                                showProgress={this.props.showProgress}

                            />
                        </View>
                    </ComAccordionComp>
                    <ComAccordionComp title={translate('actifsCreation.perquisition.resultatPerquisition')} expanded={true}>
                        <View style={CustomStyleSheet.row}>

                            <RadioButton.Group
                                onValueChange={(text) => {
                                    this.setState(previousState => ({
                                        gibPerquisition: {
                                            ...this.state.gibPerquisition,
                                            resultatPerquisition: text,
                                        }
                                    }), () => {
                                        this.props.update({
                                            gibPerquisition: {
                                                ...this.state.gibPerquisition,
                                                resultatPerquisition: text,
                                            }
                                        });
                                    });
                                }
                                }


                                onEndEditing={() => {
                                    this.update();
                                }}
                                value={this.state.gibPerquisition?.resultatPerquisition + ''}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{translate('actifsCreation.perquisition.positif')}</Text>
                                        <RadioButton value="true" color={primaryColor} disabled={this.props.consultation} />
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{translate('actifsCreation.perquisition.negatif')}</Text>
                                        <RadioButton value="false" color={primaryColor} disabled={this.props.consultation} />
                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>
                    </ComAccordionComp>
                </View>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationPerquisitionTab);