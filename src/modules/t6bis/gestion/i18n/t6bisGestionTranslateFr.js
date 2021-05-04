export default {
    t6bisGestion: {

        title: 'Création une T6BIS',
        tabs: {
            entete: {
                title: 'Entête',
                informationsCommunes: 'de la t6bis en cours',
                bureau: 'Bueau',
                annee: 'Année',
                serie: 'Série',
                type: 'Type',
                statut: 'Statut',
                remplace6bis: 'Remplace T6BIS : ',
                date: {
                    creation: 'Date de création',
                    enregistrement: 'Date d\'enregistement'
                },
                bureauDouane: 'Bureau douane',
                agentDouanier: 'Agent douanier',
                codeAgent: 'Code agent',
                redevable: 'Redevable',
                codeRedevable: 'Code redevable',
                redevableBlock: {
                    title: "Redevable",
                    typeIdentifiant: "Type identifiant",
                    identifiant: "Identifiant",
                    nationalite: "Nationalité",
                    nom: "Nom",
                    prenom: "Prénom",
                    adresse: "Adresse",
                    operateur: "Opérateur",
                    choisirValeur: 'Choisir une valeur',
                },
                buttons: {
                    confirmer: "Confirmer",
                    retablir: "Rétablir"
                },
                informationst6bisBlock: {
                    mtm: {
                        title: "Informations T6BIS (Marchandises et taxe de magasinage)",
                        numeroRecepisse: "Numéro récépissé",
                        immatriculationMoyenTransport: "Immatriculation moyen transport",
                        numeroVol: "Numéro du vol",
                        typeMoyenPaiement: "Type moyen paiement (*)",
                        choisirElement: 'Choisir un élément',
                    },
                    cm: {
                        title: "Informations T6BIS (Cyclomoteur <= 50cc)",
                        numeroRecepisse: "Numéro récépissé",
                        immatriculationMoyenTransport: "Immatriculation moyen transport",
                        typeMoyenPaiement: "Type moyen paiement (*)",
                        choisirElement: 'Choisir un élément',
                    }
                    ,
                    taxeCoordination: {
                        title: "Informations T6BIS (Taxe de coordination)",
                        numeroTriptyque: "Numéro triptyque",
                        valeurObligatoire: "(*) Valeur obligatoire",
                        genre: "Genre",
                        choisirElement: 'choisir un élément',
                        immatriculation: 'Immatriculation',
                        dateEntree: 'Date d\'entrée',
                        dateSortie: 'Date de sortie',
                        poidsTotalEnChargePTC: 'Poids total en charge (PTC)',
                        paysOrigine: 'Pays d\'origine',
                        typeMoyenPaiement: "Type moyen paiement"
                    }
                    ,
                    containteCorps: {
                        title: "Informations T6BIS (Containte par corps)",
                        referenceContainteCorps: "Réference containte par corps",
                        valeurObligatoire: "(*) Valeur obligatoire",
                        choisirElement: 'choisir un élément',
                        typeMoyenPaiement: "Type moyen paiement"
                    }
                    ,
                    affaireChange: {
                        title: "Informations T6BIS (Affaire change)",
                        recepisseSaisie: "Récépissé de saisie",
                        valeurObligatoire: "(*) Valeur obligatoire",
                        descriptifInfraction: "Descriptif infraction",
                        referenceAffaire: "Référence affaire",
                        bureau: "Bureau",
                        annee: "Année",
                        serie: "Série",
                        choisirElement: 'choisir un élément',
                        typeMoyenPaiement: "Type moyen paiement"
                    }
                    ,
                    amendeTransactionnelle: {
                        title: "Informations T6BIS (Amende transactionnelle (autres))",
                        valeurObligatoire: "(*) Valeur obligatoire",
                        descriptifInfraction: "Descriptif infraction",
                        referenceAffaire: "Référence affaire",
                        bureau: "Bureau",
                        annee: "Année",
                        serie: "Série",
                        choisirElement: 'choisir un élément',
                        typeMoyenPaiement: "Type moyen paiement"
                    }
                },
                motivation:'Motivation',
                recapList: {
                    title: 'Recapitulatif taxation',
                    rubrique: 'Code ubrique',
                    designation: 'Designation',
                    montant: 'Montant (DH)',
                    totalTaxationArticle: ' TOTAL T6BIS (DH) :'


                }
            },
            articles: {
                title: "Articles",
                listeArticlesBlock: {
                    title: 'Liste des articles',
                    mtm: {
                        numeroArticle: 'N° article',
                        codeNomenclature: 'Code nomenclature',
                        valeurTaxable: 'Valeur taxable',
                        quantite: 'Quantité',
                        unite: 'Unité',
                        actions: 'Actions'
                    },
                    cm: {
                        marque: 'Marque',
                        cylindree: 'Cylindrée',
                        numeroCadre: 'Numéro cadre',
                        valeurTaxable: 'Valeur taxable',
                        actions: 'Actions'
                    }
                },
                articleBlock: {
                    mtm: {
                        title: 'Article N°',
                        codeNomenclature: 'Code nomenclature',
                        valeurObligatoire: "(*) Valeur obligatoire",
                        natureMarchandise: 'Nature marchandise',
                        choisirElement: 'choisir un élément',
                        designation: 'Designation',
                        valeurTaxable: 'Valeur taxable',
                        montantFacture: 'Montant facturé',
                        devise: 'Devise',
                        quantite: 'Quantité',
                        unite: 'Unité',
                        choisirValeur: 'Choisir une valeur',
                        champsObligatoires: "Champs Obligatoires : "
                    },
                    cm: {
                        title: 'Article N°',
                        marque: 'Marque',
                        valeurObligatoire: "(*) Valeur obligatoire",
                        modele: 'Modele',
                        choisirElement: 'choisir un élément',
                        cylindree: 'Cylindrée',
                        numeroCadre: 'Numéro cadre',
                        numeroImmatriculation: 'Numéro immatriculation',
                        dateMiseCirculation: 'Date 1ère mise en circulation',
                        valeurTaxable: 'Valeur taxable',
                        montantFacture: 'Montant facturé',
                        devise: 'Devise',
                        choisirValeur: 'Choisir une valeur',
                        champsObligatoires: "Champs Obligatoires : "
                    },
                    buttons: {
                        nouveau: "Nouveau",
                        ajouter: "Ajouter",
                        modifier: "Modifier",
                    },
                },
                recapCurrentArticleList: {
                    title: 'Recapitulatif taxation',
                    rubrique: 'Rubrique',
                    designation: 'Designation',
                    montant: 'Montant',
                    totalTaxationArticle: ' Total Taxation Article (DH) :'


                }
            },
            taxation: {
                manuelle: {
                    title: "Taxation manuelle",
                    msgErreurAucunArticle: "Aucun article n'a été sélectionné.",
                    bloc: {
                        title: 'Taxation par article',
                        numArticle: 'Article N° :',
                        codeNomenclature: 'Code NGP :',
                        valeurTaxable: 'Base taxation :',
                    },
                    rubriquesTable: {
                        rubriqueTaxationLibelle: 'Code rubrique',
                        tauxTaxation: 'Taux',
                        montantTaxation: 'Montant taxe',
                    },
                    buttons: {
                        supprimerTout: 'Supprimer tout'
                    },
                    rubriqueBloc: {
                        rubriqueTaxation: 'Rubrique',
                        tauxTaxation: 'Taux',
                        montantTaxation: 'Montant taxe',
                        msgErreurRequired: 'Merci de rensigner tous les champs obligatoires.'
                    }
                },
                globale
                    : {
                    title: "Taxation globale",
                    bloc: {
                        title: 'Taxation globale',
                    },
                    rubriquesTable: {
                        rubriqueTaxationLibelle: 'Code rubrique',
                        montantActuel: 'Montant actuel (*) (DH)'
                    },
                    buttons: {
                        supprimerTout: 'Supprimer tout'
                    },
                    rubriqueBloc: {
                        rubriqueTaxation: 'Rubrique',
                        tauxTaxation: 'Taux',
                        montantTaxation: 'Montant taxe',
                        msgErreurRequired: 'Merci de rensigner tous les champs obligatoires.',
                        msgErreurLineAleadyExist:'La rubrique selectionnée existe déjà dans la liste'
                    }
                },
            },
            informations: "Informations",
            historique: {
                title: "Historique",
                tableauIntervention: {
                    nombreInterventions: "Nombre d'interventions : ",
                    date: "Date",
                    intervention: "Intervention",
                    etatResultat: "Etat résultat",
                    utilisateur: "Utilisateur",
                    commentaire:"Commentaire"
                    
                    
                }
            }
        },
        declarationDejaEnregistree: 'T6bis déja enregistrée.',
        suppression: {
            confirmDialog: {
                info: 'Suppression déclaration T6BIS',
                oui: 'Oui',
                non: 'Non',
                suppressionMessage: 'Voulez-vous supprimer la T6BIS?',
            },
        },
        buttons: {
            enregistrer: 'Enregistrer',
            sauvegarder: 'Sauvegarder',
            supprimer: 'Supprimer',
            quitter: 'Quitter',
        }

    },
};
