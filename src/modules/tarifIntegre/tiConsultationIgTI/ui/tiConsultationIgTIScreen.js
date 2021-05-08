import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
/**Custom Components */
import {
    ComBadrButtonIconComp,
    ComBadrErrorMessageComp,
    ComBadrItemsPickerComp,
    ComBadrKeyValueComp,
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
import * as ConsultationIgTIAction from '../state/actions/tiConsultationIgTIAction';
import * as InitConsultationIgTIAction from '../state/actions/tiConsultationIgTIInitAction';
/**Styling */
import style from '../style/tiConsultationIgTIStyle';
/** i18n **/
/** Inmemory session */
import translate from '../../../../commons/i18n/ComI18nHelper';
import { DataTable, List, TextInput } from 'react-native-paper';
import { CONSULTATION_IGTI_REQUEST, INIT_CONSULTATION_IGTI_REQUEST } from '../state/tiConsultationIgTIConstants';
import { ComSessionService } from '../../../../commons/services/session/ComSessionService';
import _ from 'lodash';

const initialState = {
};

class TiConsultationIgTIScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            codeIG: '',
            libelleIG: '',
            igIsNotValid: false,
        };
        ComSessionService.getInstance().setModeConsultation(props.route?.params?.modeConsultation ? props.route?.params?.modeConsultation : 'I');
    }

    buildInitConsultationIgTIAction = () => {
        let action = InitConsultationIgTIAction.request({
            type: INIT_CONSULTATION_IGTI_REQUEST

        });
        return action;
    };

    buildSearchConsultationIgTIAction = () => {
        let action = ConsultationIgTIAction.request({
            type: CONSULTATION_IGTI_REQUEST,
            value: {
                "consultationTypeAction": "consultation_ig",
                "consultationTiMode": this.props.route?.params?.modeConsultation ? this.props.route?.params?.modeConsultation : 'I',
                "infosConsultationTI": this.state.codeIG,
            }
        });
        return action;
    };

    buildInitConsultationIgTIActionInit = () => {
        let action = InitConsultationIgTIAction.init({ value: {} });
        return action;
    };

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            let action1 = this.buildInitConsultationIgTIActionInit();
            this.props.actions.dispatch(action1);
            let action = this.buildInitConsultationIgTIAction();
            this.props.actions.dispatch(action);
            this.setState({
                ...initialState,
                codeIG: '',
                libelleIG: '',
                igIsNotValid: false,
            });
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    handleClear = () => {
        let action1 = this.buildInitConsultationIgTIActionInit();
        this.props.actions.dispatch(action1);
        let action = this.buildInitConsultationIgTIAction();
        this.props.actions.dispatch(action);
        this.setState({
            ...initialState,
            codeIG: '',
            libelleIG: '',
            igIsNotValid: false,
        });
    }

    handleSearch = () => {
        if (!_.isEmpty(this.state.codeIG)) {
            let action = this.buildSearchConsultationIgTIAction();
            this.props.actions.dispatch(action);
            this.setState({
                igIsNotValid: false,
            });
        } else {
            this.handleClear();
            this.setState({
                igIsNotValid: true,
            });
        }
    };

    renderSousBlocs = (bloc) => {
        const items = [];
        for (let sousBloc of bloc.sousBlocsLines) {
            items.push(
                <DataTable.Row key={sousBloc.libelle}>
                    <DataTable.Cell style={style.datatableCell}>
                        <TextInput
                            mode={'outlined'}
                            style={{ width: 400, textAlignVertical: 'top' }}
                            disabled={true}
                            value={sousBloc.libelle}
                            multiline={true}
                            numberOfLines={sousBloc?.valeur?.length / 30}
                        />
                    </DataTable.Cell>
                    <DataTable.Cell style={style.datatableCell}>
                        <TextInput
                            mode={'outlined'}
                            style={{ width: 400, textAlignVertical: 'top' }}
                            disabled={true}
                            value={sousBloc.valeur}
                            multiline={true}
                            numberOfLines={sousBloc?.valeur?.length / 30}
                        />
                    </DataTable.Cell>
                </DataTable.Row>
            );
        }
        return items;
    }

    renderAccordians = () => {
        const items = [];
        if (this.props.myBlocs) {
            for (let bloc of this.props.myBlocs) {
                items.push(
                    <DataTable key={bloc.title} style={style.width100}>
                        <DataTable.Row>
                            <DataTable.Cell style={style.datatableCell}>
                                <TextInput
                                    mode={'outlined'}
                                    style={{ width: 400 }}
                                    disabled={true}
                                    value={bloc.title}
                                    multiline={true}
                                    numberOfLines={bloc?.title?.length / 30}
                                />
                            </DataTable.Cell>
                            <DataTable.Cell>
                                <DataTable>
                                    {this.renderSousBlocs(bloc)}
                                </DataTable>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                );
            }
        }
        return items;
    }

    render() {
        return (
            <View style={style.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={translate('consultationIgTI.mainTitle')}
                    subtitle={translate('consultationIgTI.title')}
                />

                {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
                <ScrollView>
                    <Grid style={style.marginTop20}>
                        <Row size={5}>
                            <Col size={100}>
                                {this.state.igIsNotValid && (
                                    <ComBadrErrorMessageComp
                                        message={translate('consultationIgTI.igChampObligatoire')}
                                    />
                                )}
                            </Col>
                        </Row>
                        <Row size={7}>
                            <Col size={5} />
                            <Col size={90} >
                                <ComBadrKeyValueComp
                                    libelleSize={2}
                                    libelle={translate('consultationIgTI.ig')}
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
                            <Col size={1000}>
                                {(this.state.codeIG !== 0 && this.props.myBlocs && this.props.myBlocs.length > 0) && (
                                    <View style={style.width100} >
                                        <CardBox style={style.cardBox}>
                                            <Accordion
                                                badr
                                                title={this.state.libelleIG}
                                                expanded>
                                                <ScrollView
                                                    style={style.width100}
                                                    ref={(node) => {
                                                        this.horizontalScrollView = node;
                                                    }}
                                                    key="horizontalScrollView"
                                                    horizontal={true}>
                                                    <ScrollView key="verticalScrollView" style={style.width100}>
                                                        {this.renderAccordians()}
                                                    </ScrollView>
                                                </ScrollView>
                                            </Accordion>
                                        </CardBox>
                                    </View>
                                )}
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.consultationIgTIReducer };
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
)(TiConsultationIgTIScreen);