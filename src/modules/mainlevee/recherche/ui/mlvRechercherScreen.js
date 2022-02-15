import React, {Component} from 'react';
import {View} from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import {HelperText, TextInput} from 'react-native-paper';
import {
  RechercheRefDum,
  ComBadrToolbarComp,
  ComBadrButtonRadioComp,
  ComBadrCardBoxComp,
  ComBadrCardWithTileComp
} from '../../../../commons/component';
import EtatChargementBlock from './block/etatChargementTabSearchComponent'
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import styles from '../style/mlvRechercheStyle';
const initialState = {
typeRecherche:null
};
class NewRechercheMLV extends Component {

 constructor(props) {
 super(props);
    this.state = {
                 typeRecherche:null
                 };

this.radioButtonsTypeRecherche = [{
      id: '1',
      label: translate('mainlevee.typeRecherche.declarationDetaille'),
      value: '1'
    },
    {
      id: '2',
      label: translate('mainlevee.typeRecherche.etatChargement'),
      value: '2'
    }]

 }

  componentDidMount = () => {
 this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('mlv rechercher focus start');
       this.setState({
              typeRecherche: null,

            });
    });

     };
       componentWillUnmount() {
         this._unsubscribe();
       }

  render() {
    return (
      <View>


        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('mainlevee.title')}
          subtitle={translate('mainlevee.delivrerMainlevee.title')}
          icon="menu"
        />











{this.state.typeRecherche==null &&
                                              <ComBadrButtonRadioComp
                                              onValueChange={(value) => this.setState({typeRecherche: value})}
                                                disabled={false}
                                                value={String(this.state.typeRecherche)}
                                                title={translate('mainlevee.typeRecherche.typeRecherche')}
                                                radioButtonsData={this.radioButtonsTypeRecherche}
                                              />
}


{this.state.typeRecherche=='1' &&
        <RechercheRefDum
                commande={'initDelivrerMlv'}
                module="MLV_LIB"
                typeService="UC"
                successRedirection={'DelivrerMLV'}
                navigation={this.props.navigation}
                routeParams={this.props.route.params}
              />
              }


            {this.state.typeRecherche=='2' &&

 <EtatChargementBlock/>


             }
      </View>
    );
  }
}

export default NewRechercheMLV;
