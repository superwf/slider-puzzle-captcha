import store from '../store/index'
import config from '../../config'

function validate(req, res) {
  res.format({
    'application/json': () => {
      // res.sendStatus(404)
      let ok = false
      let post = req.body
      const response = () => {
        res.send(JSON.stringify({ok}))
      }
      if (!post || !post.token) {
        response()
        return
      }
      store.get(post.token).then(position => {
        if (Math.abs(post.x - position.x) < config.allowedDistance) {
          ok = true
        }
        response()
      }, err => {
        // 若没有找到token说明已经过期被清除，应提示刷新重试
        if (err === null) {
          res.send(JSON.stringify({ok, expired: true}))
        }
      })
    }
  })
}
export default validate
