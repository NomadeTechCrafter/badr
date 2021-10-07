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
                width: 180,
            },
            {
                code: 'dateEmission',
                libelle: translate('consultationBLE.releaseDate'),
                width: 180,
            },
            {
                code: 'dateSortie',
                libelle: translate('consultationBLE.exitDate'),
                width: 180,
            },
            {
                code: 'dateValidation',
                libelle: translate('consultationBLE.validationDate'),
                width: 180,
            },
            {
                code: 'exportateur',
                libelle: translate('consultationBLE.exporter'),
                width: 200,
            },
            {
                code: 'importateur',
                libelle: translate('consultationBLE.importer'),
                width: 200,
            },
            {
                code: 'modeTransport',
                libelle: translate('consultationBLE.transportMode'),
                width: 150,
            },
            {
                code: 'nombreColis',
                libelle: translate('consultationBLE.numberOfPackages'),
                width: 150,
            },
            {
                code: 'numeroDUM',
                libelle: translate('consultationBLE.referenceDUM'),
                width: 200,
            },
            {
                code: 'operateur',
                libelle: translate('consultationBLE.medHubOperator'),
                width: 200,
            },
            {
                code: 'paysProvenance',
                libelle: translate('consultationBLE.destinationCountry'),
                width: 150,
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
                width: 180,
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
