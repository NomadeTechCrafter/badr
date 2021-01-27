import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import T6bisEnteteInfosCommunsBlock from './t6bisEnteteInfosCommunsBlock';
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

        console.log('this.state entete block', this.state);
        console.log('this.props entete block', this.props);
        console.log('this.t6bis entete block', this.props.t6bis);

        return (

            <ScrollView>

                <View style={{ flex: 1 }}>
                    <T6bisEnteteInfosCommunsBlock t6bis={this.props.t6bis} mode={this.props.mode} />
                    <T6bisEnteteRedevableBlock identifiants={this.props.identifiants} t6bis={this.props.t6bis} callbackHandler={this.viewCallBackHandler}/>
                    <T6bisEnteteInformationsT6BISBlock />

                </View>

            </ScrollView>








        );
    }
}





export default T6bisEnteteListBlocks;
export {
    VIEW_CALLBACK_ENUMS as CALLBACK_ENUMS
};