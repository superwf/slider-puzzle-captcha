import randomBackground from './randomBackground'
import imgBackground from './imgBackground'
import config from '../../config'

let background = config.bgPath ? imgBackground : randomBackground

export default background
