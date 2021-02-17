import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import T6bisInfosCommunsBlock from '../../common/t6bisInfosCommunsBlock';
import { CALLBACK_ENUMS } from './t6bisEnteteRedevableBlock';
import T6bisEnteteRedevableBlock from './t6bisEnteteRedevableBlock';
import T6bisEnteteInformationsT6BISBlock from './t6bisEnteteInformationsT6BISBlock';
import T6bisRecapTaxationGlobaleBlock from './t6bisRecapTaxationGlobaleBlock';
import T6bisRedressementBlock from './t6bisRedressementBlock';
import { isRedressement } from '../../../../../utils/t6bisUtils';




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
        console.log('T6bisEnteteListBlocks componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };



    render() {
        console.log("this.props-----------------------------------------------------------------------------------------", this.props);
        return (

            <ScrollView>

                <View style={{ flex: 1 }}>
                    <T6bisInfosCommunsBlock t6bis={this.props.t6bis} mode={this.props.mode} fieldsetcontext={this.props.fieldsetcontext} />
                    <T6bisEnteteRedevableBlock newIntervenant={this.props?.newIntervenant} actions={this.props?.actions} fieldsetcontext={this.props.fieldsetcontext} 
                        retourFindIntervenant={this.props?.retourFindIntervenant} identifiants={this.props.identifiants} t6bis={this.props.t6bis} callbackHandler={this.viewCallBackHandler} readOnly={this.props.readOnly} />
                    <T6bisEnteteInformationsT6BISBlock t6bis={this.props.t6bis} fieldsetcontext={this.props.fieldsetcontext} listmoyenpaiement={this.props.listmoyenpaiement} readOnly={this.props.readOnly} />


                    {(this.props?.listeRecap && this.props?.listeRecap.length != 0) && (<T6bisRecapTaxationGlobaleBlock t6bis={this.props.t6bis} listeRecap={this.props.listeRecap} />)}
                    {(isRedressement() || this.props.t6bis?.referenceT6BisRemplacee) && (<T6bisRedressementBlock t6bis={this.props.t6bis} />)}


                </View>

            </ScrollView>

        );
    }
}





export default T6bisEnteteListBlocks;
export {
    VIEW_CALLBACK_ENUMS as CALLBACK_ENUMS
};