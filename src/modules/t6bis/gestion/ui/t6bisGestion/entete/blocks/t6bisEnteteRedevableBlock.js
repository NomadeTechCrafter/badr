
import React from 'react';
import { Text, View } from 'react-native';
import { ComAccordionComp, ComBadrAutoCompleteChipsComp,  ComBadrItemsPickerComp } from '../../../../../../../commons/component';
import styles from "../../../../style/t6bisGestionStyle";
import translate from '../../../../../../../commons/i18n/ComI18nHelper';
import { Col, Row } from 'react-native-easy-grid';
import * as Constantes from '../../../../state/t6bisGestionConstants';
import { validateCin } from "../../../../../utils/t6bisUtils";
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';


const VIEW_CALLBACK_ENUMS = {
    FIND_INTERVENANT_TASK: 'ENTETE_REDEVABLE/FIND_INTERVENANT_TASK'
};

class T6bisEnteteRedevableBlock extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            intervenantVO: this.props?.intervenantVO ? this.props.intervenantVO : {},
            infoCompleted: null,
            newIntervenant: null,
            acNationalite: null,
            nationaliteFr:null
        };
    }


    handlePaysProvChipsChanged = (pays) => { 
        console.log('pays', pays);
    };
    componentDidMount = async () => {


    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };


    componentDidUpdate(prevProps, prevState) {
        /* if (this.state.value > prevState.value) {
        } */
        console.log('this.prevState.intervenantVO', this.prevState?.intervenantVO);
        console.log('this.state.intervenantVO', this.state.intervenantVO);
        this.checkType();
    }

    isParamSetted = function (code) {
        console.log('isParamSetted ', this.state);
        if (this.isPasseport()) {
            if (this.state.intervenantVO.numeroDocumentIndentite && this.state.intervenantVO.refTypeDocumentIdentite && this.state.intervenantVO.nationaliteFr) {
                console.log('true');
                return true;
            }
        } else if (this.state.intervenantVO.numeroDocumentIndentite && this.state.intervenantVO.refTypeDocumentIdentite) {
            console.log('true');
            return true;
        }
        console.log('isParamSetted  false');
        return false;
    }

    isPasseport = function () {
        console.log('isPasseport ', this.state);
        if (this.state.intervenantVO) {
            console.log("05" === this.state.intervenantVO.refTypeDocumentIdentite || "06" === this.state.intervenantVO.refTypeDocumentIdentite || "07" === this.state.intervenantVO.refTypeDocumentIdentite);
            return "05" === this.state.intervenantVO.refTypeDocumentIdentite || "06" === this.state.intervenantVO.refTypeDocumentIdentite || "07" === this.state.intervenantVO.refTypeDocumentIdentite;
        } else {
            console.log('false');
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
            console.log('this.state.componentDidMount', this.state);
            console.log('this.props.componentDidMount', this.props);
            let data = {
                type: Constantes.FIND_INTERVENANT_REQUEST,
                value: {
                    identifiants: this.buildRedevableCompletionParam()
                }
            }
            this.props.callbackHandler(
                VIEW_CALLBACK_ENUMS.FIND_INTERVENANT_TASK,
                data
            );

            console.log('T6bisEnteteRedevableBlock, this.state.componentDidMount');
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
        console.log('confirmer');
    }

    retablir = () => {
        console.log('retablir');
    }



    render() {

        console.log('this.state Redevable', this.state);
        console.log('this.props Redevable block ***************************************************************************', this.props);
        console.log('this.t6bis Redevable block', this.props.t6bis);
        console.log('this.identifiants Redevable block', this.props.identifiants);

        return (


            <View>
                <ComAccordionComp title={translate('t6bisGestion.tabs.entete.redevableBlock.title')} expanded={false}>
                    <View>
                        <Row size={100}>
                            <Col size={100} style={styles.labelContainer}>
                                {/* <ComBadrItemsPickerComp
                                    label={translate('t6bisGestion.tabs.entete.redevableBlock.typeIdentifiant')}
                                    selectedValue={this.state.intervenantVO.refTypeDocumentIdentite}
                                    items={this.props.identifiants}
                                    onValueChanged={(value, index) =>
                                        (value?.code) ? this.setState({
                                            ...this.state,
                                            intervenantVO: {
                                                ...this.state.intervenantVO,
                                                refTypeDocumentIdentite: value.code,
                                            },
                                        }) : {}
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
                                    mode="outlined"
                                    label={translate('t6bisGestion.tabs.entete.redevableBlock.identifiant')}
                                    value={this.state.intervenantVO.numeroDocumentIndentite}
                                    onChangeText={(text) =>

                                        (text) ? this.setState({
                                            ...this.state,
                                            intervenantVO: {
                                                ...this.state.intervenantVO,
                                                numeroDocumentIndentite: text,
                                            },
                                        }) : {}
                                    }
                                />
                            </Col>

                               
                        </Row>
                        {!this.isPasseport() && (<Row>
                            <Col size={30} style={styles.labelContainer}>
                                <Text style={styles.labelTextStyle}>
                                    {translate('t6bisGestion.tabs.entete.redevableBlock.nationalite')}
                                </Text>

                            </Col>
 
                            <Col size={70} style={styles.labelContainer}>*/}
                                {/* <ComBadrAutoCompleteComp
                                    onRef={(ref) => (this.cmbPays = ref)}
                                    key="cmbPays"
                                    placeholder={translate(
                                        't6bisGestion.tabs.entete.redevableBlock.nationalite',
                                    )}
                                    initialValue={
                                        this.state.intervenantVO.nationaliteFr
                                            ? this.state.intervenantVO.nationaliteFr
                                            : ''
                                    }
                                    handleSelectItem={(item, id) => 
                                        
                                        this.setState({ acNationalite: item })
                                
                                    }
                                    command="getCmbPays"
                                    disabled={this.state.intervenantVO.nationaliteFr && !this.state.newIntervenant}
                                /> */}
                                
                                <ComBadrAutoCompleteChipsComp
                                    disabled={this.state.intervenantVO.nationaliteFr && !this.state.newIntervenant}
                                    code="code"
                                    placeholder={translate(
                                        't6bisGestion.tabs.entete.redevableBlock.nationalite'
                                    )}
                                    selected={this.state.nationaliteFr}
                                    maxItems={3}
                                    libelle="libelle"
                                    command="getCmbPays"
                                    paramName="libellePays"
                                    onDemand={true}
                                    searchZoneFirst={false}
                                    onValueChange={this.handlePaysProvChipsChanged}
                                />
                            </Col>
                        {/* </Row>)}
                        <Row size={100}>
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
                                    disabled={this.state.intervenantVO.nomIntervenant && !this.state.newIntervenant}
                                    onChangeText={(text) =>

                                        (text) ? this.setState({
                                            ...this.state,
                                            intervenantVO: {
                                                ...this.state.intervenantVO,
                                                nomIntervenant: text,
                                            },
                                        }) : {}
                                    }
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
                                    disabled={this.state.intervenantVO.prenomIntervenant && !this.state.newIntervenant}
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
                        <Row size={100}>
                            
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
                                    disabled={this.state.intervenantVO.adresse && !this.state.newIntervenant}
                                    onChangeText={(text) =>

                                        (text) ? this.setState({
                                            ...this.state,
                                            intervenantVO: {
                                                ...this.state.intervenantVO,
                                                adresse: text,
                                            },
                                        }) : {}
                                    }
                                />
                            </Col>


                        </Row> */}
                        
                       {/*  <Row size={100}>
                            <Col size={100}>
                                {(this.state.selectedTypeCode) && (
                                    <View style={styles.ComContainerCompBtn}>


                                        <ComBadrButtonComp
                                            style={styles.actionBtn}
                                            onPress={() => {
                                                this.confirm();
                                            }}
                                            text={translate('t6bisCreation.t6bisCreation.buttons.valider')}
                                        />
                                        <ComBadrButtonComp
                                            style={styles.actionBtn}
                                            onPress={() => {
                                                this.abandonner();
                                            }}
                                            text={translate('t6bisCreation.t6bisCreation.buttons.abandonner')}
                                        />
                                    </View>)}
                            </Col> */}
                        </Row>

                    </View>



                </ComAccordionComp>

            </View>









        );
    }
}






export default T6bisEnteteRedevableBlock;

export {
    VIEW_CALLBACK_ENUMS as CALLBACK_ENUMS
};