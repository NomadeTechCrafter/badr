import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { IconButton } from 'react-native-paper';
import { ComBadrLibelleComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { INTERVENANT_INITIAL } from '../../../utils/actifsConstants';
import ActifsRapportPersonneConcerneeModal from './modalProprietaire/actifsRapportPersonneConcerneeModal';






class ActifsRapportPersonnesConcerneesSousBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            intervenants: this.props.intervenants,
            showDetailIntervenant: false,
            selectedItem: INTERVENANT_INITIAL,
            selectedIndex: -1,
        };
    }





    onDismiss = () => {
        this.setState({
            showDetailIntervenant: false
        });
    };

    componentDidMount() {

    }

    componentDidUpdate() {

    }


    componentWillUnmount() {
    }

    confirmerIntervenant = (intervenant) => {
        if (this.state.selectedIndex == -1) {
            console.log('==================== before ======================');
            console.log('==================== before ======================');
            console.log('==================== before ======================');
            console.log(JSON.stringify(intervenant));
            console.log('===================== after =====================');
            console.log('===================== after =====================');
            console.log('===================== after =====================');
            intervenant.dateDelivrancePI ? intervenant.dateDelivrancePI = intervenant.dateDelivrancePI.split("/").reverse().join("-") : intervenant.dateDelivrancePI = '';
            intervenant.intervenant.dateNaissance ? intervenant.intervenant.dateNaissance = intervenant.intervenant.dateNaissance.split("/").reverse().join("-") : intervenant.intervenant.dateNaissance = '';
            console.log('==========================================');
            console.log('==========================================');
            console.log('==========================================');
            console.log(JSON.stringify(intervenant));
            console.log('==========================================');
            console.log('==========================================');
            console.log('==========================================');
            this.state.intervenants.push(intervenant);
        } else {
            this.editIntervenant(intervenant);
        }

        this.setState({ showDetailIntervenant: false });
        this.props.update(this.state.intervenants);
    };
    editIntervenant = (intervenant) => {
        const dataIntervenant = [...this.state.intervenants];
        dataIntervenant.splice(this.state.selectedIndex, 1, intervenant);
        this.setState({ intervenants: dataIntervenant }
        );
    };

    selectedIntervenant = (index) => {
        let intervenant = this.state.intervenants[index];
        if (_.isEmpty(intervenant.intervenant.numeroRC)) {
            this.setState({ typeProprietaire: '01' });
        } else {
            this.setState({ typeProprietaire: '02' });
        }
        this.setState({
            showDetailIntervenant: true,
            editIntervenant: true,
            selectedIndex: index,
            selectedItem: intervenant
        });
    };

    mapDataArrayIntervenant = () => {
        return this.state.intervenants.map((item, index) => {
            return (
                <Row style={CustomStyleSheet.whiteRow}>
                    {(!this.props.readOnly) && (<Col size={1} />)}
                    <Col size={2}>
                        <ComBadrLibelleComp withColor={true}> {(item.passager) && translate('actifsCreation.avionsPrivees.intervenants.passager')}
                            {(item.equipage) && translate('actifsCreation.avionsPrivees.intervenants.equipage')}
                        </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                        <ComBadrLibelleComp withColor={true}>
                            {item.intervenant.numeroDocumentIndentite}
                        </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                        <ComBadrLibelleComp withColor={true}>
                            {item.intervenant.nomIntervenant}
                            {item.intervenant.prenomIntervenant}
                        </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                        <ComBadrLibelleComp withColor={true}>
                            {item.intervenant.adresse}
                        </ComBadrLibelleComp>
                    </Col>
                    {(!this.props.readOnly) && (this.choixActionsIntervenant(index))}
                </Row>
            );
        });
    };

    choixActionsIntervenant = (index) => {
        return (
            <Col size={2}>
                <Row>
                    {/* <Col size={1}>
                        <IconButton
                            icon="pencil-outline"
                            color={'white'}
                            size={15}
                            style={{ backgroundColor: primaryColor }}
                            onPress={() => this.selectedIntervenant(index)}
                        />
                    </Col> */}
                    <Col size={1}>
                        <IconButton
                            icon="trash-can-outline"
                            color={'white'}
                            size={15}
                            style={{ backgroundColor: primaryColor }}
                            onPress={() => {
                                let intervenants = [...this.state.intervenants];
                                intervenants.splice(index, 1);
                                this.setState({ intervenants }, () => console.log(this.state.intervenants));
                                this.props.update(this.state.intervenants);
                            }}
                        />
                    </Col>
                </Row>
            </Col>
        );
    };



    ajouterIntervenant = () => {

        this.setState({
            showDetailIntervenant: true,
            selectedItem: INTERVENANT_INITIAL,
            selectedIndex: -1
        });
    };

    static getDerivedStateFromProps(props, state) {

        if (
            props.index !== state.selectedIndex || !(props.index)
        ) {
            return {
                intervenants: props.intervenants,// update the value of specific key
                selectedIndex: props.index
            };
        }
        // Return null to indicate no change to state.
        return null;
    }

    render() {
        return (

            <View>
                <View>
                    <Row style={CustomStyleSheet.lightBlueRow}>
                        {(!this.props.readOnly) && (<Col size={1}>
                            <IconButton
                                icon="plus"
                                color={'white'}
                                size={15}
                                style={{ backgroundColor: primaryColor }}
                                onPress={() => this.ajouterIntervenant()}
                            />
                        </Col>)}
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('actifsCreation.avionsPrivees.intervenants.personneConcernee')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('actifsCreation.avionsPrivees.intervenants.identifiant')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('actifsCreation.avionsPrivees.intervenants.nomPrenom')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('actifsCreation.avionsPrivees.intervenants.adresse')}
                            </ComBadrLibelleComp>
                        </Col>
                        {(!this.props.readOnly) && (<Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('actifsCreation.avionsPrivees.intervenants.actions')}
                            </ComBadrLibelleComp>
                        </Col>)}
                    </Row>
                    {this.mapDataArrayIntervenant()}
                </View>
                <ActifsRapportPersonneConcerneeModal
                    visible={this.state.showDetailIntervenant}
                    onDismiss={this.onDismiss}
                    readOnly={false}
                    confirmer={this.confirmerIntervenant}
                    intervenant={this.state.selectedItem}
                    intervenants={this.state.intervenants}
                    index={this.state.selectedIndex}
                />
            </View>

        );
    }
}






export default ActifsRapportPersonnesConcerneesSousBlock;



