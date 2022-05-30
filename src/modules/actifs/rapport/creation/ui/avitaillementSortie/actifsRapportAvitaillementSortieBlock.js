import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { ScrollView, View } from 'react-native';
import { Row } from 'react-native-easy-grid';
import { ComBadrButtonComp, ComBadrErrorMessageComp, ComContainerComp } from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { FORMAT_DDMMYYYY, FORMAT_DDMMYYYY_HHMM, RESET_AVITAILLEMENTSORTIE_TASK } from '../../../utils/actifsConstants';
import { formatCustomized, getNavigationAvitaillementSortieModelInitial } from '../../../utils/actifsUtils';
import ActifsRapportAvitaillementSortieMainBlock from './actifsRapportAvitaillementSortieMainBlock';





class ActifsRapportAvitaillementSortieBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAvitaillementSortieModel: getNavigationAvitaillementSortieModelInitial(),
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
            if (!this.checkDatesSortieDepartInformations()) {
                if (!this.checkDatesDebutFinControleInformations()) {
                    this.props.push(this.state.navigationAvitaillementSortieModel);
                }
            }
        }
    }


    retablir = () => {
        this.props.callbackHandler(RESET_AVITAILLEMENTSORTIE_TASK);
    }


    updateModelNavigationAvitaillementSortie = (modele) => {
        this.state.navigationAvitaillementSortieModel.dateSortie = modele.dateSortie;
        this.state.navigationAvitaillementSortieModel.heureSortie = modele.heureSortie;
        this.state.navigationAvitaillementSortieModel.motifAccostage = modele.motifAccostage;
        this.state.navigationAvitaillementSortieModel.portSortie = modele.portSortie;
        this.state.navigationAvitaillementSortieModel.provenance = modele.provenance;
        this.state.navigationAvitaillementSortieModel.villeProvenance = modele.villeProvenance;
        this.state.navigationAvitaillementSortieModel.portAttache = modele.portAttache;
        this.state.navigationAvitaillementSortieModel.pavillon = modele.pavillon;
        this.state.navigationAvitaillementSortieModel.dateDepart = modele.dateDepart;
        this.state.navigationAvitaillementSortieModel.heureDepart = modele.heureDepart;
        this.state.navigationAvitaillementSortieModel.destination = modele.destination;
        this.state.navigationAvitaillementSortieModel.villeDestination = modele.villeDestination;


        //this.state.navigationAvitaillementSortieModel = model;
    }

    updateModelCaracteristiquesBateau = (modele) => {
        this.state.navigationAvitaillementSortieModel.typeBateau = modele.typeBateau;
        this.state.navigationAvitaillementSortieModel.nomBateau = modele.nomBateau;
        this.state.navigationAvitaillementSortieModel.immatriculation = modele.immatriculation;
        this.state.navigationAvitaillementSortieModel.couleur = modele.couleur;
        this.state.navigationAvitaillementSortieModel.longueur = modele.longueur;
        this.state.navigationAvitaillementSortieModel.profondeur = modele.profondeur;
        this.state.navigationAvitaillementSortieModel.tonnage = modele.tonnage;
        this.state.navigationAvitaillementSortieModel.numDeclaration = modele.numDeclaration;
        this.state.navigationAvitaillementSortieModel.delivreePar = modele.delivreePar;
        this.state.navigationAvitaillementSortieModel.dateDeclaration = modele.dateDeclaration;
    }
    updateModelResultatCtrl = (modele) => {
        this.state.navigationAvitaillementSortieModel.dateDebutControle = modele.dateDebutControle;
        this.state.navigationAvitaillementSortieModel.heureDebutControle = modele.heureDebutControle;
        this.state.navigationAvitaillementSortieModel.dateFinControle = modele.dateFinControle;
        this.state.navigationAvitaillementSortieModel.heureFinControle = modele.heureFinControle;
        this.state.navigationAvitaillementSortieModel.documentsVerifies = modele.documentsVerifies;
        this.state.navigationAvitaillementSortieModel.observations = modele.observations;
        this.state.navigationAvitaillementSortieModel.resultatControle = modele.resultatControle;


    }

    updateModelProprietairesPersonnesConcernees = (modele) => {
        this.state.navigationAvitaillementSortieModel.proprietaires = modele.proprietaires;
        this.state.navigationAvitaillementSortieModel.intervenants = modele.intervenants;
    }


    static getDerivedStateFromProps(props, state) {

        if (
            props.navigationAvitaillementSortieModel && props.index !== state.index
        ) {
            return {
                navigationAvitaillementSortieModel: props.navigationAvitaillementSortieModel,// update the value of specific key
                index: props.index
            };
        }
        // Return null to indicate no change to state.
        return null;
    }
    render() {
        return (
            <ScrollView>
                <ComContainerComp>
                    {this.state.errorMessage != null && (

                        <ComBadrErrorMessageComp message={this.state.errorMessage} />
                    )}

                </ComContainerComp>
                <ActifsRapportAvitaillementSortieMainBlock index={this.props.index} navigationAvitaillementSortieModel={this.state.navigationAvitaillementSortieModel} readOnly={this.props.readOnly} update={this.updateModelNavigationAvitaillementSortie} />
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
                            onPress={() => {
                                this.retablir()
                            }}
                            text={translate('transverse.retablir')}
                        />
                        <View style={{ width: 10 }} />
                    </Row>
                </View>)}

            </ScrollView>

        );
    }
}






export default ActifsRapportAvitaillementSortieBlock;



