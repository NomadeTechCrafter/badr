import React from 'react';
import { ScrollView, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import _ from 'lodash';
/**Custom Components */
import {
    ComBadrButtonIconComp,
    ComBadrDatePickerComp,
    ComBadrItemsPickerComp,
} from '../../../../commons/component';
/** REDUX **/
import { connect } from 'react-redux';
import {
    RESULTAT_SCANNER_REQUEST,
    suspect,
    typeDeclarations,
} from '../state/ctrlResultatScannerConstants';
import { init, request } from '../state/actions/ctrlResultatScannerAction';
/**Styling */
import { CustomStyleSheet } from '../../../../commons/styles/ComThemeStyle';
import style from '../style/ctrlResultatScannerStyle';
/** i18n **/
/** Inmemory session */
import { ComSessionService } from '../../../../commons/services/session/ComSessionService';
import translate from '../../../../commons/i18n/ComI18nHelper';


class CtrlResultatScannerSearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: ComSessionService.getInstance().getLogin(),
            dateDebut: '',
            dateFin: '',
            resultat: '',
            typeDeclaration: '',
            bureau: '',
            regime: '',
            annee: '',
            serie: '',
            cle: '',
            cleValide: '',
            showErrorMsg: false,
        };
    }

    handleSearch = () => {
        this.setState({ showErrorMsg: true });
        this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie);
        let action = this.buildSearchResultatScannerAction(this.state.login);
        this.props.actions.dispatch(action);
    };

    handleClear = () => {
        this.setState({
            dateDebut: '',
            dateFin: '',
            resultat: '',
            typeDeclaration: '',
            bureau: '309',
            regime: '060',
            annee: '2021',
            serie: '0000179',
            cle: 'L',
            cleValide: '',
            showErrorMsg: false,
        });
    };

    buildInitResultatScannerAction = () => {
        let action = init({ value: {} });
        return action;
    };

    buildSearchResultatScannerAction = (login) => {
        let action = request({
            type: RESULTAT_SCANNER_REQUEST,
            value: {
                login: login,
                dateDebut: this.state.dateDebut,
                dateFin: this.state.dateFin,
                resultat: this.state.resultat,
                typeDeclaration: this.state.typeDeclaration,
                bureau: this.state.bureau,
                regime: this.state.regime,
                annee: this.state.annee,
                serie: this.state.serie,
                cle: this.state.cle,
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


    hasErrors = (field) => {
        return this.state.showErrorMsg && _.isEmpty(this.state[field]);
    };

    isCleValide = () => {
        return this.state.showErrorMsg && this.state.cle !== this.state.cleValide;
    };

    cleDUM = function (regime, serie) {
        let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
        if (serie.length > 6) {
            let firstSerie = serie.substring(0, 1);
            if (firstSerie === '0') {
                serie = serie.substring(1, 7);
            }
        }
        let obj = regime + serie;
        let RS = obj % 23;
        alpha = alpha.charAt(RS);
        return alpha;
    };


    //accept just Number
    onChangeInput = (input) => {
        let keyImput = _.keys(input)[0];
        this.setState({ [keyImput]: input[keyImput].replace(/[^0-9]/g, '') });
    };
    onChangeInputCle = (cle) => {
        this.setState({ cle: cle.replace(/[^A-Za-z]/g, '') });
    };
    addZeros = (input) => {
        let keyImput = _.keys(input)[0];
        if (input[keyImput] !== '') {
            this.setState({
                [keyImput]: _.padStart(input[keyImput], input.maxLength, '0'),
            });
        }
    };

    componentDidMount() {
        let action = this.buildInitResultatScannerAction();
        this.props.actions.dispatch(action);
    }

    onStatusChanged = (v, i) => {
        this.setState({ resultat: v });
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
                                    value={this.state.dateDebut ? moment(this.state.dateDebut, 'DD/MM/yyyy', true) : ''}
                                    labelDate={translate('resultatScanner.startDate')}
                                    inputStyle={style.textInputsStyle}
                                    onDateChanged={(date) =>
                                        this.setState({
                                            ...this.state,
                                            dateDebut: date,
                                        })
                                    }
                                />
                            </Col>
                            <Col>
                                <ComBadrDatePickerComp
                                    dateFormat="DD/MM/YYYY"
                                    value={this.state.dateFin ? moment(this.state.dateFin, 'DD/MM/yyyy', true) : ''}
                                    labelDate={translate('resultatScanner.endDate')}
                                    inputStyle={style.textInputsStyle}
                                    onDateChanged={(date) =>
                                        this.setState({
                                            ...this.state,
                                            dateFin: date,
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                    </View>

                    <View style={CustomStyleSheet.row}>
                        <ComBadrItemsPickerComp
                            style={CustomStyleSheet.column}
                            label={translate('resultatScanner.resultat')}
                            selectedValue={this.state.resultat ? this.state.resultat : ''}
                            items={suspect}
                            onValueChanged={(value, index) => this.setState({
                                ...this.state,
                                resultat: value.code,
                            })}
                        />
                    </View>

                    <View style={CustomStyleSheet.row}>
                        <ComBadrItemsPickerComp
                            style={CustomStyleSheet.column}
                            label={translate('resultatScanner.typeDclaration')}
                            selectedValue={this.state.typeDeclaration ? this.state.typeDeclaration : ''}
                            items={typeDeclarations}
                            onValueChanged={(value, index) => this.setState({
                                ...this.state,
                                typeDeclaration: value.code,
                            })}
                        />
                    </View>

                    <Row>
                        <Col>
                            <TextInput
                                error={this.hasErrors('bureau')}
                                maxLength={3}
                                keyboardType={'number-pad'}
                                value={this.state.bureau}
                                label={translate('transverse.bureau')}
                                onChangeText={(val) => this.onChangeInput({ bureau: val })}
                                onEndEditing={(event) =>
                                    this.addZeros({
                                        bureau: event.nativeEvent.text,
                                        maxLength: 3,
                                    })
                                }
                                style={CustomStyleSheet.largeInput}
                            />
                            <HelperText
                                type="error"
                                padding="none"
                                visible={this.hasErrors('bureau')}>
                                {translate('errors.donneeObligatoire', {
                                    champ: translate('transverse.bureau'),
                                })}
                            </HelperText>
                        </Col>

                        <Col>
                            <TextInput
                                error={this.hasErrors('regime')}
                                maxLength={3}
                                keyboardType={'number-pad'}
                                value={this.state.regime}
                                label={translate('transverse.regime')}
                                onChangeText={(val) => this.onChangeInput({ regime: val })}
                                onEndEditing={(event) =>
                                    this.addZeros({
                                        regime: event.nativeEvent.text,
                                        maxLength: 3,
                                    })
                                }
                                style={CustomStyleSheet.largeInput}
                            />
                            <HelperText
                                type="error"
                                padding="none"
                                visible={this.hasErrors('regime')}>
                                {translate('errors.donneeObligatoire', {
                                    champ: translate('transverse.regime'),
                                })}
                            </HelperText>
                        </Col>

                        <Col>
                            <TextInput
                                error={this.hasErrors('annee')}
                                maxLength={4}
                                keyboardType={'number-pad'}
                                value={this.state.annee}
                                label={translate('transverse.annee')}
                                onChangeText={(val) => this.onChangeInput({ annee: val })}
                                onEndEditing={(event) =>
                                    this.addZeros({
                                        annee: event.nativeEvent.text,
                                        maxLength: 4,
                                    })
                                }
                                style={CustomStyleSheet.largeInput}
                            />
                            <HelperText
                                type="error"
                                padding="none"
                                visible={this.hasErrors('annee')}>
                                {translate('errors.donneeObligatoire', {
                                    champ: translate('transverse.annee'),
                                })}
                            </HelperText>
                        </Col>

                        <Col>
                            <TextInput
                                error={this.hasErrors('serie')}
                                maxLength={7}
                                keyboardType={'number-pad'}
                                value={this.state.serie}
                                label={translate('transverse.serie')}
                                onChangeText={(val) => this.onChangeInput({ serie: val })}
                                onEndEditing={(event) =>
                                    this.addZeros({
                                        serie: event.nativeEvent.text,
                                        maxLength: 7,
                                    })
                                }
                                style={CustomStyleSheet.largeInput}
                            />
                            <HelperText
                                type="error"
                                padding="none"
                                visible={this.hasErrors('serie')}>
                                {translate('errors.donneeObligatoire', {
                                    champ: translate('transverse.serie'),
                                })}
                            </HelperText>
                        </Col>
                        <Col>
                            <TextInput
                                error={this.isCleValide('cle')}
                                maxLength={1}
                                autoCapitalize={'characters'}
                                value={this.state.cle}
                                label={translate('transverse.cle')}
                                onChangeText={(val) => this.onChangeInputCle(val)}
                                style={CustomStyleSheet.mediumInput}
                            />
                            <HelperText
                                type="error"
                                padding="none"
                                style={style.cleHelperMsg}
                                visible={this.isCleValide('cle')}>
                                {translate('errors.cleNotValid', {
                                    cle: this.state.cleValide,
                                })}
                            </HelperText>
                        </Col>
                    </Row>
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
    return { ...state.resultatScannerReducer };
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
)(CtrlResultatScannerSearchScreen);
