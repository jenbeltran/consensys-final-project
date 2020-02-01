# Preventative Measures
Measures I took to ensure that my contracts are not susceptible to common attack:

## Re-Entrancy Attacks
Regarding my project, external calls from other contracts were used to obtain data for a particular function. In this case, external calls were made to check the owner (via ownable.sol) and to check proper integer values (via SafeMath.sol). The external contracts have no control over my contracts with changing state which mitigates the risk of reentrancy. 


The ‘winnerWithdraw’ function is a potential target of obtaining funds because it withdraws the balance from the contract to the winner. Therefore, the balance is set to zero before funds are transferred so attackers can’t recursively call the withdraw function repeatedly to drain the whole contract before the raffle is completed. Additionally, all state changes are made and the raffle is closed before the balance transfer is triggered.

## Transaction Ordering
The functions within the smart contract have modifiers to prevent re-calling functions that were not meant to be called. This ensures that state is locked according to the order of transactions. 

The contract has 6 functions: addRaffle, searchForRaffle, buyTicket, howManyTicketsHaveIBought, endSale, generateRaffleWinner, winnerWithdraw.

addRaffle - This function starts a new raffle game and keeps track of the owner of the contract. The owner of the contract is considered the host and cannot participate in the raffle. The owner can decide the total number of raffle tickets to sell.

searchForRaffle - Participants can search for an existing raffles that they can enter in based on the raffleId.

buyTicket - The raffle must exist and be active before any participants can buy raffle tickets.

howManyTicketsHaveIBought - The buyers can see how many tickets they bought depending on the raffleId.

endSale -  The host has the sole capability to end the raffle. This function also prevents other participants from joining once the raffle has ended.

generateWinner - The winner can only be randomly generated once the host ends the raffle and submits a random word. Only the host can generate the winner and the winner can only be generated once. Once a winner is generated, the host redeems their fee.

winnerWithdraw - The generated is the only one that can redeem the prize since contracts cannot send money to addresses.  Modifiers have been added to check if the last draw was ended and a winner was generated. The winner can only withdraw funds once and the pool is immediately set to zero.

## Timestamp Dependance
The timestamp function has not been added to my contracts since the block can be manipulated by the miner.

## Integer Overflow and Underflow
The SafeMath library (by OpenZeppelin) was used to prevent integer overflow and underflow. Functions of SafeMath check logic conditions of math operations.

## Denial of Service
To prevent an attacker from inflating the raffle, the max capacity of participants is limited to the number of tickets the host wishes to sell. Additionally, participants can only register if there’s tickets available. Furthermore, no contract calls over an array of undetermined length were made to cut gas costs.

## Tx.Origin
Msg.sender was used throughout the contract over tx.origin for caller authorization. 
 
 
