var Ownable = artifacts.require('./Ownable.sol');
var SafeMath = artifacts.require('./SafeMath.sol');
var Raffles = artifacts.require('./Raffles.sol');

module.exports = function(deployer) {
	deployer.deploy(Ownable);
	deployer.deploy(SafeMath);
	deployer.deploy(Raffles);
};
