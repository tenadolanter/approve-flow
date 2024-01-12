<template>
  <div>
    <FlowNode
      v-if="nodeConfig.type < 3"
      :nodeConfig="nodeConfig"
      @on-config-change="handlerConfigChange"
      @on-config-edit="handlerConfigEdit"
    ></FlowNode>
    <FlowBranch
      v-if="nodeConfig.type == 4"
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
  methods: {
    handlerConfigChange(config) {
      this.$emit("update:nodeConfig", config);
    },
    handlerConfigEdit(config, index){
      console.log("handlerConfigEdit", config, index);
    },
  },
};
</script>
