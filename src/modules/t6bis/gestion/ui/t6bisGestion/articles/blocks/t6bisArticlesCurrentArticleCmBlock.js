import _ from 'lodash';
import React from 'react';
import { Text, View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { HelperText, TextInput } from 'react-native-paper';
import { ComAccordionComp, ComBadrButtonComp, ComBadrDatePickerComp, ComBadrErrorMessageComp, ComBadrPickerComp } from '../../../../../../../commons/component';
import translate from "../../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet } from '../../../../../../../commons/styles/ComThemeStyle';
import * as T6BISConstantes from "../../../../../utils/t6bisConstants";
import { formatNomenclature, stringNotEmpty } from '../../../../../utils/t6bisUtils';
import styles from "../../../../style/t6bisGestionStyle";
import moment from 'moment';







class T6bisArticlesCurrentArticleCmBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            currentArticle: this.props.currentArticle,
            acUniteValue: null,
            errorMessage: null
        };

    }

    handleCodeNomenclatureOnBlur = (text) => {

        {
            this.setState({
                currentArticle: {
                    ...this.state.currentArticle,
                    codeNomenclature: formatNomenclature(text)
                }

            });
            this.props.currentArticle.codeNomenclature = text;
        }
    }

    handleUniteQuantiteChanged = (unite) => {
        this.setState({
            acUniteValue: unite,
			currentArticle: {
                ...this.state.currentArticle, uniteQuantite: unite.code, libelleUnite: unite.libelle}
        });


    };


    handleNatureMarchandiseChanged = (itemValue, itemIndex, selectedItem) => {
        this.setState({
            currentArticle: {
                ...this.state.currentArticle,
                natureMarchandise: itemValue
            }
        });

    };

    handleDeviseChanged = (item) => {
        this.setState({
            currentArticle: {
                ...this.state.currentArticle,
                devise: item
            }
        });
    };

    componentDidMount() {

        console.log('T6bisArticlesCurrentArticleBlock componentWillmount');
    }



    componentWillUnmount() {
        console.log('T6bisArticlesListArticlesBlock componentWillUnmount');
    }



    reset = () => {
        console.log('T6bisArticreturnlesListArticlesBlock reset');
    };

    ajouter = () => {
        if (!this.checkRequiredFields()) {								 
            this.props.callbackHandler(T6BISConstantes.ADD_ARTCLE_CM_TASK, this.state.currentArticle);
        }


    }

    modifier = () => {
        if (!this.checkRequiredFields()) {								 
            this.props.callbackHandler(T6BISConstantes.MODIFY_ARTCLE_CM_TASK, this.state.currentArticle);
        }

    }

    checkRequiredFields = () => {
        let msg = '';
        let required = false;

        if (_.isEmpty(this.state.currentArticle.marque)) {
            required = true;
            msg += translate('t6bisGestion.tabs.articles.articleBlock.cm.marque');
        }

        if (_.isEmpty(this.state.currentArticle.cylindree)) {
            required = true;
            msg += !_.isEmpty(msg) ? "," : "";
            msg += translate('t6bisGestion.tabs.articles.articleBlock.cm.cylindree');
        }
        if (_.isEmpty(this.state.currentArticle.numeroCadre)) {
            required = true;
            msg += !_.isEmpty(msg) ? "," : "";
            msg += translate('t6bisGestion.tabs.articles.articleBlock.cm.numeroCadre');
        }
        if (_.isEmpty(this.state.currentArticle.valeurTaxable)) {
            required = true;
            msg += !_.isEmpty(msg) ? "," : "";
            msg += translate('t6bisGestion.tabs.articles.articleBlock.cm.valeurTaxable');
        }
        if (!_.isEmpty(this.state.currentArticle.montantFacture) && _.isEmpty(this.state.currentArticle.devise)) {
            required = true;
            msg += !_.isEmpty(msg) ? ',' : '';
            msg += translate('t6bisGestion.tabs.articles.articleBlock.cm.devise');
        }
        
        

        if (required) {
            msg = translate('t6bisGestion.tabs.articles.articleBlock.cm.champsObligatoires') + msg;
            this.setState({
                errorMessage: msg
            });
        } else {
            this.setState({
                errorMessage: null
            });

        }
        return required;


    }
    
	clearComboboxAutoComplete() {
        this.comboDevise.clearInput();
     }						  

    static getDerivedStateFromProps(props, state) {
        // console.log('getDerivedStateFromProps--------------------props ', props);
        // console.log('getDerivedStateFromProps--------------------state ', state);

        if (
            props.currentArticle && props.currentArticle.id !== state.currentArticle.id
        ) {
            return {
                currentArticle: props.currentArticle// update the value of specific key
            };
        }
        // Return null to indicate no change to state.
        return null;
    }




    render() {
        return (

            <ComAccordionComp  expanded={true}>

                {this.state.errorMessage != null && (
                    <ComBadrErrorMessageComp message={this.state.errorMessage} />
                )}

                <View>


                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.marque')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringNotEmpty(this.state.currentArticle?.marque)}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.valeurObligatoire')}
                            </HelperText>


                        </Col>

                        <Col size={60} style={styles.labelContainer}>
                            <TextInput
                                disabled={this.props.readOnly}
                                mode="outlined"
                                label={translate('t6bisGestion.tabs.articles.articleBlock.cm.marque')}
                                value={this.state.currentArticle?.marque}
                                onChangeText={(text) => this.setState({
                                    currentArticle: {
                                        ...this.state.currentArticle,
                                        marque: text
                                    }
                                })}
                            />
                        </Col>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.modele')}
                            </Text>



                        </Col>

                        <Col size={60} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.articles.articleBlock.cm.modele')}
                                value={this.state.currentArticle?.modele}
                                onChangeText={(text) => this.setState({
                                    currentArticle: {
                                        ...this.state.currentArticle,
                                        modele: text
                                    }
                                })}
                            />
                        </Col>




                    </Row>
                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.cylindree')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringNotEmpty(this.state.currentArticle?.cylindree)}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.valeurObligatoire')}
                            </HelperText>


                        </Col>

                        <Col size={60} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.articles.articleBlock.cm.cylindree')}
                                maxLength={1}
                                keyboardType={'phone-pad'}
                                value={this.state.currentArticle?.cylindree}
                                onChangeText={(text) => this.setState({
                                    currentArticle: {
                                        ...this.state.currentArticle,
                                        cylindree: text
                                    }
                                })}
                            />
                        </Col>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.numeroCadre')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringNotEmpty(this.state.currentArticle?.numeroCadre)}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.valeurObligatoire')}
                            </HelperText>


                        </Col>

                        <Col size={60} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.articles.articleBlock.cm.numeroCadre')}
                                value={this.state.currentArticle?.numeroCadre}
                                onChangeText={(text) => this.setState({
                                    currentArticle: {
                                        ...this.state.currentArticle,
                                        numeroCadre: text
                                    }
                                })}
                            />
                        </Col>





                    </Row>
                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.numeroImmatriculation')}
                            </Text>
                            


                        </Col>

                        <Col size={60} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                disabled={this.props.readOnly}
                                label={translate('t6bisGestion.tabs.articles.articleBlock.cm.numeroImmatriculation')}
                                value={this.state.currentArticle?.numeroImmatriculation}
                                onChangeText={(text) => this.setState({
                                    currentArticle: {
                                        ...this.state.currentArticle,
                                        numeroImmatriculation: text
                                    }
                                })}
                            />
                        </Col>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.dateMiseCirculation')}
                            </Text>


                        </Col>

                        <Col size={60} style={styles.labelContainer}>
                            <ComBadrDatePickerComp
                                disabled={this.props.readOnly}
                                labelDate={translate('t6bisGestion.tabs.articles.articleBlock.cm.dateMiseCirculation')}
                                value={this.state.currentArticle.dateMiseEnCirculation ? moment(this.state.currentArticle.dateMiseEnCirculation, 'DD/MM/YYYY', true) : ''}
                                dateFormat="DD/MM/YYYY"
                                onDateChanged={(text) => this.setState({
                                    currentArticle: {
                                        ...this.state.currentArticle,
                                        dateMiseEnCirculation: text
                                    }
                                })}
                                inputStyle={styles.textInputsStyle}
                                 
                            />
                        </Col>





                    </Row>
                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.valeurTaxable')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={!stringNotEmpty(this.state.currentArticle?.valeurTaxable)}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.valeurObligatoire')}
                            </HelperText>


                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <TextInput
                                disabled={this.props.readOnly}
                                mode="outlined"
                                keyboardType={'number-pad'}
                                maxLength={24}
                                label={translate('t6bisGestion.tabs.articles.articleBlock.cm.valeurTaxable')}
                                value={this.state.currentArticle?.valeurTaxable}
                                onChangeText={(text) => {
                                    text = text.replace(/[^0-9.]/g, '');
                                    this.setState({
                                        currentArticle: {
                                            ...this.state.currentArticle,
                                            valeurTaxable: text
                                        }
                                    }); 
                                }}
                            />
                        </Col>

                    </Row>
                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.montantFacture')}
                            </Text>
                            

                        </Col>

                        <Col size={60} style={styles.labelContainer}>
                            <TextInput
                                disabled={this.props.readOnly}
                                mode="outlined"
                                keyboardType={'number-pad'}
                                maxLength={24}
                                label={translate('t6bisGestion.tabs.articles.articleBlock.cm.montantFacture')}
                                value={this.state.currentArticle?.montantFacture}
                                onChangeText={(text) => {
                                    text = text.replace(/[^0-9.]/g, '');
                                    this.setState({
                                    
                                        currentArticle: {
                                            ...this.state.currentArticle,
                                            montantFacture: text
                                        }
                                    });
                                }}
                            />
                        </Col>



                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.articles.articleBlock.cm.devise')}
                            </Text>
                            <HelperText
                                type="error"
                                padding="none"
                                visible={stringNotEmpty(this.state.currentArticle?.montantFacture) && !stringNotEmpty(this.state.currentArticle?.devise)}>
                                {translate(
                                    't6bisGestion.tabs.articles.articleBlock.mtm.valeurObligatoire',
                                )}
                            </HelperText>
                           

                        </Col>
                        <Col size={60} style={styles.labelContainer}>
                            <ComBadrPickerComp
                                disabled={this.props.readOnly}
                                onRef={(ref) => (this.comboDevise = ref)}
                                key="devise"
                                style={CustomStyleSheet.badrPicker}
                                cle="code"
                                libelle="libelle"
                                module="REF_LIB"
                                command="completeDeviseChangeCmb"
								selected={this.state.currentArticle?.devise}
                                selectedValue={this.state.currentArticle?.devise}											
                                onValueChange={(item) =>
                                    this.handleDeviseChanged(item)
                                }
                                param=""
                                typeService="SP"
                                storeWithKey="devise"
                                storeLibelleWithKey="libelle"
                            />
                        </Col>
                    </Row>
                    



                       
                    {(!this.props.readOnly) && (<Row size={200}>
                        <Col size={200}>

                            <View style={styles.ComContainerCompBtn}>


                                {(this.state.currentArticle?.isNew) && (<ComBadrButtonComp
                                    style={styles.actionBtn}
                                    onPress={() => {
                                        this.ajouter();
                                    }}
                                    text={translate('t6bisGestion.tabs.articles.articleBlock.buttons.ajouter')}
                                />)}

                                {(!this.state.currentArticle?.isNew) && (<ComBadrButtonComp
                                    style={styles.actionBtn}
                                    onPress={() => {
                                        this.modifier();
                                    }}
                                    text={translate('t6bisGestion.tabs.articles.articleBlock.buttons.modifier')}
                                />)}
                                
                            </View>
                        </Col>
                    </Row>)}


                </View>

            </ComAccordionComp>

        );
    }
}






export default T6bisArticlesCurrentArticleCmBlock;



