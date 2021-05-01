import React from 'react';
import { View } from 'react-native';

/**Custom Components */
import { ComBasicDataTableComp, ComGenericDataTableComp } from '../../../../commons/component';
/** REDUX **/
import { connect } from 'react-redux';
import translate from '../../../../commons/i18n/ComI18nHelper';

class EciConsultationBLSResultScreen extends React.Component {
    constructor(props) {
        super(props);

        this.cols = [
            {
                code: 'referenceBulletin',
                libelle: translate('consultationBLS.referenceBLS'),
                width: 180,
            },
            {
                code: 'dateCreation',
                libelle: translate('consultationBLS.creationDate'),
                width: 120,
            },
            {
                code: 'dateEmission',
                libelle: translate('consultationBLS.releaseDate'),
                width: 120,
            },
            {
                code: 'dateSortie',
                libelle: translate('consultationBLS.exitDate'),
                width: 120,
            },
            {
                code: 'dateValidation',
                libelle: translate('consultationBLS.validationDate'),
                width: 120,
            },
            {
                code: 'exportateur',
                libelle: translate('consultationBLS.exporter'),
                width: 120,
            },
            {
                code: 'importateur',
                libelle: translate('consultationBLS.importer'),
                width: 120,
            },
            {
                code: 'modeTransport',
                libelle: translate('consultationBLS.transportMode'),
                width: 80,
            },
            {
                code: 'nombreColis',
                libelle: translate('consultationBLS.numberOfPackages'),
                width: 80,
            },
            {
                code: 'numeroDUM',
                libelle: translate('consultationBLS.referenceDUM'),
                width: 150,
            },
            {
                code: 'operateur',
                libelle: translate('consultationBLS.medHubOperator'),
                width: 150,
            },
            {
                code: 'paysDestination',
                libelle: translate('consultationBLS.destinationCountry'),
                width: 80,
            },
            {
                code: 'poidsTotal',
                libelle: translate('consultationBLS.totalWeight'),
                width: 100,
            },
            {
                code: 'valeurTotale',
                libelle: translate('consultationBLS.totalValue'),
                width: 100,
            },
            {
                code: 'etat',
                libelle: translate('consultationBLS.etat'),
                width: 100,
            },
            {
                code: 'matricules',
                libelle: translate('consultationBLS.matricules'),
                width: 150,
            },
        ];
    }

    onItemSelected = (row) => { };

    componentDidMount() { }

    componentDidUpdate() {
        if (this.props.route.params.first) {
            this.refs._badrTable.reset();
        }
    }

    render() {
        return (
            <View>
                <ComBasicDataTableComp

                    ref="_badrTable"
                    id="ConsBLS"
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
    return { ...state.consultationBLSReducer };
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
)(EciConsultationBLSResultScreen);
