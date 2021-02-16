
import React from 'react';
import { Text, View } from 'react-native';
import { ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrButtonComp } from '../../../../../../../../commons/component';
import styles from "../../../../../style/t6bisGestionStyle";
import translate from '../../../../../../../../commons/i18n/ComI18nHelper';
import { Col, Row } from 'react-native-easy-grid';
import * as T6BISConstantes from "../../../../../../utils/t6bisConstants";
import * as Constantes from '../../../../../state/t6bisGestionConstants';
import * as T6bisGetCmbOperateurByCodeAction from '../../../../../state/actions/t6bisGetCmbOperateurByCodeAction';



class T6bisEnteteRedevableOpeSousBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            readonly: null,
            acOperateur: null,
            fieldsetcontext: this.props.fieldsetcontext

        };
    }



    handleOperateurChanged = (operateur) => {
        this.setState({
            acOperateur: operateur,
            fieldsetcontext: { ...this.state.fieldsetcontext, operateur: operateur }
        });
        this.props.t6bis.identifiantOperateur = operateur.code;
        let data = {


            fieldsetcontext: {
                'operateur': operateur
            }
        }
        this.props.callbackHandler(
            T6BISConstantes.UPDATE_INTERVENANT_TASK,
            data
        );

    };
    /* componentDidMount = () => {
        console.log('componentDidMount ', this.props.t6bis?.identifiantOperateur)
        if (this.props.t6bis?.identifiantOperateur) { 
            let dataToAction = {
                type: Constantes.T6BIS_GESTION_GET_CMB_OPERATEUR_BY_CODE_REQUEST,
                value: {
                    codeUnite: this.props.t6bis?.identifiantOperateur
                }
            };
            console.log(this.props.actions);

            this.props.actions.dispatch(T6bisGetCmbOperateurByCodeAction.request(dataToAction));
        }



    } */
    componentDidMount = async () => {
        console.log('----------------------------------------------------------------------------------------16022021---          ----', this.props);
        if (this.props.t6bis?.identifiantOperateur) {
            let action = await T6bisGetCmbOperateurByCodeAction.request({
                type: Constantes.T6BIS_GESTION_GET_CMB_OPERATEUR_BY_CODE_REQUEST, value: { idOperateur: this.props.t6bis?.identifiantOperateur }
            });
            this.props.actions.dispatch(action);


        }
    }


    componentWillUnmount() {
        console.log('T6bisEnteteRedevableOpeSousBlock componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };

    confirmer = () => {
        console.log('confirmer', this.state.expanded);
        console.log('confirmer', this.props?.infoCompleted);
        this.state.expanded = (this.props?.infoCompleted) ? this.props.infoCompleted : false;
        console.log('confirmer', this.state.expanded);
    }

    retablir = () => {
        console.log('retablir');
        this.props.t6bis.identifiantOperateur = '';
        this.setState({
            acOperateur: null
        });
        this.setState({
            fieldsetcontext: {
                'operateur': null
            }
        });
        console.log(this.state);
    }








    render() {
        console.log(this.state);
        console.log("this.props.t6bis.codeTypeT6bis :                                               ", this.props.t6bis?.codeTypeT6bis);
        console.log("this.props.t6bis.codeTypeT6bis :                                               ", this.props);
        console.log("this.props.t6bis.codeTypeT6bis :                                               ", this.props.fieldsetcontext?.operateur);

        return (


            <ComAccordionComp title={translate('t6bisGestion.tabs.entete.redevableBlock.title')} expanded={this.state.expanded}>
                <View>


                    <Row size={200}>
                        <Col size={30} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.redevableBlock.operateur')}
                            </Text>

                        </Col>

                        <Col size={70} style={styles.labelContainer}>


                            <ComBadrAutoCompleteChipsComp
                                placeholder={translate(
                                    't6bisGestion.tabs.entete.redevableBlock.choisirValeur'
                                )}
                                code="code"
                                disabled={this.props.readOnly}
                                selected={this.props.fieldsetcontext?.operateur?.libelle}
                                maxItems={3}
                                libelle="libelle"
                                command="getCmbOperateur"
                                onDemand={true}
                                searchZoneFirst={false}
                                onValueChange={this.handleOperateurChanged}
                            />
                        </Col>
                    </Row>

                    <Row size={100}>
                        <Col size={100}>
                            {(!this.props.readOnly) && (
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
                    </Row>

                </View>

            </ComAccordionComp>


        );
    }
}






export default T6bisEnteteRedevableOpeSousBlock;

