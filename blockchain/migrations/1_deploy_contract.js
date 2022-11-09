const Review = artifacts.require("Review");

module.exports = async function(deployer) {
  await deployer.deploy(Review);
};