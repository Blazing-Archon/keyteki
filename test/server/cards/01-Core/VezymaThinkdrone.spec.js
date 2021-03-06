describe('Vezyma Thinkdrone', function() {
    integration(function() {
        describe('Vezyma Thinkdrone\'s ability', function() {
            beforeEach(function() {
                this.setupTest({
                    player1: {
                        house: 'mars',
                        hand: ['phloxem-spike', 'ixxyxli-fixfinger', 'brain-stem-antenna'],
                        inPlay: ['gamgee', 'ronnie-wristclocks', 'vezyma-thinkdrone']
                    },
                    player2: {
                        inPlay: []
                    }
                });
            });

            it('should archive a card after reap', function() {
                this.player1.play(this.phloxemSpike);
                expect(this.player1.amber).toBe(1);
                this.player1.playUpgrade(this.brainStemAntenna, this.gamgee);
                expect(this.gamgee.upgrades).toContain(this.brainStemAntenna);
                this.player1.reap(this.vezymaThinkdrone);
                expect(this.player1).toHavePrompt('Choose a card');
                expect(this.player1).toBeAbleToSelect(this.vezymaThinkdrone);
                expect(this.player1).toBeAbleToSelect(this.ronnieWristclocks);
                expect(this.player1).toBeAbleToSelect(this.gamgee);
                this.player1.clickCard(this.ronnieWristclocks);
                expect(this.player1).toHavePrompt('Do you wish to archive a friendly creature or artifact?');
                this.player1.clickPrompt('Yes');
                expect(this.ronnieWristclocks.location).toBe('archives');
                expect(this.vezymaThinkdrone.location).toBe('play area');
                expect(this.gamgee.location).toBe('play area');
                expect(this.player1.amber).toBe(2);
            });

        });
    });
});
