import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import styles from '../style/pecEtatChargementStyle';
import { DataTable } from 'react-native-paper';
import translate from "../../../../commons/i18n/ComI18nHelper";
import {
    ComBasicDataTableComp,
} from '../../../../commons/component';

class EtatChargementVersionsBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };

        this.cols = [
            {
                code: 'dateCreation',
                libelle: translate('etatChargement.dateCreation'),
                width: 200,
            },
            {
                code: 'dateEnregistrement',
                libelle: translate('etatChargement.dateEnregistrement'),
                width: 200,
            },
            {
                code: 'dateDepot',
                libelle: translate('etatChargement.dateDepot'),
                width: 200,
            },
            {
                code: 'etat',
                libelle: translate('etatChargement.etat'),
                width: 120,
            },
            {
                code: 'statut',
                libelle: translate('etatChargement.statut'),
                width: 120,
            }, {
                code: 'mode',
                libelle: translate('etatChargement.modeAcquisition'),
                width: 120,
            }
        ];
    }

    onItemSelected = (row) => {

    };



    componentDidMount() {

    }

    componentDidUpdate() {

    }


    componentWillUnmount() {
    }

    reset = () => {
    };

    render() {
        const listVersions = this.props.versions;
        return (
            <View style={[styles.flexDirectionRow, styles.margtb]}>
                {listVersions && (
                    <ComBasicDataTableComp
                        ref="_badrTable"
                        id="articlesTable"
                        rows={listVersions}
                        cols={this.cols}
                        onItemSelected={this.onItemSelected}
                        totalElements={listVersions.length}
                        maxResultsPerPage={10}
                        paginate={true}
                        showProgress={this.props.showProgress}
                        withId={false}
                    />
                )}
            </View>
        );
    }
}

export default EtatChargementVersionsBlock;



