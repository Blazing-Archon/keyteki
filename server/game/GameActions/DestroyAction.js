const CardGameAction = require('./CardGameAction');

class DestroyAction extends CardGameAction {
    constructor(propertyFactory, isSacrifice = false) {
        super(propertyFactory);
        this.name = isSacrifice ? 'sacrifice' : 'destroy';
        this.effectMsg = isSacrifice ? 'sacrifice {0}' : 'destroy {0}';
    }

    setDefaultProperties() {
        this.inFight = false;
        this.purge = false;
    }

    setup() {
        this.targetType = ['creature', 'artifact', 'upgrade'];
    }

    canAffect(card, context) {
        return card.location === 'play area' && super.canAffect(card, context);
    }

    checkEventCondition(event) {
        // TODO This is an ugly hack....
        let result = super.checkEventCondition(event);
        if(result) {
            event.card.moribund = true;
        }
        return result;
    }

    getEvent(card, context) {
        let inFight = this.inFight;
        return super.createEvent('onCardDestroyed', { card, context, inFight }, event => {
            context.game.raiseEvent('onCardLeavesPlay', { card: event.card, context: event.context }, event => {
                event.card.owner.moveCard(event.card, this.purge ? 'purged' : 'discard');
            });
        });
    }
}

module.exports = DestroyAction;
