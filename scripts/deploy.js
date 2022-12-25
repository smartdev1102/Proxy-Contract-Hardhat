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

  // We get the contract to deploy
  const MasterChef = await hre.ethers.getContractFactory("MasterChef");
  console.log('Deploying NFT Contract...');
  const farm = await hre.upgrades.deployProxy(MasterChef, ['0x319e222de462ac959baf2aec848697aec2bbd770', '0x34d020038f06213e93f64c2969a3beb7ad0383fb', '0x6BB7cbb2965C108db26edC911045Fe27Ab599104', '5000000000000000000', '16236388'], { initializer: "initialize" });
  // const nft = await NIFTYSouq721.deploy();
  await farm.deployed();
  console.log("NIFTYSouq721 deployed to:", farm.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
