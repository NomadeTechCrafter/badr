import React from 'react';
import { Text, View } from 'react-native';
import { ComAccordionComp } from '../../../../../../../commons/component';
import styles from "../../../../style/t6bisGestionStyle";







class T6bisEnteteInformationsT6BISBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }



    
    



    render() {

        console.log('this.state Informations T6BIS  ', this.state);

        return (

            <View>
                <ComAccordionComp title="Informations T6BIS" expanded={false}>
                    <Text style={styles.textStyle}>{ "Informations T6BIS"}</Text>
                        
                        
        
                </ComAccordionComp>
                
            </View>









        );
    }
}





export default T6bisEnteteInformationsT6BISBlock;
