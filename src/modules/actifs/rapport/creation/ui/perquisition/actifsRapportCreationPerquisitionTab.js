
import React from 'react';
import { connect } from 'react-redux';
import { ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrAutoCompleteComp, ComBadrButtonComp, ComBadrButtonIconComp, ComBadrButtonRadioComp, ComBadrCardBoxComp, ComBadrDatePickerComp, ComBadrItemsPickerComp, ComBadrKeyValueComp, ComBadrLibelleComp, ComBadrPickerComp, ComBasicDataTableComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/actifsCreationStyle';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import { ScrollView, Text, View } from 'react-native';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { Checkbox, RadioButton, TextInput } from 'react-native-paper';
import DedRedressementRow from '../../../../../dedouanement/redressement/ui/common/DedRedressementRow';
import { stringNotEmpty, validateCin } from '../../../../../t6bis/utils/t6bisUtils';
import * as Constantes from '../../../../../t6bis/utils/t6bisConstants';
import * as T6BISConstantes from '../../../../../t6bis/gestion/state/t6bisGestionConstants';
import t6bisUpdatePropsAction from '../../../../../t6bis/gestion/state/actions/t6bisUpdatePropsAction';
import t6bisFindIntervenantAction from '../../../../../t6bis/gestion/state/actions/t6bisFindIntervenantAction';



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
            }
        ];
        this.cols = [
            {
                code: 'identifiants.numeroDocumentIdentite',
                libelle: translate('actifsCreation.perquisition.identifiant'),
                width: 200,
            },
            {
                code: 'nomIntervenant',
                libelle: translate('actifsCreation.perquisition.nom'),
                width: 200,
            },
            {
                code: 'prenomIntervenant',
                libelle: translate('actifsCreation.perquisition.prenom'),
                width: 200,
            },
            {
                code: 'consentement',
                libelle: translate('actifsCreation.perquisition.consentement'),
                width: 200,
            }, ,
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
            gibPerquisition: { intervenantsVO: [], autorite: {} },
            intervenantVO: null,
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
        this.props.update({
            gibPerquisition: this.state?.gibPerquisition,
        });
    }

    onChangeTypeIdentifiant(item) {
        this.setState({
            ...this.state,
            intervenantVO: {
                ...this.state.intervenantVO,
                refTypeDocumentIdentite: item.code,
                numeroDocumentIndentite: '',
                nationaliteFr: '',
                nomIntervenant: '',
                prenomIntervenant: '',
                adresse: '',
                consentement: false
            },
            // isRetablir: true
        });
        this.checkType();
    }

    isPasseport = function () {
        if (this.state.intervenantVO) {
            return (
                '05' === this.state?.intervenantVO?.refTypeDocumentIdentite ||
                '06' === this.state?.intervenantVO?.refTypeDocumentIdentite ||
                '07' === this.state?.intervenantVO?.refTypeDocumentIdentite
            );
        } else {
            return false;
        }
    };

    checkType = function () {
        this.syncIntervenantInfo();
    };

    idNewIntervenant() {
        return this.state?.newIntervenant === false ? false : true;
    }

    syncIntervenantInfo = function () {
        if (this.isParamSetted()) {
            this.completeRedevableInfo();
        }
    };

    completeRedevableInfo = function () {
        if (this.isParamSetted()) {
            let data = {
                type: T6BISConstantes.FIND_INTERVENANT_REQUEST,
                value: {
                    identifiants: this.buildRedevableCompletionParam(),
                },
            };
            this.callbackHandler(Constantes.FIND_INTERVENANT_TASK, data);
        }
    };

    callbackHandler = (type, data) => {
        // console.log(data);
        // console.log(type);
        switch (type) {
            case Constantes.FIND_INTERVENANT_TASK:
                this.props.dispatch(t6bisFindIntervenantAction.request(data));
                this.setState({ updateState: true });
                break;
            case Constantes.UPDATE_INTERVENANT_TASK:
                let dataToAction = {
                    type: T6BISConstantes.T6BIS_UPDATE_INTERVENANT_REQUEST,
                    value: {
                        fieldsetcontext: data.fieldsetcontext,
                    },
                };

                this.props.dispatch(
                    t6bisUpdatePropsAction.request(dataToAction),
                );
                this.setState({ fieldsetcontext: data.fieldsetcontext });
                break;
        }

    };

    buildRedevableCompletionParam = function () {
        if (this.isPasseport()) {
            return {
                typeIdentifiant: this.state?.intervenantVO?.refTypeDocumentIdentite,
                numeroDocumentIdentite: this.state.intervenantVO
                    .numeroDocumentIndentite,
                nationalite: this.state.intervenantVO.nationaliteFr,
            };
        } else {
            if (
                this.state.intervenantVO &&
                this.state?.intervenantVO?.numeroDocumentIndentite
            ) {
                this.state.intervenantVO.numeroDocumentIndentite = validateCin(
                    this.state.intervenantVO.numeroDocumentIndentite,
                );
            }
            return {
                typeIdentifiant: this.state?.intervenantVO?.refTypeDocumentIdentite,
                numeroDocumentIdentite: this.state.intervenantVO
                    .numeroDocumentIndentite,
            };
        }
    };
    isParamSetted = function () {
        if (this.isPasseport()) {
            if (
                this.state?.intervenantVO?.numeroDocumentIndentite &&
                this.state?.intervenantVO?.refTypeDocumentIdentite &&
                this.state.intervenantVO.nationaliteFr
            ) {
                return true;
            }
        } else if (
            this.state?.intervenantVO?.numeroDocumentIndentite &&
            this.state?.intervenantVO?.refTypeDocumentIdentite
        ) {
            return true;
        }
        return false;
    };

    isPasseport = function () {
        if (this.state.intervenantVO) {
            return (
                '05' === this.state?.intervenantVO?.refTypeDocumentIdentite ||
                '06' === this.state?.intervenantVO?.refTypeDocumentIdentite ||
                '07' === this.state?.intervenantVO?.refTypeDocumentIdentite
            );
        } else {
            return false;
        }
    };

    onBlurIdentifiant(text) {
        this.state.intervenantVO = {
            ...this.state.intervenantVO,
            numeroDocumentIndentite: text,
        };
        this.checkType();
        // this.update();
    }


    supprimerIntervenant = (row, index) => {
        console.log(JSON.stringify(row));
        console.log(JSON.stringify(index));
        let intervenantsVO = this.state.gibPerquisition.intervenantsVO;
        intervenantsVO.splice(index, 1);
        this.setState({ myArray: [...this.state.gibPerquisition.intervenantsVO, intervenantsVO] });
        this.update();
    };

    ajouterIntervenant = () => {
        console.log('this.state : ' + JSON.stringify(this.state));
        if (!this.state.gibPerquisition) {
            this.state.gibPerquisition = {};
        }
        if (!this.state.gibPerquisition.intervenantsVO) {
            this.state.gibPerquisition.intervenantsVO = [];
        }
        let intervenantsVO = this.state.gibPerquisition.intervenantsVO;
        let currentIntervenantVO = this.state.intervenantVO;
        intervenantsVO.push(currentIntervenantVO);
        this.setState({
            myArray: [...this.state.gibPerquisition.intervenantsVO, intervenantsVO],
            intervenantVO: {
                refTypeDocumentIdentite: '',
                numeroDocumentIndentite: '',
                nationaliteFr: '',
                nomIntervenant: '',
                prenomIntervenant: '',
                adresse: '',
                consentement: false
            },
            isRetablir: true,
            updateState: false,
        });
        this.comboArrondissements55.clearInput();
        this.update();
    };


    retablir = () => {
        console.log('retablir');
        this.comboArrondissements55.clearInput();
        this.setState({
            intervenantVO: {
                refTypeDocumentIdentite: '',
                numeroDocumentIndentite: '',
                nationaliteFr: '',
                nomIntervenant: '',
                prenomIntervenant: '',
                adresse: '',
                consentement: false
            },
            isRetablir: true,
            updateState: false,
        });
    };

    static getDerivedStateFromProps(props, state) {
        // console.log('getDerivedStateFromProps - 03052021 - props  : ', props?.t6bisReducer);
        // console.log('getDerivedStateFromProps - 03052021 - state  : ', state);
        // console.log('getDerivedStateFromProps - 03052021 - state  : ', !props?.t6bisReducer?.value?.hasOwnProperty('intervenantVO'));
        // console.log('getDerivedStateFromProps - 03052021 - state  : ', props?.t6bisReducer?.value?.hasOwnProperty('intervenantVO'));
        if (
            props?.t6bisReducer?.value?.intervenantVO &&
            !props?.newIntervenant &&
            props?.retourFindIntervenant
        ) {
            console.log('getDerivedStateFromProps - 1 -');
            return {
                intervenantVO: { ...state.intervenantVO, ...props?.t6bisReducer?.value }, // update the value of specific key
                newIntervenant: props.newIntervenant,
            };
        }
        if (state?.isRetablir) {
            console.log('getDerivedStateFromProps - 2 -');
            return {
                intervenantVO: {
                    refTypeDocumentIdentite: '',
                    numeroDocumentIndentite: '',
                    nationaliteFr: '',
                    nomIntervenant: '',
                    prenomIntervenant: '',
                    adresse: '',
                    consentement: false
                },
                infoCompleted: false,
                newIntervenant: false,
                acNationalite: {},
                isRetablir: false,
                updateState: false,
            };
        }
        if (

            state?.updateState && (props?.t6bisReducer?.value?.numeroDocumentIndentite != state?.intervenantVO?.numeroDocumentIndentite)
        ) {
            console.log('getDerivedStateFromProps - 3 -');
            return {
                intervenantVO: { ...state.intervenantVO, ...props?.t6bisReducer?.value }
            };
        }

        // Return null to indicate no change to state.
        console.log('getDerivedStateFromProps - 4 -');
        return null;
    }
    handlePaysChanged = (pays) => {
        this.setState({
            acNationalite: pays,
            intervenantVO: {
                ...this.state.intervenantVO,
                nationaliteFr: pays.code,
            },
        });
        this.state.intervenantVO.nationaliteFr = pays.code;

        this.checkType();
    };

    render() {
        return (
            <ScrollView >
                <View style={CustomStyleSheet.verticalContainer20}>
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
                                            value={this.state?.gibPerquisition?.datePerquisition ? moment(this.state?.gibPerquisition?.datePerquisition).format('DD/MM/YYYY') : ''}
                                            timeValue={this.state?.gibPerquisition?.heurePerquisition ? moment(this.state?.gibPerquisition?.heurePerquisition, 'HH:mm', true) : ''}
                                            onDateChanged={(date) => this.setState(prevState => ({
                                                gibPerquisition: {
                                                    ...prevState.gibPerquisition,
                                                    datePerquisition: date,
                                                }
                                            }))}
                                            onTimeChanged={(time) => this.setState(prevState => ({
                                                gibPerquisition: {
                                                    ...prevState.gibPerquisition,
                                                    heurePerquisition: time,
                                                }
                                            }))}
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
                                                this.update();
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
                                                console.log(this.state);
                                                this.setState({
                                                    gibPerquisition: {
                                                        ...this.state?.gibPerquisition,
                                                        autorite: item,
                                                    },
                                                });
                                                this.update();
                                                console.log(this.state);
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
                                                console.log(this.state);
                                                this.setState({
                                                    gibPerquisition: {
                                                        ...this.state?.gibPerquisition,
                                                        opj: !this.state?.gibPerquisition?.opj,
                                                    },
                                                });
                                                this.update();
                                                console.log(this.state);
                                                // this.completeTextInputFields();
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
                                        selectedValue={this.state?.intervenantVO?.refTypeDocumentIdentite}
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

                                            item?.code ? this.onChangeTypeIdentifiant(item) : {}
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
                                        value={this.state?.intervenantVO?.numeroDocumentIndentite}
                                        onChangeText={(text) =>
                                            text
                                                ? this.setState({
                                                    ...this.state,
                                                    intervenantVO: {
                                                        ...this.state.intervenantVO,
                                                        numeroDocumentIndentite: text,
                                                    },
                                                })
                                                : {}
                                        }

                                        onEndEditing={(event) =>
                                            this.onBlurIdentifiant(event.nativeEvent.text)
                                        }
                                    />
                                </Col>
                            </DedRedressementRow>
                        )}

                        {this.isPasseport() && (
                            <DedRedressementRow>
                                <Col size={30} style={style.labelContainer}>
                                    <Text style={style.labelTextStyle}>
                                        {translate(
                                            't6bisGestion.tabs.entete.redevableBlock.nationalite',
                                        )}
                                    </Text>
                                </Col>

                                <Col size={70} style={style.labelContainer}>
                                    <ComBadrAutoCompleteChipsComp
                                        disabled={
                                            (stringNotEmpty(this.state?.intervenantVO?.adresse) &&
                                                !this.idNewIntervenant()) ||
                                            this.props.readOnly || this.props?.consultation
                                        }
                                        code="code"
                                        placeholder={translate(
                                            't6bisGestion.tabs.entete.redevableBlock.nationalite',
                                        )}
                                        selected={this.state?.intervenantVO?.nationaliteFr}
                                        maxItems={3}
                                        libelle="libelle"
                                        command="getCmbPays"
                                        paramName="libellePays"
                                        onDemand={true}
                                        searchZoneFirst={false}
                                        onValueChange={this.handlePaysChanged}
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
                                        value={this.state?.intervenantVO?.nomIntervenant}
                                        disabled={stringNotEmpty(this.state?.intervenantVO?.nomIntervenant) || this.props?.consultation
                                        }
                                        onChangeText={(text) =>
                                            text
                                                ? this.setState({
                                                    ...this.state,
                                                    intervenantVO: {
                                                        ...this.state.intervenantVO,
                                                        nomIntervenant: text,
                                                    },
                                                })
                                                : {}
                                        }
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
                                        value={this.state?.intervenantVO?.prenomIntervenant}
                                        disabled={stringNotEmpty(this.state?.intervenantVO?.prenomIntervenant) || this.props?.consultation
                                        }
                                        onChangeText={(text) =>
                                            text
                                                ? this.setState({
                                                    ...this.state,
                                                    intervenantVO: {
                                                        ...this.state.intervenantVO,
                                                        prenomIntervenant: text,
                                                    },
                                                })
                                                : {}
                                        }
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
                                            // this.completeTextInputFields();
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
                                rows={this.state.gibPerquisition?.intervenantsVO}
                                cols={this.props?.consultation ? this.colsConsultation : this.cols}
                                totalElements={this.state.gibPerquisition?.intervenantsVO?.length}
                                maxResultsPerPage={10}
                                paginate={true}
                                showProgress={this.props.showProgress}

                            />
                        </View>
                    </ComAccordionComp>
                    <ComAccordionComp title={translate('actifsCreation.perquisition.resultatPerquisition')} expanded={true}>
                        <View style={CustomStyleSheet.row}>

                            <RadioButton.Group onValueChange={(text) => this.setState(prevState => ({
                                gibPerquisition: {
                                    ...prevState.gibPerquisition,
                                    resultatPerquisition: text,
                                }
                            }))} value={this.state.gibPerquisition?.resultatPerquisition + ''}>
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

const mapStateToProps = (state) => ({ ...state.creationActifsReducer, t6bisReducer: state.t6bisGestionReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationPerquisitionTab);