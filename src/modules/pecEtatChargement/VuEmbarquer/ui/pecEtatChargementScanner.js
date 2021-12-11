import React from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import style from '../style/pecEtatChargementStyle';
import styles from '../style/pecEtatChargementStyle';
import EtatChargementInfosDum from './pecEtatChargementInfosDum'
import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBasicDataTableComp,
} from '../../../../commons/component';
import translate from "../../../../commons/i18n/ComI18nHelper";
import EtatChargementHistoriqueListeInterventionsBlock from "./pecEtatChargementHistoriqueListeInterventionsBlock";

class EtatChargementScanner extends React.Component {
    defaultState = {
        selectedDum: {},
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
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
            },
            {
                code: 'controleApresScanner',
                libelle: translate('etatChargementVE.controleApresScanner'),
                width: 300,
            }
        ];
    }

    componentDidUpdate() {
        if (this.props.route?.params?.first) {
            this.refs._badrTable.reset();
            this.selectedDum = {};
        }
    }

    render() {
        let resultatsScanner = this.props.dataScanner;
        return (
            <View style={style.container}>
                <ScrollView>
                    <EtatChargementInfosDum />
                    <CardBox style={style.cardBox}>
                        <Accordion
                            badr
                            title={translate('etatChargement.resultatScanner')}
                        >
                            {resultatsScanner && (
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
                            )}
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
)(EtatChargementScanner);
