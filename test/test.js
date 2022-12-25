const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { LazyMinter } = require('../lib')

describe("NIFTYSouq721", function () {
  it("NFT contract", async function () {
    // let data = await ethers.getSigners()
    const signers = await ethers.getSigners();
    const contract = await ethers.getContractFactory("NIFTYSouq721");
    console.log('Deploying NFT Contract...');
    const nft = await upgrades.deployProxy(contract, ["NIFTYSouq721 NFT", "NIFTYS"], { initializer: 'initialize' });
    await nft.deployed();
    console.log(nft.address);
    const tokenId = await nft.tokenIds();
    console.log(tokenId);
    const lazyMinter = new LazyMinter({ contractAddress: nft.address, signer: signers[0] })
    const { voucher, signature } = await lazyMinter.createVoucher(tokenId, "tokenUri", 1, signers[0].address, true, ["0xD1B26843541F0B9AA407C0519010F5B47CF328A2", "10", "0x8775bAF8E0c812cf0a768e1713048B7a24355b45", "20"], ["0xD1B26843541F0B9AA407C0519010F5B47CF328A2", "10", "0x8775bAF8E0c812cf0a768e1713048B7a24355b45", "20"], true)
    console.log(voucher, signature)

    const mint = await nft.redeem(signers[0].address, voucher, signature);
    console.log(mint)
  });
});
