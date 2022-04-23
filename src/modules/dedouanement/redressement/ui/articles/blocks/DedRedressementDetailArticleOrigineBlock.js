import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {Checkbox, TextInput} from 'react-native-paper';
import {getValueByPath} from '../../../utils/DedUtils';
import { primaryColor } from '../../../../../../commons/styles/ComThemeStyle';

export default class DedRedressementDetailArticleOrigineBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issuATPA: this.props.article?.issuATPA,
    }
  }

  componentDidMount() { }

  update() {
    this.setState(previousState => ({
      issuATPA: previousState.issuATPA,

    }), () => {
      this.props.update({
        issuATPA: this.state?.issuATPA,
      });
    });
  };

  render() {
    console.log(this.state);
    return (
      <View style={{flex: 1}}>
        <ComAccordionComp title="Origine" expanded={false}>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Issu ATPA : "
              libelleSize={3}
              children={

                <Checkbox
                  color={primaryColor}
                  disabled={!this.props.edition}
                  status={this.state.issuATPA === "true"
                    ? 'checked'
                    : 'unchecked'
                  }
                  onPress={() => {
                    this.setState({
                      issuATPA: this.state.issuATPA === "true" ? "false" : "true",
                    })
                    this.update();
                  }}
                />
              }
            />
          </DedRedressementRow>
        </ComAccordionComp>
      </View>
    );
  }
}
