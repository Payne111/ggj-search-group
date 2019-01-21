import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Tree } from 'antd'

const FormItem = Form.Item
const TreeNode = Tree.TreeNode

class FormTree extends React.PureComponent {
  constructor(props) {
    super(props)
    const checkedKeys = props.value || []
    this.state = {
      checkedKeys,
    }
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} key={item.key} />
    })
  }

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys })
    const { onChange } = this.props
    onChange && onChange(checkedKeys)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        checkedKeys: nextProps.value
      })
    }
  }

  render() {
    let { antd, treeData } = this.props
    return (
      <Tree
        {...antd}
        checkedKeys={this.state.checkedKeys}
        onCheck={this.onCheck}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    )
  }

}

FormTree.propTypes = {
  antd: PropTypes.object,
  treeData: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.array
}

class STree extends React.Component {

  render() {
    const { config } = this.props
    const { label, field, colSpan, labelWidth, decorator, antd, treeData, hideColon } = config
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
              <FormTree
                treeData={treeData}
                antd={antd}
              />
            )
          }
        </FormItem>
      </Col>
    )
  }
}

STree.propTypes = {
  form: PropTypes.object,
  config: PropTypes.object.isRequired,
}

export default STree
