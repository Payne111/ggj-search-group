import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form } from 'antd'

const FormItem = Form.Item

class SDisplay extends React.Component {

  render() {
    const { config } = this.props
    const { label, content, colSpan, labelWidth, hideColon } = config

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
          {content}
        </FormItem>
      </Col>
    )
  }
}

SDisplay.propTypes = {
  config: PropTypes.object.isRequired,
  content: PropTypes.any
}

export default SDisplay
