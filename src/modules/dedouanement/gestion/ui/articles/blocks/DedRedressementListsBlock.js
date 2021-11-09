import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrDetailAccordion,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {getValueByPath} from '../../../utils/DedUtils';
import DedRedressementDetailArticleContenantBlock from './DedRedressementDetailArticleContenantBlock';
import DedRedressementDetailArticleMarchandiseBlock from './DedRedressementDetailArticleMarchandiseBlock';
import DedRedressementDetailArticleValeurQuantiteBlock from './DedRedressementDetailArticleValeurQuantiteBlock';
import DedRedressementDetailArticleAccordFranchiseBlocK from './DedRedressementDetailArticleAccordFranchiseBlock';
import {Divider} from 'react-native-paper';
import DedRedressementDetailArticleOrigineBlock from './DedRedressementDetailArticleOrigineBlock';
import DedRedressementDetailArticleTypeReconnaissanceBlock from './DedRedressementDetailArticleTypeReconnaissanceBlock';
import DedRedressementDetailArticleLiquidationBlock from './DedRedressementDetailArticleLiquidationBlock';

class DedRedressementListsBlock extends React.Component {
  buildArticlesCols = (conteste) => {
    return [
      {
        code: '',
        libelle: '',
        width: 100,
        component: 'button',
        icon: 'eye',
        action: (row, index) =>
          conteste
            ? this.onArticleContesteSelected(row, index)
            : this.onArticleSelected(row, index),
      },
      {code: 'numeroOrdre', libelle: 'N°', width: 100},
      {code: 'typeContenant', libelle: 'Code contenants', width: 120},
      {code: 'nombreContenants', libelle: 'Nombre contenants', width: 120},
      {code: 'refNgp', libelle: 'Code NGP', width: 200},
      {code: 'valeurDeclaree', libelle: 'Valeur declarée', width: 80},
      {code: 'quantite', libelle: 'Quantité', width: 80},
      {code: 'unite', libelle: 'Unité', width: 80},
      { code: 'issuATPA ', libelle: 'Issu ATPA', width: 120, render: (row) => (row.issuATPA==='false')?'Non':'Oui' },
    ];
  };

  onArticleSelected = (article) => {
    this.setState({selectedArticle: article});
  };

  onArticleContesteSelected = (article) => {
    this.setState({selectedArticleConteste: article});
  };

  constructor(props) {
    super(props);
    this.state = {
      articlesContestes: [],
      articles: [],
      articlesCols: this.buildArticlesCols(false),
      articlesContesteCols: this.buildArticlesCols(true),
    };
  }

  splitArticlesArrays = () => {
    const dedDumArticles = getValueByPath(
      'dedDumSectionArticlesVO.dedDumArticleFormVO',
      this.props.data,
    );
    console.log('JSON.stringify(dedDumArticles) ',JSON.stringify(dedDumArticles));
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
      this.setState({articlesContestes: articlesContestes, articles: articles});
    }
  };

  componentDidMount() {
    this.splitArticlesArrays();
  }

  onArticleSelectedClosed = () => {
    this.setState({selectedArticle: null});
  };

  onArticleContesteSelectedClosed = () => {
    this.setState({selectedArticleConteste: null});
  };

  getDetailAccordion = (selectedArticle, onArticleSelectedClosed) => {
    return (
      <ComBadrDetailAccordion
        onClose={onArticleSelectedClosed}
        visible={selectedArticle !== null}>
        <DedRedressementDetailArticleContenantBlock
          article={
            selectedArticle
          }></DedRedressementDetailArticleContenantBlock>
        <DedRedressementDetailArticleMarchandiseBlock
          data={this.props.data}
          article={
            selectedArticle
          }></DedRedressementDetailArticleMarchandiseBlock>
        <DedRedressementDetailArticleValeurQuantiteBlock
          article={
            selectedArticle
          }></DedRedressementDetailArticleValeurQuantiteBlock>
        <DedRedressementDetailArticleAccordFranchiseBlocK
          codeAccord={getValueByPath(
            'dedDumSectionEnteteVO.codeAccord',
            this.props.data,
          )}
          codeFranchise={getValueByPath(
            'dedDumSectionEnteteVO.codeFranchise',
            this.props.data,
          )}
          article={
            selectedArticle
          }></DedRedressementDetailArticleAccordFranchiseBlocK>

        <DedRedressementDetailArticleOrigineBlock
          article={selectedArticle}></DedRedressementDetailArticleOrigineBlock>
        {/* <DedRedressementDetailArticleTypeReconnaissanceBlock
          article={
            selectedArticle
          }></DedRedressementDetailArticleTypeReconnaissanceBlock> */}
        {/* <DedRedressementDetailArticleLiquidationBlock
          article={
            selectedArticle
          }></DedRedressementDetailArticleLiquidationBlock> */}
      </ComBadrDetailAccordion>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title={`Articles : ${this.state.articles.length}`}
          expanded={true}>
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
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementListsBlock;
