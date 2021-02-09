
import React from 'react';
import { View } from 'react-native';
import { isRedevableNonOperator, isRedevableOperator } from "../../../../../utils/t6bisUtils";
import T6bisEnteteRedevableOpeSousBlock from './redevableSousBlocks/t6bisEnteteRedevableOpeSousBlock';
import T6bisEnteteRedevableSousBlock from './redevableSousBlocks/t6bisEnteteRedevableSousBlock';



class T6bisEnteteRedevableBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }


    componentDidMount = async () => {


    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };





    viewCallBackHandler = (type, data) => {


        // manipulate data if required, we have just one case, in case of many actions, we will use switch case
        this.props.callbackHandler(type, data);


    };



    render() {
        console.log(this.state);
        console.log("this.props.t6bis.codeTypeT6bis : ", this.props.t6bis?.codeTypeT6bis);
        let codeTypeT6bis = this.props.t6bis?.codeTypeT6bis;

        return (


            <View>
                

                    {isRedevableNonOperator(codeTypeT6bis) && (
                        <T6bisEnteteRedevableSousBlock identifiants={this.props.identifiants} t6bis={this.props.t6bis} fieldsetcontext={this.props.fieldsetcontext} callbackHandler={this.viewCallBackHandler} />)}
                    {isRedevableOperator(codeTypeT6bis) && (
                        <T6bisEnteteRedevableOpeSousBlock t6bis={this.props.t6bis} fieldsetcontext={this.props.fieldsetcontext} callbackHandler={this.viewCallBackHandler} />)}


            </View>
        );
    }
}






export default T6bisEnteteRedevableBlock;
