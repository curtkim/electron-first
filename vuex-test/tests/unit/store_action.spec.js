import { expect } from 'chai'

const actionsInjector = require('inject-loader!@/store/actions')

// create the module with our mocks
const actions = actionsInjector({
  '../api/shop': {
    getProducts (cb) {
      return new Promise((resolve)=> {
        setTimeout(()=> {
          console.log("MOCK");
          resolve(["MOCK"]);
        }, 1);
      })
    }
  }
})

var sinon = require('sinon')


describe('actions', () => {
  it('getAllProducts', async () => {
    const commit = sinon.spy()
    const state = {}
    
    await actions.getAllProducts({ commit, state })
    
    expect(commit.args).to.deep.equal([
      ['REQUEST_PRODUCTS'],
      ['RECEIVE_PRODUCTS', ["MOCK"]]
    ])
  })
})