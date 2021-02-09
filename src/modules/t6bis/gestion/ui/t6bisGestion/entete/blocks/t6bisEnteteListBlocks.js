import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import T6bisInfosCommunsBlock from '../../common/t6bisInfosCommunsBlock';
import { CALLBACK_ENUMS } from './t6bisEnteteRedevableBlock';
import T6bisEnteteRedevableBlock from './t6bisEnteteRedevableBlock';
import T6bisEnteteInformationsT6BISBlock from './t6bisEnteteInformationsT6BISBlock';




const VIEW_CALLBACK_ENUMS = {
    ...CALLBACK_ENUMS,
};


class T6bisEnteteListBlocks extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    viewCallBackHandler = (type, data) => {
       

        // manipulate data if required, we have just one case, in case of many actions, we will use switch case
        this.props.callbackHandler(type, data);
                
        
    };



    componentDidMount = async () => {


    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };



    render() {
        console.log("this.props", this.props);
        return (

            <ScrollView>

                <View style={{ flex: 1 }}>
                    <T6bisInfosCommunsBlock t6bis={this.props.t6bis} mode={this.props.mode} fieldsetcontext={this.props.fieldsetcontext} />
                    <T6bisEnteteRedevableBlock identifiants={this.props.identifiants} t6bis={this.props.t6bis} callbackHandler={this.viewCallBackHandler}/>
                    <T6bisEnteteInformationsT6BISBlock t6bis={this.props.t6bis} fieldsetcontext={this.props.fieldsetcontext} listmoyenpaiement={this.props.listmoyenpaiement}/>

                </View>

            </ScrollView>

        );
    }
}





export default T6bisEnteteListBlocks;
export {
    VIEW_CALLBACK_ENUMS as CALLBACK_ENUMS
};