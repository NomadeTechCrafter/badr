import React from 'react';
import {TextInput, View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrDialogComp,
  ComBadrKeyValueComp,
  ComBadrTouchableButtonComp,
} from '../../../../../../commons/component';
import styles from '../../../style/DedRedressementStyle';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';
import DedRedressementRow from '../../common/DedRedressementRow';
import {getValueByPath} from '../../../utils/DedUtils';
import {Col, Row} from 'react-native-easy-grid';
import {lightGris} from '../../../../../../commons/styles/ComThemeStyle';
import {request} from '../../../state/actions/DedAction';
import {
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST,
} from '../../../state/DedRedressementConstants';
import {connect} from 'react-redux';

class DedRedressementEnteteVersionBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentaireDialogVisible: false,
      articles: [],
      articlesContestes: [],
    };
  }

  componentDidMount() {}

  isVersionCourante = () => {
    return !(
      getValueByPath(
        'dedReferenceVO.numeroVersionCourante',
        this.props.data,
      ) === getValueByPath('dedReferenceVO.numeroVersion', this.props.data)
    );
  };

  handleCommentaireClicked = () => {
    this.setState({isCommentaireDialogVisible: true});
  };

  handleConfirmCommentaire = () => {
    this.setState({isCommentaireDialogVisible: false});
  };

  handleCancelCommentaire = () => {
    this.setState({isCommentaireDialogVisible: false});
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

  /**
   * start
   * Redux
   */

  callRedux = (jsonVO) => {
    if (this.props.dispatch) {
      this.props.dispatch(request({type: GENERIC_DED_REQUEST, value: jsonVO}));
    }
  };

  init = () => {
    this.props.dispatch(request({type: GENERIC_DED_INIT, value: {}}));
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
        <ComBadrDialogComp
          title="Commentaires"
          dialogVisibility={this.state.isCommentaireDialogVisible}
          onOk={this.handleConfirmCommentaire}
          onCancel={this.handleCancelCommentaire}
          confirmMessage="Confirmer"
          cancelMessage="Fermer">
          <TextInput
            mode="flat"
            value={getValueByPath(
              'dedDumSectionEnteteVO.commentaires',
              this.props.data,
              'consulterDumReducer',
            )}
            style={{backgroundColor: lightGris, width: '100%'}}
            placeholder="Commentaires..."
            multiline={true}
            numberOfLines={5}
          />
        </ComBadrDialogComp>

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
                  <ComBadrLibelleComp style={{padding: 10}}>
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
  return {...state};
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementEnteteVersionBlock);
