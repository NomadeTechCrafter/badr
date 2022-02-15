import React from 'react';
import { View } from 'react-native';
import { isAffaireChange, isAmendeTransactionnelle, isCm, isContrainteParCorps, isMtm, isTaxeCoordination } from '../../../../../utils/t6bisUtils';
import T6bisInformationsAffaireChangeSousBlock from './informationsT6BISSousBlocks/t6bisInformationsAffaireChangeSousBlock';
import T6bisInformationsAmendeTransactionnelleSousBlock from './informationsT6BISSousBlocks/t6bisInformationsAmendeTransactionnelleSousBlock';
import T6bisInformationsCmSousBlock from './informationsT6BISSousBlocks/t6bisInformationsCmSousBlock';
import T6bisInformationsContainteCorpsSousBlock from './informationsT6BISSousBlocks/t6bisInformationsContrainteCorpsSousBlock';
import T6bisInformationsMtmSousBlock from './informationsT6BISSousBlocks/t6bisInformationsMtmSousBlock';
import T6bisInformationsTaxeCoordinationSousBlock from './informationsT6BISSousBlocks/t6bisInformationsTaxeCoordinationSousBlock';
import T6bisInformationsTpeMtmSousBlock from './informationsTpeT6BISSousBlocks/t6bisInformationsTpeMtmSousBlock';
import * as T6BISConstantes from '../../../../../utils/t6bisConstants';





class T6bisEnteteInformationsT6BISBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
			typeMoyenPaiement:''
        };
    }

   viewCallBackHandler = (type, data) => {


        // manipulate data if required, we have just one case, in case of many actions, we will use switch case
        this.props.callbackHandler(type, data);


    };


handleCallback = (childData) =>{
        this.setState({typeMoyenPaiement: childData})
          this.props.callbackHandler(T6BISConstantes.T6BIS_SELECT_TPE_TASK, childData);
    }




    render() {

        console.log('this.state Informations T6BIS  ', this.state);
        console.log('this.props Informations T6BIS  ', this.props);
        let codeTypeT6bis = this.props.t6bis?.codeTypeT6bis;
        return (
            <View>
                {isMtm(codeTypeT6bis) && (
                    <T6bisInformationsMtmSousBlock parentCallback = {this.handleCallback} t6bis={this.props.t6bis} listmoyenpaiement={this.props.listmoyenpaiement}   readOnly={this.props.readOnly}/>)}
                 {isMtm(codeTypeT6bis) && this.state.typeMoyenPaiement=='03'&&(
                     <T6bisInformationsTpeMtmSousBlock t6bis={this.props.t6bis}  listDesTpes={this.props.listDesTpes}     readOnly={this.props.readOnly}/>)}

  
                {isCm(codeTypeT6bis) && (
                    <T6bisInformationsCmSousBlock t6bis={this.props.t6bis} listmoyenpaiement={this.props.listmoyenpaiement} readOnly={this.props.readOnly} />)}
                {isTaxeCoordination(codeTypeT6bis) && (
                    <T6bisInformationsTaxeCoordinationSousBlock t6bis={this.props.t6bis} fieldsetcontext={this.props.fieldsetcontext} listmoyenpaiement={this.props.listmoyenpaiement} readOnly={this.props.readOnly}/>)}
                {isContrainteParCorps(codeTypeT6bis) && (
                    <T6bisInformationsContainteCorpsSousBlock t6bis={this.props.t6bis} listmoyenpaiement={this.props.listmoyenpaiement} readOnly={this.props.readOnly}/>)}
                {isAffaireChange(codeTypeT6bis) && (
                    <T6bisInformationsAffaireChangeSousBlock t6bis={this.props.t6bis} listmoyenpaiement={this.props.listmoyenpaiement} readOnly={this.props.readOnly}/>)}
                {isAmendeTransactionnelle(codeTypeT6bis) && (
                    <T6bisInformationsAmendeTransactionnelleSousBlock t6bis={this.props.t6bis} listmoyenpaiement={this.props.listmoyenpaiement} readOnly={this.props.readOnly}/>)}


            </View>

        );
    }
}





export default T6bisEnteteInformationsT6BISBlock;
