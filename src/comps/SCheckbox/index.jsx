import React from 'react'
import PropTypes from 'prop-types'
import { Form, Checkbox } from 'antd'
import '../../index.less'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

class SCheckbox extends React.Component {

  render() {
    const { config, initSearchParam } = this.props
    const { label, key, rules, antdOptions, hideColon } = config
    const { getFieldDecorator } = this.props.form

    return (
      <FormItem
        key={key}
        className='searchItem'
        label={(label && <span className='labelBox'>{label}</span>)}
        colon={hideColon ? false : true}
      >
        {
          getFieldDecorator(key, {
            rules: rules,
            initialValue: initSearchParam[key]
          })(
            <CheckboxGroup {...antdOptions} options={config.data}></CheckboxGroup>
          )
        }
      </FormItem>
    )
  }
}

SCheckbox.propTypes = {
  config: PropTypes.object,
  initSearchParam: PropTypes.object,
  form: PropTypes.object
}

export default SCheckbox
