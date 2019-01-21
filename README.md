# 格格家管理后台基于antd查询表单组件

Demo: 
```
        <SearchGroup
          configs={[
            {
              type: 'input',
              label: '订单号',
              field: 'orderId',
              colSpan: 8,
              labelWidth: 100,
            },
            {
              type: 'input',
              label: '是发达',
              field: 'qeqwe',
              colSpan: 8,
              labelWidth: 100,
            },
            {
              type: 'input',
              label: '防守打法',
              field: 'qweq',
              colSpan: 8,
              labelWidth: 100,
            },
          ]}
          onSubmit={this.onSearch}
          onReset={this.onReset}
          ref={ref => this.searchGroup = ref}
        />
```