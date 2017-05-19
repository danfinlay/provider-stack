class ProviderStack {

  constructor () {
    this.subproviders = []
  }

  push (subprovider) {
    this.subproviders.push(subprovider)
  }

  async handleRequest (params) {
    let subprovider, response
    const preprocessor = this.preprocessorGen()
    const postprocessor = this.postprocessorGen()

    subprovider = preprocessor.next()
    while (!subprovider.done) {
      const result = await subprovider.value.handleRequest(params)

      if (result) {
        return result
      }

      subprovider = preprocessor.next()
    }
  }

  *preprocessorGen () {
    for (let i = 0; i < this.subproviders.length; i++) {
      yield this.subproviders[i]
    }
  }

  *postprocessorGen () {
    const postProcessors = []
    let postProcess = yield

    while (postProcess) {
      postProcess.push(postProcess)
    }
  }

}

module.exports = ProviderStack
