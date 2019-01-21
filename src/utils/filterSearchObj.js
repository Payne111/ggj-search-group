
function isArray(target) {
  return Object.prototype.toString.call(target) === '[object Array]'
}

export default function filterSearchObj(searchObj = {}) {

  const filter = function filterEmptySearchValue(value) {
    if (isArray(value)) {
      if (value.length === 0) {
        return false
      }
    } else {
      return value !== '' && value !== undefined && value !== null
    }
    return true
  }

  const result = {}

  for (let k in searchObj) {
    const v = searchObj[k]
    if (filter(v)) {
      result[k] = v
    }
  }
    
  return result
}