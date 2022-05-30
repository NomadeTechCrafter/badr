import React from 'react';
import { View } from 'react-native';
import { ComAccordionComp, ComBadrButtonComp, ComBasicDataTableComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import { DELETE_AVITAILLEMENTSORTIE_TASK, EDIT_AVITAILLEMENTSORTIE_TASK, FORMAT_DDMMYYYY, RESET_AVITAILLEMENTSORTIE_TASK } from '../../../utils/actifsConstants';
import { formatCustomized } from '../../../utils/actifsUtils';
import styles from '../../style/actifsCreationStyle';






class ActifsRapportCreationAvitaillementEntreeTableBlock extends React.Component {


    constructor(props) {
        super(props);
        let data = {
            "bonLivraison": "Bon de livraison",
            "fournisseur": "Fournisseur",
            "natureProduit": "Nature de produit",
            "quantiteReceptionne": "Quantité réceptionée",
            "volumeApparent": "Volume apparent receptionné",
            "dateHeureReception": "Date heure de réception",}
        this.state = {
        };
      

    }

    onItemSelected = (row) => { };

    updateItem = (row, index) => {
        let data = {
            index: index,
            navigationMaritimeModel: row
        }
        this.props.callbackHandler(EDIT_AVITAILLEMENTSORTIE_TASK, data);

    }
    removeItem = (row, index) => {
        this.props.callbackHandler(DELETE_AVITAILLEMENTSORTIE_TASK, index);


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
        this.props.callbackHandler(RESET_AVITAILLEMENTSORTIE_TASK);
    };



    render() {
        return (
            <View style={{marginLeft : 40}}>
                <ComBasicDataTableComp
                    ref="_badrTable"
                    id="avitaillementEntreesTable"
                    rows={this.props.avitaillementEntrees}
                    cols={(this.props.readOnly) ? this.colsRO : this.cols}
                    onItemSelected={this.onItemSelected}
                    totalElements={this.props.avitaillementEntrees?.length}
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
        );
    }
}






export default ActifsRapportCreationAvitaillementEntreeTableBlock;



