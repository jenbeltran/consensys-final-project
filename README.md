# ConsenSys Academy’s 2019 Developer Bootcamp Final Project 

## PLEASE NOTE THAT THIS PROJECT IS NOT COMPLETED.
I was unable to connect my contract and the front-end via web3. You will still be able to walk through the pages but it is not connected to my contract. However, this write-up assumes that this is a fully functioning application.

# Raffle Game
At almost every banquet hall event, there’s a large raffle involved where guests have the opportunity to buy tickets with the chance to win the final cash prize!

This project is designed to first collect Ether from people willing to enter the draw. A person from the pool is then picked at random and deemed the winner. Funds collected from the parties who entered the raffle will then be transferred to the winner’s address.

## Problem
Participating in a raffle requires someone to host the raffle from start to finish. Between the collection of funds at the start of the event and the distribution of the total prize money at the end, there is room of mismanagement of funds and/or untimely distribution at the end of the draw. My project solves the problem of the collection and distribution of funds for the entirety of the raffle draw by storing the funds on the smart contract.

## Solution
Storing funds in the smart contracts reduces the risk of money mismanagement throughout the process.

The smart contract is responsible for:
* Registering the people who wish to enter in the draw
* Collecting all the registrants' fees
* Initializing contracts for the draw
* Distributing funds to the winner at the end of the raffle

There still needs to be a host for a tournament who starts and ends the raffle but storing funds in the smart contract reduces the host’s responsibility of collecting funds and distributing tickets. Since every contract call on the ethereum blockchain requires a payment of gas costs, the host is given a percentage cut to cover total expenditure costs for hosting the tournament. The host’s percentage cut is on the smart contract, thus it cannot be changed at will by the host.

The prize money for the winner of the raffle draw is the total amount collected minus the hosting fee cut. 

## Starting the Application
1) Start Ganache in terminal

`Ganache-cli`

2) Compile and migrate contracts

`Truffle compile`

`Truffle migrate`

3) Test the contracts

`Truffle test`
 
4) Navigate to Clients folder to install node modules and start application

`npm install`

`npm start` 
 
Note: The first account in the Ganache-cli is the owner and the host of the contract. In order to register players for testing purposes, you will have to register them with any other account than the first account listed as the host is not allowed to participate in the raffle draw.
In order to ‘addRaffle’, ‘endSale’, and ‘generateRaffleWinner’, make sure to switch back to the host account before you hit the button. 

## If Application does not start
###### Node
This project was written in React on node version 10.16.0. Make sure to change your node version to 10 before installing node modules.

###### Ganache
This project uses Ganache-cli (port: 8545), please change the port if you are using Ganache GUI (port: 7545).

###### Metamask
If your transactions are rejected, please ensure that you reset your metamask account via Settings ⇒ Advanced ⇒ Reset Account.

