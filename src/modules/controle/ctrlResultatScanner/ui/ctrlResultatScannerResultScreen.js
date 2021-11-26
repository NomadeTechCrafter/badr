import React from 'react';
import { View } from 'react-native';

/**Custom Components */
import { ComBasicDataTableComp} from '../../../../commons/component';
/** REDUX **/
import { connect } from 'react-redux';
import translate from '../../../../commons/i18n/ComI18nHelper';

class CtrlResultatScannerResultScreen extends React.Component {
    constructor(props) {
        super(props);

        this.cols = [
            {
                code: 'idScan',
                libelle: translate('resultatScanner.idScan'),
                width: 150,
            },
            {
                code: 'numAmp',
                libelle: translate('resultatScanner.numAmp'),
                width: 150,
            },
            {
                code: 'reference',
                libelle: translate('resultatScanner.reference'),
                width: 180,
            },
            {
                code: 'type',
                libelle: translate('resultatScanner.type'),
                width: 100,
            },
            {
                code: 'oldIdScan',
                libelle: translate('resultatScanner.oldIdScan'),
                width: 150,
            },
            {
                code: 'dateScannage',
                libelle: translate('resultatScanner.dateScannage'),
                width: 150,
            },
            {
                code: 'agent',
                libelle: translate('resultatScanner.agent'),
                width: 120,
            },
            {
                code: 'resultat',
                libelle: translate('resultatScanner.resultat'),
                width: 120,
            },
            {
                code: 'commentaire',
                libelle: translate('resultatScanner.commentaire'),
                width: 200,
            },
            {
                code: 'dateCreation',
                libelle: translate('resultatScanner.dateCreation'),
                width: 150,
            },
            {
                code: 'matricules',
                libelle: translate('resultatScanner.matricules'),
                width: 200,
            }
        ];
    }

    render() {
        return (
            <View>
                <ComBasicDataTableComp
                    ref="_badrTable"
                    id="resultatScanner"
                    rows={this.props?.data}
                    cols={this.cols}
                    totalElements={this.props?.data?.length}
                    maxResultsPerPage={10}
                    paginate={true}
                    showProgress={this.props.showProgress}

                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.resultatScannerReducer };
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
)(CtrlResultatScannerResultScreen);
