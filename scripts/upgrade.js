// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const proxyAddress = '0x8EA77812Ab61a5c045ba1BEe9db2f4c20D6a7d96';
  // We get the contract to deploy
  const MasterChef = await hre.ethers.getContractFactory("MasterChef");
  console.log("Preparing upgrade...");
  const farm = await hre.upgrades.upgradeProxy(proxyAddress, MasterChef);
  await farm.deployed();
  console.log("NIFTYSouq721 deployed to:", farm.address, farm);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
