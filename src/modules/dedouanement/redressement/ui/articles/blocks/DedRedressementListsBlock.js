import React from 'react';
import { View } from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrDetailAccordion,
  ComBadrErrorMessageComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import { getValueByPath } from '../../../utils/DedUtils';
import DedRedressementDetailArticleContenantBlock from './DedRedressementDetailArticleContenantBlock';
import DedRedressementDetailArticleMarchandiseBlock from './DedRedressementDetailArticleMarchandiseBlock';
import DedRedressementDetailArticleValeurQuantiteBlock from './DedRedressementDetailArticleValeurQuantiteBlock';
import DedRedressementDetailArticleAccordFranchiseBlocK from './DedRedressementDetailArticleAccordFranchiseBlock';
import { Button, Divider } from 'react-native-paper';
import DedRedressementDetailArticleOrigineBlock from './DedRedressementDetailArticleOrigineBlock';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import DedRedressementDetailArticleTypeReconnaissanceBlock from './DedRedressementDetailArticleTypeReconnaissanceBlock';
import DedRedressementDetailArticleLiquidationBlock from './DedRedressementDetailArticleLiquidationBlock';
import { Col, Row } from 'react-native-easy-grid';
import _ from 'lodash';

class DedRedressementListsBlock extends React.Component {
  buildArticlesCols = (conteste) => {
    return [
      {
        code: '',
        libelle: '',
        width: 100,
        component: 'button',
        icon: this.props?.edition ? 'pencil' : 'eye',
        action: (row, index) =>
          conteste
            ? this.onArticleContesteSelected(row, index)
            : this.onArticleSelected(row, index),
      },
      { code: 'numeroOrdre', libelle: 'N°', width: 100 },
      { code: 'typeContenant', libelle: 'Code contenants', width: 120 },
      { code: 'nombreContenants', libelle: 'Nombre contenants', width: 120 },
      { code: 'refNgp', libelle: 'Code NGP', width: 200 },
      { code: 'valeurDeclaree', libelle: 'Valeur declarée', width: 80 },
      { code: 'quantite', libelle: 'Quantité', width: 80 },
      { code: 'unite', libelle: 'Unité', width: 80 },
      { code: 'issuATPA ', libelle: 'Issu ATPA', width: 120, render: (row) => row.issuATPA === true ? 'Oui' : 'Non' },
    ];
  };

  onArticleSelected = (article, index) => {
    this.setState({
      selectedArticle: article,
      selectedArticleIndex: index,
    });
    this.articleComp?.fillStateByProps();
  };

  onArticleContesteSelected = (article) => {
    this.setState({ selectedArticleConteste: article });
  };

  constructor(props) {
    super(props);
    this.state = {
      dedDumVo: this.props.data,
      articlesContestes: [],
      newArticle: false,
      articles: [
        {
          "dedDumProprieteTIVO": [],
          "conteste": "false",
          "aliquider": "null",
          "redevanceAt": "null",
          "designationCommerciale": "Désignation Commerciale",
          "occasion": "false",
          "issuATPA": "false",
          "marquesContenants": "Marques",
          "nombreContenants": "100",
          "numeroOrdre": "1",
          "paiement": "false",
          "paysOrigine": "FR",
          "poidsNet": "10000.000",
          "quantite": "10000.000",
          "refNgp": "9999999999",
          "typeContenant": "216",
          "typeContenantLibelle": "COLIS",
          "unite": "033",
          "quantiteNormalisee": "1000.000",
          "valeurDeclaree": "10000.000",
          "idConvention": "null",
          "uniteLibelle": "U",
          "paysOrigineLibelle": "FRANCE",
          "libelleUniteNormalisee": "U",
          "defaultConverter": {},
          "accord": "QUAD",
          "franchise": "0036",
        },
        {
          "dedDumProprieteTIVO": [],
          "conteste": "false",
          "aliquider": "null",
          "redevanceAt": "null",
          "designationCommerciale": "Désignation Commerciale 2",
          "occasion": "true",
          "issuATPA": "true",
          "marquesContenants": "Marques",
          "nombreContenants": "333",
          "numeroOrdre": "1",
          "paiement": "true",
          "paysOrigine": "",
          "poidsNet": "99.000",
          "quantite": "999.000",
          "refNgp": "9999999999",
          "typeContenant": "125",
          "typeContenantLibelle": "COLIS",
          "unite": "033",
          "quantiteNormalisee": "9999.000",
          "valeurDeclaree": "99999.000",
          "idConvention": "null",
          "uniteLibelle": "ABCDEFGHIJKLMNOPQRS",
          "paysOrigineLibelle": "",
          "libelleUniteNormalisee": "U",
          "defaultConverter": {},
          "accord": "QUAD",
          "franchise": "0034",
        }
      ],
      articlesCols: this.buildArticlesCols(false),
      articlesContesteCols: this.buildArticlesCols(true),
      edition: this.props.edition,
    };
  }

  updateArticleContenant = (val) => {
    // console.log('val updateArticleContenant:', val);
    let localArticles = [...this.state.articles];
    let article = { ...this.state.selectedArticle };

    article.nombreContenants = val?.nombreContenants;
    article.typeContenant = val?.typeContenant;
    article.typeContenantLibelle = val?.typeContenantLibelle;
    article.marquesContenants = val?.marquesContenants;

    localArticles[this.state.selectedArticleIndex] = article;
    this.setState({
      selectedArticle: article,
      articles: localArticles,
    });

    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionArticlesVO: { ...this.state.dedDumVo?.dedDumSectionArticlesVO, dedDumArticleFormVO: this.state.articles } };

    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);
  }

  updateArticleMarchandise = (val) => {
    // console.log('val updateArticleMarchandise:', val);
    let localArticles = [...this.state.articles];
    let article = { ...this.state.selectedArticle };

    article.designationCommerciale = val?.designationCommerciale;
    article.paysOrigineLibelle = val?.paysOrigineLibelle;
    article.paysOrigine = val?.paysOrigine;
    article.paiement = val?.paiement;
    article.occasion = val?.occasion;
    article.refNgp = val?.refNgp;

    localArticles[this.state.selectedArticleIndex] = article;
    this.setState({
      selectedArticle: article,
      articles: localArticles,
    });

    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionArticlesVO: { ...this.state.dedDumVo?.dedDumSectionArticlesVO, dedDumArticleFormVO: this.state.articles } };

    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);
  }

  updateValeurQuantite = (val) => {
    // console.log('val updateValeurQuantite:', val);
    let localArticles = [...this.state.articles];
    let article = { ...this.state.selectedArticle };

    article.valeurDeclaree = val?.valeurDeclaree;
    article.quantite = val?.quantite;
    article.uniteLibelle = val?.uniteLibelle;
    article.poidsNet = val?.poidsNet;
    article.quantiteNormalisee = val?.quantiteNormalisee;

    localArticles[this.state.selectedArticleIndex] = article;
    this.setState({
      selectedArticle: article,
      articles: localArticles,
    });

    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionArticlesVO: { ...this.state.dedDumVo?.dedDumSectionArticlesVO, dedDumArticleFormVO: this.state.articles } };

    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);
  }

  updateAccordFranchisee = (val) => {
    // console.log('val updateAccordFranchisee:', val);
    let localArticles = [...this.state.articles];
    let article = { ...this.state.selectedArticle };

    article.accord = val?.accord;
    article.franchise = val?.franchise;

    localArticles[this.state.selectedArticleIndex] = article;
    this.setState({
      selectedArticle: article,
      articles: localArticles,
    });

    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionArticlesVO: { ...this.state.dedDumVo?.dedDumSectionArticlesVO, dedDumArticleFormVO: this.state.articles } };

    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);
    // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    // console.log('---------------------------------------------------------------------------');
    // console.log('***********************************************************************************');
    // console.log('////////////////////////////////////////////////////////////////////////////////');
    // console.log(JSON.stringify(dedDumVo));
    // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    // console.log('---------------------------------------------------------------------------');
    // console.log('***********************************************************************************');
    // console.log('////////////////////////////////////////////////////////////////////////////////');
  }

  updateArticleOrigine = (val) => {
    // console.log('val updateAccordFranchisee:', val);
    let localArticles = [...this.state.articles];
    let article = { ...this.state.selectedArticle };

    article.issuATPA = val?.issuATPA;

    localArticles[this.state.selectedArticleIndex] = article;
    this.setState({
      selectedArticle: article,
      articles: localArticles,
    });

    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionArticlesVO: { ...this.state.dedDumVo?.dedDumSectionArticlesVO, dedDumArticleFormVO: this.state.articles } };

    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);
  }
  

  splitArticlesArrays = () => {
    const dedDumArticles = getValueByPath(
      'dedDumSectionArticlesVO.dedDumArticleFormVO',
      this.props.data,
    );
    console.log('JSON.stringify(dedDumArticles) ', JSON.stringify(dedDumArticles));
    if (dedDumArticles) {
      const articles = [];
      const articlesContestes = [];
      dedDumArticles.forEach((article) => {
        if ((article && !article.conteste) || article.conteste === 'false') {
          articles.push(article);
        } else if (article) {
          articlesContestes.push(article);
        }
      });
      this.setState({ articlesContestes: articlesContestes, articles: articles });
    }
  };

  componentDidMount() {
    this.splitArticlesArrays();
  }

  onArticleSelectedClosed = () => {
    console.log('onArticleSelectedClosed');
    this.setState({ selectedArticle: null, selectedArticleIndex: null, });
  };

  onArticleContesteSelectedClosed = () => {
    this.setState({ selectedArticleConteste: null });
  };

  abandonner = () => {
    this.setState({ selectedArticle: null, selectedArticleIndex: null, });

    this.splitArticlesArrays();
  };

  supprimer = () => {
    let localArticles = [...this.state.articles];
    localArticles.splice(this.state.selectedArticleIndex, 1);

    this.setState({
      articles: localArticles,
    });

    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionArticlesVO: { ...this.state.dedDumVo?.dedDumSectionArticlesVO, dedDumArticleFormVO: this.state.articles } };

    this.setState({
      dedDumVo: dedDumVo
    });
    this.props.update();
    this.setState({ selectedArticle: null, selectedArticleIndex: null, });
    console.log('val supprimer:', JSON.stringify(this.state.articles));
  };


  addNewArticle = (article, index) => {
    this.setState({
      selectedArticle: {},
      newArticle: true
      // selectedArticleIndex: index,
    });
    // this.articleComp?.fillStateByProps();
  };

  checkRequiredFields = () => {
    let params = { msg: '', required: false }
    this.checkRequiredFieldsResultatCtrl(params);
    if (params.required) {
      let message = translate('actifsCreation.avionsPrivees.champsObligatoires') + params.msg;
      this.setState({
        errorMessage: message
      });
    } else {
      this.setState({
        errorMessage: null
      });
    }
    return params.required;
  }

  checkRequiredFieldsResultatCtrl = (params) => {
    let modele = this.state.selectedArticle;
    console.log(JSON.stringify(modele));
    if (_.isEmpty(modele.typeContenant)) {
      params.required = true;
      params.msg += !_.isEmpty(params.msg) ? ", " : "";
      params.msg += "E00596 Nature";
    }
    if (_.isEmpty(modele.refNgp)) {
      params.required = true;
      params.msg += !_.isEmpty(params.msg) ? ", " : "";
      params.msg += "E00596 Code NGP";
    }
  }

  confirmerAjout = () => {
    if (!this.checkRequiredFields()) {

      let localArticles = [...this.state.articles];
      // let newArticle = { ...localArticles[this.state.selectedArticleIndex] };
      localArticles.push(this.state.selectedArticle);

      this.setState({
        articles: localArticles,
      });

      let dedDumVo = { ...this.state.dedDumVo, dedDumSectionArticlesVO: { ...this.state.dedDumVo?.dedDumSectionArticlesVO, dedDumArticleFormVO: this.state.articles } };

      this.setState({
        dedDumVo: dedDumVo
      });
      this.props.update();
      this.setState({ selectedArticle: null, selectedArticleIndex: null, });
      console.log('val supprimer:', JSON.stringify(this.state.articles));
    }
  };

  confirmer = () => {
    { console.log('===================================================confirmer============================================================') }
    { console.log('===================================================confirmer============================================================') }
    console.log(JSON.stringify(this.state.selectedArticle));
    this.props.update();
    this.setState({ selectedArticle: null, selectedArticleIndex: null, });
    { console.log('====================================================confirmer===========================================================') }
    { console.log('====================================================confirmer===========================================================') }
    // this.setState({ selectedArticle: this.state.selectedArticle });
  };

  retablir = () => {
    this.setState({ selectedArticle: null, selectedArticleIndex: null, });

    this.splitArticlesArrays();
  };

  getDetailAccordion = (selectedArticle, onArticleSelectedClosed, edition) => {
    return (
      <ComBadrDetailAccordion
        onClose={onArticleSelectedClosed}
        visible={selectedArticle !== null}>
        {edition && (
          <Row>
            <Col />
            <Col>
              <Button
                onPress={() => this.supprimer()}
                mode="contained"
                style={styles.btnActions}
              >
                {translate('transverse.supprimer')}
              </Button>
            </Col>
            <Col>
              <Button
                onPress={() => this.abandonner()}
                mode="contained"
                style={styles.btnActions}
              >
                {translate('transverse.abandonner')}
              </Button>
            </Col>
            <Col />
          </Row>
        )}

        <DedRedressementDetailArticleContenantBlock
          article={
            selectedArticle
          }
          edition={edition}
          update={this.updateArticleContenant}
          onRef={(ref) => (this.articleComp = ref)}
        ></DedRedressementDetailArticleContenantBlock>
        <DedRedressementDetailArticleMarchandiseBlock
          data={this.props.data}
          article={selectedArticle}
          update={this.updateArticleMarchandise}
          edition={edition}
        ></DedRedressementDetailArticleMarchandiseBlock>
        <DedRedressementDetailArticleValeurQuantiteBlock
          article={selectedArticle}
          update={this.updateValeurQuantite}
          edition={edition}></DedRedressementDetailArticleValeurQuantiteBlock>
        <DedRedressementDetailArticleAccordFranchiseBlocK
          article={selectedArticle}
          update={this.updateAccordFranchisee}
          edition={edition}
        ></DedRedressementDetailArticleAccordFranchiseBlocK>
        <DedRedressementDetailArticleOrigineBlock
          article={selectedArticle}
          update={this.updateArticleOrigine}
          edition={edition}
        ></DedRedressementDetailArticleOrigineBlock>

        {/* <DedRedressementDetailArticleTypeReconnaissanceBlock
          article={
            selectedArticle
          }></DedRedressementDetailArticleTypeReconnaissanceBlock> */}
        {/* <DedRedressementDetailArticleLiquidationBlock
          article={
            selectedArticle
          }></DedRedressementDetailArticleLiquidationBlock> */}

        {edition && (
          <Row>
            <Col />
            <Col>
              <Button
                onPress={() => this.state.newArticle ? this.confirmerAjout() : this.confirmer()}
                mode="contained"
                style={styles.btnActions}
              >
                {translate('transverse.confirmer')}
              </Button>
            </Col>
            <Col>
              <Button
                onPress={() => this.retablir()}
                mode="contained"
                style={styles.btnActions}
              >
                {translate('transverse.retablir')}
              </Button>
            </Col>
            <Col />
          </Row>
        )}
      </ComBadrDetailAccordion>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title={`Articles : ${this.state.articles.length}`}
          expanded={true}>

          {this.state.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.state.errorMessage} />
          )}
          <ComBasicDataTableComp
            rows={this.state.articles}
            cols={this.state.articlesCols}
            totalElements={this.state.articles.length}
            maxResultsPerPage={5}
            paginate={true}
          />
          {this.state.selectedArticle &&
            this.getDetailAccordion(
              this.state.selectedArticle,
              this.onArticleSelectedClosed,
              this.state?.edition
            )}
        </ComAccordionComp>

        <Divider />

        <ComAccordionComp
          title={`Articles contestés : ${this.state.articlesContestes.length}`}
          expanded={true}>
          <ComBasicDataTableComp
            rows={this.state.articlesContestes}
            cols={this.state.articlesContesteCols}
            totalElements={this.state.articles.length}
            maxResultsPerPage={5}
            paginate={true}
          />
          {this.state.selectedArticleConteste &&
            this.getDetailAccordion(
              this.state.selectedArticleConteste,
              this.onArticleContesteSelectedClosed,
            )}
          {(this.state?.edition && !this.state.selectedArticle) && (
            <Row>
              <Col />
              <Col>
                <Button
                  onPress={() => this.addNewArticle()}
                  mode="contained"
                  style={styles.btnActions}
                >
                  {translate('transverse.nouveau')}
                </Button>
              </Col>
              <Col />
            </Row>
          )}
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementListsBlock;
