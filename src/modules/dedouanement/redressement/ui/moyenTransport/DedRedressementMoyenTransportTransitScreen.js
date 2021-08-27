import React from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import {
    ComAccordionComp as Accordion,
    ComBadrCardBoxComp as CardBox,
    ComBadrKeyValueComp,
    ComBasicDataTableComp,
    ComBadrButtonComp,
    ComBadrLibelleComp,
} from '../../../../../commons/component';
import translate from "../../../../../commons/i18n/ComI18nHelper";
import DedRedressementRow from "../common/DedRedressementRow";
import styles from '../../style/DedRedressementStyle';
import { Checkbox, RadioButton } from "react-native-paper";
import { primaryColor } from "../../../../../commons/styles/ComThemeStyle";

class DedRedressementMoyenTransportTransitScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLine: null
        };
        this.cols = [
            {
                code: 'numeroOrdre',
                libelle: translate('dedouanement.info.num'),
                width: 150,
                icon: 'eye',
                size: 25,
                component: 'button',
                action: (row, index) => this.onComponentChecked(row, index),
            },
            {
                code: 'referenceConteneur',
                libelle: translate('dedouanement.info.referenceConteneur'),
                width: 150,
            },
            {
                code: 'matricule',
                libelle: translate('dedouanement.info.matricule'),
                width: 150,
            },
            {
                code: 'typeContenant.libelle',
                libelle: translate('dedouanement.info.typeMoyenTransport'),
                width: 150,
            },
            {
                code: 'stringDateEstimative',
                libelle: translate('dedouanement.info.dateEstimative'),
                width: 150,
            },
            {
                code: 'dateEffective',
                libelle: translate('dedouanement.info.dateEffective'),
                width: 150,
            },
            {
                code: 'presenceDouaniere',
                libelle: translate('dedouanement.info.presenceDouaniere'),
                width: 150,
            },
            {
                code: 'referenceScellees',
                libelle: translate('dedouanement.info.referenceScellees'),
                width: 150,
            },
            {
                code: 'integriteScelles',
                libelle: translate('dedouanement.info.integriteScelles'),
                width: 150,
            },
        ];
    }


    onComponentChecked = (row, index) => {
        console.log('Row selectionner' + JSON.stringify(row));

        this.setState({
            selectedLine: row
        });
    };

    componentDidUpdate() {
        if (this.props.route?.params?.first) {
            this.refs._badrTable.reset();
        }
    }


    render() {

        return (
            <View >
                <ScrollView>
                    <CardBox >
                        <Accordion
                            title={'Nombre total des moyens de transport : ' + this.props?.data?.dedSectionMoyenTransportVO?.listDeclarationMoyenTransportVO?.length}
                            expanded
                        >
                            <ComBasicDataTableComp
                                ref="_badrTable"
                                id="scannerTable"
                                rows={this.props?.data?.dedSectionMoyenTransportVO?.listDeclarationMoyenTransportVO}
                                cols={this.cols}
                                totalElements={this.props?.data?.dedSectionMoyenTransportVO?.listDeclarationMoyenTransportVO?.length}
                                maxResultsPerPage={10}
                                paginate={true}
                                showProgress={this.props.showProgress}
                                withId={false}
                            />

                            {(this.state.selectedLine) &&
                                <View>
                                    <DedRedressementRow>
                                        <ComBadrButtonComp
                                            style={styles.actionBtn}
                                            onPress={() => {
                                                this.setState({
                                                    selectedLine: null
                                                });
                                            }}
                                            text={translate('t6bisCreation.t6bisCreation.buttons.abandonner')}
                                        />
                                    </DedRedressementRow>
                                    <DedRedressementRow  >
                                        <ComBadrKeyValueComp
                                            libelle="Type moyen de transport"
                                            value={this.state?.selectedLine?.typeContenant?.libelle}
                                        />
                                    </DedRedressementRow>
                                    <DedRedressementRow  >
                                        <ComBadrKeyValueComp
                                            libelle="Référence moyen de transport"
                                            value={this.state?.selectedLine?.referenceConteneur}
                                        />
                                    </DedRedressementRow>
                                    <DedRedressementRow  >
                                        <ComBadrKeyValueComp
                                            libelle="Matricule"
                                            value={this.state?.selectedLine?.matricule}
                                        />
                                    </DedRedressementRow>
                                    <DedRedressementRow  >
                                        <ComBadrKeyValueComp
                                            libelle="Date et heure d’arrivée estimative"
                                            value={this.state?.selectedLine?.stringDateEstimative}
                                        />
                                    </DedRedressementRow>
                                    <DedRedressementRow  >
                                        <ComBadrKeyValueComp
                                            libelle="Date/heure effective d’arrivée"
                                            value={this.state?.selectedLine?.dateEffective}
                                        />
                                    </DedRedressementRow>
                                    <DedRedressementRow  >
                                        <ComBadrKeyValueComp
                                            libelle="Présence douanière"
                                            children={
                                                <Checkbox
                                                    color={primaryColor}
                                                    disabled={true}
                                                    status={
                                                        this.state?.selectedLine?.presenceDouaniere
                                                            ? 'checked'
                                                            : 'unchecked'
                                                    }
                                                />
                                            }
                                        />
                                    </DedRedressementRow>
                                    <DedRedressementRow  >
                                        <ComBadrKeyValueComp
                                            libelle="Référence de scellées"
                                            value={this.state?.selectedLine?.dateEffective}
                                        />
                                    </DedRedressementRow>
                                    <DedRedressementRow  >
                                        <ComBadrKeyValueComp
                                            libelle="Intégrité des scellés"
                                            children={
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text>Oui</Text>
                                                        <RadioButton
                                                            color={primaryColor}
                                                            value="Oui"
                                                            disabled={true}
                                                            status={
                                                                this.state?.selectedLine?.integriteScelles ? 'checked' : 'unchecked'
                                                            }
                                                        />
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text>Non</Text>
                                                        <RadioButton
                                                            color={primaryColor}
                                                            value="Non"
                                                            disabled={true}
                                                            status={
                                                                this.state?.selectedLine?.integriteScelles ? 'checked' : 'unchecked'
                                                            }
                                                        />
                                                    </View>
                                                </View>
                                            }
                                        />
                                    </DedRedressementRow>
                                </View>
                            }

                        </Accordion>
                    </CardBox>
                </ScrollView>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return { ...state.consulterDumReducer };
}

export default connect(
    mapStateToProps,
    null,
)(DedRedressementMoyenTransportTransitScreen);
