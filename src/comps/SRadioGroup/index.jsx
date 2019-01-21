import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Radio } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group

class SRadioGroup extends React.Component {

  render() {
    const { config } = this.props
    const { label, field, colSpan, labelWidth, decorator, antd, items, hideColon } = config
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
              <RadioGroup {...antd}>
                {
                  items && items.map((item, i) =>
                    <Radio key={i} value={item.value}>{item.name}</Radio>
                  )
                }
              </RadioGroup>
            )
          }
        </FormItem>
      </Col>
    )
  }
}

SRadioGroup.propTypes = {
  form: PropTypes.object,
  config: PropTypes.object.isRequired,
}

export default SRadioGroup
