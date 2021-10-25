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

    checkRequiredFields = () => {

        let params = { msg: '', required: false }
        this.checkRequiredFieldsNavigAvitaillementSortie(params);
        this.checkRequiredFieldsCaracteristiquesBateau(params);
        this.checkRequiredFieldsResultatCtrl(params);

        if (params.required) {
            let message = translate('actifsCreation.avitaillementSortie.champsObligatoires') + params.msg;
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

    checkDatesSortieDepartInformations = () => {
        let modele = this.state.navigationAvitaillementSortieModel;
        let dateSortie = formatCustomized(modele.dateSortie, FORMAT_DDMMYYYY);

        moment.suppressDeprecationWarnings = true;
        let dateHeureSortie = moment(dateSortie + ' ' + modele.heureSortie, FORMAT_DDMMYYYY_HHMM);
        let dateDepart = formatCustomized(modele.dateDepart, FORMAT_DDMMYYYY);

        let dateHeureDepart = moment(dateDepart + ' ' + modele.heureDepart, FORMAT_DDMMYYYY_HHMM);

        if (dateHeureDepart < dateHeureSortie) {
            let message = translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.msgErrorOrdreDateSortieDepart');
            this.setState({
                errorMessage: message
            });
            return true;
        } else {
            this.setState({
                errorMessage: null
            });
            return false
        }



    }

    checkDatesDebutFinControleInformations = () => {
        let modele = this.state.navigationAvitaillementSortieModel;
        let dateDebutControle = formatCustomized(modele.dateDebutControle, FORMAT_DDMMYYYY);

        moment.suppressDeprecationWarnings = true;
        let dateHeureDebutControle = moment(dateDebutControle + ' ' + modele.heureDebutControle, FORMAT_DDMMYYYY_HHMM);
        let dateFinControle = formatCustomized(modele.dateFinControle, FORMAT_DDMMYYYY);

        let dateHeureFinControle = moment(dateFinControle + ' ' + modele.heureFinControle, FORMAT_DDMMYYYY_HHMM);

        if (dateHeureFinControle < dateHeureDebutControle) {
            let message = translate('actifsCreation.avitaillementSortie.resultatCtrl.msgErrorOrdreDateDebutFinControle');
            this.setState({
                errorMessage: message
            });
            return true;
        } else {
            this.setState({
                errorMessage: null
            });
            return false
        }



    }

    checkRequiredFieldsNavigAvitaillementSortie = (params) => {
        let modele = this.state.navigationAvitaillementSortieModel;
        if (_.isEmpty(modele.dateSortie.toString())) {
            params.required = true;
            params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.dateSortie');
        }
        if (_.isEmpty(modele.motifAccostage)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.motifAccostage');
        }
        if (_.isEmpty(modele.portSortie)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.portSortie');
        }
        if (_.isEmpty(modele.provenance?.codePays)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.provenance');
        }
        if (_.isEmpty(modele.villeProvenance)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.villeProvenance');
        }
        if (_.isEmpty(modele.portAttache)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.portAttache');
        }
        if (_.isEmpty(modele.pavillon)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.pavillon');
        }
        if (_.isEmpty(modele.dateDepart.toString())) {
            params.required = true;
            params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.dateDepart');
        }
        if (_.isEmpty(modele.destination?.codePays)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.destination');
        }
        if (_.isEmpty(modele.villeDestination)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.navigAvitaillementSortie.villeDestination');
        }



    }
    checkRequiredFieldsCaracteristiquesBateau = (params) => {
        let modele = this.state.navigationAvitaillementSortieModel;
        if (_.isEmpty(modele.typeBateau)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.typeBateau');
        }
        if (_.isEmpty(modele.nomBateau)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.nomBateau');
        }
        if (_.isEmpty(modele.immatriculation)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.immatriculation');
        }
        if (_.isEmpty(modele.couleur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.couleur');
        }
        if (_.isEmpty(modele.longueur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.longueur');
        }
        if (_.isEmpty(modele.profondeur)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.profondeur');
        }
        if (_.isEmpty(modele.tonnage)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.tonnage');
        }
        if (_.isEmpty(modele.numDeclaration)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.numDeclaration');
        }
        console.log('modele.delivreePar?.nom', modele.delivreePar?.idActeur);
        console.log('modele.delivreePar?.nom ', modele.delivreePar?.nom);
        if (_.isEmpty(modele.delivreePar?.nom)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.delivreePar');
        }
        if (_.isEmpty(modele.dateDeclaration.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.caracteristiques.dateDeclaration');
        }



    }
    checkRequiredFieldsResultatCtrl = (params) => {
        let modele = this.state.navigationAvitaillementSortieModel;
        if (_.isEmpty(modele.dateDebutControle.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.resultatCtrl.dateDebutControle');
        }
        if (_.isEmpty(modele.dateFinControle.toString())) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.resultatCtrl.dateFinControle');
        }
        if (_.isEmpty(modele.documentsVerifies)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.resultatCtrl.documentsVerifies');
        }
        if (_.isEmpty(modele.observations)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.resultatCtrl.observations');
        }
        if (_.isEmpty(modele.resultatControle)) {
            params.required = true;
            params.msg += !_.isEmpty(params.msg) ? ", " : "";
            params.msg += translate('actifsCreation.avitaillementSortie.resultatCtrl.resultatControle');
        }




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



