import React from 'react';
import { View } from 'react-native';
import { isAffaireChange, isAmendeTransactionnelle, isCm, isContrainteParCorps, isMtm, isTaxeCoordination } from '../../../../../utils/t6bisUtils';
import T6bisInformationsAffaireChangeSousBlock from './informationsT6BISSousBlocks/t6bisInformationsAffaireChangeSousBlock';
import T6bisInformationsAmendeTransactionnelleSousBlock from './informationsT6BISSousBlocks/t6bisInformationsAmendeTransactionnelleSousBlock';
import T6bisInformationsCmSousBlock from './informationsT6BISSousBlocks/t6bisInformationsCmSousBlock';
import T6bisInformationsContainteCorpsSousBlock from './informationsT6BISSousBlocks/t6bisInformationsContrainteCorpsSousBlock';
import T6bisInformationsMtmSousBlock from './informationsT6BISSousBlocks/t6bisInformationsMtmSousBlock';
import T6bisInformationsTaxeCoordinationSousBlock from './informationsT6BISSousBlocks/t6bisInformationsTaxeCoordinationSousBlock';





class T6bisEnteteInformationsT6BISBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
    }



    //




    render() {

        console.log('this.state Informations T6BIS  ', this.state);
        console.log('this.props Informations T6BIS  ', this.props);
        let codeTypeT6bis = this.props.t6bis?.codeTypeT6bis;
        return (
            <View>
                {isMtm(codeTypeT6bis) && (
                    <T6bisInformationsMtmSousBlock t6bis={this.props.t6bis} listmoyenpaiement={this.props.listmoyenpaiement} />)}
                {isCm(codeTypeT6bis) && (
                    <T6bisInformationsCmSousBlock t6bis={this.props.t6bis} listmoyenpaiement={this.props.listmoyenpaiement} />)}
                {isTaxeCoordination(codeTypeT6bis) && (
                    <T6bisInformationsTaxeCoordinationSousBlock t6bis={this.props.t6bis} fieldsetcontext={this.props.fieldsetcontext} listmoyenpaiement={this.props.listmoyenpaiement} />)}
                {isContrainteParCorps(codeTypeT6bis) && (
                    <T6bisInformationsContainteCorpsSousBlock t6bis={this.props.t6bis} listmoyenpaiement={this.props.listmoyenpaiement} />)}
                {isAffaireChange(codeTypeT6bis) && (
                    <T6bisInformationsAffaireChangeSousBlock t6bis={this.props.t6bis} listmoyenpaiement={this.props.listmoyenpaiement} />)}
                {isAmendeTransactionnelle(codeTypeT6bis) && (
                    <T6bisInformationsAmendeTransactionnelleSousBlock t6bis={this.props.t6bis} listmoyenpaiement={this.props.listmoyenpaiement} />)}


            </View>

        );
    }
}





export default T6bisEnteteInformationsT6BISBlock;
