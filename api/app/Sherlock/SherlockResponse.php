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
}
