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
import {
  PaperTheme,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import {IconButton, Text, Title, Badge} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
class DedRedressementDocumentsExigiblesBlock extends React.Component {
  listeDemandeChargementCols = () => {
    return [
      {
        code: 'typeDocument',
        libelle: translate('dedouanement.documents.doc'),
        width: 250,
      },
      {
        code: 'commentaire',
        libelle: translate('dedouanement.documents.comm'),
        width: 250,
      },
      {
        code: 'statutString',
        libelle: translate('dedouanement.documents.etat'),
        width: 250,
      },
    ];
  };

  constructor(props) {
    super(props);
    this.state = {
      listeDemandeChargementCols: this.listeDemandeChargementCols(),
      showDetail: false,
      listeDemandeChargement: [],
    };
  }

  onDismiss = () => {
    //this.setState({showDetail: false, listeDemandeChargement: []});
    this.init();
  };

  recupererListeDemandesDocumentDUM = () => {
    let idDec  = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props,
      'consulterDumReducer',
    );
    console.log('ded.recupererListeDemandesDocumentDUM dedReferenceVO.identifiant idDec : ', idDec);
    
    this.callRedux({
      command: 'ded.recupererListeDemandesDocumentDUM',
      typeService: 'SP',
      jsonVO: idDec,
    });
  };

  render() {
    let listeDemandesDocumentDUM = this.extractCommandData(
      'ded.recupererListeDemandesDocumentDUM',
      'genericDedReducer',
    );

    return (
      <View style={styles.container}>
        <Row>
          <ComBadrButtonIconComp
            onPress={() => this.recupererListeDemandesDocumentDUM()}
            icon="file-multiple"
            loading={this.props.showProgress}
            text={translate('dedouanement.documents.demandesChargement')}
          />
          <Badge style={{backgroundColor: primaryColor}}>
            {getValueByPath('data', listeDemandesDocumentDUM)
              ? getValueByPath('data', listeDemandesDocumentDUM).length
              : 0}
          </Badge>
        </Row>
        {!_.isNil(listeDemandesDocumentDUM) &&
          !_.isNil(listeDemandesDocumentDUM.data) && (
            <ComBadrModalComp
              visible={listeDemandesDocumentDUM.data.length > 0}
              onDismiss={() => {
                this.props.genericDedReducer.picker[
                  'ded.recupererListeDemandesDocumentDUM'
                ] = [];
                this.forceUpdate();
              }}>
              <Title>
                {translate('dedouanement.documents.listeDemandeChargement')}
              </Title>
              <ComBasicDataTableComp
                rows={listeDemandesDocumentDUM.data}
                cols={this.state.listeDemandeChargementCols}
                totalElements={
                  listeDemandesDocumentDUM.data
                    ? listeDemandesDocumentDUM.data.length
                    : 0
                }
                maxResultsPerPage={5}
                paginate={true}
              />
            </ComBadrModalComp>
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
)(DedRedressementDocumentsExigiblesBlock);
