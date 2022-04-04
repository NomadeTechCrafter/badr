import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import T6bisInfosCommunsBlock from '../../common/t6bisInfosCommunsBlock';
import T6bisTaxationManuelleArticleTaxBlock from './t6bisTaxationManuelleArticleTaxBlock';
import T6bisLegendRubriqueBlock from './t6bisLegendRubriqueBlock';
import * as T6BISConstantes from "../../../../../utils/t6bisConstants";





class T6bisTaxationManuelleListBlocks extends React.Component {

defaultState = {
        listLegendes:[]
    };
    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }

    callbackHandler = (type, data) => {
       

        // manipulate data if required, we have just one case, in case of many actions, we will use switch case
        this.props.callbackHandler(type, data);
                
        
    };



    componentDidMount = async () => {


    }

    componentWillUnmount() {
        console.log('T6bisTaxationManuelleListBlocks componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };



    render() {
        console.log("T6bisTaxationManuelleListBlocks this.props", JSON.stringify(this.props));
        return (

            <ScrollView>

                <View style={{ flex: 1 }}>
                    <T6bisInfosCommunsBlock t6bis={this.props.t6bis} mode={this.props.mode} fieldsetcontext={this.props.fieldsetcontext} />
                    <T6bisTaxationManuelleArticleTaxBlock t6bis={this.props.t6bis} currentArticle={this.props.currentArticle} readOnly={this.props.readOnly} callbackHandler={this.callbackHandler}/>
 					< T6bisLegendRubriqueBlock t6bis={this.props.t6bis} listLegendes={this.props.currentArticle?.listLegendes} />

                </View>

            </ScrollView>

        );
    }
}





export default T6bisTaxationManuelleListBlocks;