import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Input } from 'antd'
const FormItem = Form.Item

class SBetween extends React.Component {

  render() {
    const { config } = this.props
    const { label, left, right, colSpan, labelWidth, hideColon } = config
    const { getFieldDecorator } = this.props.form

    return (
      <Col span={colSpan || 24}>
        <FormItem
          className='search-item item-between'
          label={<span style={{ display: 'inline-block', width: labelWidth || 80 }}>{label}</span>}
          colon={hideColon ? false : true}
        >
          <Col span={11}>
            <FormItem>
              {
                getFieldDecorator(left.field, { ...left.decorator })(
                  <Input className='between-left' {...left.antd} />
                )
              }
            </FormItem>
          </Col>
          <Col span={2}>
            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
              -
            </span>
          </Col>
          <Col span={11}>
            <FormItem>
              {
                getFieldDecorator(right.field, { ...right.decorator })(
                  <Input className='between-right' {...right.antd} />
                )
              }
            </FormItem>
          </Col>
        </FormItem>
      </Col>
    )
  }
}

SBetween.propTypes = {
  form: PropTypes.object,
  config: PropTypes.object.isRequired,
}

export default SBetween
