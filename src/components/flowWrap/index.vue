<template>
  <div>
    <FlowNode :nodeConfig="nodeConfig" v-if="nodeConfig.type<3"></FlowNode>
    <FlowBranch :nodeConfig="nodeConfig" v-if="nodeConfig.type==4"></FlowBranch>
    <FlowWrap v-if="nodeConfig.childNode" :nodeConfig.sync="nodeConfig.childNode"></FlowWrap>
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
}

</script>

<style scoped lang="scss">

</style>
