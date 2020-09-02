import React from 'react';
import {View} from 'react-native';

import {primaryColor} from '../../../styles/index';

import {Caption, Paragraph} from 'react-native-paper';

import NumeroPlaque from './numeroPlaque';
import NumeroPlaqueRemorqueDiplo from './numeroPlaqueRemorqueDiplo';

export default class DetailPlaque extends React.Component {
  render() {
    let data = this.props.data;
    if (data) {
      return (
        <View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>Type propriétaire</Caption>
              <Paragraph>{this.props.data.proprietaireCodeType}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>Type identifiant</Caption>
              <Paragraph>
                {this.props.data.proprietaireCodeTypeDocumentIdentifiant}
              </Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>Identifiant</Caption>
              <Paragraph>
                {this.props.data.proprietaireNumeroIdentifiant}
              </Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>Nom ou raison sociale</Caption>
              <Paragraph>{this.props.data.proprietaireNom}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>Prénom</Caption>
              <Paragraph>{this.props.data.proprietairePrenom}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>Adresse</Caption>
              <Paragraph>{this.props.data.proprietaireAdresse}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>Ville</Caption>
              <Paragraph>{this.props.data.proprietaireCodeVille}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>N° chassis</Caption>
              <Paragraph>{this.props.data.vehiculeNumChassis}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                N° Immatriculation normale
              </Caption>
              <Paragraph>
                <NumeroPlaque
                  numero={this.props.data.vehiculeNumImmatComplet}
                />
              </Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                N° Immatriculation diplomatique
              </Caption>
              <Paragraph>
                <NumeroPlaqueRemorqueDiplo
                  numero1={this.props.data.vehiculeNumImmatDiplo1}
                  numero2={this.props.data.vehiculeNumImmatDiplo2}
                />
              </Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>Catégorie diplomatique</Caption>
              <Paragraph>
                {this.props.data.vehiculeCodeTypeImmatDiplo}
              </Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                N° Immatriculation remorque
              </Caption>
              <Paragraph>
                <NumeroPlaqueRemorqueDiplo
                  numero1={this.props.data.vehiculeNumImmatRem1}
                  numero2={this.props.data.vehiculeNumImmatRem2}
                />
              </Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                N° Immatriculation antétieur
              </Caption>
              <Paragraph>{this.props.data.vehiculeNumImmatAnterieur}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>Type usage</Caption>
              <Paragraph>{this.props.data.vehiculeCodeUsage}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>Genre</Caption>
              <Paragraph>{this.props.data.vehiculeCodeGenre}</Paragraph>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>Marque</Caption>
              <Paragraph>{this.props.data.vehiculeCodeMarque}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>Type véhicule</Caption>
              <Paragraph>{this.props.data.vehiculeCodeType}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>Puissance fiscale</Caption>
              <Paragraph>{this.props.data.vehiculePuissanceFiscale}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>Type carburant</Caption>
              <Paragraph>{this.props.data.vehiculeCodeTypeCarburant}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>Poids vide</Caption>
              <Paragraph>{this.props.data.vehiculePoidsVide}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>Poids chargé</Caption>
              <Paragraph>{this.props.data.vehiculePoidsCharge}</Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                Date de la 1ère mise en circulation
              </Caption>
              <Paragraph>
                {this.props.data.vehiculeDatePremiereMiseEnCirc}
              </Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>
                Date de mise en circulation au Maroc
              </Caption>
              <Paragraph>
                {this.props.data.vehiculeDateMiseEnCircAuMaroc}
              </Paragraph>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Caption style={styles.caption}>Date de mutation</Caption>
              <Paragraph>{this.props.data.vehiculeDateMutation}</Paragraph>
            </View>
            <View style={styles.column}>
              <Caption style={styles.caption}>Date de dépot</Caption>
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
