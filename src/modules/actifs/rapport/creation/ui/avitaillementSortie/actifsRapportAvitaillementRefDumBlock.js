import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import moment from 'moment';
import { default as React } from 'react';
import { Text, View} from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { IconButton, TextInput, RadioButton } from 'react-native-paper';
import {
    ComBadrItemsPickerComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrLibelleComp, ComBadrProgressBarComp, ComContainerComp
} from '../../../../../../commons/component';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { CustomStyleSheet, primaryColor } from '../../../../../../commons/styles/ComThemeStyle';







class ActifsRapportAvitaillementRefDumBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationAvitaillementSortieModel: this.props.navigationAvitaillementSortieModel,
            index: this.props.index,
            typeDUM: '01'
        };

    }


    componentDidMount() {

    }



    componentWillUnmount() {
    }



    reset = () => {
    };




   static getDerivedStateFromProps(props, state) {

        if (
            props.navigationAvitaillementSortieModel && props.index !== state.index
        ) {
            return {
                navigationAvitaillementSortieModel: props.navigationAvitaillementSortieModel,// update the value of specific key
                index: props.index,
                heureSortieTech: props.navigationAvitaillementSortieModel.heureSortie
            };
        }
        // Return null to indicate no change to state.
        return null;
    }
 





    onDateSortieChange = (event, selectedDate) => {
        this.setState({
            navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                dateSortie: event.nativeEvent.timestamp,
            }, showDateSortie: false


        },);
        this.state.navigationAvitaillementSortieModel.dateSortie = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationAvitaillementSortieModel);
    }
    onHeureSortieChange = (event, selectedHeure) => {
        this.setState({
            navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                heureSortie: moment(selectedHeure).format('HH:mm').toString(),
            }, showHeureSortie: false, heureSortieTech: event.nativeEvent.timestamp


        });
        this.state.navigationAvitaillementSortieModel.heureSortie = moment(selectedHeure).format('HH:mm').toString();
        this.props.update(this.state.navigationAvitaillementSortieModel);
        
    }

    onDateDepartChange = (event, selectedDate) => {
        this.setState({
            navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                dateDepart: event.nativeEvent.timestamp,
            }, showDateDepart: false


        });
        this.state.navigationAvitaillementSortieModel.dateDepart = event.nativeEvent.timestamp;
        this.props.update(this.state.navigationAvitaillementSortieModel);
    }
    onHeureDepartChange = (event, selectedHeure) => {
        this.setState({
            navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                heureDepart: moment(selectedHeure).format('HH:mm').toString(),
            }, showHeureDepart: false, heureDepartTech: event.nativeEvent.timestamp


        });
        this.state.navigationAvitaillementSortieModel.heureDepart = moment(selectedHeure).format('HH:mm').toString();
        this.props.update(this.state.navigationAvitaillementSortieModel);
       
    }





    showMode = (currentMode) => {
        this.setState({ show: true, mode: currentMode });
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    showTimepicker = () => {
        this.showMode('time');
    };

    handleProvenanceChanged = (pays) => {
        this.setState({
            acProvenance: pays.libelle, navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                provenance: { codePays: pays.code, nomPays: pays.libelle }
            }
        });
        this.state.navigationAvitaillementSortieModel.provenance = { codePays: pays.code, nomPays: pays.libelle };
        this.props.update(this.state.navigationAvitaillementSortieModel)
    }

    handleDestinationChanged = (pays) => {
        this.setState({
            acDestination: pays.libelle, navigationAvitaillementSortieModel: {
                ...this.state.navigationAvitaillementSortieModel,
                destination: { codePays: pays.code, nomPays: pays.libelle }
            }
        });
        this.state.navigationAvitaillementSortieModel.destination = { codePays: pays.code, nomPays: pays.libelle };
        this.props.update(this.state.navigationAvitaillementSortieModel)


    }
    onChangeTypeDUM = (value) => {
        console.log('onChangeTypeDUM : ' + value);
        this.setState({ typeDUM: value });
    }




    render() {
    
        return (

            // <ComAccordionComp title={translate('actifsCreation.embarcations.navigMaritime.title')} expanded={true}>

                <View style={CustomStyleSheet.fullContainer}>
                 
                </View>


            // </ComAccordionComp>

        );
    }
}






export default ActifsRapportAvitaillementRefDumBlock;



