pragma solidity ^0.5.0;

/// @title The Raffles contract keeps track of the details and ticket sales of multiple raffles.

import "./Ownable.sol";
import "./SafeMath.sol";

contract Raffles is Ownable {
    using SafeMath for uint256;
    uint256 public PRICE_TICKET;
    // Created a variable to keep track of the raffle ID numbers.
    uint256 public raffleId; //number of raffles
    uint256 public fee;

    /*
        Defined a Raffle struct
        @param  - This struct has 5 fields: name, totalTickets, ticketsSold, buyers, and isOpen.
        @notice - The "buyers" field should keep track of addresses and how many tickets each buyer purchases.
    */
    struct Raffle {
        string name;
        uint256 totalTickets;
        uint256 ticketsSold;
        bool isOpen;
        address winner;
        uint256 pool;
    }

    /*
      @notice - Created a mapping to keep track of the raffles.
        The mapping key is an integer, the value is a Raffle struct.
        Called the mapping "raffles".
    */
    mapping(uint256 => Raffle) private raffles;

    /*
      @notice -  Created a double mapping to keep track of the number of tickets a buyer bought.
        This maps the raffleID --> List of addresses --> uint numberOfTicketsBought
    */
    //raffle id -> list of addresses --> numberOfTicketsBought
    mapping(uint256 => mapping(address => uint256)) private numTicketsBought; //how many tickets has a person bought

    //raffle id -> list of tickets -> buyer address of ticket
    mapping(uint256 => mapping(uint256 => address)) public ticketOwnerInfo;

    event LogRaffleAdded(
        string name,
        uint256 ticketsAvailable,
        uint256 raffleId
    );
    event LogBuyTickets(address buyer, uint256 raffleId, uint256 numTickets);
    event LogRaffleClosed(
        string name,
        uint256 ticketsAvailable,
        uint256 raffleId
    );
    event LogGenerateRaffleWinner(uint256 _raffleId, address _winner);
    event LogSendPrize(address buyer, uint256 balance, uint256 eventId);

    constructor() public {
        raffleId = 0;
        PRICE_TICKET = 100;
        fee = 10;
    }

    /*
        addRaffle()
       @param -  This function takes 1 parameter, a name
       @dev -  Only the contract owner should be able to call this function.
        In the function:
            - Sets the name in a new event.
            - sets the raffle to open
            - sets an raffle ID
            - increment the ID
            - emit the appropriate event
        @return - return the raffle's ID
    */

    function addRaffle(string memory _name, uint256 _numTickets)
        public
        onlyOwner
        returns (uint256)
    {
        Raffle memory newRaffle = Raffle(
            _name,
            _numTickets,
            0,
            true,
            address(0),
            0
        );
        raffles[raffleId] = newRaffle;
        emit LogRaffleAdded(_name, newRaffle.totalTickets, raffleId);
        raffleId++;
        return raffleId - 1;
    }

    /*
        searchForRaffle()
       @param -  This function takes one parameter, the raffle ID.
       @return  -  The function returns information about the event this order:
            1. name
            2. tickets available
            3. ticketsSold
            4. isOpen
    */
    function searchForRaffle(uint256 _raffleId)
        public
        view
        returns (
            string memory name,
            uint256 totalTickets,
            uint256 ticketsSold,
            bool isOpen,
            address _winner,
            uint256 _pool
        )
    {
        if (_raffleId + 1 > raffleId) {
            revert("Invalid Raffle");
        } else {
            return (
                raffles[_raffleId].name,
                raffles[_raffleId].totalTickets,
                raffles[_raffleId].ticketsSold,
                raffles[_raffleId].isOpen,
                raffles[_raffleId].winner,
                raffles[_raffleId].pool
            );
        }

    }

    /*
        buyTicket()
        This function allows users to buy tickets for a specific raffle.
      @param -   This function takes 1 parameter, an raffle ID because the user can only purchase one ticket
       @dev -  The function checks:
            - that the raffle sales are open
            - that the transaction value is sufficient to purchase ticket
            - that there are enough tickets available to complete the purchase
       @dev -  The function:
            - increments the ticket sale count
            - refunds any surplus value sent
            - emits the appropriate event
    */

    function buyTicket(uint256 _raffleId, uint256 numTickets) public payable {
        require(msg.sender != owner(), "Owner cannot buy a ticket");
        require(raffles[_raffleId].isOpen = true, "ticket sales have closed");
        require(
            raffles[_raffleId].ticketsSold < raffles[_raffleId].totalTickets
        );
        require(
            msg.value >= (numTickets.mul(PRICE_TICKET)),
            "insufficient funds for tickets"
        );

        if (_raffleId + 1 > raffleId) {
            revert("Invalid Raffle");
        } else {
            numTicketsBought[_raffleId][msg.sender] += numTickets;

            for (uint256 i = 0; i < numTickets; i++) {
                ticketOwnerInfo[_raffleId][raffles[_raffleId].ticketsSold] = msg
                    .sender;
                raffles[_raffleId].ticketsSold++;
            }

            raffles[_raffleId].pool += numTickets * PRICE_TICKET;

            msg.sender.transfer(msg.value - (numTickets * PRICE_TICKET)); //sending back change
            emit LogBuyTickets(msg.sender, _raffleId, numTickets);
        }
    }

    /*
        howManyTicketsHaveIBought()
       @param -  This function takes one parameter, the raffle ID.
      @return -   The function returns information about the number of tickets a buyer bought
    */
    function howManyTicketsHaveIBought(uint256 _raffleId)
        public
        view
        returns (uint256)
    {
        if (_raffleId + 1 > raffleId) {
            revert("Invalid Raffle");
        } else {
            return numTicketsBought[_raffleId][msg.sender];
        }
    }

    /*
        endSale()
        @param -  This function takes one parameter, the raffle ID
       @dev -  Only the contract owner can call this function:
            - closes raffle sales
            - emit the appropriate event
     */

    function endSale(uint256 _raffleId) public onlyOwner {
        //todo,make sure you can't close o safe twice
        if (_raffleId + 1 > raffleId) {
            revert("Invalid Raffle");
        } else {
            raffles[_raffleId].isOpen = false;
            emit LogRaffleClosed(
                raffles[_raffleId].name,
                raffles[_raffleId].totalTickets,
                raffleId
            );
        }
    }

    /*
        generateRaffleWinner()
        @param - This function takes two parameters, the raffleID and a string that the host can enter
        @dev - Only the contract owner can call this function:
            - the raffle must be closed to call this function
            - uses keccak on the string to generate a random number between 1 and ticketsSold
            - the fee is transferred to the owner/host of the raffle
            - emit the appropriate event
        If this were to scale, I would use oraclize (paid for service) to generate a random number
         
     */
    function generateRaffleWinner(uint256 _raffleId, string memory seed)
        public
        onlyOwner
        returns (uint256 _w)
    {
        require(raffles[_raffleId].isOpen = false);

        require(0 == int256(raffles[_raffleId].winner));

        bytes memory b = abi.encodePacked(
            seed,
            now,
            _raffleId,
            raffles[_raffleId].ticketsSold
        );

        uint256 big = uint256(keccak256(b));

        uint256 winner_ticket_num = big % raffles[_raffleId].ticketsSold;

        raffles[_raffleId]
            .winner = ticketOwnerInfo[_raffleId][winner_ticket_num];

        uint256 ownershare = fee.mul(raffles[_raffleId].pool).div(100);

        raffles[_raffleId].pool -= ownershare;

        msg.sender.transfer(ownershare);

        emit LogGenerateRaffleWinner(_raffleId, raffles[_raffleId].winner);
    }

    /*
        winnerWithdraw()
        @param - This function takes one parameter, the raffleID
        @dev - Only the winner that is generated can call this function:
            - the raffle must be closed to call this function
            - winner can withdraw funds from the pool to their address
            - the pool is set to zero once a withdraw is made

         
     */
    function winnerWithdraw(uint256 _raffleId) public {
        require(raffles[_raffleId].isOpen = false);
        require(msg.sender == raffles[_raffleId].winner);
        msg.sender.transfer(raffles[_raffleId].pool);
        raffles[_raffleId].pool = 0;
    }

}
