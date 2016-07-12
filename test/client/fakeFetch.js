import sinon from 'sinon'

// 伪ajax server

const create = () => {
  sinon.stub(window, 'fetch')
}

const destroy = () => {
  window.fetch.restore()
}

const response = (result, ...args) => {
  let res = new window.Response(JSON.stringify(result), {
    status: 200,
    headers: {'Content-type': 'application/json'}
  })

  window.fetch.withArgs(...args).returns(Promise.resolve(res))
}

export default {
  create,
  destroy,
  response
}
