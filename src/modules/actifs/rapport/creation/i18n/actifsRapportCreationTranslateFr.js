export default {
  actifsCreation: {
    title: 'Créer rapport de service',
    entete: {
      subtitle: 'Entête',
      enteteTitleLeft: "Date d'enregistrement V0 : ",
      enteteTitleRight: ' N° version : ',
      uniteOrganizationnelle: 'Unité organisationnelle',
      journeeDu: 'Journée du',
      reference: 'Réference',
      NumeroOrder: 'N° ordre de service',
      descriptionOS: 'Description OS',
      dateDebut: 'Date début',
      dateFin: 'Date fin',
      heureDebut: 'Heure début',
      heureFin: 'Heure fin',
      uniteHeure: '(hh:mm)',
      enregister: 'Enregister',
      errors: {
        dateFinRequired: 'Date fin n\'est pas valide ou vide',
        dateDebutFinOrdre: 'Date fin doit être strictement supérieure à la date début'
      }
    },
    detail: {
      subtitle: 'Details',
      choisirCategorie: 'Choisir un élement',
      typesIncidents: 'Types des incidents',
      natureIncidents: 'Nature des incidents',
      autresIncidents: 'Autres incidents',
      descriptionRapport: 'Description du rapport',
      "osAvecSaisies": "OS avec saisies",
      "osAvecIncidents": "OS avec incidents",
      "coiffeInitiePar": "Service coiffé/initié par",
      "officierControle": "Officier de contrôle",
      "chefSubdivision": "Chef de subdivision",
      "chefServiceCoordination": "Chef de service de coordination",
      "nomPrenom": "Nom et prénom",
      "du": "Du",
      "au": "Au",
      "animateurConference": "Animateur de la conférence",
      "qualiteAnimateur": "Qualité de l'animateur",
      "themesRetenus": "Thèmes retenus",
      errors: {
        requiredDescription:
          "Le champ 'Description du rapport' est obligatoire.",
      },
    },
    saisie: {
      createRapportT: 'Saisie',
      moyensTransportS: 'Moyens de transport saisis',
      marchandisesSaisies: 'Marchandises saisies',
      pVSaisi: 'PV de saisie',
      nPV: 'N°PV de Saisie',
      dU: 'Du',
      datePV: 'Date du PV de saisie',
      choix: 'Choix',
      natureMarchandise: 'Nature de marchandise',
      quantity: 'Quantité',
      unityMesure: 'Unité de mesure',
      valeur: 'Valeur (MAD)',
      natureVehicule: 'Nature véhicule',
      libelle: 'Libellé',
      saisie: 'Saisie',
      rapportService: 'Rapport de service',
      autre: 'Autre',
      enregistrer: 'Enregistrer',
      choisirUnite: 'Choisir une unité',
      choisirNature: 'Choisir une nature',
      errors: {
        champObligatoire: 'le champ {{champ}} est obligatoire',
      },
    },
    "avionsPrivees": {
      "title": "Avions privés",
      "typeAvion": "Type d'avion",
      "nomAvion": "Nom d'avion",
      "immatriculation": "Immatriculation",
      "dateAtterissage": "Date d'atterissage",
      "provenance": "Provenance",
      "destination": "Destination",
      "dateDebutCtrl": "Date de début de contrôle",
      "dateFinCtrl": "Date de fin de contrôle",
      champsObligatoires: "Champs Obligatoires : ",
      "navigAerienne": {
        "title": "Navigation aérienne",
        "dateAtterissage": "Date d'atterissage",
        "heureAtterissage": "Heure d'atterissage",
        "motifAtterissage": "Motif d'atterissage",
        "aeroportEntree": "Aéroport d'entrée",
        "portEntree": "Port d'entrée",
        "provenance": "Provenance",
        "villeProvenance": "Ville provenance",
        "aeroportAttache": "Aeroport d'attache",
        "pavillon": "Pavillon",
        "dateDepart": "Date de départ",
        "heureDepart": "Heure de départ",
        "destination": "Destination",
        "villeDestination": "Ville de destination"
      },
      "caracteristiques": {
        "title": "Caractéristiques de l'avion",
        "nomAvion": "Nom d'avion",
        "immatriculation": "Immatriculation",
        "typeAvion": "Type d'avion",
        "couleur": "Couleur",
        "tonnage": "Tonnage",
        "nbPlaces": "Nombre de places",
        "nbMoteurs": "Nombre de moteurs",
        "longueur": "Longeur",
        "profondeur": "Profondeur",
        "numDeclaration": "Numéro déclaration",
        "dateDeclaration": "Date déclaration",
        "delivreePar": "Délivrée par"
      },
      "proprietaires": {
        "title": "Propriétaire",
        "idOuRc": "Identifiant ou RC",
        "nomPrenomOuRS": "Nom complet ou Raison sociale",
        "typePersonne": "Type de personne",
        "personnePhysique": "Personne physique",
        "personneMorale": "Personne morale",
        "adresse": "Adresse",
        "typeIdentifiant": "Type d'identifiant",
        "identifiant": "Identifiant",
        "nomIntervenant": "Nom intervenant",
        "prenomIntervenant": "Prenom intervenant",
        "nationalite": "Nationalité",
        "profession": "Profession",
        "numeroRC": "Numero RC",
        "centreRC": "Centre RC",
        "raisonSociale": "Raison sociale",
        "actions": "Actions",
        msgerrors: {
          typeIdentifiant: 'Type d\'identifiant est une donnée obligatoire !',
          identifiant: 'Identifiant est une donnée obligatoire !',
          nomIntervenant: 'Nom intervenant est une donnée obligatoire !',
          prenomIntervenant: 'Prenom intervenant est une donnée obligatoire !',
          numeroRC: 'Numero RC est une donnée obligatoire !',
          centreRC: 'Centre RC est une donnée obligatoire !',
          raisonSociale: 'Raison sociale est une donnée obligatoire !',
          adresse: 'Adresse est une donnée obligatoire !'
        }
      },
      "intervenants": {
        "title": "Personnes concernées",
        "personneConcernee": "Personne concernée",
        "identifiant": "Identifiant",
        "typeIdentifiant": "Type identifiant",
        "nomIntervenant": "Nom",
        "prenomIntervenant": "Prenom",
        "nationalite": "Nationalité",
        "profession": "Profession",
        "nomPrenom": "Nom complet",
        "adresse": "Adresse",
        "passager": "Passager",
        "equipage": "Membre de l'équipage",
        "actions": "Actions",
        msgerrors: {
          typeIdentifiant: 'Type d\'identifiant est une donnée obligatoire !',
          identifiant: 'Identifiant est une donnée obligatoire !',
          nomIntervenant: 'Nom intervenant est une donnée obligatoire !',
          prenomIntervenant: 'Prenom intervenant est une donnée obligatoire !',
          numeroRC: 'Numero RC est une donnée obligatoire !',
          centreRC: 'Centre RC est une donnée obligatoire !',
          raisonSociale: 'Raison sociale est une donnée obligatoire !',
          adresse: 'Adresse est une donnée obligatoire !'
        }
      },
      "resultatCtrl": {
        "title": "Résultat de contrôle",
        "documentsVerifies": "Documents de bord vérifiés",
        "dateDebutControle": "Date début du contrôle",
        "heureDebutControle": "Heure début du contrôle",
        "dateFinControle": "Date fin du contrôle",
        "heureFinControle": "Heure fin du contrôle",
        "observations": "Observations",
        "resultatControle": "Résultat du contrôle"
      }
    },
    "embarcations": {
      "title": "Embarcations",
      "typeBateau": "Type du bateau",
      "nomBateau": "Nom du bateau",
      "immatriculation": "Immatriculation",
      "dateEntree": "Date d'entrée",
      "provenance": "Provenance",
      "destination": "Destination",
      "dateDebutCtrl": "Date de début de contrôle",
      "dateFinCtrl": "Date de fin de contrôle",
      champsObligatoires: "Champs Obligatoires : ",
      "navigMaritime": {
        "title": "Navigation maritime",
        "dateEntree": "Date d'entrée",
        "heureEntree": "Heure d'entrée",
        "motifAccostage": "Motif d'accostage",
        "portEntree": "Port d'entrée",
        "provenance": "Provenance",
        "villeProvenance": "Ville provenance",
        "portAttache": "Port d'attache",
        "pavillon": "Pavillon",
        "dateDepart": "Date de départ",
        "heureDepart": "Heure de départ",
        "destination": "Destination",
        "villeDestination": "Ville de destination",
        "profondeur": "Profondeur",
        "longueur": "Longueur",
        "numDeclaration": "Numero de déclaration",
        "delivreePar": "Delivrée par",
        "dateDeclaration": "Date de déclaration",
        "msgErrorOrdreDateEntreeDepart": "Date départ doit être supérieure à la date entrée"
      },
      "caracteristiques": {
        "title": "Caractéristiques du bateau",
        "nomBateau": "Nom du bateau",
        "immatriculation": "Immatriculation",
        "typeBateau": "Type du bateau",
        "couleur": "Couleur",
        "tonnage": "Tonnage",
        "nbPlaces": "Nombre de places",
        "nbMoteurs": "Nombre de moteurs",
        "longueur": "Longeur",
        "profondeur": "Profondeur",
        "numDeclaration": "Numéro déclaration",
        "dateDeclaration": "Date déclaration",
        "delivreePar": "Délivrée par"
      },
      "proprietaires": {
        "title": "Propriétaire",
        "idOuRc": "Identifiant ou RC",
        "nomPrenomOuRS": "Nom complet ou Raison sociale",
        "typePersonne": "Type de personne",
        "personnePhysique": "Personne physique",
        "personneMorale": "Personne morale",
        "adresse": "Adresse",
        "typeIdentifiant": "Type d'identifiant",
        "identifiant": "Identifiant",
        "nomIntervenant": "Nom intervenant",
        "prenomIntervenant": "Prenom intervenant",
        "nationalite": "Nationalité",
        "profession": "Profession",
        "numeroRC": "Numero RC",
        "centreRC": "Centre RC",
        "raisonSociale": "Raison sociale",
        "actions": "Actions",
        msgerrors: {
          typeIdentifiant: 'Type d\'identifiant est une donnée obligatoire !',
          identifiant: 'Identifiant est une donnée obligatoire !',
          nomIntervenant: 'Nom intervenant est une donnée obligatoire !',
          prenomIntervenant: 'Prenom intervenant est une donnée obligatoire !',
          numeroRC: 'Numero RC est une donnée obligatoire !',
          centreRC: 'Centre RC est une donnée obligatoire !',
          raisonSociale: 'Raison sociale est une donnée obligatoire !',
          adresse: 'Adresse est une donnée obligatoire !'
        }
      },
      "intervenants": {
        "title": "Personnes concernées",
        "personneConcernee": "Personne concernée",
        "identifiant": "Identifiant",
        "typeIdentifiant": "Type identifiant",
        "nomIntervenant": "Nom",
        "prenomIntervenant": "Prenom",
        "nationalite": "Nationalité",
        "profession": "Profession",
        "nomPrenom": "Nom complet",
        "adresse": "Adresse",
        "passager": "Passager",
        "equipage": "Membre de l'équipage",
        "actions": "Actions",
        msgerrors: {
          typeIdentifiant: 'Type d\'identifiant est une donnée obligatoire !',
          identifiant: 'Identifiant est une donnée obligatoire !',
          nomIntervenant: 'Nom intervenant est une donnée obligatoire !',
          prenomIntervenant: 'Prenom intervenant est une donnée obligatoire !',
          numeroRC: 'Numero RC est une donnée obligatoire !',
          centreRC: 'Centre RC est une donnée obligatoire !',
          raisonSociale: 'Raison sociale est une donnée obligatoire !',
          adresse: 'Adresse est une donnée obligatoire !'
        }

      },
      "resultatCtrl": {
        "title": "Résultat de contrôle",
        "documentsVerifies": "Documents de bord vérifiés",
        "dateDebutControle": "Date début du contrôle",
        "heureDebutControle": "Heure début du contrôle",
        "dateFinControle": "Date fin du contrôle",
        "heureFinControle": "Heure fin du contrôle",
        "observations": "Observations",
        "resultatControle": "Résultat du contrôle",
        "msgErrorOrdreDateDebutFinControle": "Date fin coontôle doit être supérieure à la date fin contrôle"
      }
    },
    "rondesApparitions": {
      "title": "Rondes et Apparitions",
      "dateHeureDebut": "Date et heure début *",
      "dateHeureFin": "Date et heure fin *",
      "dateDebut": "Date début",
      "dateFin": "Date fin",
      "pointsServiceControles": "Points de service contrôlés",
      "resContrRapService": "Résultat du contrôle / Rapport de service",
      "choix": "Choix"
    },
  },
};
