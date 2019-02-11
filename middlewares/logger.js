const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('Action Called:', action)
    const returnValue = next(action)
    console.log('New State:', store.getState())
  console.groupEnd()
  return returnValue
}

export default logger