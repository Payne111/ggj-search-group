import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, DatePicker } from 'antd'

const FormItem = Form.Item
const { RangePicker } = DatePicker

class SRangePicker extends React.Component {

  componentDidMount() {
    const { antd } = this.props.config
    let formatPattern = null
    if (antd) {
      formatPattern = antd.format || formatPattern
    }
    this.props.dateValueProcessor.record(this.props.config.field, formatPattern || 'YYYY-MM-DD HH:mm:ss')
  }

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
              <RangePicker {...antd} />
            )
          }
        </FormItem>
      </Col >
    )
  }
}

SRangePicker.propTypes = {
  config: PropTypes.object,
  initSearchParam: PropTypes.object,
  form: PropTypes.object,
  onChange: PropTypes.func,
  dateValueProcessor: PropTypes.object.isRequired
}

export default SRangePicker
