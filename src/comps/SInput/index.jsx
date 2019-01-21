import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Input } from 'antd'

const FormItem = Form.Item

class SInput extends React.Component {

  render() {
    const { config } = this.props
    const { label, field, colSpan, labelWidth, decorator, antd, hideColon } = config
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
              <Input {...antd}></Input>
            )
          }
        </FormItem>
      </Col>
    )
  }
}

SInput.propTypes = {
  form: PropTypes.object,
  config: PropTypes.object.isRequired,
}

export default SInput
