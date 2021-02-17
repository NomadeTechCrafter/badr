import React from 'react';
import { View, ScrollView } from 'react-native';
import T6bisInfosCommunsBlock from '../../common/t6bisInfosCommunsBlock';
import T6bisHistoriqueListeInterventionsBlock from './t6bisHistoriqueListeInterventionsBlock';





class T6bisHistoriqueListBlocks extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }

    



    componentDidMount = async () => {


    }

    componentWillUnmount() {
        console.log('T6bisHistoriqueListBlocks componentWillUnmount');
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
                    <T6bisHistoriqueListeInterventionsBlock t6bis={this.props.t6bis} />

                </View>

            </ScrollView>

        );
    }
}





export default T6bisHistoriqueListBlocks;