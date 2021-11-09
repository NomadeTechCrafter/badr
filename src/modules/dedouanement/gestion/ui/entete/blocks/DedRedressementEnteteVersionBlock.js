import React from 'react';
import { View } from 'react-native';
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
import {
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST
} from '../../../state/DedRedressementConstants';
import styles from '../../../style/DedRedressementStyle';
import { getValueByPath, initDedCategorie } from '../../../utils/DedUtils';
import DedRedressementRow from '../../common/DedRedressementRow';

class DedRedressementEnteteVersionBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentaireDialogVisible: false,
      articles: [],
      articlesContestes: [],
    };
  }

  componentDidMount() { }

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

  isShowAnticipee =()=> {
    initDedCategorie();
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
          <Row style={{width: '100%'}}>
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
                'dedDumSectionEnteteVO.numeroVersion',
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
            <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Combinée"
              children={
                <Checkbox
                  status={
                    getValueByPath(
                      'dedDumSectionEnteteVO.combinee',
                      this.props.data,
                    ) === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                  color={primaryColor}
                />
              }
            />
            {this.isShowAnticipee() && <ComBadrKeyValueComp
              rtl={true}
              style={styles.rtlCheckboxLabelStyle}
              libelle="Déclaration par anticipation"
              children={
                <Checkbox
                  status={
                    getValueByPath(
                      'dedDumSectionEnteteVO.anticipee',
                      this.props.data,
                    ) === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                  color={primaryColor}
                />
              }
            />}
          </DedRedressementRow>


          <DedRedressementRow zebra={true}>
            <ComBadrAutoCompleteChipsComp
              label={
                <ComBadrLibelleComp withColor={true}>
                  Bureau destination
                </ComBadrLibelleComp>
              }
              onRef={(ref) => (this.refBureau = ref)}
              code="codeBureau"
              selected={this.props?.dedDumSectionEnteteVO?.bureauDestinationLibelle}
              maxItems={10}
              disabled={true}
              libelle="nomBureauDouane"
              command="getListeBureaux"
              onDemand={true}
              searchZoneFirst={false}
              onValueChange={this.handleBureauChipsChanged}
            />
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Lieu de stockage destination"
              children={
                <ComBadrReferentielPickerComp
                  key="lieuStockage2"
                  disabled={true}
                  selected={{
                    code: getValueByPath(
                      'dedDumSectionEnteteVO.lieuStockage',
                      this.props.data,
                    ),
                  }}
                  module="REF_LIB"
                  onRef={(ref) => (this.comboLieuStockage2 = ref)}
                  command="getCmbLieuStockageParBureau"
                  onValueChange={(selectedValue, selectedIndex, item) =>
                    this.handleLieuStockageChanged(
                      selectedValue,
                      selectedIndex,
                      item,
                    )
                  }
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

          {/*{!this.isVersionCourante() && (
            <ComBadrTouchableButtonComp
              text="Version courante"
              style={styles.touchableButtonStyle}
              onPress={this.handleVersionCouranteClicked}
            />
          )}*/}
        </ComAccordionComp>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementEnteteVersionBlock);
