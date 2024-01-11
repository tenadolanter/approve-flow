<template>
  <div class="flow-inner-wrap">
    <FlowNode v-if="nodeConfig.nodeType !== NODE_TYPES.ROUTE" :nodeConfig="nodeConfig" :readonly="readonly" v-on="$listeners"></FlowNode>
    <FlowBranch v-if="nodeConfig.nodeType == NODE_TYPES.ROUTE" :nodeConfig="nodeConfig" :readonly="readonly" v-on="$listeners"></FlowBranch>
    <FlowWrap v-if="nodeConfig.childNode" :nodeConfig="nodeConfig.childNode" :readonly="readonly" v-on="$listeners"></FlowWrap>
  </div>
</template>

<script>
import { NODE_TYPES } from "../config.js";
import FlowNode from "./flowNode.vue";
import FlowBranch from "./flowBranch.vue";
export default {
  name: "FlowWrap",
  components: {
    FlowNode,
    FlowBranch,
  },
  props: {
    nodeConfig: {
      type: Object,
      default: () => {},
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      NODE_TYPES,
    };
  },
};
</script>
