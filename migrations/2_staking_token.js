const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const MyToken = artifacts.require('MyToken');
const StakingToken = artifacts.require("StakingToken");

module.exports = async function (deployer, _, accounts) {
  const myToken = await deployProxy(MyToken, ["MyToken", "MYT"], { deployer });
  console.log(`Deployed contract: ${myToken.address}`);

  const stakingContract = await deployProxy(StakingToken, [myToken.address], { deployer, unsafeAllowCustomTypes: true });
  console.log(`Deployed contract: ${stakingContract.address}`);
}