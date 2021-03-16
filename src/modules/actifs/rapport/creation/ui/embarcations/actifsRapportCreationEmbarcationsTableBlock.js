import React from 'react';
import { View } from 'react-native';
import { ComAccordionComp, ComBadrButtonComp, ComBasicDataTableComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import { DELETE_EMBARCATION_TASK, EDIT_EMBARCATION_TASK, FORMAT_DDMMYYYY, RESET_EMBARCATION_TASK } from '../../../utils/actifsConstants';
import { formatCustomized } from '../../../utils/actifsUtils';
import styles from '../../style/actifsCreationStyle';






class ActifsRapportCreationEmbarcationsTableBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
        this.cols = [
            {
                code: 'nomBateau',
                libelle: translate('actifsCreation.embarcations.typeBateau'),
                width: 100,
            },
            {
                code: 'immatriculation',
                libelle: translate('actifsCreation.embarcations.immatriculation'),
                width: 100,
            },
            {
                code: 'dateEntree',
                libelle: translate('actifsCreation.embarcations.dateEntree'),
                width: 100,
                render: (row) => {
                    return formatCustomized(row.dateEntree, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'provenance.nomPays',
                libelle: translate('actifsCreation.embarcations.provenance'),
                width: 100,
            },
            {
                code: 'destination.nomPays',
                libelle: translate('actifsCreation.embarcations.destination'),
                width: 100,
            },
            {
                code: 'dateDebutControle',
                libelle: translate('actifsCreation.embarcations.dateDebutCtrl'),
                width: 150,
                render: (row) => {
                    return formatCustomized(row.dateDebutControle, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'dateFinControle',
                libelle: translate('actifsCreation.embarcations.dateFinCtrl'),
                width: 150,
                render: (row) => {
                    return formatCustomized(row.dateFinControle, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'resultatControle',
                libelle: translate('actifsCreation.embarcations.resultatCtrl.title'),
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
                code: 'typeBateau',
                libelle: translate('actifsCreation.embarcations.typeBateau'),
                width: 100,
            },
            {
                code: 'nomBateau',
                libelle: translate('actifsCreation.embarcations.nomBateau'),
                width: 100,
            },
            {
                code: 'immatriculation',
                libelle: translate('actifsCreation.embarcations.immatriculation'),
                width: 100,
            },
            {
                code: 'dateEntree',
                libelle: translate('actifsCreation.embarcations.dateEntree'),
                width: 100,
                render: (row) => {
                    return formatCustomized(row.dateEntree, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'provenance.nomPays',
                libelle: translate('actifsCreation.embarcations.provenance'),
                width: 100,
            },
            {
                code: 'destination.nomPays',
                libelle: translate('actifsCreation.embarcations.destination'),
                width: 100,
            },
            {
                code: 'dateDebutControle',
                libelle: translate('actifsCreation.embarcations.dateDebutCtrl'),
                width: 150,
                render: (row) => {
                    return formatCustomized(row.dateDebutControle, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'dateFinControle',
                libelle: translate('actifsCreation.embarcations.dateFinCtrl'),
                width: 150,
                render: (row) => {
                    return formatCustomized(row.dateFinControle, FORMAT_DDMMYYYY);
                }
            },
            {
                code: 'resultatControle',
                libelle: translate('actifsCreation.embarcations.resultatCtrl.title'),
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
        console.log('updateItem row : ', row);
        console.log('updateItem index : ', index);
        let data = {
            index: index,
            navigationMaritimeModel: row
        }
        this.props.callbackHandler(EDIT_EMBARCATION_TASK, data);

    }
    removeItem = (row, index) => {
        console.log('removeItem row : ', row);
        console.log('removeItem index : ', index);
        this.props.callbackHandler(DELETE_EMBARCATION_TASK, index);


    }

    componentDidMount() {
        console.log('ActifsRapportCreationEmbarcationsTableBlock componentDidMount     ', this.props.readOnly);

    }

    componentDidUpdate() {

        console.log('ActifsRapportCreationEmbarcationsTableBlock componentDidUpdate');
    }


    componentWillUnmount() {
        console.log('ActifsRapportCreationEmbarcationsTableBlock componentWillUnmount');
    }



    reset = () => {
        console.log('ActifsRapportCreationEmbarcationsTableBlock reset');
    };

    nouveau = () => {
        this.props.callbackHandler(RESET_EMBARCATION_TASK);
    };



    render() {
        console.log("ActifsRapportCreationEmbarcationsTableBlock this.props", this.props);
        return (

            <ComAccordionComp title={translate('actifsCreation.embarcations.title')} expanded={true}>
                <View>
                    <ComBasicDataTableComp
                        ref="_badrTable"
                        id="navigationsMaritimesTable"
                        rows={this.props.navigationsMaritimes}
                        cols={(this.props.readOnly) ? this.colsRO : this.cols}
                        onItemSelected={this.onItemSelected}
                        totalElements={this.props.navigationsMaritimes?.length}
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






export default ActifsRapportCreationEmbarcationsTableBlock;



