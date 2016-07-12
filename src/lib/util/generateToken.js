const token = () => {
  return (Date.now() * Math.random()).toString(36).replace('.', '')
}
export default token
