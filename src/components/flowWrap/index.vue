<template>
  <div>
    <FlowNode
      v-if="nodeConfig.nodeType !== NODE_TYPES.ROUTE"
      :nodeConfig="nodeConfig"
      @on-add="(...args) => $emit('on-add', ...args)"
      @on-edit="(...args) => $emit('on-edit', ...args)"
      @on-change="handlerConfigChange"
    ></FlowNode>
    <FlowBranch
      v-if="nodeConfig.nodeType == NODE_TYPES.ROUTE"
      :nodeConfig="nodeConfig"
      @on-add="(...args) => $emit('on-add', ...args)"
      @on-edit="(...args) => $emit('on-edit', ...args)"
      @on-change="handlerConfigChange"
    ></FlowBranch>
    <FlowWrap
      v-if="nodeConfig.childNode"
      :nodeConfig.sync="nodeConfig.childNode"
      @on-add="(...args) => $emit('on-add', ...args)"
      @on-edit="(...args) => $emit('on-edit', ...args)"
    ></FlowWrap>
  </div>
</template>

<script>
import { NODE_TYPES } from "../config.js";
export default {
  name: "FlowWrap",
  components: {
    FlowNode: () => import("./flowNode.vue"),
    FlowBranch: () => import("./flowBranch.vue"),
  },
  props: {
    nodeConfig: {
      type: Object,
      default: () => {},
    },
  },
  data(){
    return {
      NODE_TYPES,
    }
  },
  methods: {
    handlerConfigChange(config) {
      this.$emit("update:nodeConfig", config);
    },
  },
};
</script>
