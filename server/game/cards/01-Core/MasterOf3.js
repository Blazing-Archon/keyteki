const Card = require('../../Card.js');

class MasterOf3 extends Card {
    setupCardAbilities(ability) {
        this.reap({
            optional: true,
            target: {
                cardType: 'creature',
                cardCondition: card => card.power === 3,
                gameAction: ability.actions.destroy()
            }
        });
    }
}

MasterOf3.id = 'master-of-3'; // This is a guess at what the id might be - please check it!!!

module.exports = MasterOf3;
