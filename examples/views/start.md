:::demo

```html
<template>
  <ApproveFlow :nodeConfig.sync="nodeConfig"></ApproveFlow>
</template>
<script>
  export default {
    data() {
      return {
        nodeConfig: {
          nodeName: "发起人",
          type: 0,
          childNode: {
            nodeName: "审核人",
            type: 1,
            childNode: {
              nodeName: "路由",
              type: 4,
              conditionNodes: [
                {
                  nodeName: "条件1",
                  type: 3,
                  childNode: {
                    nodeName: "审核人",
                    type: 1,
                  },
                },
                {
                  nodeName: "条件2",
                  type: 3,
                },
              ],
            },
          },
        },
      };
    },
  };
</script>
```

:::

### 属性

| 参数            | 说明                         | 类型    | 可选值 | 默认值  |
| --------------- | ---------------------------- | ------- | ------ | ------- |
| nodeConfig.sync | 流程配置                     | Object  | -      | {}      |
| readonly        | 是否只读，是的情况下只能查看 | Boolean | -      | false   |
| bgColor         | 画布背景色                   | String  | -      | #f5f5f7 |

### 事件

| 参数           | 说明         | 参数 |
| -------------- | ------------ | ---- |
| on-config-edit | 编辑某个节点 | -    |

### 数据结构

数据是一个 `NodeObject` 对象，结构如下：

| 字段名         | 说明                           | 类型   | 可选值                        |
| -------------- | ------------------------------ | ------ | ----------------------------- |
| nodeId         | 节点的唯一 id                  | String | -                             |
| nodeName       | 节点的名称                     | String | -                             |
| nodeType       | 节点的类型                     | String | start、route、condition、node |
| childNode      | 子节点配置，是 NodeObject 对象 | Object | -                             |
| conditionNodes | 子节点配置，NodeObject 数组    | Array  | -                             |
