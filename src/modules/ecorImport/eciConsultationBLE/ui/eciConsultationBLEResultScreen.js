import React from 'react';
import { View } from 'react-native';

/**Custom Components */
import { ComBasicDataTableComp, ComGenericDataTableComp } from '../../../../commons/component';
/** REDUX **/
import { connect } from 'react-redux';
import translate from '../../../../commons/i18n/ComI18nHelper';

class EciConsultationBLEResultScreen extends React.Component {
    constructor(props) {
        super(props);

        this.cols = [
            {
                code: 'referenceBulletin',
                libelle: translate('consultationBLE.referenceBLE'),
                width: 180,
            },
            {
                code: 'dateCreation',
                libelle: translate('consultationBLE.creationDate'),
                width: 120,
            },
            {
                code: 'dateEmission',
                libelle: translate('consultationBLE.releaseDate'),
                width: 120,
            },
            {
                code: 'dateSortie',
                libelle: translate('consultationBLE.exitDate'),
                width: 120,
            },
            {
                code: 'dateValidation',
                libelle: translate('consultationBLE.validationDate'),
                width: 120,
            },
            {
                code: 'exportateur',
                libelle: translate('consultationBLE.exporter'),
                width: 120,
            },
            {
                code: 'importateur',
                libelle: translate('consultationBLE.importer'),
                width: 120,
            },
            {
                code: 'modeTransport',
                libelle: translate('consultationBLE.transportMode'),
                width: 80,
            },
            {
                code: 'nombreColis',
                libelle: translate('consultationBLE.numberOfPackages'),
                width: 80,
            },
            {
                code: 'numeroDUM',
                libelle: translate('consultationBLE.referenceDUM'),
                width: 150,
            },
            {
                code: 'operateur',
                libelle: translate('consultationBLE.medHubOperator'),
                width: 150,
            },
            {
                code: 'paysDestination',
                libelle: translate('consultationBLE.destinationCountry'),
                width: 80,
            },
            {
                code: 'poidsTotal',
                libelle: translate('consultationBLE.totalWeight'),
                width: 100,
            },
            {
                code: 'valeurTotale',
                libelle: translate('consultationBLE.totalValue'),
                width: 100,
            },
            {
                code: 'etat',
                libelle: translate('consultationBLE.etat'),
                width: 100,
            },
            {
                code: 'matricules',
                libelle: translate('consultationBLE.matricules'),
                width: 150,
            },
        ];
    }

    onItemSelected = (row) => { };

    componentDidMount() { }

    componentDidUpdate() {
        // if (this.props.route.params.first) {
        //     this.refs._badrTable.reset();
        // }
    }

    render() {
        return (
            <View>
                <ComBasicDataTableComp

                    ref="_badrTable"
                    id="ConsBLE"
                    rows={this.props.data}
                    //resultArrayMapping={this.props.data}
                    //data={this.props}
                    cols={this.cols}
                    totalElements={this.props.data.length}
                    maxResultsPerPage={10}
                    paginate={true}
                    showProgress={this.props.showProgress}
                    
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.consultationBLEReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EciConsultationBLEResultScreen);
