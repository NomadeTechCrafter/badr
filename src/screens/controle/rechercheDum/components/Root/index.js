import React, { Component } from "react";
import {ScrollView ,Text} from 'react-native';
import {Card ,BadrTextInput, BadrButton, BadrErrorMessage} from "../../../../../components";
/**i18n */
import {translate} from '../../../../../common/translations/i18n';
import {CustomStyleSheet} from '../../../../../styles';
import _ from 'lodash';
class RechecheDum extends Component {

  defaultState = { bureau:'', regime:'', annee:'', serie:'' ,cle:'', cleValide:''}
  constructor(props) {
    super(props);
    this.state = this.defaultState
  }

onChangeInput = input => {
  console.log('onChangeInput')
  let keyImput =_.keys(input)[0] 
  this.setState({[keyImput] :input[keyImput].replace(/[^0-9]/g, '')});
};
onChangeInputCle = cle => {
  console.log('onChangeInputCle')
  this.setState({'cle': cle.replace(/[^A-Za-z]/g, '')});
};
onBlurInput = input => {
  console.log('onBlurInput')
  let keyImput =_.keys(input)[0] 
  if (input[keyImput] != ''){
    this.setState({[keyImput] :_.padStart(input[keyImput], input['maxLength'], '0')});
  }
}
retablir = () =>{
  console.log('retablir')
  this.setState({ ...this.defaultState });
}

confirmer = () =>{
  console.log('confirmer')
  this.setState({showErrorMsg:true})
  if (this.state.regime &&this.state.serie ){
    this.state.cleValide = this.cleDUM(this.state.regime, this.state.serie)
  }
  
}
cleDUM = function (regime, serie) {

  let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  /*while (serie.length < 6) {
    serie = '0' + serie;
  }*/
  if (serie.length > 6) {
    console.log((serie.length))
    let firstSerie = serie.substring(0, 1);
    if (firstSerie == '0') {
      serie = serie.substring(1, 7);
    }
  }
  let obj = regime + serie;
  let RS = obj % 23;
   alpha = alpha.charAt(RS);
  return alpha;
};
  render() {
 /* const { goBack } = this.props.navigation;
    const { formContainer } = styles; */

    return (

     
      <Card style={[CustomStyleSheet.centerContainer, {flexDirection:'column'}]}>
          {this.state.showErrorMsg && (
            <BadrErrorMessage message={[
              _.isEmpty(this.state.bureau) ? translate('errors.donneeObligatoire', {'champ': translate('transverse.bureau')})+'\n': '',
              _.isEmpty(this.state.regime) ? translate('errors.donneeObligatoire', {'champ': translate('transverse.regime')})+'\n': '',
              _.isEmpty(this.state.annee) ? translate('errors.donneeObligatoire', {'champ': translate('transverse.annee')})+'\n': '',
              _.isEmpty(this.state.serie) ? translate('errors.donneeObligatoire', {'champ': translate('transverse.serie')})+'\n': '',
              this.state.cle != this.state.cleValide ? translate('errors.cleNotValid', {'cle': this.state.cleValide})+'\n': '',
             ]
            } />
          )}
          <BadrTextInput
            maxLength={3}
            keyboardType={'number-pad'}
            value= {this.state.bureau}
            placeholder={translate('transverse.bureau')}
            onChangeText={val => this.onChangeInput( {bureau: val})}
            onEndEditing={(event) => this.onBlurInput({bureau: event.nativeEvent.text, maxLength : 3})}
          /> 
           <BadrTextInput
            maxLength={3}
            keyboardType={'number-pad'}
            value= {this.state.regime}
            placeholder={translate('transverse.regime')}
            onChangeText={val => this.onChangeInput({regime: val})}
            onEndEditing={(event) => this.onBlurInput({regime: event.nativeEvent.text, maxLength : 3})}
          /> 
           <BadrTextInput
            maxLength={4}
            keyboardType={'number-pad'}
            value= {this.state.annee}
            placeholder={translate('transverse.annee')}
            onChangeText={val => this.onChangeInput({annee: val})}
            onEndEditing={(event) => this.onBlurInput({annee: event.nativeEvent.text, maxLength : 4})}
          /> 
           <BadrTextInput
            maxLength={7}
            keyboardType={'number-pad'}
            value= {this.state.serie}
            placeholder={translate('transverse.serie')}
            onChangeText={val => this.onChangeInput({serie: val})}
            onEndEditing={(event) => this.onBlurInput({serie: event.nativeEvent.text, maxLength : 7})}
          /> 
           <BadrTextInput
           autoCapitalize ={'characters'}
           value= {this.state.cle}
            maxLength={1}
            placeholder={translate('transverse.cle')}
            onChangeText={val => this.onChangeInputCle(val)}
            
          /> 
        
            <BadrButton 
              onPress={this.confirmer}
              text={translate('transverse.confirmer')}
            />
            <BadrButton 
              onPress={this.retablir}
              text={translate('transverse.retablir')}
            />
      </Card>
    );
  }
}

const styles = {
};

const mapStateToProps = state => ({...state.authReducer});

export default connect(
  mapStateToProps,
  null,
)(RechecheDum);



