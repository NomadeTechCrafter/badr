import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import {getValueByPath} from '../../../utils/DedUtils';

class DedRedressementListsBlock extends React.Component {
  buildArticlesCols = () => {
    return [
      {code: 'numeroOrdre', libelle: 'Unité', width: 100},
      {code: 'typeContenant', libelle: 'Code contenants', width: 120},
      {code: 'nombreContenants', libelle: 'Nombre contenants', width: 120},
      {code: 'refNgp', libelle: 'Code NGP', width: 200},
      {code: 'valeurDeclaree', libelle: 'Valeur declarée', width: 80},
      {code: 'quantite', libelle: 'Quantité', width: 80},
      {code: 'unite', libelle: 'Unité', width: 80},
      {code: 'issuATPA ', libelle: 'Issu ATPA', width: 120},
    ];
  };

  constructor(props) {
    super(props);
    this.state = {
      articlesContestes: [],
      articles: [],
      articlesCols: this.buildArticlesCols(),
    };
  }

  splitArticlesArrays = () => {
    const dedDumArticles = getValueByPath(
      'dedDumSectionArticlesVO.dedDumArticleFormVO',
      this.props.data,
    );
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

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title={`Articles : ${this.state.articles.length}`}
          expanded={true}>
          <ComBasicDataTableComp
            hasId={true}
            rows={this.state.articles}
            cols={this.state.articlesCols}
            totalElements={this.state.articles.length}
            maxResultsPerPage={5}
            paginate={true}
          />
        </ComAccordionComp>

        <ComAccordionComp
          title={`Articles contestés : ${this.state.articlesContestes.length}`}
          expanded={true}>
          <ComBasicDataTableComp
            hasId={true}
            rows={this.state.articlesContestes}
            cols={this.state.articlesCols}
            totalElements={this.state.articles.length}
            maxResultsPerPage={5}
            paginate={true}
          />
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementListsBlock;
