<?php

namespace App\Services;

use App\Models\Deck;
use App\Models\DeckCard;
use App\Models\PokemonCard;

class DeckValidationService
{
    /**
     * Validate a deck according to Pokémon TCG rules
     */
    public function validateDeck(Deck $deck): array
    {
        $errors = [];
        $warnings = [];
        
        // Get all cards in the deck
        $deckCards = $deck->deckCards()->with('pokemonCard')->get();
        
        // Rule 1: Deck must have exactly 60 cards
        $totalCards = $deckCards->sum('quantity');
        if ($totalCards !== 60) {
            $errors[] = "Deck must contain exactly 60 cards (currently has {$totalCards})";
        }
        
        // Rule 2: Maximum 4 copies of any card (except basic energy)
        $cardCounts = [];
        foreach ($deckCards as $deckCard) {
            $cardId = $deckCard->pokemon_card_id;
            $cardCounts[$cardId] = ($cardCounts[$cardId] ?? 0) + $deckCard->quantity;
            
            // Skip basic energy cards for the 4-card limit rule
            if (!$this->isBasicEnergy($deckCard->pokemonCard) && $cardCounts[$cardId] > 4) {
                $errors[] = "Maximum 4 copies allowed per card ({$deckCard->pokemonCard->name} has {$cardCounts[$cardId]})";
            }
        }
        
        // Rule 3: Must have at least 1 Basic Pokémon
        $basicPokemon = $deckCards->filter(function ($deckCard) {
            return $this->isBasicPokemon($deckCard->pokemonCard);
        })->sum('quantity');
        
        if ($basicPokemon === 0) {
            $errors[] = "Deck must contain at least 1 Basic Pokémon";
        }
        
        // Warnings and suggestions
        if ($basicPokemon > 10) {
            $warnings[] = "Consider reducing Basic Pokémon count (currently {$basicPokemon}) for better consistency";
        }
        
        // Energy balance check
        $energyCards = $deckCards->filter(function ($deckCard) {
            return $this->isEnergy($deckCard->pokemonCard);
        })->sum('quantity');
        
        if ($energyCards < 10) {
            $warnings[] = "Low energy count ({$energyCards}) may cause energy issues during gameplay";
        }
        
        // Trainer card balance
        $trainerCards = $deckCards->filter(function ($deckCard) {
            return $this->isTrainer($deckCard->pokemonCard);
        })->sum('quantity');
        
        if ($trainerCards < 15) {
            $warnings[] = "Low trainer card count ({$trainerCards}) may reduce deck consistency";
        }
        
        return [
            'valid' => empty($errors),
            'errors' => $errors,
            'warnings' => $warnings,
            'statistics' => [
                'total_cards' => $totalCards,
                'basic_pokemon' => $basicPokemon,
                'energy_cards' => $energyCards,
                'trainer_cards' => $trainerCards,
                'pokemon_cards' => $totalCards - $energyCards - $trainerCards,
            ]
        ];
    }
    
    /**
     * Check if a card is a Basic Pokémon
     */
    private function isBasicPokemon(PokemonCard $card): bool
    {
        return $card->supertype === 'Pokémon' && 
               str_contains(strtolower($card->subtypes ?? ''), 'basic');
    }
    
    /**
     * Check if a card is a Basic Energy
     */
    private function isBasicEnergy(PokemonCard $card): bool
    {
        return $card->supertype === 'Energy' && 
               str_contains(strtolower($card->subtypes ?? ''), 'basic');
    }
    
    /**
     * Check if a card is any Energy card
     */
    private function isEnergy(PokemonCard $card): bool
    {
        return $card->supertype === 'Energy';
    }
    
    /**
     * Check if a card is a Trainer
     */
    private function isTrainer(PokemonCard $card): bool
    {
        return $card->supertype === 'Trainer';
    }
    
    /**
     * Get deck type analysis
     */
    public function analyzeDeckType(Deck $deck): array
    {
        $deckCards = $deck->deckCards()->with('pokemonCard')->get();
        
        $pokemonTypes = [];
        $trainerTypes = [];
        
        foreach ($deckCards as $deckCard) {
            $card = $deckCard->pokemonCard;
            
            if ($card->supertype === 'Pokémon') {
                $types = $card->types ?? [];
                foreach ($types as $type) {
                    $pokemonTypes[$type] = ($pokemonTypes[$type] ?? 0) + $deckCard->quantity;
                }
            }
            
            if ($card->supertype === 'Trainer') {
                $subtypes = $card->subtypes ?? [];
                foreach ($subtypes as $subtype) {
                    $trainerTypes[$subtype] = ($trainerTypes[$subtype] ?? 0) + $deckCard->quantity;
                }
            }
        }
        
        arsort($pokemonTypes);
        arsort($trainerTypes);
        
        return [
            'primary_pokemon_type' => array_key_first($pokemonTypes) ?: 'Unknown',
            'pokemon_types' => $pokemonTypes,
            'trainer_types' => $trainerTypes,
            'is_mono_type' => count($pokemonTypes) <= 1,
            'type_count' => count($pokemonTypes),
        ];
    }
}
