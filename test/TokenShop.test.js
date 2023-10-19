const { expect } = require("chai");
const { ethers } = require("hardhat");
const bNXTShopJSON = require("../artifacts/contracts/bNXT.sol/bNXTShop.json");

describe("TokenShop", function () {
    let shopInstance;
    let owner;
    let buyer;

    beforeEach(async () => {
        [owner, buyer] = await ethers.getSigners();
        const bNXTShopFactory = new ethers.ContractFactory(
            bNXTShopJSON.abi,
            bNXTShopJSON.bytecode,
            owner
        );
        shopInstance = await bNXTShopFactory.deploy();
        await shopInstance.deployed();
    });

    it("should set the correct owner", async () => {
        const contractOwner = await shopInstance.owner();
        expect(contractOwner).to.equal(owner.address);
    });

    it("should allow the owner to set a new chainlinkOracleAddress", async () => {
        const newOracleAddress = buyer.address;
        await shopInstance.connect(owner).setNewChainlinkOracleAddress(newOracleAddress);
        const updatedOracleAddress = await shopInstance.chainlinkOracleAddress();
        expect(updatedOracleAddress).to.equal(newOracleAddress);
    });

    it("should not allow non-owner to set a new chainlinkOracleAddress", async () => {
        const newOracleAddress = buyer.address;
        try {
            await shopInstance.connect(buyer).setNewChainlinkOracleAddress(newOracleAddress);
            expect.fail("Non-owner was able to set Oracle address");
        } catch (error) {
            expect(error.message).to.include("Not an Owner");
        }
    });

    it("should allow the owner to unlock tokens", async () => {
        await shopInstance.connect(owner).unlockTokens();
        const globalMultiplier = await shopInstance.getGlobalMultiplier();
        expect(globalMultiplier.toNumber()).to.equal(2);
    });

    it("should not allow non-owner to unlock tokens", async () => {
        try {
            await shopInstance.connect(buyer).unlockTokens();
            expect.fail("Non-owner was able to unlock tokens");
        } catch (error) {
            expect(error.message).to.include("Not an Owner");
        }
    });



    it("should not allow a user to buy bonus tokens if they have never bought tokens", async () => {
        try {
            await shopInstance.connect(buyer).buyTokensBonus();
            expect.fail("User without purchased tokens was able to buy bonus tokens");
        } catch (error) {
            expect(error.message).to.include("You have never bought tokens");
        }
    });

});
