<template>
  <div class="flow-wrap">
    <FlowWrap
      :nodeConfig="nodeConfig"
      @on-add-node="handlerAddNode"
      @on-add-router="handerRouterNode"
      @on-delete-node="handlerDeleteNode"
      @on-delete-condition="handlerDeleteCondition"
      @on-edit="hanlderEditNode"
    ></FlowWrap>
    <FlowEnd></FlowEnd>
  </div>
</template>

<script>
import "../assets/font/index.min.css";
import { getAllNodes, getCurrentNode, getParentNode } from "./utils.js"
import { NODE_TYPES } from "./config.js"
import { cloneDeep } from 'lodash-es';
import uuid from "uuid-v4";
export default {
  name: "ApproveFlow",
  components: {
    FlowWrap: () => import("./flowWrap/index.vue"),
    FlowEnd: () => import("./flowWrap/flowEnd.vue"),
  },
  props: {
    nodeConfig: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handlerAddNode(nodeConfig) {
      this.$emit("on-add", nodeConfig);
    },
    hanlderEditNode(nodeConfig) {
      this.$emit("on-edit", nodeConfig);
    },
    // 添加路由
    handerRouterNode(nodeConfig) {
      const allConfig = cloneDeep(this.nodeConfig);
      const nodes = getAllNodes(allConfig);
      const nodeId = nodeConfig?.nodeId;
      const currentNode = getCurrentNode(nodes, nodeId);
      const originChildNode = nodeConfig?.childNode ?? null;
      const newChildNode = {
        nodeId: uuid(),
        nodeName: "路由",
        nodeType: NODE_TYPES.ROUTE,
        childNode: null,
        conditionNodes: [
          {
            nodeId: uuid(),
            nodeName: "条件1",
            nodeType: NODE_TYPES.CONDITION,
            childNode: originChildNode,
          },
          {
            nodeId: uuid(),
            nodeName: "条件2",
            nodeType: NODE_TYPES.CONDITION,
            childNode: null,
          },
        ],
      }
      currentNode.childNode = newChildNode;
      this.$emit("update:nodeConfig", allConfig);
      this.$emit("on-change", allConfig);
    },
    // 删除某个节点
    handlerDeleteNode(nodeConfig) {
      const allConfig = cloneDeep(this.nodeConfig);
      const nodeId = nodeConfig?.nodeId;
      const parentNode = getParentNode(allConfig, nodeId);
      const originChildNode = nodeConfig?.childNode ?? null;
      parentNode.childNode = originChildNode;
      this.$emit("update:nodeConfig", allConfig);
      this.$emit("on-change", allConfig);
    },
    // 删除某个条件节点
    handlerDeleteCondition(nodeConfig, index){
      const allConfig = cloneDeep(this.nodeConfig);
      const nodes = getAllNodes(allConfig);
      const nodeId = nodeConfig?.nodeId;
      const currentNode = getCurrentNode(nodes, nodeId);
      // 直接删除当前index的条件节点
      currentNode.conditionNodes.splice(index, 1);
      currentNode.conditionNodes.map((item, index) => {
        item.nodeName = `条件${index + 1}`;
      });
      if (currentNode.conditionNodes.length == 1) {
        if (currentNode.childNode) {
          if (currentNode.conditionNodes[0].childNode) {
            this.reData(
              currentNode.conditionNodes[0].childNode,
              currentNode.childNode
            );
          } else {
            currentNode.conditionNodes[0].childNode = currentNode.childNode;
          }
        }
        const parentNode = getParentNode(allConfig, nodeId);
        parentNode.childNode = currentNode.conditionNodes[0].childNode;
      }
      this.$emit("update:nodeConfig", allConfig);
      this.$emit("on-change", allConfig);
    },
    reData(data, addData) {
      if (!data.childNode) {
        data.childNode = addData;
      } else {
        this.reData(data.childNode, addData);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.flow-wrap {
  background-color: #f5f5f7;
  padding: 54.5px 0;
  min-width: min-content;
  transform: scale(1);
  box-sizing: border-box;
}
</style>
