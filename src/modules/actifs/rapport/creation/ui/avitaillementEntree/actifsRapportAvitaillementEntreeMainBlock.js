import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput } from 'react-native-paper';
import {
    ComBadrPickerCheckerComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp, ComBadrDatePickerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';


class ActifsRapportAvitaillementEntreeMainBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAvitaillementEntreeModel: {}// this.props.navigationAvitaillementEntreeModel
        };

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    reset = () => {
    };

    calculerValeurEcart = () => {
        if (!_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumentApparentReceptionne)
            && !_.isEmpty(this.state.navigationAvitaillementEntreeModel?.volumentApparentEnvoye)) {
            const volumentApparentEnvoye = this.state.navigationAvitaillementEntreeModel?.volumentApparentEnvoye;
            const volumentApparentReceptionne = this.state.navigationAvitaillementEntreeModel?.volumentApparentReceptionne;
            if (volumentApparentEnvoye > volumentApparentReceptionne) {
                const calculatedEcart = volumentApparentEnvoye - volumentApparentReceptionne;
                this.setState({
                    navigationAvitaillementEntreeModel: {
                        ...this.state.navigationAvitaillementEntreeModel, valeurEcart: calculatedEcart
                    }
                });
                this.update();
            }
        }
    };

    update() {
        this.props.update(this.state.navigationAvitaillementEntreeModel);
    }


    render() {
        return (
            // <ComAccordionComp title={translate('actifsCreation.avitaillementEntree.main.title')} expanded={true}>
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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    // this.setState({
                                    //     navigationAvitaillementEntreeModel: {
                                    //         ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //     }
                                    // });
                                    // this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
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
                                        value={this.state.navigationAvitaillementEntreeModel.bonLivraison}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, bonLivraison: text
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
                                        value={this.state.navigationAvitaillementEntreeModel.dateLivraison ? moment(this.state.navigationAvitaillementEntreeModel.dateLivraison, 'DD/MM/YYYY', true) : ''}
                                        timeValue={this.state.navigationAvitaillementEntreeModel.heureLivraison ? moment(this.state.navigationAvitaillementEntreeModel.heureLivraison, 'HH:mm', true) : ''}

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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
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
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
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
                                        disabled={this.props.readOnly}
                                        style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                        // value={this.state.navigationAvitaillementEntreeModel.portEntree}
                                        multiline={true}
                                        numberOfLines={10}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, portEntree: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.portEntree = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
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
                                        value={this.state.navigationAvitaillementEntreeModel.dateReception ? moment(this.state.navigationAvitaillementEntreeModel.dateReception, 'DD/MM/YYYY', true) : ''}
                                        timeValue={this.state.navigationAvitaillementEntreeModel.heureReception ? moment(this.state.navigationAvitaillementEntreeModel.heureReception, 'HH:mm', true) : ''}

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
                                        {translate('actifsCreation.avitaillementEntree.main.quantiteReceptione')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={this.props.readOnly}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top', marginRight: 10 }}
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.uniteMesure')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3} style={{ paddingRight: 5 }}>
                                    <ComBadrCardBoxComp>
                                        <ComBadrPickerCheckerComp
                                            onRef={(ref) => (this.refTypesIncidents = ref)}
                                            key={'code'}
                                            title={translate('actifsCreation.avitaillementEntree.main.uniteMesure')}
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
                                        value={this.state.navigationAvitaillementEntreeModel.volumentApparentEnvoye}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, volumentApparentEnvoye: text
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
                                        onEndEditing={(event) => this.calculerValeurEcart()}
                                        value={this.state.navigationAvitaillementEntreeModel.volumentApparentReceptionne}
                                        onChangeText={(text) => {
                                            this.setState({
                                                navigationAvitaillementEntreeModel: {
                                                    ...this.state.navigationAvitaillementEntreeModel, volumentApparentReceptionne: text
                                                }
                                            });
                                            this.update();
                                        }}
                                    />
                                </Col>
                            </Row>

                            {/*fourteen Row*/}
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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.volumeA15')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel.volumeA15}
                                    />
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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.poidsReceptione')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel.poidsReceptione}
                                    />
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
                                    // value={this.state.navigationAvitaillementEntreeModel.villeProvenance}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, villeProvenance: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.villeProvenance = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
                                    />
                                </Col>
                                <Col size={3}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('actifsCreation.avitaillementEntree.main.ecart')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={3}>
                                    <TextInput
                                        mode={'outlined'}
                                        disabled={true}
                                        style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                        value={this.state.navigationAvitaillementEntreeModel?.valeurEcart}
                                    />
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
                                        // value={this.state.navigationAvitaillementEntreeModel.portEntree}
                                        multiline={true}
                                        numberOfLines={10}
                                    // onChangeText={(text) => {
                                    //     this.setState({
                                    //         navigationAvitaillementEntreeModel: {
                                    //             ...this.state.navigationAvitaillementEntreeModel, portEntree: text
                                    //         }
                                    //     });
                                    //     this.state.navigationAvitaillementEntreeModel.portEntree = text;
                                    //     this.props.update(this.state.navigationAvitaillementEntreeModel);
                                    // }}
                                    />
                                </Col>
                            </Row>

                        </Grid>
                    </ComBadrCardBoxComp>


                </ComContainerComp>
            </View>


            // </ComAccordionComp>

        );
    }
}






export default ActifsRapportAvitaillementEntreeMainBlock;



