export default {
  bgWidth: 600,
  bgHeight: 300,

  // puzzle为正方形，用一个边长表示宽和高
  puzzleSide: 100,

  // 凸凹槽的半径
  slotRadius: 20,

  // 允许的误差
  allowedDistance: 3,

  port: 3010,

  store: 'redis',

  // 一分钟过期
  expire: 1000 * 60
}
