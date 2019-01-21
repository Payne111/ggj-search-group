import React from 'react'
import PropTypes from 'prop-types'
import { Form, TreeSelect } from 'antd'
import '../../index.less'

import treeData from './treeData'

const FormItem = Form.Item
const TreeNode = TreeSelect.TreeNode

let serial = 0
function genNodeKey() {
  return serial++
}

class STreeSelect extends React.Component {

  state = {
    value: '0-0-0',
  }
  onChange = (value) => {
    console.log(value)
    this.setState({ value })
  }

  createNode = (treeData) => {
    return treeData.map(node => {
      if (node.children && node.children.length > 0) {
        return (
          <TreeNode value={node.value} title={node.title} key={genNodeKey()} disabled>
            {
              this.createNode(node.children)
            }
          </TreeNode >
        )
      } else {
        return <TreeNode value={node.value} title={node.title} key={genNodeKey()} ></TreeNode >
      }
    })
  }

  render() {
    const { config, initSearchParam } = this.props
    const { label, key, rules, antdOptions, labelStyle, hideColon } = config
    const { getFieldDecorator } = this.props.form

    return (
      <FormItem
        key={key}
        className='searchItem'
        label={(label && <span className='labelBox' style={{...labelStyle}}>{label}</span>)}
        colon={hideColon ? false : true}          
      >
        {
          getFieldDecorator(key, {
            rules: rules,
            initialValue: initSearchParam[key]
          })(
            <TreeSelect
              style={{ width: 300 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="选择分类"
              allowClear
              onChange={this.onChange}
            >
              {
                this.createNode(treeData)
              }
            </TreeSelect>
          )
        }
      </FormItem>
    )
  }
}

STreeSelect.propTypes = {
  config: PropTypes.object,
  initSearchParam: PropTypes.object,
  form: PropTypes.object
}

export default STreeSelect
