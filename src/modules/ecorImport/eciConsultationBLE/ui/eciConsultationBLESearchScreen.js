import React from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
/**Custom Components */
import {
    ComBadrButtonIconComp,
    ComBadrDatePickerComp,
    ComBadrItemsPickerComp,
} from '../../../../commons/component';
/** REDUX **/
import { connect } from 'react-redux';
import {
    CONSULTATION_BLE_REQUEST,
    status,
} from '../state/eciConsultationBLEConstants';
import { init, request } from '../state/actions/eciConsultationBLEAction';
/**Styling */
import { CustomStyleSheet } from '../../../../commons/styles/ComThemeStyle';
import style from '../style/eciConsultationBLEStyle';
/** i18n **/
/** Inmemory session */
import { ComSessionService } from '../../../../commons/services/session/ComSessionService';
import translate from '../../../../commons/i18n/ComI18nHelper';
import { row } from '../../../../commons/styles/ComContainersStyle';


class EciConsultationBLESearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: ComSessionService.getInstance().getLogin(),
            dateBleDu: '',
            dateBleAu: '',
            referenceBLE: '',
            etat: '',
        };
    }

    handleSearch = () => {
        let action = this.buildSearchConsultationBLEAction(this.state.login);
        this.props.actions.dispatch(action);
    };

    handleClear = () => {
        this.setState({
            dateBleDu: '',
            dateBleAu: '',
            referenceBLE: '',
            etat: '',
        });
    };

    buildInitConsultationBLEAction = () => {
        let action = init({ value: {} });
        return action;
    };

    buildSearchConsultationBLEAction = (login) => {
        let action = request({
            type: CONSULTATION_BLE_REQUEST,
            value: {
                login: login,
                dateBleDu: this.state.dateBleDu,
                dateBleAu: this.state.dateBleAu,
                referenceBLE: this.state.referenceBLE,
                etat: this.state.etat,
                pageSize: 10,
                offset: 0,
            },
        });
        this.props.navigation.navigate('Resultat', {
            login: this.state.login,
            first: true,
        });
        return action;
    };

    componentDidMount() {
        let action = this.buildInitConsultationBLEAction();
        this.props.actions.dispatch(action);
    }

    onStatusChanged = (v, i) => {
        this.setState({ etat: v });
    };

    render() {
        return (
            <ScrollView>
                <View style={CustomStyleSheet.verticalContainer20}>
                    <View style={CustomStyleSheet.row}>

                        <Row>
                            <Col>
                                <ComBadrDatePickerComp
                                    dateFormat="DD/MM/YYYY"
                                    value={this.state.dateBleDu ? moment(this.state.dateBleDu, 'DD/MM/yyyy', true) : ''}
                                    labelDate={translate('consultationBLE.startDate')}
                                    inputStyle={style.textInputsStyle}
                                    onDateChanged={(date) =>
                                        this.setState({
                                            ...this.state,
                                            dateBleDu: date,
                                        })
                                    }
                                />
                            </Col>
                            <Col>
                                <ComBadrDatePickerComp
                                    dateFormat="DD/MM/YYYY"
                                    value={this.state.dateBleAu ? moment(this.state.dateBleAu, 'DD/MM/yyyy', true) : ''}
                                    labelDate={translate('consultationBLE.endDate')}
                                    inputStyle={style.textInputsStyle}
                                    onDateChanged={(date) =>
                                        this.setState({
                                            ...this.state,
                                            dateBleAu: date,
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                    </View>

                    <View style={CustomStyleSheet.row}>
                        <TextInput
                            style={CustomStyleSheet.column}
                            mode="outlined"
                            label={translate('consultationBLE.referenceBLE')}
                            value={this.state.referenceBLE}
                            onChangeText={(text) => this.setState({ referenceBLE: text })}
                        />
                        <ComBadrItemsPickerComp
                            style={CustomStyleSheet.column}
                            label={translate('controleApresScanner.search.etatChargement.typeListe')}
                            selectedValue={this.state.etat ? this.state.etat : ''}
                            items={status}
                            onValueChanged={(value, index) => this.setState({
                                ...this.state,
                                etat: value.code,
                            })}
                        />
                    </View>
                </View>

                <Grid>
                    <Row>
                        <Col size={20} />
                        <Col size={30}>
                            <ComBadrButtonIconComp
                                onPress={() => this.handleSearch()}
                                icon="magnify"
                                style={style.buttonIcon}
                                loading={this.props.showProgress}
                                text={translate('transverse.rechercher')}
                            />
                        </Col>
                        <Col size={30}>
                            <ComBadrButtonIconComp
                                onPress={() => this.handleClear()}
                                icon="autorenew"
                                style={style.buttonIcon}
                                text={translate('transverse.retablir')}
                            />
                        </Col>
                        <Col size={20} />
                    </Row>
                </Grid>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.consultationBLEReducer };
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
)(EciConsultationBLESearchScreen);
