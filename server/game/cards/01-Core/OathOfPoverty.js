const Card = require('../../Card.js');

class OathOfPoverty extends Card {
    setupCardAbilities(ability) {
        this.play({
            effect: 'destroy all their artifacts and gain {1} amber',
            effectArgs: context => context.player.cardsInPlay.filter(card => card.type === 'artifact').length * 2,
            gameAction: [
                ability.actions.gainAmber(context => ({
                    amount: context.player.cardsInPlay.filter(card => card.type === 'artifact').length * 2
                })),
                ability.actions.destroy(context => ({
                    target: context.player.cardsInPlay.filter(card => card.type === 'artifact')
                }))
            ]
        });
    }
}

OathOfPoverty.id = 'oath-of-poverty'; // This is a guess at what the id might be - please check it!!!

module.exports = OathOfPoverty;
