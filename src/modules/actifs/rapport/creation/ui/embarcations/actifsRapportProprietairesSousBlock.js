import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { IconButton } from 'react-native-paper';
import { ComBadrLibelleComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { PROPRIETAIRE_INITIAL } from '../../../utils/actifsConstants';
import ActifsRapportPropritaireModal from './modalProprietaire/actifsRapportPropritaireModal';






class ActifsRapportProprietairesSousBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            proprietaires: this.props.proprietaires,
            showDetailProprietaire: false,
            editProprietaire: false,
            selectedItem: PROPRIETAIRE_INITIAL,
            selectedIndex: -1,
            typeProprietaire: '01'
        };
    }

    onDismiss = () => {
        this.setState({
            showDetailProprietaire: false,
            showDetailMarchandise: false,
            showDetailMTS: false,
        });
    };

    componentDidMount() {
        
    }

    componentDidUpdate() {

    }


    componentWillUnmount() {
    }

    confirmerProprietaire = (proprietaire) => {
        if (this.state.selectedIndex == -1) {
            this.state.proprietaires.push(proprietaire);
        } else {
            this.editProprietaire(proprietaire);
        }

        this.setState({ showDetailProprietaire: false });
        this.props.update(this.state.proprietaires);
    };
    editProprietaire = (proprietaire) => {
        const dataProprietaire = [...this.state.proprietaires];
        dataProprietaire.splice(this.state.selectedIndex, 1, proprietaire);
        this.setState({ proprietaires: dataProprietaire, editProprietaire: false }
        );
    };

    selectedProprietaire = (index) => {
        let proprietaire = this.state.proprietaires[index];
        if (_.isEmpty(proprietaire.intervenant.numeroRC)) {
            this.setState({ typeProprietaire: '01' });
        } else {
            this.setState({ typeProprietaire: '02' });
        }
        this.setState({
            showDetailProprietaire: true,
            editProprietaire: true,
            selectedIndex: index,
            selectedItem: proprietaire
        });
    };

    mapDataArrayProprietaire = () => {
        return this.state.proprietaires.map((item, index) => {
            return (
                <Row style={CustomStyleSheet.whiteRow}>
                    {(!this.props.readOnly) && (<Col size={1} />)}
                    <Col size={2}>
                        <ComBadrLibelleComp withColor={true}> {item.intervenant?.refCentreRC?.codeCentreRC}-{item.intervenant?.numeroRC}/{item.intervenant?.numeroDocumentIndentite}</ComBadrLibelleComp>
                    </Col>
                    <Col size={4}>
                        <ComBadrLibelleComp withColor={true}>
                            {item.intervenant.nomIntervenant}/{item.intervenant.nomIntervenant}{'  '}
                            {item.intervenant.prenomIntervenant}
                        </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                        <ComBadrLibelleComp withColor={true}>
                            {item.intervenant.adresse}
                        </ComBadrLibelleComp>
                    </Col>
                    {(!this.props.readOnly) && (this.choixActionsProprietaire(index))}
                </Row>
            );
        });
    };

    choixActionsProprietaire = (index) => {
        return (
            <Col size={2}>
                <Row>
                    {/* <Col size={1}>
                        <IconButton
                            icon="pencil-outline"
                            color={'white'}
                            size={15}
                            style={{ backgroundColor: primaryColor }}
                            onPress={() => this.selectedProprietaire(index)}
                        />
                    </Col> */}
                    <Col size={1}>
                        <IconButton
                            icon="trash-can-outline"
                            color={'white'}
                            size={15}
                            style={{ backgroundColor: primaryColor }}
                            onPress={() => {
                                let proprietaires = [...this.state.proprietaires];
                                proprietaires.splice(index, 1);
                                this.setState({ proprietaires }, () => console.log(this.state.proprietaires));
                                this.props.update(this.state.proprietaires);
                            }}
                        />
                    </Col>
                </Row>
            </Col>
        );
    };



    ajouterProprietaire = () => {

        this.setState({
            showDetailProprietaire: true,
            selectedItem: PROPRIETAIRE_INITIAL,
            selectedIndex: -1
        });
    };

    static getDerivedStateFromProps(props, state) {
        
        if (
            props.index !== state.selectedIndex || !(props.index)
        ) {
            return {
                proprietaires: props.proprietaires,// update the value of specific key
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
                                onPress={() => this.ajouterProprietaire()}
                            />
                        </Col>)}
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('actifsCreation.embarcations.proprietaires.idOuRc')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={4}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('actifsCreation.embarcations.proprietaires.nomPrenomOuRS')}
                            </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('actifsCreation.embarcations.proprietaires.adresse')}
                            </ComBadrLibelleComp>
                        </Col>
                        {(!this.props.readOnly) && (<Col size={2}>
                            <ComBadrLibelleComp withColor={true}>
                                {translate('actifsCreation.embarcations.proprietaires.actions')}
                            </ComBadrLibelleComp>
                        </Col>)}
                    </Row>
                    {this.mapDataArrayProprietaire()}
                </View>
                <ActifsRapportPropritaireModal
                    visible={this.state.showDetailProprietaire}
                    onDismiss={this.onDismiss}
                    readOnly={false}
                    confirmer={this.confirmerProprietaire}
                    proprietaire={this.state.selectedItem}
                    index={this.state.selectedIndex}
                    typeProprietaire={this.state.typeProprietaire}
                />
            </View>

        );
    }
}






export default ActifsRapportProprietairesSousBlock;



