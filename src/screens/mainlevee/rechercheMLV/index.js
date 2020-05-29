import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Container, RechercheRefDum,Toolbar} from '../../../components';
/**i18n */
import {translate} from '../../../common/translations/i18n';

class RechecheMLV extends Component {

    render() {
        return (
            <View>
                <Toolbar navigation={this.props.navigation} title={translate("mainlevee.title")} subtitle={translate("mainlevee.delivrerMainlevee.title")} icon="menu"/>
                <RechercheRefDum
                    commande={'initDelivrerMlv'}
                    module="MLV_LIB"
                    typeService="UC"
                    successRedirection={'DelivrerMLV'}
                    navigation={this.props.navigation}
                    routeParams={this.props.route.params}
                />

            </View>
        );
    }
}


export default RechecheMLV;
