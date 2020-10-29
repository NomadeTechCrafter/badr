import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrButtonIconComp,
  ComBasicDataTableComp,
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

class DedRedressementDocumentsExigiblesBlock extends React.Component {
  buildDemandesCols = () => {
    return [
      {
        code: 'portee',
        libelle: translate('dedouanement.documents.num'),
        width: 250,
      },
      {
        code: 'typeDocument',
        libelle: translate('dedouanement.documents.doc'),
        width: 250,
      },
      {
        code: 'portee',
        libelle: translate('dedouanement.documents.portee'),
        width: 250,
      },
      {
        code: 'numeroOrdreArticle',
        libelle: translate('dedouanement.documents.numArticles'),
        width: 250,
      },
      {
        code: 'statutRejeteString',
        libelle: translate('dedouanement.documents.statut'),
        width: 250,
      },
    ];
  };

  buildDemandesCols2 = () => {
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
      demandesCols: this.buildDemandesCols(),
      demandesCols2: this.buildDemandesCols2(),
    };
  }
  componentDidMount() {
    this.getTraceSignatureDUM();
    this.getDocumentsExigiblesDUM();
  }

  getDocumentsExigiblesDUM = () => {
    let idDec = getValueByPath('dedReferenceVO.identifiant', this.props.data);
    let numVersion = getValueByPath(
      'dedReferenceVO.numeroVersionCourante',
      this.props.data,
    );

    var data = {
      idDec: idDec,
      numVersion: numVersion,
    };
    this.callRedux({
      command: 'ded.recupererDocumentsExigiblesDUM',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  getTraceSignatureDUM = () => {
    let identifiantDUM = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props.data,
    );
    let numeroVersion = getValueByPath(
      'dedReferenceVO.numeroVersion',
      this.props.data,
    );
    let codeRegime = getValueByPath(
      'dedReferenceVO.refRegime',
      this.props.data,
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

  consulterDeclaration = () => {
    let idDeclaration = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props.data,
    );
    let numeroVersion = getValueByPath(
      'dedReferenceVO.numeroVersion',
      this.props.data,
    );

    var data = {
      idDeclaration: idDeclaration,
      numeroVersion: numeroVersion,
    };
    this.callRedux({
      command: 'ded.consulterFichierPdfDumSign',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  render() {
    let value1 = this.extractCommandData(
      'ded.getTraceSignatureDUM',
      'genericDedReducer',
    );
    let value = this.extractCommandData(
      'ded.recupererDocumentsExigiblesDUM',
      'genericDedReducer',
    );
    let fichierPdfDumSign = this.extractCommandData(
      'ded.consulterFichierPdfDumSign',
      'genericDedReducer',
    );
    if (!_.isNil(fichierPdfDumSign) && !_.isNil(fichierPdfDumSign.data)) {
    }
    console.log('Accordion render  getTraceSignatureDUM', value);
    //console.log('Accordion render ded.recupererDocumentsExigiblesDUM', value1);
    return (
      <View style={styles.container}>
        <ComBadrButtonIconComp
          onPress={() => this.consulterDeclaration()}
          icon="magnify"
          loading={this.props.showProgress}
          text={translate('dedouanement.documents.consulterDeclaration')}
        />
        {!_.isNil(value) && !_.isNil(value.data) && (
          <ComAccordionComp
            title={`Nombre total des demandes : ${
              getValueByPath('data', value) ? value.data.length : 0
            }`}
            expanded={true}>
            <ComBasicDataTableComp
              rows={getValueByPath('data', value)}
              cols={this.state.demandesCols}
              totalElements={
                getValueByPath('data', value) ? value.data.length : 0
              }
              maxResultsPerPage={5}
              paginate={true}
            />
          </ComAccordionComp>
        )}
        {!_.isNil(value1) && !_.isNil(value1.data) && (
          <ComAccordionComp
            title={`Nombre total des demandes : ${
              value1.data ? value1.data.length : 0
            }`}
            expanded={true}>
            <ComBasicDataTableComp
              rows={_.head(value1.data)}
              cols={this.state.demandesCols2}
              totalElements={value1.data ? value1.data.length : 0}
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
)(DedRedressementDocumentsExigiblesBlock);
