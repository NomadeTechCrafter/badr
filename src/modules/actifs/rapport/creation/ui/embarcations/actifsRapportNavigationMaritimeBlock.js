import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
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






class ActifsRapportNavigationMaritimeBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationMaritimeModel: this.props.navigationMaritimeModel,
            index: this.props.index,
            showDateEntree: false,
            showHeureEntree: false,
            heureEntreeTech: this.props.navigationMaritimeModel ? this.props.navigationMaritimeModel.heureEntree : new Date(),
            acProvenance: this.props.navigationMaritimeModel ? this.props.navigationMaritimeModel.provenance.nomPays : '',
            showDateDepart: false,
            showHeureDepart: false,
            heureDepartTech: this.props.navigationMaritimeModel ? this.props.navigationMaritimeModel.heureDepart : new Date(),
            acDestination: this.props.navigationMaritimeModel ? this.props.navigationMaritimeModel.destination.nomPays : '',

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
            props.navigationMaritimeModel && props.index !== state.index
        ) {
            return {
                navigationMaritimeModel: props.navigationMaritimeModel,// update the value of specific key
                index: props.index,
                heureEntreeTech: props.navigationMaritimeModel.heureEntree
            };
        }
        // Return null to indicate no change to state.
        return null;
    }






    onDateEntreeChange = (event, selectedDate) => {
        this.setState({
            navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                dateEntree: event.nativeEvent.timestamp,
            }, showDateEntree: false


        });
        this.state.navigationMaritimeModel.dateEntree = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationMaritimeModel);
    }
    onHeureEntreeChange = (event, selectedHeure) => {
        this.setState({
            navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                heureEntree: moment(selectedHeure).format('HH:mm').toString(),
            }, showHeureEntree: false, heureEntreeTech: event.nativeEvent.timestamp


        });
        this.state.navigationMaritimeModel.heureEntree = moment(selectedHeure).format('HH:mm').toString();
        this.props.update(this.state.navigationMaritimeModel);

    }

    onDateDepartChange = (event, selectedDate) => {
        this.setState({
            navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                dateDepart: event.nativeEvent.timestamp,
            }, showDateDepart: false


        });
        this.state.navigationMaritimeModel.dateDepart = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationMaritimeModel);
    }
    onHeureDepartChange = (event, selectedHeure) => {
        this.setState({
            navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                heureDepart: moment(selectedHeure).format('HH:mm').toString(),
            }, showHeureDepart: false, heureDepartTech: event.nativeEvent.timestamp


        });
        this.state.navigationMaritimeModel.heureDepart = moment(selectedHeure).format('HH:mm').toString();
        this.props.update(this.state.navigationMaritimeModel);

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
            acProvenance: pays?.libelle, navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                provenance: { codePays: pays?.code, nomPays: pays?.libelle }
            }
        });
        this.state.navigationMaritimeModel.provenance = { codePays: pays?.code, nomPays: pays?.libelle };
        this.props.update(this.state.navigationMaritimeModel)
    }

    handleDestinationChanged = (pays) => {
        this.setState({
            acDestination: pays?.libelle, navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                destination: { codePays: pays?.code, nomPays: pays?.libelle }
            }
        });
        this.state.navigationMaritimeModel.destination = { codePays: pays?.code, nomPays: pays?.libelle };
        this.props.update(this.state.navigationMaritimeModel)


    }




    render() {

        return (

            <ComAccordionComp title={translate('actifsCreation.embarcations.navigMaritime.title')} expanded={true}>

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
                                            {translate('actifsCreation.embarcations.navigMaritime.dateEntree')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={moment(this.state.navigationMaritimeModel.dateEntree).format('DD/MM/YYYY')}
                                            multiline={true}
                                            numberOfLines={1}
                                        />
                                        {this.state.showDateEntree && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={this.state.navigationMaritimeModel.dateEntree}
                                                mode="date"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onDateEntreeChange}
                                            />
                                        )}
                                    </Col>
                                    <Col size={2} style={{ paddingTop: 5 }}>
                                        {!this.props.readOnly && (<IconButton
                                            icon="calendar"
                                            onPress={() => {
                                                this.setState({ showDateEntree: true });

                                            }}
                                        />)}
                                    </Col>
                                    <Col size={2} />
                                    <Col size={4}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.embarcations.navigMaritime.heureEntree')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                            value={this.state?.navigationMaritimeModel?.heureEntree ? this.state?.navigationMaritimeModel?.heureEntree?.toString() : ''}
                                            onFocus={() => {
                                                this.setState({ showHeureEntree: true });
                                            }}
                                            multiline={false}
                                            numberOfLines={1}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel,
                                                        heureEntree: text,
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.heureEntree = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                        {this.state.showHeureEntree && (
                                            <DateTimePicker
                                                style={{ width: '100%' }}
                                                value={this.state.heureEntreeTech}
                                                mode="time"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onHeureEntreeChange}
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
                                                {translate('actifsCreation.embarcations.navigMaritime.motifAccostage')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={20}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationMaritimeModel.motifAccostage}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, motifAccostage: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.motifAccostage = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/*third Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.navigMaritime.portEntree')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={20}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationMaritimeModel.portEntree}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, portEntree: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.portEntree = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                </Row>


                                {/*fourth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.embarcations.navigMaritime.provenance')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={8}>
                                        <ComBadrAutoCompleteChipsComp
                                            code="code"
                                            disabled={this.props.readOnly}
                                            placeholder={translate(
                                                'actifsCreation.embarcations.navigMaritime.provenance'
                                            )}
                                            selected={this.state.navigationMaritimeModel.provenance.nomPays}
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
                                            {translate('actifsCreation.embarcations.navigMaritime.villeProvenance')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationMaritimeModel.villeProvenance}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, villeProvenance: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.villeProvenance = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                </Row>

                                {/*fifth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.navigMaritime.portAttache')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={8}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 80, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationMaritimeModel.portAttache}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, portAttache: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.portAttache = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                    <Col size={2} />
                                    <Col size={4}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.navigMaritime.pavillon')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 80, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationMaritimeModel.pavillon}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, pavillon: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.pavillon = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/*sixth Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={4}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.embarcations.navigMaritime.dateDepart')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={moment(this.state.navigationMaritimeModel.dateDepart).format('DD/MM/YYYY')}
                                            multiline={true}
                                            numberOfLines={1}
                                        />
                                        {this.state.showDateDepart && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={this.state.navigationMaritimeModel.dateDepart}
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
                                            {translate('actifsCreation.embarcations.navigMaritime.heureDepart')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                            // value={this.state.navigationMaritimeModel.heureDepart}
                                            value={this.state?.navigationMaritimeModel?.heureDepart ? this.state?.navigationMaritimeModel?.heureDepart?.toString() : ''}
                                            onFocus={() => {
                                                this.setState({ showHeureDepart: true });
                                            }}
                                            multiline={false}
                                            numberOfLines={1}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel,
                                                        heureDepart: text,
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.heureDepart = text;
                                                this.props.update(this.state.navigationMaritimeModel);
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
                                            {translate('actifsCreation.embarcations.navigMaritime.destination')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={8}>
                                        <ComBadrAutoCompleteChipsComp
                                            code="code"
                                            disabled={this.props.readOnly}
                                            placeholder={translate(
                                                'actifsCreation.embarcations.navigMaritime.destination'
                                            )}
                                            selected={this.state.navigationMaritimeModel.destination.nomPays}
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
                                            {translate('actifsCreation.embarcations.navigMaritime.villeDestination')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationMaritimeModel.villeDestination}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, villeDestination: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.villeDestination = text;
                                                this.props.update(this.state.navigationMaritimeModel);

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






export default ActifsRapportNavigationMaritimeBlock;



