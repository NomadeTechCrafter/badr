import _ from 'lodash';
import moment from 'moment';
import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Col, Row } from 'react-native-easy-grid';
import { connect } from "react-redux";
import {
    ComAccordionComp as Accordion, ComBadrAutoCompleteChipsComp, ComBadrButtonIconComp, ComBadrCardBoxComp as CardBox, ComBadrDatePickerComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBasicDataTableComp
} from '../../../../commons/component';
import { TYPE_SERVICE_UC } from "../../../../commons/constants/ComGlobalConstants";
import translate from "../../../../commons/i18n/ComI18nHelper";
import { ComSessionService } from '../../../../commons/services/session/ComSessionService';
import pecVuEmbarquer from "../state/actions/pecVuEmbarquer";
import  { VALIDER_ETAT_CHARGEMENT_VE_REQUEST } from '../state/pecEtatChargementConstants';
import { default as style, default as styles } from '../style/pecEtatChargementStyle';
import EtatChargementInfosDum from './pecEtatChargementInfosDum';


class EtatChargementEcorage extends React.Component {

    defaultState = {
    };

    constructor(props) {
        super(props);
        this.state = {
            

            navire: '',
            commentaire: '',
            dateHeureVE: '',
            moyenTransportCode: '',
            heureVE: '',
            errorMessage: null



        };

        this.composantTablesCols = this.buildComposantsColumns(true);

    }

    /**
    * This function build the components datatable headers labels and actions.
    * the reference is considered as the current component instance
    */
    handleCmbMoyenTransport = (item, id) => {
        //console.log('handleCmbMoyenTransport', item);
        this.setState({ moyenTransportCode: item.code, navire: item.libelle });
    };

    buildComposantsColumns = (actions) => {
        return [
            {
                code: 'nomPays',
                libelle: translate('etatChargementVE.pays'),
                width: 160,
            },
            {
                code: 'refTypeContenant',
                libelle: translate('etatChargementVE.typeMoyen'),
                width: 200,
            },
            {
                code: 'numeroImmatriculation',
                libelle: translate('etatChargementVE.immatriculation'),
                width: 150,
            },
            {
                code: 'tareVehicule',
                libelle: translate('etatChargementVE.tare'),
                width: 100,
            },
            {
                code: 'listScelles',
                libelle: translate('etatChargementVE.numScelle'),
                width: 200,
            },
        ];
    };


    confirmerVuEmbarquer = () => {
        if (_.isEmpty(this.state.dateHeureVE) || _.isEmpty(this.state.heureVE)) {
            this.setState({ errorMessage: translate('etatChargementVE.dateHeureVisaErreur')});
            return;
        }
        if (_.isEmpty(this.state.navire) ) {
            this.setState({ errorMessage: translate('etatChargementVE.navireVuEmbarquerErreur') });
            return;
        } 

        this.setState({ errorMessage: null });
        let VuEmbarquerVo = {

            codeBureau : this.props.codeBureau,
            regime: this.props.regime,
            anneeEnregistrement: this.props.anneeEnregistrement,
            numeroSerieEnregistrement: this.props.numeroSerieEnregistrement,
            cleIHM: this.props.cleIHM,
            dateHeureVuEmbarquer: this.state.dateHeureVE + ' ' + this.state.heureVE,
            commentaireEmbarquement: this.state.commentaire,
            refMoyenTransport: { codeMoyenTransport: this.state.moyenTransportCode },
            idActeurInterne: ComSessionService.getInstance().getLogin(),
            refModeTransport: { codeModeTransport: "01" }


        };
         let action = pecVuEmbarquer.request(
            {
                type: VALIDER_ETAT_CHARGEMENT_VE_REQUEST,
                value: {
                    commande: 'confirmerVuEmbarquer',
                    module: 'ECOREXP_LIB',
                    typeService: TYPE_SERVICE_UC,
                    data: VuEmbarquerVo
                },
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action); 



    }




    render() {
        let listMoyenTransport = this.props.data?.refMoyenTransportAEC;
        let newArray = [];
        listMoyenTransport?.forEach(element => {
            let newElement = {};
            newElement.nomPays = element.refPaysImmatriculation.nomPays;
            newElement.refTypeContenant = element.refTypeContenant.intitule;
            newElement.numeroImmatriculation = element.numeroImmatriculation;
            newElement.tareVehicule = element.tareVehicule;
            newElement.listScelles = element.listScelleVOs?.map(function (item) {
                return item['reference'];
            });;
            newArray.push(newElement);
        });

        let etatChargement = this.props.data?.refEtatChargement;

        let scellesConfirmationEntree = '';
        const obj = this.props.data?.scellesConfirmationEntree;
        for (const prop in obj) {
            scellesConfirmationEntree += obj[prop] + '\n';
        }

        console.log('this.props', this.props);

        return (
            <View style={style.container}>
                <ScrollView>

                    {this.props.infoMessage != null && (
                        <ComBadrInfoMessageComp message={this.props.infoMessage} />
                    )}

                    {this.props.errorMessage != null && (
                        <ComBadrErrorMessageComp message={this.props.errorMessage} />
                    )}

                    {this.state.errorMessage != null && (
                        <ComBadrErrorMessageComp message={this.state.errorMessage} />
                    )}
                    <EtatChargementInfosDum />
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargementVE.depot')}>
                            <CardBox style={styles.cardBoxInfoDum}>
                                <View style={[styles.flexDirectionCol, styles.margtb]}>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargementVE.agentDepot')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {ComSessionService.getInstance().getLogin()}
                                        </Text>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargementVE.dateHeureDepot')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {etatChargement?.dateHeureDepot}
                                        </Text>
                                    </View>
                                </View>
                            </CardBox>
                        </Accordion>
                    </CardBox>
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargementVE.confirmationEntree')}>
                            <CardBox style={styles.cardBoxInfoDum}>
                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                    <View style={[styles.flexDirectionCol, styles.margtb]}>
                                        <Text style={[styles.libelleM, styles.margtt]}>
                                            {translate('etatChargementVE.scellesConfirmationEntree')}
                                        </Text>
                                    </View>
                                    <View style={[styles.flexDirectionCol, styles.margtb]}>
                                        <CardBox style={styles.cardBoxInfoDum}>
                                            <TextInput
                                                value={scellesConfirmationEntree}
                                                multiline={true}
                                                numberOfLines={3}
                                                disabled={true}
                                            />
                                        </CardBox>
                                    </View>
                                </View>
                            </CardBox>
                        </Accordion>
                    </CardBox>

                    {newArray && (
                        <CardBox style={style.cardBox}>
                            <Accordion
                                badr
                                title={translate('etatChargementVE.bonEmbarquer')}
                            >
                                <View style={[styles.flexDirectionCol, styles.margtb]}>
                                    <View style={[styles.flexDirectionRow, styles.margtb]}>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargementVE.inspecteurVisite')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {etatChargement?.refActeurInterneBAE?.idActeur}
                                        </Text>
                                        <Text style={styles.libelleM}>
                                            {translate('etatChargementVE.dateHeureVisa')}
                                        </Text>
                                        <Text style={styles.valueM}>
                                            {etatChargement?.dateHeureBAE}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                    <View style={[styles.flexDirectionCol, styles.margtb]}>
                                        <Text style={[styles.libelleM, styles.margtr]}>
                                            {translate('etatChargementVE.moyenTransport')} :
                                        </Text>
                                        <Text style={[styles.libelleM, styles.margtr]}>
                                            {translate('etatChargementVE.numScelle')}
                                        </Text>
                                    </View>
                                    <ComBasicDataTableComp
                                        badr
                                        onRef={(ref) => (this.badrComposantsTable = ref)}
                                        ref="_badrTable"
                                        hasId={false}
                                        id="idComposant"
                                        rows={newArray}
                                        cols={this.composantTablesCols}
                                        totalElements={
                                            newArray?.length
                                                ? newArray?.length
                                                : 0
                                        }
                                        maxResultsPerPage={5}
                                        paginate={true}
                                    />
                                </View>

                                <View style={[styles.flexDirectionRow, styles.margtb]}>
                                    <View style={[styles.flexDirectionCol, styles.margtb]}>
                                        <Text style={[styles.libelleM, styles.margtt]}>
                                            {translate('etatChargementVE.commentaire')}
                                        </Text>
                                    </View>
                                    <View style={[styles.flexDirectionCol, styles.margtb, styles.width90]}>
                                        <CardBox style={[styles.cardBoxInfoDum, styles.container, styles.width90]}>
                                            <TextInput
                                                value={etatChargement?.commentaireBonEmbarquement}
                                                multiline={true}
                                                numberOfLines={3}
                                                disabled={true}
                                            />
                                        </CardBox>
                                    </View>
                                </View>
                            </Accordion>
                        </CardBox>
                    )}
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargementVE.vuEmbarquer')}>
                            <CardBox style={styles.cardBoxInfoDum}>
                                

                                    <Row size={200}>
                                        <Col size={50}>
                                            <Text style={styles.libelleM}>
                                                {translate('etatChargementVE.agentEcoreur')}
                                            </Text>
                                        </Col>
                                        <Col size={50}>
                                            <Text style={styles.valueM}>
                                            {ComSessionService.getInstance().getLogin()}
                                            </Text>
                                        </Col>
                                        <Col size={50}>
                                            <Text style={styles.libelleM}>
                                                {translate('etatChargementVE.dateHeureVoyage')}
                                            </Text>
                                        </Col>
                                        <Col size={50}>

                                            <Text>

                                            {(!this.props.success) && <ComBadrDatePickerComp
                                                dateFormat="DD/MM/YYYY"
                                                value={!_.isEmpty(this.state.dateHeureVE) ? moment(this.state.dateHeureVE, 'DD/MM/yyyy', true) : null}
                                                timeValue={!_.isEmpty(this.state.heureVE) ? moment(this.state.heureVE, 'HH:mm', true) : null}
                                                labelDate={translate('etatChargementVE.dateHeureVoyage')}
                                                inputStyle={style.textInputsStyle}
                                                onDateChanged={(date) =>
                                                    this.setState({
                                                        ...this.state,
                                                        dateHeureVE: date,
                                                    })
                                                }
                                                onTimeChanged={(time) =>
                                                    this.setState({
                                                        ...this.state,
                                                        heureVE: time,
                                                    })
                                                }
                                            />}
                                            {(this.props.success) && (this.state.dateHeureVE + " "+this.state.heureVE)}
                                            </Text>
                                        </Col>
                                    </Row>

                                    <Row size={200}>
                                        <Col size={50}>


                                            <Text style={styles.libelle}>
                                                {translate('etatChargementVE.navire')}
                                            </Text>


                                        </Col>
                                        <Col size={150}>


                                       

                                        <ComBadrAutoCompleteChipsComp
                                        
                                            code="code"
                                            disabled={this.props.success}
                                        placeholder={translate(
                                            'etatChargement.navire',
                                        )}
                                            selected={this.state.navire}
                                        maxItems={3}
                                        libelle="libelle"
                                            command="getCmbMoyenTransport"
                                            paramName="libelleMoyenTransport"
                                        onDemand={true}
                                        searchZoneFirst={false}
                                        onValueChange={this.handleCmbMoyenTransport}
                />
                                        </Col>

                                        
                                    </Row>
                               
                                <Row size={200}>
                                    <Col size={50}>
                                        <Text style={[styles.libelleM, styles.margtt]}>
                                            {translate('etatChargementVE.commentaire')}
                                        </Text>
                                    </Col>

                                    <Col size={150}>
                                        <CardBox style={[styles.cardBoxInfoDum, styles.container, styles.width90]}>
                                            {(!this.props.success) && <TextInput
                                                disabled={this.props.success}
                                                value={this.state.commentaire}
                                                multiline={true}
                                                numberOfLines={3}
                                                onChangeText={(val) => this.setState({ commentaire: val })}

                                            />}
                                            {(this.props.success) && (<Text>{this.state.commentaire}</Text>)}

                                        </CardBox>

                                    </Col>
                                </Row>
                                <Row size={200}>
                                    <Col size={200}>
                                    
                                        {(!this.props.success) && <ComBadrButtonIconComp
                                            onPress={() => this.confirmerVuEmbarquer()}
                                            style={style.buttonIcon}
                                            loading={this.props.showProgress}
                                            text={translate('etatChargementVE.buttonConfirmerVuEmbarquer')}
                                        />}
                                    </Col>
                                </Row>    
                            </CardBox>
                        </Accordion>
                    </CardBox>
                </ScrollView>
            </View>
        );
    }
}




function mapStateToProps(state) {
    return { ...state.pecEtatChargementVEReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EtatChargementEcorage);


