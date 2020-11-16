import Vuex from 'vuex'
import { actions, mutations } from '@/store'

describe('actions', () => {

  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: { data: {} },
        mutations,
        actions
    })
  })

  it('tests using a mock axios and full store ', () => {
    return store.dispatch('getAsync')
      .then(() => expect(store.state.data)
        .toEqual({ title: 'Mock with Jest' } )
      )
  })

})