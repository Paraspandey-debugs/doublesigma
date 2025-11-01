const { ethers } = require("hardhat");

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // For demo, use deployer as government admin
  const governmentAdmin = deployer.address;

  const LandRegistry = await ethers.getContractFactory("LandRegistryPrivate");
  const landRegistry = await LandRegistry.deploy(governmentAdmin);

  await landRegistry.waitForDeployment();

  console.log(
    "LandRegistryPrivate deployed to:",
    await landRegistry.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
