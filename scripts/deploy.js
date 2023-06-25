const hre = require("hardhat");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const Betting = await hre.ethers.getContractFactory("Betting");
  const betting = await Betting.deploy();

  await betting.deployed();

  console.log("Betting deployed to:", betting.address);
  
  // Wait for etherscan to notice that the contract has been deployed
  console.log("Sleeping...");
  await sleep(10000);

  await hre.run('verify:verify', {
    address: betting.address,
    constructorArguments: []
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });