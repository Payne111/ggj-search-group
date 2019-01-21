import React from 'react'
import PropTypes from 'prop-types'
import { Row, Button, Form } from 'antd'

// 组件
import { R1C1 } from 'ggj-layout'
import SAny from './comps/SAny'
import SInput from './comps/SInput'
import STextArea from './comps/STextArea'
import SSelect from './comps/SSelect'
import SCheckbox from './comps/SCheckbox'
import SRadioGroup from './comps/SRadioGroup'
import SRangePicker from './comps/SRangePicker'
import STimePicker from './comps/STimePicker'
import SCascader from './comps/SCascader'
import STree from './comps/STree'
import STreeSelect from './comps/STreeSelect'
import SBetween from './comps/SBetween'
import SDisplay from './comps/SDisplay'

// 工具
import filterSearchObj from './utils/filterSearchObj'
import DateValueProcessor from './entities/DateValueProcessor'
import TimeValueProcessor from './entities/TimeValueProcessor'


// 样式
import 'antd/dist/antd.css'
import './index.less'

const filterUndefined = params => {
  Object.keys(params).forEach(key => {
    if (params[key] === undefined) {
      delete params[key]
    }
  })
  return params
}

class SearchGroup extends React.Component {

  dateValueProcessor = new DateValueProcessor()
  timeValueProcessor = new TimeValueProcessor()

  processSearchObjValue(searchObj) {
    for (let field in searchObj) {
      this.dateValueProcessor.format(searchObj, field)
      this.timeValueProcessor.format(searchObj, field)
    }
  }

  onSubmit = (e, handle) => {
    e.preventDefault()
    const { validateFields } = this.props.form
    const { onSubmit } = this.props
    validateFields((err, values) => {
      if (!err) {
        // 合并参数并去除空字段
        const searchObj = filterSearchObj(values)
        this.processSearchObjValue(searchObj)
        onSubmit && onSubmit(searchObj)
      }
    })
  }

  onReset = (e) => {
    e.preventDefault()
    const { form, onReset } = this.props
    form.resetFields()
    onReset && onReset()
  }

  render() {
    const {
      form,
      formId,
      form: { getFieldsValue },
      configs,
      extendBtnsConfigs,
      hideBtns,
      hideSearchBtn,
      hideResetBtn,
      searchButtonAntd,
      cancelButtonAntd
    } = this.props
    return (
      <Form className='grid-form search-form' id={formId}>
        <Row gutter={24}>
          {
            configs.map(config => {
              const commonProps = {
                form,
                config,
              }
              const { type, field } = config

              switch (type) {
              case 'any':
                return (<SAny key={field} {...commonProps}></SAny>)
              case 'input':
                return (<SInput key={field} {...commonProps}></SInput>)
              case 'textArea':
                return (<STextArea key={field} {...commonProps}></STextArea>)
              case 'select':
                return (<SSelect key={field} {...commonProps}></SSelect>)
              case 'checkbox':
                return (<SCheckbox key={field} {...commonProps}></SCheckbox>)
              case 'radio':
                return (<SRadioGroup key={field} {...commonProps}></SRadioGroup>)
              case 'time':
                return (<SRangePicker key={field} {...commonProps} dateValueProcessor={this.dateValueProcessor}></SRangePicker>)
              case 'time2':
                return (<STimePicker key={field} {...commonProps} timeValueProcessor={this.timeValueProcessor}></STimePicker>)
              case 'cascader':
                return (<SCascader key={field} {...commonProps}></SCascader>)
              case 'tree':
                return (<STree key={field} {...commonProps}></STree>)
              case 'treeSelect':
                return (<STreeSelect key={field} {...commonProps}></STreeSelect>)
              case 'between':
                return (<SBetween key={field} {...commonProps}></SBetween>)
              case 'display':
                return (<SDisplay key={field} {...commonProps}></SDisplay>)
              default:
                return null
              }
            })
          }
        </Row>
        {
          hideBtns ?
            null :
            <R1C1 style={{ textAlign: 'right' }}>
              {
                hideSearchBtn ?
                  null :
                  <Button type="primary" onClick={this.onSubmit} {...searchButtonAntd}>查询</Button>
              }
              {
                hideResetBtn ?
                  null :
                  <Button type="primary" style={{ marginLeft: 8 }} onClick={this.onReset} {...cancelButtonAntd}>重置</Button>
              }
              {
                extendBtnsConfigs && extendBtnsConfigs.map((config, i) => {
                  let { antd, buttonText, handle } = config
                  return <Button onClick={e => handle(filterUndefined(getFieldsValue()))}  key={i} {...antd}>{buttonText}</Button>
                })
              }
            </R1C1>
        }

      </Form>
    )
  }
}

SearchGroup.propTypes = {
  form: PropTypes.object,
  formId: PropTypes.string,
  configs: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  hideBtns: PropTypes.bool, // 隐藏所有按钮
  hideSearchBtn: PropTypes.bool, // 隐藏查询按钮
  hideResetBtn: PropTypes.bool, // 隐藏重置按钮
  searchButtonAntd: PropTypes.object, // 查询按钮antd
  cancelButtonAntd: PropTypes.object, // 查询取消antd
  extendBtnsConfigs: PropTypes.array, // 扩展按钮配置
}

const WrappedForm = Form.create()(SearchGroup)

export default WrappedForm
