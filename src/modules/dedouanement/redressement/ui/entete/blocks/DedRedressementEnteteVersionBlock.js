
import React from 'react';
import _ from 'lodash';
import { View, TouchableOpacity, Text } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { Divider } from 'react-native-elements';
import { Checkbox, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp, ComBadrCardWithTileComp, ComBadrKeyValueComp, ComBadrModalComp, ComBadrTouchableButtonComp
} from '../../../../../../commons/component';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, lightGris, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import { request } from '../../../state/actions/DedAction';
import dedCalculerDelaiTransitAction from '../../../state/actions/dedCalculerDelaiTransitAction';
import {
  CALCULER_DELAI_TRANSIT_REQUEST,
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST
} from '../../../state/DedRedressementConstants';
import styles from '../../../style/DedRedressementStyle';
import { CATEGORIE_GLOBALE_VOY, CATEGORIE_PROVISOIRE_INIT, CATEGORIE_PROVISOIRE_VOY, CODE_TYPEDUM_COMPLEMENTAIRE } from '../../../utils/DedConstants';
import { getValueByPath, initDedCategorie } from '../../../utils/DedUtils';
import DedRedressementRow from '../../common/DedRedressementRow';
import DedRedressementEnteteInfoBlock from './DedRedressementEnteteInfoBlock';
import DedEchangeConsultationAmpiScreen from '../../consultationAmpi/DedEchangeConsultationAmpiScreen';

class DedRedressementEnteteVersionBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentaireDialogVisible: false,
      articles: [],
      articlesContestes: [],
      dedDumVo: this.props.data,
      bureauDestDisabled: false,
      combineeDisabled: false,
      lieuStockageDisabled: false,
      showListAMPI:false
    };
  }

  componentDidMount() {
    this.initCombineeDisabled();
  }

  isVersionCourante = () => {
    return !(
      getValueByPath(
        'dedReferenceVO.numeroVersionCourante',
        this.props.data,
      ) === getValueByPath('dedReferenceVO.numeroVersion', this.props.data)
    );
  };

  handleCommentaireClicked = () => {
    this.setState({ isCommentaireDialogVisible: true });
  };

  handleConfirmCommentaire = () => {
    this.setState({ isCommentaireDialogVisible: false });
  };

  handleCancelCommentaire = () => {
    this.setState({ isCommentaireDialogVisible: false });
  };
  onDismissConsultationAMPIScreen = () => {
    this.setState({ showListAMPI: false });
  };
  handleVersionCouranteClicked = () => {
    this.callRedux({
      idDec: getValueByPath('dedReferenceVO.identifiant', this.props.data),
      numVersion: getValueByPath(
        'dedReferenceVO.numeroVersionCourante',
        this.props.data,
      ),
      typeService: 'UC',
    });
  };

  isShowAnticipeeBloc1 = () => {
    let typeDeclarationParam = getValueByPath('typeDeclarationParam', this.props.data);
    console.log('isShowAnticipee typeDeclarationParam', typeDeclarationParam);
    let typeDUM = getValueByPath('dedDumSectionEnteteVO.typeDUM', this.props.data);
    let refDumInit = getValueByPath('refDumInit', this.props.data);
    console.log('isShowAnticipee typeDUM', typeDUM);
    console.log('isShowAnticipee typeDUM', refDumInit);
    let categorie = initDedCategorie(typeDeclarationParam, refDumInit);
    console.log('isShowAnticipee categorie', categorie);
    console.log('isShowAnticipee test', categorie != CATEGORIE_PROVISOIRE_INIT);
    console.log('isShowAnticipee test', !(typeDUM == CODE_TYPEDUM_COMPLEMENTAIRE));
    console.log('isShowAnticipee test', categorie != CATEGORIE_PROVISOIRE_VOY);
    console.log('isShowAnticipee test', categorie != CATEGORIE_PROVISOIRE_INIT && !(typeDUM == CODE_TYPEDUM_COMPLEMENTAIRE) && categorie != CATEGORIE_PROVISOIRE_VOY);

    return categorie != CATEGORIE_PROVISOIRE_INIT && !(typeDUM == CODE_TYPEDUM_COMPLEMENTAIRE) && categorie != CATEGORIE_PROVISOIRE_VOY;
  }

  isAnticipeeDisabledBloc1 = () => {

    let anticipee = getValueByPath('dedDumSectionEnteteVO.anticipee', this.props.data);
    let enregistree = getValueByPath('dedDumSectionEnteteVO.enregistree', this.props.data);
    let dedDumSectionEnteteVO = getValueByPath('dedDumSectionEnteteVO', this.props.data);
    return dedDumSectionEnteteVO?.regimeExport || (anticipee == 'false' && enregistree == 'true') || (dedDumSectionEnteteVO?.occasionnelle);
  }

  isShowAnticipeeBloc2 = () => {
    let typeDeclarationParam = getValueByPath('typeDeclarationParam', this.props.data);
    console.log('isShowAnticipee typeDeclarationParam', typeDeclarationParam);
    let refDumInit = getValueByPath('refDumInit', this.props.data);
    console.log('isShowAnticipee typeDUM', refDumInit);
    let categorie = initDedCategorie(typeDeclarationParam, refDumInit);
    console.log('isShowAnticipee categorie', categorie);
    return categorie == CATEGORIE_PROVISOIRE_VOY;
  }

  isAnticipeeDisabledBloc2 = () => {
    let dedDumSectionEnteteVO = getValueByPath('dedDumSectionEnteteVO', this.props.data);
    return dedDumSectionEnteteVO?.regimeExport || dedDumSectionEnteteVO?.occasionnelle;
  }

  initCombineeDisabled = () => {
    console.log('isShowAnticipee this.props', this.props);
    console.log('isShowAnticipee this.props.data', this.props.data);
    console.log('isShowAnticipee typeDeclarationParam', typeDeclarationParam);
    let typeDeclarationParam = getValueByPath('typeDeclarationParam', this.props.data);
    console.log('isShowAnticipee typeDeclarationParam', typeDeclarationParam);
    let refDumInit = getValueByPath('refDumInit', this.props.data);
    console.log('isShowAnticipee typeDUM', refDumInit);
    let categorie = initDedCategorie(typeDeclarationParam, refDumInit);
    console.log('isShowAnticipee categorie', categorie);
    let enregistree = getValueByPath('dedDumSectionEnteteVO.enregistree', this.props.data);

    if (categorie != CATEGORIE_PROVISOIRE_VOY) {
      if (enregistree == 'true') {
        this.setState({ combineeDisabled: true });
      } else {
        this.initDumAdmetCombinee();
      }

    }
  }

  initDumAdmetCombinee = () => {
    let transitCase = getValueByPath('transitCase', this.props.data);
    if (transitCase == '')
      return;
    let regimeAdmetDumCombinee = getValueByPath('regimeAdmetDumCombinee', this.props.data);
    if (regimeAdmetDumCombinee == 'true') {
      this.setState({ combineeDisabled: false });
    } else {
      this.setState({
        combineeDisabled: true,
        dedDumVo: { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, combinee: '' } }
      });
    }
  }


  /**
 * Checks if is combinee checkbox rendered.
 * 
 * @return true, if is combinee checkbox rendered
 */
  isCombineeCheckboxRendered = () => {
    let dedDumSectionEnteteVO = getValueByPath('dedDumSectionEnteteVO', this.props.data);
    // console.log('isCombineeCheckboxRendered dedDumSectionEnteteVO', dedDumSectionEnteteVO);
    if (dedDumSectionEnteteVO?.occasionnelle)
      return false;

    let typeDUM = getValueByPath('dedDumSectionEnteteVO.typeDUM', this.props.data);
    if (typeDUM == CODE_TYPEDUM_COMPLEMENTAIRE) {
      return false;
    }
    let typeDeclarationParam = getValueByPath('typeDeclarationParam', this.props.data);
    // console.log('isCombineeCheckboxRendered typeDeclarationParam', typeDeclarationParam);
    let refDumInit = getValueByPath('refDumInit', this.props.data);
    // console.log('isCombineeCheckboxRendered this.props.data', this.props.data);
    // console.log('isCombineeCheckboxRendered typeDUM', refDumInit);
    let categorie = initDedCategorie(typeDeclarationParam, refDumInit);
    var rendered = (categorie == CATEGORIE_PROVISOIRE_VOY);
    let transitCase = getValueByPath('transitCase', this.props.data);
    var transitTrue = !(typeof transitCase == 'undefined' ||'false' === transitCase) && categorie != CATEGORIE_GLOBALE_VOY && categorie != CATEGORIE_PROVISOIRE_VOY;
    rendered = rendered || transitTrue;
    return rendered;
  }

  /**
   * Checks if is combinee non transit checkbox rendered.
   * 
   * @return true, if is combinee non transit checkbox rendered
   */
  isCombineeNonTransitCheckboxRendered = () => {
    let dedDumSectionEnteteVO = getValueByPath('dedDumSectionEnteteVO', this.props.data)
    if (dedDumSectionEnteteVO?.occasionnelle)
      return false;

    let typeDUM = getValueByPath('dedDumSectionEnteteVO.typeDUM', this.props.data);
    if (typeDUM == CODE_TYPEDUM_COMPLEMENTAIRE) {
      return false;
    }
    let typeDeclarationParam = getValueByPath('typeDeclarationParam', this.props.data);
    console.log('isCombineeNonTransitCheckboxRendered typeDeclarationParam', typeDeclarationParam);
    let refDumInit = getValueByPath('refDumInit', this.props.data);
    console.log('isCombineeNonTransitCheckboxRendered typeDUM', refDumInit);
    let categorie = initDedCategorie(typeDeclarationParam, refDumInit);
    var rendered = (categorie != CATEGORIE_GLOBALE_VOY && categorie != CATEGORIE_PROVISOIRE_VOY);
    let transitCase = getValueByPath('transitCase', this.props.data);
    var transitFalse = !('true' === transitCase);
    return rendered && transitFalse;
  }


  traiterBureauDestination = () => {
    let transitCase = getValueByPath('transitCase', this.props.data);
    let typeDeclarationParam = getValueByPath('typeDeclarationParam', this.props.data);
    console.log('traiterBureauDestination typeDeclarationParam', typeDeclarationParam);
    let refDumInit = getValueByPath('refDumInit', this.props.data);
    console.log('traiterBureauDestination typeDUM', refDumInit);
    let combineeVar = this.state.dedDumVo.dedDumSectionEnteteVO.combinee;
    if (combineeVar != null && 'true' === combineeVar) {
      combineeVar = 'false';
    } else {
      combineeVar = 'true';
    }
    if (transitCase === 'true') {
      this.setState({ bureauDestDisabled: false, lieuStockageDisabled: false, ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, bureauDestination: '', combinee: combineeVar } });
    } else {

      if (combineeVar != null && 'true' === combineeVar) {
        let categorie = initDedCategorie(typeDeclarationParam, refDumInit);
        if (categorie != CATEGORIE_PROVISOIRE_VOY) {
          this.setState({ bureauDestDisabled: false, lieuStockageDisabled: false, ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, bureauDestination: '', combinee: combineeVar } });
        }
      } else {
        this.setState({ bureauDestDisabled: true, lieuStockageDisabled: true, ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, bureauDestination: '', combinee: combineeVar } });


      }

    }
  }
  isRegimeExport = () => {
    let dedDumSectionEnteteVO = getValueByPath('dedDumSectionEnteteVO', this.props.data);
    return dedDumSectionEnteteVO?.regimeExport;
  }

  isShownBureauDistBloc1 = () => {

    let typeDeclarationParam = getValueByPath('typeDeclarationParam', this.props.data);
    console.log('isShowAnticipee typeDeclarationParam', typeDeclarationParam);
    let refDumInit = getValueByPath('refDumInit', this.props.data);
    console.log('isShowAnticipee refDumInit', refDumInit);
    let categorie = initDedCategorie(typeDeclarationParam, refDumInit);
    console.log('isShowAnticipee categorie', categorie);
    let dedDumSectionEnteteVO = getValueByPath('dedDumSectionEnteteVO', this.props.data);
    return categorie !== CATEGORIE_GLOBALE_VOY && categorie !== CATEGORIE_PROVISOIRE_VOY && !(dedDumSectionEnteteVO?.occasionnelle);
  }

  isTransitCaseTrue = () => {
    let transitCase = getValueByPath('transitCase', this.props.data);
    return transitCase === 'true';
  }
  isTransitCaseFalse = () => {
    let transitCase = getValueByPath('transitCase', this.props.data);
    return transitCase === 'false';
  }

  handleBureauChipsChanged = (bureau) => {
    let lieuStockageDisabled;
    if (bureau == null || bureau.code == null || bureau.code == '') {
      lieuStockageDisabled = true;
    } else {
      lieuStockageDisabled = false;
    }
    let dedDumVo;
    if (lieuStockageDisabled) {
      dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, bureauDestination: bureau?.code, lieuStockage: '' } };
    } else {
      dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, bureauDestination: bureau?.code } };
    }
    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);


  }

  isShownBureauDistBloc2 = () => {
    let typeDeclarationParam = getValueByPath('typeDeclarationParam', this.props.data);
    console.log('isShowAnticipee typeDeclarationParam', typeDeclarationParam);
    let refDumInit = getValueByPath('refDumInit', this.props.data);
    console.log('isShowAnticipee refDumInit', refDumInit);
    let categorie = initDedCategorie(typeDeclarationParam, refDumInit);
    console.log('isShowAnticipee categorie', categorie);
    return categorie === CATEGORIE_PROVISOIRE_VOY;
  }

  isParamDelaiTransitActive = () => {

    
    let dedDumSectionEnteteVO = getValueByPath('dedDumSectionEnteteVO', this.props.data);
    return dedDumSectionEnteteVO?.paramDelaiTransitActive;
  }
  /**
   * start
   * Redux
   */

  callRedux = (jsonVO) => {
    if (this.props.dispatch) {
      this.props.dispatch(request({ type: GENERIC_DED_REQUEST, value: jsonVO }));
    }
  };

  init = () => {
    this.props.dispatch(request({ type: GENERIC_DED_INIT, value: {} }));
  };

  extractCommandData = (command, reducerName) => {
    return this.props[reducerName] && this.props[reducerName].picker
      ? this.props[reducerName].picker[command]
      : null;
  };

  handleArrondissementChanged = (selectedValue, selectedIndex, item) => {
   
   
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, arrondissement: selectedValue } };
    
    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);
  };

  handleLieuStockageLocalisationChanged = (selectedValue, selectedIndex, item) => {
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, lieuStockageLocalisation: selectedValue } };
    this.calculerDelaiTransit();
    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);
  };

  handleLieuStockageChanged = (selectedValue, selectedIndex, item) => {
   
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, lieuStockage: selectedValue } };
    this.calculerDelaiTransit();
    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);
  };

  isShownBureauDistBloc3 = () => {
    let typeDeclarationParam = getValueByPath('typeDeclarationParam', this.props.data);
    let refDumInit = getValueByPath('refDumInit', this.props.data);
    let categorie = initDedCategorie(typeDeclarationParam, refDumInit);
    return categorie !== CATEGORIE_PROVISOIRE_VOY;
  }


  isOccasionnelle = () => {
    let dedDumSectionEnteteVO = getValueByPath('dedDumSectionEnteteVO', this.props.data);
    return (dedDumSectionEnteteVO?.occasionnelle);
  }


  calculerDelaiTransit=()=> {
    if (this.isParamDelaiTransitActive() && _.isEmpty(!this.state.dedDumVo.dedDumSectionEnteteVO.lieuStockage) && !_.isEmpty(this.state.dedDumVo.dedDumSectionEnteteVO?.lieuStockageLocalisation)) {

      var action = dedCalculerDelaiTransitAction.request({
        type: CALCULER_DELAI_TRANSIT_REQUEST,
        value: {
          lieuStockageLocalisation: this.state.dedDumVo.dedDumSectionEnteteVO?.lieuStockageLocalisation,
          lieuStockage: this.state.dedDumVo.dedDumSectionEnteteVO?.lieuStockage
        },
      });
      this.props.dispatch(action);

    }
  }

  isStatutCautionBancaireShown= () => {
    let dedDumSectionEnteteVO = getValueByPath('dedDumSectionEnteteVO', this.props.data);
    return !_.isEmpty(dedDumSectionEnteteVO?.reponseBanque);
  }


  /**
   * end
   * Redux
   */

  render() {
    return (
      <View style={styles.container}>
        <ComBadrModalComp
          onDismiss={this.handleCancelCommentaire}
          visible={this.state.isCommentaireDialogVisible}
        >
          <Row style={{ width: '100%' }}>
            <Col>
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComBadrCardWithTileComp
                  title={translate('dedouanement.entete.commentaires')}>
                  <View>

                    <Row style={CustomStyleSheet.lightBlueRow}>
                      <Col>
                        <TextInput
                          mode="flat"
                          value={getValueByPath(
                            'dedDumSectionEnteteVO.commentaires',
                            this.props.data,
                            'consulterDumReducer',
                          )}
                          style={{ backgroundColor: lightGris, width: '100%' }}
                          placeholder="Commentaires..."
                          multiline={true} editable={false}
                          disabled={true}
                          numberOfLines={5}
                        />
                      </Col>
                    </Row>
                  </View>
                </ComBadrCardWithTileComp>
              </ComBadrCardBoxComp>
            </Col></Row>
        </ComBadrModalComp>

           <DedEchangeConsultationAmpiScreen
            reference={
              getValueByPath(
                  'dedDumSectionEnteteVO.referenceEnregistrement',
              this.props.data,
              'consulterDumReducer',
                )} 
            onRef={(ref) => (this.refListAMPI = ref)}
            visible={this.state.showListAMPI}
            onDismiss={this.onDismissConsultationAMPIScreen}
          />
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            this.refListAMPI.chargeList();
            this.setState({ showListAMPI: true });
          }}>
          <Text style={CustomStyleSheet.badrLibelleBleu}>{translate('dedouanement.entete.ConsulterAMP')}</Text>
        </TouchableOpacity>

        <ComAccordionComp title="Versions" expanded={true}>
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Type : "
              value={getValueByPath(
                'dedDumSectionEnteteVO.typeVersion',
                this.props.data,
                'consulterDumReducer',
              )}
            />
            <ComBadrKeyValueComp
              libelle="N° : "
              value={getValueByPath(
                'dedReferenceVO.numeroVersion',
                this.props.data,
                'consulterDumReducer',
              )}
            />
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelleSize={4}
              libelle="Mode d'acquisition : "
              value={getValueByPath(
                'dedDumSectionEnteteVO.modeAcquisition',
                this.props.data,
                'consulterDumReducer',
              )}
            />
            <ComBadrKeyValueComp
              libelle="Statut : "
              children={
                <View>
                  <ComBadrLibelleComp style={{ padding: 10 }}>
                    {getValueByPath(
                      'dedDumSectionEnteteVO.statut',
                      this.props.data,
                      'consulterDumReducer',
                    )}
                  </ComBadrLibelleComp>
                  <ComBadrTouchableButtonComp
                    onPress={this.handleCommentaireClicked}
                    text="Commentaires"
                    style={styles.touchableButtonStyle}
                  />
                </View>
              }
            />
          </DedRedressementRow>
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelleSize={3}
              libelle="Code initiateur : "
              value={getValueByPath(
                'dedReferenceVO.codeInitiateur',
                this.props.data,
                'consulterDumReducer',
              )}
            />
            <ComBadrKeyValueComp
              libelle="Nom : "
              value={getValueByPath(
                'dedReferenceVO.nomInitiateur',
                this.props.data,
                'consulterDumReducer',
              )}
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <Row>
              <Col />
              <Col>
                <ComBadrLibelleComp style={styles.versionInitialStyle}>
                  Version initiale
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={styles.versionEnCoursStyle}>
                  Version en cours
                </ComBadrLibelleComp>
              </Col>
            </Row>
          </DedRedressementRow>

          <DedRedressementRow zebra={true}>
            <Row>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  Date de création :
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={styles.versionInitialStyle}>
                  {getValueByPath(
                    'dedReferenceVO.dateCreation_VI',
                    this.props.data,
                    'consulterDumReducer',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={styles.versionEnCoursStyle}>
                  {getValueByPath(
                    'dedReferenceVO.dateCreation_VC',
                    this.props.data,
                    'consulterDumReducer',
                  )}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          </DedRedressementRow>

          <DedRedressementRow>
            <Row>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  Date d'enregistrement :
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={styles.versionInitialStyle}>
                  {getValueByPath(
                    'dedReferenceVO.dateEnregistrement_VI',
                    this.props.data,
                    'consulterDumReducer',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={styles.versionEnCoursStyle}>
                  {getValueByPath(
                    'dedReferenceVO.dateEnregistrement_VC',
                    this.props.data,
                    'consulterDumReducer',
                  )}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          </DedRedressementRow>

          <DedRedressementRow>
            <Row>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  Date dépot :
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={styles.versionInitialStyle}>
                  {getValueByPath(
                    'dedReferenceVO.dateDepot_VI',
                    this.props.data,
                    'consulterDumReducer',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp style={styles.versionEnCoursStyle}>
                  {getValueByPath(
                    'dedReferenceVO.dateDepot_VC',
                    this.props.data,
                    'consulterDumReducer',
                  )}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          </DedRedressementRow>

          <Divider></Divider>

          <DedRedressementRow>
            {this.isCombineeCheckboxRendered() && <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Combinée"
              children={
                <Checkbox

                  status={
                    this.state.dedDumVo.dedDumSectionEnteteVO?.combinee === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                  color={primaryColor}
                />
              }
            />}
            {this.isCombineeNonTransitCheckboxRendered() && <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Combinée"
              children={
                <Checkbox

                  status={
                    this.state.dedDumVo.dedDumSectionEnteteVO?.combinee === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={this.state.combineeDisabled || this.props.readOnly}
                  onPress={() => {
                    this.traiterBureauDestination();
                  }}
                  color={primaryColor}
                />
              }
            />}
            {this.isRegimeExport() && <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Fait partie d'un EC"
              children={
                <Checkbox
                  status={
                    this.state.dedDumVo.dedDumSectionEnteteVO?.faitPartieEc === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    this.onChangeFaitPartieEc();
                  }}
                  color={primaryColor}
                  disabled={this.props.readOnly}
                />
              }
            />}
            {this.isShowAnticipeeBloc1() && <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Déclaration par anticipation"
              children={
                <Checkbox
                  status={
                    this.state.dedDumVo.dedDumSectionEnteteVO?.anticipee === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={this.isAnticipeeDisabledBloc1() || this.props.readOnly}
                  onPress={() => {
                    this.onChangeAnticipee();
                  }}
                  color={primaryColor}
                />
              }
            />}
            {this.isShowAnticipeeBloc2() && <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Déclaration par anticipation"
              children={
                <Checkbox
                  status={
                    this.state.dedDumVo.dedDumSectionEnteteVO?.anticipee === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={this.isAnticipeeDisabledBloc2() || this.props.readOnly}
                  onPress={() => {
                    this.onChangeAnticipee();
                  }}
                  color={primaryColor}
                />
              }
            />}
          </DedRedressementRow>


          {this.isShownBureauDistBloc1() && <DedRedressementRow zebra={true}>

            <ComBadrKeyValueComp
              libelle={
                (this.isTransitCaseTrue() && (<ComBadrLibelleComp withColor={true} >
                  Bureau destination
                </ComBadrLibelleComp>)) || (this.isTransitCaseFalse() && (<ComBadrLibelleComp withColor={true}>
                  Bureau d'Entrée / Sortie
                </ComBadrLibelleComp>))
              }
              children={
                <ComBadrAutoCompleteChipsComp
                  placeholder={' '}
                  onRef={(ref) => (this.refBureau = ref)}
                  code="codeBureau"
                  selected={this.state?.dedDumVo.dedDumSectionEnteteVO?.bureauDestinationLibelle}
                  maxItems={10}
                  disabled={this.state.bureauDestDisabled || this.props.readOnly}
                  libelle="nomBureauDouane"
                  command="getListeBureaux"
                  onDemand={true}
                  searchZoneFirst={false}
                  onValueChange={this.handleBureauChipsChanged}
                />
              } />
          </DedRedressementRow>}
          {this.isShownBureauDistBloc2() && <View><DedRedressementRow zebra={true}>
            <ComBadrAutoCompleteChipsComp
              label={
                <ComBadrLibelleComp withColor={true}>
                  Bureau destination
                </ComBadrLibelleComp>
              }
              code="codeBureau"
              selected={this.state?.dedDumVo.dedDumSectionEnteteVO?.bureauDestinationLibelle}
              maxItems={10}
              disabled={true}
              libelle="nomBureauDouane"
              command="getListeBureaux"
              onDemand={true}
              searchZoneFirst={false}
            />
          </DedRedressementRow>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Lieu de stockage destination"
                children={
                  <ComBadrReferentielPickerComp
                    key="lieuStockage2"
                    disabled={true}
                    selected={this.state?.dedDumVo.dedDumSectionEnteteVO?.lieuStockage}
                    module="REF_LIB"
                    onRef={(ref) => (this.comboLieuStockage2 = ref)}
                    command="getCmbLieuStockageParBureau"
                    params={{
                      codeBureau: ''
                    }}
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                  />
                }
              />
            </DedRedressementRow>
            {this.isParamDelaiTransitActive() && <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Délai de transit autorisé : "
                value={this.props.data?.dedReferenceVO?.delaiTransit}
              />
              
            </DedRedressementRow>}
            <DedRedressementEnteteInfoBlock
              data={this.state.dedDumVo}
              readOnly={this.props.readOnly}
              dedDumSectionEnteteVO={this.state.dedDumVo?.dedDumSectionEnteteVO}
              handleArrondissementChanged={(selectedValue, selectedIndex, item) => this.handleArrondissementChanged(selectedValue, selectedIndex, item)}
              handleLieuStockageLocalisationChanged={(selectedValue, selectedIndex, item) => this.handleLieuStockageLocalisationChanged(selectedValue, selectedIndex, item)}
            />
          </View>}
          {this.isShownBureauDistBloc3() && <View>
            {!this.isOccasionnelle() && <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle={this.isTransitCaseTrue() ? "Lieu de stockage destination" :"Lieu de stockage d'Entrée / Sortie"}
                children={
                  <ComBadrReferentielPickerComp
                    key="lieuStockage2"
                    disabled={true}
                    selected={this.state?.dedDumVo.dedDumSectionEnteteVO?.lieuStockage}
                    module="REF_LIB"
                    onRef={(ref) => (this.comboLieuStockage2 = ref)}
                    command="getCmbLieuStockageParBureau"
                    params={{
                      codeBureau: getValueByPath(
                        'dedDumSectionEnteteVO.refBureauDedouanement',
                        this.props.data,
                      ), dateValidite: getValueByPath(
                        'dedReferenceVO.dateValidite',
                        this.props.data,
                      )
                    }}
                    onValueChange={(selectedValue, selectedIndex, item) =>
                      this.handleLieuStockageChanged(
                        selectedValue,
                        selectedIndex,
                        item,
                      )
                    }
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                  />
                }
              />
            </DedRedressementRow>}
            {this.isParamDelaiTransitActive() && <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Délai de transit autorisé : "
                value={this.props.data?.dedReferenceVO?.delaiTransit}
              />

            </DedRedressementRow>}
            <DedRedressementEnteteInfoBlock
              data={this.state.dedDumVo}
              readOnly={this.props.readOnly}
              dedDumSectionEnteteVO={this.state.dedDumVo?.dedDumSectionEnteteVO}
              handleArrondissementChanged={(selectedValue, selectedIndex, item) => this.handleArrondissementChanged(selectedValue, selectedIndex, item)}
              handleLieuStockageLocalisationChanged={(selectedValue, selectedIndex, item) => this.handleLieuStockageLocalisationChanged(selectedValue, selectedIndex, item)}
            />
          </View>}

          {/*{!this.isVersionCourante() && (
            <ComBadrTouchableButtonComp
              text="Version courante"
              style={styles.touchableButtonStyle}
              onPress={this.handleVersionCouranteClicked}
            />
          )}*/}
        </ComAccordionComp>
        {this.isStatutCautionBancaireShown() && <ComAccordionComp title="Statut de la caution bancaire" expanded={true}>
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Statut : "
              value={getValueByPath(
                'dedDumSectionEnteteVO.reponseBanque',
                this.props.data,
              )}
            />
            
          </DedRedressementRow>
        </ComAccordionComp>}
      </View>
    );
  }

  onChangeAnticipee() {
    if (this.state.dedDumVo.dedDumSectionEnteteVO?.anticipee === 'true') {
      this.setState({
        dedDumVo: { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, anticipee: 'false' } }
      });
    }
    if (this.state.dedDumVo.dedDumSectionEnteteVO?.anticipee !== 'true') {
      this.setState({
        dedDumVo: { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, anticipee: 'true' } }
      });
    }
  }

  onChangeFaitPartieEc() {
    if (this.state.dedDumVo.dedDumSectionEnteteVO?.faitPartieEc === 'true') {
      this.setState({
        dedDumVo: { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, faitPartieEc: 'false' } }
      });
    }
    if (this.state.dedDumVo.dedDumSectionEnteteVO?.faitPartieEc !== 'true') {
      this.setState({
        dedDumVo: { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, faitPartieEc: 'true' } }
      });
    }
  }
}

function mapStateToProps(state) {
  return { ...state.dedEnteteReducer};
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementEnteteVersionBlock);
