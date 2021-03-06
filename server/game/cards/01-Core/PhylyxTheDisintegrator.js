const Card = require('../../Card.js');

class PhylyxTheDisintegrator extends Card {
    setupCardAbilities(ability) {
        this.action({
            gameAction: ability.actions.loseAmber(context => ({
                amount: context.player.cardsInPlay.filter(card =>
                    card.type === 'creature' && card.hasHouse('mars') && card !== context.source
                ).length
            }))
        });
    }
}

PhylyxTheDisintegrator.id = 'phylyx-the-disintegrator'; // This is a guess at what the id might be - please check it!!!

module.exports = PhylyxTheDisintegrator;
