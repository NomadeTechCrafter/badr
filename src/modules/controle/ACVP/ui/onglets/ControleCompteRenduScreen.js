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
} from '../../../../../commons/component';
import React from 'react';

import { Checkbox, TextInput, Text, RadioButton } from 'react-native-paper';
/**i18n */
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

class ControleCompteRenduScreen extends React.Component {
    constructor(props) {
        super(props);
        this.composantTablesColsD17D20 = this.buildComposantsColumnsD17D20();
    }

    componentDidMount() {
        console.log('ENTETE IS LOADING...');
    }

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
        //let listD17D20 = this.props.data?.dedDumSectionEnteteVO?.declarationsTryptique ? this.props.data?.dedDumSectionEnteteVO?.declarationsTryptique : [];
        return (

            <ScrollView>
                {/* Référence déclaration */}
                < ComBadrCardBoxComp noPadding={true} >
                    <Grid>
                        <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={2}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('transverse.bureau')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('transverse.regime')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('transverse.annee')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('transverse.serie')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('transverse.cle')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('transverse.nVoyage')}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={4}>
                                <ComBadrLibelleComp withColor={true}>
                                    {translate('transverse.type')}
                                </ComBadrLibelleComp>
                            </Col>
                        </Row>
                        <Row style={CustomStyleSheet.lightBlueRow}>
                            <Col size={2}>
                                <ComBadrLibelleComp withColor={false}>
                                    {this.state?.refDeclaration?.slice(0, 3)}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                                <ComBadrLibelleComp withColor={false}>
                                    {this.state?.refDeclaration?.slice(3, 6)}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                                <ComBadrLibelleComp withColor={false}>
                                    {this.state?.refDeclaration?.slice(6, 10)}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                                <ComBadrLibelleComp withColor={false}>
                                    {this.state?.refDeclaration?.slice(10, 17)}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                                <ComBadrLibelleComp withColor={false}>
                                    {this.state?.cle}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                                <ComBadrLibelleComp withColor={false}>
                                    {this.state?.numeroVoyage}
                                </ComBadrLibelleComp>
                            </Col>
                            <Col size={4}>
                                <ComBadrLibelleComp withColor={true}>
                                    {this.state?.typeRegime}
                                </ComBadrLibelleComp>
                            </Col>
                        </Row>
                    </Grid>
                </ComBadrCardBoxComp >

                {/* Annotations */}
                < ComBadrCardBoxComp style={styles.cardBox} >
                    <ComAccordionComp title={translate('controle.annotations')}>
                        {this.state?.declaration?.annotation && (
                            <View style={styles.flexDirectionRow}>
                                <Text style={styles.libelleM}>
                                    {this.state?.declaration?.annotation}
                                </Text>
                            </View>
                        )}
                    </ComAccordionComp>
                </ComBadrCardBoxComp >

                {/* Intervention */}
                < ComBadrCardBoxComp noPadding={true} >
                    <ComAccordionComp title={translate('controle.intervention')}>
                        <Grid>
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={2}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.version')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.typeIntervention')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.date')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.acteur')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.commentaire')}
                                    </ComBadrLibelleComp>
                                </Col>
                            </Row>
                            {this.state?.declaration?.autreAnnotationVOs &&
                                this.state?.declaration?.autreAnnotationVOs.map(
                                    (item, index) => (
                                        <Row
                                            key={index}
                                            style={
                                                index % 2 === 0
                                                    ? CustomStyleSheet.lightBlueRow
                                                    : CustomStyleSheet.whiteRow
                                            }>
                                            <Col size={2}>
                                                <ComBadrLibelleComp withColor={false}>
                                                    {item.numeroVersion}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col size={3}>
                                                <ComBadrLibelleComp withColor={false}>
                                                    {item.intervention}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col size={2}>
                                                <ComBadrLibelleComp withColor={false}>
                                                    {item.dateIntervention}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col size={2}>
                                                <ComBadrLibelleComp withColor={false}>
                                                    {item.acteur}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col size={3}>
                                                <ComBadrLibelleComp withColor={false}>
                                                    {item.commentaire}
                                                </ComBadrLibelleComp>
                                            </Col>
                                        </Row>
                                    ),
                                )}
                        </Grid>
                    </ComAccordionComp>
                </ComBadrCardBoxComp >

                {/* Liste des Docs exigibles */}
                < ComBadrCardBoxComp style={styles.cardBox} >
                    <ComAccordionComp title={translate('controle.listDocExigible')}>
                        <Grid>
                            <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={4}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.doc')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={1}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.portee')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={1}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.nArticle')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={1}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.reconnu')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={1}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.consignation')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('controle.decision')}
                                    </ComBadrLibelleComp>
                                </Col>
                            </Row>
                            {this.state?.declaration?.documentAnnexeResultVOs &&
                                this.state?.declaration?.documentAnnexeResultVOs.map(
                                    (item, index) => (
                                        <Row
                                            key={index}
                                            style={
                                                index % 2 === 0
                                                    ? CustomStyleSheet.lightBlueRow
                                                    : CustomStyleSheet.whiteRow
                                            }>
                                            <Col size={4}>
                                                <ComBadrLibelleComp withColor={false}>
                                                    {item.documentAnnexe.libelle}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col size={1}>
                                                <ComBadrLibelleComp withColor={false}>
                                                    {item.documentAnnexe.portee}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col size={1}>
                                                <ComBadrLibelleComp withColor={false}>
                                                    {item.documentAnnexe.numeroOrdreArticle}
                                                </ComBadrLibelleComp>
                                            </Col>
                                            <Col size={1}>
                                                <Checkbox
                                                    color={'#009ab2'}
                                                    status={
                                                        item.documentAnnexe.reconnu
                                                            ? 'checked'
                                                            : 'unchecked'
                                                    }
                                                    disabled={this.state?.isConsultation}
                                                    onPress={() => this.reconnuChange(index)}
                                                />
                                            </Col>
                                            <Col size={1}>
                                                <Checkbox
                                                    status={
                                                        item.documentAnnexe.demandeConsignation
                                                            ? 'checked'
                                                            : 'unchecked'
                                                    }
                                                    disabled={this.state?.isConsultation}
                                                    onPress={() =>
                                                        this.demandeConsignationChange(index)
                                                    }
                                                />
                                            </Col>
                                            <Col size={2}>
                                                <ComBadrLibelleComp withColor={false}>
                                                    {item.decisionMCI}
                                                </ComBadrLibelleComp>
                                            </Col>
                                        </Row>
                                    ),
                                )}
                        </Grid>
                    </ComAccordionComp>
                </ComBadrCardBoxComp >

                {/* Redressement opéré */}
                < ComBadrCardBoxComp style={styles.cardBox} >
                    <ComAccordionComp
                        title={translate('controle.redressementOperes')}>
                        <View>
                            {!_.isEmpty(this.state?.declaration?.redressement) && (
                                <View>
                                    <Text>{this.state?.declaration.redressement}</Text>
                                </View>
                            )}
                            {!_.isEmpty(this.state?.compteRendu) && (
                                <View>
                                    <Text>{this.state?.compteRendu}</Text>
                                </View>
                            )}
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <ComBadrButtonComp
                                    onPress={this.genererCompteRendu}
                                    disabled={this.state?.isConsultation}
                                    text={translate('controle.genererCompte')}
                                />
                            </View>
                        </View>
                    </ComAccordionComp>
                </ComBadrCardBoxComp >

                {/* Observation */}
                < ComBadrCardBoxComp style={styles.cardBox} >
                    <ComAccordionComp title={translate('controle.observation')}>
                        <View>
                            <TextInput
                                placeholder={translate('controle.votreObservation')}
                                value={this.state?.observation}
                                multiline={true}
                                numberOfLines={6}
                                disabled={this.state?.isConsultation}
                                onChangeText={(text) =>
                                    this.setState({ observation: text })
                                }
                            />
                        </View>
                    </ComAccordionComp>
                </ComBadrCardBoxComp >
            </ScrollView>
        );

    }
}

const libelle = {
    fontSize: 14,
    color: '#006acd',
};

const styles = {
    cardBoxInfoDum: {
        flexDirection: 'column',
    },
    cardBox: {
        flexDirection: 'column',
        padding: 0,
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    containerActionBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    libelleS: {
        ...libelle,
        flex: 1,
    },
    libelleM: {
        ...libelle,
        flex: 2,
    },
    libelleL: {
        ...libelle,
        flex: 3,
    },
    decisionContainerRB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#009ab2',
        padding: 8,
        width: 300,
    },
    textRadio: {
        color: '#FFF',
    },
    flexColumn: { flexDirection: 'column' },

    actionBtn: {
        width: 250,
        height: 50,
    },
};


function mapStateToProps(state) {
    return { ...state.controleCommonReducer };
}

export default connect(mapStateToProps, null)(ControleCompteRenduScreen);