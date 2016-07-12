import config from '../config'

// cache for memory allow ip
let allow = {}

// ip 可能是ipv6格式
const testIp = ip => {
  if (!ip) {
    return false
  }
  let result = ip.split(':')
  const v4ip = result[result.length - 1]
  if (v4ip in allow) {
    return allow[v4ip]
  }

  allow[v4ip] = config.allowedIps.indexOf(v4ip) > -1
  return allow[v4ip]
}

export default testIp
