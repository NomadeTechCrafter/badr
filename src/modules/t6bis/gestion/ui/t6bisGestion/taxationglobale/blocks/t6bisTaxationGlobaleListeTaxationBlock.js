import { Text, View } from 'react-native';
import React from 'react';
import { Col, Row } from 'react-native-easy-grid';
import { TextInput } from 'react-native-paper';
import { ComAccordionComp, ComBadrButtonComp, ComBadrErrorMessageComp, ComBadrPickerComp, ComBasicDataTableComp } from '../../../../../../../commons/component';
import translate from "../../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from '../../../../../../../commons/styles/ComThemeStyle';
import styles from "../../../../style/t6bisGestionStyle";
import _ from 'lodash';
import { ADD_TAXATION_GLOBALE_TASK } from '../../../../../utils/t6bisConstants';
import { isAffaireChange, isAmendeTransactionnelle, isCm, isContrainteParCorps, isMtm, isTaxeCoordination } from '../../../../../utils/t6bisUtils';





class T6bisTaxationGlobaleListeTaxationBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            ligne: {},
            selectedIndex: -1
        };
        this.cols = [
            {
                code: 'rubriqueTaxation.libelle',
                libelle: translate('t6bisGestion.tabs.taxation.globale.rubriquesTable.rubriqueTaxationLibelle'),
                width: 300,
            },

            {
                code: 'montantTaxation',
                libelle: translate('t6bisGestion.tabs.taxation.globale.rubriquesTable.montantActuel'),
                width: 200,
            }
            /*  ,
             {
                 code: 'isNew',
                 libelle: '',
                 width: 50,
                 component: 'button',
                 icon: 'pencil',
                 action: (row, index) =>
                     this.updateItem(row, index)
             }, {
                 code: '',
                 libelle: '',
                 width: 50,
                 component: 'button',
                 icon: 'delete-outline',
                 action: (row, index) =>
                     this.removeItem(row, index)
             } */


        ];
    }





    updateItem = (row, index) => {
        console.log('updateItem row : ', row);
        console.log('updateItem index : ', index);

        this.setState({ ligne: row, selectedIndex: index });

    }
    removeItem = (row, index) => {
        console.log('removeItem row : ', row);
        console.log('removeItem index : ', index);
        this.props.t6bis.listeT6bisLigneTaxationGlobale.splice(index, 1);
        this.setState({ errorMessage: null, ligne: { rubriqueTaxation: { code: null }, tauxTaxation: null, montantTaxation: null }, selectedIndex: -1 });

    }


    handleRubriqueTaxationChanged = (itemValue, itemIndex, selectedItem) => {
        console.log('handleRubriqueTaxationChanged itemValue', itemValue);
        console.log('handleRubriqueTaxationChanged selectedItem', selectedItem);
        this.setState({
            ligne: {
                ...this.state.ligne,
                rubriqueTaxation: selectedItem
            }
        });

    };




    onItemSelected = (row) => {

        console.log('T6bisTaxationGlobaleListeTaxationBlock row : ', row);
    };



    componentDidMount() {

        if (!this.props.readOnly) {

            this.cols.push(
                {
                    code: 'isNew',
                    libelle: '',
                    width: 50,
                    component: 'button',
                    icon: 'pencil',
                    action: (row, index) =>
                        this.updateItem(row, index)
                });
            this.cols.push({
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) =>
                    this.removeItem(row, index)
            });

        }
    }

    componentDidUpdate() {

        /*  if (this.props.route.params?.first) {
             this.refs._badrTable.reset();
         } */
    }


    componentWillUnmount() {
        console.log('T6bisArticlesListArticlesBlock componentWillUnmount');
    }


    getCommandeByCodeType() {
        if (this.props.t6bis && this.props.t6bis?.codeTypeT6bis) {
            let codeTypeT6bis = this.props.t6bis.codeTypeT6bis;
            if (isMtm(codeTypeT6bis) || isCm(codeTypeT6bis)) {
                return "getListRubriqueMtmTaxationGlobale";
            } else if (isTaxeCoordination(codeTypeT6bis)) {
                return "getListRubriqueTaxeCoordination";
            }
            else if (isContrainteParCorps(codeTypeT6bis)) {
                return "getListRubriqueContrainteParCorps";
            } else if (isAffaireChange(codeTypeT6bis)) {
                return "getListRubriqueAffaireChangeImport";
            } else if (isAmendeTransactionnelle(codeTypeT6bis)) {
                return "getListAmendeTransactionnelle";
            }
        }
        return "getListRubrique";
    }

    supprimerTout = () => {
        this.props.t6bis.listeT6bisLigneTaxationGlobale = [];
        this.props.callbackHandler(ADD_TAXATION_GLOBALE_TASK, null);
        this.comboRrubriqueTaxation.clearInput();
        this.setState({ errorMessage: null, ligne: { rubriqueTaxation: { code: null }, tauxTaxation: null, montantTaxation: null }, selectedIndex: -1 });
    }
    valider() {


        if (_.isEmpty(this.state.ligne?.rubriqueTaxation)  || _.isEmpty(this.state.ligne?.montantTaxation)) {
            this.setState({
                errorMessage: translate('t6bisGestion.tabs.taxation.globale.rubriqueBloc.msgErreurRequired')
            });
        } else {

            let listFilter = this.props.t6bis.listeT6bisLigneTaxationGlobale.filter((elt) => elt.rubriqueTaxation.code == this.state.ligne.rubriqueTaxation.code)
            if (listFilter && listFilter.length > 0) {
                this.setState({
                    errorMessage: translate('t6bisGestion.tabs.taxation.globale.rubriqueBloc.msgErreurLineAleadyExist')
                });
                return;
            }
            if (this.state.selectedIndex == -1) {
                this.props.t6bis.listeT6bisLigneTaxationGlobale.push(this.state.ligne);
            } else {
                this.props.t6bis.listeT6bisLigneTaxationGlobale.splice(this.state.selectedIndex, 1, this.state.ligne);
            }
            this.props.callbackHandler(ADD_TAXATION_GLOBALE_TASK, null);
            this.comboRrubriqueTaxation.clearInput();
            this.setState({ ligne: { rubriqueTaxation: { code: null }, tauxTaxation: null, montantTaxation: null }, errorMessage: null, selectedIndex: -1 });
        }
    }

    retablir() {
        this.props.callbackHandler(ADD_TAXATION_GLOBALE_TASK, null);
        this.comboRrubriqueTaxation.clearInput();
        this.setState({ ligne: { rubriqueTaxation: { code: null }, tauxTaxation: null, montantTaxation: null }, errorMessage: null, selectedIndex: -1 });
    }



    reset = () => {
        console.log('T6bisArticlesListArticlesBlock reset');
    };





    render() {
        console.log("T6bisArticlesListArticlesBlock this.props", this.props);
        return (

            <ComAccordionComp title={translate('t6bisGestion.tabs.taxation.globale.bloc.title')} expanded={true}>

                {this.state.errorMessage != null && (
                    <ComBadrErrorMessageComp message={this.state.errorMessage} />
                )}
                <View>




                    <Row size={200}>
                        <Col size={200} style={{ ...styles.labelContainer, padding: 10 }}>

                            <View>
                                <ComBasicDataTableComp
                                    ref="_badrTable"
                                    id="articlesTable"
                                    rows={this.props.t6bis.listeT6bisLigneTaxationGlobale}
                                    cols={this.cols}
                                    onItemSelected={this.onItemSelected}
                                    totalElements={this.props.t6bis.listeT6bisLigneTaxationGlobale?.length}
                                    maxResultsPerPage={10}
                                    paginate={true}
                                    showProgress={this.props.showProgress}
                                    withId={false}
                                />
                            </View>
                        </Col>
                    </Row>
                    {(!this.props.readOnly) && (<Row size={200}>
                        <Col size={200} style={{ padding: 10 }}>
                            <View style={styles.ComContainerCompBtn}>


                                <ComBadrButtonComp
                                    style={styles.actionBtn}
                                    onPress={() => {
                                        this.supprimerTout();
                                    }}
                                    text={translate('t6bisGestion.tabs.taxation.globale.buttons.supprimerTout')}

                                />
                            </View>
                        </Col>

                    </Row>)}

                    {(!this.props.readOnly) && (<Row size={200}><Col>
                        <View style={{ padding: 10 }}>

                            <Row size={200}>
                                <Col size={40} style={styles.labelContainer}>
                                    <Text style={styles.labelTextStyle}>
                                        {translate('t6bisGestion.tabs.taxation.globale.rubriqueBloc.rubriqueTaxation') + this.state.ligne.rubriqueTaxation?.code}
                                    </Text>

                                </Col>
                                <Col size={160} style={styles.labelContainer}>
                                    <ComBadrPickerComp
                                        onRef={(ref) => (this.comboRrubriqueTaxation = ref)}
                                        style={CustomStyleSheet.badrPicker}
                                        cle="code"
                                        libelle="libelle"
                                        module="REF_LIB"
                                        selectedValue={this.state.ligne.rubriqueTaxation?.code}
                                        selected={this.state.ligne.rubriqueTaxation?.code}
                                        command={this.getCommandeByCodeType()}
                                        onValueChange={(itemValue, itemIndex, selectedItem) =>
                                            this.handleRubriqueTaxationChanged(itemValue, itemIndex, selectedItem)
                                        }
                                        param=""
                                        typeService="SP"
                                    />
                                </Col>
                            </Row>
                            <Row size={200}>
                                <Col size={40} style={styles.labelContainer}>
                                    <Text style={styles.labelTextStyle}>
                                        {translate('t6bisGestion.tabs.taxation.globale.rubriqueBloc.tauxTaxation')}
                                    </Text>

                                </Col>

                                <Col size={60} style={styles.labelContainer}>
                                    <TextInput
                                        mode="outlined"
                                        keyboardType={'number-pad'}
                                        label={translate('t6bisGestion.tabs.taxation.globale.rubriqueBloc.tauxTaxation')}
                                        value={this.state.ligne?.tauxTaxation}
                                        onChangeText={(text) => this.setState({
                                            ligne: {
                                                ...this.state.ligne,
                                                tauxTaxation: text
                                            }
                                        })}
                                    />
                                </Col>
                                <Col size={40} style={styles.labelContainer}>
                                    <Text style={styles.labelTextStyle}>
                                        {translate('t6bisGestion.tabs.taxation.globale.rubriqueBloc.montantTaxation')}
                                    </Text>

                                </Col>

                                <Col size={60} style={styles.labelContainer}>
                                    <TextInput
                                        mode="outlined"
                                        label={translate('t6bisGestion.tabs.taxation.globale.rubriqueBloc.montantTaxation')}
                                        keyboardType={'phone-pad'}
                                        value={this.state.ligne?.montantTaxation}
                                        onChangeText={(text) => this.setState({
                                            ligne: {
                                                ...this.state.ligne,
                                                montantTaxation: text
                                            }
                                        })}
                                    />
                                </Col>


                            </Row>
                            <Row size={200}>
                                <Col size={200} style={{ padding: 10 }}>
                                    <View style={styles.ComContainerCompBtn}>
                                        <ComBadrButtonComp
                                            style={styles.actionBtn}
                                            onPress={() => {
                                                this.valider();
                                            }}
                                            text={translate('transverse.valider')}
                                        />

                                        <ComBadrButtonComp
                                            style={styles.actionBtn}
                                            onPress={() => {
                                                this.retablir();
                                            }}
                                            text={translate('transverse.retablir')}

                                        />
                                    </View>
                                </Col>

                            </Row>

                        </View></Col></Row>)}


                </View>





            </ComAccordionComp>

        );
    }
}






export default T6bisTaxationGlobaleListeTaxationBlock;



