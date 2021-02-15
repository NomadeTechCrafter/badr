import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native-animatable';
import { ComAccordionComp } from '../../../../../../../commons/component';
import translate from "../../../../../../../commons/i18n/ComI18nHelper";
import styles from '../../../../style/t6bisGestionStyle';
import { TextInput } from 'react-native-paper';
import { Col, Row } from 'react-native-easy-grid';






class T6bisRedressementBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            t6bis: this.props.t6bis

        };

    }




    onItemSelected = (row) => { };



    componentDidMount() {

    }

    componentDidUpdate() {




    }


    componentWillUnmount() {
        console.log('T6bisArticlesListArticlesBlock componentWillUnmount');
    }



    reset = () => {
        console.log('T6bisArticlesListArticlesBlock reset');
    };


    onChangeTextCommentaireRedressement(text) {
        setState({ t6bis: { ...this.state.t6bis, commentaireRedressement: text } });
    }

    render() {
        console.log("T6bisArticlesListArticlesBlock--------------------------------------------------- this.props", this.props);
        console.log("T6bisArticlesListArticlesBlock--------------------------------------------------- this.props", this.props.t6bis);

        return (

            <ComAccordionComp expanded={true}>

                <View style={styles.ComContainer}>
                    <Row size={200}>
                        <Col size={40} style={styles.labelContainer}>
                            <Text style={styles.labelTextStyle}>
                                {translate('t6bisGestion.tabs.entete.motivation')}
                            </Text>




                        </Col>

                        <Col size={160} style={styles.labelContainer}>
                            <TextInput
                                mode="outlined"
                                numberOfLins={4}
                                label={translate('t6bisGestion.tabs.entete.motivation')}
                                value={this.props.t6bis?.commentaireRedressement}
                                onChangeText={(text) => this.onChangeTextCommentaireRedressement(text)}
                            />
                        </Col>

                    </Row>
                </View>

            </ComAccordionComp>

        );
    }
}



export default T6bisRedressementBlock;






