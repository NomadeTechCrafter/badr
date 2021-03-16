import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { default as React } from 'react';
import { Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput } from 'react-native-paper';
import {
    ComAccordionComp, ComBadrCardBoxComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { getNavigationAerienneModelInitial} from '../../../utils/actifsUtils';






class ActifsRapportResultatControleBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAerienneModel: this.props.navigationAerienneModel ? this.props.navigationAerienneModel : getNavigationAerienneModelInitial(),
            showDateDebutControle: false,
            showHeureDebutControle: false,
            heureDebutControleTech: this.props.navigationAerienneModel ? this.props.navigationAerienneModel.heureDebutControle : new Date(),
            showDateFinControle: false,
            showHeureFinControle: false,
            heureFinControleTech: this.props.navigationAerienneModel ? this.props.navigationAerienneModel.heureFinControle : new Date(),

        };

    }


    componentDidMount() {

        console.log('ActifsRapportResultatControleBlock componentWillmount');
    }



    componentWillUnmount() {
        console.log('ActifsRapportResultatControleBlock componentWillUnmount');
    }



    reset = () => {
        console.log('ActifsRapportResultatControleBlock reset');
    };




    
    onDateDebutControleChange = (event, selectedDate) => {
        console.log(event);
        console.log('test ===============> ', event);
        console.log(selectedDate);
        console.log('test ===============> ', selectedDate);
        this.setState({
            navigationAerienneModel: {
                ...this.state.navigationAerienneModel,
                dateDebutControle: event.nativeEvent.timestamp,
            }, showDateDebutControle: false


        });
        this.state.navigationAerienneModel.dateDebutControle = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationAerienneModel);
    }
    onHeureDebutControleChange = (event, selectedHeure) => {
        console.log(event);
        console.log('test ===============> ', event);
        console.log(selectedHeure);
        console.log('test ===============> ', selectedHeure);
        this.setState({
            navigationAerienneModel: {
                ...this.state.navigationAerienneModel,
                heureDebutControle: moment(selectedHeure).format('hh:mm').toString(),
            }, showHeureDebutControle: false, heureDebutControleTech: event.nativeEvent.timestamp


        });
        this.state.navigationAerienneModel.heureDebutControle = moment(selectedHeure).format('hh:mm').toString();
        this.props.update(this.state.navigationAerienneModel);
    }

    onDateFinControleChange = (event, selectedDate) => {
        console.log(event);
        console.log('test ===============> ', event);
        console.log(selectedDate);
        console.log('test ===============> ', selectedDate);
        this.setState({
            navigationAerienneModel: {
                ...this.state.navigationAerienneModel,
                dateFinControle: event.nativeEvent.timestamp,
            }, showDateFinControle: false


        });
        this.state.navigationAerienneModel.dateFinControle = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationAerienneModel);
    }
    onHeureFinControleChange = (event, selectedHeure) => {
        console.log(event);
        console.log('test ===============> ', event);
        console.log(selectedHeure);
        console.log('test ===============> ', selectedHeure);
        this.setState({
            navigationAerienneModel: {
                ...this.state.navigationAerienneModel,
                heureFinControle: moment(selectedHeure).format('hh:mm').toString(),
            }, showHeureFinControle: false, heureFinControleTech: event.nativeEvent.timestamp


        });
        this.state.navigationAerienneModel.heureFinControle = moment(selectedHeure).format('hh:mm').toString();
        this.props.update(this.state.navigationAerienneModel);
    }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps--------------------props ', props);
        console.log('getDerivedStateFromProps--------------------state ', state);

        if (
            props.navigationAerienneModel && props.index !== state.index
        ) {
            return {
                navigationAerienneModel: props.navigationAerienneModel,// update the value of specific key
                index: props.index
            };
        }
        // Return null to indicate no change to state.
        return null;
    }









    render() {
        return (

            <ComAccordionComp title={translate('actifsCreation.avionsPrivees.resultatCtrl.title')} expanded={true}>

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
                                    <Col size={6}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.resultatCtrl.dateDebutControle')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={moment(this.state.navigationAerienneModel.dateDebutControle).format('DD/MM/YYYY')}
                                            multiline={true}
                                            numberOfLines={1}
                                        />
                                        {this.state.showDateDebutControle && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={this.state.navigationAerienneModel.dateDebutControle}
                                                mode="date"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onDateDebutControleChange}
                                            />
                                        )}
                                    </Col>
                                    <Col size={2} style={{ paddingTop: 5 }}>
                                        {!this.props.readOnly && (<IconButton
                                            icon="calendar"
                                            onPress={() => {
                                                this.setState({ showDateDebutControle: true });

                                            }}
                                        />)}
                                    </Col>
                                    <Col size={1} />
                                    <Col size={6}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.resultatCtrl.heureDebutControle')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                            value={this.state.navigationAerienneModel.heureDebutControle}
                                            onFocus={() => {
                                                this.setState({ showHeureDebutControle: true });
                                            }}
                                            multiline={false}
                                            numberOfLines={1}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel,
                                                        heureDebutControle: text,
                                                    }
                                                });
                                                this.state.navigationAerienneModel.heureDebutControle = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                        {this.state.showHeureDebutControle && (
                                            <DateTimePicker
                                                style={{ width: '100%' }}
                                                value={this.state.heureDebutControleTech}
                                                mode="time"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onHeureDebutControleChange}
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
                                    <Col size={6}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.resultatCtrl.dateFinControle')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={moment(this.state.navigationAerienneModel.dateFinControle).format('DD/MM/YYYY')}
                                            multiline={true}
                                            numberOfLines={1}
                                        />
                                        {this.state.showDateFinControle && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={this.state.navigationAerienneModel.dateFinControle}
                                                mode="date"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onDateFinControleChange}
                                            />
                                        )}
                                    </Col>
                                    <Col size={2} style={{ paddingTop: 5 }}>
                                        {!this.props.readOnly && (<IconButton
                                            icon="calendar"
                                            onPress={() => {
                                                this.setState({ showDateFinControle: true });

                                            }}
                                        />)}
                                    </Col>
                                    <Col size={1} />
                                    <Col size={6}>
                                        <ComBadrLibelleComp withColor={true}>
                                            {translate('actifsCreation.avionsPrivees.resultatCtrl.heureFinControle')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                            value={this.state.navigationAerienneModel.heureFinControle}
                                            onFocus={() => {
                                                this.setState({ showHeureFinControle: true });
                                            }}
                                            multiline={false}
                                            numberOfLines={1}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel,
                                                        heureFinControle: text,
                                                    }
                                                });
                                                this.state.navigationAerienneModel.heureFinControle = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                        {this.state.showHeureFinControle && (
                                            <DateTimePicker
                                                style={{ width: '100%' }}
                                                value={this.state.heureFinControleTech}
                                                mode="time"
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.onHeureFinControleChange}
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
                                    <Col size={6}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.resultatCtrl.documentsVerifies')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={20}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAerienneModel.documentsVerifies}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, documentsVerifies: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.documentsVerifies = text;
                                                this.props.update(this.state.navigationAerienneModel);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/*third Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.resultatCtrl.observations')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={20}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAerienneModel.observations}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, observations: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.observations = text;
                                                this.props.update(this.state.navigationAerienneModel);

                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/*third Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.avionsPrivees.resultatCtrl.resultatControle')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={20}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationAerienneModel.resultatControle}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationAerienneModel: {
                                                        ...this.state.navigationAerienneModel, resultatControle: text
                                                    }
                                                });
                                                this.state.navigationAerienneModel.resultatControle = text;
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






export default ActifsRapportResultatControleBlock;



