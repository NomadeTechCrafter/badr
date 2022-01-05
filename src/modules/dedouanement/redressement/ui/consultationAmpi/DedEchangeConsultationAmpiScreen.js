import React from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import {
    ComBadrCardBoxComp as CardBox, ComBadrModalComp, ComBasicDataTableComp
} from '../../../../../commons/component';
import translate from "../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from "../../../../../commons/styles/ComThemeStyle";
import dedConsulterAmpiAction from "../../state/actions/dedConsulterAmpiAction";
import { CONSULTER_AMP_DED_REQUEST } from "../../state/DedRedressementConstants";

class DedEchangeConsultationAmpiScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLine: null
        };
        this.cols = [
            {
                code: 'numAutMvmtPort',
                libelle: translate('dedouanement.ampi.numVersAutMvmtPort'),
                width: 150,
                size: 25,
            },
            {
                code: 'numVersAutMvmtPort',
                libelle: translate('dedouanement.ampi.numVersAutMvmtPort'),
                width: 150,
            },
            {
                code: 'typeUnite',
                libelle: translate('dedouanement.ampi.typeUnite'),
                width: 150,
            },
            {
                code: 'sousTypeUnite',
                libelle: translate('dedouanement.ampi.sousTypeUnite'),
                width: 150,
            },
            {
                code: 'numUnite',
                libelle: translate('dedouanement.ampi.NumUnit'),
                width: 150,
            },
            {
                code: 'numTracteur',
                libelle: translate('dedouanement.ampi.NumTract'),
                width: 150,
            },
            {
                code: 'numPlateau',
                libelle: translate('dedouanement.ampi.NumPlateau'),
                width: 150,
            },
            {
                code: 'declarant',
                libelle: translate('dedouanement.ampi.declarant'),
                width: 150,
            },
            {
                code: 'videPlein',
                libelle: translate('dedouanement.ampi.videPlein'),
                width: 150,
            },
            {
                code: 'matiere',
                libelle: translate('dedouanement.ampi.matiere'),
                width: 150,
            },
            {
                code: 'agentMaritime',
                libelle: translate('dedouanement.ampi.agentMaritime'),
                width: 150,
            },
            {
                code: 'vesselName',
                libelle: translate('dedouanement.ampi.vesselName'),
                width: 150,
            },
            {
                code: 'vesselImo',
                libelle: translate('dedouanement.ampi.IMO'),
                width: 150,
            },
            {
                code: 'dateValidation',
                libelle: translate('dedouanement.ampi.dateValidation'),
                width: 150,
            },
            {
                code: 'dateImpression',
                libelle: translate('dedouanement.ampi.dateImpression'),
                width: 150,
            },
            {
                code: 'dateAnnulation',
                libelle: translate('dedouanement.ampi.dateAnnulation'),
                width: 150,
            },
            {
                code: 'pointActuel',
                libelle: translate('dedouanement.ampi.pointActuel'),
                width: 150,
            },
            {
                code: 'dateZRE',
                libelle: translate('dedouanement.ampi.dateZRE'),
                width: 150,
            },
            {
                code: 'numeroZRE',
                libelle: translate('dedouanement.ampi.numeroZRE'),
                width: 150,
            },
            {
                code: 'refEtatChargement',
                libelle: translate('dedouanement.ampi.refEtatChargement'),
                width: 150,
            },
            {
                code: 'refDUM',
                libelle: translate('dedouanement.ampi.refDUM'),
                width: 150,
            },
            {
                code: 'dateCreation',
                libelle: translate('dedouanement.ampi.dateCreation'),
                width: 150,
            },
            {
                code: 'etat',
                libelle: translate('dedouanement.ampi.etat'),
                width: 150,
            },
        ];
    }


    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
        console.log(' DedEchangeConsultationAmpiScreen componentDidMount ');
    }

    componentDidUpdate() {
        console.log(' DedEchangeConsultationAmpiScreen componentDidUpdate ');
    }

    chargeList() {
        console.log(' DedEchangeConsultationAmpiScreen chargeList ');
        let action = dedConsulterAmpiAction.request(
            {
                type: CONSULTER_AMP_DED_REQUEST,
                value: {
                    reference: this.props.reference
                }


            },

        );
        this.props.dispatch(action);


    }


    render() {


        return (
            <ComBadrModalComp
                visible={this.props.visible}
                onDismiss={this.props.onDismiss}
                icon={'window-close'}
                onPress={this.props.onDismiss}>
                <View style={CustomStyleSheet.whiteRow}>
                    <Text>{translate('dedouanement.ampi.title')}</Text>
                    <View >
                        <ScrollView>
                            <CardBox >

                                <ComBasicDataTableComp
                                    ref="_badrTable"
                                    id="scannerTable"
                                    rows={this.props.listAMPI}
                                    cols={this.cols}
                                    totalElements={this.props.listAMPI?.length}
                                    maxResultsPerPage={10}
                                    paginate={true}
                                    showProgress={this.props.showProgress}
                                    withId={false}
                                />


                            </CardBox>
                        </ScrollView>
                    </View>
                </View></ComBadrModalComp>
        );
    }
}
function mapStateToProps(state) {
    return { ...state.consulterDumReducer };
}

export default connect(
    mapStateToProps,
    null,
)(DedEchangeConsultationAmpiScreen);
