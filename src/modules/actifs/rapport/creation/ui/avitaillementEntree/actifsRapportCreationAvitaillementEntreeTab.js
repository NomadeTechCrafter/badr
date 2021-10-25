import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ComBadrInfoMessageComp } from '../../../../../../commons/component';
import { DELETE_AVITAILLEMENTENTREE_TASK, EDIT_AVITAILLEMENTENTREE_TASK, RESET_AVITAILLEMENTENTREE_TASK } from '../../../utils/actifsConstants';
import { getNavigationAvitaillementEntreeModelInitial } from '../../../utils/actifsUtils';
import { ACTIFS_CONFIRMER_AVITAILLEMENTENTREE_REQUEST, ACTIFS_DELETE_AVITAILLEMENTENTREE_REQUEST, ACTIFS_EDITER_AVITAILLEMENTENTREE_REQUEST, ACTIFS_RESET_AVITAILLEMENTENTREE_REQUEST } from '../../state/actifsRapportCreationConstants';
import actifsRapportConfirmerAvitaillementEntreeAction from '../../state/actions/actifsRapportConfirmerAvitaillementEntreeAction';
import actifsRapportEditerAvitaillementEntreeAction from '../../state/actions/actifsRapportEditerAvitaillementEntreeAction';
import actifsRapportResetAvitaillementEntreeAction from '../../state/actions/actifsRapportResetAvitaillementEntreeAction';
import actifsRapportSupprimerAvitaillementEntreeAction from '../../state/actions/actifsRapportSupprimerAvitaillementEntreeAction';
import ActifsRapportAvitaillementEntreeBlock from './actifsRapportAvitaillementEntreeBlock';
import ActifsRapportAvitaillementRefDumBlock from './actifsRapportAvitaillementRefDumBlock';
import ActifsRapportCreationAvitaillementEntreeTableBlock from './ActifsRapportCreationAvitaillementEntreeTableBlock';
// import ActifsRapportCreationEmbarcationsTableBlock from './actifsRapportCreationEmbarcationsTableBlock';





class ActifsRapportCreationAvitaillementEntreeTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationsAvitaillementEntrees: [],
            navigationAvitaillementEntreeModel: getNavigationAvitaillementEntreeModelInitial(),
        };

    }





    componentDidMount() {


    }

    ajouterNavigationAvitaillementEntreeModel = (model) => {
        let navigationsAvitaillementEntrees = [...this.props.navigationsAvitaillementEntrees];
        let dataToAction = {
            type: ACTIFS_CONFIRMER_AVITAILLEMENTENTREE_REQUEST,
            value: {
                navigationsAvitaillementEntrees: navigationsAvitaillementEntrees,
                index: this.props.index,
                navigationAvitaillementEntreeModel: model
            }
        };
        

        this.props.dispatch(actifsRapportConfirmerAvitaillementEntreeAction.request(dataToAction));
       

    }

    componentDidUpdate() {
    }


    componentWillUnmount() {
    }



    reset = () => {
    };

    callbackHandler=(type, data)=> {
        switch (type) {
            case EDIT_AVITAILLEMENTENTREE_TASK:

                let dataToAction = {
                    type: ACTIFS_EDITER_AVITAILLEMENTENTREE_REQUEST,
                    value: {
                        index: data.index,
                        navigationAvitaillementEntreeModel: data.navigationAvitaillementEntreeModel
                    }
                };

               console.log(this);

                this.props.dispatch(actifsRapportEditerAvitaillementEntreeAction.request(dataToAction));
                break;
            case DELETE_AVITAILLEMENTENTREE_TASK:
                dataToAction = {
                    type: ACTIFS_DELETE_AVITAILLEMENTENTREE_REQUEST,
                    value: {
                        index: data,

                    }
                };

                this.props.dispatch(actifsRapportSupprimerAvitaillementEntreeAction.request(dataToAction));
                break;
            
            case RESET_AVITAILLEMENTENTREE_TASK:
                dataToAction = {
                    type: ACTIFS_RESET_AVITAILLEMENTENTREE_REQUEST,
                    value: {

                    }
                };

                this.props.dispatch(actifsRapportResetAvitaillementEntreeAction.request(dataToAction));
                break;

        }

    }

     
    render() {
        return (
            <ScrollView>
                {this.props.successMessage != null && (
                    <ComBadrInfoMessageComp message={this.props.successMessage} />
                )}
                <ActifsRapportAvitaillementRefDumBlock navigationAvitaillementEntreeModel={this.props.navigationAvitaillementEntreeModel} index={this.props.index} push={this.ajouterNavigationAvitaillementEntreeModel} callbackHandler={this.callbackHandler} readOnly={this.props.consultation} />
                {(this.props.navigationsAvitaillementEntrees) && (<ActifsRapportCreationAvitaillementEntreeTableBlock navigationsAvitaillementEntrees={this.props.navigationsAvitaillementEntrees} callbackHandler={this.callbackHandler} readOnly={this.props.consultation}/>)}
                {(this.props.navigationAvitaillementEntreeModel) && (<ActifsRapportAvitaillementEntreeBlock navigationAvitaillementEntreeModel={this.props.navigationAvitaillementEntreeModel} index={this.props.index} push={this.ajouterNavigationAvitaillementEntreeModel} callbackHandler={this.callbackHandler} readOnly={this.props.consultation} />)}
            </ScrollView>

        );
    }
}





const mapStateToProps = (state) => ({ ...state.creationReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationAvitaillementEntreeTab);



