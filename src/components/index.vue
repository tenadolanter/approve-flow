<template>
  <div class="flow-wrap" :style="styles">
    <FlowWrap
      v-if="nodeConfig"
      :nodeConfig="nodeConfig"
      :readonly="readonly"
      @on-add-node="handlerAddNode"
      @on-add-router="handerRouterNode"
      @on-delete-node="handlerDeleteNode"
      @on-delete-condition="handlerDeleteCondition"
      @on-edit="hanlderEditNode"
    ></FlowWrap>
    <FlowEnd v-if="!isStartNodeEmpty"></FlowEnd>
  </div>
</template>

<script>
import { getAllNodes, getCurrentNode, getParentNode } from "./utils.js";
import { NODE_TYPES, DEFAULT_OPTIONS } from "./config.js";
import { cloneDeep } from "lodash";
import uuid from "uuid-v4";
import FlowWrap from "./flowWrap/index.vue";
import FlowEnd from "./flowWrap/flowEnd.vue";
export default {
  name: "ApproveFlow",
  components: {
    FlowWrap,
    FlowEnd,
  },
  props: {
    nodeConfig: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles() {
      return {
        '--backgroudOption': this.options?.backgroud || DEFAULT_OPTIONS.backgroud,
      };
    },
    isStartNodeEmpty(){
      return this.nodeConfig?.nodeType === NODE_TYPES.START && !this.nodeConfig?.code
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
        nodeDesc: "",
        nodeType: NODE_TYPES.ROUTE,
        childNode: null,
        conditionNodes: [
          {
            nodeId: uuid(),
            nodeName: "条件1",
            nodeDesc: "",
            nodeType: NODE_TYPES.CONDITION,
            childNode: originChildNode,
          },
          {
            nodeId: uuid(),
            nodeName: "条件2",
            nodeDesc: "",
            nodeType: NODE_TYPES.CONDITION,
            childNode: null,
          },
        ],
      };
      currentNode.childNode = newChildNode;
      this.$emit("update:nodeConfig", allConfig);
      this.$emit("on-change", allConfig);
    },
    // 删除某个节点
    handlerDeleteNode(nodeConfig) {
      let allConfig = cloneDeep(this.nodeConfig);
      const nodeId = nodeConfig?.nodeId;
      const parentNode = getParentNode(allConfig, nodeId);
      if (parentNode) {
        const originChildNode = nodeConfig?.childNode ?? null;
        parentNode.childNode = originChildNode;
      } else {
        const {  nodeId, nodeType } = allConfig;
        allConfig = {
          nodeId,
          nodeType,
          nodeDesc: "",
          nodeName: "",
        };
      }
      this.$emit("update:nodeConfig", allConfig);
      this.$emit("on-change", allConfig);
    },
    // 删除某个条件节点
    handlerDeleteCondition(nodeConfig, index) {
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
            this.reData(currentNode.conditionNodes[0].childNode, currentNode.childNode);
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
  padding: 54.5px 0;
  min-height: 100%;
  min-width: min-content;
  transform: scale(1);
  box-sizing: border-box;
  background: var(--backgroudOption);
}
</style>
