import moment from 'moment';
import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ComBadrErrorMessageComp, ComBadrInfoMessageComp } from '../../../../../../commons/component';
import { EDIT_AVION_PRIVEE_TASK, DELETE_AVION_PRIVEE_TASK, RESET_AVION_PRIVEE_TASK } from '../../../utils/actifsConstants';
import { getNavigationAerienneModelInitial } from '../../../utils/actifsUtils';
import { ACTIFS_CONFIRMER_AVION_PRIVEE_REQUEST, ACTIFS_DELETE_AVION_PRIVEE_REQUEST, ACTIFS_EDITER_AVION_PRIVEE_REQUEST, ACTIFS_RESET_AVION_PRIVEE_REQUEST } from '../../state/actifsRapportCreationConstants';
import actifsRapportConfirmerAvionPriveeAction from '../../state/actions/actifsRapportConfirmerAvionPriveeAction';
import actifsRapportEditerAvionPriveeAction from '../../state/actions/actifsRapportEditerAvionPriveeAction';
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


    }

    ajouterNavigationAerienneModel = (model) => {
        let navigationsAeriennes = [...this.props.navigationsAeriennes];
        let rapportService = this.props.rows;
        console.log('befire --- : ' + rapportService.ordreService.dateDebut);
        rapportService.ordreService.dateDebut = moment(this.props.rows?.ordreService?.dateDebut).format("YYYY-MM-DD");
        rapportService.ordreService.dateFin = moment(this.props.rows?.ordreService?.dateFin).format("YYYY-MM-DD");
        console.log('after --- : ' + rapportService.ordreService.dateDebut);
        let dataToAction = {
            type: ACTIFS_CONFIRMER_AVION_PRIVEE_REQUEST,
            value: {
                navigationsAeriennes: navigationsAeriennes,
                index: this.props.index,
                rapportService: rapportService,
                navigationAerienne: model
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

    callbackHandler = (type, data) => {
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
        // console.log('+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+ response this.props +-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+');
        // console.log('+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+ response this.props +-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+');
        // console.log('+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+ response this.props +-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+');
        // console.log(JSON.stringify(this.props));
        // console.log('+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+ response this.props +-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+');
        // console.log('+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+ response this.props +-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+');
        // console.log('+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+ response this.props +-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+');
        return (
            <ScrollView>
                {this.props.successMessage != null && (
                    <ComBadrInfoMessageComp message={this.props.successMessage} />
                )}
                {this.props.value?.dtoHeader?.messagesErreur != null && (
                    <ComBadrErrorMessageComp message={this.props.value?.dtoHeader?.messagesErreur} />
                )}
                {(this.props.navigationsAeriennes) && (<ActifsRapportCreationAvionsPriveesTableBlock navigationsAeriennes={this.props.navigationsAeriennes} callbackHandler={this.callbackHandler} readOnly={this.props.consultation} />)}
                {(this.props.navigationAerienneModel) && (<ActifsRapportAvionPriveeBlock navigationAerienneModel={this.props.navigationAerienneModel} index={this.props.index} push={this.ajouterNavigationAerienneModel} callbackHandler={this.callbackHandler} readOnly={this.props.consultation} />)}
            </ScrollView>

        );
    }
}





const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationAvionsPriveesTab);



