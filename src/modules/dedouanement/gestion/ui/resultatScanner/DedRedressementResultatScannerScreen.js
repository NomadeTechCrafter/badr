import React from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBasicDataTableComp,
} from '../../../../../commons/component';
import translate from "../../../../../commons/i18n/ComI18nHelper";
import ScannerEtatChargementAction from "../../../../pecEtatChargement/VuEmbarquer/state/actions/pecScannerEtatChargementAction";
import { SCANNER_ETAT_CHARGEMENT_VE_REQUEST } from "../../../../pecEtatChargement/VuEmbarquer/state/pecEtatChargementConstants";

class DedRedressementResultatScannerScreen extends React.Component {

    constructor(props) {
        super(props);
        this.cols = [
            {
                code: 'dateScannage',
                libelle: translate('etatChargement.dateScannage'),
                width: 200,
            },
            {
                code: 'agent',
                libelle: translate('etatChargement.agent'),
                width: 150,
            },
            {
                code: 'resultat',
                libelle: translate('etatChargement.resultat'),
                width: 250,
            },
            {
                code: 'commentaire',
                libelle: translate('etatChargement.commentaire'),
                width: 300,
            }
        ];
    }

    componentDidUpdate() {
        if (this.props.route?.params?.first) {
            this.refs._badrTable.reset();
        }
    }

    componentDidMount() {
        this.searchScanner();
    }

    searchScanner = () => {
        let action = ScannerEtatChargementAction.request(
            {
                type: SCANNER_ETAT_CHARGEMENT_VE_REQUEST,
                value: this.props?.resScan?.data?.dedReferenceVO?.reference

            },
            this.props.navigation,
        );
        this.props.dispatch(action);
    };

    render() {
        let resultatsScanner = this.props.dataScanner ? this.props.dataScanner : [];
        return (
            <View >
                <ScrollView>
                    <CardBox >
                        <Accordion
                            title={translate('etatChargement.resultatScanner')}
                        >
                            <ComBasicDataTableComp
                                ref="_badrTable"
                                id="scannerTable"
                                rows={resultatsScanner}
                                cols={this.cols}
                                totalElements={resultatsScanner.length}
                                maxResultsPerPage={10}
                                paginate={true}
                                showProgress={this.props.showProgress}
                                withId={false}
                            />
                        </Accordion>
                    </CardBox>
                </ScrollView>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return { ...state.pecEtatChargementVEReducer, resScan : state.consulterDumReducer  };
}

export default connect(
    mapStateToProps,
    null,
)(DedRedressementResultatScannerScreen);
