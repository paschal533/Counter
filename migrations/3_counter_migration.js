var CounterStorage = artifacts.require("./Counter.sol");

module.exports = function(deployer) {
  deployer.deploy(CounterStorage);
};
