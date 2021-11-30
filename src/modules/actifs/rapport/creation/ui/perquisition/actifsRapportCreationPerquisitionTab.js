
import React from 'react';
import { connect } from 'react-redux';
import { ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrAutoCompleteComp, ComBadrButtonIconComp, ComBadrButtonRadioComp, ComBadrCardBoxComp, ComBadrDatePickerComp, ComBadrItemsPickerComp, ComBadrKeyValueComp, ComBadrLibelleComp, ComBadrPickerComp, ComBasicDataTableComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/actifsCreationStyle';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import { ScrollView, Text, View } from 'react-native';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { Checkbox, RadioButton, TextInput } from 'react-native-paper';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import DedRedressementRow from '../../../../../dedouanement/redressement/ui/common/DedRedressementRow';
import { stringNotEmpty, validateCin } from '../../../../../t6bis/utils/t6bisUtils';
import * as Constantes from '../../../../../t6bis/utils/t6bisConstants';
import * as T6BISConstantes from '../../../../../t6bis/gestion/state/t6bisGestionConstants';


class ActifsRapportCreationPerquisitionTab extends React.Component {

    constructor(props) {
        super(props);

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
            },
        ];
        this.state = {
            gibPerquisition: {},
            modeConsultation: false,
            intervenantVO: {},
            newIntervenant: null,
        };
    }

    componentDidMount = () => {
        this.setState({
            gibPerquisition: this.props.value?.gibPerquisition,
            modeConsultation: this.props.consultation,
        });
    }

    handleAccordChanged = (selectedValue, selectedIndex, item) => {
        this.update();
        console.log(selectedValue);
        console.log(selectedIndex);
        console.log(item);
    };

    update() {
        this.props.update({
            gibPerquisition: this.state?.gibPerquisition,
        });
    }

    onChangeTypeIdentifiant(text) {
        this.setState({
            ...this.state,
            intervenantVO: {
                ...this.state.intervenantVO,
                refTypeDocumentIdentite: text,
            },
        });
        this.checkType();
    }

    isPasseport = function () {
        if (this.state.intervenantVO) {
            return (
                '05' === this.state.intervenantVO.refTypeDocumentIdentite ||
                '06' === this.state.intervenantVO.refTypeDocumentIdentite ||
                '07' === this.state.intervenantVO.refTypeDocumentIdentite
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
                type: Constantes.FIND_INTERVENANT_REQUEST,
                value: {
                    identifiants: this.buildRedevableCompletionParam(),
                },
            };
            this.props.callbackHandler(T6BISConstantes.FIND_INTERVENANT_TASK, data);
        }
    };
    buildRedevableCompletionParam = function () {
        if (this.isPasseport()) {
            return {
                typeIdentifiant: this.state.intervenantVO.refTypeDocumentIdentite,
                numeroDocumentIdentite: this.state.intervenantVO
                    .numeroDocumentIndentite,
                nationalite: this.state.intervenantVO.nationaliteFr,
            };
        } else {
            if (
                this.state.intervenantVO &&
                this.state.intervenantVO.numeroDocumentIndentite
            ) {
                this.state.intervenantVO.numeroDocumentIndentite = validateCin(
                    this.state.intervenantVO.numeroDocumentIndentite,
                );
            }
            return {
                typeIdentifiant: this.state.intervenantVO.refTypeDocumentIdentite,
                numeroDocumentIdentite: this.state.intervenantVO
                    .numeroDocumentIndentite,
            };
        }
    };
    isParamSetted = function () {
        if (this.isPasseport()) {
            if (
                this.state.intervenantVO.numeroDocumentIndentite &&
                this.state.intervenantVO.refTypeDocumentIdentite &&
                this.state.intervenantVO.nationaliteFr
            ) {
                return true;
            }
        } else if (
            this.state.intervenantVO.numeroDocumentIndentite &&
            this.state.intervenantVO.refTypeDocumentIdentite
        ) {
            return true;
        }
        return false;
    };

    isPasseport = function () {
        if (this.state.intervenantVO) {
            return (
                '05' === this.state.intervenantVO.refTypeDocumentIdentite ||
                '06' === this.state.intervenantVO.refTypeDocumentIdentite ||
                '07' === this.state.intervenantVO.refTypeDocumentIdentite
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
    }

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
                                            dateFormat="DD/MM/YYYY"
                                            heureFormat="HH:mm"
                                            value={this.state?.gibPerquisition?.datePerquisition ? moment(this.state?.gibPerquisition?.datePerquisition, 'DD/MM/YYYY', true) : ''}
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
                                            value={this.state.gibPerquisition?.lieuPerquisition}
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
                                            // disabled={true}
                                            key="code"
                                            style={CustomStyleSheet.badrPicker}
                                            selectedValue={this.state?.gibPerquisition?.refTypeDocumentIdentite}
                                            titleStyle={CustomStyleSheet.badrPickerTitle}
                                            // title={translate('at.typeIdent')}
                                            cle="code"
                                            libelle="libelle"
                                            module="GIB"
                                            command="getAllAutorite"
                                            param={null}
                                            typeService="SP"
                                            storeWithKey="code"
                                            storeLibelleWithKey="libelle"
                                            // onValueChanged={this.handleAccordChanged}
                                            onValueChange={(selectedValue, selectedIndex, item) =>
                                                this.handleAccordChanged(
                                                    selectedValue,
                                                    selectedIndex,
                                                    item,
                                                )
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
                                            status={
                                                this.state?.gibPerquisition?.opj ? 'checked' : 'unchecked'
                                            }
                                            // label={translate('t6bisrecherche.fields.enregistree')}
                                            color={primaryColor}
                                            onPress={() => {
                                                this.setState({
                                                    gibPerquisition: {
                                                        ...this.state?.gibPerquisition,
                                                        opj: !this.state?.gibPerquisition?.opj,
                                                    },
                                                });
                                                // this.completeTextInputFields();
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </View>
                        </View>
                    </ComAccordionComp>
                    <ComAccordionComp title={translate('actifsCreation.perquisition.personnesConcernees')} expanded={true}>
                        <DedRedressementRow>
                            {/* <ComBadrKeyValueComp
                                libelle={translate('actifsCreation.perquisition.identifiant')}
                                children={<ComBadrPickerComp
                                    // disabled={true}
                                    key="code"
                                    style={CustomStyleSheet.badrPicker}
                                    selectedValue={this.state?.gibPerquisition?.refTypeDocumentIdentite}
                                    titleStyle={CustomStyleSheet.badrPickerTitle}
                                    // title={translate('at.typeIdent')}
                                    cle="code"
                                    libelle="libelle"
                                    module="REF_LIB"
                                    command="getCmbTypeIdentifiant"
                                    param={null}
                                    typeService="SP"
                                    storeWithKey="code"
                                    storeLibelleWithKey="libelle"
                                    // onValueChanged={this.handleAccordChanged}
                                    onValueChange={(selectedValue, selectedIndex, item) =>
                                        this.handleAccordChanged(
                                            selectedValue,
                                            selectedIndex,
                                            item,
                                        )
                                    }
                                />}
                            /> */}

                            <Col size={30} style={style.labelContainer}>
                                <Text style={style.labelTextStyle}>
                                    {translate(
                                        't6bisGestion.tabs.entete.redevableBlock.typeIdentifiant',
                                    )}
                                </Text>
                            </Col>
                            <Col size={70} style={style.labelContainer}>
                                <ComBadrKeyValueComp
                                libelle={translate('actifsCreation.perquisition.identifiant')}
                                children={<ComBadrPickerComp
                                    // disabled={true}
                                    key="code"
                                    style={CustomStyleSheet.badrPicker}
                                    selectedValue={this.state?.gibPerquisition?.refTypeDocumentIdentite}
                                    titleStyle={CustomStyleSheet.badrPickerTitle}
                                    // title={translate('at.typeIdent')}
                                    cle="code"
                                    libelle="libelle"
                                    module="REF_LIB"
                                    command="getCmbTypeIdentifiant"
                                    param={null}
                                    typeService="SP"
                                    storeWithKey="code"
                                    storeLibelleWithKey="libelle"
                                    // onValueChanged={this.handleAccordChanged}
                                    onValueChange={(selectedValue, selectedIndex, item) =>

                                        item?.code ? this.onChangeTypeIdentifiant(item.code) : {}
                                    }
                                />}
                            />
                                <ComBadrItemsPickerComp
                                    disabled={this.props.readOnly}
                                    style={{
                                        ...style.labelTextStyle,
                                        borderWidth: 1,
                                        borderColor: '#696969',
                                        borderRadius: 4,
                                    }}
                                    label={translate(
                                        't6bisGestion.tabs.entete.redevableBlock.typeIdentifiant',
                                    )}
                                    selectedValue={this.state.intervenantVO.refTypeDocumentIdentite}
                                    items={this.props.identifiants}
                                    onValueChanged={(value, index) =>
                                        value?.code ? this.onChangeTypeIdentifiant(value.code) : {}
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
                                    disabled={this.props.readOnly}
                                    mode="outlined"
                                    label={translate(
                                        't6bisGestion.tabs.entete.redevableBlock.identifiant',
                                    )}
                                    value={this.state.intervenantVO.numeroDocumentIndentite}
                                    onEndEditing={(event) =>
                                        this.onBlurIdentifiant(event.nativeEvent.text)
                                    }
                                />
                            </Col>
                        </DedRedressementRow>
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
                                            (stringNotEmpty(this.state.intervenantVO.adresse) &&
                                                !this.idNewIntervenant()) ||
                                            this.props.readOnly
                                        }
                                        code="code"
                                        placeholder={translate(
                                            't6bisGestion.tabs.entete.redevableBlock.nationalite',
                                        )}
                                        selected={this.state.intervenantVO.nationaliteFr}
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
                                    value={this.state.intervenantVO.nomIntervenant}
                                    disabled={
                                        (stringNotEmpty(this.state.intervenantVO.adresse) &&
                                            !this.idNewIntervenant()) ||
                                        this.props.readOnly
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
                                    value={this.state.intervenantVO.prenomIntervenant}
                                    disabled={
                                        (stringNotEmpty(this.state.intervenantVO.adresse) &&
                                            !this.idNewIntervenant()) ||
                                        this.props.readOnly
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
                        <View style={CustomStyleSheet.row}>
                            <ComBasicDataTableComp
                                id="PerquiTable"
                                rows={this.state.gibPerquisition?.intervenantsVO}
                                cols={this.cols}
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
                            }))} value={this.state.gibPerquisition?.resultatPerquisition}>
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