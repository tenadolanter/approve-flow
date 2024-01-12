<template>
  <div>
    <FlowNode
      v-if="nodeConfig.nodeType !== NODE_TYPES.ROUTE"
      :nodeConfig="nodeConfig"
      @on-config-change="handlerConfigChange"
      @on-config-edit="handlerConfigEdit"
    ></FlowNode>
    <FlowBranch
      v-if="nodeConfig.nodeType == NODE_TYPES.ROUTE"
      :nodeConfig="nodeConfig"
      @on-config-change="handlerConfigChange"
      @on-config-edit="handlerConfigEdit"
    ></FlowBranch>
    <FlowWrap
      v-if="nodeConfig.childNode"
      :nodeConfig.sync="nodeConfig.childNode"
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
    handlerConfigEdit(config, index) {
      console.log("handlerConfigEdit", config, index);
    },
  },
};
</script>
