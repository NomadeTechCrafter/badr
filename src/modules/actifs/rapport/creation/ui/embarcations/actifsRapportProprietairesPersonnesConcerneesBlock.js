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
        this.props.navigationMaritimeModel.proprietaires = proprietaires;
        this.props.update(this.props.navigationMaritimeModel);


    }
   

    updateModelIntervenant = (intervenants) => {
        this.props.navigationMaritimeModel.intervenants = intervenants;
        this.props.update(this.props.navigationMaritimeModel);
    }

    static getDerivedStateFromProps(props, state) {

        if (
            props.navigationMaritimeModel && props.index !== state.index
        ) {
            return {
                navigationMaritimeModel: props.navigationMaritimeModel,// update the value of specific key
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
        let proprietaires = (this.props.navigationMaritimeModel.proprietaires) ? this.props.navigationMaritimeModel.proprietaires : [];

        console.log('29052022' + JSON.stringify(this.props.navigationMaritimeModel));
        return (

            <ComAccordionComp title={translate('actifsCreation.embarcations.intervenants.title')} expanded={true}>
                <ActifsRapportProprietairesSousBlock index={this.props.index} proprietaires={proprietaires} readOnly={false} update={this.updateModelProprietaires} readOnly={this.props.readOnly}/>
                <ActifsRapportPersonnesConcerneesSousBlock index={this.props.index} intervenants={this.props.navigationMaritimeModel.intervenants} readOnly={false} update={this.updateModelIntervenant} readOnly={this.props.readOnly}/>
                
            </ComAccordionComp>

        );
    }
}






export default ActifsRapportProprietairesPersonnesConcerneesBlock;


