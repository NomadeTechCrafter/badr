import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { ScrollView, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
    ComBadrPickerCheckerComp,
    ComBadrCardBoxComp,
    ComBadrErrorMessageComp,
    ComBadrInfoMessageComp,
    ComBadrLibelleComp,
    ComBadrProgressBarComp,
    ComContainerComp,
    ComBadrDatePickerComp,
    ComBadrItemsPickerComp,
    ComBadrButtonComp
} from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { RESET_AVITAILLEMENTENTREE_TASK } from '../../../utils/actifsConstants';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { unitesMesure } from '../../state/actifsRapportCreationConstants';





class ActifsRapportAvitaillementEntreeBlock extends React.Component {
    defaultState = {
        navigationAvitaillementEntreeModel: {
            numBonLivraison: '',
            dateLivraison: '',
            heureLivraison: '',
            immatriculationCamion: '',
            immatriculationCiterne: '',
            numRCFourn: '',
            centreRCFourn: '',
            raisonSocialeFournisseur: '',
            nature: '',
            quantiteReceptionne: '',
            uniteMesure: '',
            volumeAppEnvoye: '',
            volumeAppReceptionne: '',
            coeffConvert: '',
            volume15Recep: '',
            densite15: '',
            temperature: '',
            valeurEcart: '',
            observations: ''
        }
    };

    constructor(props) {
        console.log('++++++++++++++++++++++++++++++++++++++++++++++');
        console.log(JSON.stringify(props));
        super(props);
        this.state = {
            navigationAvitaillementEntreeModel: this.props.navigationAvitaillementEntreeModel,
            errorMessage: null
        };

    }


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    reset = () => {
    };

    confirmer = () => {
        if (!this.checkRequiredFields()) {
            this.props.push(this.state.navigationAvitaillementEntreeModel);
        }
    }


    checkRequiredFields = () => {

        let params = { msg: '', required: false }
        this.checkRequiredFieldsNavigAvitaillementEntree(params);

        if (params.required) {
            let message = translate('actifsCreation.avitaillementEntree.champsObligatoires') + params.msg;
            this.setState({
                errorMessage: message
            });
        } else {
            this.setState({
                errorMessage: null
            });

        }
        return params.required;


    }

    checkRequiredFieldsNavigAvitaillementEntree = (params) => {
        let modele = this.state.navigationAvitaillementEntreeModel;
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log(JSON.stringify(modele));
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        if (_.isEmpty(modele.bonLivraison)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.bonLivraison');
        }

        if (_.isEmpty(modele.dateLivraison)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.dateLivraison');
        }

        if (_.isEmpty(modele.heureLivraison)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.heureLivraison');
        }

        if (_.isEmpty(modele.immatriculationCamion)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.immatriculationCamion');
        }

        if (_.isEmpty(modele.immatriculationCiterne)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.immatriculationCiterne');
        }

        if (_.isEmpty(modele.raisonSocialeFournisseur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.raisonSocialeFournisseur');
        }

        if (_.isEmpty(modele.natureProduit)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.natureProduit');
        }

        if (_.isEmpty(modele.dateReception?.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.dateReception');
        }

        if (_.isEmpty(modele.heureReception?.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.heureReception');
        }

        if (_.isEmpty(modele.uniteMesure)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.uniteMesure');
        }

        if (_.isEmpty(modele.volumentApparentEnvoye)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.volumentApparentEnvoye');
        }

        if (_.isEmpty(modele.volumentApparentReceptionne)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.volumentApparentReceptionne');
        }

        if (_.isEmpty(modele.coefficientConvertion)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.coefficientConvertion');
        }

        if (_.isEmpty(modele.volumeA15)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.volumeA15');
        }

        if (_.isEmpty(modele.densiteA15)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.densiteA15');
        }

        if (_.isEmpty(modele.poidsReceptione)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.poidsReceptione');
        }

        if (_.isEmpty(modele.temperature)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.temperature');
        }

        if (_.isEmpty(modele.ecart)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.ecart');
        }

        if (_.isEmpty(modele.observations)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementEntree.main.observations');
        }

    }

    // updateModelNavigationAvitaillementEntree = (modele) => {
    //     // console.log('*******************************************************');
    //     // console.log(JSON.stringify(modele));
    //     // console.log('*******************************************************');
    //     this.setState({
    //         navigationAvitaillementEntreeModel: modele
    //     });
    // }

    retablir = () => {
        // this.props.callbackHandler(RESET_AVITAILLEMENTENTREE_TASK);
        console.log('retablir');
        this.setState({ ...this.defaultState });
    }

    update = () => {
    }

    // static getDerivedStateFromProps(props, state) {

    //     if (
    //         props.navigationAvitaillementEntreeModel && props.index !== state.index
    //     ) {
    //         return {
    //             navigationAvitaillementEntreeModel: props.navigationAvitaillementEntreeModel,// update the value of specific key
    //             index: props.index
    //         };
    //     }
    //     // Return null to indicate no change to state.
    //     return null;
    // }


    calculerValeurEcart = () => {
        console.log('calculerValeurEcart');
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppEnvoye)) {
            const volumeAppEnvoye = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppEnvoye);
            const volumeAppReceptionne = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne);
            if (volumeAppEnvoye > volumeAppReceptionne) {
                const calculatedEcart = volumeAppEnvoye - volumeAppReceptionne;
                this.setState(prevState => {
                    let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                    navigationAvitaillementEntreeModel.valeurEcart = calculatedEcart;                
                    return { navigationAvitaillementEntreeModel };
                })
            } else {
                this.setState(prevState => {
                    let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                    navigationAvitaillementEntreeModel.valeurEcart = '';                 
                    return { navigationAvitaillementEntreeModel };
                })
            }
        } else {
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.valeurEcart = '';                
                return { navigationAvitaillementEntreeModel };
            })
        }
        this.update();
    };

    calculerVolume15Recep = () => {
        console.log('calculerVolume15Recep');
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.coeffConvert)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne)) {
            const coeffConvert = _.parseInt(this.state.navigationAvitaillementEntreeModel?.coeffConvert);
            const volumeAppReceptionne = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne);
            const calculatedVolume15Recep = coeffConvert * volumeAppReceptionne;
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.volume15Recep = calculatedVolume15Recep;
                return { navigationAvitaillementEntreeModel };
            })
        } else {
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.volume15Recep = '';
                return { navigationAvitaillementEntreeModel };
            })
        }
        this.update();
    };

    calculerPoidRecep = () => {
        console.log('calculerValeurEcart');
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.densite15)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.coeffConvert)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne)) {
            const coeffConvert = _.parseInt(this.state.navigationAvitaillementEntreeModel?.coeffConvert);
            const densite15 = _.parseInt(this.state.navigationAvitaillementEntreeModel?.densite15);
            const volumeAppReceptionne = _.parseInt(this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne);
            const calculatedPoidsReceptionne = coeffConvert * densite15 * volumeAppReceptionne;
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.poidsReceptionne = calculatedPoidsReceptionne;
                return { navigationAvitaillementEntreeModel };
            })
        } else {
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.poidsReceptionne = '';
                return { navigationAvitaillementEntreeModel };
            })
        }
        this.update();
    };

    chercherPersonneConcernee = () => {
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.numRCFourn)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.centreRCFourn)) {
            const centreRCFourn = this.state.navigationAvitaillementEntreeModel?.centreRCFourn;
            const numRCFourn = this.state.navigationAvitaillementEntreeModel?.numRCFourn;
            const raisonSocialeFourn = centreRCFourn + ' test ' + numRCFourn;
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.raisonSocialeFourn = raisonSocialeFourn;
                return { navigationAvitaillementEntreeModel };
            })
        } else {
            this.setState(prevState => {
                let navigationAvitaillementEntreeModel = Object.assign({}, prevState.navigationAvitaillementEntreeModel);
                navigationAvitaillementEntreeModel.raisonSocialeFourn = '';
                return { navigationAvitaillementEntreeModel };
            })
        }
        this.update();
    };

    render() {
        return (
            <ScrollView>
                <ComContainerComp>
                    {this.state.errorMessage != null && (
                        <ComBadrErrorMessageComp message={this.state.errorMessage} />
                    )}
                </ComContainerComp>
                {/* <ActifsRapportAvitaillementEntreeMainBlock index={this.props.index}
                    navigationAvitaillementEntreeModel={this.state.navigationAvitaillementEntreeModel}
                    readOnly={this.props.readOnly}
                    update={this.updateModelNavigationAvitaillementEntree} /> */}
                <View style={[CustomStyleSheet.fullContainer, { marginTop: -60 }]}>
                    <ComContainerComp>
                        {this.props.showProgress && (
                            <ComBadrProgressBarComp width={screenHeight} />
                        )}
                        {this.props.errorMessage != null && (
                            <ComBadrErrorMessageComp message={this.props.errorMessage} />
                        )}
                        {this.props.successMessage != null && (
                            <ComBadrInfoMessageComp message={this.props.successMessage} />
                        )}
                        {/* Référence déclaration */}
                        <ComBadrCardBoxComp noPadding={true}>
                            <Grid>
                                { /*first Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.refDum')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <ComBadrLibelleComp>
                                            3090102021000015
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={2} />
                                    <Col size={4}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.dateEnregistrementDum')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <ComBadrLibelleComp>
                                            11/10/2021 10:00
                                        </ComBadrLibelleComp>
                                    </Col>
                                </Row>


                                {/*second Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={1} style={{ padding: 5 }}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.numeroAquis')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementEntree.DUM.bureau')}
                                        // value={this.state.navigationAvitaillementEntreeModel?.villeProvenance}
                                        // onChangeText={(text) => {
                                        // this.setState({
                                        //     navigationAvitaillementEntreeModel: {
                                        //         ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                        //     }
                                        // });
                                        // this.state.navigationAvitaillementEntreeModel?.villeProvenance = text;
                                        // this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementEntree.DUM.regime')}
                                        // value={this.state.navigationAvitaillementEntreeModel?.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementEntreeModel: {
                                        //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementEntreeModel?.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementEntree.DUM.annee')}
                                        // value={this.state.navigationAvitaillementEntreeModel?.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementEntreeModel: {
                                        //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementEntreeModel?.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={2}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementEntree.DUM.serie')}
                                        // value={this.state.navigationAvitaillementEntreeModel?.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementEntreeModel: {
                                        //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementEntreeModel?.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
                                        />
                                    </Col>
                                    <Col size={1}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 40, fontSize: 12, textAlignVertical: 'top', paddingRight: 12 }}
                                            placeholder={translate('actifsCreation.avitaillementEntree.DUM.cle')}
                                        // value={this.state.navigationAvitaillementEntreeModel?.villeProvenance}
                                        // onChangeText={(text) => {
                                        //     this.setState({
                                        //         navigationAvitaillementEntreeModel: {
                                        //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                        //         }
                                        //     });
                                        //     this.state.navigationAvitaillementEntreeModel?.villeProvenance = text;
                                        //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                        // }}
                                        />
                                    </Col>
                                </Row>

                                {/*third Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.dateEnregistrementAcquis')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 20, fontSize: 12 }}
                                            // value={moment(this.state.navigationMaritimeModel.dateEntree).format('DD/MM/YYYY')}
                                            multiline={true}
                                            numberOfLines={1}
                                        />
                                        {this.state.showDateEntree && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                // value={this.state.navigationMaritimeModel.dateEntree}
                                                mode="date"
                                                is24Hour={true}
                                                display="default"
                                            // onChange={this.onDateEntreeChange}
                                            />
                                        )}
                                    </Col>
                                    <Col size={2} style={{ paddingTop: 5 }}>
                                        {!this.props.readOnly && (<IconButton
                                            icon="calendar"
                                        // onPress={() => {
                                        //     this.setState({ showDateEntree: true });
                                        // }}
                                        />)}
                                    </Col>
                                </Row>

                                {/*fourth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.bonLivraison')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                            value={this.state.navigationAvitaillementEntreeModel?.numBonLivraison}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, numBonLivraison: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                    <Col size={2}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.dateLivraison')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <ComBadrDatePickerComp
                                            dateFormat="DD/MM/YYYY"
                                            heureFormat="HH:mm"
                                            value={this.state.navigationAvitaillementEntreeModel?.dateLivraison ? moment(this.state.navigationAvitaillementEntreeModel?.dateLivraison, 'DD/MM/YYYY', true) : ''}
                                            timeValue={this.state.navigationAvitaillementEntreeModel?.heureLivraison ? moment(this.state.navigationAvitaillementEntreeModel?.heureLivraison, 'HH:mm', true) : ''}

                                            onDateChanged={(date) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, dateLivraison: date
                                                    }
                                                });
                                                this.update();
                                            }}

                                            onTimeChanged={(time) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, heureLivraison: time
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.immatriculationCamion')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                            value={this.state.navigationAvitaillementEntreeModel?.immatriculationCamion}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, immatriculationCamion: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.immatriculationCiterne')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAvitaillementEntreeModel?.immatriculationCiterne}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, immatriculationCiterne: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                </Row>

                                {/*seventh Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.numeroRCFournisseur')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                            value={this.state.navigationAvitaillementEntreeModel?.numRCFourn}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, numRCFourn: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                            onEndEditing={(event) => {
                                                this.chercherPersonneConcernee();
                                            }}
                                        />
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.centreRCFournisseur')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAvitaillementEntreeModel?.centreRCFourn}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, centreRCFourn: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                            onEndEditing={(event) => {
                                                this.chercherPersonneConcernee();
                                            }}
                                        />
                                    </Col>
                                </Row>

                                {/*eight Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.raisonSocialeFournisseur')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={9}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAvitaillementEntreeModel?.raisonSocialeFourn}
                                            multiline={true}
                                            numberOfLines={10}
                                        />
                                    </Col>
                                </Row>

                                {/*nine Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.natureProduit')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3} style={{ paddingRight: 5 }}>
                                        <ComBadrCardBoxComp>
                                            <ComBadrPickerCheckerComp
                                                onRef={(ref) => (this.refTypesIncidents = ref)}
                                                key={'code'}
                                                title={translate('actifsCreation.avitaillementEntree.main.natureProduit')}
                                                titleStyle={CustomStyleSheet.badrPickerTitle}
                                                style={{ flex: 1 }}
                                                cle="code"
                                                libelle="libelle"
                                                module="GIB"
                                                command={'getTypesIncident'}
                                                onValueChange={(selectedValue, selectedIndex) => {
                                                    console.log("selectedValue", selectedValue);
                                                    this.setState({ typeIncident: selectedValue }, () => this.updateModele());
                                                }}
                                                param={this.state.natureIncident}
                                                typeService="SP"
                                                onConfirm={this.handleOnConfirmIncidentType}
                                                onSelectedItemObjectsChange={
                                                    this.handleOnIncidentItemsChanged
                                                }
                                            />
                                        </ComBadrCardBoxComp>
                                    </Col>
                                    <Col size={3} />
                                    <Col size={3} />
                                </Row>

                                {/*ten Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.dateReception')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4} >
                                        <ComBadrDatePickerComp
                                            dateFormat="DD/MM/YYYY"
                                            heureFormat="HH:mm"
                                            value={this.state.navigationAvitaillementEntreeModel?.dateReception ? moment(this.state.navigationAvitaillementEntreeModel?.dateReception, 'DD/MM/YYYY', true) : ''}
                                            timeValue={this.state.navigationAvitaillementEntreeModel?.heureReception ? moment(this.state.navigationAvitaillementEntreeModel?.heureReception, 'HH:mm', true) : ''}

                                            onDateChanged={(date) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, dateReception: date
                                                    }
                                                });
                                                this.update();
                                            }}

                                            onTimeChanged={(time) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, heureReception: time
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                    <Col size={5} />
                                </Row>

                                {/*eleven Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.quantiteReceptionne')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                            value={this.state.navigationAvitaillementEntreeModel?.quantiteReceptionne}
                                            keyboardType={'number-pad'}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, quantiteReceptionne: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.uniteMesure')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3} style={{ paddingRight: 5 }}>
                                        <ComBadrItemsPickerComp
                                            // style={CustomStyleSheet.column}
                                            label={translate('actifsCreation.avitaillementEntree.main.uniteMesure')}
                                            disabled={this.props.readOnly}
                                            selectedValue={this.state.navigationAvitaillementEntreeModel?.uniteMesure ? this.state.navigationAvitaillementEntreeModel?.uniteMesure : ''}
                                            items={unitesMesure}
                                            onValueChanged={(selectedValue) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, uniteMesure: selectedValue
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                </Row>

                                {/*thirteen Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.volumentApparentEnvoye')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                            keyboardType={'number-pad'}
                                            onEndEditing={(event) => this.calculerValeurEcart()}
                                            value={this.state.navigationAvitaillementEntreeModel?.volumeAppEnvoye}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, volumeAppEnvoye: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.volumentApparentReceptionne')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                            keyboardType={'number-pad'}
                                            onEndEditing={(event) => {
                                                this.calculerValeurEcart();
                                                this.calculerVolume15Recep();
                                                this.calculerPoidRecep();
                                            }}
                                            value={this.state.navigationAvitaillementEntreeModel?.volumeAppReceptionne}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, volumeAppReceptionne: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.coefficientConvertion')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                            value={this.state.navigationAvitaillementEntreeModel?.coeffConvert}
                                            keyboardType={'number-pad'}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, coeffConvert: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                            onEndEditing={(event) => {
                                                this.calculerVolume15Recep();
                                                this.calculerPoidRecep();
                                            }}
                                        />
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.volumeA15')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp >
                                            {this.state.navigationAvitaillementEntreeModel?.volume15Recep}
                                        </ComBadrLibelleComp>
                                        {/* <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel?.volume15Recep}
                                    /> */}
                                    </Col>
                                </Row>

                                {/*fifteen Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.densiteA15')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                            keyboardType={'number-pad'}
                                            value={this.state.navigationAvitaillementEntreeModel?.densite15}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, densite15: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                            onEndEditing={(event) => {
                                                this.calculerPoidRecep();
                                            }}
                                        />
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.poidsReceptione')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp >
                                            {this.state.navigationAvitaillementEntreeModel?.poidsReceptionne}
                                        </ComBadrLibelleComp>
                                        {/* <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel?.poidsReceptione}
                                    /> */}
                                    </Col>
                                </Row>

                                {/*sixteen Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.temperature')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                            value={this.state.navigationAvitaillementEntreeModel?.temperature}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, temperature: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avitaillementEntree.main.ecart')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={3}>
                                        <ComBadrLibelleComp>
                                            {this.state.navigationAvitaillementEntreeModel?.valeurEcart}
                                        </ComBadrLibelleComp>
                                        {/* <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel?.valeurEcart ? this.state.navigationAvitaillementEntreeModel?.valeurEcart : '35'}
                                    /> */}
                                    </Col>
                                </Row>


                                {/*seventeen Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={3}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avitaillementEntree.main.observations')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={9}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAvitaillementEntreeModel?.observations}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAvitaillementEntreeModel: {
                                                        ...this.state.navigationAvitaillementEntreeModel, observations: text
                                                    }
                                                });
                                                this.update();
                                            }}
                                        />
                                    </Col>
                                </Row>

                            </Grid>
                        </ComBadrCardBoxComp>


                    </ComContainerComp>
                </View>

                {(!this.props.readOnly) && (<View>
                    <Row style={{ justifyContent: 'center', paddingTop: 20 }}>
                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            onPress={() => (this.confirmer())}
                            text={translate('transverse.confirmer')}
                        />
                        <View style={{ width: 10 }} />
                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            onPress={() => this.retablir()}
                            text={translate('transverse.retablir')}
                        />
                        <View style={{ width: 10 }} />
                    </Row>
                </View>)}

            </ScrollView>

        );
    }
}






export default ActifsRapportAvitaillementEntreeBlock;



