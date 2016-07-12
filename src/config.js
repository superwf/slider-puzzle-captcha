export default {
  bgWidth: 294,
  bgHeight: 111,

  // puzzle为正方形，用一个边长表示宽和高
  puzzleSide: 40,

  // 凸凹槽的半径
  slotRadius: 6,

  // 允许的误差
  allowedDistance: 3,

  port: 3010,

  // 存储每次生成的验证信息的方式
  store: 'redis',

  // 一分钟过期
  expire: 1000 * 60,

  // 最大重试次数
  maxRetry: 10,

  // api
  api: {
    captcha: '/captcha',
    validate: '/validate',
  },

  // 允许访问的ip，至少填一个
  allowedIps: ['127.0.0.1'],

  // 背景图存放路径，以/结尾
  // 若配置该参数则使用该路径内的图，否则使用随机生成背景
  bgPath: __dirname + '/img/bg/',

  // 滑块提示文字
  hint: '拖动滑块完成拼图'
}
