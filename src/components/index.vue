<template>
  <div class="flow-wrap">
    <FlowWrap
      :nodeConfig="nodeConfig"
      @on-add="handlerAddNode"
      @on-router="handerRouterNode"
      @on-delete="handlerDeleteNode"
      @on-edit="hanlderEditNode"
    ></FlowWrap>
    <FlowEnd></FlowEnd>
  </div>
</template>

<script>
import "../assets/font/index.min.css";
import { getAllNodes, getCurrentNode } from "./utils.js"
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
      const config = cloneDeep(this.nodeConfig);
      const nodes = getAllNodes(config);
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
      this.$emit("update:nodeConfig", config);
      this.$emit("on-change", config);
    },
    handlerDeleteNode() {},
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
