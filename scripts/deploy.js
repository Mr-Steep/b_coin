const hre = require("hardhat");
const {ethers} = require("hardhat");
const fs = require("fs");
const path = require("path");
const {network} = require("hardhat");

async function main() {
  if (network.name === 'hardhat') {
    console.warn("You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        "option '--network localhost'")
  }


  const [deployer] = await ethers.getSigners()


  const TokenShop = await ethers.getContractFactory("TokenShop", deployer)
  const tokenShop = await TokenShop.deploy()
  await tokenShop.deployed()
  console.log("TokenShop", tokenShop.address)
  console.log("TokenBnxt", await tokenShop.token())

  saveFrontendFiles({
    TokenShop: tokenShop,
  })
}


function saveFrontendFiles(contracts) {
  const contractsDir = path.join(__dirname, '/..', 'front/contracts')
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  Object.entries(contracts).forEach((contract_item) => {
    const [name, contract] = contract_item
    if (contract) {
      fs.writeFileSync(
          path.join(contractsDir, '/', name + '-contract-address.json'),
          JSON.stringify({[name]: contract.address}, undefined, 2)
      )
    }

    const ContractArtifact = hre.artifacts.readArtifactSync(name)

    fs.writeFileSync(
        path.join(contractsDir, '/', name + ".json"),
        JSON.stringify(ContractArtifact, null, 2)
    )
  })
}


main()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })

