import React from 'react';
import { ComAccordionComp } from '../../../../../../commons/component';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import ActifsRapportPersonnesConcerneesSousBlock from './actifsRapportPersonnesConcerneesSousBlock';
import ActifsRapportProprietairesSousBlock from './actifsRapportProprietairesSousBlock';






class ActifsRapportProprietairesPersonnesConcerneesBlock extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            
        };
    }


    updateModelProprietaires = (proprietaires) => {
        this.props.navigationAerienneModel.proprietaires = proprietaires;
        this.props.update(this.props.navigationAerienneModel);


    }
   

    updateModelIntervenant = (intervenants) => {
        this.props.navigationAerienneModel.intervenants = intervenants;
        this.props.update(this.props.navigationAerienneModel);
    }

    static getDerivedStateFromProps(props, state) {

        if (
            props.navigationAerienneModel && props.index !== state.index
        ) {
            return {
                navigationAerienneModel: props.navigationAerienneModel,// update the value of specific key
                index: props.index
            };
        }
        // Return null to indicate no change to state.
        return null;
    }
    

   
    componentDidMount() {
       
    }

    componentDidUpdate() {

    }


    componentWillUnmount() {
    }

    

    render() {
        let proprietaires = (this.props.navigationAerienneModel.proprietaires) ? this.props.navigationAerienneModel.proprietaires : [];
        return (

            <ComAccordionComp title={translate('actifsCreation.avionsPrivees.intervenants.title')} expanded={true}>
                <ActifsRapportProprietairesSousBlock index={this.props.index} proprietaires={proprietaires} readOnly={false} update={this.updateModelProprietaires} readOnly={this.props.readOnly}/>
                <ActifsRapportPersonnesConcerneesSousBlock index={this.props.index} intervenants={this.props.navigationAerienneModel.intervenants} readOnly={false} update={this.updateModelIntervenant} readOnly={this.props.readOnly}/>
                
            </ComAccordionComp>

        );
    }
}






export default ActifsRapportProprietairesPersonnesConcerneesBlock;


