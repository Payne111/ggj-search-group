import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form } from 'antd'

const FormItem = Form.Item

class SAny extends React.Component {

  render() {
    const { config } = this.props
    const { label, field, colSpan, labelWidth, decorator, hideColon, render } = config
    const { getFieldDecorator } = this.props.form

    return (
      <Col span={colSpan || 24}>
        <FormItem
          className='search-item'
          label={<span style={{ display: 'inline-block', width: labelWidth || 80 }}>{label}</span>}
          colon={hideColon ? false : true}
        >
          {
            getFieldDecorator(field, { ...decorator })(render())
          }
        </FormItem>
      </Col>
    )
  }
}

SAny.propTypes = {
  form: PropTypes.object,
  config: PropTypes.object.isRequired,
}

export default SAny
