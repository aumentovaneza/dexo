<?php

require_once 'vendor/autoload.php';

use TCGdex\TCGdex;
use Symfony\Component\HttpClient\Psr18Client;
use Nyholm\Psr7\Factory\Psr17Factory;

// Configure PSR implementations for TCGdex
$psr17Factory = new Psr17Factory();
TCGdex::$requestFactory = $psr17Factory;
TCGdex::$responseFactory = $psr17Factory;
TCGdex::$client = new Psr18Client();

// Initialize the SDK with language (defaults to "en")
$tcgdex = new TCGdex('en');

echo "Testing TCGdex API...\n";

try {
    // Test getting a single card
    echo "Getting a single card...\n";
    $card = $tcgdex->card->get('swsh3-136');
    if ($card) {
        echo "Card found: " . $card->name . "\n";
        echo "Card ID: " . $card->id . "\n";
        echo "Illustrator: " . ($card->illustrator ?? 'N/A') . "\n";
    } else {
        echo "No card found\n";
    }
    
    // Test listing cards
    echo "\nListing cards...\n";
    $cards = $tcgdex->card->list();
    if ($cards) {
        echo "Number of cards: " . count($cards) . "\n";
        if (count($cards) > 0) {
            $firstCard = $cards[0];
            echo "First card: " . $firstCard->name . " (ID: " . $firstCard->id . ")\n";
        }
    } else {
        echo "No cards returned\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
