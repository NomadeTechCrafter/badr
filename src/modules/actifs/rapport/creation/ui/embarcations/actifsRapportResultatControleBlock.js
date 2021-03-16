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
import { getNavigationMaritimeModelInitial } from '../../../utils/actifsUtils';






class ActifsRapportResultatControleBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationMaritimeModel: this.props.navigationMaritimeModel ? this.props.navigationMaritimeModel : getNavigationMaritimeModelInitial(),
            showDateDebutControle: false,
            showHeureDebutControle: false,
            heureDebutControleTech: this.props.navigationMaritimeModel ? this.props.navigationMaritimeModel.heureDebutControle : new Date(),
            showDateFinControle: false,
            showHeureFinControle: false,
            heureFinControleTech: this.props.navigationMaritimeModel ? this.props.navigationMaritimeModel.heureFinControle : new Date(),

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
            navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                dateDebutControle: event.nativeEvent.timestamp,
            }, showDateDebutControle: false


        });
        this.state.navigationMaritimeModel.dateDebutControle = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationMaritimeModel);
    }
    onHeureDebutControleChange = (event, selectedHeure) => {
        console.log(event);
        console.log('test ===============> ', event);
        console.log(selectedHeure);
        console.log('test ===============> ', selectedHeure);
        this.setState({
            navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                heureDebutControle: moment(selectedHeure).format('hh:mm').toString(),
            }, showHeureDebutControle: false, heureDebutControleTech: event.nativeEvent.timestamp


        });
        this.state.navigationMaritimeModel.heureDebutControle = moment(selectedHeure).format('hh:mm').toString();
        this.props.update(this.state.navigationMaritimeModel);
    }

    onDateFinControleChange = (event, selectedDate) => {
        console.log(event);
        console.log('test ===============> ', event);
        console.log(selectedDate);
        console.log('test ===============> ', selectedDate);
        this.setState({
            navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                dateFinControle: event.nativeEvent.timestamp,
            }, showDateFinControle: false


        });
        this.state.navigationMaritimeModel.dateFinControle = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationMaritimeModel);
    }
    onHeureFinControleChange = (event, selectedHeure) => {
        console.log(event);
        console.log('test ===============> ', event);
        console.log(selectedHeure);
        console.log('test ===============> ', selectedHeure);
        this.setState({
            navigationMaritimeModel: {
                ...this.state.navigationMaritimeModel,
                heureFinControle: moment(selectedHeure).format('hh:mm').toString(),
            }, showHeureFinControle: false, heureFinControleTech: event.nativeEvent.timestamp


        });
        this.state.navigationMaritimeModel.heureFinControle = moment(selectedHeure).format('hh:mm').toString();
        this.props.update(this.state.navigationMaritimeModel);
    }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps--------------------props ', props);
        console.log('getDerivedStateFromProps--------------------state ', state);

        if (
            props.navigationMaritimeModel && props.index !== state.index
        ) {
            return {
                navigationMaritimeModel: props.navigationMaritimeModel,// update the value of specific key
                index: props.index
            };
        }
        // Return null to indicate no change to state.
        return null;
    }









    render() {
        return (

            <ComAccordionComp title={translate('actifsCreation.embarcations.resultatCtrl.title')} expanded={true}>

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
                                            {translate('actifsCreation.embarcations.resultatCtrl.dateDebutControle')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={moment(this.state.navigationMaritimeModel.dateDebutControle).format('DD/MM/YYYY')}
                                            multiline={true}
                                            numberOfLines={1}
                                        />
                                        {this.state.showDateDebutControle && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={this.state.navigationMaritimeModel.dateDebutControle}
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
                                            {translate('actifsCreation.embarcations.resultatCtrl.heureDebutControle')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                            value={this.state.navigationMaritimeModel.heureDebutControle}
                                            onFocus={() => {
                                                this.setState({ showHeureDebutControle: true });
                                            }}
                                            multiline={false}
                                            numberOfLines={1}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel,
                                                        heureDebutControle: text,
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.heureDebutControle = text;
                                                this.props.update(this.state.navigationMaritimeModel);
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
                                            {translate('actifsCreation.embarcations.resultatCtrl.dateFinControle')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={6}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={true}
                                            style={{ height: 20, fontSize: 12 }}
                                            value={moment(this.state.navigationMaritimeModel.dateFinControle).format('DD/MM/YYYY')}
                                            multiline={true}
                                            numberOfLines={1}
                                        />
                                        {this.state.showDateFinControle && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={this.state.navigationMaritimeModel.dateFinControle}
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
                                            {translate('actifsCreation.embarcations.resultatCtrl.heureFinControle')}
                                        </ComBadrLibelleComp>
                                    </Col>
                                    <Col size={4}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 20, fontSize: 12, alignSelf: 'center', padding: 15 }}
                                            value={this.state.navigationMaritimeModel.heureFinControle}
                                            onFocus={() => {
                                                this.setState({ showHeureFinControle: true });
                                            }}
                                            multiline={false}
                                            numberOfLines={1}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel,
                                                        heureFinControle: text,
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.heureFinControle = text;
                                                this.props.update(this.state.navigationMaritimeModel);
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
                                                {translate('actifsCreation.embarcations.resultatCtrl.documentsVerifies')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={20}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationMaritimeModel.documentsVerifies}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, documentsVerifies: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.documentsVerifies = text;
                                                this.props.update(this.state.navigationMaritimeModel);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/*third Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.resultatCtrl.observations')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={20}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationMaritimeModel.observations}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, observations: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.observations = text;
                                                this.props.update(this.state.navigationMaritimeModel);

                                            }}
                                        />
                                    </Col>
                                </Row>
                                {/*third Row*/}
                                <Row style={CustomStyleSheet.whiteRow}>
                                    <Col size={6}>
                                        <Row>
                                            <ComBadrLibelleComp withColor={true}>
                                                {translate('actifsCreation.embarcations.resultatCtrl.resultatControle')}
                                            </ComBadrLibelleComp>
                                        </Row>
                                    </Col>
                                    <Col size={20}>
                                        <TextInput
                                            mode={'outlined'}
                                            disabled={this.props.readOnly}
                                            style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                                            value={this.state.navigationMaritimeModel.resultatControle}
                                            multiline={true}
                                            numberOfLines={10}
                                            onChangeText={(text) => {
                                                this.setState({
                                                    navigationMaritimeModel: {
                                                        ...this.state.navigationMaritimeModel, resultatControle: text
                                                    }
                                                });
                                                this.state.navigationMaritimeModel.resultatControle = text;
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






export default ActifsRapportResultatControleBlock;



