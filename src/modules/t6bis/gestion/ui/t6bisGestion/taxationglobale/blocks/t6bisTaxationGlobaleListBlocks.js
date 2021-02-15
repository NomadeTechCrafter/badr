import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import T6bisInfosCommunsBlock from '../../common/t6bisInfosCommunsBlock';
import T6bisTaxationGlobaleListeTaxationBlock from './t6bisTaxationGlobaleListeTaxationBlock';





class T6bisTaxationGlobaleListBlocks extends React.Component {


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
        console.log('T6bisTaxationGlobaleListBlocks componentWillUnmount');
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
                    <T6bisTaxationGlobaleListeTaxationBlock t6bis={this.props.t6bis} readOnly={this.props.readOnly} callbackHandler={this.viewCallBackHandler}/>

                </View>

            </ScrollView>

        );
    }
}





export default T6bisTaxationGlobaleListBlocks;