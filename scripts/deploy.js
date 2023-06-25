const hre = require("hardhat");

async function main() {
  const Betting = await hre.ethers.getContractFactory("Betting");
  const betting = await Betting.deploy();

  await betting.deployed();

  console.log("Betting deployed to:", betting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });