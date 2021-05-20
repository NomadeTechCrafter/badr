import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { default as React } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput } from 'react-native-paper';
import {
    ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';






class ActifsRapportNavigationAerienneBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAerienneModel: this.props.navigationAerienneModel,
            index: this.props.index,
            showDateAtterissage: false,
            showHeureAtterissage: false,
            heureAtterissageTech: this.props.navigationAerienneModel ? this.props.navigationAerienneModel.heureAtterissage : new Date(),
            acProvenance: this.props.navigationAerienneModel ? this.props.navigationAerienneModel.provenance.nomPays : '',
            showDateDepart: false,
            showHeureDepart: false,
            heureDepartTech: this.props.navigationAerienneModel ? this.props.navigationAerienneModel.heureDepart : new Date(),
            acDestination: this.props.navigationAerienneModel ? this.props.navigationAerienneModel.destination.nomPays : '',

        };

    }


    componentDidMount() {

    }



    componentWillUnmount() {
    }



    reset = () => {
    };




    static getDerivedStateFromProps(props, state) {

        if (
            props.navigationAerienneModel && props.index !== state.index
        ) {
            return {
                navigationAerienneModel: props.navigationAerienneModel,// update the value of specific key
                index: props.index,
                heureAtterissageTech: props.navigationAerienneModel.heureAtterissage
            };
        }
        // Return null to indicate no change to state.
        return null;
    }






    onDateAtterissageChange = (event, selectedDate) => {
        this.setState({
            navigationAerienneModel: {
                ...this.state.navigationAerienneModel,
                dateAtterissage: event.nativeEvent.timestamp,
            }, showDateAtterissage: false


        });
        this.state.navigationAerienneModel.dateAtterissage = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationAerienneModel);
    }
    onHeureAtterissageChange = (event, selectedHeure) => {
        this.setState({
            navigationAerienneModel: {
                ...this.state.navigationAerienneModel,
                heureAtterissage: moment(selectedHeure).format('HH:mm').toString(),
            }, showHeureAtterissage: false, heureAtterissageTech: event.nativeEvent.timestamp


        });
        this.state.navigationAerienneModel.heureAtterissage = moment(selectedHeure).format('HH:mm').toString();
        this.props.update(this.state.navigationAerienneModel);
    }

    onDateDepartChange = (event, selectedDate) => {
        this.setState({
            navigationAerienneModel: {
                ...this.state.navigationAerienneModel,
                dateDepart: event.nativeEvent.timestamp,
            }, showDateDepart: false


        });
        this.state.navigationAerienneModel.dateDepart = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationAerienneModel);
    }
    onHeureDepartChange = (event, selectedHeure) => {
        this.setState({
            navigationAerienneModel: {
                ...this.state.navigationAerienneModel,
                heureDepart: moment(selectedHeure).format('HH:mm').toString(),
            }, showHeureDepart: false, heureDepartTech: event.nativeEvent.timestamp


        });
        this.state.navigationAerienneModel.heureDepart = moment(selectedHeure).format('HH:mm').toString();
        this.props.update(this.state.navigationAerienneModel);
       
    }





    showMode = (currentMode) => {
        this.setState({ show: true, mode: currentMode });
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    showTimepicker = () => {
        this.showMode('time');
    };

    handleProvenanceChanged = (pays) => {
        this.setState({
            acProvenance: pays.libelle, navigationAerienneModel: {
                ...this.state.navigationAerienneModel,
                provenance: { codePays: pays.code, nomPays: pays.libelle }
            }
        });
        this.state.navigationAerienneModel.provenance = { codePays: pays.code, nomPays: pays.libelle };
        this.props.update(this.state.navigationAerienneModel);
    }

    handleDestinationChanged = (pays) => {
        this.setState({
            acDestination: pays.libelle, navigationAerienneModel: {
                ...this.state.navigationAerienneModel,
                destination: { codePays: pays.code, nomPays: pays.libelle }
            }
        });
        this.state.navigationAerienneModel.destination = { codePays: pays.code, nomPays: pays.libelle };
        this.props.update(this.state.navigationAerienneModel);


    }




    render() {

        return (

            <ComAccordionComp title={translate('actifsCreation.avionsPrivees.navigAerienne.title')} expanded={true}>

                <View style={CustomStyleSheet.fullContainer}>
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
                                            {translate('actifsCreation.avionsPrivees.navigAerienne.dateAtterissage') }
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={moment(this.state.navigationAerienneModel.dateAtterissage).format('DD/MM/YYYY')}
                                            multiline={true}
                                            numberOfLines={1}
                                        />
                                        {this.state.showDateAtterissage && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={this.state.navigationAerienneModel.dateAtterissage}
                                                mode="date"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onDateAtterissageChange}
                                            />
                                        )}
                                    </Col>
                                    <Col size={2} style={{ paddingTop: 5 }}>
                                        {!this.props.readOnly && (<IconButton
                                            icon="calendar"
                                            onPress={() => {
                                                this.setState({ showDateAtterissage: true });

                                            }}
                                        />)}
                                    </Col>
                                    <Col size={2} />
                                    <Col size={4}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.navigAerienne.heureAtterissage') + 'x' + this.state.navigationAerienneModel.heureAtterissage}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                            value={this.state.navigationAerienneModel.heureAtterissage}
                                            onFocus={() => {
                                                this.setState({ showHeureAtterissage: true });
                                            }}
                                            multiline={false}
                                            numberOfLines={1}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel,
                                                        heureAtterissage: text,
                                                    }
                                                });
                                                this.state.navigationAerienneModel.heureAtterissage = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                        {this.state.showHeureAtterissage && (
                                            <DateTimePicker
                                                style={{ width: '100%' }}
                                                value={this.state.heureAtterissageTech}
                                                mode="time"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onHeureAtterissageChange}
                                            />
                                        )}
                                    </Col>
                                    <Col size={2} style={{ paddingTop: 5 }}>
                                        <Text style={{ fontSize: 12 }}>
                                            {translate('actifsCreation.entete.uniteHeure')}
                                        </Text>
                                    </Col>
                                </Row>


                                {/*second Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.navigAerienne.motifAtterissage')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={20}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAerienneModel.motifAtterissage}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, motifAtterissage: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.motifAtterissage = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/*third Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.navigAerienne.aeroportEntree')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={20}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAerienneModel.aeroportEntree}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, aeroportEntree: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.aeroportEntree = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                </Row>


                                {/*fourth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.navigAerienne.provenance')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={8}>
                                        <ComBadrAutoCompleteChipsComp
                                            code="code"
                                            disabled={this.props.readOnly}
                                            placeholder={translate(
                                                'actifsCreation.avionsPrivees.navigAerienne.provenance'
                                            )}
                                            selected={(this.state.navigationAerienneModel.provenance.libelle) ? this.state.navigationAerienneModel.provenance.libelle : this.state.navigationAerienneModel.provenance.nomPays}
                                            maxItems={3}
                                            libelle="libelle"
                                            command="getCmbPays"
                                            paramName="libellePays"
                                            onDemand={true}
                                            searchZoneFirst={false}
                                            onValueChange={this.handleProvenanceChanged}
                                        />
                                    </Col>
                                    <Col size={2} />
                                    <Col size={4} style={{ padding: 5 }}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.navigAerienne.villeProvenance')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAerienneModel.villeProvenance}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, villeProvenance: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.villeProvenance = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                </Row>

                                {/*fifth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.navigAerienne.aeroportAttache')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={8}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 80, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAerienneModel.aeroportAttache}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, aeroportAttache: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.aeroportAttache = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                    <Col size={2} />
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.navigAerienne.pavillon')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 80, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAerienneModel.pavillon}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, pavillon: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.pavillon = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/*sixth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.navigAerienne.dateDepart')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={moment(this.state.navigationAerienneModel.dateDepart).format('DD/MM/YYYY')}
                                            multiline={true}
                                            numberOfLines={1}
                                        />
                                        {this.state.showDateDepart && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={this.state.navigationAerienneModel.dateDepart}
                                                mode="date"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onDateDepartChange}
                                            />
                                        )}
                                    </Col>
                                    <Col size={2} style={{ paddingTop: 5 }}>
                                        {!this.props.readOnly && (<IconButton
                                            icon="calendar"
                                            onPress={() => {
                                                this.setState({ showDateDepart: true });

                                            }}
                                        />)}
                                    </Col>
                                    <Col size={2} />
                                    <Col size={4}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.navigAerienne.heureDepart')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                            value={this.state.navigationAerienneModel.heureDepart}
                                            onFocus={() => {
                                                this.setState({ showHeureDepart: true });
                                            }}
                                            multiline={false}
                                            numberOfLines={1}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel,
                                                        heureDepart: text,
                                                    }
                                                });
                                                this.state.navigationAerienneModel.heureDepart = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                        {this.state.showHeureDepart && (
                                            <DateTimePicker
                                                style={{ width: '100%' }}
                                                value={this.state.heureDepartTech}
                                                mode="time"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onHeureDepartChange}
                                            />
                                        )}
                                    </Col>
                                    <Col size={2} style={{ paddingTop: 5 }}>
                                        <Text style={{ fontSize: 12 }}>
                                            {translate('actifsCreation.entete.uniteHeure')}
                                        </Text>
                                    </Col>
                                </Row>
                                {/*fourth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.navigAerienne.destination')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={8}>
                                        <ComBadrAutoCompleteChipsComp
                                            code="code"
                                            disabled={this.props.readOnly}
                                            placeholder={translate(
                                                'actifsCreation.avionsPrivees.navigAerienne.destination'
                                            )}
                                            selected={this.state.navigationAerienneModel.destination.libelle ? this.state.navigationAerienneModel.destination.libelle : this.state.navigationAerienneModel.destination.nomPays}
                                            maxItems={3}
                                            libelle="libelle"
                                            command="getCmbPays"
                                            paramName="libellePays"
                                            onDemand={true}
                                            searchZoneFirst={false}
                                            onValueChange={this.handleDestinationChanged}
                                        />
                                    </Col>
                                    <Col size={2} />
                                    <Col size={4} style={{ padding: 5 }}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.navigAerienne.villeDestination')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAerienneModel.villeDestination}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, villeDestination: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.villeDestination = text;
                                                this.props.update(this.state.navigationAerienneModel);

                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Grid>
                        </ComBadrCardBoxComp>


                    </ComContainerComp>
                </View>


            </ComAccordionComp>

        );
    }
}






export default ActifsRapportNavigationAerienneBlock;



