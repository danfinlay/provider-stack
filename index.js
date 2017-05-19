class ProviderStack {

  constructor () {
    this.subproviders = []
  }

  push (subprovider) {
    this.subproviders.push(subprovider)
  }

  async handleRequest (params) {
    let subprovider, response
    const providerGen = this.createStack()
    const postProcesses = []

    subprovider = providerGen.next()
    while (!subprovider.done) {
      const result = await subprovider.value.handleRequest(params)

      if (result) {
        return result
      }

      subprovider = providerGen.next()
    }
  }

  *createStack () {
    for (let i = 0; i < this.subproviders.length; i++) {
      yield this.subproviders[i]
    }
  }

}

module.exports = ProviderStack
