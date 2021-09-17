import React from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { HelperText, TextInput } from 'react-native-paper';
import { ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrItemsPickerComp, ComBadrProgressBarComp, ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import * as CtrlAffecterAgentVisiteurAction from '../../state/actions/ctrlAffecterAgentVisiteurAction';
import * as CtrlInitAffecterAgentVisiteurAction from '../../state/actions/ctrlInitAffecterAgentVisiteurAction';
import style from '../../style/ctrlReconnaissanceStyle';
import * as Constants from '../../state/ctrlReconnaissanceConstants';
import { Button } from 'react-native-elements';
import _ from 'lodash';






class AffecterAgentVisiteurMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            affectationAgentVisiteur: props.affectationAgentVisiteur, showErrors: { agentVisieur: false, motif: false }
        };
        this.prepareState();
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        this.reset();
    }
    prepareState = () => {
        let bureau = this.props.affectationAgentVisiteur.refDeclaration.slice(0, 3);
        let regime = this.props.affectationAgentVisiteur.refDeclaration.slice(3, 6);
        let annee = this.props.affectationAgentVisiteur.refDeclaration.slice(6, 10);
        let serie = this.props.affectationAgentVisiteur.refDeclaration.slice(10, 17);
        let cle = this.cleDum(regime, serie);
        let numeroVoyage = this.props.affectationAgentVisiteur.numeroVoyage;



        this.state = {
            ...this.state,
            bureau: bureau,
            regime: regime,
            annee: annee,
            serie: serie,
            cle: cle,
            numeroVoyage: numeroVoyage,

        };


    };

    cleDum = (regime, serie) => {
        let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';

        if (serie.length > 6) {
            if (serie.substring(0, 1) === '0') {
                serie = serie.substring(1, 7);
            }
        }

        let RS = (regime + serie) % 23;
        return alpha.charAt(RS);
    };

    isEmpty = (field) => {
        return _.isEmpty(this.state.affectationAgentVisiteur[field]);
    };
    hasErrors = (field) => {
        return _.isEmpty(this.state.affectationAgentVisiteur[field]) && this.state.showErrors[field];
    };

    affecter = () => {
        if (!this.isEmpty('agentVisieur') && !this.isEmpty('motif')) {

            let action = CtrlAffecterAgentVisiteurAction.request(
                {
                    type: Constants.AFFECTER_AGENT_VISITEUR_REQUEST,
                    value: {
                        affectationAgentVisiteur: this.state.affectationAgentVisiteur

                    },
                }
            );
            this.props.actions.dispatch(action);
            this.setState({ showErrors: { agentVisieur: false, motif: false } });
        } else {
            this.setState({ showErrors: { agentVisieur: this.isEmpty('agentVisieur'), motif: this.isEmpty('motif') } });
        }
    };

    
    /* componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('blur', () => {
            this.reset();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    } */

    reset = () => {
        let action = CtrlInitAffecterAgentVisiteurAction.init(
            {
                type: Constants.INIT_AFFECTER_AGENT_VISITEUR_INIT,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };






    render() {
        return (
            <View style={style.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={translate('reconnaissance.agentVisiteur.title')}
                />
                <ScrollView style={style.innerContainer}
                    keyboardShouldPersistTaps={(this.state.autocompleteDropdownOpen || Platform.OS === 'android') ? 'always' : 'never'}>
                    {this.props.showProgress && (
                        <ComBadrProgressBarComp />
                    )}

                    {this.props.infoMessage != null && (
                        <ComBadrInfoMessageComp message={this.props.infoMessage} />
                    )}

                    {this.props.errorMessage != null && (
                        <ComBadrErrorMessageComp message={this.props.errorMessage} />
                    )}


                    {!this.props.showProgress && (
                        <View>


                            <View>


                                <Grid style={style.referenceCardInfo}>
                                    <Row style={style.referenceTitles}>
                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.bureau')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.regime')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.annee')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.serie')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.cle')}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceTitleLabel}>
                                                {translate('transverse.nVoyage')}
                                            </Text>
                                        </Col>


                                    </Row>

                                    <Row style={style.referenceValues}>
                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.bureau}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.regime}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.annee}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.serie}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.cle}
                                            </Text>
                                        </Col>

                                        <Col>
                                            <Text style={style.referenceValueLabel}>
                                                {this.state.numeroVoyage}
                                            </Text>
                                        </Col>


                                    </Row>
                                </Grid>
                                <Grid>
                                    <Row>
                                        <Col style={style.labelContainer} size={4}>
                                            <Text style={style.labelTextStyle}>
                                                {translate(
                                                    'reconnaissance.agentVisiteur.agentVisiteur',
                                                )}
                                            </Text>


                                        </Col>
                                        <Col style={style.labelContainer} size={1}>
                                            <Text style={style.labelRequiredStyle}>
                                                *
                                            </Text>
                                        </Col>
                                        <Col style={style.labelContainer} size={20}>
                                            <ComBadrItemsPickerComp
                                                disabled={this.props.isModeConsultation}
                                                style={{
                                                    ...style.labelTextStyle,
                                                    borderWidth: 1,
                                                    borderColor: '#696969',
                                                    borderRadius: 4,
                                                }}
                                                label={translate(
                                                    'reconnaissance.agentVisiteur.agentVisiteur',
                                                )}
                                                selectedValue={this.state.affectationAgentVisiteur.agentVisieur}
                                                items={this.props.agentsVisiteur}
                                                onValueChanged={(value, index) =>
                                                    this.setState({
                                                        affectationAgentVisiteur: {
                                                            ...this.state.affectationAgentVisiteur, agentVisieur: value?.code ? value.code : ''
                                                        }, showErrors: {
                                                            ...this.state.showErrors, agentVisieur: value?.code ? false : true
                                                        }
                                                    })

                                                }
                                            />
                                            <HelperText
                                                type="error"
                                                padding="none"
                                                visible={this.hasErrors('agentVisieur')}>
                                                {translate('errors.donneeObligatoire', {
                                                    champ: translate('reconnaissance.agentVisiteur.agentVisiteur'),
                                                })}
                                            </HelperText>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={style.labelContainer} size={4}>
                                            <Text style={style.labelTextStyle}>
                                                {translate(
                                                    'reconnaissance.agentVisiteur.motif',
                                                )}
                                            </Text>


                                        </Col>
                                        <Col style={style.labelContainer} size={1}>
                                            <Text style={style.labelRequiredStyle}>
                                                *
                                            </Text>
                                        </Col>
                                        <Col style={style.labelContainer} size={20}>
                                            <TextInput
                                                mode={'outlined'}
                                                disabled={this.props.isModeConsultation}
                                                style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                                value={this.state.affectationAgentVisiteur.motif}
                                                multiline={true}
                                                numberOfLines={10}
                                                onChangeText={(text) => {
                                                    this.setState({
                                                        affectationAgentVisiteur: {
                                                            ...this.state.affectationAgentVisiteur, motif: text
                                                        }, showErrors: {
                                                             ...this.state.showErrors, motif: _.isEmpty(text)
                                                        }
                                                    });
                                                }}
                                            />
                                            <HelperText
                                                type="error"
                                                padding="none"
                                                visible={this.hasErrors('motif')}>
                                                {translate('errors.donneeObligatoire', {
                                                    champ: translate('reconnaissance.agentVisiteur.motif'),
                                                })}
                                            </HelperText>
                                        </Col>
                                    </Row>
                                    {(!this.props.isModeConsultation) && (<Row size={100}>
                                        <Col size={40} />

                                        <Col size={20}>
                                            <Button agentVisiteur
                                                title={translate('reconnaissance.agentVisiteur.actions.affecterVisiteur')}
                                                type={'solid'}
                                                buttonStyle={style.buttonAction}
                                                onPress={() => this.affecter()} />
                                        </Col>
                                        <Col size={40} />

                                    </Row>)}
                                </Grid>
                            </View>
                        </View>)}
                </ScrollView>
            </View>
        );
    };
}



function mapStateToProps(state) {
    return { ...state.ctrlReconnaissanceReducer };
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
)(AffecterAgentVisiteurMain);
