import React from 'react';
import { ScrollView, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
/**Custom Components */
import {
    ComBadrButtonIconComp,
    ComBadrDatePickerComp,
    ComBadrErrorMessageComp,
    ComBadrItemsPickerComp,
    ComBadrKeyValueComp,
    ComBadrLibelleComp,
    ComBadrNumericTextInputComp,
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

const initialState = {
};

class TiConsultationTIScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            date: new Date(),
            codeIG: '',
            none: '',
            libelleIG: '',
            igIsNotValid: false,
        };
    }

    buildInitConsultationTIAction = () => {
        // if (this.props.route.params.modeConsultation === 'E') {
        //     this.state = {
        //         none: 'none',
        //     };
        // }
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
                "consultationTiMode": 'I', //this.props.route.params.modeConsultation,
                "positionTarifaire": "",
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
            igIsNotValid: false,
        });
    }

    handleSearch = () => {
        if (!_.isEmpty(this.state.codeIG)) {
            let action = this.buildSearchConsultationTIAction();
            this.props.actions.dispatch(action);
            this.setState({
                igIsNotValid: false,
            });
            // console.log('++++++++++++++++++++++++++++++++++++ Begin ++++++++++++++++++++++++++++++++++++++++++');
            // console.log('this.props.leftBlocs : ' + JSON.stringify(this.props.leftBlocs));
            // console.log('+++++++++++++++++++++++++++++++++++++ End ++++++++++++++++++++++++++++++++++++++ ');
            // console.log('++++++++++++++++++++++++++++++++++++ Begin ++++++++++++++++++++++++++++++++++++++++++');
            // console.log('this.props.myBlocs : ' + JSON.stringify(this.props.myBlocs));
            // console.log('+++++++++++++++++++++++++++++++++++++ End ++++++++++++++++++++++++++++++++++++++ ');
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
            items.push(<DataTable.Row key={sousBloc.libelle}>
                <DataTable.Cell style={style.datatableCellWidth}>{sousBloc.libelle}</DataTable.Cell>
                <DataTable.Cell style={style.datatableCellWidth}>{sousBloc.valeur}</DataTable.Cell>
            </DataTable.Row>);
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
                            <DataTable.Cell style={style.datatableCell}>{bloc.title}</DataTable.Cell>
                            <DataTable.Cell style={style.datatableCell}>
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
            <ScrollView>
                <Grid style={style.marginTop20}>
                    <Row size={5}>
                        <Col size={100}>
                            {this.state.igIsNotValid && (
                                <ComBadrErrorMessageComp
                                    message={translate('consultationTI.igChampObligatoire')}
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
                                    <ComBadrNumericTextInputComp
                                    />
                                }
                            />
                        </Col>
                        <Col size={5} />
                    </Row>
                    <Row size={10}>
                        <Col size={5} />
                        <Col size={90}>
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
                        <Col size={1000}>
                            {(this.state.codeIG !== 0 && this.props.myBlocs && this.props.myBlocs.length > 0) && (
                                <View style={style.width100} >
                                    <List.Section style={style.width100}>
                                        <List.Accordion style={style.width100}
                                            title={this.state.libelleIG}>
                                            {this.renderAccordians()}
                                        </List.Accordion></List.Section>
                                </View>
                            )}
                        </Col>
                    </Row>
                </Grid>
            </ScrollView>
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