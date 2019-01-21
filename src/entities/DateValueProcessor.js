export default class {

  fieldsSet = new Set()

  formatPatterns = {}

  /**
   * 记录要转化的字段
   * @param {*} field 
   */
  record(field, pattern) {
    this.fieldsSet.add(field)
    this.formatPatterns[field] = pattern
  }

  /**
 * 格式化成接口需要的值
 * @param {*} value 
 * @param {*} field 
 */
  format(searchObj, field) {
    let value = searchObj[field]
    if (this.fieldsSet.has(field)) {
      value = [value[0].format(this.formatPatterns[field]), value[1].format(this.formatPatterns[field])]
    }
    searchObj[field] = value
  }
}
