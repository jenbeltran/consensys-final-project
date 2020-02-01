# Design Patterns Used

The following design patterns I chose are:

## Fail Early and Fail Loud
All of the functions in the smart contract have modifiers that check the validity of the user before running. These modifiers ensure to fail the code as soon as possible.

For example:
* onlyOwner - This modifier checks if the user is the host/owner of the game. Only the host can end the raffle, generate a random winner, and send the funds to the winner.

Before each function ran, I included multiple ‘require’ statements to ensure all possible scenarios have been included.

For example the function buyTicket() ensures the following: 
* The owner cannot participate in the raffle to ensure that the host has fair intentions
* Users can only buy tickets if the raffle exists
* Users can only buy raffle tickets if the raffle isOpen and active
* Users can only buy tickets if there’s sufficient inventory
 
## Restricting Access
I have restricted function access so that only the owner/host of the raffle are permitted to execute the majority of the functions. For example, only the host can end the raffle and generate a random winner. Additionally, the generated random winner is the only one able to redeem the proceeds since a contract cannot send funds to an address. 

## Pull Over Push Payments (Withdrawal Pattern)
The calls are made internally when the funds are distributed to the host and the winner as the contract stores the host and participant addresses.

Also, in order for the funds to be transferred, the host must endRaffleRegistration to prevent any future raffle registrations before they can generate a random winner. Therefore, attackers cannot register once the host has closed registration. 

Additionally, generateWinner and winnerWithdraw are two different functions for security to ensure that the host collects their fees before the winner can redeem the remainder.  Once the winner is generated, the host collects their fee and can complete their in-person verification of the correct ticket holder. For example, if this was a company event raffle, the host would announce the winner on stage and the winner can redeem the funds from the contract.

## Circuit Breaker
Due to the lack of time, the circuit breaker was not implemented.
But if it was, I would have had the circuit breaker contract set up to block the following functions in case of emergency: addRaffle, buyTicket. If there is a bug detected the owner/host will not be able to start a new raffle and new users will not be able to register for raffles. However, the owner can still end the raffle registration, generate a winner and send money in order to end the raffle.

## State Machine
The raffle smart contract has several state variables that are updated based on the function being called. For example, the buyTicket function updates the number of tickets bought and the total amount of money collected. Once the addRaffle function is called, new raffle contracts are created and stored in the raffles mapping. 

Furthermore, I have added two double mappings: one to track the number of tickets a buyer bought based on the addresses contained in a certain raffleId and another one to track the ticket ownership based on the tickets contained within a certain raffleId. 

Additionally, the host is unable to generate a winner unless they end the raffle registration.



Below are the following design patterns I didn’t choose:

## Auto Deprecation
There is no time limit as to how long a host wants to keep a raffle. If this project were to scale, the hosts would be able to set their own fee for each ticket bought (10wei is the set max for this project) and the raffles can take days or months before a winner is announced (this is for large raffles with bigger prizes, such as a monthly charity raffle held between employees in a company).

Although this project overall can be argued as ‘beta testing’ for my smart contracts, I have forgoed this due to time limitations for project completion.

## Mortal
I wanted all raffle information to stay on the blockchain as I envisioned this raffle project to scale and apply to larger charity raffles. Larger company charity raffles often involve audit inspections for tax credit purposes (in North America at least) so I did not add any self-destruct aspect to keep all records on the blockchain.

## Speed Bump
Speed bumps have not been added since all functions except for buyTicket and winnerWithdraw can only be accessed by the owner/host. Additionally, the owner/host cannot participate in the contract to ensure fairness of the raffle. Furthermore, the host must provide a word which is keccak and abi encoded to increase randomness. Therefore the risk of funds leaving the contract is if the host/owner is malicious and attempts to tamper with the production of the randomized winner from the pool. In this case, it is the participant’s responsibility to only participate in raffles from a host they trust. 


