export const shop = {
  getProducts () {
    return new Promise((resolve)=> {
      setTimeout(()=> {
        console.log("ORIGIN");
        resolve(["ORIGIN"]);
      }, 1000);
    })
  }
}