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
                libelle: translate('mainlevee.delivrerMainlevee.listeD17D20.reference'),
                width: 180,
            },
            {
                code: 'dateCreation',
                libelle: translate('mainlevee.delivrerMainlevee.listeD17D20.dateCreation'),
                width: 180,
            },
            {
                code: 'numeroVersionCourante',
                libelle: translate('mainlevee.delivrerMainlevee.listeD17D20.numeroVersion'),
                width: 180,
            },
        ];
    };

    render() {
        let annotations = this.props?.compteRenduData?.declaration?.autreAnnotationVOs ? this.props?.compteRenduData?.declaration?.autreAnnotationVOs : [];
        const listD17D20 = [];
        return (
            <ScrollView>
                <ControleRefDeclarationBlock refDeclaration={this.props?.compteRenduData}/>
                {/* Annotations */}
                < ComBadrCardBoxComp style={styles.cardBox} >
                    <ComAccordionComp title={translate('controle.annotations')} expanded={true}>
                        <DedRedressementRow>
                            <TextInput
                                style={styles.flexDirectionRow, styles.libelleM}
                                value={this.props?.compteRenduData?.declaration?.annotation}
                                multiline={true}
                                numberOfLines={6}
                                disabled={this.props?.compteRenduData?.isConsultation}
                                onChangeText={(text) =>
                                    this.setState({ annotation: text })
                                }
                            />
                            {/* <Text style={styles.libelleM}>
                                {this.props?.compteRenduData?.declaration?.annotation}
                            </Text> */}
                        </DedRedressementRow>
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
                    </ComAccordionComp>
                </ComBadrCardBoxComp >

                <ControleListeDocsExigi />

                {/* Redressement opéré */}
                < ComBadrCardBoxComp style={styles.cardBox} >
                    <ComAccordionComp title={translate('controle.redressementOperes')} expanded={true}>
                        <View>
                            <DedRedressementRow>
                                {/* <Text>{this.props?.compteRenduData?.declaration.redressement}</Text> */}
                                <TextInput
                                    mode={'outlined'}
                                    style={styles.flexDirectionRow, styles.libelleM}
                                    value={this.props?.compteRenduData?.declaration?.redressement}
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
                                    onPress={this.genererCompteRendu}
                                    disabled={this.props?.compteRenduData?.isConsultation}
                                    text={translate('controle.genererCompte')}
                                />
                            </View>
                        </View>
                    </ComAccordionComp>
                </ComBadrCardBoxComp >

                {/* Observation */}
                < ComBadrCardBoxComp style={styles.cardBox} >
                    <ComAccordionComp title={translate('controle.observation')} expanded={true}>
                        <View>
                            <TextInput
                                placeholder={translate('controle.votreObservation')}
                                value={this.props?.compteRenduData?.observation}
                                multiline={true}
                                numberOfLines={6}
                                disabled={this.props?.compteRenduData?.isConsultation}
                                onChangeText={(text) =>
                                    this.setState({ observation: text })
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
                            pointerEvents={this.props?.compteRenduData?.isConsultation ? 'none' : 'auto'}>
                            <RadioButton.Group
                                onValueChange={(value) =>
                                    this.setState({ decisionControle: value })
                                }
                                value={this.props?.compteRenduData?.decisionControle}>
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