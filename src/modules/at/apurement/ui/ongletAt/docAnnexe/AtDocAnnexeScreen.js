import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { Col, Row } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';

import InfoCommon from '../common/AtInfoCommonScreen';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import _ from 'lodash';
import {
  CustomStyleSheet,
  primaryColor,
  accentColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import * as CreateApurementAction from '../../../state/actions/atApurementCreateAction';
import * as AtConsulterAction from '../../../state/actions/atConsulterAction';
import * as ConstantsAt from '../../../state/atConstants';

/** Utils */
import ComUtils from '../../../../../../commons/utils/ComUtils';
/** Inmemory session */
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';

import {
  ComBadrToolbarComp,
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBasicDataTableComp,
  ComBadrCardWithTileComp,
  ComBadrDatePickerComp,
  ComBadrActionButtonComp,
} from '../../../../../../commons/component';
import moment from 'moment';

class AtDocAnnexe extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      showFileDetail: false,
      listFile: null,
    };
    this.cols = [
      {
        libelle: translate('at.docAnnexe.fichier'),
        width: 100,
        size: 25,
        component: 'button',
        icon: 'file-eye',
        action: (row, index) => {
          this.showFile(row);
        },
      },
      {
        code: 'reference',
        libelle: translate('at.apurement.reference'),
        width: 150,
      },
      {
        code: 'commentaire',
        libelle: translate('at.historique.commentaire'),
        width: 200,
      },
    ];
  }


  showFile = (row) => {
    this.setState({
      showFileDetail: true,
      listFile: row.fichierVOs,
    });
  };

  downloadFile = (file) => {
    console.log('file');
    console.log(file.fileName);
    let consulterFichierAction = AtConsulterAction.requestFile(
      {
        type: ConstantsAt.FILE_AT_REQUEST,
        value: file.urlFichier,
      },
    );
    this.props.actions.dispatch(consulterFichierAction);
    console.log('consulterFichierAction');
    console.log(consulterFichierAction);
    // this.downloadFile(file.fileName, file.content);
  };

  static downloadFile = async (nameFile, base64File) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Permission',
          message:
            "L'application a besoin des permissions nécessaires pour procéder.",
          buttonNeutral: 'Demander ultérieurement',
          buttonNegative: 'Annuler',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let pdfLocation = RNFetchBlob.fs.dirs.DocumentDir + '/' + nameFile;
        RNFetchBlob.fs.writeFile(pdfLocation, base64File, 'base64').then(() => {
          if (Platform.OS === 'android') {
            RNFetchBlob.android.actionViewIntent(
              pdfLocation,
              'application/pdf',
            );
          } else {
            RNFetchBlob.ios.previewDocument(pdfLocation);
          }
        });
      } else {
        console.log('External storage permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  abandonner = () => {
    this.setState({
      showFileDetail: false,
      listFile: null,
    });
  };

  componentDidMount = () => {
  };

  componentWillUnmount() {
  }

  render() {
    let atVo;
    if (!_.isEmpty(this.props.initApurement?.data)) {
      atVo = this.props.initApurement.data;
    } else {
      atVo = this.props.atConsulter.data;
    }
    return (
      <View style={styles.fabContainer}>
        <ScrollView
          ref={(c) => {
            this.scroll = c;
          }}>


          {atVo != null && atVo.atEnteteVO != null && (
            <ComContainerComp>
              {/* Information commun */}
              <InfoCommon
                bureau={atVo.atEnteteVO.bureau}
                annee={atVo.atEnteteVO.annee}
                numeroOrdre={atVo.atEnteteVO.numeroOrdre}
                serie={atVo.atEnteteVO.serie}
                dateEnregistrement={atVo.atEnteteVO.dateEnregistrement}
                dateCreation={atVo.atEnteteVO.dateCreation}
                numVersion={atVo.atEnteteVO.numVersion}
                etat={atVo.atEnteteVO.etatAt.libelle}
                etatValidation={atVo.atEnteteVO.etatValidation}
              />

              <ComBadrCardBoxComp style={styles.cardBox}>
                <Text style={styles.titleTab}>
                  {translate('at.docAnnexe.title')} : {atVo.docAnnexeVOs ? atVo.docAnnexeVOs.length : 0}
                </Text>
                <ComBasicDataTableComp
                  ref="_badrTable"
                  id="reference"
                  rows={atVo.docAnnexeVOs}
                  cols={this.cols}
                  onItemSelected={this.onItemSelected}
                  maxResultsPerPage={10}
                  paginate={true}
                  showProgress={this.props.showProgress}
                />
              </ComBadrCardBoxComp>

              {this.state.showFileDetail &&
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComBadrCardWithTileComp
                    title={translate('at.docAnnexe.listeFichier')}>
                    <View>
                      {this.state.listFile.map((file) => {
                        return (
                          <Row size={100}>
                            <Col size={50}>
                              <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => this.downloadFile(file)}>
                                <View style={styles.actionContainer}>
                                  <Icon
                                    name="download"
                                    style={styles.iconInput}
                                    color={primaryColor}
                                    size={22}
                                  />
                                  <Text style={styles.actionText}>{file.urlFichier}</Text>
                                </View>
                              </TouchableOpacity>
                            </Col>
                          </Row>
                        );
                      })}
                      <Row size={100}>
                        <Col />
                        <Col>
                          <Button
                            onPress={() => this.abandonner()}
                            mode="contained"
                            style={styles.btnActions}>
                            {translate('transverse.abandonner')}
                          </Button>
                        </Col>
                        <Col />
                      </Row>
                    </View>
                  </ComBadrCardWithTileComp>
                </ComBadrCardBoxComp>
              }

            </ComContainerComp>
          )}
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  const combinedState = {
    initApurement: { ...state.initApurementReducer },
    atConsulter: { ...state.atConsulterReducer },
  };
  return combinedState;
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
)(AtDocAnnexe);

const styles = StyleSheet.create({
  fabContainer: {
    height: '100%',
  },
  btnActions: {
    marginTop: 20,
    marginBottom: 5,
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
  },
  titleTab: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    ...CustomStyleSheet.badrPickerTitle,
  },
  actionButton: {
    paddingRight: 5,
    width: '100%',
  },
  actionText: {
    paddingTop: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 14,
    color: primaryColor,
  },
  iconInput: {
    paddingTop: 10,
    marginRight: 5,
  },
  actionContainer: { flexDirection: 'row' },
});
