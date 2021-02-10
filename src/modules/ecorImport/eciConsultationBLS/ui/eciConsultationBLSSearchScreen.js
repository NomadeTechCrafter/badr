import React from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
/**Custom Components */
import {
    ComBadrButtonIconComp,
    ComBadrDatePickerComp,
    ComBadrItemsPickerComp,
} from '../../../../commons/component';
/** REDUX **/
import { connect } from 'react-redux';
import {
    CONSULTATION_BLS_REQUEST,
    status,
} from '../state/eciConsultationBLSConstants';
import { init, request } from '../state/actions/eciConsultationBLSAction';
/**Styling */
import { CustomStyleSheet } from '../../../../commons/styles/ComThemeStyle';
import style from '../style/eciConsultationBLSStyle';
/** i18n **/
/** Inmemory session */
import { ComSessionService } from '../../../../commons/services/session/ComSessionService';
import translate from '../../../../commons/i18n/ComI18nHelper';
import { row } from '../../../../commons/styles/ComContainersStyle';


class EciConsultationBLSSearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: ComSessionService.getInstance().getLogin(),
            dateBlsDu: '',
            dateBlsAu: '',
            referenceBLS: '',
            etat: '',
        };
    }

    handleSearch = () => {
        let action = this.buildSearchConsultationBLSAction(this.state.login);
        this.props.actions.dispatch(action);
    };

    handleClear = () => {
        this.setState({
            dateBlsDu: '',
            dateBlsAu: '',
            referenceBLS: '',
            etat: '',
        });
    };

    buildInitConsultationBLSAction = () => {
        let action = init({ value: {} });
        return action;
    };

    buildSearchConsultationBLSAction = (login) => {
        let action = request({
            type: CONSULTATION_BLS_REQUEST,
            value: {
                login: login,
                dateBlsDu: this.state.dateBlsDu,
                dateBlsAu: this.state.dateBlsAu,
                referenceBLS: this.state.referenceBLS,
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
        let action = this.buildInitConsultationBLSAction();
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
                                    value={this.state.dateBlsDu}
                                    labelDate={translate('consultationBLS.startDate')}
                                    inputStyle={style.textInputsStyle}
                                    onDateChanged={(date) =>
                                        this.setState({
                                            ...this.state,
                                            dateBlsDu: date,
                                        })
                                    }
                                />
                            </Col>
                            <Col>
                                <ComBadrDatePickerComp
                                    dateFormat="DD/MM/YYYY"
                                    value={this.state.dateBlsAu}
                                    labelDate={translate('consultationBLS.endDate')}
                                    inputStyle={style.textInputsStyle}
                                    onDateChanged={(date) =>
                                        this.setState({
                                            ...this.state,
                                            dateBlsAu: date,
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
                            label={translate('consultationBLS.referenceBLS')}
                            value={this.state.referenceBLS}
                            onChangeText={(text) => this.setState({ referenceBLS: text })}
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
    return { ...state.consultationBLSReducer };
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
)(EciConsultationBLSSearchScreen);
