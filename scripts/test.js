

const { ethers } = require("hardhat");
const { expect } = require("chai");
const hre = require("hardhat");
const { LazyMinter } = require('../lib')

async function main() {
    await hre.run('compile');
    const signers = await ethers.getSigners();

    // We get the NFT to deploy
    const NIFTYSouq721 = await ethers.getContractFactory("NIFTYSouq721");

    const address = "0x94186D9f8323a5F1464e6908316165f0CCE07551"
    const NFT = NIFTYSouq721.attach(address);
    const tokenId = await NFT.tokenIds();
    
    const lazyMinter = new LazyMinter({ contractAddress: NFT.address, signer: signers[0] })
    const { voucher, signature, digest } = await lazyMinter.createVoucher(tokenId, "tokenUri", 100000, signers[0].address, true, ["0xD1B26843541F0B9AA407C0519010F5B47CF328A2", "10", "0x8775bAF8E0c812cf0a768e1713048B7a24355b45", "20"], ["0xD1B26843541F0B9AA407C0519010F5B47CF328A2", "10", "0x8775bAF8E0c812cf0a768e1713048B7a24355b45", "20"], true)
    console.log(voucher, signature, digest)
    const mint = await NFT.redeem("0x0f902e433638f76b6c43B0Ff7a7D6900cD5a5005", voucher, signature);
    console.log(mint)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
