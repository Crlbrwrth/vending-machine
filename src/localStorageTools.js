export const getStoredValue = key => {
  const result = window.localStorage.getItem(key)
  return JSON.parse(result)
}

export const setStoredValue = (key, value) => {
  const result = window.localStorage.setItem(key, JSON.stringify(value))
  return result
}

export const getStoredValues = (keys = []) => keys.map(getStoredValue)
