import React from 'react';
import { View } from 'react-native';
import { ComAccordionComp, ComBadrButtonComp, ComBasicDataTableComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import { DELETE_AVION_PRIVEE_TASK, EDIT_AVION_PRIVEE_TASK, FORMAT_DDMMYYYY, RESET_AVION_PRIVEE_TASK } from '../../../utils/actifsConstants';
import { formatCustomized } from '../../../utils/actifsUtils';
import styles from '../../style/actifsCreationStyle';






class ActifsRapportCreationAvionsPriveesTableBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
        this.cols = [
            {
                code: 'typeAvion',
                libelle: translate('actifsCreation.avionsPrivees.typeAvion'),
                width: 100,
            },
            {
                code: 'nomAvion',
                libelle: translate('actifsCreation.avionsPrivees.nomAvion'),
                width: 100,
            },
            {
                code: 'immatriculation',
                libelle: translate('actifsCreation.avionsPrivees.immatriculation'),
                width: 100,
            },
            {
                code: 'dateAtterissage',
                libelle: translate('actifsCreation.avionsPrivees.dateAtterissage'),
                width: 100,
                render: (row) => {
                    return formatCustomized(row.dateAtterissage, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'provenance.nomPays',
                libelle: translate('actifsCreation.avionsPrivees.provenance'),
                width: 100,
            },
            {
                code: 'destination.nomPays',
                libelle: translate('actifsCreation.avionsPrivees.destination'),
                width: 100,
            },
            {
                code: 'dateDebutControle',
                libelle: translate('actifsCreation.avionsPrivees.dateDebutCtrl'),
                width: 150,
                render: (row) => {
                    return formatCustomized(row.dateDebutControle, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'dateFinControle',
                libelle: translate('actifsCreation.avionsPrivees.dateFinCtrl'),
                width: 150,
                render: (row) => {
                    return formatCustomized(row.dateFinControle, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'resultatControle',
                libelle: translate('actifsCreation.avionsPrivees.resultatCtrl.title'),
                width: 110,
            }, {
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'pencil',
                action: (row, index) =>
                    this.updateItem(row, index)
            },
            {
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'delete-outline',
                action: (row, index) =>
                    this.removeItem(row, index)
            }


        ];

        this.colsRO = [
            {
                code: 'typeAvion',
                libelle: translate('actifsCreation.avionsPrivees.typeAvion'),
                width: 100,
            },
            {
                code: 'nomAvion',
                libelle: translate('actifsCreation.avionsPrivees.nomAvion'),
                width: 100,
            },
            {
                code: 'immatriculation',
                libelle: translate('actifsCreation.avionsPrivees.immatriculation'),
                width: 100,
            },
            {
                code: 'dateAtterissage',
                libelle: translate('actifsCreation.avionsPrivees.dateAtterissage'),
                width: 100,
                render: (row) => {
                    return formatCustomized(row.dateAtterissage, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'provenance.nomPays',
                libelle: translate('actifsCreation.avionsPrivees.provenance'),
                width: 100,
            },
            {
                code: 'destination.nomPays',
                libelle: translate('actifsCreation.avionsPrivees.destination'),
                width: 100,
            },
            {
                code: 'dateDebutControle',
                libelle: translate('actifsCreation.avionsPrivees.dateDebutCtrl'),
                width: 150,
                render: (row) => {
                    return formatCustomized(row.dateDebutControle, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'dateFinControle',
                libelle: translate('actifsCreation.avionsPrivees.dateFinCtrl'),
                width: 150,
                render: (row) => {
                    return formatCustomized(row.dateFinControle, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'resultatControle',
                libelle: translate('actifsCreation.avionsPrivees.resultatCtrl.title'),
                width: 110,
            }, {
                code: '',
                libelle: '',
                width: 50,
                component: 'button',
                icon: 'eye',
                action: (row, index) => {
                    this.updateItem(row);
                },
            }


        ];

    }




    onItemSelected = (row) => { };

    updateItem = (row, index) => {
        let data = {
            index: index,
            navigationAerienneModel: row
        }
        this.props.callbackHandler(EDIT_AVION_PRIVEE_TASK, data);

    }
    removeItem = (row, index) => {
        this.props.callbackHandler(DELETE_AVION_PRIVEE_TASK, index);


    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }


    componentWillUnmount() {
    }



    reset = () => {
    };

    nouveau = () => {
        this.props.callbackHandler(RESET_AVION_PRIVEE_TASK);
    };



    render() {
        return (

            <ComAccordionComp title={translate('actifsCreation.avionsPrivees.title')} expanded={true}>
                <View>
                    <ComBasicDataTableComp
                        // ref="_badrTable"
                        id="navigationsAeriennesTable"
                        rows={this.props.navigationsAeriennes}
                        cols={(this.props.readOnly) ? this.colsRO : this.cols}
                        onItemSelected={this.onItemSelected}
                        totalElements={this.props.navigationsAeriennes?.length}
                        maxResultsPerPage={10}
                        paginate={true}
                        showProgress={this.props.showProgress}
                        hasId={false}
                    />
                    {(!this.props.readOnly) && (<View style={styles.ComContainerCompBtn}>
                        <ComBadrButtonComp
                            style={styles.actionBtn}
                            onPress={() => {
                                this.nouveau();
                            }}
                            text={translate('transverse.nouveau')}
                        />
                    </View>)}
                </View>
            </ComAccordionComp>

        );
    }
}






export default ActifsRapportCreationAvionsPriveesTableBlock;



