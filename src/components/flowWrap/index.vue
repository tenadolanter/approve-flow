<template>
  <div class="flow-inner-wrap">
    <FlowNode
      v-if="nodeConfig.nodeType !== NODE_TYPES.ROUTE"
      :nodeConfig="nodeConfig"
      v-on="$listeners"
    ></FlowNode>
    <FlowBranch
      v-if="nodeConfig.nodeType == NODE_TYPES.ROUTE"
      :nodeConfig="nodeConfig"
      v-on="$listeners"
    ></FlowBranch>
    <FlowWrap
      v-if="nodeConfig.childNode"
      :nodeConfig="nodeConfig.childNode"
      v-on="$listeners"
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
  data() {
    return {
      NODE_TYPES,
    };
  },
};
</script>
