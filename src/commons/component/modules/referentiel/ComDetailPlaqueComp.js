import React from 'react';
import {View} from 'react-native';

import {primaryColor} from '../../../styles/theme';
import {translate} from '../../../i18n/I18nHelper';
import {Caption, Paragraph} from 'react-native-paper';

import ComNumeroPlaqueComp from './ComNumeroPlaqueComp';
import ComNumeroPlaqueRemorqueDiploComp from './ComNumeroPlaqueRemorqueDiploComp';

export default class ComDetailPlaqueComp extends React.Component {
  render() {
    let data = this.props.data;
    if (data) {
      return (
        <View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.typeProprietaire')}
              </Caption>
              <Paragraph>{this.props.data.proprietaireCodeType}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.typeIdentifiant')}
              </Caption>
              <Paragraph>
                {this.props.data.proprietaireCodeTypeDocumentIdentifiant}
              </Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.identifiant')}
              </Caption>
              <Paragraph>
                {this.props.data.proprietaireNumeroIdentifiant}
              </Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.nomRS')}
              </Caption>
              <Paragraph>{this.props.data.proprietaireNom}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.prenom')}
              </Caption>
              <Paragraph>{this.props.data.proprietairePrenom}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.adresse')}
              </Caption>
              <Paragraph>{this.props.data.proprietaireAdresse}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.ville')}
              </Caption>
              <Paragraph>{this.props.data.proprietaireCodeVille}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.nChassis')}
              </Caption>
              <Paragraph>{this.props.data.vehiculeNumChassis}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.nImmNormale')}
              </Caption>
              <Paragraph>
                <ComNumeroPlaqueComp
                  numero={this.props.data.vehiculeNumImmatComplet}
                />
              </Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.nImmDiplomatique')}
              </Caption>
              <Paragraph>
                <ComNumeroPlaqueRemorqueDiploComp
                  numero1={this.props.data.vehiculeNumImmatDiplo1}
                  numero2={this.props.data.vehiculeNumImmatDiplo2}
                />
              </Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque')}
              </Caption>
              <Paragraph>
                {this.props.data.vehiculeCodeTypeImmatDiplo}
              </Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.nImmremorque')}
              </Caption>
              <Paragraph>
                <ComNumeroPlaqueRemorqueDiploComp
                  numero1={this.props.data.vehiculeNumImmatRem1}
                  numero2={this.props.data.vehiculeNumImmatRem2}
                />
              </Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.nImmAntetieur')}
              </Caption>
              <Paragraph>{this.props.data.vehiculeNumImmatAnterieur}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.typeUsage')}
              </Caption>
              <Paragraph>{this.props.data.vehiculeCodeUsage}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.genre')}
              </Caption>
              <Paragraph>{this.props.data.vehiculeCodeGenre}</Paragraph>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.marque')}
              </Caption>
              <Paragraph>{this.props.data.vehiculeCodeMarque}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.TypeVehicule')}
              </Caption>
              <Paragraph>{this.props.data.vehiculeCodeType}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.puissanceFiscale')}
              </Caption>
              <Paragraph>{this.props.data.vehiculePuissanceFiscale}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.TypeCarburant')}
              </Caption>
              <Paragraph>{this.props.data.vehiculeCodeTypeCarburant}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.poidsVide')}
              </Caption>
              <Paragraph>{this.props.data.vehiculePoidsVide}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.poidsCharge')}
              </Caption>
              <Paragraph>{this.props.data.vehiculePoidsCharge}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.dateMiseCirculation')}
              </Caption>
              <Paragraph>
                {this.props.data.vehiculeDatePremiereMiseEnCirc}
              </Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.dateMiseCirculatioM')}
              </Caption>
              <Paragraph>
                {this.props.data.vehiculeDateMiseEnCircAuMaroc}
              </Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.dateMutation')}
              </Caption>
              <Paragraph>{this.props.data.vehiculeDateMutation}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                {translate('components.detailPlaque.dataDepot')}
              </Caption>
              <Paragraph>{this.props.data.vehiculeDateDepot}</Paragraph>
            </View>
          </View>
        </View>
      );
    }
    return <View />;
  }
}

const styles = {
  row: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {width: '50%', padding: 5, justifyContent: 'flex-start'},
  oneColumn: {width: '100%', padding: 5, justifyContent: 'flex-start'},
  caption: {color: primaryColor, fontWeight: 'bold'},
};
