// actions.js
import shop from '../api/shop'

export const getAllProducts = async ({ commit }) => {
  commit('REQUEST_PRODUCTS')
  let products = await shop.getProducts()
  commit('RECEIVE_PRODUCTS', products)
}