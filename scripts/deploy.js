
const hre = require("hardhat");

async function main() {
  const Blog = await hre.ethers.getContractFactory("Blog");
  const blog = await Blog.deploy("DAPP-Blog", "Blog", "1000000000000000000");

  await blog.deployed();

  console.log("Blog is deployed to:", blog.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
