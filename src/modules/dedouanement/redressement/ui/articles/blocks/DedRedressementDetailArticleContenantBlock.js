import React from 'react';
import { View } from 'react-native';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import { TextInput } from 'react-native-paper';

export default class DedRedressementDetailArticleContenantBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreContenants: this.props.article?.nombreContenants,
      marquesContenants: this.props.article?.marquesContenants,
      typeContenant: this.props.article?.typeContenant,
      typeContenantLibelle: this.props.article?.typeContenantLibelle,
    }
  }

  componentDidMount() {
  }

  update(selectedContenant) {
    this.setState(previousState => ({
      nombreContenants: previousState.nombreContenants,
      marquesContenants: previousState.marquesContenants,
    }), () => {
      this.props.update({
        nombreContenants: this.state?.nombreContenants,
        marquesContenants: this.state?.marquesContenants,
        typeContenant: selectedContenant ? selectedContenant?.codeTypeContenant : this.state?.typeContenant,
        typeContenantLibelle: selectedContenant ? selectedContenant?.intitule : this.state?.typeContenantLibelle
      });
      if (selectedContenant?.intitule?.toLowerCase()?.includes('vrac')) {
        this.props.update({
          nombreContenants: '',
          marquesContenants: '',
          typeContenant: selectedContenant?.codeTypeContenant,
          typeContenantLibelle: selectedContenant?.intitule
        });
      }
    });
  }


  handleLieuChargementChanged = (selectedContenant) => {
    if (selectedContenant?.intitule?.toLowerCase()?.includes('vrac')) {
      this.setState({
        nombreContenants: '',
        marquesContenants: '',
        typeContenant: selectedContenant?.codeTypeContenant,
        typeContenantLibelle: selectedContenant?.intitule
      });
    } else {
      this.setState({
        nombreContenants: this.state?.nombreContenants,
        marquesContenants: this.state?.marquesContenants,
        typeContenant: selectedContenant?.codeTypeContenant,
        typeContenantLibelle: selectedContenant?.intitule
      });
    }
    this.update(selectedContenant);
  };

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  fillStateByProps = () => {
    this.setState({
      nombreContenants: this.props.article?.nombreContenants,
      marquesContenants: this.props.article?.marquesContenants,
      typeContenant: this.props.article?.typeContenant,
      typeContenantLibelle: this.props.article?.typeContenantLibelle
    });
  };


  render() {
    return (
      <View style={{ flex: 1 }}>
        <ComAccordionComp title="Contenant" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Nature : "
              libelleSize={1}
              children={
                <ComBadrAutoCompleteChipsComp
                  code="codeTypeContenant"
                  disabled={!this.props.edition}
                  selected={this.state?.typeContenantLibelle}
                  maxItems={3}
                  libelle="intitule"
                  command="getCmbTypeContenant"
                  paramName="libelleTypeContenant"
                  onDemand={true}
                  searchZoneFirst={false}
                  onValueChange={this.handleLieuChargementChanged}
                />
              }
            />
            <ComBadrKeyValueComp
              libelle="Nombre : "
              libelleSize={3}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={!this.props.edition || (this.state?.typeContenantLibelle?.toLowerCase()?.includes('vrac'))}
                  keyboardType={'number-pad'}
                  value={this.state?.nombreContenants}
                  onChangeText={(text) => {
                    this.setState({
                      nombreContenants: text
                    })
                    this.update();
                  }
                  }
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Marque"
              libelleSize={1}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={!this.props.edition || (this.state?.typeContenantLibelle?.toLowerCase()?.includes('vrac'))}
                  value={this.state?.marquesContenants}
                  onChangeText={(text) => {
                    this.setState({
                      marquesContenants: text
                    })
                    this.update();
                  }
                  }
                />
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}
