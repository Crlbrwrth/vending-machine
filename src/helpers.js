export function deductObjectProps (deductFrom = {}, deduct = {}) {
  return Object
    .keys(deductFrom)
    .reduce((acc, ele) => {
      return { ...acc, [ele]: deductFrom[ele] - (deduct[ele] || 0) }
    }, {})
}

export function addUpObjectProps (addTo = {}, add = {}) {
  return Object
    .keys(addTo)
    .reduce((acc, ele) => {
      return { ...acc, [ele]: addTo[ele] + (add[ele] || 0) }
    }, {})
}
