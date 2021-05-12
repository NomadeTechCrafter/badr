import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { load } from '../../../../../../commons/services/async-storage/ComStorageService';
import { getNavigationAerienneModelInitial } from '../../../utils/actifsUtils';
import { ACTIFS_CONFIRMER_AVION_PRIVEE_REQUEST, ACTIFS_INITIER_AVIONS_PRIVEES_TAB_REQUEST } from '../../state/actifsRapportCreationConstants';
import actifsRapportConfirmerAvionPriveeAction from '../../state/actions/actifsRapportConfirmerAvionPriveeAction';
import actifsRapportEditerAvionPriveeAction from '../../state/actions/actifsRapportEditerAvionPriveeAction';
import actifsRapportInitierAvionsPriveesTabAction from '../../state/actions/actifsRapportInitierAvionsPriveesTabAction';
import actifsRapportResetAvionPriveeAction from '../../state/actions/actifsRapportResetAvionPriveeAction';
import actifsRapportSupprimerAvionPriveeAction from '../../state/actions/actifsRapportSupprimerAvionPriveeAction';
import ActifsRapportAvionPriveeBlock from './actifsRapportAvionPriveeBlock';
import ActifsRapportCreationAvionsPriveesTableBlock from './actifsRapportCreationAvionsPriveesTableBlock';





class ActifsRapportCreationAvionsPriveesTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationsAeriennes: [],
            navigationAerienneModel: getNavigationAerienneModelInitial(),
        };

    }





    componentDidMount() {
        let navigations = (this.props.rows.navigationsAeriennes) ? this.props.rows.navigationsAeriennes : [];
        let rapportExiste = (this.props.rows) ? this.props.rows.rapportExiste : false;



            let dataToAction = {
                type: ACTIFS_INITIER_AVIONS_PRIVEES_TAB_REQUEST,
                value: {
                    navigationsAeriennes: navigations,
                    rapportExiste: rapportExiste
                }
            };

            this.props.dispatch(actifsRapportInitierAvionsPriveesTabAction.request(dataToAction));


    }

    ajouterNavigationAerienneModel = (model) => {
        let navigationsAeriennes = [...this.props.navigationsAeriennes];
        let dataToAction = {
            type: ACTIFS_CONFIRMER_AVION_PRIVEE_REQUEST,
            value: {
                navigationsAeriennes: navigationsAeriennes,
                index: this.props.index,
                navigationAerienneModel: model
            }
        };
        

        this.props.dispatch(actifsRapportConfirmerAvionPriveeAction.request(dataToAction));
       

    }

    componentDidUpdate() {
    }


    componentWillUnmount() {
    }



    reset = () => {
    };

    callbackHandler=(type, data)=> {
        switch (type) {
            case EDIT_AVION_PRIVEE_TASK:

                let dataToAction = {
                    type: ACTIFS_EDITER_AVION_PRIVEE_REQUEST,
                    value: {
                        index: data.index,
                        navigationAerienneModel: data.navigationAerienneModel
                    }
                };

               console.log(this);

                this.props.dispatch(actifsRapportEditerAvionPriveeAction.request(dataToAction));
                break;
            case DELETE_AVION_PRIVEE_TASK:
                dataToAction = {
                    type: ACTIFS_DELETE_AVION_PRIVEE_REQUEST,
                    value: {
                        index: data,

                    }
                };

                this.props.dispatch(actifsRapportSupprimerAvionPriveeAction.request(dataToAction));
                break;
            
            case RESET_AVION_PRIVEE_TASK:
                dataToAction = {
                    type: ACTIFS_RESET_AVION_PRIVEE_REQUEST,
                    value: {

                    }
                };

                this.props.dispatch(actifsRapportResetAvionPriveeAction.request(dataToAction));
                break;

        }

    }

     
    render() {
        return (
            <ScrollView>
                {(this.props.navigationsAeriennes) && (<ActifsRapportCreationAvionsPriveesTableBlock navigationsAeriennes={this.props.navigationsAeriennes} callbackHandler={this.callbackHandler} readOnly={this.props.rapportExiste}/>)}
                {(this.props.navigationAerienneModel) && (<ActifsRapportAvionPriveeBlock navigationAerienneModel={this.props.navigationAerienneModel} index={this.props.index} push={this.ajouterNavigationAerienneModel} callbackHandler={this.callbackHandler} readOnly={this.props.rapportExiste} />)}
            </ScrollView>

        );
    }
}





const mapStateToProps = (state) => ({ ...state.creationReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationAvionsPriveesTab);



