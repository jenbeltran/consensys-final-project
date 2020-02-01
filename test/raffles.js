const Raffles = artifacts.require('./Raffles.sol');
let catchRevert = require('./exceptionsHelpers.js').catchRevert;

contract('Raffles', function(accounts) {
	const deployAccount = accounts[0];
	const firstAccount = accounts[3];
	const secondAccount = accounts[4];

	const ticketPrice = 100;

	const raffle1 = {
		name         : 'raffle 1 name',
		totalTickets : 100,
		ticketsSold  : 0,
		isOpen       : true,
		winner       : 0,
		pool         : 0
	};

	beforeEach(async () => {
		instance = await Raffles.new();
	});

	describe('Contract Setup', async () => {
		it('OWNER should be set to the deploying address', async () => {
			const owner = await instance.owner();
			assert.equal(owner, deployAccount, 'the deploying address should be the owner');
		});
	});

	describe('addRaffle()', async () => {
		it('only the owner should be able to add a raffle', async () => {
			await instance.addRaffle(raffle1.name, raffle1.totalTickets, {
				from : deployAccount
			});
			await catchRevert(instance.addRaffle(raffle1.name, raffle1.totalTickets, { from: firstAccount }));
		});
	});

	describe('searchForRaffle()', async () => {
		it('providing the raffle Id should return the correct raffle details', async () => {
			await instance.addRaffle(raffle1.name, raffle1.totalTickets, {
				from : deployAccount
			});
			const raffleDetails = await instance.searchForRaffle(0);

			assert.equal(raffleDetails['0'], raffle1.name, 'the raffle names should match');
			assert.equal(
				raffleDetails['1'].toString(10),
				raffle1.totalTickets.toString(10),
				'the same number of tickets should be available'
			);
			assert.equal(raffleDetails['2'], 0, 'the ticket sales should be 0');
			assert.equal(raffleDetails['3'], true, 'the raffle should be open');
			assert.equal(raffleDetails['4'], 0, 'there is no winner');
			assert.equal(raffleDetails['5'], 0, 'there is no money received');
		});
	});

	describe('buyTicket()', async () => {
		it('tickets should only be able to be purchased when the raffle is open', async () => {
			const numberOfTickets = 1;

			// raffle w/ id 1 does not exist, therefore not open
			await catchRevert(instance.buyTicket(1, numberOfTickets, { from: firstAccount, value: ticketPrice }));

			await instance.addRaffle(raffle1.name, raffle1.totalTickets, { from: deployAccount });
			await instance.buyTicket(0, numberOfTickets, { from: firstAccount, value: ticketPrice });
		});
		it('tickets should only be able to be purchased when enough value is sent with the transaction', async () => {
			const numberOfTickets = 1;
			await instance.addRaffle(raffle1.name, raffle1.totalTickets, { from: deployAccount });
			await catchRevert(instance.buyTicket(0, numberOfTickets, { from: firstAccount, value: ticketPrice - 1 }));
		});
	});

	describe('howManyTicketsHaveIBought()', async () => {
		it('providing a raffle id to howManyTicketsHaveIBought() should tell an account how many tickets they have purchased', async () => {
			const numberToPurchase = 3;

			await instance.addRaffle(raffle1.name, raffle1.totalTickets, { from: deployAccount });
			await instance.buyTicket(0, numberToPurchase, {
				from  : secondAccount,
				value : ticketPrice * numberToPurchase
			});
			let result = await instance.howManyTicketsHaveIBought(0, { from: secondAccount });

			assert.equal(
				result,
				numberToPurchase,
				'howManyTicketsHaveIBought() should return the number of tickets the msg.sender has purchased.'
			);
		});
	});

	describe('endSale()', async () => {
		it('only the owner should be able to end the sale and mark it as closed', async () => {
			await instance.addRaffle(raffle1.name, raffle1.totalTickets, { from: deployAccount });
			await catchRevert(instance.endSale(0, { from: firstAccount }));
			await instance.endSale(0, { from: deployAccount });
			const raffleData = await instance.searchForRaffle(0);

			assert.equal(raffleData['3'], false, 'The raffle isOpen variable should be marked false.');
		});
	});
});
