import React from "react";
import style from '../style/pecEtatChargementStyle';
import styles from '../style/pecEtatChargementStyle';
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import translate from "../../../../commons/i18n/ComI18nHelper";
import EtatChargementInfosDum from './pecEtatChargementInfosDum'
import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBasicDataTableComp,
} from '../../../../commons/component';

class EtatChargementMarchandisesAutresDocuments extends React.Component {

    defaultState = {
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }

    render() {
        return (
            <View style={style.fabContainer}>
                <ScrollView>
                    <CardBox style={styles.cardBox}>
                        <Accordion badr title={translate('vuEmbarquee.versions.title')}>
                            <ScrollView >
                                {!this.props.showProgress && (
                                    <ScrollView>
                                        <View>
                                            <EtatChargementInfosDum />
                                        </View>
                                    </ScrollView>
                                )}
                            </ScrollView>
                        </Accordion>
                    </CardBox>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.pecEtatChargementReducer };
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
)(EtatChargementMarchandisesAutresDocuments);
