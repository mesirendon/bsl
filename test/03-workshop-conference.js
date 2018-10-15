const BSL = artifacts.require('BSL')
const Conference = artifacts.require('WorkshopConference')

const chai = require('chai')
const moment = require('moment')
const Web3 = require('web3')
const expect = chai.expect

const web3 = new Web3('ws://localhost:8545')

contract('Workshop Conference behavior', accounts => {
  const [
    owner,
    assistant
  ] = accounts
  let bsl, conference

  it('should get an instance of the BSL and its owner', async() => {
    bsl = await BSL.deployed()
    expect(await bsl.owner()).to.eq(owner)
  })
  it('should create a new simple conference and register it at the BSL', async() => {
    const start = moment().add(2, 'days').format('x')
    const end = moment().add(4, 'days').format('x')
    conference = await Conference.new('BSL Bogota', start, end, 1, bsl.address)
    await bsl.addConference(conference.address, await conference.name())
    expect(conference).not.to.be.null
    expect(await conference.bsl()).to.eq(bsl.address)
  })
  it('should get the registered owner for the Conference contract', async() => {
    expect(await conference.owner()).to.eq(owner)
  })
  it('should get the registered name of the Conference', async() => {
    expect(await conference.name()).to.eq('BSL Bogota')
  })
  it('should get the same name for the conference and the registered conference at BSL', async() => {
    expect(await bsl.getConference(conference.address)).to.eq(await conference.name())
  })
  it('should allow an assistant to subscribe to the conference', async() => {
    tx = await conference.subscribe('pickard@enterpri.se', 'jlpickard', {from: assistant, value: web3.utils.toWei('1', 'ether')})
    expect(tx.tx).to.match(/0x\w{64}/g)
    expect(tx.tx.length).to.eq(66)
  })
  it('should allow the owner to get the conference balance', async() => {
    balance = await conference.getBalance()
    balance = web3.utils.fromWei(balance.toString(), 'ether')
    expect(balance).to.eq('1')
  })
  it('should allow the owner to refund an specific attendant', async() => {
    tx = await conference.refund(assistant)
    expect(tx.tx.length).to.eq(66)
    expect(tx.tx).to.match(/0x\w{64}/g)
  })
  it('should allow the masters (owner and BSL contract) to close the conference', async() => {
    closeTx = await conference.close()
    expect(closeTx.tx.length).to.eq(66)
    expect(closeTx.tx).to.match(/0x\w{64}/g)
  })
  it('should get a balance equal to 0 for the conference after closing it', async() => {
    balance = await conference.getBalance()
    balance = web3.utils.fromWei(balance.toString(), 'ether')
    expect(balance).to.eq('0')
  })
  it('should get a balance equal to 0 for the BSL contract after closing the conference', async() => {
    balance = await bsl.getBalance()
    balance = web3.utils.fromWei(balance.toString(), 'ether')
    expect(balance).to.eq('0')
  })
  it('should run this to guarantee previous tests', () => {
    expect(true).to.be.true
  })
  it('should allow the owner to withdraw the BSL money', async() => {
    tx = await bsl.withdraw()
    expect(tx.tx.length).to.eq(66)
    expect(tx.tx).to.match(/0x\w{64}/g)
  })
  it('should get a balance of 0 for the BSL contract', async() => {
    balance = await bsl.getBalance()
    balance = web3.utils.fromWei(balance.toString(), 'ether')
    expect(balance).to.eq('0')
  })
  it('should have 1 ether or more at the owner account', async() => {
    balance = await web3.eth.getBalance(owner)
    balance = parseFloat( web3.utils.fromWei(balance.toString(), 'ether') )
    expect(balance).to.above(100)
  })
})
