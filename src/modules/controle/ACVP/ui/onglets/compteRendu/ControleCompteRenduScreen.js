import {
    ComContainerComp,
    ComBadrCardBoxComp,
    ComAccordionComp,
    ComBadrButtonComp,
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrProgressBarComp,
    ComBadrToolbarComp,
    ComBadrLibelleComp,
    ComBadrButtonIconComp,
    ComBasicDataTableComp,
} from '../../../../../../commons/component';
import React from 'react';

import { Checkbox, TextInput, Text, RadioButton } from 'react-native-paper';
/**i18n */
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView, View } from 'react-native';
import ControleRefDeclarationBlock from './blocks/controleRefDeclarationBlock';
import styles from '../../../style/controleStyle';
import ControleListeDocsExigi from './blocks/controleListeDocsExigi';
import DedRedressementRow from '../../../../../dedouanement/redressement/ui/common/DedRedressementRow';

const Tab = createMaterialTopTabNavigator();

class ControleCompteRenduScreen extends React.Component {
    constructor(props) {
        super(props);
        this.composantTablesColsD17D20 = this.buildComposantsColumnsD17D20();
        this.composantTablesColsAnnotations = this.buildComposantsColumnsAnnotations();
    }

    componentDidMount() {
    }

    buildComposantsColumnsAnnotations = () => {
        return [
            {
                code: 'numeroVersion',
                libelle: translate('controle.version'),
                width: 150,
            },
            {
                code: 'intervention',
                libelle: translate('controle.typeIntervention'),
                width: 180,
            },
            {
                code: 'dateIntervention',
                libelle: translate('controle.date'),
                width: 180,
            },
            {
                code: 'acteur',
                libelle: translate('controle.acteur'),
                width: 180,
            },
            {
                code: 'commentaire',
                libelle: translate('controle.commentaire'),
                width: 180,
            }
        ];
    };

    buildComposantsColumnsD17D20 = () => {
        return [
            {
                code: 'referenceEnregistrement',
                libelle: translate('controle.reference'),
                width: 180,
            },
            {
                code: 'dateCreation',
                libelle: translate('controle.dateCreation'),
                width: 180,
            },
            {
                code: 'numeroVersionCourante',
                libelle: translate('controle.numeroVersion'),
                width: 180,
            },
        ];
    };

    updateObservation = (text) => {
        if (this.props?.controleVo) {
            this.props.controleVo.observation = text;
        }
        this.setState({ etat: true });


    }

    updateDecision = (text) => {
        if (this.props?.controleVo) {
            this.props.controleVo.decisionControle = text;
        }
        this.props.updateControle();
        this.setState({ etat: true });

    }

    render() {

        let circuit = ''
        switch (this.props?.declaration?.decision) {
            case 'AC':
                circuit = 'Orange';
                break;
            case 'VP':
                circuit = 'Rouge';
                break;
            case 'VI':
                circuit = 'Rouge';
                break;

            default:
                break;
        }

        const refDeclaration = this.props?.refDeclaration ? this.props?.refDeclaration : '';
        const declaration = this.props?.controleVo ? this.props?.controleVo : '';
        let annotations = this.props?.controleVo?.autreAnnotationVOs ? this.props?.controleVo?.autreAnnotationVOs : [];
        let listeDocs = this.props?.controleVo?.documentAnnexeResultVOs ? this.props?.controleVo?.documentAnnexeResultVOs : [];
        const listD17D20 = this.props?.controleVo?.declarationsTryptique ? this.props?.controleVo?.declarationsTryptique : [];
        return (
            <ScrollView>
                <ControleRefDeclarationBlock refDeclaration={refDeclaration} declaration={declaration} />
                {/* Annotations */}
                < ComBadrCardBoxComp style={styles.cardBox} >
                    <ComAccordionComp title={translate('controle.annotations')} expanded={true}>
                        <DedRedressementRow>
                            <TextInput
                                style={styles.flexDirectionRow, styles.libelleM}
                                value={this.props?.controleVo?.annotation}
                                multiline={true}
                                numberOfLines={6}
                                disabled={true}

                            />

                        </DedRedressementRow>
                        {(annotations && annotations.length > 0) &&
                            <ComBasicDataTableComp
                                badr
                                onRef={(ref) => (this.badrComposantsTable = ref)}
                                ref="_badrTable"
                                hasId={false}
                                id="idComposant"
                                rows={annotations}
                                cols={this.composantTablesColsAnnotations}
                                totalElements={
                                    annotations?.length
                                        ? annotations?.length
                                        : 0
                                }
                                maxResultsPerPage={5}
                                paginate={true}
                            />
                        }
                    </ComAccordionComp>
                </ComBadrCardBoxComp >

                <ControleListeDocsExigi listeDocs={listeDocs} isConsultation={this.props?.isConsultation} isRegimeSuspensif={this.props?.controleVo?.isRegimeSuspensif} updateControle={this.props.updateControle} />

                {/* Redressement opéré */}
                < ComBadrCardBoxComp style={styles.cardBox} >
                    <ComAccordionComp title={translate('controle.redressementOperes')} expanded={true}>
                        <View>
                            <DedRedressementRow>
                                {/* <Text>{this.props?.controleVo.redressement}</Text> */}
                                <TextInput
                                    mode={'outlined'}
                                    style={styles.flexDirectionRow, styles.libelleM}
                                    value={this.props?.reponseData}
                                    multiline={true}
                                    numberOfLines={6}
                                    disabled={true}
                                    scrollEnabled={true}
                                // onChangeText={(text) =>
                                //     this.setState({ annotation: text })
                                // }
                                />
                            </DedRedressementRow>
                            {/* <DedRedressementRow>
                                <Text>{this.props?.compteRenduData?.compteRendu}</Text>
                                <TextInput
                                    style={styles.flexDirectionRow, styles.libelleM}
                                    value={this.props?.compteRenduData?.compteRendu}
                                    multiline={true}
                                    numberOfLines={6}
                                    disabled={true}
                                onChangeText={(text) =>
                                    this.setState({ annotation: text })
                                }
                                />
                            </DedRedressementRow> */}
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <ComBadrButtonComp
                                    onPress={() => this.props.genererCompteRendu()}
                                    disabled={this.props?.isConsultation}
                                    text={translate('controle.genererCompte')}
                                />
                            </View>
                        </View>
                    </ComAccordionComp>
                </ComBadrCardBoxComp >

                {/* Observation */}
                < ComBadrCardBoxComp style={styles.cardBox} >
                    <ComAccordionComp title={circuit === 'Rouge' ? translate('controle.certificatDeVisite') : translate('controle.observation')} expanded={true}>
                        <View>
                            <TextInput
                                placeholder={translate('controle.votreObservation')}
                                value={this.props?.controleVo?.observation}
                                multiline={true}
                                numberOfLines={6}
                                disabled={this.props?.isConsultation}
                                onChangeText={(text) => this.updateObservation(text)
                                    //this.setState({ observation: text })  
                                }
                                onEndEditing={(event) => {
                                    this.updateObservation(event.nativeEvent.text);
                                    this.props.updateControle();
                                    this.setState({ etat: true });
                                }



                                }
                            />
                        </View>
                    </ComAccordionComp>
                </ComBadrCardBoxComp >



                {/* Décision */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                    <ComAccordionComp title={translate('controle.decision')} expanded={true}>
                        <View
                            style={styles.flexColumn}
                            pointerEvents={this.props?.isConsultation ? 'none' : 'auto'}>
                            <RadioButton.Group
                                onValueChange={(value) =>
                                    this.updateDecision(value)
                                }
                                value={this.props?.controleVo?.decisionControle}>
                                <View style={styles.decisionContainerRB}>
                                    <Text style={styles.textRadio}>
                                        {translate('controle.controleConforme')}
                                    </Text>
                                    <RadioButton
                                        color={styles.textRadio.color}
                                        value="controleConforme"
                                    />
                                </View>
                                <View style={styles.decisionContainerRB}>
                                    <Text style={styles.textRadio}>
                                        {translate('controle.redressementContentieux')}
                                    </Text>
                                    <RadioButton
                                        color={styles.textRadio.color}
                                        value="contencieux"
                                    />
                                </View>
                                <View style={styles.decisionContainerRB}>
                                    <Text style={styles.textRadio}>
                                        {translate('controle.redressementSansContentieux')}
                                    </Text>
                                    <RadioButton
                                        color={styles.textRadio.color}
                                        value="sansContencieux"
                                    />
                                </View>
                            </RadioButton.Group>
                        </View>
                    </ComAccordionComp>
                </ComBadrCardBoxComp>

                {/* Liste des D17/D20 */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                    <ComAccordionComp title={translate('etatChargement.listeD17D20')} expanded={true}>
                        <View style={styles.container}>
                            <Text style={styles.nombreResult, styles.libelle}>
                                {translate('etatChargement.nombreD17D20')} :
                                <Text style={styles.libelle}>
                                    {'    ' + listD17D20?.length}
                                </Text>
                            </Text>
                            <DedRedressementRow zebra={true}>
                                <ComBasicDataTableComp
                                    badr
                                    onRef={(ref) => (this.badrComposantsTable = ref)}
                                    ref="_badrTable"
                                    hasId={false}
                                    id="idComposant"
                                    rows={listD17D20}
                                    cols={this.composantTablesColsD17D20}
                                    totalElements={
                                        listD17D20?.length
                                            ? listD17D20?.length
                                            : 0
                                    }
                                    maxResultsPerPage={5}
                                    paginate={true}
                                />
                            </DedRedressementRow>
                        </View>
                    </ComAccordionComp>
                </ComBadrCardBoxComp>


            </ScrollView>
        );

    }
}



// function mapStateToProps(state) {
//     return { ...state.controleCommonReducer };
// }

export default connect(null, null)(ControleCompteRenduScreen);