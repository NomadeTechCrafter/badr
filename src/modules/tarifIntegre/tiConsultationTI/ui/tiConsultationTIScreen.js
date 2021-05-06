import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
/**Custom Components */
import {
    ComBadrButtonIconComp,
    ComBadrDatePickerComp,
    ComBadrErrorMessageComp,
    ComBadrItemsPickerComp,
    ComBadrKeyValueComp,
    ComBadrNumericTextInputComp,
    ComBadrProgressBarComp,
    ComBadrToolbarComp,
} from '../../../../commons/component';
import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBasicDataTableComp,
} from '../../../../commons/component';
/** REDUX **/
import { connect } from 'react-redux';
import * as ConsultationTIAction from '../state/actions/tiConsultationTIAction';
import * as InitConsultationTIAction from '../state/actions/tiConsultationTIInitAction';
/**Styling */
import style from '../style/tiConsultationTIStyle';
/** i18n **/
/** Inmemory session */
import translate from '../../../../commons/i18n/ComI18nHelper';
import { DataTable, List } from 'react-native-paper';
import { CONSULTATION_TI_REQUEST, INIT_CONSULTATION_TI_REQUEST } from '../state/tiConsultationTIConstants';
import _ from 'lodash';
import { remote } from '../../../../old/common/config';

const initialState = {
};


class TiConsultationTIScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            date: new Date(),
            codeIG: '',
            none: false,
            libelleIG: '',
            positionTarifaire: '',
            errorMessage: '',
        };
    }

    buildInitConsultationTIAction = () => {
        let action = InitConsultationTIAction.request({
            type: INIT_CONSULTATION_TI_REQUEST,
        });
        return action;
    };

    buildSearchConsultationTIAction = () => {
        let action = ConsultationTIAction.request({
            type: CONSULTATION_TI_REQUEST,
            value: {
                "consultationTypeAction": "consultation_cn",
                "consultationTiMode": this.props.route?.params?.modeConsultation ? this.props.route?.params?.modeConsultation : 'I',
                "positionTarifaire": this.state.positionTarifaire,
                "fluxConsultationTI": this.state.codeIG,
                "date": this.state.date
            }
        });
        return action;
    };

    buildInitConsultationTIActionInit = () => {
        let action = InitConsultationTIAction.init({ value: {} });
        return action;
    };

    componentDidMount() {
        if (!remote && this.props.route.params.modeConsultation === 'E') {
            this.state = {
                none: true,
            };
        }
        let action = this.buildInitConsultationTIAction();
        this.props.actions.dispatch(action);
    }

    handleClear = () => {
        let action1 = this.buildInitConsultationTIActionInit();
        this.props.actions.dispatch(action1);
        let action = this.buildInitConsultationTIAction();
        this.props.actions.dispatch(action);
        this.setState({
            ...initialState,
            codeIG: '',
            libelleIG: '',
            positionTarifaire: '',
            errorMessage: '',
            date: new Date()
        });
        this.positionTarifaireInput.clear();
    }

    validate = () => {
        let isValid = true;
        if (_.isEmpty(this.state.positionTarifaire)) {
            this.setState({
                errorMessage: translate('consultationTI.ptChampObligatoire'),
            });
            isValid = false;
        }

        if (_.isEmpty(this.state.codeIG)) {
            this.setState({
                errorMessage: translate('consultationTI.fluxChampObligatoire'),
            });
            isValid = false;
        }

        if (!this.state.date) {
            this.setState({
                errorMessage: translate('consultationTI.dateChampObligatoire'),
            });
            isValid = false;
        }
        return isValid;
    }


    handleSearch = () => {
        if (this.validate()) {
            let action = this.buildSearchConsultationTIAction();
            this.props.actions.dispatch(action);
            this.setState({
                errorMessage: '',
            });
        }
    };

    renderSousBlocs = (sousBloc) => {
        const items = [];
        for (let sousBlocsLine of sousBloc.sousBlocsLines) {
            items.push(
                <DataTable.Row key={sousBloc.title}>
                    <DataTable.Cell style={style.datatableCellWidth}>{sousBlocsLine.libelle}</DataTable.Cell>
                    <DataTable.Cell style={style.datatableCellWidth}>
                        {sousBlocsLine.valeur}
                    </DataTable.Cell>
                </DataTable.Row>
            );
        }
        return items;
    }

    renderAccordians = (sousBlocs) => {
        const items = [];
        for (let sousBloc of sousBlocs) {
            items.push(
                <DataTable.Row>
                    <DataTable.Cell style={style.datatableCell}>{sousBloc.title}</DataTable.Cell>
                    <DataTable.Cell style={style.datatableCell}>
                        <DataTable>
                            {this.renderSousBlocs(sousBloc)}
                        </DataTable>
                    </DataTable.Cell>
                </DataTable.Row>);
        }
        return items;
    }

    renderBlocs = () => {
        const items = [];
        if (this.props.myBlocs) {
            for (let bloc of this.props.myBlocs) {
                items.push(
                    <DataTable key={bloc.title} style={style.width100}>
                        <List.Accordion style={style.width100}
                            title={bloc.title}>
                            {this.renderAccordians(bloc.sousBlocs)}
                        </List.Accordion>
                    </DataTable>
                );
            }
        }
        return items;
    }

    renderCodification = (codification) => {
        const items = [];
        items.push(
            <Grid style={style.gridContainer}>
                <Row>
                    <Col style={style.column}>
                        <Text style={style.valueM}>
                            {codification.ingGrp}
                        </Text>
                    </Col>
                    <Col style={style.column}>
                        <Text style={style.valueM}>
                            {codification.code4}
                        </Text>
                    </Col>
                    <Col style={style.column}>
                        <Text style={style.valueM}>
                            {codification.code6}
                        </Text>
                    </Col >
                    <Col style={style.column}>
                        <Text style={style.valueM}>
                            {codification.code8}
                        </Text>
                    </Col >
                    <Col style={style.column}>
                        <Text style={style.valueM}>
                            {codification.code10}
                        </Text>
                    </Col >
                </Row>
            </Grid>
        );
        return items;
    }

    renderDescriptionFrDataTable = (listData) => {
        const items = [];
        for (let line of listData) {
            items.push(
                <DataTable style={style.width100}>
                    <DataTable.Row>
                        <DataTable.Cell style={style.datatableCell}>
                            {this.renderCodification(line.codification)}
                        </DataTable.Cell>
                        <DataTable.Cell style={style.datatableCell}>
                            {/* <TextInput
                                mode={'outlined'}
                                style={{ width: 250, textAlignVertical: 'top' }}
                                disabled={true}
                                value={line.designation}
                                multiline={true}
                                numberOfLines={10}
                            /> */}
                            {line.designation}
                        </DataTable.Cell>
                        <DataTable.Cell style={style.datatableCellMinWidth}>
                            {line.di}
                        </DataTable.Cell>
                        <DataTable.Cell style={style.datatableCellMinWidth}>
                            {line.uqn}
                        </DataTable.Cell>
                        <DataTable.Cell style={style.datatableCellMinWidth}>
                            {line.uc}
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            );
        }
        return items;
    }

    renderDescriptionFr = () => {
        const items = [];
        items.push(
            <List.Accordion style={style.width100}
                title={this.props.descriptionFr.title}>
                <DataTable.Header style={style.width100}>
                    <DataTable.Title style={style.datatableCell}>
                        Codification
                    </DataTable.Title>
                    <DataTable.Title style={style.datatableCell}>
                        Désignation des produits
                    </DataTable.Title>
                    <DataTable.Title style={style.datatableCellMinWidth}>
                        DI
                    </DataTable.Title>
                    <DataTable.Title style={style.datatableCellMinWidth}>
                        UQN
                    </DataTable.Title>
                    <DataTable.Title style={style.datatableCellMinWidth}>
                        UC
                    </DataTable.Title>
                </DataTable.Header>
                {this.renderDescriptionFrDataTable(this.props.descriptionFr.listData)}
            </List.Accordion>
        );
        return items;
    }


    renderDescriptionArDataTable = (listData) => {
        const items = [];
        for (let line of listData) {
            items.push(
                <DataTable style={style.width100}>
                    <DataTable.Row>
                        <DataTable.Cell style={style.datatableCell}>
                            {line.uc}
                        </DataTable.Cell>
                        <DataTable.Cell style={style.datatableCell}>
                            {line.uqn}
                        </DataTable.Cell>
                        <DataTable.Cell style={style.datatableCell}>
                            {line.di}
                        </DataTable.Cell>
                        <DataTable.Cell style={style.datatableCell}>
                            {line.designation}
                        </DataTable.Cell>
                        <DataTable.Cell style={style.datatableCell}>
                            <DataTable>
                                {this.renderCodification(line.codification)}
                            </DataTable>
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            );
        }
        return items;
    }

    renderDescriptionAr = () => {
        const items = [];
        items.push(
            <List.Accordion style={style.width100}
                title={this.props.descriptionAr.title}>
                <DataTable.Header>
                    <DataTable.Title style={style.datatableCell}>
                        الوحدات التكميلية
                    </DataTable.Title>
                    <DataTable.Title style={style.datatableCell}>
                        وحدة الكمية حسب المواصفة
                    </DataTable.Title>
                    <DataTable.Title style={style.datatableCellMinWidth}>
                        رسم الاستيراد
                    </DataTable.Title>
                    <DataTable.Title style={style.datatableCellMinWidth}>
                        نوع البضائع
                    </DataTable.Title>
                    <DataTable.Title style={style.datatableCellMinWidth}>
                        ترميز حسب النظام المنسق
                    </DataTable.Title>
                </DataTable.Header>
                {this.renderDescriptionArDataTable(this.props.descriptionAr.listData)}
            </List.Accordion>
        );
        return items;
    }

    render() {
        return (
            <View style={style.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={translate('consultationTI.mainTitle')}
                    subtitle={translate('consultationTI.positionTarifaire')}
                />

                {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
                <ScrollView>
                    <Grid style={style.marginTop20}>
                        <Row size={5}>
                            <Col size={100}>
                                {this.props.errorMessage != null && (
                                    <ComBadrErrorMessageComp message={this.props.errorMessage} />
                                )}
                            </Col>
                        </Row>
                        <Row size={5}>
                            <Col size={100}>
                                {!this.state.errorMessage != null && (
                                    <ComBadrErrorMessageComp
                                        onClose={() => {
                                            this.setState({ errorMessage: '' });
                                        }}
                                        message={this.state.errorMessage}
                                    />
                                )}
                            </Col>
                        </Row>
                        <Row size={10}>
                            <Col size={5} />
                            <Col size={90} >
                                <ComBadrKeyValueComp
                                    libelleSize={2}
                                    libelle={translate('consultationTI.positionTarifaire')}
                                    children={
                                        <ComBadrNumericTextInputComp value={this.state.positionTarifaire}

                                            onRef={(input) => {
                                                this.positionTarifaireInput = input;
                                            }}
                                            onChangeBadrInput={(pt) =>
                                                this.setState({
                                                    ...this.state,
                                                    positionTarifaire: pt,
                                                })}
                                        />
                                    }
                                />
                            </Col>
                            <Col size={5} />
                        </Row>
                        <Row size={10}>
                            <Col size={5} />
                            <Col size={90} pointerEvents={this.state.none ? 'none' : 'auto'}>
                                <ComBadrKeyValueComp
                                    libelleSize={2}
                                    libelle={translate('consultationTI.date')}
                                    children={
                                        <ComBadrDatePickerComp
                                            dateFormat="DD/MM/YYYY"
                                            value={this.state.date}
                                            onDateChanged={(lDate) =>
                                                this.setState({
                                                    ...this.state,
                                                    date: lDate,
                                                })
                                            }
                                        />
                                    }
                                />
                            </Col>
                            <Col size={5} />
                        </Row>
                        <Row size={10}>
                            <Col size={5} />
                            <Col size={90} >
                                <ComBadrKeyValueComp
                                    libelleSize={2}
                                    libelle={translate('consultationTI.flux')}
                                    children={
                                        <ComBadrItemsPickerComp
                                            label={translate('transverse.choix')}
                                            selectedValue={this.state.codeIG ? this.state.codeIG : ''}
                                            items={this.props.data}
                                            onValueChanged={(value, index) => this.setState({
                                                ...this.state,
                                                ...initialState,
                                                libelleIG: value ? value.libelle : '',
                                                codeIG: value ? value.code : ''
                                            })
                                            }
                                        />
                                    }
                                />
                            </Col>
                            <Col size={5} />
                        </Row>
                        <Row size={10}>
                            <Col size={5} />
                            <Col size={45}>
                                <ComBadrButtonIconComp
                                    onPress={() => this.handleSearch()}
                                    icon="magnify"
                                    style={style.buttonIcon}
                                    loading={this.props.showProgress}
                                    text={translate('transverse.confirmer')}
                                />
                            </Col>
                            <Col size={45}>
                                <ComBadrButtonIconComp
                                    onPress={() => this.handleClear()}
                                    icon="autorenew"
                                    style={style.buttonIcon}
                                    text={translate('transverse.retablir')}
                                />
                            </Col>
                            <Col size={5} />
                        </Row>
                        <Row size={70}>
                            <Col style={style.width100} >
                                {(this.state.codeIG !== 0 && this.props.myBlocs && this.props.myBlocs.length > 0) && (
                                    <View style={style.width100} >
                                        <ScrollView
                                            style={style.width100}
                                            ref={(node) => {
                                                this.horizontalScrollView = node;
                                            }}
                                            key="horizontalScrollView"
                                            horizontal={true}>
                                            <ScrollView key="verticalScrollView" style={style.width100}>
                                                {this.renderDescriptionFr()}
                                                {this.renderDescriptionAr()}
                                                {this.renderBlocs()}
                                            </ScrollView>
                                        </ScrollView>
                                    </View>
                                )}
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>
            </View >
        );
    }
}

function mapStateToProps(state) {
    return { ...state.consultationTIReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TiConsultationTIScreen);