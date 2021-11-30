import React from 'react';
import {Text, View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrPickerComp,
} from '../../../../../../../commons/component';
import {CustomStyleSheet} from '../../../../../../../commons/styles/ComThemeStyle';
import styles from '../../../../style/t6bisGestionStyle';
import translate from '../../../../../../../commons/i18n/ComI18nHelper';
import {Col, Row} from 'react-native-easy-grid';
import {HelperText, TextInput} from 'react-native-paper';
import {
  formatNomenclature,
  stringNotEmpty,
} from '../../../../../utils/t6bisUtils';
import _ from 'lodash';
import * as T6BISConstantes from '../../../../../utils/t6bisConstants';

class T6bisArticlesCurrentArticleMtmBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentArticle: this.props.currentArticle,
      acUniteValue: null,
      errorMessage: null,
    };
  }

  handleCodeNomenclatureOnBlur = (text) => {
    {
      this.setState({
        currentArticle: {
          ...this.state.currentArticle,
          codeNomenclature: formatNomenclature(text),
        },
      });
      this.state.currentArticle.codeNomenclature = formatNomenclature(text);
    }
  };

  handleUniteQuantiteChanged = (unite) => {
    this.setState({
      acUniteValue: unite,
      currentArticle: {
        ...this.state.currentArticle,
        uniteQuantite: unite.code,
        libelleUnite: unite.libelle,
      },
    });
  };

  handleNatureMarchandiseChanged = (itemValue, itemIndex, selectedItem) => {
    this.setState({
      currentArticle: {
        ...this.state.currentArticle,
        natureMarchandise: itemValue,
      },
    });
  };

  handleDeviseChanged = (item) => {
    this.setState({
      currentArticle: {
        ...this.state.currentArticle,
        devise: item,
      },
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
      this.clearComboboxAutoComplete();
      this.props.callbackHandler(
        T6BISConstantes.ADD_ARTCLE_MTM_TASK,
        this.state.currentArticle,
      );
    }
  };

  modifier = () => {
    if (!this.checkRequiredFields()) {
      this.clearComboboxAutoComplete();
      this.props.callbackHandler(
        T6BISConstantes.MODIFY_ARTCLE_MTM_TASK,
        this.state.currentArticle,
      );
    }
  };

  checkRequiredFields = () => {
    let msg = '';
    let required = false;

    if (_.isEmpty(this.state.currentArticle.natureMarchandise)) {
      required = true;
      msg += translate(
        't6bisGestion.tabs.articles.articleBlock.mtm.natureMarchandise',
      );
    }

    if (_.isEmpty(this.state.currentArticle.designation)) {
      required = true;
      msg += !_.isEmpty(msg) ? ',' : '';
      msg += translate(
        't6bisGestion.tabs.articles.articleBlock.mtm.designation',
      );
    }
    if (_.isEmpty(this.state.currentArticle.valeurTaxable)) {
      required = true;
      msg += !_.isEmpty(msg) ? ',' : '';
      msg += translate(
        't6bisGestion.tabs.articles.articleBlock.mtm.valeurTaxable',
      );
    }
    if (_.isEmpty(this.state.currentArticle.montantFacture)) {
      required = true;
      msg += !_.isEmpty(msg) ? ',' : '';
      msg += translate(
        't6bisGestion.tabs.articles.articleBlock.mtm.montantFacture',
      );
    }
    if (_.isEmpty(this.state.currentArticle.devise)) {
      required = true;
      msg += !_.isEmpty(msg) ? ',' : '';
      msg += translate('t6bisGestion.tabs.articles.articleBlock.mtm.devise');
    }
    if (_.isEmpty(this.state.currentArticle.quantite)) {
      required = true;
      msg += !_.isEmpty(msg) ? ',' : '';
      msg += translate('t6bisGestion.tabs.articles.articleBlock.mtm.quantite');
    }

    if (required) {
      msg =
        translate(
          't6bisGestion.tabs.articles.articleBlock.mtm.champsObligatoires',
        ) + msg;
      this.setState({
        errorMessage: msg,
      });
    } else {
      this.setState({
        errorMessage: null,
      });
    }
    return required;
  };
  nouveau = () => {
    this.clearComboboxAutoComplete();
    this.setState({
      errorMessage: null,
    });
    this.props.callbackHandler(T6BISConstantes.NEW_ARTCLE_MTM_TASK, null);
  };

  clearComboboxAutoComplete() {
    this.comboNatureMarchandise.clearInput();
    this.comboDevise.clearInput();
  }

  static getDerivedStateFromProps(props, state) {
    // console.log('getDerivedStateFromProps--------------------props ', props);
    // console.log('getDerivedStateFromProps--------------------state ', state);

    if (
      props.currentArticle &&
      props.currentArticle.id !== state.currentArticle.id
    ) {
      return {
        currentArticle: props.currentArticle, // update the value of specific key
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  render() {
    return (
      <ComAccordionComp
        title={
          translate('t6bisGestion.tabs.articles.articleBlock.mtm.title') +
          this.state.currentArticle?.numArticle
        }
        expanded={true}>
        {this.state.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.state.errorMessage} />
        )}

        <View>
          <Row size={200}>
            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.codeNomenclature',
                )}
              </Text>
            </Col>

            <Col size={60} style={styles.labelContainer}>
              <TextInput
                disabled={this.props.readOnly}
                mode="outlined"
                maxLength={10}
                label={translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.codeNomenclature',
                )}
                value={this.state.currentArticle?.codeNomenclature}
                onEndEditing={(event) =>
                  this.handleCodeNomenclatureOnBlur(event.nativeEvent.text)
                }
              />
            </Col>

            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.natureMarchandise',
                )}
              </Text>
              <HelperText
                type="error"
                padding="none"
                visible={
                  !stringNotEmpty(this.state.currentArticle?.natureMarchandise)
                }>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.valeurObligatoire',
                )}
              </HelperText>
            </Col>
            <Col size={60} style={styles.labelContainer}>
              <ComBadrPickerComp
                onRef={(ref) => (this.comboNatureMarchandise = ref)}
                disabled={this.props.readOnly}
                style={CustomStyleSheet.badrPicker}
                cle="code"
                libelle="libelle"
                module="REF_LIB"
                selectedValue={this.state.currentArticle?.natureMarchandise}
                selected={this.state.currentArticle?.natureMarchandise}
                command="completeNatureMarchandise"
                onValueChange={(itemValue, itemIndex, selectedItem) =>
                  this.handleNatureMarchandiseChanged(
                    itemValue,
                    itemIndex,
                    selectedItem,
                  )
                }
                param=""
                typeService="SP"
              />
            </Col>
          </Row>
          <Row size={200}>
            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.designation',
                )}
              </Text>
              <HelperText
                type="error"
                padding="none"
                visible={
                  !stringNotEmpty(this.state.currentArticle?.designation)
                }>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.valeurObligatoire',
                )}
              </HelperText>
            </Col>

            <Col size={160} style={{...styles.labelContainer, marginLeft: 8}}>
              <TextInput
                mode="outlined"
                disabled={this.props.readOnly}
                label={translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.designation',
                )}
                value={this.state.currentArticle?.designation}
                onChangeText={(text) =>
                  this.setState({
                    currentArticle: {
                      ...this.state.currentArticle,
                      designation: text,
                    },
                  })
                }
              />
            </Col>
          </Row>
          <Row size={200}>
            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.valeurTaxable',
                )}
              </Text>
              <HelperText
                type="error"
                padding="none"
                visible={
                  !stringNotEmpty(this.state.currentArticle?.valeurTaxable)
                }>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.valeurObligatoire',
                )}
              </HelperText>
            </Col>

            <Col size={160} style={{...styles.labelContainer, marginLeft: 8}}>
              <TextInput
                mode="outlined"
                disabled={this.props.readOnly}
                keyboardType={'number-pad'}
                label={translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.valeurTaxable',
                )}
                value={this.state.currentArticle?.valeurTaxable}
                onChangeText={(text) =>
                  this.setState({
                    currentArticle: {
                      ...this.state.currentArticle,
                      valeurTaxable: text,
                    },
                  })
                }
              />
            </Col>
          </Row>
          <Row size={200}>
            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.montantFacture',
                )}
              </Text>
              <HelperText
                type="error"
                padding="none"
                visible={
                  !stringNotEmpty(this.state.currentArticle?.montantFacture)
                }>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.valeurObligatoire',
                )}
              </HelperText>
            </Col>

            <Col size={60} style={styles.labelContainer}>
              <TextInput
                mode="outlined"
                disabled={this.props.readOnly}
                keyboardType={'number-pad'}
                label={translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.montantFacture',
                )}
                value={this.state.currentArticle?.montantFacture}
                onChangeText={(text) =>
                  this.setState({
                    currentArticle: {
                      ...this.state.currentArticle,
                      montantFacture: text,
                    },
                  })
                }
              />
            </Col>

            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.devise',
                )}
              </Text>
              <HelperText
                type="error"
                padding="none"
                visible={!stringNotEmpty(this.state.currentArticle?.devise)}>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.valeurObligatoire',
                )}
              </HelperText>
            </Col>
            <Col size={60} style={styles.labelContainer}>
              <ComBadrPickerComp
                disabled={this.props.readOnly}
                onRef={(ref) => (this.comboDevise = ref)}
                style={CustomStyleSheet.badrPicker}
                cle="code"
                libelle="libelle"
                module="REF_LIB"
                command="completeDeviseChangeCmb"
                selected={this.state.currentArticle?.devise}
                selectedValue={this.state.currentArticle?.devise}
                onValueChange={(item) => this.handleDeviseChanged(item)}
                param=""
                typeService="SP"
                storeWithKey="devise"
                storeLibelleWithKey="libelle"
              />
            </Col>
          </Row>
          <Row size={200}>
            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.quantite',
                )}
              </Text>
              <HelperText
                type="error"
                padding="none"
                visible={!stringNotEmpty(this.state.currentArticle?.quantite)}>
                {translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.valeurObligatoire',
                )}
              </HelperText>
            </Col>

            <Col size={60} style={styles.labelContainer}>
              <TextInput
                mode="outlined"
                disabled={this.props.readOnly}
                label={translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.quantite',
                )}
                keyboardType={'phone-pad'}
                value={this.state.currentArticle?.quantite}
                onChangeText={(text) =>
                  this.setState({
                    currentArticle: {
                      ...this.state.currentArticle,
                      quantite: text,
                    },
                  })
                }
              />
            </Col>

            <Col size={40} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate('t6bisGestion.tabs.articles.articleBlock.mtm.unite')}
              </Text>
            </Col>
            <Col size={60} style={styles.labelContainer}>
              <ComBadrAutoCompleteChipsComp
                onRef={(ref) => (this.autoCompleteUnite = ref)}
                placeholder={translate(
                  't6bisGestion.tabs.articles.articleBlock.mtm.choisirValeur',
                )}
                code="code"
                disabled={this.props.readOnly}
                selected={this.state.currentArticle.libelleUnite}
                maxItems={3}
                libelle="libelle"
                command="completeUniteQte"
                onDemand={true}
                searchZoneFirst={false}
                onValueChange={this.handleUniteQuantiteChanged}
              />
            </Col>
          </Row>
          {!this.props.readOnly && (
            <Row size={200}>
              <Col size={200}>
                <View style={styles.ComContainerCompBtn}>
                  {this.state.currentArticle?.isNew && (
                    <ComBadrButtonComp
                      style={styles.actionBtn}
                      onPress={() => {
                        this.ajouter();
                      }}
                      text={translate(
                        't6bisGestion.tabs.articles.articleBlock.buttons.ajouter',
                      )}
                    />
                  )}

                  {!this.state.currentArticle?.isNew && (
                    <ComBadrButtonComp
                      style={styles.actionBtn}
                      onPress={() => {
                        this.modifier();
                      }}
                      text={translate(
                        't6bisGestion.tabs.articles.articleBlock.buttons.modifier',
                      )}
                    />
                  )}
                  <ComBadrButtonComp
                    style={styles.actionBtn}
                    onPress={() => {
                      this.nouveau();
                    }}
                    text={translate(
                      't6bisGestion.tabs.articles.articleBlock.buttons.nouveau',
                    )}
                  />
                </View>
              </Col>
            </Row>
          )}
        </View>
      </ComAccordionComp>
    );
  }
}

export default T6bisArticlesCurrentArticleMtmBlock;
