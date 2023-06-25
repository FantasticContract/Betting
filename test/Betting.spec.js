const {
  time,
  loadFixture,
} = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

const valA = ethers.utils.keccak256(0xBAD060A7)
const hashA = ethers.utils.keccak256(valA)
const valBwin = ethers.utils.keccak256(0x600D60A7)
const valBlose = ethers.utils.keccak256(0xBAD060A7)

describe('Betting', () => {

  async function deployContractFixture() {
    const [owner, accountA, accountB] = await ethers.getSigners();

    const Betting = await ethers.getContractFactory('Betting');
    const betting = await Betting.deploy();

    return { betting, owner, accountA, accountB };
  }

  it('Emits event when proposeBet', async () => {
    const { betting} = await loadFixture(deployContractFixture);

    await expect(betting.proposeBet(hashA, {value: 1e10}))
    .to.emit(betting, 'BetProposed')
    .withArgs('25570281595161723247448512563323488385410421231837210627268557974248756214297', 1e10);
  });

  it('Work all the way through (B wins)', async () => {
    const { betting, owner, accountA, accountB } = await loadFixture(deployContractFixture);

    await expect(betting.connect(accountA).proposeBet(hashA, {value: 1e10}))
      .to.emit(betting, "BetProposed")
      .withArgs('25570281595161723247448512563323488385410421231837210627268557974248756214297', 1e10);

    await expect(betting.connect(accountB).acceptBet(hashA, valBwin, {value: 1e10}))
      .to.emit(betting, 'BetAccepted')
      .withArgs('25570281595161723247448512563323488385410421231837210627268557974248756214297', accountA.address);

    const preBalanceB = await ethers.provider.getBalance(accountB.address);

    await expect(betting.connect(accountA).reveal(valA))
      .to.emit(betting, 'BetSettled');

    const postBalanceB = await ethers.provider.getBalance(accountB.address);

    expect(postBalanceB.sub(preBalanceB)).to.equal(2e10);
  });

  it('Work all the way through (A wins)', async () => {
    const { betting, owner, accountA, accountB } = await loadFixture(deployContractFixture);
    
    // format in ether
    // const preBalanceAInEther = ethers.utils.formatEther(await ethers.provider.getBalance(accountA.address));
    const preBalanceA = await ethers.provider.getBalance(accountA.address);

    await expect(betting.connect(accountA).proposeBet(hashA, {value: ethers.utils.parseEther("1")}))
      .to.emit(betting, "BetProposed")
      .withArgs('25570281595161723247448512563323488385410421231837210627268557974248756214297', ethers.utils.parseEther("1"));

    await expect(betting.connect(accountB).acceptBet(hashA, valBlose, {value: ethers.utils.parseEther("1")}))
      .to.emit(betting, 'BetAccepted')
      .withArgs('25570281595161723247448512563323488385410421231837210627268557974248756214297', accountA.address);

    const preBalanceB = await ethers.provider.getBalance(accountB.address);

    await expect(betting.connect(accountA).reveal(valA))
      .to.emit(betting, 'BetSettled');

    const postBalanceB = await ethers.provider.getBalance(accountB.address);
    const postBalanceA = await ethers.provider.getBalance(accountA.address);
    
    expect(postBalanceB.sub(preBalanceB)).to.equal(0);
    expect(postBalanceA.sub(preBalanceA)).to.greaterThan(0);
  });

});