import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, TimePicker } from 'antd'

const FormItem = Form.Item

class STimePicker extends React.Component {

  componentDidMount() {
    const { antd } = this.props.config
    let formatPattern = null
    if (antd) {
      formatPattern = antd.format || formatPattern
    }
    this.props.timeValueProcessor.record(this.props.config.field, formatPattern || 'HH:mm:ss')
  }

  render() {
    const { config } = this.props
    const { label, field, colSpan, labelWidth, decorator, antd } = config
    const { getFieldDecorator } = this.props.form

    return (
      <Col span={colSpan || 24}>
        <FormItem
          className='search-item'
          label={<span style={{ display: 'inline-block', width: labelWidth || 80 }}>{label}</span>}
        >
          {
            getFieldDecorator(field, { ...decorator })(
              <TimePicker {...antd} />
            )
          }
        </FormItem>
      </Col >
    )
  }
}

STimePicker.propTypes = {
  config: PropTypes.object,
  initSearchParam: PropTypes.object,
  form: PropTypes.object,
  onChange: PropTypes.func,
  timeValueProcessor: PropTypes.object.isRequired
}

export default STimePicker
