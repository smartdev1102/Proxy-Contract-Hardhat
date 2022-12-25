const ethers = require('ethers')
const { TypedDataUtils } = require('ethers-eip712')


const SIGNING_DOMAIN_NAME = "LazyNFT"
const SIGNING_DOMAIN_VERSION = "1"

class LazyMinter {

  constructor({ contractAddress, signer }) {
    this.contractAddress = contractAddress
    this.signer = signer

    this.types = {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      nftData: [
        { name: "tokenURI", type: "string" },
        { name: "tokenPrice", type: "uint256" },
        { name: "tokenMinter", type: "address" },
        { name: "isListed", type: "bool" },
        { name: "royalArtists", type: "string[]" },
        { name: "profitArtists", type: "string[]" },
        { name: "isFirst", type: "bool" },
      ]
    }
  }

  async _signingDomain() {
    if (this._domain != null) {
      return this._domain
    }
    const chainId = await this.signer.getChainId()
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    }
    return this._domain
  }

  async _formatVoucher(voucher) {
    const domain = await this._signingDomain()
    return {
      domain,
      types: this.types,
      primaryType: 'nftData',
      message: voucher,
    }
  }

  async createVoucher(tokenURI, tokenPrice = 0, tokenMinter, isListed, royalArtists, profitArtists, isFirst) {
    const voucher = { tokenURI, tokenPrice, tokenMinter, isListed, royalArtists, profitArtists, isFirst }
    const typedData = await this._formatVoucher(voucher)
    const digest = TypedDataUtils.encodeDigest(typedData)
    const signature = await this.signer.signMessage(digest)
    return {
      voucher,
      signature,
      digest,
    }
  }
}

module.exports = {
  LazyMinter
}