import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ComBadrInfoMessageComp } from '../../../../../../commons/component';
import { DELETE_AVITAILLEMENTSORTIE_TASK, EDIT_AVITAILLEMENTSORTIE_TASK, RESET_AVITAILLEMENTSORTIE_TASK } from '../../../utils/actifsConstants';
import { getNavigationAvitaillementSortieModelInitial } from '../../../utils/actifsUtils';
import { ACTIFS_CONFIRMER_AVITAILLEMENTSORTIE_REQUEST, ACTIFS_DELETE_AVITAILLEMENTSORTIE_REQUEST, ACTIFS_EDITER_AVITAILLEMENTSORTIE_REQUEST, ACTIFS_RESET_AVITAILLEMENTSORTIE_REQUEST } from '../../state/actifsRapportCreationConstants';
import actifsRapportConfirmerAvitaillementSortieAction from '../../state/actions/actifsRapportConfirmerAvitaillementSortieAction';
import actifsRapportEditerAvitaillementSortieAction from '../../state/actions/actifsRapportEditerAvitaillementSortieAction';
import actifsRapportResetAvitaillementSortieAction from '../../state/actions/actifsRapportResetAvitaillementSortieAction';
import actifsRapportSupprimerAvitaillementSortieAction from '../../state/actions/actifsRapportSupprimerAvitaillementSortieAction';
import ActifsRapportAvitaillementSortieBlock from './actifsRapportAvitaillementSortieBlock';
import ActifsRapportAvitaillementRefDumBlock from './actifsRapportAvitaillementRefDumBlock';
import ActifsRapportCreationAvitaillementSortieTableBlock from './ActifsRapportCreationAvitaillementSortieTableBlock';





class ActifsRapportCreationAvitaillementSortieTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationsAvitaillementSorties: [],
            navigationAvitaillementSortieModel: getNavigationAvitaillementSortieModelInitial(),
        };

    }





    componentDidMount() {


    }

    ajouterNavigationAvitaillementSortieModel = (model) => {
        let navigationsAvitaillementSorties = [...this.props.navigationsAvitaillementSorties];
        let dataToAction = {
            type: ACTIFS_CONFIRMER_AVITAILLEMENTSORTIE_REQUEST,
            value: {
                navigationsAvitaillementSorties: navigationsAvitaillementSorties,
                index: this.props.index,
                navigationAvitaillementSortieModel: model
            }
        };
        

        this.props.dispatch(actifsRapportConfirmerAvitaillementSortieAction.request(dataToAction));
       

    }

    componentDidUpdate() {
    }


    componentWillUnmount() {
    }



    reset = () => {
    };

    updateTypeDUM = (value) => {
        console.log('updateTypeDUM : ' + value);
        this.props.navigationsAvitaillementSorties.typeDUM = value;
        this.props.index++;
        // this.props.update(this.props.navigationMaritimeModel);
    }

    callbackHandler=(type, data)=> {
        switch (type) {
            case EDIT_AVITAILLEMENTSORTIE_TASK:

                let dataToAction = {
                    type: ACTIFS_EDITER_AVITAILLEMENTSORTIE_REQUEST,
                    value: {
                        index: data.index,
                        navigationAvitaillementSortieModel: data.navigationAvitaillementSortieModel
                    }
                };

               console.log(this);

                this.props.dispatch(actifsRapportEditerAvitaillementSortieAction.request(dataToAction));
                break;
            case DELETE_AVITAILLEMENTSORTIE_TASK:
                dataToAction = {
                    type: ACTIFS_DELETE_AVITAILLEMENTSORTIE_REQUEST,
                    value: {
                        index: data,

                    }
                };

                this.props.dispatch(actifsRapportSupprimerAvitaillementSortieAction.request(dataToAction));
                break;
            
            case RESET_AVITAILLEMENTSORTIE_TASK:
                dataToAction = {
                    type: ACTIFS_RESET_AVITAILLEMENTSORTIE_REQUEST,
                    value: {

                    }
                };

                this.props.dispatch(actifsRapportResetAvitaillementSortieAction.request(dataToAction));
                break;

        }

    }

     
    render() {
        return (
            <ScrollView>
                {this.props.successMessage != null && (
                    <ComBadrInfoMessageComp message={this.props.successMessage} />
                )}
                <ActifsRapportAvitaillementRefDumBlock navigationAvitaillementSortieModel={this.props.navigationAvitaillementSortieModel} index={this.props.index} push={this.ajouterNavigationAvitaillementSortieModel} callbackHandler={this.callbackHandler} readOnly={this.props.consultation} />
                {(this.props.navigationsAvitaillementSorties) && (<ActifsRapportCreationAvitaillementSortieTableBlock navigationsAvitaillementSorties={this.props.navigationsAvitaillementSorties} callbackHandler={this.callbackHandler} readOnly={this.props.consultation}/>)}
                {(this.props.navigationAvitaillementSortieModel) && (<ActifsRapportAvitaillementSortieBlock navigationAvitaillementSortieModel={this.props.navigationAvitaillementSortieModel} index={this.props.index} push={this.ajouterNavigationAvitaillementSortieModel} callbackHandler={this.callbackHandler} readOnly={this.props.consultation} />)}
            </ScrollView>

        );
    }
}





const mapStateToProps = (state) => ({ ...state.creationReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationAvitaillementSortieTab);



