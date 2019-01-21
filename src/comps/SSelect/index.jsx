import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class SSelect extends React.Component {

  render() {
    const { config } = this.props
    const { label, field, colSpan, labelWidth, decorator, antd, items, hideColon, valueKey = 'value', labelKey = 'name' } = config
    const { getFieldDecorator } = this.props.form

    return (
      <Col span={colSpan || 24}>
        <FormItem
          className='search-item'
          label={label}
          labelCol={{
            style: { width: !labelWidth && labelWidth !== 0 ? 80 : labelWidth }
          }}
          colon={hideColon ? false : true}
        >
          {
            getFieldDecorator(field, { ...decorator })(
              <Select {...antd}>
                {
                  items && items.map((item, i) =>
                    <Option key={i} value={item[valueKey]}>{item[labelKey]}</Option>
                  )
                }
              </Select>
            )
          }
        </FormItem>
      </Col >
    )
  }
}

SSelect.propTypes = {
  config: PropTypes.object,
  initSearchParam: PropTypes.object,
  form: PropTypes.object,
  onChange: PropTypes.func
}

export default SSelect
