import React, { Component } from 'react';
import { View } from 'react-native';
import { Col, Grid, Row } from "react-native-easy-grid";
import { Text, TextInput } from 'react-native-paper';
import { connect } from "react-redux";
import { ComBadrButtonComp, ComBadrPickerComp } from "../../../../../commons/component";
import translate from '../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../commons/styles/ComThemeStyle';
import DedRedressementRow from '../../../../dedouanement/redressement/ui/common/DedRedressementRow';


class ComBadrIntervenantComp extends Component {


    render() {
        return (
            <View>
                <View style={styles.row}>
                    <Col size={30} style={styles.labelContainer}>
                        <Text style={styles.labelTextStyle}>
                            {translate(
                                't6bisGestion.tabs.entete.redevableBlock.typeIdentifiant',
                            )}
                        </Text>
                    </Col>
                    <Col size={70} style={styles.labelContainer}>
                        <ComBadrPickerComp
                            disabled={this.props.readOnly || this.props?.consultation}
                            onRef={(ref) => (this.comboArrondissements55 = ref)}
                            key="code"
                            style={CustomStyleSheet.badrPicker}
                            selectedValue={this.state?.intervenantVO?.numeroDocumentIndentite}
                            titleStyle={CustomStyleSheet.badrPickerTitle}
                            cle="code"
                            libelle="libelle"
                            module="REF_LIB"
                            command="getCmbTypeIdentifiant"
                            param={null}
                            typeService="SP"
                            storeWithKey="code"
                            storeLibelleWithKey="libelle"
                            onValueChange={(selectedValue, selectedIndex, item) =>

                                item?.code ? this.onChangeTypeIdentifiant(item) : {}
                            }
                        />
                    </Col>
                    <Col size={30} style={styles.labelContainer}>
                        <Text style={styles.labelTextStyle}>
                            {translate(
                                't6bisGestion.tabs.entete.redevableBlock.identifiant',
                            )}
                        </Text>
                    </Col>

                    <Col size={70} style={styles.labelContainer}>
                        <TextInput
                            disabled={this.props.readOnly || this.props?.consultation}
                            mode="outlined"
                            label={translate(
                                't6bisGestion.tabs.entete.redevableBlock.identifiant',
                            )}
                            value={this.state?.intervenantVO?.numeroDocumentIndentite}
                            onChangeText={(text) => {
                                this.setState({
                                    ...this.state,
                                    intervenantVO: {
                                        ...this.state.intervenantVO,
                                        numeroDocumentIndentite: text,
                                    },
                                });
                            }}
                            onEndEditing={() =>
                                this.chercherPersonneConcernee()
                            }
                        />
                    </Col>
                </View>
                <View style={styles.row}>
                    <Row style={styles.row}>
                        <Col size={30} style={styles.labelContainer}>
                            <Text >
                                {translate('t6bisGestion.tabs.entete.redevableBlock.nom')}
                            </Text>
                        </Col>
                        <Col size={70} style={styles.labelContainer} >
                            <TextInput
                                mode="outlined"
                                label={translate('t6bisGestion.tabs.entete.redevableBlock.nom')}
                                value={this.state?.intervenantVO?.nomIntervenant}
                            />
                        </Col>
                        <Col size={30} style={styles.labelContainer}>
                            <Text >
                                {translate('t6bisGestion.tabs.entete.redevableBlock.prenom')}
                            </Text>
                        </Col>
                        <Col size={70} style={styles.labelContainer} >
                            <TextInput
                                mode="outlined"
                                label={translate(
                                    't6bisGestion.tabs.entete.redevableBlock.prenom',
                                )}
                                value={this.state?.intervenantVO?.prenomIntervenant}

                            />
                        </Col>
                    </Row>
                </View>
                <View style={styles.row}>
                    <Row style={styles.containerActionBtn}>

                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            onPress={() => {
                                this.ajouterIntervenant();
                            }}
                            text={translate('transverse.confirmer')}
                            disabled={false}
                        />
                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            onPress={() => {
                                this.retablir();
                            }}
                            text={translate('transverse.retablir')}
                            disabled={false}
                        />
                    </Row>
                </View>
            </View>
        );
    }
}
const styles = {

    labelContainer: {
        justifyContent: 'center',
        margin: 5,
    },

    row: {
        flexDirection: 'row',
        padding: 10,
        margin: 10
    },
    containerActionBtn: {
        // flexDirection: 'row',
        justifyContent: 'space-around',
    },


};

const mapStateToProps = (state) => ({ ...state.intervenantReducer });

export default connect(mapStateToProps, null)(ComBadrIntervenantComp);