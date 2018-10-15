const BSL = artifacts.require('BSL')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

contract('BSL basic', accounts => {
  const owner = accounts[0]
  const unauthorized = accounts[1]


  it('should get an instance of the contract with an email', () => {
    BSL.deployed().then(instance => {
      bsl = instance
      expect(bsl).not.to.be.null
    })
  })
  it('should have the registered email', () => {
    bsl.email().then(mail => {
      expect(mail).to.eq('hello@mesirendon.com')
    })
  })
  it('should get the owner of the contract', () => {
    bsl.owner().then(registeredOwner => {
      expect(registeredOwner).to.eq(owner)
    })
  })
  it('should allow the owner to withdraw the balance of the contract', () => {
    bsl.withdraw().then(response => {
      expect(response.tx.length).to.eq(66)
      expect(response.tx).to.match(/0x\w{64}/g)
    })
  })
  it('should avoid anyone else withdrawing the balance of the contract', () => {
    expect(bsl.withdraw({from: unauthorized})).to.be.eventually.rejected
  })
  it('should run this to guarantee previous tests', () => {
    expect(true).to.be.true
  })
})
