<?php

namespace App\Sherlock;

class SherlockResponse
{

    const responseCode = [

        "00" => "Transaction/opération acceptée", "01" => "Pour les méthodes panToToken et tokenToPan, succès partiel", "02" =>
        "Demande d’autorisation par téléphone à la banque à cause d’un dépassement du plafond d’autorisation sur la carte", "03" =>
        "Contrat commerçant invalide", "05" =>
        "Autorisation refusée", "11" =>
        "Utilisé dans le cas d’un contrôle différé. Le PAN est en opposition", "12" =>
        "Transaction invalide, vérifier les paramètres transférés dans la requête", "14" =>
        "Coordonnées du moyen de paiement invalides (ex : n° de carte ou cryptogramme visuel de la carte) ou vérification AVS échouée", "17" =>
        "Annulation de l’acheteur", "24" =>

        "En réponse d’une opération de gestion de caisse : opération impossible. L’opération que vous souhaitez réaliser n’est pas compatible avec l’état de la transaction ou une autre opération de caisse est en cours sur la transaction au même moment.
    En réponse d’une création de paiement : opération rejetée, requête déjà effectuée avec les mêmes données et les mêmes paramètres
", "25" =>
        "Transaction inconnue de Sherlock’s", "30" =>
        "Erreur de format", "34" =>
        "Suspicion de fraude (seal erroné)", "40" =>
        "Fonction non supportée : l’opération que vous souhaitez réaliser ne fait pas partie de la liste des opérations auxquelles vous êtes autorisés", "51" =>
        "Montant trop élevé", "54" =>
        "Date de validité du moyen de paiement dépassée", "55" =>
        "Cartes prépayées non acceptées", "57" =>
        "Remboursement refusé car la transaction d’origine a fait l’objet d’un impayé", "60" =>
        "Transaction en attente", "62" =>
        "En attente de confirmation pour la transaction (utilisé par PayPal 1.0)", "63" =>
        "Règles de sécurité non respectées, transaction arrêtée", "75" =>
        "Nombre de tentatives de saisie des coordonnées du moyen de paiement sous Sherlock’s Paypage dépassé", "90" =>
        "Service temporairement indisponible", "94" =>
        "Transaction dupliquée : le transactionReference de la transaction est déjà utilisé", "97" =>
        "Session expirée (aucune action de l’utilisateur pendant 15 minutes), transaction refusée", "99" =>
        "Problème temporaire du serveur de paiement"
    ];

    const acquirerResponseCode=[
"00"=>
"Transaction approuvée ou traitée avec succès",
"02"=>
"Contactez l’émetteur du moyen de paiement",
"03"=>
"Accepteur invalide",
"04"=>
"Conservez le support du moyen de paiement",
"05"=>
"Ne pas honorer",
"07"=>
"Conservez le support du moyen de paiement, conditions spéciales",
"08"=>
"Approuvez après l’identification",
"12"=>
"Transaction invalide",
"13"=>
"Montant invalide",
"14"=>
"Coordonnées du moyen de paiement invalides",
"15"=>
"Émetteur du moyen de paiement inconnu",
"17"=>
"Paiement interrompu par l’acheteur",
"20"=>
"Réponse erronée (erreur dans le domaine serveur)",
"24"=>
"Opération impossible",
"25"=>
"Transaction inconnue",
"30"=>
"Erreur de format",
"31"=>
"Id de l’organisation d’acquisition inconnu",
"33"=>
"Moyen de paiement expiré (Paypal / Cofidis)",
"34"=>
"Suspicion de fraude",
"40"=>
"Fonction non supportée",
"41"=>
"Moyen de paiement perdu",
"43"=>
"Moyen de paiement volé",
"51"=>
"Provision insuffisante ou crédit dépassé",
"54"=>
"Moyen de paiement expiré (CB / Visa / MC / WLAcq / BCMC)",
"55"=>
"PIN invalide",
"56"=>
"Moyen de paiement manquant dans le fichier",
"57"=>
"Transaction non autorisée pour ce porteur",
"58"=>
"Transaction interdite au terminal",
"59"=>
"Suspicion de fraude",
"60"=>
"L’accepteur du moyen de paiement doit contacter l’acquéreur",
"61"=>
"Excède le maximum autorisé",
"62"=>
"Transaction en attente de confirmation de paiement",
"63"=>
"Règles de sécurité non respectées",
"65"=>
"Nombre de transactions du jour dépassé",
"68"=>
"Réponse non parvenue ou reçue trop tard",
"75"=>
"Nombre de tentatives de saisie des coordonnées du moyen de paiement dépassé",
"87"=>
"Terminal inconnu",
"90"=>
"Arrêt momentané du système",
"91"=>
"Emetteur du moyen de paiement inaccessible",
"92"=>
"La transaction ne contient pas les informations suffisantes pour être redirigées vers l’organisme d’autorisation",
"94"=>
"Transaction dupliquée",
"96"=>
"Mauvais fonctionnement du système",
"97"=>
"Requête expirée: transaction refusée",
"98"=>
"Serveur inaccessible",
"99"=>
"Incident technique",
"A1"=>
"Transaction refusée pour cause d’absence des données d’authentification 3-D Secure",
"A4"=>
"Transaction refusée pour cause de mauvaise utilisation de l’exemption d’authentification 3-D Secure",
"R1"=>
"Le porteur (ou sa banque) a révoqué les paiements récurrents effectués chez un commerçant",
"R3"=>
"Le porteur (ou sa banque) a révoqué tous les paiements récurrents",

    ];
}
