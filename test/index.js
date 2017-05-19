const test = require('tape')
const ProviderStack = require('../')

test('a simple response subprovider', function (t) {
  const success = 'success!'

  const subp = {
    handleRequest (params, next) {
      return Promise.resolve(success)
    }
  }

  const stack = new ProviderStack()
  stack.push(subp)

  stack.handleRequest(null)
  .then((response) => {
    t.equal(response, success, 'returns success')
    t.end()
  })
  .catch((reason) => {
    t.ok(false, reason)
  })
})


