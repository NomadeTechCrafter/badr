import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { isMtm,isCm } from '../../../../../utils/t6bisUtils';
import T6bisInfosCommunsBlock from '../../common/t6bisInfosCommunsBlock';
import T6bisArticlesCurrentArticleMtmBlock from './t6bisArticlesCurrentArticleMtmBlock';
import T6bisArticlesListArticlesMtmBlock from './t6bisArticlesListArticlesMtmBlock';








class T6bisArticlesListBlocks extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    viewCallBackHandler = (type, data) => {


        console.log(' viewCallBackHandler type :', type);
        console.log(' viewCallBackHandler data :', data);

        // manipulate data if required, we have just one case, in case of many actions, we will use switch case
        this.props.callbackHandler(type, data);


    };



    componentDidMount() {

        console.log('T6bisArticlesListBlocks componentWillmount');
    }

    componentWillUnmount() {
        console.log('T6bisArticlesListBlocks componentWillUnmount');
    }



    reset = () => {
        console.log('T6bisArticlesListBlocks reset');
    };



    render() {
        console.log("T6bisArticlesListBlocks this.props", this.props);
        let codeTypeT6bis = this.props.t6bis?.codeTypeT6bis;
        return (

            <ScrollView>

                <View style={{ flex: 1 }}>
                    <T6bisInfosCommunsBlock t6bis={this.props.t6bis} mode={this.props.mode} fieldsetcontext={this.props.fieldsetcontext} />
                    {isMtm(codeTypeT6bis) && (
                        <T6bisArticlesListArticlesMtmBlock listeArticles={this.props.listeArticles} callbackHandler={this.viewCallBackHandler} />
                    )}
                    {isMtm(codeTypeT6bis) && (
                        <T6bisArticlesCurrentArticleMtmBlock currentArticle={this.props.currentArticle} callbackHandler={this.viewCallBackHandler} />
                    )}
                    {isCm(codeTypeT6bis) && (
                        <T6bisArticlesListArticlesCmBlock listeArticles={this.props.listeArticles} callbackHandler={this.viewCallBackHandler} />
                    )}
                    {isCm(codeTypeT6bis) && (
                        <T6bisArticlesCurrentArticleCmBlock currentArticle={this.props.currentArticle} callbackHandler={this.viewCallBackHandler} />
                    )}
                    {(this.props.recapCurrentArticleList) && (
                        <T6bisArticlesRecapTaxationBlock recapCurrentArticleList={this.props.recapCurrentArticleList} montantGlobalByArticle={this.props.montantGlobalByArticle} />)}
                </View>

            </ScrollView>

        );
    }
}


export default T6bisArticlesListBlocks;



