import React from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrButtonIconComp,
  ComBadrModalComp,
  ComBasicDataTableComp,
  ComDetailPlaqueComp,
} from '../../../../../../commons/component';
import {cleDS, getValueByPath} from '../../../utils/DedUtils';
import _ from 'lodash';
import {request} from '../../../state/actions/DedAction';
import {
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST,
} from '../../../state/DedRedressementConstants';
import {connect} from 'react-redux';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import RNFetchBlob from 'rn-fetch-blob';
import {downloadFile} from 'react-native-fs';
import {primaryColor} from '../../../../../../commons/styles/ComThemeStyle';
import {IconButton, Text} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
class DedRedressementDeclarationSigneeBlock extends React.Component {
  declarationSigneeCols = () => {
    return [
      {
        code: 'qualite_signataire',
        libelle: translate('dedouanement.documents.enQualiteDe'),
        width: 250,
      },
      {
        code: 'ident_signataire',
        libelle: translate('dedouanement.documents.par'),
        width: 250,
      },
      {
        code: 'date_signature',
        libelle: translate('dedouanement.documents.le'),
        width: 250,
      },
      {
        code: 'numeroTransaction',
        libelle: translate('dedouanement.documents.numTransaction'),
        width: 250,
      },
    ];
  };

  constructor(props) {
    super(props);
    this.state = {
      declarationSigneeCols: this.declarationSigneeCols(),
    };
  }
  componentDidMount() {
    this.getTraceSignatureDUM();
  }

  getTraceSignatureDUM = () => {
    console.log('this.props.data : ' + JSON.stringify(this.props.consulterDumReducer.data));
    let identifiantDUM = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props.consulterDumReducer.data,
    );
    let numeroVersion = getValueByPath(
      'dedReferenceVO.numeroVersion',
      this.props.consulterDumReducer.data,
    );
    let codeRegime = getValueByPath(
      'dedReferenceVO.refRegime',
      this.props.consulterDumReducer.data,
    );
    var data = {
      identifiantDUM: identifiantDUM,
      numeroVersion: numeroVersion,
      codeRegime: codeRegime,
    };
    this.callRedux({
      command: 'ded.getTraceSignatureDUM',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  initDataConsulterDeclaration = () => {
    console.log("initDataConsulterDeclaration : " + this.props);
    let idDeclaration = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props,
      'consulterDumReducer',
    );
    let numeroVersion = getValueByPath(
      'dedReferenceVO.numeroVersion',
      this.props,
      'consulterDumReducer',
    );
    return {
      idDeclaration: idDeclaration,
      numeroVersion: numeroVersion,
    };
  };

  consulterDeclaration = () => {
    let data = this.initDataConsulterDeclaration();
    this.callRedux({
      command: 'ded.consulterFichierPdfDumSign',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  consulterDonneesDeclaration = () => {
    let data = this.initDataConsulterDeclaration();
    this.callRedux({
      command: 'ded.consulterFichierPdfXMLSign',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  downloadFile = async (nameFile, base64File) => {
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
            // RNFetchBlob.android.addCompleteDownload({
            //   title: nameFile,
            //   description: 'desc' + nameFile,
            //   mime: 'application/pdf',
            //   path: RNFetchBlob.fs.dirs.DownloadDir,
            //   showNotification: true
            // });

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

  render() {
    let declarationSignee = this.extractCommandData(
      'ded.getTraceSignatureDUM',
      'genericDedReducer',
    );

    let fichierPdfDumSign = this.extractCommandData(
      'ded.consulterFichierPdfDumSign',
      'genericDedReducer',
    );
    
    if (fichierPdfDumSign && !_.isNil(fichierPdfDumSign) && !_.isNil(fichierPdfDumSign.data)) {
      this.downloadFile(
        fichierPdfDumSign.data.nomFichier,
        fichierPdfDumSign.data.contentByte,
      );
    }

    let fichierPdfXMLSign = this.extractCommandData(
      'ded.consulterFichierPdfXMLSign',
      'genericDedReducer',
    );
    if (fichierPdfXMLSign && !_.isNil(fichierPdfXMLSign) && !_.isNil(fichierPdfXMLSign.data)) {
      this.downloadFile(
        fichierPdfXMLSign.data.nomFichier,
        fichierPdfXMLSign.data.contentByte,
      );
    }
    return (
      <View style={styles.container}>
        {/*Accordion Déclaration Signée */}
        {!_.isNil(declarationSignee) &&
          !_.isNil(declarationSignee.data) &&
          !_.isNil(_.head(declarationSignee.data)) && (
            <ComAccordionComp
              title={translate('dedouanement.documents.declarationSignee')}
              expanded={true}>
              <ComBadrButtonIconComp
                onPress={() => this.consulterDeclaration()}
                icon="file-eye"
                loading={this.props.showProgress}
                text={translate('dedouanement.documents.consulterDeclaration')}
              />
              <ComBasicDataTableComp
                rows={_.head(declarationSignee.data)}
                cols={this.state.declarationSigneeCols}
                totalElements={
                  _.head(declarationSignee.data)
                    ? _.head(declarationSignee.data).length
                    : 0
                }
                maxResultsPerPage={5}
                paginate={true}
              />
              <ComBadrButtonIconComp
                onPress={() => this.consulterDonneesDeclaration()}
                icon="file-eye"
                loading={this.props.showProgress}
                text={translate(
                  'dedouanement.documents.consulterDonneesDeclaration',
                )}
              />
              <ComBasicDataTableComp
                rows={_.last(declarationSignee.data)}
                cols={this.state.declarationSigneeCols}
                totalElements={
                  _.last(declarationSignee.data)
                    ? _.last(declarationSignee.data).length
                    : 0
                }
                maxResultsPerPage={5}
                paginate={true}
              />
            </ComAccordionComp>
          )}
      </View>
    );
  }

  /**
   * start
   * Redux
   */

  callRedux = (jsonVO) => {
    if (this.props.dispatch) {
      console.log('calling redux ...');
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
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementDeclarationSigneeBlock);
