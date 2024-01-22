:::demo

```html
<template>
  <ApproveFlow
    :nodeConfig.sync="nodeConfig"
    :isStartEmptyFn="isStartEmptyFn"
    @on-add="handlerAdd"
    @on-edit="handlerEdit"
    @on-change="handlerChange"
  ></ApproveFlow>
</template>
<script>
export default {
  data() {
    return {
      uuid: 1,
      nodeConfig: {
        nodeId: 1,
        nodeName: "发起人",
        nodeDesc: "发起人",
        nodeType: "start",
      },
    };
  },
  methods: {
    isStartEmptyFn(nodeConfig) {
      return nodeConfig?.nodeType === "start" && !nodeConfig?.code;
    },
    handlerAdd(nodeConfig) {
      const addNodeId = nodeConfig?.nodeId;
      const nodeData = this.utilCloneDeep(this.nodeConfig);
      const nodes = this.utilGetAllNodes(nodeData);
      const config = this.utilGetNodeById(nodes, addNodeId);
      const childNode = config?.childNode ?? null;
      const _nodeConfig = {
        nodeId: this.utilGetUuid(),
        nodeName: "新增了一个节点",
        nodeDesc: "新增节点的描述",
        nodeType: "node",
        childNode: childNode,
      };
      config.childNode = _nodeConfig;
      this.nodeConfig = nodeData;
    },
    handlerEdit(nodeConfig) {
      console.log("handlerEdit", nodeConfig);
      if (this.isStartEmptyFn(nodeConfig)) {
        console.log("isStartEmptyFn", nodeConfig);
        this.nodeConfig = {
          ...nodeConfig,
          nodeName: "添加的起始节点",
          nodeDesc: "起始节点描述",
          code: 1121,
        };
      }
    },
    handlerChange(nodeConfig) {
      console.log("handlerChange", nodeConfig);
    },
    utilCloneDeep(data) {
      return JSON.parse(JSON.stringify(data));
    },
    utilGetAllNodes(nodeConfig) {
      let result = [];
      result.push(nodeConfig);
      if (nodeConfig?.childNode) {
        const childs = this.utilGetAllNodes(nodeConfig?.childNode);
        result.push(...childs);
      }
      if (nodeConfig?.conditionNodes && nodeConfig?.conditionNodes?.length) {
        nodeConfig?.conditionNodes.forEach((item) => {
          const childs = this.utilGetAllNodes(item);
          result.push(...childs);
        });
      }
      return result;
    },
    utilGetNodeById(nodes, nodeId) {
      return nodes?.find((item) => item.nodeId === nodeId) ?? {};
    },
    utilGetUuid(){
      return this.uuid++;
    },
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
| on-edit | 编辑某个节点 | -    |

### 数据结构

数据是一个 `NodeObject` 对象，结构如下：

| 字段名         | 说明                           | 类型   | 可选值                        |
| -------------- | ------------------------------ | ------ | ----------------------------- |
| nodeId         | 节点的唯一 id                  | String | -                             |
| nodeName       | 节点的名称                     | String | -                             |
| nodeType       | 节点的类型                     | String | start、route、condition、node |
| childNode      | 子节点配置，是 NodeObject 对象 | Object | -                             |
| conditionNodes | 子节点配置，NodeObject 数组    | Array  | -                             |
