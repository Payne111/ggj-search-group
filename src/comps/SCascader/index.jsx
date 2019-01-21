import React from 'react'
import PropTypes from 'prop-types'
import { Form, Cascader } from 'antd'
import '../../index.less'

const FormItem = Form.Item

class SCascader extends React.Component {

  constructor(props) {
    super(props)
    this.ref = null
  }

  state = {
    options: [],
  }

  getRef = (ref) => {
    this.ref = ref
  }

  // 加载类目
  loadCategoryData = (selectedOptions) => {
    let parentId = 0
    let targetOption = null
    if (selectedOptions && selectedOptions.length > 0) {
      targetOption = selectedOptions[selectedOptions.length - 1]
      parentId = targetOption.id
      targetOption.loading = true
    }
    const { load } = this.props
    // 类目下拉
    return load(parentId).then(list => {
      list = list && list.map((item, i) => {
        return Object.assign({}, item, {
          key: i,
          value: item.id,
          label: item.name,
          isLeaf: item.booleanIsLeaf,
        })
      })
      if (targetOption) {
        targetOption.loading = false
        targetOption.children = list
        this.setState({
          options: [...this.state.options]
        })
      } else {
        this.setState({
          options: list
        })
      }
      return list
    })
  }

  echo = async (echoValue, options) => {
    if (!echoValue || echoValue.length <= 1) {
      return
    }
    const selectedOptions = options.filter(item => Number(echoValue[0]) === Number(item.value))
    if (selectedOptions.length > 0) {
      this.loadCategoryData(selectedOptions).then(childOptions => {
        this.echo(echoValue.slice(1), childOptions)
      })
    }
  }

  init = () => {
    const { config, initSearchParam } = this.props
    const { key } = config
    const initialValue = initSearchParam[key]
    if (initialValue && initialValue instanceof Array) {
      this.loadCategoryData().then(list => {
        this.ref && this.echo(initialValue, this.ref.props.options)
      })
    }else {
      this.loadCategoryData()
    }
  }

  componentDidMount = () => {
    this.init()
  }

  render() {
    const { config, initSearchParam } = this.props
    const { label, key, rules, antdOptions, width, labelStyle, hideColon } = config
    const { getFieldDecorator } = this.props.form
    const { options } = this.state
    let initialValue = initSearchParam[key]
    if (initialValue && initialValue instanceof Array) {
      initialValue = initialValue.map(item => Number(item))
    }
    return (
      <FormItem
        key={key}
        className='searchItem'
        label={(label && <span className='labelBox' style={{ ...labelStyle }}>{label}</span>)}
        colon={hideColon ? false : true}
      >
        {
          getFieldDecorator(key, {
            rules: rules,
            initialValue: initialValue,
          })(
            <Cascader
              style={{ width: width || '330px' }}
              ref={this.getRef}
              {...antdOptions}
              options={options}
              loadData={this.loadCategoryData}
            />
          )
        }
      </FormItem>
    )
  }
}

SCascader.propTypes = {
  config: PropTypes.object,
  initSearchParam: PropTypes.object,
  form: PropTypes.object,
  load: PropTypes.func
}

export default SCascader
