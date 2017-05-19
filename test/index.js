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

test('a param mutating subprovider', function (t) {
  const success = 'success!'
  const failure = 'failure!'

  const mutator = {
    handleRequest (params, next) {
      params.value = 2
      return
    }
  }

  const responder = {
    handleRequest (params, next) {
      switch (params.value) {
        case 2:
          return Promise.resolve(success)
        default:
          return Promise.resolve(failure)
      }
    }
  }

  const stack = new ProviderStack()
  stack.push(mutator)
  stack.push(responder)

  stack.handleRequest({ value: 1 })
  .then((response) => {
    t.equal(response, success, 'returns success')
    t.end()
  })
  .catch((reason) => {
    t.ok(false, reason)
  })
})
