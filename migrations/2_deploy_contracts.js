var BSL = artifacts.require("./BSL.sol");

module.exports = function(deployer) {
  deployer.deploy(BSL, 'hello@mesirendon.com');
};
