export const shop = {
  getProducts (cb) {
    setTimeout(() => {
      cb([ "ORIGIN" ])
    }, 100)
  }
}