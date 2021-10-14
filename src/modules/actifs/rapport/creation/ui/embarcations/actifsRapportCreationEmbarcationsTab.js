import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ComBadrInfoMessageComp } from '../../../../../../commons/component';
import { DELETE_EMBARCATION_TASK, EDIT_EMBARCATION_TASK, RESET_EMBARCATION_TASK } from '../../../utils/actifsConstants';
import { getNavigationMaritimeModelInitial } from '../../../utils/actifsUtils';
import { ACTIFS_CONFIRMER_EMBARCATION_REQUEST, ACTIFS_DELETE_EMBARCATION_REQUEST, ACTIFS_EDITER_EMBARCATION_REQUEST, ACTIFS_RESET_EMBARCATION_REQUEST } from '../../state/actifsRapportCreationConstants';
import actifsRapportConfirmerEmbaracationAction from '../../state/actions/actifsRapportConfirmerEmbaracationAction';
import actifsRapportEditerEmbaracationAction from '../../state/actions/actifsRapportEditerEmbaracationAction';
import actifsRapportResetEmbaracationAction from '../../state/actions/actifsRapportResetEmbaracationAction';
import actifsRapportSupprimerEmbaracationAction from '../../state/actions/actifsRapportSupprimerEmbaracationAction';
import ActifsRapportCreationEmbarcationsTableBlock from './actifsRapportCreationEmbarcationsTableBlock';
import ActifsRapportEmbarcationBlock from './actifsRapportEmbarcationBlock';





class ActifsRapportCreationEmbarcationsTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationsMaritimes: [],
            navigationMaritimeModel: getNavigationMaritimeModelInitial(),
        };

    }





    componentDidMount() {


    }

    ajouterNavigationMaritimeModel = (model) => {
        let navigationsMaritimes = [...this.props.navigationsMaritimes];
        let dataToAction = {
            type: ACTIFS_CONFIRMER_EMBARCATION_REQUEST,
            value: {
                navigationsMaritimes: navigationsMaritimes,
                index: this.props.index,
                navigationMaritimeModel: model
            }
        };
        

        this.props.dispatch(actifsRapportConfirmerEmbaracationAction.request(dataToAction));
       

    }

    componentDidUpdate() {
    }


    componentWillUnmount() {
    }



    reset = () => {
    };

    callbackHandler=(type, data)=> {
        switch (type) {
            case EDIT_EMBARCATION_TASK:

                let dataToAction = {
                    type: ACTIFS_EDITER_EMBARCATION_REQUEST,
                    value: {
                        index: data.index,
                        navigationMaritimeModel: data.navigationMaritimeModel
                    }
                };

               console.log(this);

                this.props.dispatch(actifsRapportEditerEmbaracationAction.request(dataToAction));
                break;
            case DELETE_EMBARCATION_TASK:
                dataToAction = {
                    type: ACTIFS_DELETE_EMBARCATION_REQUEST,
                    value: {
                        index: data,

                    }
                };

                this.props.dispatch(actifsRapportSupprimerEmbaracationAction.request(dataToAction));
                break;
            
            case RESET_EMBARCATION_TASK:
                dataToAction = {
                    type: ACTIFS_RESET_EMBARCATION_REQUEST,
                    value: {

                    }
                };

                this.props.dispatch(actifsRapportResetEmbaracationAction.request(dataToAction));
                break;

        }

    }

     
    render() {
        return (
            <ScrollView>
                {this.props.successMessage != null && (
                    <ComBadrInfoMessageComp message={this.props.successMessage} />
                )}
                {(this.props.navigationsMaritimes) && (<ActifsRapportCreationEmbarcationsTableBlock navigationsMaritimes={this.props.navigationsMaritimes} callbackHandler={this.callbackHandler} readOnly={this.props.consultation}/>)}
                {(this.props.navigationMaritimeModel) && (<ActifsRapportEmbarcationBlock navigationMaritimeModel={this.props.navigationMaritimeModel} index={this.props.index} push={this.ajouterNavigationMaritimeModel} callbackHandler={this.callbackHandler} readOnly={this.props.consultation} />)}
            </ScrollView>

        );
    }
}





const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationEmbarcationsTab);



