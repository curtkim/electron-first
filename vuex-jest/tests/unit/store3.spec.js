import Vuex from 'vuex'
import { actions, mutations } from '@/store'

describe('actions', () => {
  
  let store
  let setDataMock

  beforeEach(() => {
    setDataMock = jest.fn()

    store = new Vuex.Store({
      state: { data: {} },
        mutations,
        actions
    })
  })

  it('tests using a mock mutation but real store', () => {
    store.hotUpdate({
      mutations: { SET_DATA: setDataMock }
    })

    return store.dispatch('getAsync')
      .then((res) => {
        expect(setDataMock.mock.calls[0][1]).toEqual({ title: 'Mock with Jest' })
        expect(setDataMock.mock.calls).toHaveLength(1)
      })
  })

})