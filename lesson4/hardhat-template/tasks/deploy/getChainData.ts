import { task } from "hardhat/config";

task("getChainData", "Gets chain data", async (_taskArgs, hre) => {
  const latestBlock = await hre.ethers.provider.getBlock("latest")
  console.log('latestBlock', latestBlock)
});
