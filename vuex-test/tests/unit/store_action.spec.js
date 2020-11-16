import { expect } from 'chai'

const actionsInjector = require('inject-loader!@/store/actions')

// create the module with our mocks
const actions = actionsInjector({
  '../api/shop': {
    getProducts (cb) {
      // setTimtout을 사용하는 경우에 expect에서 RECEIVE_PRODUCTS이 포함되지 않는다.ㅠㅠㅠ
      cb([ "MOCK" ])
    }
  }
})

var sinon = require('sinon')


describe('actions', () => {
  it('getAllProducts', () => {
    const commit = sinon.spy()
    const state = {}
    
    actions.getAllProducts({ commit, state })
    
    expect(commit.args).to.deep.equal([
      ['REQUEST_PRODUCTS'],
      ['RECEIVE_PRODUCTS', ["MOCK"]]
    ])
  })
})