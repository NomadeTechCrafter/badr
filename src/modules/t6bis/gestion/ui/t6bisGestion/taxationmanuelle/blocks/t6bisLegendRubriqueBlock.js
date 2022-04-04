import { Text, View } from 'react-native';
import React from 'react';

import { ComAccordionComp, ComBadrButtonComp, ComBadrErrorMessageComp, ComBadrPickerComp, ComBasicDataTableComp } from '../../../../../../../commons/component';
import translate from "../../../../../../../commons/i18n/ComI18nHelper";



class T6bisLegendRubriqueBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            listLegendes:this.props.listLegendes
        };
        this.cols = [
            {
                code: 'rubriqueCode',
                libelle: translate('t6bisGestion.tabs.taxation.manuelle.legendeTable.rubriqueCode'),
                width: 100,
            },
            {
                code: 'rubriqueDesignation',
                libelle: translate('t6bisGestion.tabs.taxation.manuelle.legendeTable.rubriqueDesignation'),
                width: 300,
            },


        ];
    }









    componentDidMount() {

    }

    componentDidUpdate() {
    }


    componentWillUnmount() {
    }



    render() {
        console.log("T6bisLegendRubriqueBlock this.props", this.props);
        return (

            <ComAccordionComp title={translate('t6bisGestion.tabs.taxation.manuelle.bloc.legende')} expanded={true}>


              <View>

            {this.props.listLegendes && (
            <ComBasicDataTableComp
        ref="_badrTable"
        id="articlesTable"
        rows={this.props.listLegendes}
        cols={this.cols}
      //  onItemSelected={this.onItemSelected}
        totalElements={this.props.listLegendes?.length}
        maxResultsPerPage={10}
        paginate={true}
        //showProgress={this.props.showProgress}
        withId={false}
        />
    )}



                </View>





            </ComAccordionComp>

        );
    }
}






export default T6bisLegendRubriqueBlock;



