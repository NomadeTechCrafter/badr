
import React from 'react';
import { Text, View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { TextInput } from 'react-native-paper';
import { ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrButtonComp, ComBadrItemsPickerComp } from '../../../../../../../../commons/component';
import translate from '../../../../../../../../commons/i18n/ComI18nHelper';
import * as T6BISConstantes from "../../../../../../utils/t6bisConstants";
import { isCreation, stringEmpty, validateCin } from "../../../../../../utils/t6bisUtils";
import * as Constantes from '../../../../../state/t6bisGestionConstants';
import styles from "../../../../../style/t6bisGestionStyle";



class T6bisEnteteRedevableSousBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            intervenantVO: !isCreation() && this.props.t6bis.intervenantVO ? this.props.t6bis.intervenantVO : {
                adresse: "",
                prenomIntervenant: ""
            },
            infoCompleted: null,
            newIntervenant: null,
            acNationalite: null,
            readonly: null,
            expanded: false,
            fieldsetcontext: this.props.fieldsetcontext

        };
    }


    handlePaysChanged = (pays) => {
        this.setState({
            acNationalite: pays,
            intervenantVO: {
                ...this.state.intervenantVO,
                nationaliteFr: pays.code
            }
        });
        this.state.intervenantVO.nationaliteFr = pays.code;
        console.log('pays', pays);
        this.checkType();
    };

    componentDidMount = async () => {


    }

    componentWillUnmount() {
        console.log('T6bisEnteteRedevableSousBlock componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };




    isParamSetted = function () {
        if (this.isPasseport()) {
            if (this.state.intervenantVO.numeroDocumentIndentite && this.state.intervenantVO.refTypeDocumentIdentite && this.state.intervenantVO.nationaliteFr) {
                return true;
            }
        } else if (this.state.intervenantVO.numeroDocumentIndentite && this.state.intervenantVO.refTypeDocumentIdentite) {
            return true;
        }
        return false;
    }

    isPasseport = function () {
        if (this.state.intervenantVO) {
            return "05" === this.state.intervenantVO.refTypeDocumentIdentite || "06" === this.state.intervenantVO.refTypeDocumentIdentite || "07" === this.state.intervenantVO.refTypeDocumentIdentite;
        } else {
            return false;
        }
    }

    checkType = function () {
        this.syncIntervenantInfo();
    }

    syncIntervenantInfo = function () {
        if (this.isParamSetted()) {
            this.completeRedevableInfo();
        }
    }

    completeRedevableInfo = function () {
        if (this.isParamSetted()) {
            let data = {
                type: Constantes.FIND_INTERVENANT_REQUEST,
                value: {
                    identifiants: this.buildRedevableCompletionParam()
                }
            }
            this.props.callbackHandler(
                T6BISConstantes.FIND_INTERVENANT_TASK,
                data
            );

        }
    }
    buildRedevableCompletionParam = function () {
        if (this.isPasseport()) {
            return { "typeIdentifiant": this.state.intervenantVO.refTypeDocumentIdentite, "numeroDocumentIdentite": this.state.intervenantVO.numeroDocumentIndentite, "nationalite": this.state.intervenantVO.nationaliteFr };
        } else {
            if (this.state.intervenantVO && this.state.intervenantVO.numeroDocumentIndentite) {
                this.state.intervenantVO.numeroDocumentIndentite = validateCin(this.state.intervenantVO.numeroDocumentIndentite);
            }
            return { "typeIdentifiant": this.state.intervenantVO.refTypeDocumentIdentite, "numeroDocumentIdentite": this.state.intervenantVO.numeroDocumentIndentite };
        }
    }

    confirmer = () => {
        console.log('confirmer', this.state.expanded);
        console.log('confirmer', this.props?.infoCompleted);
        this.state.expanded = (this.props?.infoCompleted) ? this.props.infoCompleted : false;
        console.log('confirmer', this.state.expanded);
    }

    retablir = () => {
        console.log('retablir');
        this.props.t6bis.intervenantVO = {};
        this.setState({
            intervenantVO: {
                refTypeDocumentIdentite: "",
                numeroDocumentIndentite: "",
                nationaliteFr: "",
                nomIntervenant: "",
                prenomIntervenant: "",
                adresse: ""

            }, infoCompleted: false, newIntervenant: false, acNationalite: {}
        });
        console.log(this.state);
    }

    onBlurIdentifiant(text) {
        this.state.intervenantVO = { ...this.state.intervenantVO, numeroDocumentIndentite: text };
        this.checkType();
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

    idNewIntervenant() {
        return (this.state?.newIntervenant === false) ? false : true;
    }

    traiterRetourProps() {
        console.log('TEST Yassine 15022021 out');
        if (this.props?.retourFindIntervenant) {
            console.log('TEST Yassine 15022021 in');
            this.state.intervenantVO = { ...this.state.intervenantVO, ...this.props.t6bis?.intervenantVO };
            this.state.newIntervenant = this.props?.newIntervenant;
            this.props.retourFindIntervenant = false;
        }
    }
    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps----------15022021----------props ', props);
        console.log('getDerivedStateFromProps---------15022021-----------state ', state);

        if (
            props.t6bis?.intervenantVO
        ) {
            return {
                intervenantVO: { ...state.intervenantVO, ...props.t6bis?.intervenantVO },// update the value of specific key
                newIntervenant : props.newIntervenant
            };
        }
        // Return null to indicate no change to state.
        return null;
    }




    render() {
        //this.traiterRetourProps();
        console.log(this.state);
        console.log("this.props.t6bis.codeTypeT6bis : ", this.props.t6bis?.codeTypeT6bis);
        console.log("this.state.intervenantVO : ", this.state.intervenantVO);

        return (


            <ComAccordionComp title={translate('t6bisGestion.tabs.entete.redevableBlock.title')} expanded={false}>
                <View>

                    <Row size={200}>
                        <Col size={30} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.redevableBlock.typeIdentifiant')}
                            </Text>

                        </Col>
                        <Col size={70} style={styles.labelContainer}>
                            <ComBadrItemsPickerComp
                                disabled={this.props.readOnly}
                                style={styles.labelTextStyle}
                                label={translate('t6bisGestion.tabs.entete.redevableBlock.typeIdentifiant')}
                                selectedValue={this.state.intervenantVO.refTypeDocumentIdentite}
                                items={this.props.identifiants}
                                onValueChanged={(value, index) =>
                                    (value?.code) ? this.onChangeTypeIdentifiant(value.code) : {}
                                }
                            />
                        </Col>
                        <Col size={30} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.redevableBlock.identifiant')}
                            </Text>

                        </Col>

                        <Col size={70} style={styles.labelContainer}>
                            <TextInput
                                disabled={this.props.readOnly}
                                mode="outlined"
                                label={translate('t6bisGestion.tabs.entete.redevableBlock.identifiant')}
                                value={this.state.intervenantVO.numeroDocumentIndentite}
                                onEndEditing={(event) => this.onBlurIdentifiant(event.nativeEvent.text)}
                            />
                        </Col>


                    </Row>
                    {this.isPasseport() && (<Row size={200}>
                        <Col size={30} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.redevableBlock.nationalite')}
                            </Text>

                        </Col>

                        <Col size={70} style={styles.labelContainer}>


                            <ComBadrAutoCompleteChipsComp
                                disabled={(stringEmpty(this.state.intervenantVO.adresse) && !this.idNewIntervenant()) || (this.props.readOnly)}
                                code="code"
                                placeholder={translate(
                                    't6bisGestion.tabs.entete.redevableBlock.nationalite'
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
                    </Row>)}
                    <Row size={200}>
                        <Col size={30} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.redevableBlock.nom')}
                            </Text>

                        </Col>

                        <Col size={70} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                label={translate('t6bisGestion.tabs.entete.redevableBlock.nom')}
                                value={this.state.intervenantVO.nomIntervenant}
                                disabled={(stringEmpty(this.state.intervenantVO.adresse) && !this.idNewIntervenant()) || (this.props.readOnly)}
                                onChangeText={(text) =>

                                    (text) ? this.setState({
                                        ...this.state,
                                        intervenantVO: {
                                            ...this.state.intervenantVO,
                                            nomIntervenant: text,
                                        },
                                    }) : {}}
                            />
                        </Col>
                        <Col size={30} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.redevableBlock.prenom')}
                            </Text>

                        </Col>

                        <Col size={70} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                label={translate('t6bisGestion.tabs.entete.redevableBlock.prenom')}
                                value={this.state.intervenantVO.prenomIntervenant}
                                disabled={(stringEmpty(this.state.intervenantVO.adresse) && !this.idNewIntervenant()) || (this.props.readOnly)}
                                onChangeText={(text) =>

                                    (text) ? this.setState({
                                        ...this.state,
                                        intervenantVO: {
                                            ...this.state.intervenantVO,
                                            prenomIntervenant: text,
                                        },
                                    }) : {}
                                }
                            />
                        </Col>


                    </Row>
                    <Row size={200}>

                        <Col size={30} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.redevableBlock.adresse')}
                            </Text>


                        </Col>

                        <Col size={70} style={styles.labelContainer}>

                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                mode="outlined"
                                label={translate('t6bisGestion.tabs.entete.redevableBlock.adresse')}
                                value={this.state.intervenantVO.adresse}
                                disabled={(stringEmpty(this.state.intervenantVO.adresse) && !this.idNewIntervenant()) || (this.props.readOnly)}
                                onChangeText={(text) =>

                                    this.setState({
                                        ...this.state,
                                        intervenantVO: {
                                            ...this.state.intervenantVO,
                                            adresse: text
                                        },
                                    })
                                }
                            />
                        </Col>


                    </Row>

                    {(!this.props.readOnly) && (<Row size={100}>
                        <Col size={100}>
                            {(!this.state.readonly) && (
                                <View style={styles.ComContainerCompBtn}>


                                    <ComBadrButtonComp
                                        style={styles.actionBtn}
                                        onPress={() => {
                                            this.confirmer();
                                        }}
                                        text={translate('t6bisGestion.tabs.entete.buttons.confirmer')}
                                    />
                                    <ComBadrButtonComp
                                        style={styles.actionBtn}
                                        onPress={() => {
                                            this.retablir();
                                        }}
                                        text={translate('t6bisGestion.tabs.entete.buttons.retablir')}
                                    />
                                </View>)}
                        </Col>
                    </Row>)}


                </View>

            </ComAccordionComp>


        );
    }
}






export default T6bisEnteteRedevableSousBlock;
